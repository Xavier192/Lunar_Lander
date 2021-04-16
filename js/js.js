
/*******************************Varibales y definiciones**********************/
//Intervalos
let timer = null;
let timerFuel = null;
let timerButton = null;
//Bloqueadores de acciones
let motorRoto = false;
let combustibleAgotado = false;
let pause = false;
let botonEncendido = false;
let musicaActivada = true;
let naveEstrellada = false;
//Variables de la nave.
let g = 1.622;
let vImpacto = 5;
let deltaTime = 0;
let now = null;
let lastFrame = null;
let altura = 10;
let velocidad = 0;
let fuel = 100;
let intentos = 0;
let a = g;
let dificultad = 0.5;

/************Objeto nave***********/

const contenedorNave = document.querySelector(".nave__contenedor");
const nave = document.querySelector(".nave__pj");
const tiempo = document.querySelector(".tiempo");
/****************Limites*****************/

const limiteSuperior = 0;
const limiteInferior = 65.9;

/**********************Objetos marcador HTML.********************/

const marcadorVelocidad = document.getElementById("velocidad");
const marcadorAltura = document.getElementById("altura");
const marcadorIntentos = document.getElementById("intentos");
const marcadorFuel = document.querySelector('.marcadores__fuel');
const marcadorFuelNegativo = document.querySelector('.marcadores__fuel-negativo');
const vol = document.querySelector('.vol');

/***************Objetos estadísticas modal colisión*****************/

velocidadImpacto = document.querySelector('.modal__v-impacto');
gasolinaRestante = document.querySelector('.modal__gasolina');

/*****************************Botones Modales****************************/

const botonPausa = document.querySelector('.pause');
const botonReiniciar = document.querySelector('.reiniciar');
const botonContinuar = document.querySelector('.continuar');
const botonInstrucciones = document.querySelector('.instrucciones');
const botonAbout = document.querySelector('.about');
const botonDificultad = document.querySelector('.dificultad');
const botonVolverAbout = document.querySelector('.bAbout');
const botonVolverInst = document.querySelector('.bIns');
const botonFacil = document.querySelector('.facil');
const botonNormal = document.querySelector('.normal');
const botonDificil = document.querySelector('.dificil');
const botonImposible = document.querySelector('.imposible');
const botonEmpezar = document.querySelector('.empezar');
const botonReiniciarModal = document.querySelectorAll('.reiniciar__modal');

/**********************************Modales********************************/

const modal = document.querySelector('.modal');
const modalMenu = document.querySelector('.menu');
const modalInstrucciones = document.querySelector('.instrucciones__menu');
const modalAbout = document.querySelector('.about__menu');
const modalDificultad = document.querySelector('.dificultad__menu');
const modalnicial = document.querySelector('.inicial__menu');
const modalCrash = document.querySelector('.crash__menu');
const modalVictoria = document.querySelector('.victory__menu');

/**************************Audios*********************/

const musica = new Audio('music/bensound-scifi.mp3');
const crashSound = new Audio('music/explosion.mp3');
musica.volume = 0.3;
crashSound.volume = 0.2;

/*****************Boton encender motor*******************/

const botonEncender = document.querySelector('.acelerar');

/****************Listeners apretar o soltar tecla************************/
document.onkeyup = function(){
	comprobarApagadoMotor();
} 

document.onkeydown = function () {
	comprobarEncendido();
};

/************************Listeners modales**********************/

botonEncender.addEventListener('click', switchBoton);
botonPausa.addEventListener('click', pausa);
botonReiniciar.addEventListener('click', reiniciar);
botonContinuar.addEventListener('click', reanudar);
botonInstrucciones.addEventListener('click', mostrarInstrucciones);
botonAbout.addEventListener('click', mostrarAbout);
botonDificultad.addEventListener('click', mostrarDificultad);
botonVolverAbout.addEventListener('click', volverAb);
botonVolverInst.addEventListener('click', volverIn);
botonFacil.addEventListener('click', function () { cambiarDificultad("facil") });
botonNormal.addEventListener('click', function () { cambiarDificultad("normal") });
botonDificil.addEventListener('click', function () { cambiarDificultad("dificil") });
botonImposible.addEventListener('click', function () { cambiarDificultad("imposible") });
botonEmpezar.addEventListener('click', cerrarModalInicial);
botonReiniciarModal.forEach(function(boton){boton.addEventListener('click',function(boton){reiniciarModal(boton)})});
vol.addEventListener('click', switchVolumen);

