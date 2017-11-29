PlayerShot = function(){
    this.move = function(){
        this.posX += this.speedX;
    }   
}
PlayerShot.prototype = new Shot(player.getPosX(), player.getPosY(), 2, 50, 0);