function init() {
    console.log("in init")
    canvas = document.getElementById("mycanvas")
    pen = canvas.getContext('2d')
    W = H = canvas.width = canvas.height = 500
    sw = 32

    snake = {
        init_len: 5,
        color: "blue",
        cells: [],
        direction: "right",
        create_snake: function () {
            for (var i = this.init_len; i > 0; i--) {
                this.cells.push({ x: i, y: 0 })
            }
        },
        draw_snake: function () {
            for (var i = 0; i < this.cells.length; i++) {
                pen.fillRect(this.cells[i].x * sw, this.cells[i].y * sw, sw - 2, sw - 2)
            }

        }
    }

    snake.create_snake()

}


function draw() {
    // console.log("in draw")
    snake.draw_snake()
}

function update() {
    // console.log("in update")
    // rect.x += rect.speed
    // if (rect.x > W - rect.w || rect.x < 0) {
    //     rect.speed *= -1
    // }
}

function gameloop() {
    // console.log("in game loop")
    draw()
    update()
}


init()
var game = setInterval(gameloop, 100)