var Cursor = function() {
    var that = this;
    this.img = new Image();
    this.img.src = "img/tiles/outline.png";
    this.isoX = null;
    this.isoY = null;
    this.cartX = null;
    this.cartY = null;
    this.row = null;
    this.col = null;
    this.targetX = null;
    this.targetY = null;
    this.speed = 35;
    $("#canvas").on('mousemove', function(event){
        that.isoX = event.pageX - game.map.gapX;
        that.isoY = event.pageY - game.map.gapY;
    });
    $("#canvas").on('click', function(event) {

    });
    $("#canvas").on('touchStart', function(event) {
        that.isoX = event.touches[0].pageX - game.map.gapX;
        that.isoY = event.touches[0].pageY - game.map.gapY;

    });
};

Cursor.prototype.tick = function() {
    this.update();
    this.render();
};

Cursor.prototype.update = function() {
    //var gapToIso = Util.cartesianToIso(game.map.gapX, game.map.gapY);
    var cart = Util.isoToCartesian(this.isoX, this.isoY);
    //console.log("cart: "+(cart.x)+","+(cart.y));    
    this.cartX = cart.x;
    this.cartY = cart.y;
    this.col = Math.floor(this.cartX / game.map.gapProySize * 2 + 0.5) - 2;
    this.row = Math.floor(this.cartY / game.map.gapProySize * 2 + 0.5) - 1;
    var cursorIso = Util.cartesianToIso(this.col, this.row); 
    this.cursorX =  cursorIso.x * game.map.gapProySize / 2 + game.map.gapX;
    this.cursorY = cursorIso.y * game.map.gapProySize / 2 + game.map.gapY;
    //console.log("columna: "+this.col+", fila: "+this.row);

    

}

Cursor.prototype.render = function() {
    game.context.drawImage(this.img, this.cursorX, this.cursorY);
}