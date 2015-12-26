var Spark = function(params) {
  this.id = params.id;
  this.x = params.x;
  this.y = params.y;
  this.lifetime = 3000;
  this.killHeight = params.killHeight;

  this.heat = 1;
  this.vx = params.vx || 0;
  this.vy = params.vy || 0;
}

Spark.prototype.animate = function(ctx, dt) {
  this.verlet(dt);
  this.draw(ctx);
  this.checkDeath();
}

Spark.prototype.verlet = function(dt) {
  this.lastx = this.x;
  this.lasty = this.y;

  this.vy += dt/1000 * GRAVITY/2;
  this.x += this.vx * dt/1000;
  this.y += this.vy * dt/1000;
  this.vy += dt/1000 * GRAVITY/2;

  this.lifetime -= dt;
  this.heat = this.lifetime/3000;
}

Spark.prototype.checkDeath = function(dt) {
  if (this.y > this.killHeight) {
    this.die();
  }

  if (this.lifetime <= 0) {
    this.die();
  }
}

Spark.prototype.die = function(ctx) {
  var sparkDeath = new CustomEvent('sparkDeath', { 'detail': this.id });
  dispatchEvent(sparkDeath);
}

Spark.prototype.draw = function(ctx) {
  ctx.save();
  ctx.fillStyle = 'hsl(50, 100%, ' + Math.round(40 + 60*this.heat) + '%)';
  ctx.fillRect(this.x, this.y, 10, 10);
  ctx.restore();
}
