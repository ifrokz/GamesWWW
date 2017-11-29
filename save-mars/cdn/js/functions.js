// CANVAS
function resizeCanvas(){
    $("#lienzo").attr("width", windowWidth);
    $("#lienzo").attr("height", windowHeight);
}

function newResize(){
    $(window).resize(function(){
        windowHeight = window.innerHeight;
        windowWidth = window.innerWidth;
        resizeCanvas();
        playerHeight = windowHeight/5;
        playerWidth = playerHeight;
        for(var i in enemy1){
            enemy1[i].autoSize();
        }
        for(var i in enemy2){
            enemy2[i].autoSize();
        }
        for(var i in enemy3){
            enemy3[i].autoSize();
        }
        for(var i in bg){
            bg[i].autoSize();
            bg[i].setPosX(i*windowWidth);
        }
        for(var i in bg5){
            bg5[i].autoSize();
            bg5[i].setPosX(i*bg5[i].getHeight());
        }
        for(var i in asteroid){
            asteroid[i].autoSize();
        }
        imgBg2Width = windowWidth/1.5;
        imgBg2Height = windowHeight/1.5;
        imgBg3Width = windowWidth/1.5;
        imgBg3Height = windowHeight/1.5;
        imgBg4Width = windowWidth/1.5;
        imgBg4Height = windowHeight/1.5;
        $("#logo").css("width", windowHeight/1.5);
        $("#logo").css("height", windowHeight/1.5);
        $("#startMenu").css("font-size", windowHeight/14.7);
        $("#startControls").css("font-size", windowHeight/30+"px");
        $("#startControls").css("line-height", ((windowHeight/30)+25)+"px");
        $("#startBest").css("font-size", windowHeight/30+"px");
        $("#startBest").css("line-height", ((windowHeight/30)+25)+"px");
        $("#tutorial1").css("font-size", windowHeight/30+"px");
        $("#tutorial2").css("font-size", windowHeight/30+"px");
        $("#hud1").css("font-size", windowHeight/30+"px");
        $("#hud2").css("font-size", windowHeight/30+"px");
        $("#hud3").css("font-size", windowHeight/30+"px");
        $("#noBalas").css("font-size", windowHeight/30+"px");
        $("#gameOver1").css("font-size", windowHeight/15+"px");
        $("#gameOver2").css("font-size", windowHeight/15+"px");
        $("#gameOver3").css("font-size", windowHeight/30+"px");
    });
}

// PLAYER 
function playerControl(){
    $(document).keydown(function(event){
        if(event.which == 38 && gameRunning){dirPosY="up";}
        if(event.which == 40 && gameRunning){dirPosY="down";}
        if(event.which == 37 && gameRunning){dirPosX="left";}
        if(event.which == 39 && gameRunning){dirPosX="right";}
        if(event.which == 32 && gameRunning){
            if(player.isAmmoEmpty(ammoSelected)){
                $("#noBalas").css("display", "block");
                noBalasTutorial = setTimeout("clearNoBalas()", 1000);
                //console.log("no quedan balas");
            }else{
                shot[playerShotNumber] = new PlayerShot();
                shot[playerShotNumber].type = ammoSelected;
                shot[playerShotNumber].posX = player.getPosX()+playerWidth-5;
                shot[playerShotNumber].posY = player.getPosY()+playerHeight/2-shot[playerShotNumber].height/2;
                if(ammoSelected == 1){ 
                    player.setAmmo(1);
                }else{
                    player.setAmmo(2);
                }
                playerShotNumber++;
                //console.log(player.getAmmo());
            }
            
        }        
        if(event.which == 81 && gameRunning){
            if(ammoSelected == 1){
                ammoSelected = 2;
            }else{
                ammoSelected = 1;
            }
        }
    });
   

    
    $(document).keyup(function(){
        if(event.which == 38 && gameRunning && dirPosY == "up"){dirPosY = "";}
        if(event.which == 40 && gameRunning && dirPosY == "down"){dirPosY = "";}
        if(event.which == 37 && gameRunning && dirPosX == "left"){dirPosX = "";}
        if(event.which == 39 && gameRunning && dirPosX == "right"){dirPosX = "";}
        
        // PAUSE
        if(event.which == 27){
            gameRunning = !gameRunning;
            if(gameRunning){
                loop();
            }else{
                // MOSTRAR MENÚ PAUSA
            }
        }
    });    
}

