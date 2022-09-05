function Player2048(n) {

	var TOP = 1, BOTTON = 2, LEFT = 3, RIGHT = 4;

	this.boardSize = n;

	//KeyboardInputManager.prototype.targetIsInput = function(event) {
		//return false;
	//};
}

Player2048.prototype.simulateUp = function(current, i) {

	i = i || 0;

	if (i == 3)
		return this.simulate(current.slice(), 0, this.boardSize, 1,
				this.boardSize, function(o, p) {
					return o <= p;
				}, function(o, p) {
					return o >= p;
				});

	return this.simulate(current.slice(), 0, this.boardSize, 1, this.boardSize,
			function(o, p) {
				return o <= p;
			}, function(o, p) {
				return o >= p;
			})[i];
}

Player2048.prototype.simulateDown = function(current, i) {

	i = i || 0;

	if (i == 3)
		return this.simulate(current.slice(), this.boardSize
				* (this.boardSize - 1), this.boardSize * this.boardSize, 1, -1
				* this.boardSize, function(o, p) {
			return o >= p;
		}, function(o, p) {
			return o <= p;
		});

	return this.simulate(current.slice(),
			this.boardSize * (this.boardSize - 1), this.boardSize
					* this.boardSize, 1, -1 * this.boardSize, function(o, p) {
				return o >= p;
			}, function(o, p) {
				return o <= p;
			})[i];
}

Player2048.prototype.simulateLeft = function(current, i) {

	i = i || 0;

	if (i == 3)
		return this.simulate(current.slice(), 0, this.boardSize
				* (this.boardSize - 1) + 1, this.boardSize, 1, function(o, p) {
			return o <= p;
		}, function(o, p) {
			return o >= p;
		});

	return this.simulate(current.slice(), 0, this.boardSize
			* (this.boardSize - 1) + 1, this.boardSize, 1, function(o, p) {
		return o <= p;
	}, function(o, p) {
		return o >= p;
	})[i];
}

Player2048.prototype.simulateRight = function(current, i) {

	i = i || 0;

	if (i == 3)
		return this.simulate(current.slice(), this.boardSize - 1, Math.pow(
				this.boardSize, 2), this.boardSize, -1, function(o, p) {
			return o >= p;
		}, function(o, p) {
			return o <= p;
		});
	else
		return this.simulate(current.slice(), this.boardSize - 1, Math.pow(
				this.boardSize, 2), this.boardSize, -1, function(o, p) {
			return o >= p;
		}, function(o, p) {
			return o <= p;
		})[i];
}

Player2048.prototype.simulate = function(c, initial, end, increment, shift, F1,
		F2) {

	var current = c.slice();

	var availableCells = [];

	var totalMerged = 0;

	for (var o = 0; o < 3; o++) {

		for (var i = initial; i < end; i += increment) {

			for (var j = i + shift; F1(j, i + shift * (this.boardSize - 1)); j += shift) {

				var tmp = j;

				var summed = false;

				for (var n = j - shift; F2(n, i); n -= shift) {

					if (o % 2 == 0) {

						if (current[n] == 0 && current[tmp] != 0) {
							current[n] = current[tmp];
							current[tmp] = 0;
						}

						tmp = n;
					} else {

						if (current[j - shift] == current[j] && !summed) {
							current[j - shift] *= 2;
							totalMerged += current[j - shift]
							current[j] = 0;
							summed = true;
						}
					}
				}
			}
		}
	}

	if (!this.isEquals(current, c)) {
		for (var i = 0; i < current.length; i++)
			if (current[i] == 0)
				availableCells.push(i)

		if (availableCells.length)
			current[availableCells[Math.floor(Math.random()
					* availableCells.length)]] = 2;
	}

	return [current.slice(0), totalMerged];
};

Player2048.prototype.isEquals = function(a1, a2) {

	if (a1.length != a2.length)
		return false;

	for (var i = 0; i < a1.length; i++)
		if (a1[i] != a2[i])
			return false;

	return true;
};


Player2048.prototype.firstStep = function(step, current){
	var steps = ["UP","DOWN","LEFT","RIGHT"]; 
	//for (var i = 0; i < 1000; i++){
		var Current = current.slice();
		var Step = step;
		for (var o = 0; o > -1; o++){
			switch(Step){
				case "UP":
					Current = (this.simulateUp(Current, 3))[0];

				case "DOWN":
					Current = (this.simulateDown(Current, 3))[0];

				case "LEFT":
					Current = (this.simulateLeft(Current, 3))[0];

				case "RIGHT":
					Current = (this.simulateRight(Current, 3))[0];
			};

			Step = steps[Math.floor(Math.random()*steps.length)];
			console.log(Current);
		};
	//};
};
