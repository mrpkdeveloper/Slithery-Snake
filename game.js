//********** init function for initialising things ********************** */
function init() {
    console.log("in init")
    canvas = document.getElementById("mycanvas")
    pen = canvas.getContext('2d')
    W = H = canvas.width = canvas.height = 500
    sw = 32
    gameover = false
    score = 0
    food = randomfood()

    //create food and trophy image
    foodimg = new Image()
    foodimg.src = "./assets/apple.png"
    trophyimg = new Image()
    trophyimg.src = "./assets/trophy.png"

    //***********snake object ***************************/
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
                //**************foodeaten****************
                food = randomfood()
                score++
            } else {
                //THIS WILL REMOVE THE LAST CELL from array but rectangle will be still there
                this.cells.pop()
            }

            //update according to the direction
            var nextx, nexty

            //logic for new head basically for movement
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

            //************check four border************
            var lastx = Math.round(W / sw)
            var lasty = Math.round(H / sw)

            if (snake.cells[0].x >= lastx || snake.cells[0].x < 0 || snake.cells[0].y < 0 || snake.cells[0].y >= lasty) {
                gameover = true
            }
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





//********** draw function ********************** */
function draw() {
    // console.log("in draw")
    pen.clearRect(0, 0, W, H)  //erase previous frame
    snake.draw_snake()
    pen.fillStyle = food.color

    //food
    pen.drawImage(foodimg, food.x * sw, food.y * sw, sw, sw)


    //trophy
    pen.drawImage(trophyimg, 40, 30, sw, sw)
    //score
    pen.fillStyle = "black"
    pen.font = "25px roboto"
    pen.fillText(score, 50, 50)
}



function update() {
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



//***************game loop ****************/
function gameloop() {
    // console.log("in game loop")
    if (gameover == true) {
        clearInterval(game)
        alert("game over")
        return
    }
    draw()
    update()
}






init()
var game = setInterval(gameloop, 100)