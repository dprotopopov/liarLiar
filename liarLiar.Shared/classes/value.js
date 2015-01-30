(function(global) {
    'use strict';

    function Value(theory, bands, histogram, currentTime) {
        var value = new Array();
        for (var i = 0; i < 7; i++) value.push(new Float32Array(4));

        var value0 = 512 / math.PI * math.atan(theory.entropyD(bands));
        var value1 = 512 / math.PI * math.atan(theory.entropyH(bands));

        for (var i = 0; i < 4; i++) {
            value[0][i] = value0;
            value[1][i] = value1;
        }

        for (var i = 0; i < 4; i++) {
            var value0 = theory.value(histogram[0][i]);
            var value1 = theory.value(histogram[1][i]);
            value[2][i] = 512 / math.PI * math.atan(value1.D / value0.D);
            value[3][i] = 512 / math.PI * math.atan(value1.H / value0.H);
            value[4][i] = 512 / math.PI * math.atan(value1.X / value0.X);
            value[5][i] = 512 / math.PI * math.atan(value1.Y / value0.Y);
            value[6][i] = 512 / math.PI * math.atan(value1.S / value0.S);
        }

        this.arg = currentTime;
        this.val = value;
    }

    Value.prototype.integral = function(weight) {
        var array = new Float32Array(4);
        var value = this.val;
        for (var i = 0; i < 4; i++) {
            var s0 = 0;
            var s1 = 0;
            for (var j = 0; j < 7; j++) {
                s0 += math.abs(weight[j]);
                s1 += weight[j] * value[j][i];
            }
            array[i] = s1;
        }
        return array;
    };

    global.Value = Value;
}(this));