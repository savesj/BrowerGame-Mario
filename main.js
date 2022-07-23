const canvas = document.querySelector('canvas')
//context
const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight
const gravity = 0.5
class Mario {
    //player position
    constructor() {
        this.position = {
            x: 100,
            y: 100
        }
        this.velocity = {
            x: 0,
            y: 0
        }
        this.width = 30
        this.height = 30
    }
    
    draw() {
    c.fillStyle = 'red'
    c.fillRect(this.position.x, this.position.y, this.width, this.height
        )
    }
    update() {
        this.draw()
        this.position.y += this.velocity.y 
         this.position.x += this.velocity.x 
        if (this.position.y +this.height + this.velocity.y <= canvas.height)
             this.velocity.y += gravity
             else  this.velocity.y = 0
        
    }
}
class Floor {
    constructor({ x,y }) {
        this.position = {
            x: x,
            y: y
        }
        this.width = 200
        this.height = 20
    }
    draw() {
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
const mario = new Mario()
const floors = [new Floor({
    x: 200,
    y: 100
}), new Floor({
    x: 500,
    y: 200
})]
const keys = {
    right: {
        pressed: false
    },
     left: {
        pressed: false
    }
}
function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    mario.update()
    floors.forEach((floor) => {
     floor.draw()
    })
    if(keys.right.pressed && mario.position.x < 400) 
    {
        mario.velocity.x = 5
    } else if (keys.left.pressed && mario.position.x > 100) {
        mario.velocity.x= -5
    } else {mario.velocity.x = 0 
    
            if (keys.right.pressed) {
                floors.forEach((floor) => {
                 floor.position.x -= 5
    })
        } else if (keys.left.pressed) {
            floors.forEach((floor) => {
            floor.position.x += 5
    })
        }
    } 
//collition detection
floors.forEach((floor) => {
  
if (mario.position.y + mario.height <= floor.position.y && mario.position.y + mario.height + mario.velocity.y >= floor.position.y && mario.position.x + mario.width >= floor.position.x && mario.position.x <= floor.position.x + floor.width
        ) {
        mario.velocity.y = 0
    }
    }) 
}
//callbackfunction
animate()
window.addEventListener('keydown', ({ keyCode }) => {
    switch (keyCode) {
        case 37:
            console.log('left') 
            keys.left.pressed = true
            break
            case 38:
            console.log('up') 
            mario.velocity.y -= 20
            break
            case 39:
            console.log('right') 
            keys.right.pressed = true
            break
            case 40:
            console.log('down') 
            break
    }
     console.log(keys.right.pressed)
})
window.addEventListener('keyup', ({ keyCode }) => {
    switch (keyCode) {
        case 37:
            console.log('left') 
             keys.left.pressed = false
            break
            case 38:
            console.log('up') 
            break
            case 39:
            console.log('right') 
            keys.right.pressed = false
            break
            case 40:
            console.log('down') 
            mario.velocity.y += 20
            break
    }
    console.log(keys.right.pressed)
})
