function Sprite(src, cb) {
	var that = this;
	this.img = new Image();
	if (cb) {
		this.img.onload = function() {
			cb(that.img.width, that.img.height);
		};
	}
	this.img.src = src;
}
