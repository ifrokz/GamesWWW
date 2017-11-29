var itemImg = new Array();
for(var i = 1; i <= 11; i++){
	itemImg[i] = new Image();
	itemImg[i].src = 	"img/sprites/"+i+".png";
	//console.log(itemImg[i].src);
}

function Item(id, tileWidth,owner) {
	this.tileWidth = tileWidth * 0.8943885546;
	this.owner = owner;
	if(!(this.owner instanceof Player)){
		this.col = Math.floor(Math.random() * (Math.floor(game.map.level.img.height)))+1;
		this.row = Math.floor(Math.random() * (Math.floor(game.map.level.img.width)));
	}else{
		this.col = this.owner.col+2;
		this.row = this.owner.row;
	}


	this.width = 15;
	this.height = this.width;

	this.posX = (this.col * (this.tileWidth/2)) + (this.tileWidth / 2 - this.width / 2);
	this.posY = (this.row * (this.tileWidth/2)) + (this.tileWidth / 2 - this.height / 2);
	var iso = Util.cartesianToIso(this.posX, this.posY);
	this.posX = iso.x;
	this.posY = iso.y;

	this.id = id;
	
	this.tick = function () {
		this.update();
		//this.render();
	}.bind(this);

	this.update = function () {
		
	}.bind(this);

	this.render = function () {
	
	game.context.drawImage(itemImg[this.id],this.posX+game.map.gapX,this.posY+game.map.gapY,this.width,this.height);

	}.bind(this);
}
