var cBackground = function(posx, posy){
    /*var width = window.innerWidth;
    var height = window.innerHeight;
    this.posX = posx;*/
    var width = windowWidth;
    var height = windowHeight;
    this.posX = posx
    this.posY = posy;

    this.getWidth = function(){
        return width;
    }
    this.getHeight = function(){
        return height;
    }
    this.setWidth = function(value){
        width = value;
    }
    this.setHeight = function(value){
        height = value;
    }
    this.getPosX = function(){
        return this.posX;
    }
    this.getPosY = function(){
        return this.posY;
    }
    this.setPosX = function(value){
        this.posX += value;
    }
    this.setPosY = function(value){
        this.posY += value;
    }
    this.moveBackgroundX = function(value){
        this.setPosX(value);
    }
    this.autoSize = function(){
        width = windowWidth;
        height = windowHeight;
        this.posX = 0;
    }
}

var bg = new Array();

for(var i=0;i<3;i++){
    bg[i] = new cBackground(0, 0);
    bg[i].setPosX(i*windowWidth);
}

var bg2 = new Array();

for(var i=0;i<5;i++){
    bg2[i] = new cBackground(Math.random()*(innerWidth*2), Math.random()*(innerHeight));
    bg2[i].setPosX(i*(Math.random()*(imgBg2Width*2)));
}

var bg3 = new Array();

for(var i=0;i<5;i++){
    bg3[i] = new cBackground(Math.random()*(innerWidth*2), Math.random()*(innerHeight));
    bg3[i].setPosX(i*(Math.random()*(imgBg3Width*2)));
}

var bg4 = new Array();

for(var i=0;i<5;i++){
    bg4[i] = new cBackground(Math.random()*(innerWidth*2), Math.random()*(innerHeight));
    bg4[i].setPosX(i*(Math.random()*(imgBg4Width*2)));
}

var bg5 = new Array();

for(var i=0;i<3;i++){
    bg5[i] = new cBackground(0, 0);
    bg5[i].setPosX(i*bg5[i].getHeight());
}

var mars = new Array();

//mars = new cBackground(windowWidth, Math.random()*(windowHeight - 500));
mars = new cBackground(windowWidth - 500, windowHeight - 1000);