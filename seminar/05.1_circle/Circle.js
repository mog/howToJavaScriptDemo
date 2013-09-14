var Circle = (function() {
   
   "use strict";

    function clear(){
        context.fillStyle = '#f01';
        context.fillRect(0, 0, width, height);
    }
    
    function render(time){
        
        clear();
        
        var d = 50 + (Math.sin(time) * 50);
        context.fillStyle = '#000';
        context.beginPath();
        context.arc(width / 2, height / 2, d, 0, 2 * Math.PI, false);
        context.fill();
        context.closePath();
    }

    return {
        render:render
    };
})();