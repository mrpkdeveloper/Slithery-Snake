function init() {
    console.log("in init")
    canvas = document.getElementById("mycanvas")
    pen = canvas.getContext('2d')
    W = H = canvas.width = canvas.height = 500
    sw = 32

    snake = {
        init_len: 5,
        color: "black",
        cells: [],
        direction: "right",
        create_snake: function () {
            for (var i = this.init_len; i > 0; i--) {
                this.cells.push({ x: i, y: 0 })
            }
        },
        draw_snake: function () {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color
                pen.fillRect(this.cells[i].x * sw, this.cells[i].y * sw, sw - 2, sw - 2)
            }

        },

        update_snake: function () {
            //update according to the direction
            this.cells.pop()
            var headx = this.cells[0].x
            var heady = this.cells[0].y
            var nextx, nexty
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
    pen.clearRect(0, 0, W, H)
    snake.draw_snake()
}

function update() {
    // console.log("in update")
    // rect.x += rect.speed
    // if (rect.x > W - rect.w || rect.x < 0) {
    //     rect.speed *= -1
    // }
    snake.update_snake()
}

function gameloop() {
    // console.log("in game loop")
    draw()
    update()
}


init()
var game = setInterval(gameloop, 100)