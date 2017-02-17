/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var canvas = document.getElementById("building-canvas"),
    components = [],
    leftHorizontalBar, rightHorizontalBar, leftVerticalBar, rightVerticalBar;

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
    
    leftHorizontalBar = new HorizontalBar();    
    components.push(leftHorizontalBar);
    rightHorizontalBar = new HorizontalBar();    
    components.push(rightHorizontalBar);

    leftVerticalBar = new VerticalBar();    
    components.push(leftVerticalBar);
    
    rightVerticalBar = new VerticalBar();    
    components.push(rightVerticalBar);
    
    listenEvents(canvas, ctx, mouse, components);

    (function draw() {
        window.requestAnimationFrame(draw);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        components.forEach(function(component) {
            component.active && component.draw(ctx);
        });
    })();
};

var Building = (function() {

    function createRectangle() {
        components.push(new Rectangle(canvas));
    }
    
    function moveResizableBar(rectangle) {
        leftHorizontalBar.active = true;
        leftHorizontalBar.x = rectangle.x;
        leftHorizontalBar.y = rectangle.y;
        leftHorizontalBar.width = rectangle.width;
        
        rightHorizontalBar.active = true;
        rightHorizontalBar.x = rectangle.x;
        rightHorizontalBar.y = rectangle.y + rectangle.height;
        rightHorizontalBar.width = rectangle.width;
        
        leftVerticalBar.active = true;
        leftVerticalBar.x = rectangle.x;
        leftVerticalBar.y = rectangle.y;
        leftVerticalBar.height = rectangle.height;
        
        rightVerticalBar.active = true;
        rightVerticalBar.x = rectangle.x + rectangle.width;
        rightVerticalBar.y = rectangle.y;
        rightVerticalBar.height = rectangle.height;
    }

    return {
        createRectangle: createRectangle,
        moveResizableBar: moveResizableBar
    };
})();