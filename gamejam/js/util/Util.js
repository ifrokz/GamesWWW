function Util() {}

Util.cartesianToIso = function(cartX, cartY) {
	var isoX = cartX - cartY;
	var isoY = (cartX + cartY) / 2;
	return { x: isoX, y: isoY }
};

Util.isoToCartesian = function(isoX, isoY) {
	var cartX =(2 * isoY + isoX) / 2;
	var cartY =(2 * isoY - isoX) / 2;
	return { x: cartX, y: cartY }
};
