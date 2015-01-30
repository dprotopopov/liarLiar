(function (global) {
    'use strict';

    function Spectrum(bands) {
        this.bands = bands;
    }

    Spectrum.prototype.draw = function (ctx, width, height) {
        var bands = this.bands;
        ctx.resetTransform();
        ctx.clearRect(0, 0, width, height);
        ctx.translate(0, height);
        ctx.scale(width / (12 * bands.length - 2), -height / 256);
        for (var i = 0; i < bands.length; i++) {
            ctx.fillRect(12 * i, 0, 10, bands[i]);
        }
        return this;
    };

    global.Spectrum = Spectrum;
}(this));

