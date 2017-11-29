var Warehouse = function(col, row) {
	this.col = col;
	this.row = row;
	this.stored = [];
	this.level = 1;

	this.tick = function () {
		this.update();
		this.render();
	}.bind(this);

	this.update = function () {
		if(this.col + 2 >= game.player.col &&
		this.col -1<= game.player.col&&
		this.row + 2 >= game.player.row&&
		this.row -1<= game.player.col) {
			for (var item in game.player.inventario) {
				this.stored.push(game.player.inventario[item]);
			}
			game.player.inventario = [];
		}
	}.bind(this);

	this.render = function () {
		var iso = Util.cartesianToIso(1, 1);
		game.context.drawImage(game.tiles.house.img, iso.x + game.map.gapX, iso.y + game.map.gapY);
	}.bind(this);
}
