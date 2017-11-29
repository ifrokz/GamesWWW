function Object(x, y, width, height, type){
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;
    
    this.collision = function(){
        /*if(game.player.posX + game.player.width > this.x + game.gapX){
            if(game.player.posX < this.x + this.width + game.gapX){
                if(game.player.posY + game.player.height > this.y + game.gapY){
                    if(game.player.posY < this.y + this.height + game.gapY){
                        console.log("colision");
                        // arriba
                        if(game.player.posY <= this.y + game.gapY && game.player.posX + game.player.width > this.x + game.gapX && game.player.posX < this.x + this.width + game.gapX){
                            game.player.posY = this.y - game.player.height + game.gapY;
                            game.player.speedY = 0;
                        }
                        // abajo
                        else if(game.player.posY >= this.y + game.gapY && game.player.posX + game.player.width > this.x + game.gapX && game.player.posX < this.x + this.width + game.gapX){
                            game.player.posY = this.y + this.height + game.gapY;
                            game.player.speedY = 0;
                        }
                        // izquierda
                        else if(game.player.posX <= this.x + game.gapX && game.player.posY + game.player.height > this.y + game.gapY && game.player.posY < this.y + this.height + game.gapY){
                            game.player.posX = this.x - game.player.width + game.gapX;
                            game.player.speedX = 0;
                        }
                        // derecha
                        else if(game.player.posX >= this.x + game.gapX &&  game.player.posY + game.player.height > this.y + game.gapY && game.player.posY < this.y + this.height + game.gapY){
                            game.player.posX = this.x + this.width + game.gapX;
                            game.player.speedX = 0;
                        }
                        
                    }
                }
            }
        }*/
        
        if(Math.abs((game.player.posX+game.player.width/2)-(this.x+this.width/2)) < this.width/2+game.player.width/2){
            if(Math.abs((game.player.posY+game.player.height-game.player.height/16) - (this.y+this.height-this.height/4)) < this.height/4+game.player.height/16){
                var parary = false;
                var pararx = false;
               
               /* if(jeje){
                    if(game.player.posY+game.player.height-game.player.height/16+9 > this.y+this.height){
                        game.player.posY = this.y+this.height-game.player.height+game.player.height/16+9;
                       // game.player.speedY = 0;
                        jeje = false;
                    }
                }
                
                if(jeje){
                    if(game.player.posY+game.player.height-6 > this.y+this.height/2-6){
                        console.log("Kelowa")
                        var x = game.player.posX-
                        jeje = false;
                    }
                    if(game.player.posX < this.x+this.width/2){
                        game.player.posX = this.x-game.player.width;
                       // game.player.speedX = 0;
                        jeje=true;
                    }else if(game.player.posX > this.x+this.width/2){
                        game.player.posX = this.x+this.width;
                       // game.player.speedX = 0;
                        jeje = true;
                    } 
                }
                
                if( (this.y+this.height/2) - (game.player.posY+game.player.height) > game.player.posX  ){
                    
                }*/
                
                if(game.player.posY+game.player.height-game.player.height/16+9 > this.y+this.height){
                    game.player.posY = this.y+this.height-game.player.height+game.player.height/16+9;
                   // game.player.speedY = 0;
                    parary = true;
                }else if(game.player.posY+game.player.height-6 > this.y+this.height/2-6){
                    parary = true;
                }
                
                if(game.player.posX+game.player.width < this.x+this.width/2){
                    pararx = true;
                    game.player.posX-=1;
                }else if(game.player.posX > this.x+this.width/2){
                    pararx = true;
                } 
                
                if(parary){
                    game.player.posY = game.player.posY-(game.player.speedY*1.1);
                    game.player.speedY = 0;
                }
                if(pararx){
                    game.player.posX = game.player.posX-(game.player.speedX*1.2);
                    game.player.speedX = 0;
                }
                
            }
        }
    }
    
    this.drawObject = function(){
        game.ctx.drawImage(game.room[game.player.roomID].objectImg[this.type+28], x+game.gapX, y+game.gapY, width, height);
    }
    
    this.tick = function(){
        this.collision();
        this.drawObject();
    }
}


