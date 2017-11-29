var game;

$(function() {
	game = new Game({
		name: "Cold Waves",
		canvas: document.getElementById("canvas"),
		fps: 60
	});
	game.init();
})
