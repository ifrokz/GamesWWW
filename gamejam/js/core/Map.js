function Map() {
	var that = this;
	this.level = new Sprite("level/level1.png", function(_width, _height) {
		setTimeout(function() {
			that.width = _width;
			that.height = _height;
			that.init();
			game.player.init();
		}, 100);
	});
	this.width = null;
	this.height = null;
	this.gapSize = 82;
	this.gapProySize = this.gapSize * 0.8943885546;
	this.gapX = null;
	this.gapY = null;
	this.items = null;
	this.sweeping = false;
	this.sweepRow = 0;

	this.init = function() {
		this.sweeping = false;
		this.sweepRow = 0;
		this.items = [];
		this.spawnItems(this.gapSize);
		game.context.drawImage(this.level.img, 0, 0);
		var tempData = game.context.getImageData(0, 0, this.width, this.height);
		var data = tempData.data;
		this.tiles = [];
		for (var i = 0; i < data.length; i += 4) {
			var tempX = (i / 4) % this.width;
			var tempY = Math.floor((i / 4) / this.width);
			if (data[i] == 1 && data[i + 1] == 2 && data[i + 2] == 3) { 
				var tempType = "house"; 
				console.log("house");
			}
			else if (data[i] < 10 && data[i + 1] < 10 && data[i + 2] < 10) { var tempType = "black"; }
			else if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] > 240) { var tempType = "white"; }
			else if (data[i] > 240 && data[i + 1] < 10 && data[i + 2] < 10) { var tempType = "red"; }
			else if (data[i] == 10 && data[i + 1] == 255 && data[i + 2] == 10) { var tempType = "green"; }
			else if (data[i] == 130 && data[i + 1] == 80 && data[i + 2] == 0) { var tempType = "brown"; }
			else if (data[i] < 10 && data[i + 1] < 10 && data[i + 2] > 240) { var tempType = "blue"; }
			else if (data[i] > 240 && data[i + 1] > 240 && data[i + 2] < 10) { var tempType = "yellow"; }
			else if (data[i] > 240 && data[i + 1] < 10 && data[i + 2] > 240) { var tempType = "magenta"; }
			else if (data[i] < 10 && data[i + 1] > 240 && data[i + 2] > 240) { var tempType = "cyan"; }
			this.tiles.push(new Tile(tempType, tempX, tempY, data[i + 3]));
		}
		game.warehouse = new Warehouse(1, 1);
	}.bind(this);

	this.sweep = function () {
		for (var tile in this.tiles) {
			if (this.tiles[tile].x % this.gapSize === this.sweepRow && this.tiles[tile].type != "house") { this.tiles[tile].frozen = true; }
		}
		if (this.sweepRow >= this.width) {
			this.sweeping = false;
			this.sweepRow = 0;
		} else {
			this.sweepRow++;
		}
	}.bind(this);

	this.tick = function () {
		this.update();
		this.render();
		for (var item in this.items) {
			this.items[item].tick();
		}
	}.bind(this);

	this.update = function () {
		if (game.ticks % 4 === 0 && this.sweeping) {
			this.sweep();
		}
	}.bind(this);

	this.render = function () {
		for (var tile in this.tiles) {
			var iso = Util.cartesianToIso(this.tiles[tile].x * this.gapProySize / 2, this.tiles[tile].y * this.gapProySize / 2);
			game.context.drawImage(this.tiles[tile].frozen ? game.tiles.white.img : this.tiles[tile].img, iso.x + this.gapX, iso.y + this.gapY);

		}
		for(var item in game.map.items) {
			game.map.items[item].render();
		}
		for(var tile in this.tiles) {
			var iso = Util.cartesianToIso(this.tiles[tile].x * this.gapProySize / 2, this.tiles[tile].y * this.gapProySize / 2);
			if (this.tiles[tile].tree) {
				game.context.drawImage(this.tiles[tile].frozen ? game.trees.one.snow.img : game.trees.one.dry.img, iso.x + this.gapX, iso.y + this.gapY);
			}
		}
	}.bind(this);

	this.spawnItems = function (tileWidth) {
		var xd = Math.random()*75;
		if (xd < 15) { xd = 15; }
		for (var i = 0; i < xd; i++) {
			this.items.push(new Item(Math.ceil(Math.random() * 11), tileWidth));
		}
	}.bind(this);
};
