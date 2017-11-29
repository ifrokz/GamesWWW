var Animation = function(type,iniX,iniY,finalX,finalY) {
    this.type = type;
    this.iniX = iniX;
    this.iniY = iniY;
    this.finalX = finalX;
    this.finalY = finalY;
    this.angle = Math.atan2(finalY - iniY, finalX - iniX);
    this.length = 100;
    this.finalLength = Math.sqrt(Math.pow(finalY-iniY,2) + Math.pow(finalX-iniX,2));
    this.img = lightningImg;
    this.remove = false;
}

Animation.prototype.update = function(callBack) {
    this.length += 50;
    if (this.length > this.finalLength) {
        if(this.remove) {
            animations.splice(animations.indexOf(this),1);
            return
        }else{
            this.remove = true;
            this.length = this.finalLength;
        }
    }
    callBack();
}

Animation.prototype.render = function() {
    if(this instanceof Animation) {
        drawRotatedImage(this.img, this.iniX, this.iniY, this.length, 40, this.angle);
    }
}

function updateAnimations() {
    for (var a in animations) {
        if(typeof animations[a].render != "undefined") {
            animations[a].update(function(){
                animations[a].render();
            });
        }
    }
}