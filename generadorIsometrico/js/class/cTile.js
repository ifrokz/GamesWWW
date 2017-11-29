var cTile = function(posX,posY){
    this.posX = posX-gapX/2-gapY;
    this.posY = posY+gapX/2-gapY;

    this.isoX = this.posX - this.posY + gapX;
    this.isoY = (this.posX+this.posY)/2 +gapY;

    this.columna = posX/40;
    this.fila= posY/40;

    this.type = 0;
    if(this.fila < 0 || this.fila > tileLineNumber || this.columna < 0 || this.columna > tileLineNumber){
        this.type = 3;
    }else{
        this.type = Math.floor(Math.random()*2);
    }
    this.draw = function(){
        //ctx.drawImage(cursor,this.isoX-cursor.width/2+gapX,this.isoY-cursor.height+gridSize/4+gapY);
        ctx.drawImage(terrainImg[this.type],this.isoX-cursor1.width/2+gapX,this.isoY-cursor1.height+gridSize/4+gapY);
    }
}

var tile;