
/*******************************Varibales y definiciones**********************/
//Intervalos
let timer = null;
let timerFuel = null;
//Bloqueadores de acciones
let motorRoto = false;
let combustibleAgotado = false;
let pause = false;
//Variables de la nave.
let g = 1.622;
let dt = 0.016683;
let altura = 10;
let velocidad = 0;
let fuel = 100;
let intentos = 0;
let a = g;
let dificultad = 0.5;

/************Objeto nave***********/

const contenedorNave = document.querySelector(".nave__contenedor");
const nave = document.querySelector(".nave__pj");

/****************Limites*****************/

const limiteSuperior = 0;
const limiteInferior = 64;

/**********************Objetos marcador HTML.********************/

const marcadorVelocidad = document.getElementById("velocidad");
const marcadorAltura = document.getElementById("altura");
const marcadorIntentos = document.getElementById("intentos");
const marcadorFuel = document.querySelector('.marcadores__fuel');
const marcadorFuelNegativo = document.querySelector('.marcadores__fuel-negativo');

/*****************************Modals****************************/


const modal = document.querySelector('.modal');
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

const modalMenu = document.querySelector('.menu');
const modalInstrucciones = document.querySelector('.instrucciones__menu');
const modalAbout = document.querySelector('.about__menu');
const modalDificultad = document.querySelector('.dificultad__menu');

/****************Listeners apretar o soltar tecla************************/
document.onkeyup = motorOff;

document.onkeydown = function () {
	motorRoto = comprobarEstadoMotor();

	if (!motorRoto) {
		motorOn();
		motorRoto = true;
	}
};

/************************Listeners modales**********************/

botonPausa.addEventListener('click', pausa);
botonReiniciar.addEventListener('click', reiniciar);
botonContinuar.addEventListener('click', reanudar);
botonInstrucciones.addEventListener('click', mostrarInstrucciones);
botonAbout.addEventListener('click', mostrarAbout);
botonDificultad.addEventListener('click', mostrarDificultad);
botonVolverAbout.addEventListener('click', volverAb);
botonVolverInst.addEventListener('click', volverIn);
botonFacil.addEventListener('click', function(){cambiarDificultad("facil")});
botonNormal.addEventListener('click',function(){cambiarDificultad("normal")});
botonDificil.addEventListener('click', function(){cambiarDificultad("dificil")});
botonImposible.addEventListener('click',function(){ cambiarDificultad("imposible")});

window.onload = function () {
	start();
}

function start() {
	timer = setInterval(function () { moverNave(); }, dt * 100);
}

/*****************Encender y apagar el motor de la nave*****************/

function motorOn() {
	a = -g;
	nave.src = "img/nave.svg";
	timerFuel = setInterval(function () { actualizarFuel() }, 20);
}

function motorOff() {
	a = g;
	nave.src = "img/nave_sin_fuego.svg";
	clearInterval(timerFuel);
	motorRoto = false;
}

/***************Calcula velocidad y altura de la nave y la aplica*********************/

function moverNave() {
	velocidad += a * dt;
	altura += velocidad * dt;

	let aReal = calcularAltura();
	let vReal = calcularVelocidad(aReal);

	marcadorVelocidad.innerHTML = vReal.toFixed(2);
	marcadorAltura.innerHTML = (aReal.toFixed(0)) * 2;

	contenedorNave.style.top = comprobarLimites();
	revisarFuel();
}

function revisarFuel() {
	if (fuel <= 0) {
		motorOff();
	}
}

function comprobarLimites() {
	if (altura < limiteInferior && altura > 0) {
		return altura + "%";
	}

	if (altura < 0) {
		velocidad = 0.1;
		return 0 + '%';
	}

	else {
		pararNave();
		return limiteInferior + '%';
	}
}

function pararNave() {
	clearInterval(timer);
	fuel = 0;
	motorOff();
}

function calcularAltura() {
	let alturaCalculada = limiteInferior - altura;

	if ((limiteInferior - altura) <= 0) {
		return 0;
	}

	return alturaCalculada;
}

function calcularVelocidad(aReal) {
	let velocidadCalculada = transformarVelocidadPositiva(velocidad);
	velocidadCalculada = ponerMarcadorVelocidadAZero(aReal, velocidadCalculada);

	return velocidadCalculada;
}

function ponerMarcadorVelocidadAZero(aReal, vReal) {
	if (aReal <= 0) {
		return 0;
	}

	return vReal;
}

function transformarVelocidadPositiva(velocidad) {
	if (velocidad < 0) {
		return -velocidad;
	}

	return velocidad;
}

/*******************Actualiza marcadores de fuel y intentos******************/

function actualizarFuel() {
	fuel -= dificultad;

	marcadorFuel.style.width = fuel + '%';
	marcadorFuelNegativo.style.width = 100 - fuel + '%';
}

function incrementarMarcador() {
	intentos++;
	marcadorIntentos.innerHTML = int;
}

/***************************Pausa y reiniciar******************************/

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
	actualizarFuel();

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

/***************Dificultad***************/

function cambiarDificultad(dif) {
	borrarActivos(document.querySelectorAll('.modal__item'));

	switch (dif) {
		case "facil":
			dificultad = 0.3;
			botonFacil.classList.add('active');
			break;
		case "normal":
			dificultad = 0.4;
			botonNormal.classList.add('active');
			break;
		case "dificil":
			dificultad = 0.6;
			botonDificil.classList.add('active');
			break;
		case "imposible":
			dificultad = 0.8;
			botonImposible.classList.add('active');
			break;
	}

	switchMenus(modalMenu, modalDificultad);
}

function borrarActivos(generalClass){
	for(let activo= 0 ; activo<generalClass.length ; activo++){
		generalClass[activo].classList.remove('active');
	}
}

/***************Utilidades***************/

function switchMenus(menuA, menuB) {
	menuB.classList.add('hidden');
	menuA.classList.remove('hidden');
}

