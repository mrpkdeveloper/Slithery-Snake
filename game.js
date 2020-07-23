function init() {
    console.log("in init")
    canvas = document.getElementById("mycanvas")
    pen = canvas.getContext('2d')
    W = canvas.width
    H = canvas.height
    rect = {
        x: 20,
        y: 20,
        w: 40,
        h: 40,
        speed: 30,
    }
}


function draw() {
    // console.log("in draw")
    pen.clearRect(0, 0, W, H)
    pen.fillStyle = 'red'
    pen.fillRect(rect.x, rect.y, rect.w, rect.h)
}

function update() {
    // console.log("in update")
    rect.x += rect.speed
    if (rect.x > W - rect.w || rect.x < 0) {
        rect.speed *= -1
    }
}

function gameloop() {
    // console.log("in game loop")
    draw()
    update()
}


init()
var game = setInterval(gameloop, 100)