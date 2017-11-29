function Player(){
    this.row = null;
    this.col = null;
    this.posX = null;
    this.posY = null;
    
    /* - - STATS - - */
    
    
    this.startTime = null;
    this.roomID = null;
    //HP
    this.HP = 3;
    this.maxHP = 3;
    this.minHP = 0;
    this.maxHPLimit = 10;
    
    // MOVEMENT
    this.maxSpeed = 6;
    this.maxSpeedLimit = 6;
    this.minSpeedLimit = 1;
    
    // PLAYER
    this.size = 1;
    this.maxSize = 2;
    this.minSize = 0.5;
    
    
    //BOMBS
    this.numBombs = 0;
    
    // Type 0 = bomba común
    // Type 1 = bomba fétida
    this.bombsType = 0;
    
    this.maxBombs = 10;
    
    this.maxBombsLimit = 100;
    this.minBombsLimit = 0;
    
    // SHOT
    this.shotDmg = 1;
    this.minShotDmgLimit = 0.5;
    this.maxShotDmgLimit = 5;
    this.shotSpeed = 5;
    this.shotSize = 4;  
    this.shotMinTime = 1000; // En ms.  
    this.shotMinInitialTime = 1000;
    this.shotMinTimeLimit = 250;
    this.slowDownRate = 0;
    this.slowDownRateLimit = 100;
    
    /* - - STATS - - */
    
    /* - -  - - */ 
    this.lastShot = 0; // control ms para la cadencia.
    this.shotting = false;
    this.shotDir = null;
    
    /* - -  - - */ 
    
    this.height = 256;
    this.width = 170;
    
    this.speedX = 0;
    this.speedY = 0;
    
    var that = this; // variable referencia a this para usarla dentro del  jQuery
    
    // variables para el correcto moviemiento en todas las direccioens
    this.moveY = null;
    this.moveX = null;
    
    this.sprites = [];
    this.spriteDirection = "down";
    this.spriteNum = 0;
    
    this.shots = new Array();

    this.HUD_data = function(){
        var tiempoTotal = new Date().getTime();
        tiempoTotal = tiempoTotal-this.startTime;
        var segundos = Math.floor(tiempoTotal/1000);
        var minutos = Math.floor(segundos/60);
        segundos = segundos%60;
        
        
        var shotFireRate = this.shotMinInitialTime/this.shotMinTime;
        if(segundos < 10){
            segundos = "0"+segundos;
        }
        return {
            hp: { max: this.maxHP, min: this.minHP, hp: this.HP },
            bombs: { num: this.numBombs, type: this.bombsType, max: this.maxBombs },
            shot: { speed: this.shotSpeed, damage: this.shotDmg.toFixed(2) , size: this.shotSize , fireRate: shotFireRate.toFixed(2) , slowDownRate: this.slowDownRate },
            time: { min: minutos, sec: segundos },
            speed: this.maxSpeed.toFixed(2) ,
            size: this.size 
        }
    }

    //______________CONTROLES DEL JUGADOR_____________//
    $(document).keydown(function(event){
        // MOVIMIENTO
        if(event.which == 65){
            that.moveX = "left";
            that.spriteDirection = "left";
        }else if(event.which == 68){
            that.moveX = "right";
            that.spriteDirection = "right";
        }else if(event.which == 87){
            that.moveY = "up";
            that.spriteDirection = "up";
        }else if(event.which == 83){
            that.moveY = "down";
            that.spriteDirection = "down";
        }
        
        // DISPARO
        if(event.which == 37){
            that.shotDir = "left";
            //console.log("Disparo a la izq");
        }else if(event.which == 39){
            that.shotDir = "right";
           // console.log("Disparo a la dcha");
        }else if(event.which == 38){
            //console.log("Disparo arriba");
            that.shotDir = "up";
        }else if(event.which == 40){
            that.shotDir = "down";
           // console.log("Disparo abajo");
        }
        
        if(event.which == 37 || event.which == 38 || event.which == 39 || event.which == 40){
            disparar();
        }
        
    });
    
    $(document).keyup(function(){
        // MOVIMIENTO
        if(event.which == 65 && that.moveX == "left"){
            if(that.spriteDirection == "left"){
                that.spriteDirection = null;    
            }
            that.moveX = null;
        }else if(event.which == 68 && that.moveX == "right"){
            if(that.spriteDirection == "right"){
                that.spriteDirection = null;    
            }
            that.moveX = null;
        }else if(event.which == 87 && that.moveY == "up"){
            if(that.spriteDirection == "up"){
                that.spriteDirection = null;    
            }
            that.moveY = null;
        }else if(event.which == 83 && that.moveY == "down"){
            if(that.spriteDirection == "down"){
                that.spriteDirection = null;    
            }
            that.moveY = null;
        }
        
        
        if(event.which == 37 && that.shotDir == "left"){
            that.shotting = false;
        }
        else if(event.which == 38 && that.shotDir == "up"){
            that.shotting = false;
        }
        else if(event.which == 39 && that.shotDir == "right"){
            that.shotting = false;
        }
        else if(event.which == 40 && that.shotDir == "down"){
            that.shotting = false;
        }
    });
    //----------------------------------------------------//
    
    //Corrige el disparo para que se dispare de manera continuada.
    this.shotCorrection = function(){
        if(that.shotting){
            disparar();
        }
    }
    function disparar(){
        var ms = new Date().getTime();
        if(ms-that.lastShot > that.shotMinTime){
            that.shotting = true;
            that.lastShot = ms;
            //var roomData = game.room.data();
            that.shots.push(new Shot(that.posX,that.posY,that.shotSpeed,that.shotSpeed,that.shotSize,that.shotDmg,that.shotDir,that.speedX,that.speedY,that.slowDownRate,that.roomID));
           // console.log(this.shots);   
        }
    }
    this.move = function(){
        //console.log(this.maxSpeed+" | "+this.speedX+","+this.speedY);
        
        if(this.moveX == "right"){
            if(this.speedX < 0){
                this.speedX+= this.maxSpeed/5;
            }else if(this.speedX < this.maxSpeed){
                this.speedX+= this.maxSpeed/15;
            }
            if(this.speedX > this.maxSpeed){
                this.speedX = this.maxSpeed;
            }
        }else if(this.moveX == "left"){
            if(this.speedX > 0){
                this.speedX-= this.maxSpeed/5;
            }else if(this.speedX > -this.maxSpeed){
                this.speedX -= this.maxSpeed/15;
            }
            if(this.speedX < -this.maxSpeed){
                this.speedX = -this.maxSpeed;
            }
        }
        
        if(that.moveY == "up") {
            if(this.speedY > 0){
                this.speedY -= this.maxSpeed/5;
            }else if(this.speedY > -this.maxSpeed){
                this.speedY -= this.maxSpeed/15;
            }
            if(this.speedY < -this.maxSpeed){
                this.speedY = -this.maxSpeed;
            }
        }else if(that.moveY == "down"){
            if(this.speedY < 0){
                this.speedY += this.maxSpeed/5;
            }else if(this.speedY < this.maxSpeed){
                this.speedY += this.maxSpeed/15;
            }
            if(this.speedY > this.maxSpeed){
                this.speedY = this.maxSpeed;
            }
        }
        
        if(!that.moveX){
            if(this.speedX > 0){
                this.speedX-= this.maxSpeed/15;
            }else if(this.speedX < 0){
                this.speedX+= this.maxSpeed/15;
            }
        }
        if(Math.abs(this.speedX) < this.maxSpeed/15 && !this.moveX){
            this.speedX = 0;
        }
        
        if(!that.moveY){
            if(this.speedY > 0){
                this.speedY-= this.maxSpeed/15;
            }else if(this.speedY < 0){
                this.speedY+= this.maxSpeed/15;
            }
        }
        if(Math.abs(this.speedY) < this.maxSpeed/15 && !this.moveY){
            this.speedY = 0;
        }
        
        var moveY = false;
        var moveX = false;
        
       // var roomData = game.room.data();
        
        var roomData = [];
        for(var i in game.room){
            roomData[i] = game.room[i].data();
        }
        // HABITACIÓN PRINCIPAL (LÍMITES)   * * * ID: 0
        if(roomData[this.roomID].type == 0){
            if(this.posX <= 1550 && this.posX >= 280){
                moveX = true;
            }
            
            if(this.posY >= 20 && this.posY <= 715){
                moveY = true;
            }
        }
        
        // HABITACIÓN FORMA PASILLO (LÍMITES)   * * * ID: 1
        if(roomData[this.roomID].type == 1){
            if(this.posX >= 280 && this.posX <= 3470){
                moveX = true;
            }
            
            if(this.posY >= 15 && this.posY <= 715){
                moveY = true;
            }
        }
        
        // HABITACIÓN FORMA de L (LÍMITES)   * * * ID: 2
        if(roomData[this.roomID].type == 2){
            
            if(this.posY < 885){
                if(this.posX >= 180 && this.posX <= 800){
                    moveX = true;
                }
            }else if(this.posY >= 885){
                if(this.posX >= 180 && this.posX <= 1620){
                    moveX = true;
                }
            }
            
            
            
            
            if(this.posY >= 50 && this.posY <= 1560){
                moveY = true;
            }
            
        }
        
        // HABITACIÓN FORMA de L (LÍMITES)   * * * ID: 3
        if(roomData[this.roomID].type == 3){
            if(this.posX >= 270 && this.posX <= 3465){
                moveX = true;
            }
            
            if(this.posY >= 15 && this.posY <= 1795){
                moveY = true;
            }
        }
        
        /* SI EL MOVIMIENTO ESTÁ ACTIVADO */
        if(moveX){
            this.posX += this.speedX;
            
            /* - - habitación ID:0 - - */
            if(roomData[this.roomID].type == 0){
                if(this.posX > 1550){
                    this.posX = 1550;
                }else if(this.posX < 280){
                    this.posX = 280;
                }
            }
            /* - - habitación ID:0 - - */
            
            /* - - habitación ID:1 - - */
            if(roomData[this.roomID].type == 1){
                if(this.posX < 280){
                    this.posX = 280;
                }else if(this.posX > 3470){
                    this.posX = 3470;
                }
            }
            /* - - habitación ID:1 - - */
        }
        
        if(moveY){
            this.posY += this.speedY;
            
            /* - - habitación ID:0 - - */
            if(roomData[this.roomID].type == 0){
                if(this.posY < 20){
                    this.posY = 20;
                }else if(this.posY > 715){
                    this.posY = 715;
                } 
            }
            /* - - habitación ID:0 - - */
            
            /* - - habitación ID:1 - - */
            if(roomData[this.roomID].type == 1){
                if(this.posY < 15){
                    this.posY = 15;
                }else if(this.posY > 715){
                    this.posY = 715;
                } 
            }
            /* - - habitación ID:1 - - */
            
            /* - - habitación ID:2 - - */
            if(roomData[this.roomID].type == 2){
                if(this.posY < 880){
                    if(this.posX < 180 && this.posX - this.maxSpeed < 885){
                        this.posX = 180;   
                    }else if(this.posX > 800){
                        this.posX = 800;
                    }
                }else if(this.posY >= 885){
                    if(this.posX < 180){
                        this.posX = 180;
                    }else if(this.posX > 1620){
                        this.posX = 1620;
                    }
                }
                
                
                if(this.posX > 800){
                    if(this.posY < 890){
                        this.posY = 890;
                    }
                }    
                
                if(this.posY < 50){
                    this.posY = 50;
                }else if(this.posY > 1560){
                    this.posY = 1560;
                }
            }
            /* - - habitación ID:2 - - */
            
            /* - - habitación ID:3 - - */
            if(roomData[this.roomID].type == 3){
                if(this.posX < 270){
                    this.posX = 270;
                }else if(this.posX > 3465){
                    this.posX = 3465;
                }
                if(this.posY < 15){
                    this.posY = 15;
                }else if(this.posY > 1795){
                    this.posY = 1795;
                }
            }
            /* - - habitación ID:3 - - */
        }
        /* SI EL MOVIMIENTO ESTÁ ACTIVADO */
        

        
        //console.log(this.posX+","+this.posY+" - "+this.width+","+this.height);
    }
    
    this.draw = function(){
        this.move();

        if(!that.spriteDirection){
            if(this.speedX > 0 && Math.abs(this.speedX) > Math.abs(this.speedY)){
                this.spriteDirection = "right";
            }else if(this.speedX < 0 && Math.abs(this.speedX) > Math.abs(this.speedY)){
                this.spriteDirection = "left";
            }else if(this.speedY > 0 && Math.abs(this.speedX) < Math.abs(this.speedY)){
                this.spriteDirection = "down";
            }else if(this.speedY < 0 && Math.abs(this.speedX) < Math.abs(this.speedY)){
                this.spriteDirection = "up";
            }else if(this.speedX == 0 &&  this.speedY == 0){
                this.spriteDirection = "down";
            }
        }
        if (!that.spriteDirection)that.spriteDirection = "down";
        var cadaCuantosFps = 7;
        if(this.speedX != 0 || this.speedY !=0){
            this.spriteNum++;
            if(this.spriteNum == 8*cadaCuantosFps+1){
                this.spriteNum = 1;
            }
        }else{
            this.spriteNum = 0;
        }
      //  console.log(this.spriteNum+""+this.spriteDirection)
        var imagennano = Math.ceil(this.spriteNum/cadaCuantosFps)+""+this.spriteDirection;
        this.width = this.sprites[imagennano].width/1.5;
        this.height = this.sprites[imagennano].height/1.5;
        
        
        dibujarX = this.posX;
        dibujarY = this.posY;
        
        var tempGapX = 0;
        var tempGapY = 0;
        
        /* GESTIÓN DLE GAP */
        var roomData = [];
        for(var i in game.room){
            roomData[i] = game.room[i].data();
        }
        
        if(roomData[this.roomID].type != 0){  // GAP EN X
            if(this.posX+170/2 > game.windowWidth/2 && this.posX+170/2+game.windowWidth/2 <= roomData[this.roomID].width){
                //console.log(roomData[this.roomID].type);
                dibujarX = game.windowWidth/2-170/2;
                tempGapX = dibujarX-this.posX;
                game.setGapX(tempGapX);
            }else if(this.posX+170/2+game.windowWidth/2 >= roomData[this.roomID].width ){
                dibujarX = this.posX+roomData[this.roomID].gapX;
            }
        }
        
        if(roomData[this.roomID].type > 1){
            if(this.posY+this.height/2 > game.windowHeight/2 && this.posY+this.height/2+game.windowHeight/2 <= roomData[this.roomID].height){
                dibujarY = game.windowHeight/2-this.height/2;
                tempGapY = dibujarY-this.posY;
                game.setGapY(tempGapY);
            }else if(this.posY+this.height/2+game.windowHeight/2 >= roomData[this.roomID].height){
                dibujarY = this.posY+roomData[this.roomID].gapY;
            }
        }
        
        /* GESTIÓN DLE GAP */
        
        game.ctx.drawImage(this.playerShadow, dibujarX+15, dibujarY+this.height-20);
        game.ctx.drawImage(this.sprites[imagennano], dibujarX, dibujarY, this.width, this.height);
    }
    
    this.cargarSprites = function(){
        for(var i = 0; i<=8;i++){
            this.sprites[i+"up"] = new Image();
            this.sprites[i+"up"].src = "img/player/"+i+"up.png";
            this.sprites[i+"down"] = new Image();
            this.sprites[i+"down"].src = "img/player/"+i+"down.png";
            this.sprites[i+"right"] = new Image();
            this.sprites[i+"right"].src = "img/player/"+i+"right.png";
            this.sprites[i+"left"] = new Image();
            this.sprites[i+"left"].src = "img/player/"+i+"left.png";
            this.playerShadow = new Image();
            this.playerShadow.src = "img/player/shadow.png";
        }
    }
    
    
    this.propCollision = function(){
        
        for(var x in game.map.props){
            var propWH = game.map.props[x].getWidthAndHeight();
            if(Math.abs( (this.posX+this.width/2)-(game.map.props[x].posX+propWH.width/2)) < propWH.width/2+this.width/6){
                if(Math.abs( (this.posY+this.height-this.height/4) - (game.map.props[x].posY+propWH.height/2) ) < propWH.height/2+this.height/4  ){
                    console.log("collideCompleto");
                    if(true){ // (this.posY+this.height*0.75)-(game.map.props[x].posY+propWH.height/2) 
                        var deleteProp = false;
                        if(game.map.props[x].type == 0){ // 0_Sandwich = 2 Vida
                            if(this.maxHP > this.HP){ // si tenemos menos vida de la máxima
                                this.HP += 2;
                                if(this.HP > this.maxHP){ // si suma más dvida de la máxima
                                    this.HP = this.maxHP;
                                }
                                deleteProp = true;
                            }
                        }else if(game.map.props[x].type == 1){ // _Chocolate = +2 Vida -0.1 Speed
                            if(this.maxHP > this.HP){// si tenemos menos vida de la máxima
                                this.HP += 2; 
                                if(this.HP > this.maxHP){// si suma más dvida de la máxima
                                   this.HP = this.maxHP;
                                }
                                deleteProp = true;
                            }
                            
                            if(this.maxSpeed > this.minSpeedLimit){
                                this.maxSpeed -= 0.1;
                                if(this.maxSpeed < this.minSpeedLimit){
                                    this.maxSpeed = this.minSpeedLimit;
                                }
                                deleteProp = true;
                            }
                        }else if(game.map.props[x].type == 2){ // 2_Bollería Chocolate = +1 Vida. -0.1 Speed
                            if(this.maxHP > this.HP){ // si tenemos menos vida de la máxima
                                this.HP += 1;
                                if(this.HP > this.maxHP){ // si suma más dvida de la máxima
                                    this.HP = this.maxHP;
                                }
                                deleteProp = true;
                            }
                            
                            if(this.maxSpeed > this.minSpeedLimit){
                                this.maxSpeed -= 0.1;
                                if(this.maxSpeed < this.minSpeedLimit){
                                    this.maxSpeed = this.minSpeedLimit;
                                }
                                deleteProp = true;
                            }
                        }else if(game.map.props[x].type == 3){ // 3_Zumo = + 1 Vida. +0.2 Speed
                            if(this.maxHP > this.HP){ // si tenemos menos vida de la máxima
                                this.HP += 1;
                                if(this.HP > this.maxHP){ // si suma más dvida de la máxima
                                    this.HP = this.maxHP;
                                }
                                deleteProp = true;
                            }
                            
                            if(this.maxSpeedLimit > this.maxSpeed){
                                this.maxSpeed += 0.2;
                                if(this.maxSpeed > this.maxSpeedLimit){
                                   this.maxSpeed = this.maxSpeedLimit; 
                                }
                                deleteProp = true;
                            }
                            
                        }else if(game.map.props[x].type == 4){ // 4_Chicles = Ramdom (+1 o +-1 HP)
                            if(Math.random() < 0.5){
                                this.HP --;
                                if(this.HP < this.minHP){
                                    this.HP = this.minHP;
                                }
                            }else{
                                if(this.HP < this.maxHP){
                                   this.HP++; 
                                   if(this.HP > this.maxHP){
                                       this.HP = this.maxHP;
                                   }
                                }
                            }
                            deleteProp = true;
                            
                        }else if(game.map.props[x].type == 5){ // 5_ Corazón chuche = +1 Máx HP
                            if(this.maxHP < this.maxHPLimit){
                                this.maxHP += 1;
                                if(this.maxHP > this.maxHPLimit){
                                    this.maxHP = this.maxHPLimit;
                                }
                                deleteProp = true;
                            }
                            
                        }else if(game.map.props[x].type == 6){ // 6_Oreo Random +1 HP / Random -1 Máx HP
                            if(Math.round(Math.random()) == 0){
                                this.maxHP -= 1;
                            }else{
                                this.HP +=1;
                            }
                            deleteProp = true;
                            
                        }else if(game.map.props[x].type == 7){ // 7_ Mochila = -0.2 maxSpeed, maxBombs +5
                            if(this.maxSpeed > this.minSpeedLimit){
                                this.maxSpeed -= 0.1;
                                if(this.maxSpeed < this.minSpeedLimit){
                                    this.maxSpeed = this.minSpeedLimit;
                                }
                                deleteProp = true;
                            }
                            
                            if(this.maxBombs < this.maxBombsLimit){
                                this.maxBombs += 5;
                                if(this.maxBombs > this.maxBombsLimit){
                                    this.maxBombs = this.maxBombsLimit;
                                }
                                deleteProp = true;
                            }
    
                        }else if(game.map.props[x].type == 8){ // 8_Dinamita  = +1 dinamita(bombas del isaac)
                            if(this.numBombs < this.maxBombs){
                                this.numBombs += 1;
                                if(this.numBombs > this.maxBombs){
                                    this.numBombs = this.maxBombs;
                                }
                                deleteProp = true;
                            }
                            
                        }else if(game.map.props[x].type == 9){ // 9_Cohete dinamita = +2 dinamita
                            if(this.numBombs < this.maxBombs){
                                this.numBombs += 2;
                                if(this.numBombs > this.maxBombs){
                                    this.numBombs = this.maxBombs;
                                }
                                deleteProp = true;
                            }
                            
                        }else if(game.map.props[x].type == 10){ // 10_Chinchetas =  x1.5 Daño
                            this.shotDmg *= 1.5;
                            deleteProp = true;
    
                        }else if(game.map.props[x].type == 11){ //  11_ Bomba fétida = bombas fétidas en vez de normales.
                            this.bombsType = 1;
                            deleteProp = true;
                            
                        }else if(game.map.props[x].type == 12){ //   12_ Canicas = *0.9 Daño disparo , x1.2 ShotSpeed, shotMinTime -100ms
                            this.shotDmg *= 0.9;
                            this.shotSpeed *= 1.2;
                            if(this.shotMinTime > this.shotMinTimeLimit){
                                this.shotMinTime -= 100;
                                if(this.shotMinTime < this.shotMinTimeLimit){
                                    this.shotMinTime = this.shotMinTimeLimit;
                                }
                            }
                            deleteProp = true;
                        }else if(game.map.props[x].type == 13){ // 13_Canuto bolipapel = - 0.1 shotDmg, +10% disparro que relentiza al enemigo.
                            if(this.shotDmg > this.minShotDmgLimit){
                                this.shotDmg -= 0.1;
                                if(this.shotDmg < this.minShotDmgLimit){
                                    this.shotDmg = this.minShotDmgLimit;
                                }
                                deleteProp = true;
                            }
                            if(this.slowDownRate < this.slowDownRateLimit){
                                this.slowDownRate += 10;
                                if(this.slowDownRate > this.slowDownRateLimit){
                                    this.slowDownRate = this.slowDownRateLimit;
                                }
                                deleteProp = true;
                            }
                            
                        }
                    }
                    
                    if(deleteProp = true){ // si se cumple la condidión para que se pueda recojer, se elemina.
                        game.map.props.splice(x,1);
                    }/*else{ // si no se empuja.
                        if(Math.abs( (this.posY+this.height-this.height/4) - (game.map.props[x].posY+propWH.height/2) < propWH.height/2+this.height/4 ) ){
                            var pos = game.map.props[x].getPos();
                            //game.map.props[x].speedX
                        
                            /* CALCULO LA DISTANCIA ENTRE CENTROS PARA SABER EN QUE QUIRECCIÓN SE CHOCAN */
                            
                            /*var distX = (this.posX+this.width/2)-(pos.x+game.map.propsImg[game.map.props[x].type].width/2);
                            var distY = (this.posY+this.height/2+this.height/4)-(pos.y+game.map.propsImg[game.map.props[x].type].height/2);
                            
                            var hipotenusa = Math.sqrt(Math.pow(Math.abs(distX),2)+Math.pow(Math.abs(distY),2));
                            console.log(hipotenusa);
                            if(hipotenusa < this.width/2){
                                var totalSpeed = Math.abs(this.speedX)+Math.abs(this.speedY);
                                console.log("X: "+distX+" Y:"+distY);
                                console.log(Math.asin(Math.abs(distX)/hipotenusa));
                            }*/
                             
                            /*
                            console.log("X: "+this.speedX + " Y: " + this.speedY);
                            if(this.speedX != 0){
                                if(this.speedX > 0){
                                    if(game.map.props[x].speedX < this.speedX){
                                        game.map.props[x].speedX = this.speedX;  
                                    }
                                }else{
                                    if(game.map.props[x].speedX > this.speedX){
                                        game.map.props[x].speedX = this.speedX;  
                                    }
                                }
                            }
                            
                            
                            if(game.map.props[x].speedY < this.speedY){
                                game.map.props[x].speedY = this.speedY;
                            }
                            
                        }
                    }*/
                }

            }
        }
    }
    
    this.start = function(){
        // CARGA DE SPRITES
        this.cargarSprites();
        
        // Esta puesto para poder cargar el width y así centrar el personaje
        // en función del width
        var cadaCuantosFps = 7;
        var imagennano = Math.ceil(this.spriteNum/cadaCuantosFps)+""+this.spriteDirection;
        
        this.roomID = 0;
        
        this.width = this.sprites[imagennano].width/1.5;
        this.height = this.sprites[imagennano].height/1.5;
        // Fin cargar sprites central de forma provisional
        
        this.startTime = new Date().getTime();
        
        this.posX = game.windowWidth/2-170*0.5;
        this.posY = game.windowHeight/2-256*0.5;
        
        this.height = game.map.cellSize;
        this.width = this.height;
    }
    
    this.tick = function(){
        this.shotCorrection();
        this.draw();
        game.hud.printHud();
        for(var i in game.player.shots){
            game.player.shots[i].draw();
        }
        this.shotCollision();
        this.deleteShots();
        this.enemyCollision();
        this.propCollision();
        this.doorCollision();
    }
}


