function Player() {
	this.width = 82;
	this.height = this.width;
	this.sprite = 0;
	this.maxSprites = 3;
	this.direction = "s";
	this.health = 10;
	this.ivanX = false;
	this.ivanY = false;

	this.tileWidth = null;

	
	this.col = 0;
	this.row = 0;
	this.renderCorrectX = 1;
	this.renderCorrectY = 0;

	this.posX = null;
	this.posY = null;

	this.hp = 100;
	this.moveX = true;
	this.moveY = true;

	this.dirY = null;
	this.dirX = null;

	var that = this;

	this.inventario = [];

	$(document).keydown(function (event) {
		if (event.which == 32) {
			//console.log(that.col);
			for(var i in game.map.items){
				if(that.col+2 == game.map.items[i].col && that.row == game.map.items[i].row){
					if(that.inventario.length < 2){
						that.inventario.push(game.map.items[i].id);
						game.map.items.splice(i,1);
						//console.log(that.inventario);
					}
				}
			}
		}
		if (event.which == 49) {
			var soltar = true;
			for(var i in game.map.items){		
				if(that.col+1 == game.map.items[i].col+1 && that.row == game.map.items[i].row && that.inventario.length > 0){
					var aux = that.inventario[0];
					that.inventario[0] = game.map.items[i].id;
					game.map.items[i].id = aux;
					soltar = false;
				}
			}
			if(soltar&& that.inventario.length >= 1){
				game.map.items.push(new Item(that.inventario[0],game.map.gapSize,that));
				that.inventario.splice(0,1);
			}
		}
		if (event.which == 50) {
			var soltar = true;
			for(var i in game.map.items){
				if(that.col+1 == game.map.items[i].col && that.row == game.map.items[i].row && that.inventario.length > 1){
					var aux = that.inventario[1];
					that.inventario[1] = game.map.items[i].id;
					game.map.items[i].id = aux;
					soltar = false;
				}
			}
			if(soltar && that.inventario.length >= 2){
				game.map.items.push(new Item(that.inventario[1],game.map.gapSize,that));
				that.inventario.splice(1,1);
			}
		}

		if (event.which == 37 && that.moveX) { that.dirX = "left"; }
		if (event.which == 39 && that.moveX) { that.dirX = "right"; }
		if (event.which == 38 && that.moveY) { that.dirY = "up"; }
		if (event.which == 40 && that.moveY) { that.dirY = "down"; }

		if (event.which == 100) { game.map.gapX += game.map.gapSize; }
		if (event.which == 102) { game.map.gapX -= game.map.gapSize; }
		if (event.which == 104) { game.map.gapY += game.map.gapSize / 2; }
		if (event.which == 98) { game.map.gapY -= game.map.gapSize / 2; }

	});

	$(document).keyup(function (event) {
		if (event.which == 32) { console.log("payaso"); }
		if (event.which == 37) { that.dirX = null; }
		if (event.which == 39) { that.dirX = null; }
		if (event.which == 38) { that.dirY = null; }
		if (event.which == 40) { that.dirY = null; }
	});

	this.init = function () {
		this.tileWidth = game.map.gapProySize;
		this.col = Math.round(game.map.level.img.width / 2);
		this.row = Math.round(game.map.level.img.width / 2);
		this.posX = ((this.col+this.renderCorrectX) * this.tileWidth / 2) + (this.tileWidth / 2 - this.width / 2);
		this.posY = ((this.row+this.renderCorrectY) * this.tileWidth / 2) + (this.tileWidth / 2 - this.width / 2);
		game.cursor.targetX = this.col;
    	game.cursor.targetY = this.row;

		var iso = Util.cartesianToIso(this.posX/2, this.posY/2);
	
		game.map.gapX = 2*iso.x; //console.log(this.posX+","+game.map.gapX+","+iso.x)
		game.map.gapY = -iso.y; //console.log(this.posY+","+game.map.gapY+","+iso.y)


	}.bind(this);

	this.tick = function () {
		this.update();
		this.render();
	}.bind(this);

	this.update = function () {

		if (game.gameOver) { return; }
		if(this.dirX == "right" && this.dirY == null) {this.direction = "se"}
		if(this.dirX == "right" && this.dirY == "down") {this.direction = "s"}
		if(this.dirX == null && this.dirY == "down") {this.direction = "sw"}
		if(this.dirX == "left" && this.dirY == "down") {this.direction = "w"}
		if(this.dirX == "left" && this.dirY == null) {this.direction = "nw"}
		if(this.dirX == "left" && this.dirY == "up") {this.direction = "n"}
		if(this.dirX == null && this.dirY == "up") {this.direction = "ne"}
		if(this.dirX == "right" && this.dirY == "up") {this.direction = "e"}
		if(this.moveX === false || this.moveY === false) {
			if(game.ticks % 5 === 0) {
				this.sprite ++;
			}
		} else {
			this.sprite = 0;
		}
		if(this.sprite > this.maxSprites) {
			this.sprite = 0;
		}
		for (var tile in game.map.tiles) {
			if(!(game.warehouse.col + 1 >= game.player.col &&
			game.warehouse.col <= game.player.col&&
			game.warehouse.row + 1 >= game.player.row&&
			game.warehouse.row <= game.player.col)) {
				if (game.map.tiles[tile].frozen && game.map.tiles[tile].x == this.col && game.map.tiles[tile].y == this.row) {
					Hud.dead();
					break;
				}
			}
		}
	}.bind(this);

	this.render = function () {

		if (this.moveX && this.dirX == "right") {
			this.col++;
			game.cursor.targetX++;
		} else if (this.moveX && this.dirX == "left") {
			this.col--;
			game.cursor.targetX--;
		}

		if (this.moveY && this.dirY == "up") {
			this.row--;
			game.cursor.targetY--;
		} else if (this.moveY && this.dirY == "down") {
			this.row++;
			game.cursor.targetY++;
		}

		// POS X
		if (this.posX != (this.col+this.renderCorrectX) * this.tileWidth / 2 + (this.tileWidth / 2 - this.width / 2)) {
			if (this.posX < (this.col+this.renderCorrectX) * this.tileWidth / 2 + (this.tileWidth / 2 - this.width / 2)) {
				this.posX++;
				if (Math.abs(this.posX - ((this.col+this.renderCorrectX) * this.tileWidth / 2 + (this.tileWidth / 2 - this.width / 2))) < 1) {
					this.posX = (this.col+this.renderCorrectX) * this.tileWidth / 2 + (this.tileWidth / 2 - this.width / 2);
				}
			} else if (this.posX > (this.col+this.renderCorrectX) * this.tileWidth / 2 + (this.tileWidth / 2 - this.width / 2)) {
				this.posX--;
				if (Math.abs(this.posX - ((this.col+this.renderCorrectX) * this.tileWidth / 2 + (this.tileWidth / 2 - this.width / 2))) < 1) {
					this.posX = (this.col+this.renderCorrectX) * this.tileWidth / 2 + (this.tileWidth / 2 - this.width / 2);
				}
			}
			this.moveX = false;
		} else {
			this.moveX = true;
		}

		// POS Y
		if (this.posY != (this.row+this.renderCorrectY) * this.tileWidth / 2 + (this.tileWidth / 2 - this.height / 2)) {
			if (this.posY < (this.row+this.renderCorrectY) * this.tileWidth / 2 + (this.tileWidth / 2 - this.height / 2)) {
				this.posY++;
				if (Math.abs(this.posY - ((this.row+this.renderCorrectY) * this.tileWidth / 2 + (this.tileWidth / 2 - this.height / 2))) < 1) {
					this.posY = (this.row+this.renderCorrectY) * this.tileWidth / 2 + (this.tileWidth / 2 - this.height / 2);
				}
			} else if (this.posY > (this.row+this.renderCorrectY) * this.tileWidth / 2 + (this.tileWidth / 2 - this.height / 2)) {
				this.posY--;
				if (Math.abs(this.posY - ((this.row+this.renderCorrectY) * this.tileWidth / 2 + (this.tileWidth / 2 - this.height / 2))) < 1) {
					this.posY = (this.row+this.renderCorrectY) * this.tileWidth / 2 + (this.tileWidth / 2 - this.height / 2);
				}
			}
			this.moveY = false;
		} else {
			this.moveY = true;
		}

		game.context.fillStyle = "rgba(50,150,200,05)";
		
		if(this.direction === "") {this.direction = "s"}
		var iso = Util.cartesianToIso(this.posX, this.posY);
		game.context.drawImage(animationSprites[this.direction+this.sprite],iso.x + game.map.gapX, iso.y + game.map.gapY, this.width, this.height);
		///////////////////////////////////////
		game.map.gapX = -iso.x + game.canvas.width/2 ; //console.log(this.posX+","+game.map.gapX+","+iso.x)
		game.map.gapY = -iso.y + game.canvas.height/2; //console.log(this.posY+","+game.map.gapY+","+iso.y)
		///////////////////////////////////////
	}.bind(this);
}

