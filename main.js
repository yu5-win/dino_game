var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

canvas.width=window.innerWidth-100;
canvas.height=window.innerHeight-100;

var dinoImg = new Image();
dinoImg.src = 'dino.png';

var dino = {
  x: 10,
  y: 200,
  width: 50,
  height: 50,
  draw(){
    ctx.drawImage(dinoImg, this.x, this.y, this.width, this.height);   
  }
}
dino.draw();

var cactusImg = new Image();
cactusImg.src='cactus.png';

class Cactus{
  constructor(){
    this.x = 500;
    this.y = 200;
    this.width = 50;
    this.height = 50;
  }
  draw(){
    ctx.drawImage(cactusImg, this.x, this.y, this.width, this.height);
  }
}
var cactus = new Cactus();
cactus.draw();

var timer = 0;
var fps = 60;
var cactuses = [];
var jumpTimer = 0;
var animation;

function frame(){
  animation = requestAnimationFrame(frame);
  timer++;
  ctx.clearRect(0,0,canvas.width, canvas.height);

  if(timer % fps === 0){
    var cactus = new Cactus();
    cactuses.push(cactus);
  }
  cactuses.forEach((a, i, o)=>{
    if(a.x < 0){
      o.splice(i, 1)
    }
    a.x--;

    isCrash(dino, a);

    a.draw();
  })

  if(isJump == true){
    dino.y--;
    jumpTimer++;
  } 
  if(isJump==false){
    if(dino.y < 200){
      dino.y++;
    }
  }
  if(jumpTimer > 100){
    isJump=false;
    jumpTimer = 0;
  }

  dino.draw()
}

frame();

// 충돌
function isCrash(dino, cactus){
  var xDiv = cactus.x - (dino.x+dino.width);
  var yDiv = cactus.y - (dino.y + dino.height);
  if(xDiv < 0 && yDiv < 0){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    cancelAnimationFrame(animation);
  }
}

var isJump = false;
document.addEventListener('keydown', e => {
  if(e.code === 'Space'){
    isJump = true;
  }
});