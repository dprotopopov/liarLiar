(function(global) {
    'use strict';

    function Integral(array, weight, currentTime, period, interval) {
        this.array = array;
        this.weight = weight;
        this.currentTime = currentTime;
        this.period = period;
        this.interval = interval;
    }

    Integral.prototype.draw = function(ctx, width, height) {
        var array = this.array;
        var weight = this.weight;
        var period = this.period;
        var interval = this.interval;
        var currentTime = this.currentTime;
        var strokeStyle = ["red", "green", "blue", "black"];
        var array1 = [];
        for (var j = math.max(0, array.length - parseInt(period / interval)); j < array.length; j++) {
            var obj = array[j];
            array1.push(obj.integral(weight));
        }
        ctx.resetTransform();
        ctx.clearRect(0, 0, width, height);
        ctx.translate(width, height / 2);
        ctx.scale(-1, -1);
        ctx.lineWidth = 0.25;
        ctx.beginPath();
        ctx.strokeStyle = "grey";
        for (var i = 256; i > 0; i >>= 1) {
            ctx.moveTo(0, height / math.PI * math.atan(i));
            ctx.lineTo(width, height / math.PI * math.atan(i));
            ctx.moveTo(0, - height / math.PI * math.atan(i));
            ctx.lineTo(width, - height / math.PI * math.atan(i));
        }
        ctx.moveTo(0, 0);
        ctx.lineTo(width, 0);
        for (var i = parseInt(currentTime - period / 1000); i < currentTime; i++) {
            ctx.moveTo(width * (currentTime - i) * 1000 / period, -height);
            ctx.lineTo(width * (currentTime - i) * 1000 / period, height);
        }
        ctx.stroke();
        for (var i = 0; i < 4; i++) {
            ctx.beginPath();
            ctx.strokeStyle = strokeStyle[i];
            var j = math.max(0, array.length - parseInt(period / interval));
            var j1 = 0;
            var obj = array[j];
            var item = array1[j1];
            ctx.moveTo(width * (currentTime - obj.arg) * 1000 / period, height * item[i] / 512);
            while (++j < array.length) {
                var obj = array[j];
                var item = array1[++j1];
                ctx.lineTo(width * (currentTime - obj.arg) * 1000 / period, height * item[i] / 512);
            }
            ctx.stroke();
        }
        return this;
    };

    global.Integral = Integral;
}(this));