//  Shots
function drawPlayerShot(){
    for(var i in shot){
        switch(shot[i].type){
            case 1:
                ctx.fillStyle = "blue";
                break;
            case 2:
                ctx.fillStyle = "green";
                break;
        } 
        shot[i].move();
        ctx.fillRect(shot[i].posX,shot[i].posY, shot[i].width, shot[i].height);
    }
    for(var i in enemy1Shotx){
        enemy1Shotx[i].move();
        ctx.fillStyle = "red";
        ctx.fillRect(enemy1Shotx[i].posX,enemy1Shotx[i].posY, enemy1Shotx[i].width, enemy1Shotx[i].height); 
    }
} 

function enemy1Shots() {
    for(var e in enemy1){
        if(Math.random()*100<=0.2){
            //console.log(enemy1[e].getPosX());
            enemy1Shotx[enemy1ShotCounter] = new cEnemy1Shot();
            enemy1Shotx[enemy1ShotCounter].type = 3;
            enemy1Shotx[enemy1ShotCounter].posX = enemy1[e].getPosX();
            enemy1Shotx[enemy1ShotCounter].posY = enemy1[e].getPosY()+enemy1[e].height/2-enemy1Shotx[enemy1ShotCounter].height/2;
            //console.log(enemy1Shotx[enemy1ShotCounter]);
            enemy1ShotCounter++;
        }
    }
}



// ASTEROIDES
function asteroidFunc(){
        newAsteroid();
        asteroidMove();
        
}

function newAsteroid(){ 
    if(Math.random()*100 < 0.25){
        asteroid[asteroidCount] = new cAsteroid(windowWidth,Math.random()*windowHeight,Math.ceil(Math.random()*2));   
        asteroidCount++;
    }
}

function asteroidMove(){
    for(var i in asteroid){
        asteroid[i].posX-=asteroid[i].speed;
        ctx.drawImage(asteroidImg[asteroid[i].type],asteroid[i].posX,asteroid[i].posY,asteroid[i].width,asteroid[i].height);       
    }
}


// ENEMIGOS
function newEnemy1(){
    if(contadortiempo%300 == 0){
        enemy1[enemy1Count] = new cEnemy1();
        enemy1Count++;
    }else if(Math.random()*100 < 0.1){        
        enemy1[enemy1Count] = new cEnemy1();
        enemy1Count++; 
    }
}

function enemyMovement(){
    for(var i in enemy1){
        enemy1[i].move();
        //console.log(enemy1[i].getPosX()+"-"+enemy1[i].getPosY())
    }
}

function enemyKill(){
    for(var e in enemy1){
        // si se sale de la pantalla por la izq se elimina de la matriz
         if(enemy1[e].getPosX() <= -enemy1[e].width){
            enemy1.splice(e, 1);
        }
    }
}

function enemy1Func(){
    newEnemy1();
    enemyMovement();
    enemyKill();
}

// ENEMIGO 2
function newEnemy2(){
    if(contadortiempo%300 == 0){
        enemy2[enemy2Count] = new cEnemy2();
        enemy2Count++;
    }else if(Math.random()*100 < 0.1){        
        enemy2[enemy2Count] = new cEnemy2();
        enemy2Count++; 
    }
}

function enemy2Movement(){
    for(var i in enemy2){
        if(enemy2[i].getPosY()-10 > player.getPosY()){
            enemy2Dition = -4;
        }else if(enemy2[i].getPosY()+10 < player.getPosY()){
            enemy2Dition = 4;
        }else{
            enemy2Dition = 0;
        }
        enemy2[i].move(enemy2Dition);
    }
}

function enemy2Kill(){
    for(var i in enemy2){
        if(enemy2[i].getPosX() <= -enemy2[i].width){
            enemy2.splice(i, 1)
        }
    }
}

function enemy2Func(){
    newEnemy2();
    enemy2Movement();
    enemy2Kill();
}

// ENEMIGO 3
function newEnemy3(){
    if(contadortiempo%3000 == 0){
        enemy3[enemy3Count] = new cEnemy3();
        enemy3Count++;
    }
}

function enemy3Movement(){
    for(var i in enemy3){
        enemy3[i].move();
    }
}

function enemy3Kill(){
    for(var i in enemy3){
        if(enemy3[i].getPosX() <= -enemy3[i].width*2){
            enemy3.splice(i, 1)
        }
    }
}

function enemy3Func(){
    newEnemy3();
    enemy3Movement();
    enemy3Kill();
}

