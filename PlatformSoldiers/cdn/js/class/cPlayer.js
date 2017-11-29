cPlayer = function(){
    this.height = windowHeight/10;
    this.width = this.height;

    this.posX = 0;
    this.posY = windowHeight-this.height;

    this.speedX = 0;
    this.speedY = 0;

    this.jump = false;

    this.dir = "";
    this.dirY = "";
    this.dirImg = "right";
    this.imgRight = new Image();
    this.imgRight.src = "cdn/img/player/right.png";
    this.imgLeft = new Image();
    this.imgLeft.src = "cdn/img/player/left.png";

    this.drawDirImg = new Image();

    this.limitMove = true;

    this.move = function(){
        this.posX += this.speedX;
        this.posY += this.speedY

        ////////////
        // MOVE X //
        ////////////
        this.tempX = this.posX;
            // Change speedX && Limit speedX 
        switch(this.dir){
            case "right":
                this.speedX += 1;
                if(this.speedX>10){
                    this.speedX=10;
                }
                this.dirImg = "right";
                break;
            case "left": 
                this.speedX -= 1;
                if(this.speedX<-10){
                    this.speedX=-10;
                }
                this.dirImg = "left";
                break;
            default:
                if(this.speedX>0){
                    this.speedX--;
                }else if(this.speedX<0){
                    this.speedX++;
                }
                break;
        }
            // LIMIT posX = 0
        if(this.posX < 0){
            this.posX = 0;
            this.speedX = 0;
        }

        ////////////
        // MOVE Y //
        ////////////
        this.tempY = this.posY;
        
        //Jump control
        if(this.posY+this.height < windowHeight){
            this.speedY+= (windowHeight/30)/35;
            // speedY Limit
            if(this.speedY > 10){ 
                this.speedY = 10;
            }
        }
            // limit posY = 0
        if(this.posY+this.height > windowHeight){
            this.speedY=0;
            this.posY = windowHeight-this.height;
        }

        if(this.speedY > 0){
            this.dirY = "up";
        }else if(this.speedY < 0){
            this.dirY = "down";
        }

        /////////////////
        // DRAW PLAYER //
        /////////////////

        
        if(this.dirImg =="right"){
            this.drawDirImg = this.imgRight;
        }else{
            this.drawDirImg = this.imgLeft;
        }
        if(this.posX+this.width/2 < windowWidth/2){ // INICIO PARTIDA
            ctx.drawImage(this.drawDirImg,player.posX,player.posY,player.width,player.height);
            this.limitMove = true;       
        }else{ // UNA VEZ SUPERA EL ANCHO DE LA PANTALLA AL INICIO
            ctx.drawImage(this.drawDirImg,windowWidth/2-this.width/2,this.posY,this.width,this.height);
            this.limitMove = false;       
        }
    }
}

var player = new cPlayer();