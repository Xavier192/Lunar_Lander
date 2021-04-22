
/*******************************Varibales y definiciones**********************/
//Intervalos
let timer = null;
let timerFuel = null;
let timerButton = null;
//Bloqueadores de acciones
let motorRoto = false;
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
let dificultad = 0.3;

/***************************HTML modales**************************/

const modalMenu = '<ul class="modal__menu">'
	+ '<li class="modal__item"><a href="#" class="modal__link boton-modal">Continuar</a></li>'
	+ '<li class="modal__item"><a href="#" class="modal__link boton-modal">Instrucciones</a></li>'
	+ '<li class="modal__item"><a href="#" class="modal__link boton-modal">About</a></li>'
	+ '<li class="modal__item"><a href="#" class="modal__link boton-modal">Dificultad</a></li>'
	+ '</ul>';

const modalInstrucciones = '<div class="modal__cuerpo">'
	+ '<h1 class="modal__titulo">Instrucciones</h1>'
	+ '<div class="modal__seccion">'
	+ '<p class="modal__parrafo borde-fino">La nave empieza en suspensión y va cayendo cada vez más rápido hacía la'
	+ ' luna. Para evitar'
	+ 'accidentarse a causa de un choque fatal contra la luna se tendrá que presionar el espacio o el'
	+ 'botón de acelerar. En el caso de que no se acelere lo suficiente o se termine el'
	+ 'combustible antes de aterrizar la nave se estrellará. </p>'
	+ '</div>'
	+ '<div class="modal__seccion">'
	+ '<div class="pause flex"><i class="fas fa-pause"></i></div>'
	+ '<span class="modal__texto"> Sirve para pausar el juego y mostrar las opciones.</span>'
	+ '</div>'
	+ '<div class="modal__seccion">'
	+ '<div class="reiniciar flex">'
	+ '<i class="fas fa-redo"></i>'
	+ '</div>'
	+ '<span class="modal__texto">Sirve para reiniciar la partida.</span>'
	+ '</div>'
	+ '<div class="modal__seccion">'
	+ '<div class="modal__acelerar flex">'
	+ '<i class="fas fa-power-off"></i>'
	+ '</div>'
	+ '<span class="modal__texto">Sirve para encender o apagar el motor.</span>'
	+ '</div>'
	+ '<button type="button" class="volver boton-modal w-100">Volver</button>'
	+ '</div>';

const modalAbout = '<div class="modal__cuerpo">'
	+ '<h1 class="modal__titulo">About</h1>'
	+ '<p class="modal__parrafo">Este proyecto ha sido realizado por un alumno de primero de DAM como proyecto'
	+ 'para la asignatura de Lenguage de marcas. </p>'
	+ '<br>'
	+ '<p class="modal__parrafo">Nombre: Xavier Lliteras Morell. </p>'
	+ '<p class="modal__parrafo">Fecha: 29/03/2021</p>'
	+ '<button type="button" class="volver boton-modal w-100">Volver</button>'
	+ '</div>';

const modalDificultad = '<ul class="modal__menu">'
	+ '<li class="modal__item"><a href="#" class="modal__link boton-modal">Fácil</a></li>'
	+ '<li class="modal__item"><a href="#" class="modal__link boton-modal">Normal</a></li>'
	+ '<li class="modal__item"><a href="#" class="modal__link boton-modal">Difícil</a></li>'
	+ '<li class="modal__item"><a href="#" class="modal__link boton-modal">Imposible</a></li>'
	+ '</ul>';

const modalDerrota = '<div class="modal__cuerpo">'
	+ '<h1 class="modal__titulo">Te has estrellado</h1>'
	+ '<p class="modal__parrafo modal__subtitulo">Estadísticas</p>'
	+ '<p class="modal__parrafo">Velocidad de impacto: <span class="modal__v-impacto"> </span>m/s.</p>'
	+ '<p class="modal__parrafo">Supervivientes: 0.</p>'
	+ '<p class="modal__parrafo">Gasolina sin gastar: <span class="modal__gasolina"></span>L.</p>'
	+ '<button type="button" class="boton-modal w-50 reiniciar-modal">Reiniciar</button>'
	+ '</div>';

const modalVictoria = '<div class="modal__cuerpo">'
	+ '<h1 class="modal__titulo">¡Misión cumplida!</h1>'
	+ '<p class="modal__parrafo">Has alunizado con éxito. Toda tu tripulación aplaude tu gran proeza.</p>'
	+ '<p class="modal__parrafo">Velocidad de impacto: <span class="modal__v-impacto"> </span>m/s.</p>'
	+ '<p class="modal__parrafo">Supervivientes: TODOS.</p>'
	+ '<p class="modal__parrafo">Gasolina sin gastar: <span class="modal__gasolina"></span>L.</p>'
	+ '<button type="button" class="boton-modal w-50 reiniciar-modal">Reiniciar</button>'
	+ '</div>';

