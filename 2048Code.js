function Player2048(n, width, depth) {

	var TOP = 1, BOTTON = 2, LEFT = 3, RIGHT = 4;

	this.boardSize = n;
    this.width = width;
    this.depth = depth;
    this.valuemax = [];
    this.depthyield = new Map([[1,[]],[2,[]],[3,[]],[4,[]],[5,[]],[6,[]],[7,[]],[8,[]],[9,[]],[10,[]]])
}

Player2048.prototype.initialCurrent = function() {
    var current = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];

    for (var r = 0; r < 2; r++){
        cell = Math.floor(Math.random()*16);
        if (current[cell] == 0){
            current[cell] = this.getRandomAdversarialMove();
        };
    };

    return current;
};

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

	var cellsTwo = 0;

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
					* availableCells.length)]] = this.getRandomAdversarialMove();
	}

	for (var i = 0; i < current.length; i++)
			if (current[i] == 2)
				cellsTwo += 1;

	return [current.slice(), totalMerged, (availableCells.length) - 1];
};

Player2048.prototype.getRandomAdversarialMove = function() {
	if (Math.random() <= .75)
		return 2;
	return 4;
};

Player2048.prototype.hasPossibleMoves = function(current) {

	var a = [this.simulateUp(current),   this.simulateLeft(current),
			 this.simulateDown(current), this.simulateRight(current)];

	for (var i = 0; i < a.length; i++) {

		for (var j = 0; j < a[i].length; j++)

			if (a[i][j] != current[j])
				return true;
	}

	return false;
};

Player2048.prototype.isEquals = function(a1, a2) {

	if (a1.length != a2.length)
		return false;

	for (var i = 0; i < a1.length; i++)
		if (a1[i] != a2[i])
			return false;

	return true;
};

Player2048.prototype.firstStep = function(step, current, depth){
	var steps = ["UP","DOWN","LEFT","RIGHT"];
	var result = [];
	var voidCells = 0;
	var merged = 0; 
	var currentSimulated = current.slice();
	var stepSimulated = step;
	for (var o = 0; o < depth; o++){
		switch(stepSimulated){
			case "UP":
				result = (this.simulateUp(currentSimulated, 3));
			break;

			case "DOWN":
				result = (this.simulateDown(currentSimulated, 3));
			break;

			case "LEFT":
				result = (this.simulateLeft(currentSimulated, 3));
			break;

			case "RIGHT":
				result = (this.simulateRight(currentSimulated, 3));
			break;
		};

		if (o == 0 && this.isEquals(current, result[0]) || !this.hasPossibleMoves(current)){
			return -8000;
		};

		currentSimulated = result[0];
		merged += result[1];

		stepSimulated = steps[Math.floor(Math.random()*steps.length)];
	};
	voidCells = result[2];
	return merged;
};

Player2048.prototype.resultSteps = function(current, depth){
	var resultUp = 0;
	var resultDown = 0;
	var resultLeft = 0;
	var resultRight = 0;

	for (var o = 0; o < this.width; o++){
		resultUp += this.firstStep("UP", current, depth);
		resultDown += this.firstStep("DOWN", current, depth);
		resultLeft += this.firstStep("LEFT", current, depth);
		resultRight += this.firstStep("RIGHT", current, depth);
	};

	return [resultUp, resultDown, resultLeft, resultRight];
};

Player2048.prototype.move = function(direction, current) {

	switch (direction) {
	case 1:
		current = this.simulateUp(current, 3); // TOP
		break;
	case 2:
		current = this.simulateDown(current, 3); // DOWN
		break;
	case 3:
		current = this.simulateLeft(current, 3); // LEFT
		break;
	case 4:
		current = this.simulateRight(current, 3); // RIGHT
		break;
	default:
		console.log("invalid move");
	}

    return current[0];
};

Player2048.prototype.play = function(current, depth) {
	var self = this;

	setTimeout(function() {

		var values = self.resultSteps(current, depth);
		var max = Math.max.apply(Math, values);
		
		
		current = self.move((values.indexOf(max) + 1), current);
		
		if (!(values.every((e) => e == -800000))){
			self.play(current, depth);
            //console.log(current, depth);
		}else{
            console.log(current, depth);
            console.log("EndGame");
            self.depthyield.get(depth).push(Math.max.apply(Math, current));
        };
        
	}, 100);
};

Player2048.prototype.incomeCalculation = function(){
	this.width = 100;
	for (var d = 1; d < 3; d++){
        this.calculation(d)
    }; 
    console.log("FIM");   
};

Player2048.prototype.calculation = function(depth){

	console.log("Calculing...", depth)
        for (var t = 0; t < 100; t++){
            var current = this.initialCurrent();
            this.play(current, depth);
        };
};

var player = new Player2048(4, 0, 0);

player.incomeCalculation();
