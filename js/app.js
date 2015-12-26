window.GRAVITY = 2000;

window.onload = function() {
  new Manager({
    canvas: document.getElementById('canvas'),
    states: [
      new Introduction(),
      new SparksCollection()
    ]
  }).animate();
}
