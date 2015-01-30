(function(global) {
    'use strict';

    function Theory() {
    };

    Theory.prototype.intensivety = function(array) {
        var len = array.length;
        var s = 0;
        $.each(array, function(index, element) {
            if (index && element) {
                s += math.square(element);
            }
        });
        return s / len;
    };

    Theory.prototype.info = function(array) {
        var len = array.length;
        var n = 0;
        var e = 0;
        var d = 0;
        var p = 0;
        var s = 0;
        $.each(array, function(index, element) {
            if (index && element) {
                n += element;
                e += index * element;
                d += math.square(index) * element;
                p += math.square(element);
                s += element * math.log(element);
            }
        });
        return {
            count: n,
            median: e / n,
            dispersion: d / n - math.square(e / n),
            intensivety: p / len,
            entropy: math.log(n) - s / n
        };
    };

    Theory.prototype.entropy = function(array) {
        var n = 0;
        var s = 0;
        $.each(array, function(index, element) {
            if (index && element) {
                n += element;
                s += element * math.log(element);
            }
        });
        return math.log(n) - s / n;
    };

    Theory.prototype.entropyD = function(array) {
        var d = 0;
        var n = 0;
        $.each(array, function(index, element) {
            if (index && element) {
                n += element;
                d += element * math.log(element);
            }
        });
        return math.log(n) - d / n;
    };

    Theory.prototype.entropyH = function(array) {
        var n = 0;
        $.each(array, function(index, element) {
            if (index && element) n += element;
        });
        var h = 0;
        var m = 0;
        $.each(array, function(index, element) {
            if (index && element) {
                var x = n / element;
                m += x;
                h += x * math.log(x);
            }
        });
        return math.log(m) - h / m;
    };

    Theory.prototype.entropyX = function(array) {
        var n = 0;
        var e = 0;
        $.each(array, function(index, element) {
            if (index && element) {
                n += element;
                e += index * element;
            }
        });
        var median = e / n;
        var sd2 = 0;
        var sd4 = 0;
        $.each(array, function(index, element) {
            var dd = index - median;
            var dd2 = math.square(dd);
            var dd4 = math.square(dd2);
            sd2 += dd2 * element;
            sd4 += dd4 * element;
        });
        sd2 = sd2 / n;
        sd4 = sd4 / n;
        return sd2 / math.sqrt(sd4);
    };

    Theory.prototype.entropyS = function(array) {
        var indexMax = 0;
        var elementMax = 0;
        $.each(array, function(index, element) {
            if (index && element) {
                if (element > elementMax) {
                    indexMax = index;
                    elementMax = element;
                };
            };
        });
        var s0 = 0;
        var s1 = 0;
        $.each(array, function(index, element) {
            s0 += math.abs((element - elementMax));
            s1 += math.abs((index - indexMax) * (element - elementMax));
        });
        return s1 / s0;
    };

    Theory.prototype.value = function(array) {
        var len = array.length;
        var n = 0;
        var e = 0;
        var p = 0;
        $.each(array, function(index, element) {
            if (index && element) {
                n += element;
                e += index * element;
                p += math.square(element);
            }
        });
        var indexMax = 0;
        var elementMax = 0;
        $.each(array, function(index, element) {
            if (index && element) {
                if (element > elementMax) {
                    indexMax = index;
                    elementMax = element;
                };
            };
        });
        var median = e / n;
        var m = 0;
        var d = 0;
        var h = 0;
        var sd2 = 0;
        var sd4 = 0;
        $.each(array, function(index, element) {
            if (index && element) {
                d += element * math.log(element);
                var x = n / element;
                m += x;
                h += x * math.log(x);
                var dd = index - median;
                var dd2 = math.square(dd);
                var dd4 = math.square(dd2);
                sd2 += dd2 * element;
                sd4 += dd4 * element;
            }
        });
        sd2 = sd2 / n;
        sd4 = sd4 / n;
        var s0 = 0;
        var s1 = 0;
        $.each(array, function(index, element) {
            s0 += math.abs((element - elementMax));
            s1 += math.abs((index - indexMax) * (element - elementMax));
        });
        return {
            count: n,
            median: e / n,
            intensivety: p / len,
            D: math.log(n) - d / n,
            H: math.log(m) - h / m,
            X: sd2 / math.sqrt(sd4),
            Y: median / math.sqrt(sd2),
            S: s1 / s0,
        };
    };

    global.Theory = Theory;
}(this));