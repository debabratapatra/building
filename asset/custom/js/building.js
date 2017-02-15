/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


window.onload = function() {
    var canvas = document.getElementById("building-canvas"),
        $canvas = $('#building-canvas');

    canvas.width = $canvas.width();
    canvas.height = $canvas.height();

    var ctx = canvas.getContext("2d"),
        components = [],
        plane = new Plane(canvas),
        mouse = {
            x: canvas.width / 2, //Initial position
            y: canvas.height / 2
        };

    components.push(plane);

    listenEvents(canvas, ctx, mouse, components);

    (function draw() {
        window.requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        plane.draw(ctx);
    })();
};

function Plane(canvas) {
    var me = this;

    this.x = 0;
    this.y = this.x;
    this.width = canvas.width;
    this.height = canvas.height;
    this.dragStart = function(mouse) {
        //alert(mouse.x);
    };

    this.draw = function(ctx) {
    };

    this.hitTest = function(ctx, mouse) {
        var x = mouse.x,
            y = mouse.y;
        return (x > this.x && x < (this.x + this.width)
                && y > this.y && y < (this.y + this.height));
    };
}

function Striker(board, components) {
    var wrapperX = board.x + 20,
        wrapperY = board.y + board.height + 20,
        wrapperWidth = 200,
        wrapperHeight = 50,
        fillColor = '#FFAA00',
        originalWidth = wrapperWidth - 40;

    this.height = 8;
    this.x = wrapperX + 20;
    this.y = wrapperY + wrapperHeight / 2;
    this.width = originalWidth;
    this.draw = function(ctx) {
        ctx.strokeRect(wrapperX, wrapperY, wrapperWidth, wrapperHeight);

        var prevFill = ctx.strokeStyle,
            prevLine = ctx.lineWidth;
        ctx.lineCap = 'round';
        ctx.lineWidth = this.height;
        ctx.strokeStyle = fillColor;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.stroke();
        ctx.strokeStyle = prevFill;
        ctx.lineWidth = prevLine;
    };
    this.dragStart = function(mouse) {
        this.startX = mouse.x;
    };
    this.dragging = function(mouse) {
        var width = this.startX - mouse.x;
        if(width > originalWidth)
            width = originalWidth;
        if(width > 0) {
            this.width = originalWidth - width;
            components.cueStick.pullBack(width);
        }

    };
    this.dragEnd = function(mouse) {
        if(this.width < originalWidth && this.width >= 0) {
            components.cueStick.reset();
        }
        this.width = originalWidth;
    };

    this.hitTest = function(ctx, mouse) {
        var x = mouse.x,
            y = mouse.y,
            hitY = this.y - this.height / 2;
        return (x > this.x && x < this.x + this.width && y > hitY && y < hitY + this.height)
    };
}