var s;
var scl = 20;
var food;
var score = 0;

function setup() {
  createCanvas(600, 600);
  s = new Snake();
  frameRate(8);
  pickLocation();
}

function pickLocation() {
  var cols = floor(width / scl);
  var rows = floor(height / scl);
  food = createVector(floor(random(cols)), floor(random(rows)));
  food.mult(scl);
}

function draw() {
  background(50);
  s.update();
  s.show();

  if (s.eat(food)) {
    pickLocation();
    score++;
  }

  fill(255, 0, 50);
  rect(food.x, food.y, scl, scl);

  if (s.death()) {
    background(100, 0, 0, 200);
    textSize(50);
    fill(color(200));
    text("GAME OVER", width / 2 - 150, height / 2);
    noLoop();
    statusBar();
  } else {
    fill(color(200));
    statusBar();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    s.dir(0, -1);
  } else if (keyCode === DOWN_ARROW) {
    s.dir(0, 1);
  } else if (keyCode === RIGHT_ARROW) {
    s.dir(1, 0);
  } else if (keyCode === LEFT_ARROW) {
    s.dir(-1, 0);
  }
}
function statusBar() {
  strokeWeight(0);
  textSize(20);
  textStyle(BOLD);
  text(`Skóre: ${score}`, 10, height - 575);
}
function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  canvas.position(x, y);
}

function Snake() {
  this.x = width / 2;
  this.y = height / 2;
  this.xspeed = 1;
  this.yspeed = 0;
  this.total = 0;
  this.tail = [];

  this.dir = function (x, y) {
    this.xspeed = x;
    this.yspeed = y;
  };

  this.eat = function (pos) {
    var d = dist(this.x, this.y, pos.x, pos.y);
    if (d < 1) {
      this.total++;
      return true;
    } else {
      return false;
    }
  };

  this.death = function () {
    if (this.x >= width || this.x < 0 || this.y >= height || this.y < 0) {
      return true;
    }
    for (var i = 0; i < this.tail.length; i++) {
      var pos = this.tail[i];
      var d = dist(this.x, this.y, pos.x, pos.y);
      if (d < 1) {
        return true;
      }
    }
    return false;
  };

  this.update = function () {
    if (this.total === this.tail.length) {
      for (var i = 0; i < this.tail.length - 1; i++) {
        this.tail[i] = this.tail[i + 1];
      }
    }
    this.tail[this.total - 1] = createVector(this.x, this.y);

    this.x = this.x + this.xspeed * scl;
    this.y = this.y + this.yspeed * scl;
  };

  this.show = function () {
    fill(255);
    for (var i = 0; i < this.tail.length; i++) {
      rect(this.tail[i].x, this.tail[i].y, scl, scl);
    }
    rect(this.x, this.y, scl, scl);
  };
}