// COLLISIONS
function Colisions(){ 
    // Collision  Asteroid w/shots 
    for(var a in asteroid){        
        for(var s in shot){          
            if(Math.abs((asteroid[a].posY+asteroid[a].height/2)-(shot[s].posY+shot[s].height/2)) < shot[s].height/2+asteroid[a].height/2 && Math.abs((asteroid[a].posX+asteroid[a].width/2)-(shot[s].posX+shot[s].width/2)) < shot[s].width/2+asteroid[a].width/2){  
                if(Math.random()*2<1){
                    //console.log("Ha soltado ompensa");
                }
                $("#explotions").append("<img src='cdn/img/explosion/1.gif' id='explotion"+ExplosionCount+"' style='top:"+(asteroid[a].posY-(asteroid[a].height/2))+"px;left:"+(asteroid[a].posX-(asteroid[a].width/2))+"px;display: block;'></img>");
                $("#explotion"+(ExplosionCount)).fadeOut(300);
                ExplosionCount++;
                if(ExplosionCount >= 3){
                    document.getElementById("explotion"+(ExplosionCount-3)).remove();
                }
                newRec(asteroid[a].posX,asteroid[a].posY);
                shot.splice(s, 1);
                asteroid.splice(a, 1);
                player.setScore(1);
                $("#music").html('<audio id="musica'+contadorMusica+'" src="cdn/audio/boom2.wav" controls="true"></audio>');
                var musica = document.getElementById("musica"+contadorMusica);
                musica.volume = 0.05;
                musica.play();
                contadorMusica++;
                if(contadorMusica >= 5){
                    $("#musica"+(contadorMusica-5)).remove();
                }
                //console.log("le has dado");
                break;
            }
        }
    }
    
    // Collision Enemy1 w/Player shots
    for(var e in enemy1){
        for(var s in shot){          
            if(Math.abs((enemy1[e].getPosY()+enemy1[e].height/2)-(shot[s].posY+shot[s].height/2)) < shot[s].height/2+enemy1[e].height/2 && Math.abs((enemy1[e].getPosX()+enemy1[e].width/2)-(shot[s].posX+shot[s].width/2)) < shot[s].width/2+enemy1[e].width/2){  
                if(Math.random()*2<1){
                    //console.log("Ha soltado ompensa");
                }
                $("#explotions").append("<img src='cdn/img/explosion/1.gif' id='explotion"+ExplosionCount+"' style='top:"+(enemy1[e].getPosY()-(enemy1[e].height/2))+"px;left:"+(enemy1[e].getPosX()-(enemy1[e].width/2))+"px;display: block;'></img>");
                $("#explotion"+(ExplosionCount)).fadeOut(300);
                ExplosionCount++;
                if(ExplosionCount >= 3){
                    document.getElementById("explotion"+(ExplosionCount-3)).remove();
                }
                newRec(enemy1[e].getPosX(),enemy1[e].getPosY());
                shot.splice(s, 1);
                enemy1.splice(e, 1);
                player.setScore(10);
                $("#music").html('<audio id="musica'+contadorMusica+'" src="cdn/audio/boom2.wav" controls="true"></audio>');
                var musica = document.getElementById("musica"+contadorMusica);
                musica.volume = 0.05;
                musica.play();
                contadorMusica++;
                if(contadorMusica >= 5){
                    $("#musica"+(contadorMusica-5)).remove();
                }
                //console.log("le has dado");              
                break;
            }
        }
    }

    // Collision Enemy2 w/Player shots
    for(var e in enemy2){
        for(var s in shot){          
            if(Math.abs((enemy2[e].getPosY()+enemy2[e].height/2)-(shot[s].posY+shot[s].height/2)) < shot[s].height/2+enemy2[e].height/2 && Math.abs((enemy2[e].getPosX()+enemy2[e].width/2)-(shot[s].posX+shot[s].width/2)) < shot[s].width/2+enemy2[e].width/2){  
                if(Math.random()*2<1){
                    //console.log("Ha soltado ompensa");
                }
                $("#explotions").append("<img src='cdn/img/explosion/1.gif' id='explotion"+ExplosionCount+"' style='top:"+(enemy2[e].getPosY()-(enemy2[e].height/2))+"px;left:"+(enemy2[e].getPosX()-(enemy2[e].width/2))+"px;display: block;'></img>");
                $("#explotion"+(ExplosionCount)).fadeOut(300);
                ExplosionCount++;
                if(ExplosionCount >= 3){
                    document.getElementById("explotion"+(ExplosionCount-3)).remove();
                }
                newRec(enemy2[e].getPosX(),enemy2[e].getPosY());
                shot.splice(s, 1);
                enemy2.splice(e, 1);
                player.setScore(20);
                $("#music").html('<audio id="musica'+contadorMusica+'" src="cdn/audio/boom2.wav" controls="true"></audio>');
                var musica = document.getElementById("musica"+contadorMusica);
                musica.volume = 0.05;
                musica.play();
                contadorMusica++;
                if(contadorMusica >= 5){
                    $("#musica"+(contadorMusica-5)).remove();
                }
                //console.log("le has dado");              
                break;
            }
        }
    }

    // Collision Enemy3 w/Player shots
    for(var e in enemy3){
        for(var s in shot){
            if(Math.abs((enemy3[e].getPosY()+enemy3[e].height/4-40)-(shot[s].posY+shot[s].height/2)) < shot[s].height/2+enemy3[e].height/4-40 && Math.abs((enemy3[e].getPosX()+enemy3[e].width)-(shot[s].posX+shot[s].width/2)) < shot[s].width/2+enemy3[e].width){  
                if(ammoSelected == 1){
                    shot.splice(s, 1);
                    if(tutorialShotOK){
                        tutorialShotOK = false;
                        $("#tutorial2").fadeIn(500);
                        textTutorialIn = setTimeout("showTutorial2()", 1);
                    }
                }else{
                    if(Math.random()*2<1){
                        //console.log("Ha soltado ompensa");
                    }
                    $("#explotions").append("<img src='cdn/img/explosion/1.gif' id='explotion"+ExplosionCount+"' style='top:"+enemy3[e].getPosY()+"px;left:"+(enemy3[e].getPosX()+(enemy3[e].width/2))+"px;display: block;'></img>");
                    $("#explotion"+(ExplosionCount)).fadeOut(300);
                    ExplosionCount++;
                    if(ExplosionCount >= 3){
                        document.getElementById("explotion"+(ExplosionCount-3)).remove();
                    }
                    newRec(enemy3[e].getPosX(),enemy3[e].getPosY());
                    shot.splice(s, 1);
                    enemy3.splice(e, 1);
                    player.setScore(50);
                    $("#music").html('<audio id="musica'+contadorMusica+'" src="cdn/audio/boom2.wav" controls="true"></audio>');
                    var musica = document.getElementById("musica"+contadorMusica);
                    musica.volume = 0.05;
                    musica.play();
                    contadorMusica++;
                    if(contadorMusica >= 5){
                        $("#musica"+(contadorMusica-5)).remove();
                    }
                    //console.log("le has dado");              
                    break;
                }
            }
        }
    }

    // Collision Asteroid w/ player Ship
    for(var a in asteroid){   
        if(Math.abs((asteroid[a].posY+asteroid[a].height/2)-(player.getPosY()+playerHeight/2)) < playerHeight/2+asteroid[a].height/2 ){  
            if(Math.abs((asteroid[a].posX+asteroid[a].width/2)-(player.getPosX()+playerWidth/2)) < playerWidth/2+asteroid[a].width/2){
                $("#explotions").append("<img src='cdn/img/explosion/1.gif' id='explotion"+ExplosionCount+"' style='top:"+(asteroid[a].posY-(asteroid[a].height/2))+"px;left:"+(asteroid[a].posX-(asteroid[a].width/2))+"px;display: block;'></img>");
                $("#explotion"+(ExplosionCount)).fadeOut(300);
                ExplosionCount++;
                if(ExplosionCount >= 3){
                    document.getElementById("explotion"+(ExplosionCount-3)).remove();
                }
                //console.log("as xocao");
                player.setScore(1);
                asteroid.splice(a, 1);
                $("#music").html('<audio id="musica'+contadorMusica+'" src="cdn/audio/boom3.wav" controls="true"></audio>');
                var musica = document.getElementById("musica"+contadorMusica);
                musica.volume = 0.05;
                musica.play();
                contadorMusica++;
                if(contadorMusica >= 5){
                    $("#musica"+(contadorMusica-5)).remove();
                }
                //RESTA VIDA
                player.setLessHP(10);
            }
        }
    }
    // Collision Player w/ Enemy1 ship
    for(var e in enemy1){
        if(Math.abs((player.getPosY()+playerHeight/2)-(enemy1[e].getPosY()+enemy1[e].height/2)) < playerHeight/2+enemy1[e].height/2 ){  
            if(Math.abs((player.getPosX()+playerWidth/2)-(enemy1[e].getPosX()+enemy1[e].width/2)) < playerWidth/2+enemy1[e].width/2){
                $("#explotions").append("<img src='cdn/img/explosion/1.gif' id='explotion"+ExplosionCount+"' style='top:"+(enemy1[e].getPosY()-(enemy1[e].height/2))+"px;left:"+(enemy1[e].getPosX()-(enemy1[e].width/2))+"px;display: block;'></img>");
                $("#explotion"+(ExplosionCount)).fadeOut(300);
                ExplosionCount++;
                if(ExplosionCount >= 3){
                    document.getElementById("explotion"+(ExplosionCount-3)).remove();
                }
                //console.log("as xocao");
                $("#music").html('<audio id="musica'+contadorMusica+'" src="cdn/audio/boom3.wav" controls="true"></audio>');
                var musica = document.getElementById("musica"+contadorMusica);
                musica.volume = 0.05;
                musica.play();
                contadorMusica++;
                if(contadorMusica >= 5){
                    $("#musica"+(contadorMusica-5)).remove();
                }
                enemy1.splice(e, 1);
                player.setScore(5);
                player.setLessHP(20);
            }
        }
    }

    // Collision Player w/ Enemy2 ship
    for(var e in enemy2){
        if(Math.abs((player.getPosY()+playerHeight/2)-(enemy2[e].getPosY()+enemy2[e].height/2)) < playerHeight/2+enemy2[e].height/2 ){  
            if(Math.abs((player.getPosX()+playerWidth/2)-(enemy2[e].getPosX()+enemy2[e].width/2)) < playerWidth/2+enemy2[e].width/2){
                $("#explotions").append("<img src='cdn/img/explosion/1.gif' id='explotion"+ExplosionCount+"' style='top:"+(enemy2[e].getPosY()-(enemy2[e].height/2))+"px;left:"+(enemy2[e].getPosX()-(enemy2[e].width/2))+"px;display: block;'></img>");
                $("#explotion"+(ExplosionCount)).fadeOut(300);
                ExplosionCount++;
                if(ExplosionCount >= 3){
                    document.getElementById("explotion"+(ExplosionCount-3)).remove();
                }
                //console.log("as xocao");
                $("#music").html('<audio id="musica'+contadorMusica+'" src="cdn/audio/boom3.wav" controls="true"></audio>');
                var musica = document.getElementById("musica"+contadorMusica);
                musica.volume = 0.05;
                musica.play();
                contadorMusica++;
                if(contadorMusica >= 5){
                    $("#musica"+(contadorMusica-5)).remove();
                }
                enemy2.splice(e, 1);
                player.setScore(10);
                player.setLessHP(15);
            }
        }
    }

    // Collision Player w/ Enemy3 ship
    for(var e in enemy3){
        //console.log("PosNave: "+enemy3[e].getPosX()+"/"+enemy3[e].getPosY());
        if(Math.abs((player.getPosY()+playerHeight/2)-(enemy3[e].getPosY()+enemy3[e].height/4-20)) < playerHeight/2+enemy3[e].height/4-20){  
            if(Math.abs((player.getPosX()+playerWidth/2)-(enemy3[e].getPosX()+enemy3[e].width)) < playerWidth/2+enemy3[e].width){
                //console.log("posExplosion: "+enemy3[e].getPosX()+"/"+enemy3[e].getPosY());
                $("#explotions").append("<img src='cdn/img/explosion/1.gif' id='explotion"+ExplosionCount+"' style='top:"+enemy3[e].getPosY()+"px;left:"+(enemy3[e].getPosX()+enemy3[e].width/2)+"px;display: block;'></img>");
                $("#explotion"+(ExplosionCount)).fadeOut(300);
                ExplosionCount++;
                if(ExplosionCount >= 3){
                    document.getElementById("explotion"+(ExplosionCount-3)).remove();
                }
                //console.log("as xocao");
                $("#music").html('<audio id="musica'+contadorMusica+'" src="cdn/audio/boom3.wav" controls="true"></audio>');
                var musica = document.getElementById("musica"+contadorMusica);
                musica.volume = 0.05;
                musica.play();
                contadorMusica++;
                if(contadorMusica >= 5){
                    $("#musica"+(contadorMusica-5)).remove();
                }
                player.setScore(25);
                enemy3.splice(e, 1);
                player.setLessHP(100);
            }
        }
    }

    // Collision Asteroid w/ enemy1 Ships
    for(var a in asteroid){
        for(var e in enemy1){
            if(Math.abs((asteroid[a].posY+asteroid[a].height/2)-(enemy1[e].getPosY()+enemy1[e].height/2)) < enemy1[e].height/2+asteroid[a].height/2 ){  
                if(Math.abs((asteroid[a].posX+asteroid[a].width/2)-(enemy1[e].getPosX()+enemy1[e].width/2)) < enemy1[e].width/2+asteroid[a].width/2){
                    $("#explotions").append("<img src='cdn/img/explosion/1.gif' id='explotion"+ExplosionCount+"' style='top:"+(enemy1[e].getPosY()-(enemy1[e].height/2))+"px;left:"+(enemy1[e].getPosX()-(enemy1[e].width/2))+"px;display: block;'></img>");
                    $("#explotion"+(ExplosionCount)).fadeOut(300);
                    ExplosionCount++;
                    if(ExplosionCount >= 3){
                        document.getElementById("explotion"+(ExplosionCount-3)).remove();
                    }
                    $("#explotions").append("<img src='cdn/img/explosion/1.gif' id='explotion"+ExplosionCount+"' style='top:"+(asteroid[a].posY-(asteroid[a].height/2))+"px;left:"+(asteroid[a].posX-(asteroid[a].width/2))+"px;display: block;'></img>");
                    $("#explotion"+(ExplosionCount)).fadeOut(300);
                    ExplosionCount++;
                    if(ExplosionCount >= 3){
                        document.getElementById("explotion"+(ExplosionCount-3)).remove();
                    }
                    //console.log("as xocao");
                    $("#music").html('<audio id="musica'+contadorMusica+'" src="cdn/audio/boom3.wav" controls="true"></audio>');
                    var musica = document.getElementById("musica"+contadorMusica);
                    musica.volume = 0.05;
                    musica.play();
                    contadorMusica++;
                    if(contadorMusica >= 5){
                        $("#musica"+(contadorMusica-5)).remove();
                    }
                    asteroid.splice(a, 1);
                    enemy1.splice(e, 1);
                    break;
                }
            }
        }
    }

    // Collision Asteroid w/ enemy2 Ships
    for(var a in asteroid){
        for(var e in enemy2){
            if(Math.abs((asteroid[a].posY+asteroid[a].height/2)-(enemy2[e].getPosY()+enemy2[e].height/2)) < enemy2[e].height/2+asteroid[a].height/2 ){  
                if(Math.abs((asteroid[a].posX+asteroid[a].width/2)-(enemy2[e].getPosX()+enemy2[e].width/2)) < enemy2[e].width/2+asteroid[a].width/2){
                    $("#explotions").append("<img src='cdn/img/explosion/1.gif' id='explotion"+ExplosionCount+"' style='top:"+(enemy2[e].getPosY()-(enemy2[e].height/2))+"px;left:"+(enemy2[e].getPosX()-(enemy2[e].width/2))+"px;display: block;'></img>");
                    $("#explotion"+(ExplosionCount)).fadeOut(300);
                    ExplosionCount++;
                    if(ExplosionCount >= 3){
                        document.getElementById("explotion"+(ExplosionCount-3)).remove();
                    }
                    $("#explotions").append("<img src='cdn/img/explosion/1.gif' id='explotion"+ExplosionCount+"' style='top:"+(asteroid[a].posY-(asteroid[a].height/2))+"px;left:"+(asteroid[a].posX-(asteroid[a].width/2))+"px;display: block;'></img>");
                    $("#explotion"+(ExplosionCount)).fadeOut(300);
                    ExplosionCount++;
                    if(ExplosionCount >= 3){
                        document.getElementById("explotion"+(ExplosionCount-3)).remove();
                    }
                    //console.log("as xocao");
                    $("#music").html('<audio id="musica'+contadorMusica+'" src="cdn/audio/boom3.wav" controls="true"></audio>');
                    var musica = document.getElementById("musica"+contadorMusica);
                    musica.volume = 0.05;
                    musica.play();
                    contadorMusica++;
                    if(contadorMusica >= 5){
                        $("#musica"+(contadorMusica-5)).remove();
                    }
                    asteroid.splice(a, 1);
                    enemy2.splice(e, 1);
                    break;
                }
            }
        }
    }
    
    // Collision player w/Enemy1 Shots   
    for(var s in enemy1Shotx){
        if(Math.abs((player.getPosY()+playerHeight/2)-(enemy1Shotx[s].posY+enemy1Shotx[s].height/2)) < enemy1Shotx[s].height/2+playerHeight/2 ){  
            if(Math.abs((player.getPosX()+playerWidth/2)-(enemy1Shotx[s].posX+enemy1Shotx[s].width/2)) < enemy1Shotx[s].width/2+playerWidth/2){
                //console.log("as xocao");
                $("#music").html('<audio id="musica'+contadorMusica+'" src="cdn/audio/boom2.wav" controls="true"></audio>');
                var musica = document.getElementById("musica"+contadorMusica);
                musica.volume = 0.05;
                musica.play();
                contadorMusica++;
                if(contadorMusica >= 5){
                    $("#musica"+(contadorMusica-5)).remove();
                }
                enemy1Shotx.splice(s, 1);
                player.setLessHP(10);
            }
        }
    }
    
    // Collision Asteroid w/ enemy1Shot
    for(var a in asteroid){
        for(var s in enemy1Shotx){
            if(Math.abs((asteroid[a].posY+asteroid[a].height/2)-(enemy1Shotx[s].posY+enemy1Shotx[s].height/2)) < enemy1Shotx[s].height/2+asteroid[a].height/2 ){  
                if(Math.abs((asteroid[a].posX+asteroid[a].width/2)-(enemy1Shotx[s].posX+enemy1Shotx[s].width/2)) < enemy1Shotx[s].width/2+asteroid[a].width/2){
                    //console.log("as xocao");
                    $("#music").html('<audio id="musica'+contadorMusica+'" src="cdn/audio/boom2.wav" controls="true"></audio>');
                    var musica = document.getElementById("musica"+contadorMusica);
                    musica.volume = 0.05;
                    musica.play();
                    contadorMusica++;
                    if(contadorMusica >= 5){
                        $("#musica"+(contadorMusica-5)).remove();
                    }
                    asteroid.splice(a, 1);
                    enemy1Shotx.splice(s, 1);
                    break;
                }
            }
        }
    } 
    for(var r in rec){
        if(Math.abs((player.getPosY()+playerHeight/2)-(rec[r].posY+recHeight/2)) < recHeight/2+playerHeight/2){  
            if(Math.abs((player.getPosX()+playerWidth/2)-(rec[r].posX+recWidth/2)) < recWidth/2+playerWidth/2){
                if(rec[r].type == 1){
                    player.recAmmo(20);
                    //console.log(player.ammoMax);
                }else{
                    player.setLessHP(-10);
                }
                //console.log(rec[r].type);
                rec.splice(r ,1);
            }
        }        
    }
}

