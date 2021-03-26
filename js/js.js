
//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer=null;
var pausa=false;
var timerFuel=null;
//NAVE
var y = 20; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;//velocidad.
var c = 1000000;//combustible
let intentos=0;
//la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
var a = g;
//MARCADORES
const marcadorVelocidad = document.getElementById("velocidad");
const marcadorAltura = document.getElementById("altura");
const marcadorIntentos = document.getElementById("intentos");

//encender/apagar al apretar/soltar una tecla
document.onkeyup = motorOff;
document.onkeydown = motorOn;


//al cargar por completo la página...
window.onload = function(){
	//Empezar a mover la nave justo después de cargar la página
	start();
}

//Definición de funciones
function start(){
	//cada intervalo de tiempo mueve la nave
	timer = setInterval(function(){ moverNave(); }, dt*100);
}

function moverNave(){
	var vReal=null;
	var aReal=null;
	//cambiar velocidad y posicion
	v +=a*dt;
	y +=v*dt;
	//velocidad siempre positiva.
	if(v<0){
		vReal=-v;
	}

	else if(v>=0){
		vReal=v;
	}
	//altura baja cuando la nave cae.
	aReal=70-y;
	
	if(aReal<=0){
		vReal=0;
	}

	else{
		v=v;	
	}
	//actualizar marcadores de texto.
	marcadorVelocidad.innerHTML=vReal.toFixed(2);
	marcadorAltura.innerHTML=aReal.toFixed(0);
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<70){
		document.querySelector(".nave__pj").style.top = y+"%";
	}
	console.log(y);
}

function motorOn(){
	//el motor da aceleración a la nave
	a=-g;
	timerFuel=setInterval(function(){ actualizarFuel(); }, 10);
	//cambiamos el source de la nave sin fuego a la nave con fuego para que mientras acelere muestre la nave con fuego.
	document.querySelector(".nave__pj").src = "../img/nave.svg";
}

function motorOff(){	
	a=g;
	clearInterval(timerFuel);
	document.querySelector(".nave__pj").src="../img/nave_sin_fuego.svg";
	timerFuel=null;
}

function actualizarFuel(){
		
}

//función para incrementar marcador de intentos fállidos.
function incrementarMarcador(){
	intentos++;
	marcadorIntentos.innerHTML=int;
}

