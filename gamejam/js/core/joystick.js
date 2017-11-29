var Joystick = function() {
    var that = this;
    this.touchStart1X = null;
    this.touchStart2X = null;
    this.touchStart1Y = null;
    this.touchStart2Y = null;
    this.staticMov = new Image();
    this.staticMov.src = "img/joystick/fondoJoy.png";
    this.mobileMov = new Image();
    this.mobileMov.src = "img/joystick/intJoy.png";
    $("#canvas").on('touchstart', function(event) {
        if (that.touchStart1X === null) {
            that.touchStart1X = event.changedTouches[0].pageX;
            that.touchStart1Y = event.changedTouches[0].pageY;
            that.touchMove1X = that.touchStart1X;
            that.touchMove1Y = that.touchStart1Y;
            that.touchEnd1X = that.touchStart1X;
            that.touchEnd1Y = that.touchStart1Y;
        } else {
            that.touchStart2X = event.changedTouches[0].pageX;
            that.touchStart2Y = event.changedTouches[0].pageY;
            that.touchMove2X = that.touchStart2X;
            that.touchMove2Y = that.touchStart2Y;
            that.touchEnd2X = that.touchStart2X;
            that.touchEnd2Y = that.touchStart2Y;
        }
        if(!game.inGame) {
            event.preventDefault();
        }
    });
    $("#canvas").on('touchmove',function(event) {
        if (event.changedTouches[0].pageX > that.touchMove1X - 50 && event.changedTouches[0].pageX < that.touchMove1X + 50) {
            that.touchMove1X = event.changedTouches[0].pageX;
            that.touchMove1Y = event.changedTouches[0].pageY;
            that.touchEnd1X = that.touchMove1X;
            that.touchEnd1Y = that.touchMove1Y;
        }
        if (event.changedTouches[0].pageX > that.touchMove2X - 50 && event.changedTouches[0].pageX < that.touchMove2X + 50) {
            that.touchMove2X = event.changedTouches[0].pageX;
            that.touchMove2Y = event.changedTouches[0].pageY;
            that.touchEnd2X = that.touchMove2X;
            that.touchEnd2Y = that.touchMove2Y;
        }
        if (event.changedTouches.length > 1) {
            if (event.changedTouches[1].pageX > that.touchMove1X - 50 && event.changedTouches[1].pageX < that.touchMove1X + 50) {
                that.touchMove1X = event.changedTouches[1].pageX;
                that.touchMove1Y = event.changedTouches[1].pageY;
                that.touchEnd1X = that.touchMove1X;
                that.touchEnd1Y = that.touchMove1Y;
            }
            if (event.changedTouches[1].pageX > that.touchMove2X - 50 && event.changedTouches[1].pageX < that.touchMove2X + 50) {
                that.touchMove2X = event.changedTouches[1].pageX;
                that.touchMove2Y = event.changedTouches[1].pageY;
                that.touchEnd2X = that.touchMove2X;
                that.touchEnd2Y = that.touchMove2Y;
            }
            if(!game.inGame) {
                event.preventDefault();
            }
        }
    });
    $("#canvas").on('touchend',function(event) {
        if (event.changedTouches[0].pageX > that.touchEnd1X - 50 && event.changedTouches[0].pageX < that.touchEnd1X + 50) {
            that.touchEnd1X = event.changedTouches[0].pageX;
            that.touchEnd1Y = event.changedTouches[0].pageY;
            that.touchStart1X = null; that.touchStart1Y = null; that.touchMove1X = null; that.touchMove1Y = null;
        }
        if (event.changedTouches[0].pageX > that.touchEnd2X - 50 && event.changedTouches[0].pageX < that.touchEnd2X + 50) {
            that.touchEnd2X = event.changedTouches[0].pageX;
            that.touchEnd2Y = event.changedTouches[0].pageY;
            that.touchStart2X = null; that.touchStart2Y = null; that.touchMove2X = null; that.touchMove2Y = null;
        }
        if(!game.inGame) {
            event.preventDefault();
        }
    });
};

            var ivanX = false;
            var ivanY = false;
