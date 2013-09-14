var SceneList = (function() {

    var _sceneList = [];

    function add(sceneName, startTime, endTime){
        _sceneList.push({
            "scene":sceneName,
            "startTime":startTime,
            "endTime":endTime
        });

        //sort on startTime
    }

    function render(time){
        for(var i = 0; i < _sceneList.length; i++){
            if((_sceneList[i].startTime >= time) && !(_sceneList[i].endTime <= time)){
                _sceneList[i].scene.render(time);
            }
        }
    }

    return {
        add:add,
        render:render
    };
})();