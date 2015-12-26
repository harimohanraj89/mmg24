var Block = function(params) {
  this.size = params.size;
  this.x = params.x;
  this.y = params.y;
  this.heat = 0;
}

Block.prototype.animate = function(ctx, dt) {
  ctx.save();
  ctx.fillStyle = '#777';
  ctx.fillRect(this.x, this.y, this.size, this.size);
  ctx.restore();
}

Block.prototype.pulse = function(ctx, dt) {
}

Block.prototype.glow = function(ctx, dt) {
}
