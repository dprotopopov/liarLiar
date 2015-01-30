// A histogram is a graphical representation of the distribution of data. It is an estimate of the probability distribution of a continuous variable (quantitative variable)
// In image processing and photography, a color histogram is a representation of the distribution of colors in an image. For digital images, a color histogram represents the number of pixels that have colors in each of a fixed list of color ranges, that span the image's color space, the set of all possible colors.
// http://en.wikipedia.org/wiki/Histogram

(function (global) {
    'use strict';

    function Histogram(array, count) {
        this.array = array;
        this.count = count;
    }

    Histogram.prototype.draw = function (ctx, width, height) {
        var array = this.array;
        var count = this.count;
        ctx.resetTransform();
        ctx.clearRect(0, 0, width, height);
        ctx.translate(0, height);
        ctx.scale(width / 256, -height / math.log(1 + count));
        for (var i = 0; i < 256; i++) {
            ctx.fillRect(i, 0, 1, math.log(1 + array[i]));
        }
        return this;
    };

    global.Histogram = Histogram;
}(this));
