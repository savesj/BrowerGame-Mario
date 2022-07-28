const canvas = document.querySelector('canvas')
//context
const c = canvas.getContext('2d')
canvas.width = 1024
canvas.height = 576
const gravity = 0.5
class Mario {
    //player position
    constructor() {
        this.position = {
            x: 200,
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
        //gravity
        this.position.y += this.velocity.y 
         this.position.x += this.velocity.x 
        
        if (this.position.y +this.height + this.velocity.y <= canvas.height)
             this.velocity.y += gravity
    }
}
class Floor {
    constructor({ x,y,width}) {
        this.position = {
            x: x,
            y: y
        }
        this.width = width
        this.height = 20
    }
    draw() {
         c.fillStyle = 'transparent'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}
class Background {
    constructor({ x,y,imageSrc}) {
        this.position = {
            x: x,
            y: y
       }
       this.image = new Image()
       this.image.src = imageSrc
       this.width = 1024
       this.height = 576


   }
   draw() {
         c.drawImage(this.image, this.position.x, this.position.y)
    }
}



let mario = new Mario()
let floors = [
    new Floor({
    x: 0,
    y: 502,
    width: 2646
}), new Floor({
    x: 2726,
    y: 502, 
    width: 576
}), new Floor({
    x: 3419,
    y: 502,
    width: 2463
}), new Floor({
    x: 5961,
    y: 502,
    width: 2152
})
]
let backgrounds = [
    new Background ({
    x: 0,
    y: 0,
    imageSrc: 'floor2.png'
    })
]
const keys = {
    right: {
        pressed: false
    },
     left: {
        pressed: false
    }
}
let scrollOffset = 0

function init() {
mario = new Mario()
floors = [new Floor({
    x: 0,
    y: 502,
    width: 2646
}), new Floor({
    x: 2726,
    y: 502,
    width: 576
}), new Floor({
    x: 3419,
    y: 502,
    width: 2463
}), new Floor({
    x: 5961,
    y: 502,
    width: 2152
})
] 
backgrounds = [new Background ({
    x: 0,
    y: 0,
    imageSrc: 'floor2.png'
    })
]

 scrollOffset = 0
}
function animate() {
    requestAnimationFrame(animate)
    c.fillStyle = 'white'
    c.fillRect(0, 0, canvas.width, canvas.height)
    backgrounds.forEach((background) => {
     background.draw()
    })
    floors.forEach((floor) => {
     floor.draw()
    })
     mario.update()
     //scroll background
    if(keys.right.pressed && mario.position.x < 400) {
    mario.velocity.x = 5
    } else if ((keys.left.pressed && mario.position.x > 100) || (keys.left.pressed && scrollOffset === 0 && mario.position.x > 0)) {
        mario.velocity.x= -5
    } else {mario.velocity.x = 0 
    
            if (keys.right.pressed) {
                scrollOffset += 5
                floors.forEach((floor) => {
                 floor.position.x -= 5
    })
    
    backgrounds.forEach((background) => {
     background.position.x -=5
    })
        } else if (keys.left.pressed && scrollOffset > 0) {
        scrollOffset -= 5
        floors.forEach((floor) => {
        floor.position.x += 5
    })
      backgrounds.forEach((background) => {
     background.position.x +=5
    })
        }
    } 
    console.log(scrollOffset)
//collition detection
floors.forEach((floor) => {
  
if (mario.position.y + mario.height <= floor.position.y && mario.position.y + mario.height + mario.velocity.y >= floor.position.y && mario.position.x + mario.width >= floor.position.x && mario.position.x <= floor.position.x + floor.width
        ) {
        mario.velocity.y = 0
    }
    }) 
    //Victory
    if (scrollOffset > 6674) {
        console.log('you win')
    }
    //Game Over
    if (mario.position.y > canvas.height) {
        console.log('Game Over')
        init()
        
    }
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
            mario.velocity.y -= 15
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
            break
    }
    console.log(keys.right.pressed)
})
  