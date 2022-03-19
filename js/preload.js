function preload() {

  this.load.path = '../assets/images/';
  this.load.image('shark', 'shark.png');
  this.load.image('star', 'star.png');
  this.load.image('bomb', 'bomb.png');
  this.load.image('maxxdaddy', 'maxxdaddy.gif');
  this.load.image('ship', 'ship.png');
  this.load.spritesheet(
    'scientist',
    'scientist.png', {
      frameWidth: 11,
      frameHeight: 23
    }
  );


}