const CANVAS_BORDER_COLOUR = 'black';
  		const CANVAS_BACKGROUND_COLOUR = 'white';
  		const SNAKE_COLOUR = 'lightgreen';
  		const SNAKE_BORDER_COLOUR = 'darkgreen';

  		/* ---------- get canvas element -------------*/
  		var gameCanvas = document.getElementById('gameCanvas');
  		/************ get 2d canvas context *************/
  		var ctx = gameCanvas.getContext('2d');
  		function clearCanvas() {
	  		ctx.fillStyle = CANVAS_BACKGROUND_COLOUR;
	  		ctx.strokestyle = CANVAS_BORDER_COLOUR;
	  		ctx.fillRect(0,0,gameCanvas.width,gameCanvas.height);
	  		ctx.strokeRect(0,0,gameCanvas.width,gameCanvas.height);
  		}

  		let snake = [
  			{x:150 , y:150},
  			{x:140 , y:150},
  			{x:130 , y:150},
  			{x:120 , y:150},
  			{x:110 , y:150},

  		];
  		
  		var dx = 10;
  		var dy = 0;
  		let score = 0;
  		let gameOver = false;
	  	var levels = [100,200,500];
	  	var level = levels[0];
  		function gameLevel() {
  			var Chosenlevel = document.getElementById("level").value;
	  		if(Chosenlevel === 'Easy'){
	  			level = levels[2];
	  		}else if(Chosenlevel === 'Hard'){
	  			level = levels[0];
	  		}else{
	  			level = levels[1];
	  		}
	  		return level;
  		}
  		function changeDirection(event) {
  			const LEFT_KEY = 37;
  			const UP_KEY = 38;
  			const RIGHT_KEY = 39;
  			const DOWN_KEY = 40;

  			const keyPressed = event.keyCode;
  			const goingUp = dy === -10;
  			const goingDown = dy === 10;
  			const goingRight = dx === 10;
  			const goingLeft = dx === -10;

  			if (keyPressed === LEFT_KEY && !goingRight){
  				dx = -10;
  				dy = 0;
  			}
  			if (keyPressed === RIGHT_KEY && !goingLeft){
  				dx = 10;
  				dy = 0;
  			}
  			if (keyPressed === UP_KEY && !goingDown){
  				dx = 0;
  				dy = -10;
  			}
  			if (keyPressed === DOWN_KEY && !goingUp){
  				dx = 0;
  				dy = 10;
  			}
  		}
  		createFood();
  		function main() {
  			if(gameOver === false){
  				setTimeout(function onTick() {
  				gameLevel();
	  			clearCanvas();
	  			drawFood();
	  			advanceSnake();
	  			drawSnake();
	  			didGameEnd();
	  			main();
  			},level);
  			}else{
  				ctx.font ="30px Arial";
  				ctx.fillText("Game Over!",50,50);
  			}
  			    			
  		}
  		function randomTen(min,max) {
  			return Math.round((Math.random() * (max-min)+ min )/ 10) * 10;
  		}
  		var foodX = 10;
  		var foodY = 10;
  		function createFood() {
  			foodX = randomTen(0, gameCanvas.width - 10);
  			foodY = randomTen(0, gameCanvas.height - 10);

  			snake.forEach(function isFoodOnSnake(part) {
  				const foodIsOnSnake = part.x == foodX && part.y == foodY
  				if(foodIsOnSnake){
  					createFood();
  				}
  			});
  		}
  		function drawFood() {
			 ctx.fillStyle = 'red';
			 ctx.strokestyle = 'darkred';
			 ctx.fillRect(foodX, foodY, 10, 10);
			 ctx.strokeRect(foodX, foodY, 10, 10);
		}

  		document.addEventListener("keydown", changeDirection);		
  		clearCanvas();
  		drawSnake();
  		function drawSnake() {
  			snake.forEach(drawSnakePart);
  		}
  		function drawSnakePart(snakePart) {
  			ctx.fillStyle = SNAKE_COLOUR;
  			ctx.strokestyle = SNAKE_BORDER_COLOUR;
  			ctx.fillRect(snakePart.x,snakePart.y,10,10);
  			ctx.strokeRect(snakePart.x,snakePart.y,10,10);
  		}

  		function advanceSnake() {
  			const head = {x: snake[0].x + dx , y: snake[0].y +dy};
  			const didEatFood = snake[0].x === foodX && snake[0].y === foodY;
  			snake.unshift(head);
  			if(didEatFood){
  				createFood();
  				snake.unshift(head);
  				score += 1;
  				document.getElementById("score").innerHTML = "Your score is : " + score;
  			}
  			snake.pop();
  		}

  		function didGameEnd() {
  			for(let i = 4; i < snake.length;i++ ){
  				const selfCollide = snake[0].x === snake[i].x && snake[0].y === snake[i].y;
  				if(selfCollide){
  					gameOver = true;
  				};
  			}
  			const hitLeftWall = snake[0].x < 0;
  			const hitRightWall = snake[0].x > gameCanvas.width - 10;
  			const hitUpperWall = snake[0].y < 0;
  			const hitBottomWall = snake[0].y > gameCanvas.height -10;
  			if(hitLeftWall || hitRightWall || hitUpperWall ||hitBottomWall){
  				gameOver = true;
  			}
  		}