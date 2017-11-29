function Hud(){
    this.hudElements = [];
    this.elementsCount = 8;
    
    // Get sprites from hud folder
    for(var i=0;i<this.elementsCount;i++){
        this.hudElements[i] = new Image();
        this.hudElements[i].src = "img/hud/"+i+".png";
    }
    
    this.printHud = function(){
        var hudData = game.player.HUD_data();
        // Lifes
        for(var i=0;i<hudData.hp.max;i++){
            if(i <= hudData.hp.hp-1){
                game.ctx.drawImage(this.hudElements[0], 60*i+30, 16);
            }else{
                game.ctx.drawImage(this.hudElements[1], 60*i+30, 16);
            }
        }
        // Left icons
        game.ctx.drawImage(this.hudElements[2], 43, 375);
        game.ctx.drawImage(this.hudElements[3], 15, 435);
        game.ctx.drawImage(this.hudElements[4], 25, 495);
        game.ctx.drawImage(this.hudElements[5], 35, 565);
        if(hudData.bombs.type == 0){
            game.ctx.drawImage(this.hudElements[6], 50, 615);
        }else{
            game.ctx.drawImage(this.hudElements[7], 50, 615);
        }
        // Left values
        game.ctx.fillStyle = "black";
        game.ctx.font = "32px Acme-Regular";
        game.ctx.fillText(hudData.shot.damage, 100, 415);
        game.ctx.fillText(hudData.shot.fireRate, 100, 475);
        game.ctx.fillText(hudData.shot.slowDownRate+"%", 100, 535);
        game.ctx.fillText(hudData.speed, 100, 595);
        game.ctx.fillText(hudData.bombs.num+"/"+hudData.bombs.max, 100, 655);
        // Time values
        game.ctx.font = "50px Acme-Regular";
        game.ctx.textAlign = "center";
        game.ctx.fillText(hudData.time.min+":"+hudData.time.sec, 960, 50);
    }
}