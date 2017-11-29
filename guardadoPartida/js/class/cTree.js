cTree = function(r,c,type){
    this.row = r;
    this.column = c;
    this.type = type;
    this.draw = function(){
       ctxBg.drawImage(treeImg[type],this.column*squarePx,this.row*squarePx,squarePx,squarePx);
    }
}