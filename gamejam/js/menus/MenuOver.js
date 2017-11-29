function MenuOver() {
	Menu.call(this, {
		element: ".menu.over",
		visible: false
	});

	var that = this;

	$(this.element + ' .button.replay').click(function() {
		$(that.element).fadeOut(1500, function() {
			game.player.init();
			game.map.init();
			game.gameOver = false;
			game.round.start();
		});
	});

	$(this.element + ' .button.start').click(function() {
		$(that.element).fadeOut(500, function() {
			$(game.menus.start.element).fadeIn(500);
		});
	});
}

MenuOver.prototype = Object.create(Menu.prototype);
MenuOver.prototype.constructor = MenuOver;
