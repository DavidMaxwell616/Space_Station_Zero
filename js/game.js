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
  drops =  _scene.add.group();

  //player
  player = _scene.add.sprite(width / 2, height / 2, 'ship');
  player.setScale(0.6);
  player.xv = 0;
  player.yv = 0;
  _scene.input.keyboard.on('keydown_LEFT', function (event) {
    player.xv--;
  });
  player.setOrigin(0, 0);
  _scene.input.keyboard.on('keydown_RIGHT', function (event) {
    player.xv++;
  });

  _scene.input.keyboard.on('keydown_UP', function (event) {
    player.yv--;
  });
  _scene.input.keyboard.on('keydown_DOWN', function (event) {
    player.yv++;
  });

  sharks = _scene.add.group();
  scientists = _scene.add.group();
  
  var scientist = _scene.add.sprite(
    Phaser.Math.Between(10, 800),
    0,
    'scientist',
  );
  scientist.yv = 0;
  scientists.add(scientist);

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
    width * 0.35,
    height * 0.01,
    'SCIENTISTS LEFT:' + lives, {
      fontFamily: 'Arial',
      fontSize: '18px',
      color: '#ff0000',
      stroke: '#ff0000',
      strokeThickness: 2,
      },
  );

  savedText = _scene.add.text(width * 0.75, height * 0.01, 'SAVED: ' + saved, {
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
  savedText.setText('SAVED: ' + saved);
}

function spawnShark(sharkX, sharkXV){
  var sharkY = Phaser.Math.Between(height * SEA_LEVEL, height * 0.95);
  var shark = _scene.add.sprite(
    sharkX,
    sharkY,
    'shark',
  );
  shark.xv = sharkXV;
  shark.setScale(0.3*-sharkXV);
  sharks.add(shark);
}

function moveSharks() {
  sharks.getChildren().forEach((shark) => {
    scientists.getChildren().forEach(scientist => {
      if(collisionTest(scientist,shark))
      {
        console.log('shark ate scientist')
        scientist.destroy();
      }
    });
       if (shark.x < 0 || shark.x > width) {
      shark.xv = -shark.xv;
      shark.flipX = !shark.flipX;
    }
    shark.x += shark.xv;
  });
}

function Splash(scientist) {
  for (t = -20; t < 20; t++) {
    var drop = _scene.add.sprite(scientist.x+t,scientist.y,'star');
    drop.yv=-5;
    drop.xv = t;
    drop.life = 50;
    drops.add(drop);
  }
}

function Crash() {
  for (t = 1; t < 200; t++) {
    var rx = player.x + Phaser.Math.Between(-100, 100);
    var ry = player.y + Phaser.Math.Between(-100, 100);
    LINE(rx, ry, player.x, player.y, 0xff0000);
    player.visible = false;
  }
  sh = sh - 1;
  if (sh == 0) ShowEnd();
}

function ShowEnd()
{
  infoText.y=200;
  infoText.x=200;
  infoText.visible = true;
  infoText.setText(GameOverText);
}

function ShowIntro() {
  infoText = _scene.add.text(60, 20, introText, {
    fontFamily: 'Arial',
    fontSize: '18px',
    fill: '#eeee00',
  });
}

function update() {
  if (!startGame) return;
  if (Phaser.Math.Between(1, 200) == 100) {
    var scientist = _scene.add.sprite(
      Phaser.Math.Between(10, 800),
      0,
      'scientist',
    );
    scientist.yv = 0;
    scientist.inWater = false;
    scientists.add(scientist);
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

  if (player.y > height * SEA_LEVEL) Crash();
  scientists.getChildren().forEach((scientist) => {
    scientist.y += scientist.yv;
    scientist.yv += 0.025;
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
    if (collisionTest(scientist,player)) {
      score += 100;
      scientistsSaved++;
      scientist.destroy();
    }
  });
  moveSharks();
  if(drops.children.entries.length>0)
    moveDrops();
  updateStats();
  saved = scientistsKilled === 0 ? '0%' : (scientistsKilled / scientistsSaved * 100) + '%';
}

function moveDrops(){
  drops.children.entries.forEach(drop => {
    drop.y+=drop.yv;
    drop.x+=drop.xv/20;
    drop.yv+=.2;
    drop.life--;
    if (drop.life==0)
      drop.destroy();    
  });
}
function collisionTest(object1, object2) {
  const rect1 = {
    x: object1.x - object1.width / 2,
    y: object1.y + object1.height / 2,
    width: object1.width,
    height: object1.height,
  };
  const rect2 = {
    x: object2.x - object2.width / 2,
    y: object2.y + object2.height / 2,
    width: object2.width,
    height: object2.height,
  };

  if (
    rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y > rect2.y - rect1.height
  ) {
    return true;
  }
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