const modalInicial = '<div class="modal__cuerpo">'
	+ '<h1 class="modal__titulo">Bienvenido a Lunar Lander</h1>'
	+ '<div class="modal__seccion">'
	+ '<p class="modal__parrafo borde-fino">La nave empieza en suspensión y va cayendo cada vez más rápido hacía la'
	+ ' luna. Para evitar'
	+ 'accidentarse a causa de un choque fatal contra la luna se tendrá que presionar el espacio o el'
	+ 'botón'
	+ 'de acelerar. En el caso de que no se acelere lo suficiente o se termine el'
	+ 'combustible antes de aterrizar la nave se estrellará. </p>'
	+ '</div>'
	+ '<div class="modal__seccion">'
	+ '<div class="pause flex"><i class="fas fa-pause"></i></div>'
	+ '<span class="modal__texto"> Sirve para pausar el juego y mostrar las opciones.</span>'
	+ '</div>'
	+ '<div class="modal__seccion">'
	+ '<div class="reiniciar flex">'
	+ '<i class="fas fa-redo"></i>'
	+ '</div>'
	+ '<span class="modal__texto">Sirve para reiniciar la partida.</span>'
	+ '</div>'
	+ '<div class="modal__seccion">'
	+ '<div class="modal__acelerar flex">'
	+ '<i class="fas fa-power-off"></i>'
	+ '</div>'
	+ '	<span class="modal__texto">Sirve para encender o apagar el motor.</span>'
	+ '</div>'
	+ '<button type="button" class="boton-modal empezar w-100">¡Empezar!</button>'
	+ '</div>';

/************Objeto nave***********/

const contenedorNave = document.querySelector(".nave__contenedor");
const nave = document.querySelector(".nave__pj");
const tiempo = document.querySelector(".tiempo");

/****************Limites colisión*****************/

const limiteSuperior = 0;
const limiteInferior = 65.9;

/**********************Objetos marcador HTML.********************/

const marcadorVelocidad = document.getElementById("velocidad");
const marcadorAltura = document.getElementById("altura");
const marcadorIntentos = document.getElementById("intentos");
const marcadorFuel = document.querySelector('.marcadores__fuel');
const marcadorFuelNegativo = document.querySelector('.marcadores__fuel-negativo');
const vol = document.querySelector('.vol');

/*****************************Botones Modales****************************/

const botonPausa = document.querySelector('.pause');
const botonReiniciar = document.querySelector('.reiniciar');

/**********************************Modales********************************/

const modal = document.querySelector('.modal');
const modalInner = document.querySelector('.modal__inner');

/**************************Audios*********************/

const musica = new Audio('music/bensound-scifi.mp3');
const crashSound = new Audio('music/explosion.mp3');
musica.volume = 0.3;
crashSound.volume = 0.2;

/******************Loop musica y sonido****************/

musica.addEventListener('ended', function () {
	this.currentTime = 0;
	this.play();
}, false);

/*****************Boton encender motor*******************/

const botonEncender = document.querySelector('.acelerar');

/****************Listeners apretar o soltar tecla************************/
document.onkeyup = function () {
	comprobarApagadoMotor();
}

document.onkeydown = function () {
	comprobarEncendido();
};

/************************Listeners modales**********************/

botonEncender.addEventListener('click', switchBoton);
botonPausa.addEventListener('click', pausa);
botonReiniciar.addEventListener('click', reiniciar);
vol.addEventListener('click', switchVolumen);

/***********************Inicia el programa************************/

window.onload = function () {
	modalInner.innerHTML = modalInicial;
	document.querySelector('.empezar').addEventListener('click',cerrarModalInicial);
}

function cerrarModalInicial() {
	musica.play();
	modal.classList.add('hidden');
	esperarTresSegundos();
}

