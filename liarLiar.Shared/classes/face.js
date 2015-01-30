(function(global) {
    'use strict';

    function Face() {
        this.centerX = 1 / 2;
        this.centerY = 1 / 2;
        this.x = 0;
        this.y = 0;
        this.width = 1;
        this.height = 1;
    }

    Face.prototype.avg = function(betta, face, width, height) {
        this.centerX = (1.0 - betta) * this.centerX + betta * (face.x + face.width / 2) / width / face.scaleX;
        this.centerY = (1.0 - betta) * this.centerY + betta * (face.y + face.height / 2) / height / face.scaleY;
        this.x = (1.0 - betta) * this.x + betta * face.x / width / face.scaleX;
        this.y = (1.0 - betta) * this.y + betta * face.y / height / face.scaleY;
        this.width = (1.0 - betta) * this.width + betta * face.width / width / face.scaleX;
        this.height = (1.0 - betta) * this.height + betta * face.height / height / face.scaleY;
        return this;
    };

    Face.prototype.draw = function(ctx, width, height) {
        ctx.strokeStyle = "red";
        ctx.beginPath();
        ctx.moveTo(0, this.y * height);
        ctx.lineTo(width, this.y * height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.x * width, 0);
        ctx.lineTo(this.x * width, height);
        ctx.stroke();

        ctx.strokeStyle = "green";
        ctx.beginPath();
        ctx.moveTo(0, (this.y + this.height) * height);
        ctx.lineTo(width, (this.y + this.height) * height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo((this.x + this.width) * width, 0);
        ctx.lineTo((this.x + this.width) * width, height);
        ctx.stroke();

        ctx.strokeStyle = "blue";
        ctx.beginPath();
        ctx.moveTo(0, this.centerY * height);
        ctx.lineTo(width, this.centerY * height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(this.centerX * width, 0);
        ctx.lineTo(this.centerX * width, height);
        ctx.stroke();
        return this;
    };

    global.Face = Face;
}(this));