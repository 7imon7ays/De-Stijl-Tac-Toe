Game = (function()	{
	var TicTacToe = function(){
		var that = this;
		that.grid = [[],[],[]];

		(function(){
			that.grid.forEach(function(subArray){
				for (var i = 0; i < 3; i++) {
					subArray[i] = '_';
				}
			})
		})();

	};

	TicTacToe.prototype.show = function(){
		console.log("Board")
		console.log(this.grid[0]);
		console.log(this.grid[1]);
		console.log(this.grid[2]);
	};

	TicTacToe.prototype.place = function(symbol, coordinates){
		var that = this, x = coordinates[0], y = coordinates[1];
		var validMove = function(){
			return (that.grid[x][y] === '_');
		};

		if (!validMove()) {
			console.log('invalid move!');
		} else {
			that.grid[x][y] = symbol;
		}

	};

	TicTacToe.prototype.arrayReduce = function(array) {
		return array.reduce(function(element, value){
				return element + value;
			});
	};

	TicTacToe.prototype.winnerByRow = function(){
		var that = this;
		var result = null

		for (var i = 0; i < 3; i++) {
			var reducedRow = that.arrayReduce(that.grid[i]);
			if (reducedRow === 'xxx') {
				result =  'x';
			} else if (reducedRow === 'ooo') {
				result = 'o';
			}
		}
		return result;
	};

	TicTacToe.prototype.winnerByColumn = function(){
		var that = this;

		var threeInAColumn = function(index){
			var column = [];
			for (var i = 0; i < 3; i++) {
					column.push(that.grid[i][index]);
				}

				var reducedColumn = that.arrayReduce(column);

			return that.checkSequence(reducedColumn);
		};

		for (var i = 0; i < 3; i++) {
			var columnSequence = threeInAColumn(i);
			if ((columnSequence === "x") || (columnSequence === "o")) {
				return columnSequence;
			}
		}
		return null;
	};

	TicTacToe.prototype.winnerByLeftDiagonal = function(){
		var that = this;

		var diagonal = [];
		for (var i = 0; i < 3; i++) {
			diagonal.push(that.grid[i][i]);
		}

		reducedDiagonal = that.arrayReduce(diagonal);

		return that.checkSequence(reducedDiagonal);
	};

	TicTacToe.prototype.winnerByRightDiagonal = function(){
		var that = this;

		var diagonal = [];
		for (var i = 0; i < 3; i++) {
			diagonal.push(that.grid[i][2 - i]);
		}

		reducedDiagonal = that.arrayReduce(diagonal);
		return that.checkSequence(reducedDiagonal);
	};

	TicTacToe.prototype.checkSequence = function(str){
		if (str === "ooo") {
			return "o";
		} else if (str === "xxx") {
			return "x";
		} else {
			return null;
		}
	};

	TicTacToe.prototype.winner = function(){

	};
	return new TicTacToe();
});






var game = Game();

function play(){

}

function render(){

}


game.show();

console.log(game.winnerByRow());
console.log(game.winnerByColumn());
console.log(game.winnerByLeftDiagonal());
console.log(game.winnerByRightDiagonal());