Joystick.prototype.input = function() {
    if (this.touchStart1X !== null) {
        if (this.touchStart1X < game.canvas.width / 2) {
            //joystick
            game.context.drawImage(this.staticMov, this.touchStart1X-game.canvas.width/12, this.touchStart1Y-game.canvas.width/12, game.canvas.width/6, game.canvas.width/6);
            var tempAngle = Math.atan2(this.touchMove1Y-this.touchStart1Y, this.touchMove1X-this.touchStart1X);
            var tempModule = Math.sqrt(Math.pow(this.touchMove1X - this.touchStart1X, 2)+Math.pow(this.touchMove1Y - this.touchStart1Y, 2));
            if(tempModule > game.canvas.width/24) {tempModule = game.canvas.width/24;}
            game.context.drawImage(this.mobileMov, this.touchStart1X-game.canvas.width/24 + tempModule * Math.cos(tempAngle), this.touchStart1Y-game.canvas.width/24 + tempModule * Math.sin(tempAngle), game.canvas.width/12, game.canvas.width/12);
            //funcionalidad
            //controles 1///////////////////////////////////////////////////////////////
            var degree = r2d(tempAngle);
            while(degree > 360){degree -= 360;}
            while(degree < 0) {degree += 360;}
            if(degree > 292.5+45 || degree < 67.5+45) {
                console.log("derecha, ");
                game.player.dirX = "right";
                game.player.ivanX = true;
            }
            if(degree > 22.5+45 && degree < 157.5+45) {
                console.log("abajo");
                game.player.dirY = "down";
                game.player.ivanY = true;
            }
            if(degree > 112.5+45 && degree < 247.5+45) {
                console.log("izquierda");
                game.player.dirX = "left";
                game.player.ivanX = true;
            }
            if(degree > 202.5+45 && degree < 337.5+45) {
                console.log("arriba");
                game.player.dirY = "up";
                game.player.ivanY = true;
            }
        }
        if (this.touchStart1X > game.canvas.width / 2) {
            for(var i in game.map.items){
				if(game.player.col+2 == game.map.items[i].col && game.player.row == game.map.items[i].row){
					if(game.player.inventario.length < 2){
						game.player.inventario.push(game.map.items[i].id);
						game.map.items.splice(i,1);
						//console.log(that.inventario);
					}
				}
			}
        }
    }
    if (this.touchStart2X !== null) {
        if (this.touchStart2X < game.canvas.width / 2) {
            game.context.drawImage(this.staticMov, this.touchStart2X-game.canvas.width/12, this.touchStart2Y-game.canvas.width/12, game.canvas.width/6, game.canvas.width/6);
            var tempAngle = Math.atan2(this.touchMove2Y-this.touchStart2Y, this.touchMove2X-this.touchStart2X);
            var tempModule = Math.sqrt(Math.pow(this.touchMove2X - this.touchStart2X, 2)+Math.pow(this.touchMove2Y - this.touchStart2Y, 2));
            if(tempModule > game.canvas.width/24) {tempModule = game.canvas.width/24;}
            game.context.drawImage(this.mobileMov, this.touchStart2X-game.canvas.width/24 + tempModule * Math.cos(tempAngle), this.touchStart2Y-game.canvas.width/24 + tempModule * Math.sin(tempAngle), game.canvas.width/12, game.canvas.width/12);
            //funcionalidad
            //controles 1////////////////////////////////////////////
            var degree = r2d(tempAngle);
            while(degree > 360){degree -= 360;}
            while(degree < 0) {degree += 360;}
            if(degree > 292.5+45 || degree < 67.5+45) {
                console.log("derecha, ");
                game.player.dirX = "right";
                game.player.ivanX = true;
            }
            if(degree > 22.5+45 && degree < 157.5+45) {
                console.log("abajo");
                game.player.dirY = "down";
                game.player.ivanY = true;
            }
            if(degree > 112.5+45 && degree < 247.5+45) {
                console.log("izquierda");
                game.player.dirX = "left";
                game.player.ivanX = true;
            }
            if(degree > 202.5+45 && degree < 337.5+45) {
                console.log("arriba");
                game.player.dirY = "up";
                game.player.ivanY = true;
            }
        }
        if (this.touchStart2X > game.canvas.width / 2) {
            for(var i in game.map.items){
				if(game.player.col+2 == game.map.items[i].col && game.player.row == game.map.items[i].row){
					if(game.player.inventario.length < 2){
						game.player.inventario.push(game.map.items[i].id);
						game.map.items.splice(i,1);
						//console.log(that.inventario);
					}
				}
			}
        }
    }
}

function r2d(radian) {
    var deg = radian * 180 / Math.PI;
    return deg
}