// BACKGROUND
function drawBg(){
    for(var i in bg){
        bg[i].moveBackgroundX(-0.2);
        //console.log(bg[i].getPosX()+"-"+ bg[i].getPosY()+"-"+ bg[i].getWidth()+"-"+ bg[i].getHeight())
        if(bg[i].getPosX() > -(bg[i].getWidth())){  
            ctx.drawImage(backgroundImg[1], bg[i].getPosX(), bg[i].getPosY(), bg[i].getWidth(), bg[i].getHeight());
        }else{
            bg[i].posX = windowHeight;
        }
    }
}

function drawBg2(){
    for(var i in bg2){
        bg2[i].moveBackgroundX(-0.8);
        //console.log(bg2[i].getPosX()+" - "+ bg2[i].getPosY());
        if(bg2[i].getPosX() > -imgBg2Width){
            ctx.drawImage(backgroundImg[2], bg2[i].getPosX(), bg2[i].getPosY(), imgBg2Width, imgBg2Height);
        }else{
            bg2[i].posX = windowWidth+Math.random()*imgBg2Width;
            bg2[i].posY = Math.random()*(windowHeight+imgBg3Height) - imgBg3Height/2;
        }
    }
}

function drawBg3(){
    for(var i in bg3){
        bg3[i].moveBackgroundX(-1);
        //console.log(bg3[i].getPosX()+" - "+ bg3[i].getPosY());
        if(bg3[i].getPosX() > -imgBg3Width){
            ctx.drawImage(backgroundImg[3], bg3[i].getPosX(), bg3[i].getPosY(), imgBg3Width, imgBg3Height);
        }else{
            bg3[i].posX = windowWidth+Math.random()*imgBg3Width;
            bg3[i].posY = Math.random()*(windowHeight+imgBg3Height) - imgBg3Height/2;
        }
    }
}