function cerrarModalInicial() {
	musica.play();
	modalnicial.classList.add('hidden');
	esperarTresSegundos();
}

async function esperarTresSegundos(){
	
	for(let seconds=2 ; seconds>-1 ; seconds--){
		await sleep(1000);
		tiempo.innerHTML=''+seconds;
	}

	start();
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function start() {
	tiempo.innerHTML='';
	lastFrame = +new Date;
	timer = setInterval(function () { moverNave(); }, 1);
	timerButton = setInterval(function () { actualizarColorBoton(); }, 50);
}


/******************Loop musica y sonido****************/

musica.addEventListener('ended', function () {
	this.currentTime = 0;
	this.play();
}, false);

/*****************Encender y apagar el motor de la nave*****************/

function motorOn() {
	a = -g;
	nave.src = "img/nave.svg";
	timerFuel = setInterval(function () { actualizarFuel() }, 20);
	encenderBoton();
}

function motorOff() {
	a = g;
	nave.src = "img/nave_sin_fuego.svg";
	motorRoto = false;
	clearInterval(timerFuel);
	apagarBoton();
}
/***************Calcula velocidad y altura de la nave y la aplica*********************/

function moverNave() {
	now = +new Date;
	deltaTime = now - lastFrame;
	velocidad += a * deltaTime / 220;
	altura += velocidad * deltaTime / 220;
	lastFrame = now;

	let aReal = calcularAltura();

	marcadorAltura.innerHTML = aReal;
	marcadorVelocidad.innerHTML = calcularVelocidad(aReal);

	contenedorNave.style.top = comprobarLimites();

}

function calcularAltura() {
	let alturaCalculada = (limiteInferior - altura).toFixed(0);

	if ((limiteInferior - altura) <= 0) {
		return 0;
	}

	return alturaCalculada;
}

function calcularVelocidad(aReal) {
	let velocidadCalculada = transformarVelocidadPositiva(velocidad);
	velocidadCalculada = ponerMarcadorVelocidadAZero(aReal, velocidadCalculada);

	return velocidadCalculada.toFixed(2);
}

function ponerMarcadorVelocidadAZero(aReal, vReal) {
	if (aReal <= 0) {
		return 0;
	}

	return vReal;
}

function transformarVelocidadPositiva(velocidad) {
	return Math.abs(velocidad);
}

function comprobarLimites() {
	if (altura < limiteInferior && altura > 0) {
		return altura + "%";
	}

	if (altura < limiteSuperior) {
		velocidad = 0.1;
		return limiteSuperior + '%';
	}

	else {
		pararNave();
		return limiteInferior + '%';
	}
}

function pararNave() {
	clearInterval(timer);
	apagarBoton();
	comprobarNaveEstrellada();
}

function comprobarNaveEstrellada(){

	if (Math.abs(velocidad) > vImpacto) {
		nave.src = "img/crash.gif";
		incrementarMarcador();
		naveEstrellada=true;
		crashSound.play();
		modalCrash.classList.remove('hidden');
		ponerEstadisticas();
	}

	else{
		modalVictoria.classList.remove('hidden');
	}

	fuel=0;
}

function ponerEstadisticas(){
	gasolinaRestante.innerHTML = fuel;
	velocidadImpacto.innerHTML = velocidad.toFixed(2);
}

/*******************Actualiza marcadores de fuel y intentos******************/

function actualizarFuel() {
	fuel -= dificultad;

	if (fuel <= 0) {
		comprobarApagadoMotor();
	}
	
	marcadorFuel.style.width = fuel + '%';
	marcadorFuelNegativo.style.width = 100 - fuel + '%';

	
}

function incrementarMarcador() {
	intentos++;
	marcadorIntentos.innerHTML = intentos;
}

/***************************Pausa y reiniciar******************************/

function reiniciarModal(boton){
	reiniciar();
	if(boton.srcElement.className === 'modal__item reiniciar__modal de'){
		modalCrash.classList.add('hidden');
	}
	else{
		modalVictoria.classList.add('hidden');
	}
}

function pausa() {
	modal.classList.remove('hidden');
	pause = true;
	clearInterval(timer);
	clearInterval(timerFuel);
}

function reanudar() {
	modal.classList.add('hidden');
	pause = false;
	start();
}

function reiniciar() {

	if (altura > limiteInferior) {
		start();
	}

	altura = 10;
	fuel = 100;
	velocidad = 0;
	naveEstrellada=false;
	actualizarFuel();
	nave.src="img/nave_sin_fuego.svg";
}

function mostrarInstrucciones() {
	switchMenus(modalInstrucciones, modalMenu);
}

function mostrarAbout() {
	switchMenus(modalAbout, modalMenu);
}

function mostrarDificultad() {
	switchMenus(modalDificultad, modalMenu);
}

function volverIn() {
	switchMenus(modalMenu, modalInstrucciones);
}

function volverAb() {
	switchMenus(modalMenu, modalAbout);
}

/*Comprobaciones*/

function comprobarEstadoMotor() {

	if (!motorRoto && fuel > 0 && !pause) {
		return false;
	}

	return true;
}

function comprobarApagadoMotor(){
	if(!naveEstrellada){
		motorOff();
	}
	else{
		clearInterval(timerFuel);
		a=g;
		motorRoto=false;
	}
}

/***************Dificultad***************/

function cambiarDificultad(dif) {

	borrarActivos(document.querySelectorAll('.modal__item'));
	switchMenus(modalMenu, modalDificultad);

	switch (dif) {
		case "facil":
			dificultad = 0.3;
			vImpacto = 5;
			botonFacil.classList.add('active');
			break;
		case "normal":
			vImpacto = 4;
			dificultad = 0.4;
			botonNormal.classList.add('active');
			break;
		case "dificil":
			vImpacto = 3;
			dificultad = 0.6;
			botonDificil.classList.add('active');
			break;
		case "imposible":
			vImpacto = 2;
			dificultad = 0.8;
			botonImposible.classList.add('active');
			break;
	}

}

function borrarActivos(generalClass) {
	for (let activo = 0; activo < generalClass.length; activo++) {
		generalClass[activo].classList.remove('active');
	}
}

/*******************Volumen********************/

function switchVolumen() {
	if (musicaActivada) {
		musica.pause();
		musica.currentTime = 0;
		musicaActivada = false;
		vol.innerHTML = '';
		vol.appendChild(crearIcono('fa-volume-mute'));
	}
	else {
		musica.play();
		musicaActivada = true;
		vol.innerHTML = '';
		vol.appendChild(crearIcono('fa-volume-up'));
	}
}

function crearIcono(clase) {
	let icono = document.createElement('i');
	icono.classList.add('fa');
	icono.classList.add(clase);

	return icono;
}

/*Comprobar si el motor puede ser encendido*/
function comprobarEncendido() {
	motorRoto = comprobarEstadoMotor();

	if (!motorRoto) {
		motorRoto = true;
		motorOn();
	}

}

function switchBoton() {
	if (!botonEncendido && !comprobarEstadoMotor()) {
		botonEncendido = true;
		motorOn();
	}
	else {
		botonEncendido = false;
		comprobarApagadoMotor();
	}
}

function encenderBoton() {
	botonEncendido = true;
}

function apagarBoton() {
	botonEncendido = false;
}

function actualizarColorBoton() {
	if (botonEncendido) {
		botonEncender.classList.add('glow');
	}
	else {
		botonEncender.classList.remove('glow');
	}
}
/***************Utilidades***************/

function switchMenus(menuA, menuB) {
	menuB.classList.add('hidden');
	menuA.classList.remove('hidden');
}

