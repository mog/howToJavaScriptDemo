var canvas = document.getElementById('pew'),
    width = 1920 / 4,
    height = 1080 / 4,
    context = canvas.getContext("2d");

canvas.width = width;
canvas.height = height;

var tune = new Tune();
tune.create("alpha_c_-_euh.");
tune.play();

var sceneIndex = 0,
    sceneList = [Rectangle, Circle];

render();

function render(){

    var timePosition = tune.position;

    sceneList[sceneIndex].render(timePosition);

    window.requestAnimationFrame(render);
}