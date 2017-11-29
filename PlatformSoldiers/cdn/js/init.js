var temp = "";

var context = document.getElementById("lienzo");
var ctx = context.getContext("2d");

var windowWidth = window.innerWidth;
var windowHeight = window.innerHeight;


// LEVELS
var nextLevel = true;
level = 0;
levelMax = 2;

var levelImg = new Array();
for(var i = 1;i<=levelMax;i++){
    levelImg[i] = new Image();
    levelImg[i].src = "cdn/img/level/"+i+".png";
    console.log("cdn/img/level/"+i+".png");
}

//bg

var bgImg = new Image();
bgImg.src = "cdn/img/level/bg.jpg";






