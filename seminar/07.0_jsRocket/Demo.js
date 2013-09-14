var canvas = document.getElementById('pew'),
    context = canvas.getContext("2d"),
    width = 1920 / 4,
    height = 1080 / 4,
    tune,
    frameRequest,
    sceneIndex = 0,
    sceneList = [];

function init(){
    canvas.width = width;
    canvas.height = height;

    sceneList = [Rectangle, Circle];
}

function initAudio(){
    tune = new Tune();
    tune.on("play", onAudioStart);
    tune.create("alpha_c_-_euh.");
    tune.play();
}

function onAudioStart(){
    render();
}

function render(){

    var timePosition = tune.position;
    frameRequest = window.requestAnimationFrame(render);

    sceneList[sceneIndex].render(timePosition);
}