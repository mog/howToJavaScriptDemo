var canvas = document.getElementById('pew'),
    width = 1920 / 4,
    height = 1080 / 4,
    context = canvas.getContext("2d");


canvas.width = width;
canvas.height = height;

var tune = new Tune();
tune.create("alpha_c_-_euh.");
tune.play();

SceneList.add(Circle, 0, 2);
SceneList.add(Rectangle, 2, 4);
SceneList.add(Circle, 4, 6);

render();

function render(){

    var timePosition = tune.position;

    SceneList.render(timePosition);

    window.requestAnimationFrame(render);
}