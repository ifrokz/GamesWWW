cBlock = function(posX, posY, type){
    this.width = windowHeight/10;
    this.height = this.width;
    
    this.posX = posX*this.width;
    this.posY = posY*this.height;

    this.height*=1.18;

    this.drawHeight = this.height+this.width/10;



    this.type = type;

    this.draw = function(){
        ctx.drawImage(blockImg[this.type],this.posX,this.posY,this.width,this.height);
    }
}

var block = [];
var numBlocksImg = 10;
var blockImg = [];

for(var i =1;i<=numBlocksImg;i++){
    blockImg[i] = new Image();
    blockImg[i].src = "cdn/img/blocks/"+i+".png";
}