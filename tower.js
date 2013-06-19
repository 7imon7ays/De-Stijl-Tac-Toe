var Tower = function(num){

	var that = this
	that.towers = [[], [], []];

	var filler = function(num) {
		for (var i = 0; i < num; i++) {
			that.towers[0][i] = i + 1;
		}
	};

	filler(num);
};


Tower.prototype.move = function(origin, destination) {

	var validMove = function(origin, destination) {
		return ((destination.length === 0) && (origin.length > 0)) ||
						(origin[origin.length - 1] < destination[destination.length - 1]);
	};

	if (!validMove(origin, destination)) {
		console.log('invalid move!');
	} else {
		destination.push(origin.pop());
	}
};

Tower.prototype.show = function() {
	var that = this;
	console.log("Original array " + that.towers[0]);
	console.log("Second array " + that.towers[1]);
	console.log("Final array " + that.towers[2]);
};