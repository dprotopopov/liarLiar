(function(global) {
    'use strict';

    function Gdi() {
    }

    Gdi.prototype.avg = function(ctx, img, width, height) {
        var imgCtx1 = img.getContext("2d");
        var imgData0 = ctx.getImageData(0, 0, width, height) || ctx.createImageData(width, height);
        var imgData1 = imgCtx1.getImageData(0, 0, width, height);
        var data0 = imgData0.data;
        var data1 = imgData1.data;
        for (var pix = 4 * width * height; pix-- > 0;) {
            data0[pix] = (data0[pix] + data1[pix]) >> 1;
        }
        ctx.putImageData(imgData0, 0, 0);
        return this;
    };
    Gdi.prototype.avg2 = function(ctx, img1, img2, width, height) {
        var imgCtx1 = img1.getContext("2d");
        var imgCtx2 = img2.getContext("2d");
        var imgData0 = ctx.createImageData(width, height);
        var imgData1 = imgCtx1.getImageData(0, 0, width, height);
        var imgData2 = imgCtx2.getImageData(0, 0, width, height);
        var data0 = imgData0.data;
        var data1 = imgData1.data;
        var data2 = imgData2.data;
        for (var pix = 4 * width * height; pix-- > 0;) {
            data0[pix] = (data1[pix] + data2[pix]) >> 1;
        }
        ctx.putImageData(imgData0, 0, 0);
        return this;
    };

    Gdi.prototype.mix = function(ctx, img, alpha, width, height) {
        var imgCtx = img.getContext("2d");
        var imgData0 = ctx.getImageData(0, 0, width, height) || ctx.createImageData(width, height);
        var imgData1 = imgCtx.getImageData(0, 0, width, height);
        var data0 = imgData0.data;
        var data1 = imgData1.data;
        for (var pix = 4 * width * height; pix-- > 0;) {
            data0[pix] = ((255 - alpha) * data0[pix] + alpha * data1[pix]) / 255;
        }
        ctx.putImageData(imgData0, 0, 0);
        return this;
    };

    Gdi.prototype.sub = function(ctx, img, alpha, width, height) {
        var imgCtx = img.getContext("2d");
        var imgData0 = ctx.getImageData(0, 0, width, height) || ctx.createImageData(width, height);
        var imgData1 = imgCtx.getImageData(0, 0, width, height);
        var data0 = imgData0.data;
        var data1 = imgData1.data;
        for (var pix = 4 * width * height; pix > 0;) {
            pix -= 4;
            var pix1 = pix + 1;
            var pix2 = pix + 2;
            var pix3 = pix + 3;
            data0[pix] = ((255 - alpha) * data0[pix] + alpha * (255 - data1[pix])) / 255;
            data0[pix1] = ((255 - alpha) * data0[pix1] + alpha * (255 - data1[pix1])) / 255;
            data0[pix2] = ((255 - alpha) * data0[pix2] + alpha * (255 - data1[pix2])) / 255;
            data0[pix3] = ((255 - alpha) * data0[pix3] + alpha * data1[pix3]) / 255;
        }
        ctx.putImageData(imgData0, 0, 0);
        return this;
    };

    Gdi.prototype.mod = function(ctx, img1, img2, width, height) {
        var imgCtx1 = img1.getContext("2d");
        var imgCtx2 = img2.getContext("2d");
        var imgData0 = ctx.createImageData(width, height);
        var imgData1 = imgCtx1.getImageData(0, 0, width, height);
        var imgData2 = imgCtx2.getImageData(0, 0, width, height);
        var data0 = imgData0.data;
        var data1 = imgData1.data;
        var data2 = imgData2.data;
        for (var pix = 4 * width * height; pix > 0;) {
            pix -= 4;
            var pix1 = pix + 1;
            var pix2 = pix + 2;
            var pix3 = pix + 3;
            data0[pix] = math.abs(data1[pix] - data2[pix]);
            data0[pix1] = math.abs(data1[pix1] - data2[pix1]);
            data0[pix2] = math.abs(data1[pix2] - data2[pix2]);
            data0[pix3] = (data1[pix3] + data2[pix3]) >> 1;
        }
        ctx.putImageData(imgData0, 0, 0);
        return this;
    };

    Gdi.prototype.let = function(ctx, img, imgAlpha, width, height) {
        var imgCtx1 = img.getContext("2d");
        var imgCtx2 = imgAlpha.getContext("2d");
        var imgData1 = imgCtx1.getImageData(0, 0, width, height);
        var imgData2 = imgCtx2.getImageData(0, 0, width, height);
        var data1 = imgData1.data;
        var data2 = imgData2.data;
        for (var pix = 4 * width * height; pix > 0;) {
            pix -= 4;
            var pix1 = pix + 1;
            var pix2 = pix + 2;
            var pix3 = pix + 3;
            data1[pix3] = (data2[pix] * 0.3 + data2[pix1] * 0.59 + data2[pix2] * 0.11);
        }
        ctx.putImageData(imgData1, 0, 0);
        return this;
    };

    Gdi.prototype.over = function(ctx, img, imgAlpha, width, height) {
        var imgCtx1 = img.getContext("2d");
        var imgCtx2 = imgAlpha.getContext("2d");
        var imgData0 = ctx.getImageData(0, 0, width, height) || ctx.createImageData(width, height);
        var imgData1 = imgCtx1.getImageData(0, 0, width, height);
        var imgData2 = imgCtx2.getImageData(0, 0, width, height);
        var data0 = imgData0.data;
        var data1 = imgData1.data;
        var data2 = imgData2.data;
        for (var pix = 4 * width * height; pix > 0;) {
            pix -= 4;
            var pix1 = pix + 1;
            var pix2 = pix + 2;
            var pix3 = pix + 3;
            data1[pix3] = (data2[pix] * 0.3 + data2[pix1] * 0.59 + data2[pix2] * 0.11);
            data0[pix] = ((255 - data1[pix3]) * data0[pix] + data1[pix3] * data1[pix]) / 255;
            data0[pix1] = ((255 - data1[pix3]) * data0[pix1] + data1[pix3] * data1[pix1]) / 255;
            data0[pix2] = ((255 - data1[pix3]) * data0[pix2] + data1[pix3] * data1[pix2]) / 255;
            data0[pix3] = 255;
        }
        ctx.putImageData(imgData0, 0, 0);
        return this;
    };

    Gdi.prototype.not = function(ctx, img, width, height) {
        var imgCtx = img.getContext("2d");
        var imgData = imgCtx.getImageData(0, 0, width, height);
        var data = imgData.data;
        for (var pix = 4 * width * height; pix > 0;) {
            pix -= 4;
            var pix1 = pix + 1;
            var pix2 = pix + 2;
            data[pix] = 255 - data[pix];
            data[pix1] = 255 - data[pix1];
            data[pix2] = 255 - data[pix2];
        }
        ctx.putImageData(imgData, 0, 0);
        return this;
    };

    global.Gdi = Gdi;
}(this));