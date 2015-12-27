var Manager = function(params) {
  this.index = 0;
  this.canvas = params.canvas;
  this.states = params.states;
  this.context = this.canvas.getContext('2d');
  this.events();
}

Manager.prototype.events = function() {
  this.canvas.addEventListener('click', function(event) {
    this.currentState().click(event, this);
  }.bind(this))
};

Manager.prototype.currentState = function() {
  return this.states[this.index];
};

Manager.prototype.animate = function(t) {
  if (t) {
    if (this.t) {
      var dt = t - this.t;
      this.t = t;
    } else {
      var dt = 0;
      this.t = t;
    }
  }
  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  this.currentState().animate(this.context, dt);
  requestAnimationFrame(this.animate.bind(this));
};

Manager.prototype.nextState = function() {
  this.index = Math.min(this.index + 1, this.states.length - 1);
};
