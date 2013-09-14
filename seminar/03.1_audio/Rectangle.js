var Rectangle = (function() {

    function clear(){
        context.fillStyle = '#333';
        context.fillRect(0, 0, width, height);
    }

    function render() {
        clear();

        var diameter = 50 + Math.sin(Date.now() / 100) * 30;
        context.fillStyle = '#ff3700';
        context.fillRect((width - diameter) / 2, (height - diameter) / 2, diameter, diameter);
    }

    return {
        render:render
    }
})();