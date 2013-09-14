var canvas = document.getElementById('pew'),
    width = 1920 / 4,
    height = 1080 / 4,
    context = canvas.getContext("2d");

canvas.width = width;
canvas.height = height;

var tune = new Tune();
tune.create("alpha_c_-_euh.");
tune.play();

render();

function render(){

    var timePosition = tune.position;

    if(timePosition < 3)
        Rectangle.render(timePosition);
    if(timePosition >= 3 && timePosition <= 5)
        Circle.render(timePosition);
    else
        Rectangle.render(timePosition);

    window.requestAnimationFrame(render);
}