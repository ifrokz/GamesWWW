function Menu(config) {
	this.element = config.element;
	this.visible = config.visible;

	if (!this.visible) { $(this.element).hide(); }

	this.toggle = function() {
		this.visible = !this.visible;
	};
}
