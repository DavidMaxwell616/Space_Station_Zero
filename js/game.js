var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 500,
  parent: 'game',
  scene: {
    preload: preload,
    create: create,
    update: update,
  },
};

var game = new Phaser.Game(config);
var _scene;

function create() {
  _scene = this;
  graphics = this.add.graphics(800, 500);
  width = this.game.config.width;
  height = this.game.config.height;
  score = 0;
  ShowIntro();
  _scene.input.keyboard.on('keydown_SPACE', function (event) {
    if (!startGame) {
      infoText.visible = false;
      startGame = true;
      StartGame();
    } else {
      dropBomb();
    }
  });
}

function dropBomb() {}

function StartGame() {
  //draw stars
  stars = _scene.add.group();
  for (var t = 1; t <= 200; t++) {
    var rx = Phaser.Math.Between(1, width);
    var ry = Phaser.Math.Between(1, height * SEA_LEVEL);
    var star = _scene.add.sprite(rx,ry,'star');
    stars.add(star);
  }
  //draw ocean
  RECT(0, height * SEA_LEVEL, width, height, blue);
  waterDrops =  _scene.add.group();
  bloodDrops =  _scene.add.group();
  particles =  _scene.add.group();

  //player
  player = _scene.add.sprite(width / 2, height / 2, 'ship');
  player.setScale(0.6);
  player.xv = 0;
  player.yv = 0;
  _scene.input.keyboard.on('keydown_LEFT', function (event) {
    player.xv--;
  });
  player.setOrigin(0);
  player.spriteScale = 0.6;
  _scene.input.keyboard.on('keydown_RIGHT', function (event) {
    player.xv++;
  });
  _scene.input.keyboard.on('keydown_SPACE', function (event) {
    dropBomb();
  });
  _scene.input.keyboard.on('keydown_UP', function (event) {
    player.yv--;
  });
  _scene.input.keyboard.on('keydown_DOWN', function (event) {
    player.yv++;
  });

  sharks = _scene.add.group();
  scientists = _scene.add.group();
  
  spawnShark(0,1);
  spawnShark(width,-1);


  scoreText = _scene.add.text(width * 0.01, height * 0.01, 'SCORE:' + score, {
    fontFamily: 'Arial',
    fontWeight: 'bold',
    fontSize: '18px',
    color: '#ff0000',
    stroke: '#ff0000',
    strokeThickness: 2,
  });

  livesText = _scene.add.text(
    width * 0.25,
    height * 0.01,
    'SCIENTISTS LEFT:' + lives, {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ff0000',
      stroke: '#ff0000',
      strokeThickness: 2,
      },
  );

  savedText = _scene.add.text(width * 0.65, height * 0.01, 'SAVED: ' + saved, {
    fontFamily: 'Arial',
    fontSize: '18px',
    color: '#ff0000',
    stroke: '#ff0000',
    strokeThickness: 2,
  });

  killedText = _scene.add.text(width * 0.85, height * 0.01, 'LOST: ' + killed, {
    fontFamily: 'Arial',
    fontSize: '18px',
    color: '#ff0000',
    stroke: '#ff0000',
    strokeThickness: 2,
  });
}

function updateStats() {
  scoreText.setText('SCORE: ' + score);
  livesText.setText('SCIENTISTS: ' + lives);
  savedText.setText('SAVED: ' + saved );
  killedText.setText('LOST: ' + killed );
}

function spawnShark(sharkX, sharkXV){
  var sharkY = Phaser.Math.Between(height * SEA_LEVEL-20, height * SEA_LEVEL);
  var shark = _scene.add.sprite(
    sharkX,
    sharkY,
    'shark',
  );
  shark.xv = sharkXV;
  shark.setScale(0.3*-sharkXV,0.3);
  shark.spriteScale = .3;
  shark.setOrigin(0);
  sharks.add(shark);
}

function moveSharks() {
  sharks.getChildren().forEach((shark) => {
    scientists.getChildren().forEach(scientist => {
      if(collisionTest(scientist,shark))
      {
        killScientist(scientist);
        scientist.destroy();
      }
    });
    if (shark.x < 0 || shark.x > width) {
      shark.xv = -shark.xv;
      shark.flipX = !shark.flipX;
      shark.y = Phaser.Math.Between(height * SEA_LEVEL-20, height * SEA_LEVEL);
    }
    shark.x += shark.xv;
  });
}

function killScientist(scientist){
  for (var t = -10; t < 10; t+=.25) {
    var drop = _scene.add.sprite(scientist.x+t,scientist.y-1,'star');
    drop.yv=Phaser.Math.Between(-25, 10)/10;
    drop.xv = t*2;
    drop.setTint(blood);
    drop.life = 25;
    bloodDrops.add(drop);
    killed++;
  }
}
function Splash(scientist) {
  for (var t = -10; t < 10; t+=.25) {
    var drop = _scene.add.sprite(scientist.x+t,scientist.y,'star');
    drop.yv=-Phaser.Math.Between(25, 55)/10;
    drop.xv = t*3;
    waterDrops.add(drop);
  }
}

