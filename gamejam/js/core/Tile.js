function Tile(type, x, y, alpha) {
	this.type = type;
	this.alpha = alpha;
	this.x = x;
	this.y = y;
	this.img = game.tiles[this.type].img;
	this.frozen = false;
	this.tree = this.alpha < 255;
}
