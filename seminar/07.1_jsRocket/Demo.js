var canvas = document.getElementById('pew'),
    context = canvas.getContext("2d"),
    width = 1920 / 4,
    height = 1080 / 4,
    tune,
    frameRequest,
    sceneIndex = 0,
    sceneList = [],
    row,
    BPM = 147,
    ROWS_PER_BEAT = 8,
    ROW_RATE = BPM / 60 * ROWS_PER_BEAT;

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

    var timePosition = tune.position; //*ROW_RATE;
    frameRequest = window.requestAnimationFrame(render);

    sceneList[sceneIndex].render(timePosition);
}