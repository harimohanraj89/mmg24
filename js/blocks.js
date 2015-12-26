var BlocksCollection = function() {
  this.blockSize = 60;
  this.structure = [
    [1,0,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,0,1,0,0,0,1,1,1,0,1,1,0,0,1,1,1,0,1,0,1],
    [1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,1,0,1],
    [1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,1,1,1,0,0,0,1,1,1,0,1,0,1,0,1,1,1,0,1,1,1],
    [1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,1,0,1,0,1,0,1,0,1,0,1,0,0,1,0],
    [1,0,1,0,1,0,1,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,1,1,1,0,1,1,0,0,1,0,1,0,0,1,0]
  ]
  this.blocks = [];
  this.init();
  this.events();
}

BlocksCollection.prototype.animate = function(ctx, dt) {
  for (var i = this.blocks.length - 1; i >= 0; i--) {
    this.blocks[i].animate(ctx, dt);
  }
};

BlocksCollection.prototype.init = function() {
  var offsetX = 490;
  var offsetY = 800;
  for (var row = 0; row < this.structure.length; row++) {
    var blocks = this.structure[row]
    for (var col = 0; col < blocks.length; col++) {
      if (blocks[col]) {
        this.blocks.push(
          new Block({
            x: this.blockSize * col + offsetX,
            y: this.blockSize * row + offsetY,
            size: this.blockSize
          })
        );
      }
    }
  }
}

BlocksCollection.prototype.events = function() {

};
