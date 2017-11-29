
var points = 0;
var trio = 10;
var cuarteto = 40; //cuarte, quinteto y combent se le suma la puntuación de trío
var quinteto = 90;
var combEnT = 90;
var moves = 50;
var arrayTiles = [];



var candyImg = [];
// Caramelo normal
for(var i = 1;i<=6;i++){
    candyImg[i]= new Image();
    candyImg[i].src = "img/candy/"+i+".png";
}
// Caramelo espcial rueda sin borde
for(var i = 11;i<=16;i++){
    candyImg[i]= new Image();
    candyImg[i].src = "img/candy/"+i+".png";
}
// Caramelo espcial rueda con borde
for(var i = 21;i<=26;i++){
    candyImg[i]= new Image();
    candyImg[i].src = "img/candy/"+i+".png";
}
// Caramelo espcial corazón
for(var i = 31;i<=36;i++){
    candyImg[i]= new Image();
    candyImg[i].src = "img/candy/"+i+".png";
}
var lightningImg = new Image();
lightningImg.src = "img/rayo/rayo.png";

// Caramelo espcial multicolor
candyImg[40]= new Image();
candyImg[40].src = "img/candy/40.png";

//variables del juego
var fps = 60;
fps = 1000/fps;
var timer = "";
var leftPriority = true;
var firstClick = false;
var candiesSorted = false;
var frame = 0;
var cannotMove = false;
var level = 1;

// variables cCandy
var candyCount = 1;
var candies = [];

var selectedCandy = ""; // selected candy es para barrer todos los caramelos
var selectedCandyUp = ["","","","","","","","","",""]; // guardo los 10 caramelos de arriba
var selectedCandyDown = ["","","","","","","","","",""];  // guardo los 4 caramelos de abajo
var selectedCandyLeft = ["","","","","","","","","",""];  // eso...
var selectedCandyRight = ["","","","","","","","","",""]; 
var clickCandy = 0; // click candy es para el caramelo que has hecho click (así sabemos donde hay que colocar el caramelo especial en caso de que proceda)
var clickCandyUp = "";
var clickCandyDown = "";
var clickCandyLeft = "";
var clickCandyRight = "";
var candiesToRemove = []; // aquí guardo los indices de los caramelos que se van a eliminar (para la animación antes de que se eliminen)



var canvasWidth = 1080;
var canvasHeight = 1920;

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;

var factorEscalado = windowHeight/canvasHeight;

var animations = [];


var fondo = new Image();
fondo.src = "img/fondo.jpg"; 

var caerDirectamente = true;