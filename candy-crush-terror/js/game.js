$(document).ready(function(){
    clearData();
    prepareCanvas();
    prepareLevelCanvas(level,function(){ // esto está hecho así para que las funciones se ejecuten cuando terminen de ejecutarse la anterior sin tener que hacer un timeout
        drawLevelCanvas(function(){
           scanLevelCanvas(function(){
               hideLevelCanvas(function(){
                   start();
               });
           });
        });
    });
});

function start(){
    clickCandies(); // de momento para testear comportamiento
    clearTimeout(timer);
    $("#canvas").css("zoom",factorEscalado);
    timer = setTimeout(loop,30); /*global timer*/
}

function loop(){
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
     ctx.drawImage(fondo,0,0);
    drawHUD();
    nextLevel()
    //drawGrid();
    //updateTiles();
    updateCandies();
    updateAnimations();
    //sortCandies();
    if(leftPriority){
        checkCandies();
    }
    if(!leftPriority){
        reScanLevelCanvas();
    }

   
    caerDirectamente = false;
    frame++;
    leftPriority = !leftPriority; // si leftPriority=true, caida en diagonal izquierda primero, si leftPriority=false, caida en diagonal derecha primero
    clearTimeout(timer);
    timer = setTimeout(loop,fps);
}