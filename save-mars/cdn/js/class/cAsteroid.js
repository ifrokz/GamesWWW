var cAsteroid = function(posX,posY,type){
    this.posX = posX;
    this.posY = posY;
    this.type = type;
    this.speed = 1;
    this.height = windowHeight/10;
    this.width = this.height;

    this.autoSize = function(){
        this.height = windowHeight/10;
        this.width = this.height;
    }
}