async function esperarTresSegundos() {

	for (let seconds = 2; seconds > -1; seconds--) {
		await sleep(1000);
		tiempo.innerHTML = '' + seconds;
	}

	if(!pause){
		start();
	}
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function start() {
	tiempo.innerHTML = '';
	lastFrame = +new Date;
	timer = setInterval(function () { moverNave(); }, 1);
	timerButton = setInterval(function () { actualizarColorBoton(); }, 50);
}

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
		velocidad = -velocidad;
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
/*****He revisado hasta aqui********/
function comprobarNaveEstrellada() {
	fuel = 0;

	if (Math.abs(velocidad) > vImpacto) {
		estrellarNave();
		crearModalFinPartida('derrota');
	}

	else {
		crearModalFinPartida('victoria');
	}
}

function estrellarNave(){
	
	nave.src = "img/crash.gif";
	intentos++;
	marcadorIntentos.innerHTML = intentos;
	naveEstrellada = true;
	crashSound.play();
}

function ponerEstadisticas() {
	document.querySelector('.modal__v-impacto').innerHTML = velocidad.toFixed(2);
	document.querySelector('.modal__gasolina').innerHTML = fuel.toFixed(1);
}

/*******************Actualiza marcadores de fuel y intentos******************/

function actualizarFuel() {
	fuel -= dificultad;

	if (fuel <= 0) {
		comprobarApagadoMotor();
	}
	else{
		marcadorFuel.style.width = fuel + '%';
		marcadorFuelNegativo.style.width = 100 - fuel + '%';
	}
}

/***************************Pausa y reiniciar******************************/

function pausa() {
	modal.classList.remove('hidden');
	pause = true;
	clearInterval(timer);
	clearInterval(timerFuel);
	crearMenuPrincipal();
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
	naveEstrellada = false;
	actualizarFuel();
	nave.src = "img/nave_sin_fuego.svg";
}

/*Comprobaciones*/

function comprobarEstadoMotor() {

	if (!motorRoto && fuel > 0 && !pause) {
		return false;
	}

	return true;
}

function comprobarApagadoMotor() {
	if (!naveEstrellada) {
		motorOff();
	}
	else {
		clearInterval(timerFuel);
		a = g;
		motorRoto = false;
	}
}

/***************Dificultad***************/

function cambiarDificultad(boton) {
	const dif = boton.innerHTML;
	crearMenuPrincipal();

	switch (dif) {
		case "Fácil":
			dificultad = 0.3;
			vImpacto = 5;
			break;
		case "Normal":
			vImpacto = 4;
			dificultad = 0.4;
			break;
		case "Difícil":
			vImpacto = 3;
			dificultad = 0.6;
			break;
		case "Imposible":
			vImpacto = 2;
			dificultad = 0.8;
			break;
	}

}

/*******************Volumen********************/

function switchVolumen() {
	if (musicaActivada) {
		musica.pause();
		musica.currentTime = 0;
		musicaActivada = false;
		vol.innerHTML = '<i class="fa fa-volumne-mute"></i>';
	}
	else {
		musica.play();
		musicaActivada = true;
		vol.innerHTML = '<i class="fa fa-volume-up"></i>';
	}
}

/****************Crear Modales*****************/

function crearMenuPrincipal() {
	modalInner.innerHTML = modalMenu;
	cambiarTamanyoModal('pequenyo');

	const links = Array.from(document.querySelectorAll('.modal__link'));

	for (let elemento = 0; elemento < links.length; elemento++) {
		links[elemento].addEventListener('click', function () { aplicarEventListenerMenu(links[elemento].innerHTML) });
	}
}

function crearModalInstrucciones() {
	modalInner.innerHTML = modalInstrucciones;
	configurarBotonVolver();
}

function crearModalAbout() {
	modalInner.innerHTML = modalAbout;
	configurarBotonVolver();
}

function crearModalDificultad() {
	modalInner.innerHTML = modalDificultad;
	iluminarDificultad();
	const links = Array.from(document.querySelectorAll('.modal__link'));

	for (let elemento = 0; elemento < links.length; elemento++) {
		links[elemento].addEventListener('click', function () { cambiarDificultad(links[elemento]) });
	}

}

async function crearModalFinPartida(resultado) {
	await sleep(1000);
	cambiarTamanyoModal('pequenyo');
	modal.classList.remove('hidden');

	if(resultado === 'victoria'){
		modalInner.innerHTML = modalVictoria;
	}
	else{
		modalInner.innerHTML = modalDerrota;
	}
	ponerEstadisticas();
	reiniciarModal();
}

function reiniciarModal(){
	const botonReiniciarModal = Array.from(document.querySelectorAll('.reiniciar-modal'));
	
	botonReiniciarModal.forEach(botonModal => botonModal.addEventListener('click',function(){modal.classList.add('hidden');reiniciar();}));
}

function cambiarTamanyoModal(tamanyo){
	if(tamanyo === 'pequenyo'){
		modalInner.classList.remove('grande');
	}
	else{
		modalInner.classList.add('grande');
	}
}

function iluminarDificultad() {
	const items = Array.from(document.querySelectorAll('.modal__item'));

	switch (dificultad) {
		case 0.3:
			items[0].classList.add('active');
			break;
		case 0.4:
			items[1].classList.add('active');
			break;
		case 0.6:
			items[2].classList.add('active');
			break;
		case 0.8:
			items[3].classList.add('active');
			break;
	}

}

function configurarBotonVolver() {
	const botonVolver = document.querySelector('.volver');
	botonVolver.addEventListener('click', crearMenuPrincipal);
}

function aplicarEventListenerMenu(texto) {
	if(texto!="Dificultad" && texto!="About"){
		cambiarTamanyoModal('grande');
	}

	switch (texto) {
		case "Continuar":
			reanudar();
			break;
		case "Instrucciones":
			crearModalInstrucciones();
			break;
		case "About":
			crearModalAbout();
			break;
		case "Dificultad":
			crearModalDificultad();
			break;
	}
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