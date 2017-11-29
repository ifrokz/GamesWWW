function Door(x, y, status, roomID, type){
    this.x = x;
    this.y = y;
    this.open = status;
    this.room = roomID;
    this.type = type;
    
    var that = this;
    this.width = null;
    this.height = null;
    
    console.log("Has creado una puerta con el ID: "+this.type);
    this.printDoors = function(){
        if(game.room[this.room].enemies > 0){
            this.open = false;
            game.ctx.drawImage(game.room[this.room].objectImg[this.type], this.x+game.gapX, this.y+game.gapY);
        }else{
            this.open = true;
            game.ctx.drawImage(game.room[this.room].objectImg[this.type+1], this.x+game.gapX, this.y+game.gapY);
        }
        //console.log( game.room[this.room].objectImg[this.type].width)
        that.width = game.room[this.room].objectImg[this.type].width;
        that.height = game.room[this.room].objectImg[this.type].height;
    }
    
    this.tick = function(){
        this.printDoors();
        this.collision();
    }
}