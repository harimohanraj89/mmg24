var Sparks = function() {
  this.fontSize = 96;
  this.showPrompt = true;
  this.alpha = 1;
  this.lastSparkId = 0;
  this.sparks = [];

  this.blocks = new Blocks();

  this.events();
}

Sparks.prototype.animate = function(ctx, dt) {
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

  this.blocks.animate(ctx, dt);
};

Sparks.prototype.prompt = function(ctx) {
  ctx.save();
  ctx.fillStyle = 'rgba(255, 255, 255, ' + Math.sqrt(this.alpha) + ')';
  ctx.font = this.fontSize + 'px Helvetica';
  this.fillCenteredText(ctx, "Click around to find", 0);
  this.fillCenteredText(ctx, "the hidden planets", 1);
  ctx.restore();
};

Sparks.prototype.fillCenteredText = function(ctx, text, line) {
  ctx.fillText(text, (ctx.canvas.width - ctx.measureText(text).width)/2, (line + 1) * this.fontSize * 1.2);
};

Sparks.prototype.click = function(event, manager) {
  var clientRect = manager.canvas.getBoundingClientRect();
  var x = (event.clientX - clientRect.left) * 2;
  var y = (event.clientY - clientRect.top) * 2;
  this.makeSparks(x, y, manager.canvas.height);
};

Sparks.prototype.makeSparks = function(x, y, killHeight) {
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

Sparks.prototype.events = function() {
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
