var Introduction = function() {
  this.fontSize = 96;
}

Introduction.prototype.animate = function(ctx) {
  ctx.save();
  ctx.fillStyle = 'white';
  ctx.font = this.fontSize + 'px Helvetica';
  this.fillCenteredText(ctx, "The universe is a very dark space,", 0);
  this.fillCenteredText(ctx, "But a little light makes it swell.", 1);
  this.fillCenteredText(ctx, "Today, the earth is in the same place,", 2);
  this.fillCenteredText(ctx, "as when, upon it, you began to dwell.", 3);
  this.fillCenteredText(ctx, "Click to continue...", 5);
  ctx.restore();
}

Introduction.prototype.click = function(event, manager) {
  manager.nextState();
}

Introduction.prototype.fillCenteredText = function(ctx, text, line) {
  ctx.fillText(text, (ctx.canvas.width - ctx.measureText(text).width)/2, (line + 1) * this.fontSize * 1.2);
}
