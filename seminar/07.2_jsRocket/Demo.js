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
    ROW_RATE = BPM / 60 * ROWS_PER_BEAT,
    syncDevice = new JSRocket.SyncDevice();

function init(){
    syncDevice.init();

    syncDevice.on('ready', onSyncReady);
    syncDevice.on('update', onSyncUpdate);
    syncDevice.on('play', onPlay);
    syncDevice.on('pause', onPause);

    canvas.width = width;
    canvas.height = height;

    sceneList = [Rectangle, Circle];
}

function onSyncReady(){
    initAudio();

    //activeSceneTrack = syncDevice.getTrack('scene');
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

function onSyncUpdate(newRow){

    if(!isNaN(newRow)){
        row = newRow;
        tune.position = row / ROW_RATE;
    }

    render();
}

function onPlay(){
    tune.position = row / ROW_RATE;

    tune.play();

    render();
}

function onPause(){
    tune.pause();

    tune.position = row / ROW_RATE;

    if(frameRequest)
        window.cancelAnimationFrame(frameRequest);
}

function render(){

    if(!tune.isPaused) {
        row = tune.position * ROW_RATE;
        frameRequest = window.requestAnimationFrame(render);
        syncDevice.update(row);
    }

    sceneList[sceneIndex].render(row);
}