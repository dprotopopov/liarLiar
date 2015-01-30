(function(global) {
    'use strict';

    function Waveform(array, currentTime, period, interval) {
        this.array = array;
        this.currentTime = currentTime;
        this.period = period;
        this.interval = interval;
    }

    Waveform.prototype.draw = function(ctx, width, height) {
        var array = this.array;
        var currentTime = this.currentTime;
        ctx.resetTransform();
        ctx.clearRect(0, 0, width, height);
        ctx.translate(width, height / 2);
        ctx.scale(width * 1000 / this.period, height / 512);
        for (var j = Math.max(1, array.length - this.period / this.interval); j < array.length; j++) {
            ctx.fillRect(array[j - 1].arg - currentTime, -array[j].power, array[j].arg - array[j - 1].arg, 2 * array[j].power);
        }
        return this;
    };

    global.Waveform = Waveform;
}(this));