var canvas = document.getElementById("pew"),
    context = canvas.getContext("2d"),
    width = 1920 / 4,
    height = 1080 / 4,
    tune,
    syncDevice = new JSRocket.SyncDevice(),
    row,
    frameRequest,
    BPM = 147,
    ROWS_PER_BEAT = 8,
    ROW_RATE = BPM / 60 * ROWS_PER_BEAT,
    isDemoMode = false;

var activeSceneTrack,
    sceneList = [Rectangle, Circle];

function init(){
    //init jsRocket
    if(isDemoMode) {
        syncDevice.setConfig({"rocketXML":"rectangularRocket.rocket"});
        syncDevice.init("demo");
    } else {
        syncDevice.init();
    }

    syncDevice.on('ready', onSyncReady);
    syncDevice.on('update', onSyncUpdate);
    syncDevice.on('play', onPlay);
    syncDevice.on('pause', onPause);

    //set up scene
    canvas.width = width;
    canvas.height = height;
}

function initAudio(){
    //set up audio
    tune = new Tune();
    tune.on("play", onAudioStart);
    tune.volume = 0.9;
    tune.create('alpha_c_-_euh.');
}

function onSyncReady(){
    initAudio();

    activeSceneTrack = syncDevice.getTrack('scene');

    if(isDemoMode){

        tune.play();

        render();
    }
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
        //no rowUpdate from rocket, let's calc the row
        row = tune.position * ROW_RATE;

        frameRequest = window.requestAnimationFrame(render);
        syncDevice.update(row);
    }
    
    var sceneIndex = activeSceneTrack.getValue(row) || 0;

    sceneList[sceneIndex].render(row);
}

init();
