function Enemy(posx,posy,type,room){
    this.room = room;
    
    this.posX = posx;
    this.posY = posy;
    
    this.type = type;
    this.dead = false;
    
    this.dirX = "right";
    this.dirY = "up";
    this.velX = 2;
    this.velY = 2;
    
    this.direction = "down";
    this.width = null;
    this.height = null;
    
    if(this.type == 0){
        this.width = game.map.enemyImg[0+this.direction].width/3;
        this.height = game.map.enemyImg[0+this.direction].height/3;
    }
    
    
    this.start = function(){
        
    }
    

    
    this.tick = function(){
        if(this.room == game.player.roomID){
            this.move();
            this.collision();
            this.draw();
        } 
    }
}

Enemy.prototype.draw = function(){
    if(this.type == 0){
        this.width = game.map.enemyImg[0+this.direction].width/3;
        this.height = game.map.enemyImg[0+this.direction].height/3;
        if(this.dead == true){
            var alturadead = this.height*1.5;
            var anchuradead = this.width*1.5;
            game.ctx.drawImage(game.map.enemyImg[0],this.posX+this.width/2-anchuradead/2+game.gapX,this.posY+this.height/2+game.gapY,anchuradead,alturadead);
        }else{
            game.ctx.drawImage(game.player.playerShadow, this.posX+game.gapX, this.posY+this.height+game.gapY, this.width, game.player.playerShadow.height);
            
            game.ctx.drawImage(game.map.enemyImg[0+this.direction],this.posX+game.gapX,this.posY+game.gapY,this.width,this.height);
        }

    }
}

Enemy.prototype.collision = function(){
    var roomData = game.room[this.room].data();
    if(this.type == 0){
        if(roomData.type == 0){
            if(this.posX <= 280){
                this.dirX = "right";
            }else if(this.posX >= 1575){
                this.dirX = "left";
            }
            
            if(this.posY <= 100){
                this.dirY = "down";
            }else if(this.posY >= 800){
                this.dirY = "up";
            }
        }else if(roomData.type == 1){
            if(this.posX <= 280){
                this.dirX = "right";
            }else if(this.posX >= 3475){
                this.dirX = "left";
            }
            
            if(this.posY <= 95){
                this.dirY = "down";
            }else if(this.posY >= 800){
                this.dirY = "up";
            }
        }else if(roomData.type == 2){
            // X
            if(this.posY <= 1015){
                if(this.posX <= 180){
                    this.dirX = "right";
                }else if(this.posX+this.width >=915){
                    this.dirX = "left";
                }
            }else if(this.posY > 1015){
                if(this.posX <= 180){
                    this.dirX = "right";
                }else if(this.posX+this.width >= 1745){
                    this.dirX = "left";
                }
            }
            // Y
            if(this.posY+this.height >= 1755){
                this.dirY = "up";
            }
            if(this.posX <= 915){
                if(this.posY <= 175 ){
                    this.dirY = "down";
                }
            }else if(this.posX > 915){
                if(this.posY <= 1015){
                    this.dirY = "down";
                }
            }
        }else if(roomData.type == 3){
            if(this.posX <= 280){
                this.dirX = "right";
            }else if(this.posX+this.width >= 3580){
                this.dirX = "left";
            }
            
            if(this.posY <= 160){
                this.dirY = "down";
            }else if(this.posY+this.height >= 1980){
                this.dirY = "up";
            }
        }else if(this.type == 1){
            if(roomData.type == 0){
                if(this.posX <= 280){
                    
                }else if(this.posX+this.width >= 1980){
                    
                }
                
                if(this.posY <= 160){
                    
                }else if(this.posY+this.height >= 800){
                    
                }
            }else if(roomData.type == 1){
                
            }else if(roomData.type == 2){
                
            }else if(roomData.type == 3){
                if(this.posX <= 280){
                    
                }else if(this.posX+this.width >= 3580){
                    
                }
                
                if(this.posY <= 160){
                    
                }else if(this.posY+this.height >= 1975){
                    
                }
            }
        }
    }

    
    
}


Enemy.prototype.move = function(){
    if(!this.dead){
        if(this.type == 0){
            if(this.dirX == "left"){
                this.posX -= this.velX;
            }else if(this.dirX == "right"){
                this.posX += this.velX;
            }
            
            if(this.dirY == "up"){
                this.posY -= this.velY;
            }else if(this.dirY == "down"){
                this.posY += this.velY;
            } 
        }
    }
}