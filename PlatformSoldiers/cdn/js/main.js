$(document).ready(function(){
    start();
});

function start(){
    canvasResize();
    temp = setTimeout("loop();",1000);
}

function loop(){

    // bg
    ctx.clearRect(0,0,windowWidth,windowHeight);
    ctx.drawImage(bgImg,0,0,windowWidth,windowHeight);

    
    player.move();
    newLevel();

    
    if( block.length > 0){
        for(var b in block){
            block[b].draw();
        }
    }

    collideManager();

    // temp
    clearTimeout(temp);
    temp = setTimeout("loop();",16.5);
}