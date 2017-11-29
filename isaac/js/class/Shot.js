function Shot(posx,posy,velx,vely,size2,dmg,dir,playerVelX,playerVelY,slowDownRate,room){
    this.room = room;
    console.log(room);
    this.posX = posx;
    this.posY = posy;
    
    //velocidad
    this.velX = velx;
    this.velY = vely;
    
    this.rotation = 0;
    
    this.type = null;
    //this.slowDownRate = slowDownRate;
    if(Math.random()*100 < slowDownRate){
        this.type = 1; 
    }else{
        this.type = 0;
    }
    
    // radio/ancho del disparo
    this.rad = size2;
    this.size = (this.rad*game.map.cellSize)/5;
    //daño que va a causar al impactar
    this.damage = dmg;
   // console.log(playerVelX+"//"+playerVelY);
    var playerVelReductor = 2;
    if(dir =="left"){
        this.velX = -this.velX+playerVelX/playerVelReductor;
        this.velY = playerVelY/playerVelReductor;
        this.posX -= this.size;
        this.posY = this.posY+game.player.height/2-this.size/2;
    }else if(dir =="right"){
        this.velX = this.velX+playerVelX/playerVelReductor;
        this.velY = playerVelY/playerVelReductor;
        this.posY = this.posY+game.player.height/2-this.size/2;
        this.posX = this.posX+game.player.width;
    }else if(dir =="down"){
        this.velX = playerVelX/playerVelReductor;
        this.velY = this.velY+playerVelY/playerVelReductor;
        this.posX += game.player.width/2-this.size/2;
        this.posY += game.player.height;
    }else if(dir =="up"){
        this.velX = playerVelX/playerVelReductor;
        this.velY = -this.velY+playerVelY/playerVelReductor;
        this.posX += game.player.width/2-this.size/2;
        this.posY -= this.size;
    }
    // funcion con la que se va a dibujar el diaparo en el canvas
    
    // FUCNION QUE SE EJECUTA EN EL LOOP
    this.tick = function(){
        if(this.room == game.player.roomID){
            
        }
        this.draw();
    }
    
    this.start = function(){
        
    }
    
    this.draw = function(){
        this.posX += this.velX;
        this.posY += this.velY;
        this.rotation += 0.05;
        game.ctx.save();
        
       /* game.ctx.translate(500 , 500);
        game.ctx.fillStyle = "white";
        game.ctx.rotate(this.rotation);
        game.ctx.fillRect(-25,-25,50,50);
        */
        
        game.ctx.translate(this.posX+this.size/2+game.gapX,this.posY+this.size/2+game.gapY);
        game.ctx.rotate(this.rotation);
        game.ctx.drawImage(game.map.shotImg[this.type],0-this.size/2,0-this.size/2,this.size,this.size);
        
        game.ctx.restore();
    }
}