function drawBg4(){
    for(var i in bg4){
        bg4[i].moveBackgroundX(-1.2);
        //console.log(bg4[i].getPosX()+" - "+ bg4[i].getPosY());
        if(bg4[i].getPosX() > -imgBg4Width){
            ctx.drawImage(backgroundImg[4], bg4[i].getPosX(), bg4[i].getPosY(), imgBg4Width, imgBg4Height);
        }else{
            bg4[i].posX = windowWidth+Math.random()*imgBg4Width;
            bg4[i].posY = Math.random()*(windowHeight+imgBg4Height) - imgBg4Height/2;
        }
    }
}

function drawBg5(){
    for(var i in bg){
        bg5[i].moveBackgroundX(-0.6);
        //console.log(bg5[i].getPosX()+"-"+ bg5[i].getPosY()+"-"+ bg5[i].getWidth()+"-"+ bg5[i].getHeight())
        if(bg5[i].getPosX() > -imgBg5Width){  
            ctx.drawImage(backgroundImg[5], bg5[i].getPosX(), bg5[i].getPosY(), bg5[i].getHeight(), bg5[i].getHeight());
        }else{
            bg5[i].setPosX(3*bg5[i].getHeight());
        }
    }
}

function drawMars(){
    mars.moveBackgroundX(-2);
    if(mars.getPosX() > -(windowWidth*1.5)){
        ctx.drawImage(marsImg, mars.getPosX(), mars.getPosY(), windowWidth*1.5, windowWidth*1.5);
    }
}

