function start(){
    c = document.getElementById("fondo");
    ctxBg = c.getContext("2d");
    c = document.getElementById("lienzo");
    ctx = c.getContext("2d");
    $("canvas").attr("height",canvasHeight);
    $("canvas").attr("width",canvasWidth);
    $("canvas").css("zoom",windowWidth/canvasWidth);
    loginDone();
    temp = setTimeout("loop();",100);
    //TERRAIN
    drawTerrain();
    touchSwipe();
    clicArboles();
}

function loop(){
    console.log(tree);
    posX = column*squarePx;
    posY = row*squarePx;
    ctx.fillStyle ="black";
    ctx.font="small-caps bold 25px arial";
    ctx.textAlign ="center";
    ctx.fillText(user,posX+squarePx/2,posY);
    ctx.fillStyle ="blue";
    console.log(posX+"//"+posY);
    ctx.fillRect(posX,posY,squarePx,squarePx);
    tempColumn = column;
    tempRow = row;
}


function drawTween(){
    /*
    // Esta funcion guarda las condiciones iniciales de la animacion
    
    posx++;posy++;
    setTimeout("init()",30)
    */
    miposicion = {x: tempColumn, y: tempRow};						// La posicion INICIAL de la animacion
    target = document.getElementById('lienzo');		// A quien modifica la animacion
    tween = new TWEEN.Tween(miposicion)			// Creo una nueva animacion
        .to({x: column, y: row}, 1000)					// Hasta donde, y en cuanto tiempo
        .easing(TWEEN.Easing.Quadratic.InOut)			// El tipo de interpolacion que se realiza		
        .onUpdate(update)
        .onStart(function(){animateIniciado=true;animado=true;})
        .onComplete(function(){
            console.log("Se ha acabado la animación tween");
            tempColumn = column;
            tempRow = row;
            animado = false;
        });
        
        tween.start();
}



function animate( time ) {
    // Esta funcion realmente es un bucle de animacion
    requestAnimationFrame( animate );
    TWEEN.update( time );
}

function update() {
    // Esta es la funcion que realmente dibuja las cosas
    ctx.clearRect(0,0,canvasWidth,canvasHeight);  
    ctx.fillStyle ="black";
    ctx.fillText(user,miposicion.x*squarePx+squarePx/2,miposicion.y*squarePx);
    ctx.fillStyle = "blue";
    ctx.fillRect(miposicion.x*squarePx,miposicion.y*squarePx,squarePx,squarePx);
    console.log("xd")
}