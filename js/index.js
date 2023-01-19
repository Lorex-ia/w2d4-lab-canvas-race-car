
//Setting up the game space 
const myCanvas = document.querySelector("canvas");
const ctx = myCanvas.getContext("2d");
myCanvas.style.border ="2px solid black";


// Create the components 
//1_ Background
const bgImg = new Image();
bgImg.src = "https://media.discordapp.net/attachments/1062053353837830236/1065601329701072946/road.png"
;
const bgImg2 = new Image();
bgImg2.src = "https://media.discordapp.net/attachments/1062053353837830236/1065601329701072946/road.png"
;
let bg1Y=0;
let bg2y = -myCanvas.height;


// 2_ Car
const car = new Image();
  car.src = "images/car.png";
  let carY = myCanvas.height/2 + 150;
  let carX = myCanvas.width/2 - 24; 
  let carSpeed = 5; 
  let carWidth = 50;
  let carHeight = 100; 


// Obstacles
function randomize(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

  let obsRandomX = randomize(50,300);
  let obsY = 20;
  let obsRandomWidth = randomize(50,200);
  let obsHeight = 30;
  let obsSpeed = 5;


const drawObstacles = () => {
      obsY += obsSpeed;
    if(obsY > myCanvas.height){
        obsY = 0;
        obsRandomX = randomize(50, myCanvas.width - obsRandomWidth);
        obsRandomWidth = randomize(50,200);
    } 
    ctx.beginPath()
    ctx.fillStyle = 'red'
    ctx.rect(obsRandomX, obsY, obsRandomWidth, obsHeight)
    ctx.fill()
    ctx.closePath()
    // requestAnimationFrame(drawObstacles);
}



// game variables 
let gameOver = false; 
let animateId;

//for the car 
let isMovingDown = false;
let isMovingLeft = false;
let isMovingRight = false;
let isMovingUp = false;


//collision
let score = 0;

const checkCollision = () => {
    let carLeft = carX;
    let carRight = carX + carWidth;
    let carTop = carY;
    let carBottom = carY + carHeight;

    let obsLeft = obsRandomX;
    let obsRight = obsRandomX + obsRandomWidth;
    let obsTop = obsY;
    let obsBottom = obsY + obsHeight;

    if (carLeft < obsRight && carRight > obsLeft && carTop < obsBottom && carBottom > obsTop) {
        alert("Collision!");
        gameOver = true;
        
    }    else if(obsY > myCanvas.height) {
       score++;
       obsY = 0;
       obsRandomX = randomize(50, myCanvas.width - obsRandomWidth);
       obsRandomWidth = randomize(50,200);
    }
}


//check score 
const displayScore = () => {
    ctx.fillStyle = "white";
    ctx.font = "30px Arial";
    ctx.fillText(`Score: ${score}`, 20, myCanvas.height - 20);
    
    if(obsY + obsHeight > carY) {
        score++;
        obsY = 0;
        obsRandomX = randomize(50, myCanvas.width - obsRandomWidth);
        obsRandomWidth = randomize(50,200);
    }
}



window.onload = () => {
  document.getElementById('start-button').onclick = () => {
    startGame();
  };


//global animation function
  function animate(){
  ctx.drawImage(bgImg, 0, bg1Y, myCanvas.width, myCanvas.height);
  ctx.drawImage(bgImg2,0, bg2y, myCanvas.width, myCanvas.height);
  ctx.drawImage(car, carX, carY, carWidth, carHeight);
  
//calling the obs object
    drawObstacles()    

//calling the collisions
    checkCollision()

//display score 
    displayScore()

  //car animations

if (isMovingRight){
  carX += carSpeed;
}

if (isMovingLeft){
  carX -= carSpeed;
}

if(isMovingUp){
  carY -= carSpeed;
}
if(isMovingDown){
  carY += carSpeed;
}


  //bg image animations
  bg1Y += 2;
  bg2y += 2;

    if(bg1Y > myCanvas.height){
      bg1Y = -myCanvas.height
    }
    if(bg2y > myCanvas.height){
      bg2y = -myCanvas.height
    }


    // starting the game
      if(!gameOver){
        animateId = requestAnimationFrame(animate);
      }else{
        cancelAnimationFrame(animateId);
      }

  }


  function startGame() {
    animate();
    console.log("Game started");
  }


  // car event listeners 
  document.addEventListener('keypress', event => {
    console.log(event);
    if (event.key === 'd'){
      isMovingRight = true
    } 
    if (event.key === 'q'){
      isMovingLeft = true
    } 

    if (event.key === 'z'){
       isMovingUp = true
    } 

    if (event.key === 'x'){
      isMovingDown = true
    } 
  })

    document.addEventListener('keyup', ()=> {
      isMovingDown = false;
      isMovingLeft = false;
      isMovingRight = false;
      isMovingUp = false;
   
  })




};
