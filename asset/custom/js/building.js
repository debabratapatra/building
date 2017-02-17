/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var canvas = document.getElementById("building-canvas"),
    components = [];

window.onload = function() {
    var $canvas = $('#building-canvas'),
        canvas = document.getElementById("building-canvas");

    canvas.width = $canvas.width();
    canvas.height = $canvas.height();

    var ctx = canvas.getContext("2d"),
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

        components.forEach(function(component) {
            component.draw(ctx);
        });
    })();
};

var Building = (function() {

    function createRectangle() {
        components.push(new Rectangle(canvas));
    }

    return {
        createRectangle: createRectangle
    };
})();

Plane.prototype = new Template();
function Plane(canvas) {
    var me = this;

    this.x = 0;
    this.y = this.x;
    this.width = canvas.width;
    this.height = canvas.height;
    this.dragStart = function(mouse) {
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

Rectangle.prototype = new Template();
function Rectangle(canvas) {
    var strokeColour = 'blue';

    this.width = 300;
    this.height = 200;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height / 2 - this.height / 2;
    this.draw = function(ctx) {
        var prevFill = ctx.strokeStyle;
        
        ctx.beginPath();
        ctx.strokeStyle = strokeColour;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.strokeStyle = prevFill;
        ctx.closePath();
    };
    this.dragStart = function(mouse) {
        this.startX = mouse.x;
        this.startY = mouse.y;
    };
    this.dragging = function(mouse) {
        this.x += mouse.x - this.startX;
        this.y += mouse.y - this.startY;
        this.startX = mouse.x;
        this.startY = mouse.y;
    };
    this.dragEnd = function(mouse) {

    };

    this.hitTest = function(ctx, mouse) {
        var x = mouse.x,
            y = mouse.y;
        return (x > this.x && x < (this.x + this.width)
                && y > this.y && y < (this.y + this.height));
    };
}