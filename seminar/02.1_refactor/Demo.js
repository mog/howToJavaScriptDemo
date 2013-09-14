var canvas = document.getElementById('pew'),
    width = 1920 / 4,
    height = 1080 / 4,
    context = canvas.getContext("2d");

canvas.width = width;
canvas.height = height;

Rectangle.render();