Player.prototype.joyStick = function() {
	this.ivanX = false;
	this.ivanY = false;
	game.joystick.input();
	if(this.ivanX == false) {
		this.dirX = null;
	}
	if(this.ivanY == false) {
		this.dirY = null;
	}
}

var animationSprites = [];
for (var i = 0; i < 4; i++) {
	animationSprites["n"+i] = new Image();
	animationSprites["n"+i].src = "img/character/n"+i+".png";
}
for (var i = 0; i < 4; i++) {
	animationSprites["ne"+i] = new Image();
	animationSprites["ne"+i].src = "img/character/ne"+i+".png";
}
for (var i = 0; i < 4; i++) {
	animationSprites["e"+i] = new Image();
	animationSprites["e"+i].src = "img/character/e"+i+".png";
}
for (var i = 0; i < 4; i++) {
	animationSprites["se"+i] = new Image();
	animationSprites["se"+i].src = "img/character/se"+i+".png";
}
for (var i = 0; i < 4; i++) {
	animationSprites["s"+i] = new Image();
	animationSprites["s"+i].src = "img/character/s"+i+".png";
}
for (var i = 0; i < 4; i++) {
	animationSprites["sw"+i] = new Image();
	animationSprites["sw"+i].src = "img/character/sw"+i+".png";
}
for (var i = 0; i < 4; i++) {
	animationSprites["w"+i] = new Image();
	animationSprites["w"+i].src = "img/character/w"+i+".png";
}
for (var i = 0; i < 4; i++) {
	animationSprites["nw"+i] = new Image();
	animationSprites["nw"+i].src = "img/character/nw"+i+".png";
}
