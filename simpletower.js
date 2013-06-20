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
	};


	return new Hanoi(5);
});


// $(document).ready(function(){
	function Play() {
		this.game = Game();
	}

	Play.prototype.renderTowers = function() {
		var towers = this.game.towers;
		$('div').remove();
		_.each(towers, function(tower, index){
			_.each(tower, function(discSize, discIndex){
				var width = (discSize * 20) + 'px';
				var $newDisc = $('<div>');
				$newDisc.css('width', width);
				$newDisc.draggable({
					appendTo: 'body',
					cursor: "move",
			    helper: 'clone',
			    revert: "invalid"
				});
				$($('article')[index]).prepend($newDisc);
			});

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
		$('article').droppable({
			tolerance: "intersect",
			accept: 'div',
			drop: function(event, ui){
				$(this).append($(ui.draggable));
			}
		});

		var towers = play.game.towers;
		var directions = { origin: null, destination: null };

		$('article').on('mousedown', function () {
			directions.origin = $(this).index();
		});

		$('article').on('mouseup', function(){
			directions.destination = $(this).index();
			play.game.move(towers[directions.origin], towers[directions.destination]);
			play.renderTowers();
			play.renderErrors();
		});
	}

	var newGame = new Play();
	newGame.renderTowers();
	newGame.begin();