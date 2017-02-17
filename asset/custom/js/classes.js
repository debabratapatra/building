

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
    var strokeColour = 'rgb(0, 140, 255)';

    this.width = 300;
    this.height = 200;
    this.x = canvas.width / 2 - this.width / 2;
    this.y = canvas.height / 2 - this.height / 2;
    this.draw = function(ctx) {
        var prevStroke = ctx.strokeStyle;
        
        ctx.beginPath();
        ctx.strokeStyle = strokeColour;
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.strokeStyle = prevStroke;
        ctx.closePath();
    };
    this.dragStart = function(mouse) {
        this.startX = mouse.x;
        this.startY = mouse.y;
        Building.moveResizableBar(this);
    };
    this.dragging = function(mouse) {
        this.x += mouse.x - this.startX;
        this.y += mouse.y - this.startY;
        this.startX = mouse.x;
        this.startY = mouse.y;
        Building.moveResizableBar(this);
    };
    this.dragEnd = function() {

    };

    this.hitTest = function(ctx, mouse) {
        var x = mouse.x,
            y = mouse.y;
        return (x > this.x && x < (this.x + this.width) && y > this.y && y < (this.y + this.height));
    };
}

HorizontalBar.prototype = new Template();
function HorizontalBar() {
    var strokeColour = 'rgba(0, 5, 123, 1)';
    
    this.active = false;
    this.draw = function(ctx) {
        var prevStroke = ctx.strokeStyle,
            prevLineWidth = ctx.lineWidth;
        
        ctx.beginPath();
        ctx.strokeStyle = strokeColour;
        ctx.lineWidth = 2;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + this.width, this.y);
        ctx.stroke();
        ctx.strokeStyle = prevStroke;
        ctx.lineWidth = prevLineWidth;
        ctx.closePath();
    };
}

VerticalBar.prototype = new Template();
function VerticalBar() {
    var strokeColour = 'rgba(0, 5, 123, 1)';
    
    this.active = false;
    this.draw = function(ctx) {
        var prevStroke = ctx.strokeStyle,
            prevLineWidth = ctx.lineWidth;
        
        ctx.beginPath();
        ctx.strokeStyle = strokeColour;
        ctx.lineWidth = 2;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.stroke();
        ctx.strokeStyle = prevStroke;
        ctx.lineWidth = prevLineWidth;
        ctx.closePath();
    };
}