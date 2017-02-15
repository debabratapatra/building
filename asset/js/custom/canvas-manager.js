/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        function (callback) {
          return window.setTimeout(callback, 17 /*~ 1000/60*/);
        }
    );
}

function listenEvents(canvas, ctx, mouse, comps) {
    var offsetLeft = 0,
        offsetTop = 0,
        canvasClone = canvas;

    //Find the canvas left and top offeset
    do {
        offsetLeft += canvasClone.offsetLeft;
        offsetTop += canvasClone.offsetTop;
    } while (canvasClone = canvasClone.offsetParent);

    //Get relative mouse position of Canvas
    function updateMouseXY(e) {
        mouse.x = e.pageX - offsetLeft;
        mouse.y = e.pageY - offsetTop;
    };

    canvas.addEventListener('mousedown', function(e) {
        updateMouseXY(e);
        for(var i = 0; i < comps.length; i++) {
            if(comps[i].hitTest(ctx, mouse)) {
                comps[i].dragStart(mouse);
                comps[i].drag = true;
            }
        }
    });
    canvas.addEventListener('mousemove', function(e) {
        updateMouseXY(e);
        canvas.style.cursor = 'default';
        for(var i = 0; i < comps.length; i++) {
            if(comps[i].hitTest(ctx, mouse)) {
                canvas.style.cursor = 'pointer';
            }
            if(comps[i].drag) {
                comps[i].dragging(mouse);
            }
        }
    });
    document.addEventListener('mouseup', function(e) {
        for(var i = 0; i < comps.length; i++) {
            if(comps[i].drag) {
                comps[i].dragEnd();
                comps[i].drag = false;
            }
        }
    });
}
CanvasRenderingContext2D.prototype.dottedLine = function(x1, y1, x2, y2, dotLen) {

        this.beginPath();
        this.moveTo(x1, y1);

        var dX = x2 - x1;
        var dY = y2 - y1;
        var dots = Math.floor(Math.sqrt(dX * dX + dY * dY) / dotLen);
        var dotX = dX / dots;
        var dotY = dY / dots;

        var q = 0;
        while (q++ < dots) {
         x1 += dotX;
         y1 += dotY;
         this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x1, y1);
        }
        this[q % 2 == 0 ? 'moveTo' : 'lineTo'](x2, y2);

        this.stroke();
        this.closePath();
};