function manageBackground(){
    drawBg();               // Dibuja el bg principal
    drawBg2();              // Dibuja la nebulosa 1
    drawBg3();              // Dibuja la nebulosa 2
    drawBg4();              // Dibuja la nebulosa 3
    drawBg5();              // Dibuja las segundas estrellas
    drawMars();             // Dibuja marte
}

function clearTutorial1(){
    $("#tutorial1").fadeOut(500);
    clearTimeout(textTutorial);
}

function firstTutorial(){
    $("#tutorial1").fadeIn(500);
    clearTimeout(textTutorial);
    textTutorial = setTimeout("clearTutorial1()", 4000);
}

function clearTutorialShot(){
    $("#tutorial2").fadeOut(500);
    clearTimeout(textTutorialIn);
}

function showTutorial2(){
    clearTimeout(textTutorialIn);
    textTutorialIn = setTimeout("clearTutorialShot()", 4000);
}

function clearNoBalas(){
    $("#noBalas").css("display", "none");
    clearTimeout(noBalasTutorial);
}

function secondGameOver(){
    $("#gameOver2").html(player.getScore()+" pts");
    $("#gameOver2").css("display", "block");
    $("#gameOver3").css("display", "block");
    $(document).keydown(function(key3){
        if(key3.which == 13){
            window.location = "";
        }
    });
}

