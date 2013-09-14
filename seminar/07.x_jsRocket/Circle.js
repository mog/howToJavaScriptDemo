var Circle = (function() {
   
   "use strict";

    function clear(time){
        context.fillStyle = 'rgba('+ Math.round(syncDevice.getTrack('circBG:R').getValue(time)) +','+
                            Math.round(syncDevice.getTrack('circBG:G').getValue(time)) +','+
                            Math.round(syncDevice.getTrack('circBG:B').getValue(time)) +','+
                            Math.round(syncDevice.getTrack('circBG:A').getValue(time)) +')';
        context.fillRect(0, 0, width, height);
    }
    
    function render(time){
        
        clear(time);
        
        var diameter = syncDevice.getTrack('circ:diameter').getValue(time);
        context.fillStyle = 'rgba('+ Math.round(syncDevice.getTrack('circ:R').getValue(time)) +','+
            Math.round(syncDevice.getTrack('circ:G').getValue(time)) +','+
            Math.round(syncDevice.getTrack('circ:B').getValue(time)) +','+
            Math.round(syncDevice.getTrack('circ:A').getValue(time)) +')';
        context.beginPath();
        context.arc(width / 2, height / 2, diameter, 0, 2 * Math.PI, false);
        context.fill();
        context.closePath();
    }

    return {
        render:render
    };
})();