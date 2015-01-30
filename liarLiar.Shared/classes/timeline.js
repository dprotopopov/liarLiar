(function(global) {
    'use strict';

    function Timeline(array, currentTime, period, interval) {
        this.array = array;
        this.currentTime = currentTime;
        this.period = period;
        this.interval = interval;
    }

    Timeline.prototype.draw = function(ctx, index, width, height) {
        var array = this.array;
        var period = this.period;
        var interval = this.interval;
        var currentTime = this.currentTime;
        var strokeStyle = ["red", "green", "blue", "black"];
        ctx.resetTransform();
        ctx.clearRect(0, 0, width, height);
        ctx.translate(width, height);
        ctx.scale(-1, -1);
        ctx.lineWidth = 0.25;
        ctx.beginPath();
        ctx.strokeStyle = "grey";
        for (var i = 256; i > 0; i >>= 1) {
            ctx.moveTo(0, 2 * height / math.PI * math.atan(i));
            ctx.lineTo(width, 2 * height / math.PI * math.atan(i));
        }
        ctx.moveTo(0, 0);
        ctx.lineTo(width, 0);
        for (var i = parseInt(currentTime - period / 1000); i < currentTime; i++) {
            ctx.moveTo(width * (currentTime - i) * 1000 / period, 0);
            ctx.lineTo(width * (currentTime - i) * 1000 / period, height);
        }
        ctx.stroke();
        for (var i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.strokeStyle = strokeStyle[i];
            var j = math.max(0, array.length - parseInt(period / interval));
            var obj = array[j];
            var item = obj.val[index];
            ctx.moveTo(width * (currentTime - obj.arg) * 1000 / period, height * item[i] / 256);
            while (++j < array.length) {
                var obj = array[j];
                var item = obj.val[index];
                ctx.lineTo(width * (currentTime - obj.arg) * 1000 / period, height * item[i] / 256);
            }
            ctx.stroke();
        }
        return this;
    };

    global.Timeline = Timeline;
}(this));