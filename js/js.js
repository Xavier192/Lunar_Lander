
/*******************************Varibales y definiciones**********************/
//Intervalos
let timer=null;
let timerFuel=null;
//Bloqueadores de acciones
let teclaApretada=false;
let combustibleAgotado = false;
//Variables de la nave.
let g = 1.622;
let dt = 0.016683;
let altura = 10; 
let velocidad = 0;
let fuel = 100;
let intentos=0;
let a = g;

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


/****************Listeners apretar o soltar tecla************************/
document.onkeyup = motorOff;
document.onkeydown = function(){
	if(!teclaApretada && fuel > 0){
		motorOn();
		teclaApretada=true;
	}
};

window.onload = function(){
	start();
}

function start(){
	timer = setInterval(function(){ moverNave(); }, dt*100);
}

/*****************Encender y apagar el motor de la nave*****************/

function motorOn(){
	a=-g;
	nave.src = "img/nave.svg";
	timerFuel=setInterval(function(){ actualizarFuel() }, 20);
}

function motorOff(){	
	a=g;
	nave.src="img/nave_sin_fuego.svg";
	clearInterval(timerFuel);
	teclaApretada = false;
}

/***************Calcula velocidad y altura de la nave y la aplica*********************/ 

function moverNave(){
	velocidad+=a*dt;
	altura +=velocidad*dt;

	let aReal = calcularAltura();
	let vReal = calcularVelocidad(aReal);

	marcadorVelocidad.innerHTML=vReal.toFixed(2);
	marcadorAltura.innerHTML=(aReal.toFixed(0))*2;
	
	contenedorNave.style.top = comprobarLimites();

	revisarFuel();
}

function revisarFuel(){
	if(fuel <= 0){
		motorOff();
	}
}

function comprobarLimites(){
	if (altura<limiteInferior){
		return altura+"%";
	}	

	else{
		pararNave();
		return limiteInferior+'%';
	} 
}

function pararNave(){
	clearInterval(timer);
	fuel=0;
	motorOff();
}

function calcularAltura(){
	let alturaCalculada = limiteInferior-altura;

	if((limiteInferior-altura)<=0){
		return 0;
	}

	return alturaCalculada;
}

function calcularVelocidad(aReal){
	let velocidadCalculada = transformarVelocidadPositiva(velocidad);
	velocidadCalculada = ponerMarcadorVelocidadAZero(aReal,velocidadCalculada);

	return velocidadCalculada;
}

function ponerMarcadorVelocidadAZero(aReal,vReal){
	if(aReal<=0){
		return 0;
	}

	return vReal;
}

function transformarVelocidadPositiva(velocidad){
	if(velocidad<0){
		return -velocidad;
	}

	return velocidad;
}

/*******************Actualiza marcadores de fuel y intentos******************/

function actualizarFuel(){
	fuel-=0.3;

	marcadorFuel.style.width=fuel+'%';
	marcadorFuelNegativo.style.width = 100-fuel+'%';
}

function incrementarMarcador(){
	intentos++;
	marcadorIntentos.innerHTML=int;
}

