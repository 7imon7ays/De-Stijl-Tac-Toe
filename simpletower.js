var Game = (function() {

	var Hanoi = function(num){

		var that = this
		that.towers = [[], [], []];

		var filler = function(num) {
			_.times(num, function(index) {
				that.towers[0].push(num - index);
			});
		};

		that.error = null;

		filler(num);
	};


	Hanoi.prototype.move = function(origin, target) {

		var validMove = function(origin, target) {
			return ((target.length === 0) && (origin.length > 0)) ||
							(origin[origin.length - 1] < target[target.length - 1]);
		};

		if (!validMove(origin, target)) {
			this.error = 'invalid move!';
		} else {
			this.error = null;
			target.push(origin.pop());
		}
	};

	Hanoi.prototype.show = function() {
		var that = this;
		console.log("Original array " + that.towers[0]);
		console.log("Second array " + that.towers[1]);
		console.log("Final array " + that.towers[2]);
	};


	return new Hanoi(3);
});


$(document).ready(function(){
	function Play() {
		this.game = Game();
	}

	Play.prototype.renderTowers = function() {
		var towers = this.game.towers;
		$('pre').each(function(index, tower){
			console.log('tower is ' + tower);
			$(tower).text(towers[index]);
		});
	}

	Play.prototype.renderErrors = function () {
		var error = this.game.error;
		if (error !== null) {
			$('#error_div').text(error);
		} else {
			$('#error_div').text("");
		}
	}

	Play.prototype.begin = function() {
		var play = this;
		$('button').on('click', function () {
			var originIndex = $('#start_input').val();
			var targetIndex = $('#target_input').val();
			var origin = play.game.towers[originIndex - 1];
			var target = play.game.towers[targetIndex - 1];

			play.game.move(origin, target);
			play.renderTowers();
			play.renderErrors();
		});
	}

	var newGame = new Play();
	newGame.renderTowers();
	newGame.begin();
});




