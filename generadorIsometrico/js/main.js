$(document).ready(function(){
    $("#canvas").attr("width",canvasWidth);
    $("#canvas").attr("height",canvasHeight);
    inicio();
});
function inicio(){
    clearTimeout(temporizador);
    temporizador = setTimeout("bucle()",200);
    keyInput();
}
function bucle(){
    cursorPX= cursorX - cursorY + gapX;                                                      // proyecta x en ejes isometricos
    cursorPY= (cursorX+cursorY)/2 +gapY;                                                     // proyecta y en ejes isometricos
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    //////////////////
    // DIBUJO LINEAS//
    //////////////////
    ctx.beginPath();
        for (var i= gridSize/2; i < 4*canvasWidth; i += gridSize){          //aqui empiezo a dibujar la rejilla
            ctx.moveTo(i,0);                                                    //eje x isometrico
            ctx.lineTo(i + -14725.768002282744, 7364.472604534944);             //Math.cos(d2r(180-26.57))*diagonal*10     ,    Math.sin(d2r(180-26.57))*diagonal*10
        }
        for(var i=gridSize/4; i< 4*canvasHeight; i += gridSize/2){              //eje y isometrico
            ctx.moveTo(0,i);
            ctx.lineTo(14725.767365917083, i + 7364.47387699158);               //  Math.cos(d2r(26.57))*diagonal*10           ,             Math.sin(d2r(26.57))*diagonal*10
        }
        for(var i=gridSize/4; i> -4*canvasHeight; i -= gridSize/2){             //eje y isometrico
            ctx.moveTo(0,i);
            ctx.lineTo(14725.767365917083, i + 7364.47387699158);
        }
    ctx.stroke(); 
     
    drawManager();


    
    clearTimeout(temporizador);
    temporizador = setTimeout("bucle()",1000/fps);
}