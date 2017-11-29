var Candy = function(row,column,type,id){
    this.row = row;
    this.column = column;
    this.type = type;
    this.id = id;
    /*this.img = new Image();
    this.img.src = "img/candy/"+this.type+".png"; */
    this.x = column * 100 + 40;
    this.y = 3*100;
    this.speedX = 0;
    this.speedY = 0;
    this.aceleration = 1;
    this.remove = false;
    this.width = 80;
    this.height = 80;
    this.specialEfectDone = false;
    this.specialColor = 0;
    //console.log(this.row+"//"+this.column);


    this.update = function(){ // de momento implementado solamente que caigan pabajo
        
        //POS Y
        if(this.y < this.row*100+10+100*3){
            if(this.y < this.row*100+10+100*3-101 && caerDirectamente){
                this.y = this.row*100+10+100*3;
            }
            this.speedY += this.aceleration;
            this.y += this.speedY;
            if(this.y > this.row*100+10+100*3){
                this.y = this.row*100+10+100*3;
                this.speedY = 0;
            }
        }else{
            this.speedY += this.aceleration;
            this.y -= this.speedY;
            if(this.y < this.row*100+10+100*3){
                this.y = this.row*100+10+100*3;
                this.speedY = 0;
            }
        }

        // POS X
        if(this.x < this.column*100+40){
            if(this.speedY<20){
                this.speedX+=this.aceleration;
            }
            
            this.x+=this.speedX;
            if(this.x > this.column*100+40){
                this.x = this.column*100+40
                this.speedX = 0;
            }
        }else{
            this.speedX+=this.aceleration;
            this.x-=this.speedX;
            if(this.x < this.column*100+40){
                this.x = this.column*100+40
                this.speedX = 0;
            }   
        }
    
            // TALBERO ADAPTADO AL NIVEL //
            
        ctx.beginPath();
        
        // LINEA PARTE SUPERIOR
        ctx.moveTo(this.column*100+40,      this.row*100+10+100*3);
        ctx.lineTo(this.column*100+40+100,  this.row*100+10+100*3);
        // LINEA PARTE INFERIOR
        ctx.moveTo(this.column*100+40,      this.row*100+10+100*3+100);
        ctx.lineTo(this.column*100+40+100,  this.row*100+10+100*3+100);
        // LINEA PARTE IZQUIERDA
        ctx.moveTo(this.column*100+40,      this.row*100+10+100*3);
        ctx.lineTo(this.column*100+40,      this.row*100+10+100*3+100);
        // LINEA PARTE DERECHA
        ctx.moveTo(this.column*100+40+100,  this.row*100+10+100*3);
        ctx.lineTo(this.column*100+40+100,  this.row*100+10+100*3+100);
        
        ctx.closePath();
        ctx.stroke();
        
        
        switch(this.type%10){
            case 1:
                ctx.fillStyle="rgba(108, 223, 255, 0.4)";
                break;
            case 2:
                ctx.fillStyle="rgba(105, 215, 107, 0.4)";
                break;
            case 3:
                ctx.fillStyle="rgba(255, 0, 255, 0.4)";
                break;
            case 4:
                ctx.fillStyle="rgba(255, 0, 0, 0.4)";
                break;
            case 5:
                ctx.fillStyle="rgba(255, 150, 0, 0.4)";
                break;
            case 6:
                ctx.fillStyle="rgba(255, 255, 0, 0.4)";
                break;
            default:
                ctx.fillStyle="white";
                break;
        }
        ctx.fillRect(this.x,this.y,100,100);
        ctx.fillStyle ="rgba(200,200,200,0.5)";
        ctx.fillRect(this.column*100+40+1,this.row*100+10+100*3+1,100-2,100-2);
        ctx.fillStyle ="rgba(255,255,255,1)";
    }

    this.render = function(){
        if(candyImg[this.type] instanceof HTMLImageElement) {
            ctx.drawImage(candyImg[this.type], this.x+10-this.width/2+40, this.y+10-this.height/2+40,this.width,this.height);
        } else {
            //console.log(candyImg[this.type])
        }
    }
}

function updateCandies(){
    for (var c in candies){
        candies[c].update();
        candies[c].render();
    }
}



