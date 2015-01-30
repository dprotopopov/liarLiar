(function (global) {
    'use strict';

    function Faces(faces) {
        this.faces = faces;
    }

    Faces.prototype.draw = function (ctx) {
        var faces = this.faces;
        for (var i = 0; i < faces.length; i++) {
            ctx.beginPath();
            ctx.arc((faces[i].x + faces[i].width * 0.5), (faces[i].y + faces[i].height * 0.5), (faces[i].width + faces[i].height) * 0.25 * 1.2, 0, Math.PI * 2);
            ctx.stroke();
        }
    };

    global.Faces = Faces;
}(this));