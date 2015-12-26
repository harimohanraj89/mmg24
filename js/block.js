var Block = function(params) {
  this.size = params.size;
  this.x = params.x;
  this.y = params.y;
  this.heat = 0;
  this.minHeat = 0;
}

Block.prototype.animate = function(ctx, dt) {
  ctx.save();
  ctx.fillStyle = 'hsla(0, 80%, ' + Math.round(90*Math.sqrt(this.heat)) + '%, ' + (this.heat) + ')';
  ctx.fillRect(this.x, this.y, this.size, this.size);
  ctx.restore();

  this.heat = Math.max(this.heat - dt/1000, this.minHeat)
}

Block.prototype.pulse = function(ctx, dt) {
  if (this.heat === this.minHeat) {
    this.heat = 1;
  }
}

Block.prototype.glow = function(ctx, dt) {
  this.heat = 1;
  this.minHeat = 0.8
}
