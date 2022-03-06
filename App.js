//Take canvas and score nodes from the dom
const canvas__El = document.querySelector('#canvas'),
  score__El = document.querySelector('.score span:nth-child(2)'),
  ctx = canvas__El.getContext('2d'),
  modal__El=document.getElementById('modal'),
  overlay__El=document.getElementById('overlay'),
  reloadBtn__El=document.getElementById('reload__btn')
  

  //Reload the game
  reloadBtn__El.addEventListener('click' , ()=>{
  window.location.reload()
  })

let interval;

const properties = {
  canvas__width:800,
  canvas__height:600,
  rowNum: 16,
  colNum: 21,
  grid: [],
  velocity: 100,
  col__width: 40,
  col__height: 40,
  food__pos: { x: 0, y: 0, present: true },
  direction: undefined,
  score:0
};

//Destructure props from props obj
let {
  direction,
  canvas__width,
  canvas__height,
  velocity,
  grid,
  col__width,
  col__height,
  rowNum,
  colNum,
  score,
  height__ratio
} = properties;

let snake = {
  segments: [
    {x:((canvas__width / 2) - col__width), y: ((canvas__height / 2) - col__height) - 20 }]
};

 //Set random food spawn
 let food__pos = {
     present:false,
     x:Math.floor(Math.random() * ((canvas__width / col__width)-1)+1) * col__width,
     y:Math.floor(Math.random() * ((canvas__height / col__height)-1)+1) * col__height
  };

// Initialize
function initialize() {
 canvas__El.width = canvas__width
 canvas__El.height = canvas__height
  //Set canvas width and height

  update();
  draw();
}

function wallColision(){
if(snake.segments[0].x > canvas__width - col__width
    || snake.segments[0].x < 0
    || snake.segments[0].y > canvas__height - col__height
    || snake.segments[0].y < col__height - col__height){
clearInterval(interval)
overlay__El.classList.add('active')
modal__El.classList.add('active')
}

}


function snakeColision(){
if(snake.segments.length > 0){
 const bol=snake.segments.some(segment =>{
   return(
    snake.segments[0].x == segment.x,
    snake.segments[0].y == segment.y
     )
 })
 console.log(bol);
}

}

function moveSnake(e) {
  switch (e.key) {
    case 'ArrowRight':
      if (direction !== 'left') {
        direction = 'right';
      }
      break;
    case 'ArrowLeft':
      if (direction !== 'right') {
        direction = 'left';
      }
      break;
    case 'ArrowUp':
      if (direction !== 'down') {
        direction = 'up';
      }
      break;
    case 'ArrowDown':
      if (direction !== 'up') {
        direction = 'down';
      }
      break;
  }
}


//Update
function update() {
  //Move snake's segments
  window.addEventListener('keydown', moveSnake);
  const head = snake.segments[0];
  if (direction === 'right') head.x += col__width;
  if (direction === 'left') head.x -= col__width;
  if (direction === 'up') head.y -= col__height;
  if (direction === 'down') head.y += col__height;
  //Wall detection
  wallColision();

  // Snake detection
  snakeColision()

}

//Snake
function snakeHandler() {
  snake.segments.forEach(segment => {
    ctx.beginPath();
    ctx.rect(segment.x , segment.y, col__width, col__height);
    ctx.fillStyle = 'green';
    ctx.fill();
  });
  
  if(snake.segments.length > 1){
    for(let i = snake.segments.length - 1; i > 0 ; i--){
        snake.segments[i].x = snake.segments[i - 1].x 
        snake.segments[i].y = snake.segments[i - 1].y
        }
    
  }
}


//Draw cells
function cellsHandler() {
  for (let row = 0; row < rowNum; row++) {
    grid[row] = [];
    for (let col = 0; col < colNum; col++) {
      grid[row][col] = { x:col__width * col, y: col__height * row };
      //Draw grid lines on canvas
      ctx.beginPath();
      ctx.strokeRect(
        grid[row][col].x,
        grid[row][col].y,
        col__width,
        col__height
      );
    }
  }
}

//Grow snake
function snakeGrows(){
snake.segments.push({x:snake.segments[0].x , y:snake.segments[0].y})
}

//Eat food
function eatFoodHandler(){
    if(snake.segments[0].x === food__pos.x && snake.segments[0].y === food__pos.y){
        score++;  
        return  (
            score__El.textContent=score,
            food__pos.present = false,
            food__pos = {
            present:food__pos.present,
            x:Math.floor(Math.random() * ((canvas__width / col__width)-1)+1)*col__width,
            y:Math.floor(Math.random()*((canvas__height / col__height)-1)+1) * col__height
         },
         snakeGrows()
          )
        }
    
      return food__pos.present=true
}

//Draw food
function randomFoodHandler() {
    if(food__pos.present){
        ctx.beginPath();
        ctx.rect(food__pos.x, food__pos.y, col__width, col__height);
        ctx.fillStyle = 'red';
        ctx.fill();
    }
}

//Draw
function draw() {
  ctx.clearRect(0, 0, canvas__width, canvas__height);
  //Draw ground onscreen
  ctx.rect(0,0,canvas__width,canvas__height);
  ctx.fillStyle = 'lightgreen';
  ctx.fill();

  //Draw cells on screen
  cellsHandler();
  //Draw food on screen
  randomFoodHandler();
  //Eat food 
  eatFoodHandler()
  //Draw snake on screen
  snakeHandler();
}


setInterval(()=>{
  initialize()
},velocity)