function Crash() {
  for (t = 1; t < 500; t++) {
    var x = player.x + Phaser.Math.Between(0,player.width);
    var y = player.y + Phaser.Math.Between(0, player.height);
    var centerX = player.x + player.width*.6;
    var centerY = player.y + player.height*.6;
    var drop = _scene.add.sprite(x,y-20,'star');
    drop.yv=(y-centerY)/2;//Phaser.Math.Between(centerY, y);
    drop.xv=(x-centerX)/5;//Phaser.Math.Between(centerX, x);
    drop.setScale(Phaser.Math.Between(1,5)/5);
    drop.setTint(Phaser.Math.Between(blood, yellow));
    drop.life = 55;
    particles.add(drop);
  }
  player.visible = false;
  gameEnding = true;
}

function ShowEnd(wonLost)
{
  infoText.y=200;
  infoText.x=200;
  infoText.visible = true;
  infoText.setText(wonLost ? GameOverTextWon : GameOverTextLost);
}

function ShowIntro() {
  infoText = _scene.add.text(60, 20, introText, {
    fontFamily: 'Arial',
    fontSize: '18px',
    fill: '#eeee00',
  });
}

function spawnScientist(){
  var scientist = _scene.add.sprite(
    Phaser.Math.Between(10, width-10),
    0,
    'scientist',
  );
  scientist.yv = 1;
  scientist.spriteScale =1;
  scientist.inWater = false;
  scientists.add(scientist);
  lives--;
}

function update() {
  if (!startGame) return;
  if (gameOver) return;
  if (Phaser.Math.Between(1, lives * 10) == 1)
     spawnScientist();
  if(lives==0)
  {
    gameOver= true;
    ShowEnd(saved==START_LIVES ? ShowEnd(true) : ShowEnd(false));
  }
  if (player.x > width) player.x = 0;
  if (player.x < 0) player.x = width;
  if (player.y < 0) player.y = 0;
  player.x += player.xv;
  player.y += player.yv;
  stars.getChildren().forEach((star) => {
    if(Phaser.Math.Between(1, 100)==1)
      star.setTint(Math.random() * 0xffffff);
  });

  if (player.y +player.height*.6> height * SEA_LEVEL && !gameEnding) 
    Crash();
  
  scientists.getChildren().forEach((scientist) => {
  scientist.y += scientist.yv;
  scientist.yv += 0.025;
  if (collisionTest(scientist,player)) {
    score += 100;
    saved ++;
    scientist.destroy();
}

  if (scientist.y > height * SEA_LEVEL) {
     if(!scientist.inWater) 
     {
      Splash(scientist);
      scientist.inWater = true;
     }
     else
     {
      scientist.yv =0;
     }
  }
  });
  moveSharks();
  if(waterDrops.children.entries.length>0)
    moveDrops();
  if(bloodDrops.children.entries.length>0)
    moveBloodDrops();
    if(gameEnding)
    {
    moveParticles();
  }
  savedPercent = Math.floor((saved / (START_LIVES - lives) * 100));
  updateStats();
}


function moveParticles(){
  particles.children.entries.forEach(drop => {
    drop.y+=drop.yv;
    drop.x+=drop.xv;
     if(drop.y<height*SEA_LEVEL)
       drop.yv+=.5;
    drop.life--;
    if(drop.life==0) {
    particles.kill(drop);  
    drop.destroy();
    }
  });
  if(particles.countActive()==0){
  gameOver = true;
  ShowEnd(false);  
  }
}


function moveBloodDrops(){
  bloodDrops.children.entries.forEach(drop => {
    drop.y+=drop.yv;
    drop.x+=drop.xv/20;
    if(drop.y<height*SEA_LEVEL)
      drop.yv+=.2;
    drop.life--;
    if(drop.life==0) 
      drop.destroy();    
  });
}

function moveDrops(){
  waterDrops.children.entries.forEach(drop => {
    drop.y+=drop.yv;
    drop.x+=drop.xv/20;
    drop.yv+=.2;
    if(drop.y>height*SEA_LEVEL) 
      drop.destroy();    
  });
}
function collisionTest(object1, object2) {
  const rect1 = {
    x: object1.x,
    y: object1.y,
    width: object1.width * object1.spriteScale,
    height: object1.height * object1.spriteScale,
  };
  const rect2 = {
    x: object2.x,
    y: object2.y,
    width: object2.width * object2.spriteScale,
    height: object2.height * object2.spriteScale,
  };
 //RECT(rect1.x, rect1.y, rect1.width, rect1.height, blood)
 //RECT(rect2.x, rect2.y, rect2.width, rect2.height, blood)
 
 if (
    rect1.x < rect2.x + rect2.width && 
    rect1.x + rect1.width > rect2.x && 
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y
  ) 
    return true;
  else
    return false;
} 

function LINE(x1, y1, x2, y2, color) {
  graphics.lineStyle(1, color, 1.0);
  graphics.beginPath();
  graphics.moveTo(x1, y1);
  graphics.lineTo(x2, y2);
  graphics.closePath();
  graphics.strokePath();
}

function RECT(x, y, w, h, color) {
  graphics.fillStyle(color, 1.0);
  graphics.fillRect(x, y, w, h);
}

function TRIANGLE(x0, y0, x1, y1, x2, y2, color) {
  graphics.fillStyle(color, 1.0);
  graphics.fillTriangle(x0, y0, x1, y1, x2, y2);
}


