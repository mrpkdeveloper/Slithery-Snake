function init() {
    console.log("in init")
    canvas = document.getElementById("mycanvas")
    pen = canvas.getContext('2d')
    W = H = canvas.width = canvas.height = 500
    sw = 32
    food = randomfood()

    snake = {
        init_len: 5,
        color: "black",
        cells: [],
        direction: "right",
        create_snake: function () {
            for (var i = this.init_len; i > 0; i--) {
                this.cells.push({ x: i, y: 1 })
            }
        },


        draw_snake: function () {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color
                pen.fillRect(this.cells[i].x * sw, this.cells[i].y * sw, sw - 2, sw - 2)
            }

        },

        update_snake: function () {
            var headx = this.cells[0].x    //current head
            var heady = this.cells[0].y    //current head

            //this will check whether snake has eaten the food or not 
            //and also increse the snake length
            if (food.x == headx && food.y == heady) {
                food = randomfood()
            }






            //update according to the direction
            this.cells.pop()               //THIS WILL REMOVE THE LAST CELL
            var nextx, nexty

            //logic for new head
            if (this.direction == "right") {
                nextx = headx + 1
                nexty = heady
            }
            else if (this.direction == "left") {
                nextx = headx - 1
                nexty = heady
            }
            else if (this.direction == "down") {
                nextx = headx
                nexty = heady + 1
            }
            else if (this.direction == "up") {
                nextx = headx
                nexty = heady - 1
            }
            this.cells.unshift({ x: nextx, y: nexty })
        }
    }


    function keypressed(e) {
        // console.log("key pressed", e.key)
        if (e.key == "ArrowRight") {
            snake.direction = 'right'
        }
        else if (e.key == "ArrowLeft") {
            snake.direction = 'left'
        }
        else if (e.key == "ArrowUp") {
            snake.direction = 'up'
        }
        else {
            snake.direction = 'down'
        }
        console.log(snake.direction)
    }

    snake.create_snake()

    document.addEventListener('keydown', keypressed)

}


function draw() {
    // console.log("in draw")
    pen.clearRect(0, 0, W, H)  //erase previous frame
    snake.draw_snake()
    pen.fillRect(food.x * sw, food.y * sw, sw, sw)
}

function update() {
    //check condition for walls
    // console.log("in update")
    // rect.x += rect.speed
    var lastx = Math.round(W / sw)
    var lasty = Math.round(H / sw)

    if (snake.cells[0].x > lastx || snake.cells[0].x < 0 || snake.cells[0].y < 0 || snake.cells[0].y > lasty) {
        clearInterval(game)
        window.alert("game over")
    }
    snake.update_snake()
}

function randomfood() {
    var foodx = Math.round(Math.random() * (W - sw) / sw)
    var foody = Math.round(Math.random() * (H - sw) / sw)
    var food = {
        x: foodx,
        y: foody,
        color: "red"
    }
    return food
}

function gameloop() {
    // console.log("in game loop")
    draw()
    update()
}


init()
var game = setInterval(gameloop, 100)