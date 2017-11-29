var cEnemy3 = function(){
    //SPEED X
    var speedX = -1;
    this.getSpeedX = function(){
        return speedX;
    }

    var setSpeedX = function(setSpX){ // Funcion para comprobar si 
        speedX = setSpX;                 // puedo pasar desde fuera por parámetro
        //console.log(speedX);         // (FUNCIONA)
    }
    this.newSpeedX = function(setSpX){
        setSpeedX(setSpX);
    }
    // SPEED Y
    var speedY = Math.random()*4+2;
    // Ajusta la valocidad Y a 2 || -2
    if(speedY<=1){speedY = -2;}else{speedY = 2;}

    this.getSpeedY = function(){
        return speedY;
    }
    
    var setSpeedY = function(setSpY){ // Funcion para comprobar si 
        speedY = setSpY;                 // puedo pasar desde fuera por parámetro
        //console.log(speedY);         // (FUNCIONA)
    }
    this.newSpeedY = function(setSpY){
        setSpeedY(setSpY);
    }
    //POSX
    var posX = windowWidth;
    this.getPosX = function(){
        return posX;
    }
    
    this.setPosX = function(){
        posX += speedX;
        // LIMITS posX
        if(posX > windowWidth){posX = windowWidth;}
        //if(posX < 0-this.width){posX = 0;}

        //console.log(speed);
    }
   
    // DIMENSIONS
    this.height = windowHeight/1.5;
    this.width = windowHeight/3;

    this.autoSize = function(){
        this.height = windowHeight/8;
        this.width = this.height;
    }

    this.move = function(){
        this.setPosX();
        ctx.drawImage(enemy3Img,this.getPosX(),this.getPosY(),this.height,this.width);
    }
        //POSY
    var posY = Math.random()*windowHeight-this.width/2;
    this.getPosY = function(){
        return posY;
    }
    this.setPosY = function(){
        posY += speedY;
        // Limits posY
        if(posY>windowHeight){posY=windowHeight;}
        if(posY<0){posY=0;}
        //console.log(speed);
    }
}