function searchCookie(key){
    var exploit = document.cookie.split(";");
    for(var i=0;i<exploit.length;i++){
        if(key == exploit[i].split("=")[0]){
            return exploit[i].split("=")[1];
        }
    }
}
// RECOGIBLES
function recManager(){
    drawRec();
    //console.log(rec);
}
function drawRec(){
    for(var r in rec){
        ctx.drawImage(recImg[rec[r].type],rec[r].posX,rec[r].posY,recWidth,recWidth)
        rec[r].posX += rec[r].speed; 
    }

}
function newRec(posX,posY){
    if(Math.random()*100<50){
        rec[recNum] = new Rec(posX,posY,Math.ceil(Math.random()*2))
        recNum++;
    }
}

function manageGameOver(){
    $("#lienzo").fadeOut(1000);
    $("#HUD").fadeOut(1000);
    $("#tutorial1").fadeOut(1000);
    $("#tutorial2").fadeOut(1000);
    $("#noBalas").fadeOut(1000);
    $("#explotions").fadeOut(1000);
    $("#gameOver1").css("display", "block");
    $("#music").html('<audio id="musica" src="cdn/audio/gameover.wav" controls="true"></audio>');
    var musica = document.getElementById("musica");
    musica.volume = 0.05;
    musica.play();
    if(searchCookie("score") < player.getScore()){
        document.cookie = "score="+player.getScore()+";";
    }
    setTimeout("secondGameOver()", 5500);
}
