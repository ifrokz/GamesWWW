cShotEnemy = function(posX,posY,type,speedx,speedy){
    this.posX = posX;
    this.posY = posY;
    this.type = type;
    this.speedX = speedx;
    this.speedY = speedy;
    this.width = playerWidth/8 ;
    this.height = playerWidth/16;
}

cEnemy1Shot = function(){
    this.move = function(){
        this.posX -= this.speedX;
    }
}
cEnemy1Shot.prototype = new cShotEnemy(0, 0, 2, 20, 0);