//////////////////////////////////////////////////////////////////////////
//                   Función para el bucle principal                    //
//////////////////////////////////////////////////////////////////////////
function loop(){
    if(player.getLife() > 0){
        if(gameRunning){
            newResize();            // Nuevo tamaño de la ventana
            ctx.clearRect(0,0,windowWidth,windowHeight);
            manageBackground();     // Crea los backgrounds
            lifeHUD.createHUD(player.getLife(), "hud1", "Heal points: ");  // Crea la HUD de la vida
            shotHUD.createHUD(player.getAmmo(), "hud2", "Ammo: ");    // Crea la HUD de la bala
            scoreHUD.createHUD(player.getScore(), "hud3", "Score: ")    // Crea la HUD de la puntuación
            player.playerMove();    // Mueve el personaje
            enemy1Func();           // Crea enemigos, los mueve y los mata
            enemy1Shots();          // Gestiona los disparos del enemy 1
            enemy2Func();           // Gestiona los enemigos de tipo 2
            enemy3Func();           // Gestiona los enemigos de tipo 3
            drawPlayerShot();       // Dibuja las balas
            asteroidFunc();         // Crea asteroides, los mueve y los destruye
            Colisions();
            recManager();
            contadortiempo++;
            clearTimeout(loop_string);
            loop_string = setTimeout("loop()", 30);
            //console.log("Life: "+player.getLife()+" Ammo: "+player.getAmmo()); 
        }
    }else{
        manageGameOver();
    }
}

//////////////////////////////////////////////////////////////////////////
//                     Función para empezar el bucle                    //
//////////////////////////////////////////////////////////////////////////
function main_menu(){
    newResize();            // Nuevo tamaño de la ventana
    if(searchCookie("score")){
        $("#bestRow").html("Player1 - "+searchCookie("score")+" pts");
    }else{
        $("#bestRow").html("Player1 - 0 pts");
    }
    selectOption();         // SElecciona la opción del menu
}

//////////////////////////////////////////////////////////////////////////
//             Función para llamar la pantalla principal                //
//////////////////////////////////////////////////////////////////////////
function start(){
    resizeStart();
    resizeCanvas();
    playerControl();
    loop_string = setTimeout("main_menu()", 10);
}

//////////////////////////////////////////////////////////////////////////
//             Función para llamar la pantalla undefined                //
//////////////////////////////////////////////////////////////////////////
function undefinedScreen(){
    manageUndefined();
    getSizeImg = setTimeout("sizeImg()", 200);
}

$(document).ready(function(){
    undefinedScreen();
});