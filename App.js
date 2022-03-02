//Take canvas and score nodes from the dom
const canvas__El = document.querySelector('#canvas'),
  score__El = document.querySelector('.score span:nth-child(2)'),
  ctx = canvas__El.getContext('2d');

const properties = {
  canvas__width: 800,
  canvas__height: 600,
  rowNum: 16,
  colNum: 21,
  grid: [],
  velocity: 1000,
  col__width: 40,
  col__height: 40,
  food__pos: { x: 0, y: 0, present: true },
  direction: undefined,
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
} = properties;

let snake = {
  alive: false,
  segments: [
    { x: canvas__width / 2, y: canvas__height / 2 - 20 },
  ],
};

 //Set random food spawn
 let food__pos = {
     present:false,
     x:Math.floor(Math.random() * ((canvas__width / col__width)-1)+1)*col__width,
     y:Math.floor(Math.random()*((canvas__height / col__height)-1)+1) * col__height
  };

const prevoiusHeadPosX = snake.segments[0].x;

// Initialize
function initialize() {
  canvas__El.width = canvas__width;
  canvas__El.height = canvas__height;
  //Set canvas width and height

  update();
  draw();
}

function moveSnakeBody(e) {
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
  window.addEventListener('keydown', moveSnakeBody);
  const head = snake.segments[0];
  if (direction === 'right') head.x += col__width;
  if (direction === 'left') head.x -= col__width;
  if (direction === 'up') head.y -= col__height;
  if (direction === 'down') head.y += col__height;

//   if (head.x !== prevoiusHeadPosX) {
//     snake.segments[1].x += col__width;
//   }
}

//Snake
function snakeHandler() {
  snake.alive = true;
  snake.segments.forEach(segment => {
    ctx.beginPath();
    ctx.rect(segment.x, segment.y, col__width, col__height);
    ctx.fillStyle = 'green';
    ctx.fill();
  });
}

//Draw cells
function cellsHandler() {
  for (let row = 0; row < rowNum; row++) {
    grid[row] = [];
    for (let col = 0; col < colNum; col++) {
      grid[row][col] = { x: col__width * col, y: col__height * row };
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

//Draw food
function foodHandler() {
     
        if(food__pos.present){
            ctx.beginPath();
            ctx.rect(food__pos.x, food__pos.y, col__width, col__height);
            ctx.fillStyle = 'red';
            ctx.fill();

        }
    
  

  if(snake.segments[0].x === food__pos.x){
      return  (
        food__pos.present = false,
        food__pos = {
        present:food__pos.present,
        x:Math.floor(Math.random() * ((canvas__width / col__width)-1)+1)*col__width,
        y:Math.floor(Math.random()*((canvas__height / col__height)-1)+1) * col__height
     }
      )
    }

  return food__pos.present=true
}

//Draw
function draw() {
  ctx.clearRect(0, 0, canvas__width, canvas__height);
  //Draw ground onscreen
  ctx.rect(0, 0, canvas__width, canvas__height);
  ctx.fillStyle = 'lightgreen';
  ctx.fill();

  //Draw cells on screen
  cellsHandler();
  //Draw food on screen
  foodHandler();
  //Draw snake on screen
  snakeHandler();
}

setInterval(initialize, 500);
