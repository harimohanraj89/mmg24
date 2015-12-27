var SparksCollection = function() {
  this.fontSize = 96;
  this.showPrompt = true;
  this.alpha = 1;
  this.lastSparkId = 0;
  this.sparks = [];

  this.blocksCollection = new BlocksCollection();

  this.events();
}

SparksCollection.prototype.animate = function(ctx, dt) {
  this.alpha -= dt / 2000;

  if (this.alpha <= 0) {
    this.showPrompt = false;
  }

  if (this.showPrompt) {
    this.prompt(ctx);
  }

  for (var i = this.sparks.length - 1; i >= 0; i--) {
    this.sparks[i].animate(ctx, dt);
  }

  this.blocksCollection.animate(ctx, dt);

  this.detectCollisions();
};

SparksCollection.prototype.prompt = function(ctx) {
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, ' + Math.sqrt(this.alpha) + ')';
  ctx.font = this.fontSize + 'px Helvetica';
  this.fillCenteredText(ctx, "Click around to find", 0);
  this.fillCenteredText(ctx, "the hidden planets", 1);
  ctx.restore();
};

SparksCollection.prototype.fillCenteredText = function(ctx, text, line) {
  ctx.fillText(text, (ctx.canvas.width - ctx.measureText(text).width)/2, (line + 1) * this.fontSize * 1.2);
};

SparksCollection.prototype.click = function(event, manager) {
  var clientRect = manager.canvas.getBoundingClientRect();
  var x = (event.clientX - clientRect.left) * 2;
  var y = (event.clientY - clientRect.top) * 2;

  if (this.blocksCollection.blockAt(x, y)) {
    this.blocksCollection.blockAt(x, y).glow();
  } else {
    this.makeSparks(x, y, manager.canvas.height);
  }
};

SparksCollection.prototype.makeSparks = function(x, y, killHeight) {
  for (var i = 0; i < 5; i++) {
    this.lastSparkId++;
    this.sparks.push(
      new Spark({
        id: this.lastSparkId,
        x: x,
        y: y,
        vx: 1000 * Math.random() - 500,
        vy: 1000 * Math.random() - 500,
        killHeight: killHeight
      })
    );
  }
};

SparksCollection.prototype.events = function() {
  window.addEventListener('sparkDeath', function(event) {
    var sparkId = event.detail;
    for (var i = 0; i < this.sparks.length; i++) {
      if (this.sparks[i].id === sparkId) {
        this.sparks.splice(i, 1);
        break;
      }
    }
  }.bind(this));
};

SparksCollection.prototype.detectCollisions = function() {
  for (i in this.blocksCollection.blocks) {
    var block = this.blocksCollection.blocks[i];
    for (j in this.sparks) {
      var spark = this.sparks[j];
      if (this.overlapping(spark, block)) {
        this.bounceSpark(spark, block);
        block.pulse();
      }
    }
  }
};


SparksCollection.prototype.overlapping = function(spark, block) {
  return spark.x + spark.size > block.x && spark.x < block.x + block.size && spark.y + spark.size > block.y && spark.y < block.y + block.size
};

SparksCollection.prototype.bounceSpark = function(spark, block) {
  var dx = spark.x - block.x;
  var dy = spark.y - block.y;

  if (Math.abs(spark.vy/spark.vx) < Math.abs(dy/dx)) {
    if (spark.vx > 0) {
      spark.vx *= -1;
      spark.x = 2 * block.x - spark.x - spark.size;
    } else {
      spark.vx *= -1;
      spark.x = 2 * (block.x + block.size) - spark.x + spark.size;
    }
  } else {
    spark.vy *= -0.2;
    spark.y = 2 * block.y - spark.y - spark.size;
  }
};
