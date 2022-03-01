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
  velocity: 1,
  col__width: 40,
  col__height: 40,
  food__pos: { x: 0, y: 0 },
  snake__segments: [],
};

//Destructure props from props obj
const {canvas__width, canvas__height , velocity , snake__segments, food__pos, grid, col__width, col__height, rowNum, colNum } =
properties;

// Initialize
function initialize() {
  //Set canvas width and height
  canvas__El.width = canvas__width;
  canvas__El.height = canvas__height;
}


function moveSnakeBody(e){
switch (e.key) {
    case 'ArrowRight':
        snake__segments[0].x +=col__width
        break;
    case 'ArrowLeft':
        snake__segments[0].x -=col__width
    default:
        break;
}

}


//Update
function update() {
//Move snake segment
window.addEventListener('keydown' , moveSnakeBody)

}

//Snake
function snakeHandler() {
  const snakeSegments = [
    { x: canvas__width / 2, y: canvas__height / 2 - 20},
    { x: canvas__width / 2 - 40, y: canvas__height / 2 - 20},
  ];
  snake__segments.push(...snakeSegments);
  

  snake__segments.forEach(segment =>{
  ctx.beginPath()
  ctx.rect(segment.x , segment.y , col__width , col__height)
  ctx.fillStyle='green';
  ctx.fill()
  })
}

//Draw cells
function cellsHandler() {
  for (let row = 0; row < rowNum; row++) {
    grid[row] = [];
    for (let col = 0; col < colNum; col++) {
      grid[row][col] = { x: col__width * col, y: col__height * row };
      //Set random food spawn
      const randomX = grid[row][Math.floor(Math.random() * col)];
      const randomY = grid[Math.floor(Math.random() * row)][col];
      food__pos.x = randomX.x;
      food__pos.y = randomY.y;
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
  for(let row = 0 ; row < rowNum ; row++){
  const checkPositions=grid[row].every((col)=> col.x !== food__pos.x || col.y !== food__pos.y)
  if(checkPositions){
    ctx.beginPath();
    ctx.rect(food__pos.x, food__pos.y, col__width, col__height);
    ctx.fillStyle = 'red';
    ctx.fill();
  }
}
}

//Draw
function draw() {
  //Draw ground onscreen
  ctx.rect(0, 0,canvas__width,canvas__height);
  ctx.fillStyle = 'lightgreen';
  ctx.fill();

  //Draw cells on screen
  cellsHandler();
  //Draw food on screen
  foodHandler();
  //Draw snake on screen
  snakeHandler();
}


initialize();
update();
draw();

