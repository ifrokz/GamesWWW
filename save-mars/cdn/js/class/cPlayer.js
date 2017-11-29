// NAVE DEL JUGADOR
Player = function(){
    this.playerMove = function(){
        // LEFT / RIGHT
        if(dirPosX == "left"){player.newSpeedX(player.getSpeedX()-1);}
        if(dirPosX == "right"){player.newSpeedX(player.getSpeedX()+1);}
        if(player.getSpeedX()>14){
            // Limitador de velocidad en diagonal
            if(dirPosY == "up" || dirPosY == "down"){
                player.newSpeedX(12);
            }else{
                player.newSpeedX(14);
            }
        }
        if(player.getSpeedX()<-7){
            // Limitador de velocidad en diagonal
            if(dirPosY == "up" || dirPosY == "down"){
                player.newSpeedX(-6);
            }else{
                player.newSpeedX(-7);
            }
        }
        player.setPosX();
        // UP / DOWN
        if(dirPosY == "up"){player.newSpeedY(player.getSpeedY()-1);}
        if(dirPosY == "down"){player.newSpeedY(player.getSpeedY()+1);}
        if(player.getSpeedY() > 10){player.newSpeedY(10);}
        if(player.getSpeedY() < -10){player.newSpeedY(-10);}
        player.setPosY();
        // NONE 
        if(dirPosY == "" && player.getSpeedY() < 0){player.newSpeedY(player.getSpeedY()+0.5);}
        if(dirPosY == "" && player.getSpeedY() > 0){player.newSpeedY(player.getSpeedY()-0.5);}
        if(dirPosX == "" && player.getSpeedX() < 0){player.newSpeedX(player.getSpeedX()+0.5);}
        if(dirPosX == "" && player.getSpeedX() > 0){player.newSpeedX(player.getSpeedX()-0.5);}
        //
        ctx.drawImage(playerShipImg,player.getPosX(),player.getPosY(), playerHeight, playerWidth);
    }
    // Score
    var score = 0;
    this.setScore = function(score2){
        score += score2;
    }
    this.getScore = function(){
        return score;
    }
    //AMMO
    var ammo = ammoStart;
    this.getAmmo = function(){
        return ammo;
    }
    this.setAmmo = function(count){
        // El if no es necesario porque ya se controla
        // en el archivo funciones, pero por si acaso
        // lo ponemos.
        if(ammo > 0){
            if(ammoSelected == 1){
                ammo -= count;
            }else{
                if(ammo > 1){
                    ammo -= count;
                }
            }
        }
    }
    var ammoMax = 50;

    // Creamos función para recargar
    this.recAmmo = function(count){
        if((ammo + count) < ammoMax){
            ammo += count;
        }else{
            ammo = ammoMax;
        }
    }
    this.isAmmoEmpty = function(type){
        if(type == 1){
            if(this.getAmmo() > 0){
                return false;
            }else{
                return true;
            }
        }else{
            if(this.getAmmo() > 1){
                return false;
            }else{
                return true;
            }
        }
    }
}
Player.prototype = new Ship(1, 100, 0, 0, 100, windowHeight/2 - playerHeight/2);

var player = new Player();