Player.prototype.deleteShots = function(){
            
    var roomInfo = [];
    for(var i in game.room){
        roomInfo[i] = game.room[i].data();
    }
    for(var x in this.shots){
        if(this.shots[x].posX+this.shots[x].size > roomInfo.width || this.shots[x].posX < 0){
            this.shots.splice(x,1);
        }
    }
}

Player.prototype.shotCollision = function(){
    var hasDado = false;
    for(var i in this.shots){
        if(this.shots[i].room != this.roomID){
            this.shots.splice(i, 1);
        }else{
            for(var e in game.map.enemys){
                if(!hasDado){
                    if(!game.map.enemys[e].dead){
                        if(game.map.enemys[e].room == this.roomID){
                            var distX = Math.abs((game.map.enemys[e].posX+game.map.enemys[e].width/2)-(this.shots[i].posX+this.shots[i].size/2));           
                            var distY = Math.abs((game.map.enemys[e].posY+game.map.enemys[e].height/2)-(this.shots[i].posY+this.shots[i].size/2));
                            var hipotenusa = Math.sqrt(Math.pow(distX,2)+Math.pow(distY,2));
                            if(hipotenusa < game.map.enemys[e].width/2){
                                this.shots.splice(i, 1);
                                hasDado = true;
                                game.room[game.player.roomID].enemies--;
                                game.map.enemys[e].dead = true;
                                this.newProp(game.map.enemys[e].posX+game.map.enemys[e].width/4,game.map.enemys[e].posY+game.map.enemys[e].height/4,Math.round(Math.random()*13),this.roomID)
                            }
                        }
                    }
                }
            }
        }
    }
}

