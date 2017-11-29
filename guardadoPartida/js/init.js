login = false;

var c;
var ctx;

var temp ="";
var fps = 30;
var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;
var canvasWidth = 2560;
var canvasHeight = 1440;
var user;
var wood;
var health;
var row;
var column;
var posX;
var posY;

var tempRow = row;
var tempColumn = column;

var animateIniciado=false;
var animado = false;
// TERRENO //
var terrainImg = new Image();
terrainImg.src="img/tiles/1.png";

var squarePx = 80;

// ARBOLES

var treeImg = [];

for(var i=1;i<=47;i++){

    treeImg[i] = new Image();
    treeImg[i].src="img/tree/tree_"+i+".png"
}

var tree = [];
for(var i = 0;i<100;i++){
    var auxR = Math.floor(Math.random()*18);
    var auxC = Math.floor(Math.random()*32);
    var auxType = Math.ceil (Math.random()*(treeImg.length-1) );
    tree[i] = new cTree(auxR,auxC,auxType);
}

// Variables globales para tween
var miposicion;
var target;
var tween, tweenBack;