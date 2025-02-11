 
 const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        const box = 20;
        let snake, food, direction, game;

        function resetGame() {
            snake = [{ x: 10 * box, y: 10 * box }];
            direction = "RIGHT";
            food = generateFood();
            clearInterval(game);
            game = setInterval(draw, 100);
        }

        document.addEventListener("keydown", (event) => {
            if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
            else if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
            else if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
            else if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
        });

        function changeDirection(newDirection) {
            if (newDirection === "UP" && direction !== "DOWN") direction = "UP";
            else if (newDirection === "DOWN" && direction !== "UP") direction = "DOWN";
            else if (newDirection === "LEFT" && direction !== "RIGHT") direction = "LEFT";
            else if (newDirection === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
        }

        function generateFood() {
            let newFood;
            do {
                newFood = {
                    x: Math.floor(Math.random() * 20) * box,
                    y: Math.floor(Math.random() * 20) * box
                };
            } while (snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
            return newFood;
        }

        function draw() {
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = "red";
            ctx.fillRect(food.x, food.y, box, box);

            ctx.fillStyle = "lime";
            snake.forEach((segment) => {
                ctx.fillRect(segment.x, segment.y, box, box);
            });

            let newHead = { x: snake[0].x, y: snake[0].y };
            if (direction === "UP") newHead.y -= box;
            if (direction === "DOWN") newHead.y += box;
            if (direction === "LEFT") newHead.x -= box;
            if (direction === "RIGHT") newHead.x += box;

            if (newHead.x === food.x && newHead.y === food.y) {
                food = generateFood();
            } else {
                snake.pop();
            }

            if (
                newHead.x < 0 || newHead.x >= canvas.width ||
                newHead.y < 0 || newHead.y >= canvas.height ||
                snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)
            ) {
                alert("¡Game Over!");
                clearInterval(game);
                return;
            }

            snake.unshift(newHead);
        }

        resetGame();