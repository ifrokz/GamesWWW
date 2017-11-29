var cTree = function(posX,posY){
    this.fila = posY/40;
    this.columna = posX/40;
    //console.log(this.columna+"//"+this.fila);
    this.posX = (this.columna*40)-gapX/2-gapY;
    this.posY = (this.fila*40)+gapX/2-gapY;

    this.isoX = this.posX - this.posY + gapX;
    this.isoY = (this.posX+this.posY)/2 +gapY;

    this.type = Math.floor(Math.random()*10);
    this.draw = function(){
        //ctx.drawImage(cursor,this.isoX-cursor.width/2+gapX,this.isoY-cursor.height+gridSize/4+gapY);
        ctx.drawImage(treeImg[this.type],this.isoX-cursor1.width/2+gapX,this.isoY-cursor1.height+gridSize/4+gapY,cursor1.width,cursor1.width);
    }
}

var tree = [];