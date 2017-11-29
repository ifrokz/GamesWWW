function Prop(posx,posy,type,room){
    this.room = room;
    
    this.posX = posx;
    this.posY = posy;
    this.type = type;
    
    this.speedX = null;
    this.speedY = null;
    
    this.width = game.map.propsImg[this.type].width;
    this.height = game.map.propsImg[this.type].height;
    
    this.getWidthAndHeight = function(){
        return{
            width: this.width,
            height: this.height
        }
    }
    
    this.getPos = function(){
        return { x: this.posX , y: this.posY } 
    }
    
    this.move = function(){
        if(this.speedY != 0||this.speedX !=0){
            this.posX += this.speedX;
            this.posY += this.speedY;
        }
    }
    
    this.draw = function(){
        game.ctx.drawImage(game.map.propsImg[this.type],this.posX, this.posY,this.width/2,this.height/2);
    }.bind(this);
   
    this.tick = function(){
        console.log("This: "+this.room+", Player: "+game.player.roomID);
        if(this.room == game.player.roomID){
            this.draw();
            this.move(); 
        }
    }
}