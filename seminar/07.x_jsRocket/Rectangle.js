var Rectangle = (function() {

    function clear(time){
        context.fillStyle = 'rgba('+ Math.round(syncDevice.getTrack('rectBG:R').getValue(time)) +','+
                    Math.round(syncDevice.getTrack('rectBG:G').getValue(time)) +','+
                    Math.round(syncDevice.getTrack('rectBG:B').getValue(time)) +','+
                    Math.round(syncDevice.getTrack('rectBG:A').getValue(time)) +')';
        context.fillRect(0, 0, width, height);
    }

    function render(time) {
        clear(time);

        var diameter = syncDevice.getTrack('rect:diameter').getValue(time);
        context.fillStyle = 'rgba('+ Math.round(syncDevice.getTrack('rect:R').getValue(time)) +','+
            Math.round(syncDevice.getTrack('rect:G').getValue(time)) +','+
            Math.round(syncDevice.getTrack('rect:B').getValue(time)) +','+
            Math.round(syncDevice.getTrack('rect:A').getValue(time)) +')';
        context.fillRect((width - diameter) / 2, (height - diameter) / 2, diameter, diameter);
    }

    return {
        render:render
    }
})();