Player.prototype.enemyCollision = function(){
    for(var e in game.map.enemys){
        if(Math.abs((game.map.enemys[e].posX+game.map.enemys[e].width/2) - (this.posX+this.width/2)) < this.width/3+game.map.enemys[e].width/2){
            if(Math.abs((game.map.enemys[e].posY+game.map.enemys[e].height/2) - (this.posY+this.height/2)) < this.width/2.5+game.map.enemys[e].height/2){
                if(!game.map.enemys[e].dead){
                    this.HP --;
                    game.map.enemys[e].dead = true;
                    game.room[game.player.roomID].enemies--;
                }
            }
        }
    }
}

Player.prototype.newProp = function(x,y,type,room){
    game.map.props.push(new Prop(x,y,type,room));
}

Player.prototype.doorCollision = function(){
    for(var d in game.door){
        if(game.door[d].open){
            if(game.door[d].type == 0 || game.door[d].type == 4){
                if(Math.abs((this.posX+this.height-this.width/2) - (game.door[d].x+game.door[d].width/2) < game.door[d].width/2+this.width/2) ){
                    if(Math.abs((this.posY+this.height-this.height/16) - (game.door[d].y+game.door[d].height/2)) < game.door[d].height/2+this.height/16 ){
                        //console.log("DEwqd");
                        this.roomID = Math.round(Math.random()*4);
                        game.room[this.roomID].attr++;
                        game.room[this.roomID].enemies = 4;
                        game.player.start();
                        game.createDoors();
                        game.map.enemys = [];
                        game.createEnemies();
                        game.room[game.player.roomID].createObjects();
                    }
                }
            }else if(game.door[d].type == 2 || game.door[d].type == 6){
                
            }
        }else{
            //console.log("Cerradas");
        }
    }
}