
liarLiar.MainView = function(params) {

    var viewModel = {
        // Binding properties
        viewWidth: ko.observable(),
        lastTime: ko.observable(),
        waveformData: ko.observableArray(),
        measureData: ko.observableArray(),
        // Overlays
        popupVisible: ko.observable(false),
        summaryControlVisible: ko.observable(false),
        mainAndDeltaControlVisible: ko.observable(false),
        audioAndVideoControlVisible: ko.observable(false),
        // Audio Controls
        gainGainValue: ko.observable(2),
        analyserSmoothingTimeConstant: ko.observable(0.3),
        compressorThresholdValue: ko.observable(-18.2),
        compressorRatioValue: ko.observable(4),
        bufferSize: ko.observable(256),
        // Video Controls
        flipVertical: ko.observable(false),
        flipHorizontal: ko.observable(false),
        sensitivity: ko.observable(320),
        reaction: ko.observable(1000),
        // Timer Controls
        period: ko.observable(20000),
        interval: ko.observable(20),
        // Weights and threshold
        A: ko.observable(1),
        B: ko.observable(-1),
        D: ko.observable(1),
        H: ko.observable(1),
        X: ko.observable(-1),
        Y: ko.observable(-1),
        S: ko.observable(1),
        startThreshold: ko.observable(-128),
        endThreshold: ko.observable(128),
        // Popup
        currentSource: ko.observable("camera"),
        currentVideoSource: ko.observable(),
        currentAudioSource: ko.observable(),
        audioSource: ko.observableArray([]),
        videoSource: ko.observableArray([]),
        videoId: ko.observable(""),
        uri: ko.observable(""),
        // Debug Info
        fps: ko.observable(0),
    };

    // dxToast
    viewModel.warningOptions = {
        message: 'WARNING',
        type: 'warning',
        displayTime: 3000
    };

    viewModel.infoOptions = {
        message: 'Look at the camera',
        type: 'info',
        displayTime: 3000
    };

    // dxPopup/dxOverlay
    viewModel.popupOptions = {
        //width: function () { return $(window).width() * 0.8; },
        //height: function () { return $(window).height() * 0.8; },
        visible: viewModel.popupVisible,
        fullScreen: false,
    };

    viewModel.summaryOptions = {
        visible: viewModel.summaryControlVisible
    };

    viewModel.audioAndVideoOptions = {
        visible: viewModel.audioAndVideoControlVisible
    };

    viewModel.mainAndDeltaOptions = {
        visible: viewModel.mainAndDeltaControlVisible
    };

    //With local storage, web applications can store data locally within the user's browser.
    try {
        viewModel.currentSource(localStorage.getItem("currentSource") || viewModel.currentSource());
        viewModel.currentVideoSource(localStorage.getItem("currentVideoSource") || viewModel.currentVideoSource());
        viewModel.currentAudioSource(localStorage.getItem("currentAudioSource") || viewModel.currentAudioSource());
        viewModel.videoId(localStorage.getItem("videoId") || viewModel.videoId());
        viewModel.uri(localStorage.getItem("uri") || viewModel.uri());
        viewModel.sensitivity(parseInt(localStorage.getItem("sensitivity") || viewModel.sensitivity()));
        viewModel.reaction(parseInt(localStorage.getItem("reaction") || viewModel.reaction()));
        viewModel.flipVertical(((localStorage.getItem("flipVertical") || viewModel.flipVertical()) == true) ? true : false);
        viewModel.flipHorizontal(((localStorage.getItem("flipVertical") || viewModel.flipHorizontal()) == true) ? true : false);
        viewModel.A(parseFloat(localStorage.getItem("A") || viewModel.A()));
        viewModel.B(parseFloat(localStorage.getItem("B") || viewModel.B()));
        viewModel.D(parseFloat(localStorage.getItem("D") || viewModel.D()));
        viewModel.H(parseFloat(localStorage.getItem("H") || viewModel.H()));
        viewModel.X(parseFloat(localStorage.getItem("X") || viewModel.X()));
        viewModel.Y(parseFloat(localStorage.getItem("Y") || viewModel.Y()));
        viewModel.S(parseFloat(localStorage.getItem("S") || viewModel.S()));
        viewModel.startThreshold(parseFloat(localStorage.getItem("startThreshold") || viewModel.startThreshold()));
        viewModel.endThreshold(parseFloat(localStorage.getItem("endThreshold") || viewModel.endThreshold()));
    } catch (e) {
    }

    var save = function() {
        try {
            localStorage.setItem("currentSource", viewModel.currentSource());
            localStorage.setItem("currentVideoSource", viewModel.currentVideoSource());
            localStorage.setItem("currentAudioSource", viewModel.currentAudioSource());
            localStorage.setItem("videoId", viewModel.videoId());
            localStorage.setItem("uri", viewModel.uri());
            localStorage.setItem("sensitivity", viewModel.sensitivity());
            localStorage.setItem("reaction", viewModel.reaction());
            localStorage.setItem("flipVertical", viewModel.flipVertical());
            localStorage.setItem("flipHorizontal", viewModel.flipHorizontal());
            localStorage.setItem("A", viewModel.A());
            localStorage.setItem("B", viewModel.B());
            localStorage.setItem("D", viewModel.D());
            localStorage.setItem("H", viewModel.H());
            localStorage.setItem("X", viewModel.X());
            localStorage.setItem("Y", viewModel.Y());
            localStorage.setItem("S", viewModel.S());
            localStorage.setItem("startThreshold", viewModel.startThreshold());
            localStorage.setItem("endThreshold", viewModel.endThreshold());
        } catch (e) {
        }
    };

    viewModel.currentSource.subscribe(save);
    viewModel.currentVideoSource.subscribe(save);
    viewModel.currentAudioSource.subscribe(save);
    viewModel.videoId.subscribe(save);
    viewModel.uri.subscribe(save);
    viewModel.sensitivity.subscribe(save);
    viewModel.reaction.subscribe(save);
    viewModel.flipVertical.subscribe(save);
    viewModel.flipHorizontal.subscribe(save);
    viewModel.A.subscribe(save);
    viewModel.B.subscribe(save);
    viewModel.D.subscribe(save);
    viewModel.H.subscribe(save);
    viewModel.X.subscribe(save);
    viewModel.Y.subscribe(save);
    viewModel.S.subscribe(save);
    viewModel.startThreshold.subscribe(save);
    viewModel.endThreshold.subscribe(save);

    viewModel.radioGroupData = {
        dataSource: [
            { text: "Camera/Microphone", value: "camera" },
            { text: "YouTube", value: "yt" },
            { text: "File", value: "uri" }
        ],
        fullScreen: false,
        layout: 'vertical',
        valueExpr: 'value',
        value: viewModel.currentSource,
    };

    viewModel.showSummaryControl = function() { viewModel.summaryControlVisible(true); };
    viewModel.hideSummaryControl = function() { viewModel.summaryControlVisible(false); };

    viewModel.showMainAndDeltaControl = function() { viewModel.mainAndDeltaControlVisible(true); };
    viewModel.hideMainAndDeltaControl = function() { viewModel.mainAndDeltaControlVisible(false); };

    viewModel.showAudioAndVideoControl = function() { viewModel.audioAndVideoControlVisible(true); };
    viewModel.hideAudioAndVideoControl = function() { viewModel.audioAndVideoControlVisible(false); };

    // dxToolbar
    viewModel.captureToolbar = {
        items: [
            { location: 'after', widget: 'button', options: { icon: 'preferences', clickAction: viewModel.showAudioAndVideoControl } },
            { location: 'center', text: 'capture' }
        ],
    };

    viewModel.mainAndDeltaToolbar = {
        items: [
            { location: 'after', widget: 'button', options: { icon: 'preferences', clickAction: viewModel.showMainAndDeltaControl } },
            { location: 'center', text: 'mainAndDelta' }
        ],
    };

    viewModel.histogramsToolbar = {
        items: [
            { location: 'center', text: 'histograms' }
        ],
    };

    viewModel.measuresToolbar = {
        items: [
            { location: 'center', text: 'measures' }
        ],
    };

    viewModel.summaryToolbar = {
        items: [
            { location: 'after', widget: 'button', options: { icon: 'preferences', clickAction: viewModel.showSummaryControl } },
            { location: 'center', text: 'summary' }
        ],
    };

    viewModel.debugToolbar = {
        items: [
            { location: 'center', text: 'debug' }
        ],
    };

    // dxSlider/dxRangeSlider
    viewModel.aOptions = {
        min: -10,
        max: 10,
        step: 0.1,
        value: viewModel.A,
        hint: viewModel.A,
    };
    viewModel.bOptions = {
        min: -10,
        max: 10,
        step: 0.1,
        value: viewModel.B,
        hint: viewModel.B,
    };
    viewModel.dOptions = {
        min: -10,
        max: 10,
        step: 0.1,
        value: viewModel.D,
        hint: viewModel.D,
    };
    viewModel.hOptions = {
        min: -10,
        max: 10,
        step: 0.1,
        value: viewModel.H,
        hint: viewModel.H,
    };
    viewModel.xOptions = {
        min: -10,
        max: 10,
        step: 0.1,
        value: viewModel.X,
        hint: viewModel.X,
    };
    viewModel.yOptions = {
        min: -10,
        max: 10,
        step: 0.1,
        value: viewModel.Y,
        hint: viewModel.Y,
    };
    viewModel.sOptions = {
        min: -10,
        max: 10,
        step: 0.1,
        value: viewModel.S,
        hint: viewModel.S,
    };
    viewModel.thresholdOptions = {
        min: -256,
        max: 256,
        step: 0.5,
        start: viewModel.startThreshold,
        end: viewModel.endThreshold,
        hint: ko.computed(function() { return viewModel.startThreshold() + " - " + viewModel.endThreshold(); }, this),
    };

    //The AudioContext interface represents an audio-processing graph built from audio modules linked together, each represented by an AudioNode. An audio context controls both the creation of the nodes it contains and the execution of the audio processing, or decoding. You need to create an AudioContext before you do anything else, as everything happens inside a context.
    var audioContext = window.AudioContext || window.webkitAudioContext;
    viewModel.audioCtx = new audioContext();

    viewModel.gain = viewModel.audioCtx.createGain();
    viewModel.analyser = viewModel.audioCtx.createAnalyser();
    viewModel.compressor = viewModel.audioCtx.createDynamicsCompressor();
    viewModel.recorder = viewModel.audioCtx.createScriptProcessor(viewModel.bufferSize(), 1, 2);
    viewModel.destination = viewModel.audioCtx.createMediaStreamDestination();

    var updateAudio = function() {
        viewModel.gain.gain.value = viewModel.gainGainValue();
        viewModel.analyser.smoothingTimeConstant = viewModel.analyserSmoothingTimeConstant();
        viewModel.analyser.fftSize = viewModel.bufferSize();
        viewModel.compressor.threshold.value = viewModel.compressorThresholdValue();
        viewModel.compressor.ratio.value = viewModel.compressorRatioValue();
    };

    updateAudio();

    viewModel.bufferSize.subscribe(updateAudio);
    viewModel.gainGainValue.subscribe(updateAudio);
    viewModel.analyserSmoothingTimeConstant.subscribe(updateAudio);
    viewModel.compressorThresholdValue.subscribe(updateAudio);
    viewModel.compressorRatioValue.subscribe(updateAudio);

    viewModel.recorder.onaudioprocess = function(event) {
    };

    viewModel.init = function() {
        viewModel.integral = document.getElementById("integral");
        viewModel.grayscale = document.getElementById("grayscale");
        viewModel.spectrum = document.getElementById("spectrum");
        viewModel.waveform = document.getElementById("waveform");
        viewModel.current = document.getElementById("current");
        viewModel.previous = document.getElementById("previous");
        viewModel.delta = document.getElementById("delta");
        viewModel.accumulate = document.getElementById("accumulate");
        viewModel.measure = [0, 1, 2, 3, 4, 5, 6].map(function(item) { return document.getElementById("measure[" + item + "]"); });
        viewModel.histogram = [0, 1].map(function(item) { return document.getElementById("histogram[" + item + "]"); });
        viewModel.video = document.getElementById("video");
        viewModel.ytplayer = document.getElementById("ytplayer");

        //The HTML5 <canvas> tag is used to draw graphics, on the fly, via scripting (usually JavaScript).
        //However, the <canvas> element has no drawing abilities of its own (it is only a container for graphics) - you must use a script to actually draw the graphics.
        //The getContext() method returns an object that provides methods and properties for drawing on the canvas.
        //This reference will cover the properties and methods of the getContext("2d") object, which can be used to draw text, lines, boxes, circles, and more - on the canvas.
        viewModel.measureCtx = viewModel.measure.map(function(item) { return item.getContext("2d"); });
        viewModel.histogramCtx = viewModel.histogram.map(function(item) { return item.getContext("2d"); });
        viewModel.accumulateCtx = viewModel.accumulate.getContext("2d");
        viewModel.deltaCtx = viewModel.delta.getContext("2d");
        viewModel.previousCtx = viewModel.previous.getContext("2d");
        viewModel.currentCtx = viewModel.current.getContext("2d");
        viewModel.spectrumCtx = viewModel.spectrum.getContext("2d");
        viewModel.waveformCtx = viewModel.waveform.getContext("2d");
        viewModel.grayscaleCtx = viewModel.grayscale.getContext("2d");
        viewModel.integralCtx = viewModel.integral.getContext("2d");

        // Theory
        viewModel.theory = new Theory();

        // Face
        viewModel.face = new Face();

        // Asynchronous semaphore for Javascript.
        // https://github.com/pr0ton/semaphore.js
        viewModel.faceSemaphore = new Semaphore(1);
        viewModel.analyserSemaphore = new Semaphore(1);
    };

    viewModel.resize = function() {

        var width = parseInt(viewModel.viewWidth() / 2);
        var height = parseInt(width);

        $.each([
            viewModel.current,
            viewModel.previous,
            viewModel.delta,
            viewModel.accumulate
        ], function(index, element) {
            $(element).attr("width", width);
            $(element).attr("height", height);
        });

        var videoWidth = parseInt(viewModel.video.videoWidth);
        var videoHeight = parseInt(viewModel.video.videoHeight);

        width = parseInt(viewModel.viewWidth() / 2);
        height = parseInt(videoHeight * width / videoWidth);
        $(viewModel.video).attr("width", width);
        $(viewModel.video).attr("height", height);

        $.each([
            viewModel.spectrum
        ], function(index, element) {
            var width = parseInt(viewModel.viewWidth() / 2);
            var height = parseInt(videoHeight * width / videoWidth);
            $(element).attr("width", width);
            $(element).attr("height", height);
        });

        var scale = "scale(" + (viewModel.flipHorizontal() ? "-1" : "1") + "," + (viewModel.flipVertical() ? "-1" : "1") + ")";
        var filter = (viewModel.flipHorizontal() ? "FlipH" : "") + " " + (viewModel.flipVertical() ? "FlipV" : "");
        var style = "-moz-transform: " + scale + "; -webkit-transform: " + scale + "; -o-transform: " + scale + "; transform: " + scale + ";" + ((viewModel.flipHorizontal() || viewModel.flipVertical()) ? (" filter: " + filter + ";") : "");
        viewModel.video.style.cssText = style;

    };

    viewModel.updateSpectrum = function() {
        try {
            var spectrumWidth = $(viewModel.spectrum).width();
            var spectrumHeight = $(viewModel.spectrum).height();

            viewModel.analyserSemaphore.acquire(function(release) {
                //console.log("analyserSemaphore acquired");
                var bands = new Uint8Array(viewModel.analyser.frequencyBinCount);
                viewModel.analyser.getByteFrequencyData(bands);

                release();
                //console.log("analyserSemaphore released");

                var spectrumCtx = viewModel.spectrumCtx;
                (new Spectrum(bands)).draw(spectrumCtx, spectrumWidth, spectrumHeight);
            });
        } catch (e) {
        }
    };

    viewModel.updateWaveform = function() {
        try {
            viewModel.analyserSemaphore.acquire(function(release) {
                //console.log("analyserSemaphore acquired");
                var bands = new Uint8Array(viewModel.analyser.frequencyBinCount);
                viewModel.analyser.getByteFrequencyData(bands);

                release();
                //console.log("analyserSemaphore released");

                var theory = viewModel.theory;
                var power = theory.intensivety(bands);
                var currentTime = viewModel.audioCtx.currentTime;
                power = math.sqrt(power);
                var array = viewModel.waveformData();
                array.push({
                    arg: currentTime,
                    power: power,
                });
                (new Waveform(array, currentTime, viewModel.period(), viewModel.interval())).draw(viewModel.waveformCtx, viewModel.waveform.width, viewModel.waveform.height);
                viewModel.waveformData(array);
            });
        } catch (e) {
        }
    };

    viewModel.updateTimeline = function() {
        try {
            var videoWidth = parseInt(viewModel.video.videoWidth);
            var videoHeight = parseInt(viewModel.video.videoHeight);

            var width = $(viewModel.current).width();
            var height = $(viewModel.current).height();

            viewModel.faceSemaphore.acquire(function(release) {
                //console.log("faceSemaphore acquired");

                var sourceWidth = parseInt(3 * viewModel.face.width * videoWidth);
                var sourceHeight = parseInt(sourceWidth * height / width);
                var sourceX = parseInt(viewModel.face.centerX * videoWidth - sourceWidth / 2);
                var sourceY = parseInt(viewModel.face.centerY * videoHeight - sourceHeight / 2);

                var currentCtx = viewModel.currentCtx;
                var previousCtx = viewModel.previousCtx;
                var deltaCtx = viewModel.deltaCtx;
                var accumulateCtx = viewModel.accumulateCtx;

                previousCtx.drawImage(viewModel.current, 0, 0, width, height, 0, 0, width, height);
                currentCtx.resetTransform();
                currentCtx.translate(viewModel.flipHorizontal() ? width : 0, viewModel.flipVertical() ? height : 0);
                currentCtx.scale(viewModel.flipHorizontal() ? -1 : 1, viewModel.flipVertical() ? -1 : 1);
                currentCtx.drawImage(viewModel.video, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, width, height);

                release();
                //console.log("faceSemaphore released");

                var currentTime = viewModel.audioCtx.currentTime;
                var intervalTime = currentTime - viewModel.lastTime();
                var alpha = 255 * (1 - math.exp(-intervalTime * 1000 / viewModel.reaction()));

                (new Gdi())
                    .mod(deltaCtx, viewModel.current, viewModel.previous, width, height)
                    .mix(accumulateCtx, viewModel.delta, alpha, width, height);

                // In image processing and photography, a color histogram is a representation of the distribution of colors in an image. For digital images, a color histogram represents the number of pixels that have colors in each of a fixed list of color ranges, that span the image's color space, the set of all possible colors.
                var histogram = [
                    [
                        new Uint32Array(256),
                        new Uint32Array(256),
                        new Uint32Array(256),
                        new Uint32Array(256)
                    ],
                    [
                        new Uint32Array(256),
                        new Uint32Array(256),
                        new Uint32Array(256),
                        new Uint32Array(256)
                    ]
                ];

                for (var i = 0; i < 2; i++) {
                    for (var k = 0; k < 4; k++) {
                        for (var j = 0; j < 256; j++) {
                            histogram[i][k][j] = 0;
                        }
                    }
                }

                var imageData0 = currentCtx.getImageData(0, 0, width, height);
                var imageData1 = accumulateCtx.getImageData(0, 0, width, height);
                var data = [imageData0.data, imageData1.data];
                var length = 4 * width * height;

                for (var i = 0; i < 2; i++) {
                    for (var j = 0; j < length; j += 4) {
                        // Y = 0.2126 * R + 0.7152 * G + 0.0722 * B
                        data[i][j + 3] = parseInt(0.2126 * data[i][j + 0] + 0.7152 * data[i][j + 1] + 0.0722 * data[i][j + 2]);
                        for (var k = 0; k < 4; k++) {
                            histogram[i][k][data[i][j + k]]++;
                        }
                    }
                }

                for (var i = 0; i < 2; i++) {
                    (new Histogram(histogram[i][3], width * height)).draw(viewModel.histogramCtx[i], viewModel.histogram[i].width, viewModel.histogram[i].height);
                }

                var bands = new Uint8Array(viewModel.analyser.frequencyBinCount);
                viewModel.analyser.getByteFrequencyData(bands);

                var array = viewModel.measureData();
                var value = new Value(viewModel.theory, bands, histogram, currentTime);
                array.push(value);
                var timeline = new Timeline(array, currentTime, viewModel.period(), viewModel.interval());
                for (var i = 0; i < 7; i++) {
                    timeline.draw(viewModel.measureCtx[i], i, viewModel.measure[i].width, viewModel.measure[i].height);
                }

                var startThreshold = viewModel.startThreshold();
                var endThreshold = viewModel.endThreshold();
                var weight = [viewModel.A(), viewModel.B(), viewModel.D(), viewModel.H(), viewModel.X(), viewModel.Y(), viewModel.S()];
                var level = [startThreshold, endThreshold];
                (new Integral(array, weight, level, currentTime, viewModel.period(), viewModel.interval())).draw(viewModel.integralCtx, viewModel.integral.width, viewModel.integral.height);

                var integral = value.integral(weight);
                $.each(integral, function(index, element) {
                    if (element < startThreshold || element > endThreshold) {
                        $("#warningContainer").dxToast('instance').show();
                    }
                });

                viewModel.measureData(array);
                viewModel.lastTime(currentTime);
                viewModel.fps(1 / intervalTime);
            });
        } catch (e) {
        }
    };

    viewModel.updateGrayscale = function() {
        try {
            var videoWidth = parseInt(viewModel.video.videoWidth);
            var videoHeight = parseInt(viewModel.video.videoHeight);
            $(viewModel.grayscale).attr("width", parseInt(viewModel.sensitivity() * videoWidth / 1024));
            $(viewModel.grayscale).attr("height", parseInt(viewModel.sensitivity() * videoHeight / 1024));

            viewModel.faceSemaphore.acquire(function(release) {
                //console.log("faceSemaphore acquired");

                var grayscaleWidth = $(viewModel.grayscale).width();
                var grayscaleHeight = $(viewModel.grayscale).height();

                var grayscaleCtx = viewModel.grayscaleCtx;
                grayscaleCtx.resetTransform();
                grayscaleCtx.translate(viewModel.flipHorizontal() ? grayscaleWidth : 0, viewModel.flipVertical() ? grayscaleHeight : 0);
                grayscaleCtx.scale(viewModel.flipHorizontal() ? -1 : 1, viewModel.flipVertical() ? -1 : 1);
                grayscaleCtx.drawImage(viewModel.video, 0, 0, videoWidth, videoHeight, 0, 0, grayscaleWidth, grayscaleHeight);

                //var imageData = grayscaleCtx.getImageData(0, 0, grayscaleWidth, grayscaleHeight);
                //var data = imageData.data;
                //var pix1, pix2, pix = 4 * grayscaleWidth * grayscaleHeight;
                //while (pix > 0) {
                //    data[pix -= 4] = data[pix1 = pix + 1] = data[pix2 = pix + 2] = (data[pix] * 0.3 + data[pix1] * 0.59 + data[pix2] * 0.11);
                //}
                //grayscaleCtx.putImageData(imageData, 0, 0);

                $(viewModel.grayscale).faceDetection({
                    interval: 1,
                    complete: function(faces) {
                        //Returns an array of found faces object:
                        //x — X coord of the face in the picture
                        //y — Y coord of the face in the picture
                        //width — Width of the face
                        //height — Height of the face
                        //positionX — X position relative to the document
                        //positionY — Y position relative to the document
                        //offsetX — X position relative to the offset parent
                        //offsetY — Y position relative to the offset parent
                        //scaleX — Ratio between original image width and displayed width
                        //scaleY — Ratio between original image height and displayed height
                        //confidence — Level of confidence

                        (new Faces(faces)).draw(grayscaleCtx);

                        viewModel.betta = viewModel.betta || 1;
                        var betta = math.min(viewModel.betta * 1.25, 1 / 2);
                        if (faces.length) {
                            var face = faces[0];
                            betta = math.max(viewModel.betta / 1.5, 1 / 32);

                            viewModel.face
                                .avg(betta, face, grayscaleWidth, grayscaleHeight)
                                .draw(grayscaleCtx, grayscaleWidth, grayscaleHeight);

                        }
                        viewModel.betta = betta;
                        release();
                        //console.log("faceSemaphore released");
                    },
                    error: function(code, message) {
                        release();
                        //console.log("faceSemaphore released");
                    }
                });
            });
        } catch (e) {
        }
    };

    viewModel.sliceTimeline = function() {
        try {
            var array = viewModel.measureData();
            array = array.slice(-parseInt(viewModel.period() / viewModel.interval()));
            viewModel.measureData(array);
        } catch (e) {
        }
    };

    viewModel.sliceWaveform = function() {
        try {
            var array = viewModel.waveformData();
            array = array.slice(-parseInt(viewModel.period() / viewModel.interval()));
            viewModel.waveformData(array);
        } catch (e) {
        }
    };

    document.addEventListener('headtrackrStatus', function(event) {
        //status : status of headtracking. Can have these values:
        //"getUserMedia" : getUserMedia seems to be supported
        //"no getUserMedia" : getUserMedia seems not to be supported
        //"camera found" : camera found and allowed to stream
        //"no camera" : camera not found, or streaming not allowed, or getUserMedia setup failed
        //"whitebalance" : initialized detection of graylevels
        //"detecting" : initialized detection of face
        //"hints" : detecting the face took more than 5 seconds
        //"found" : face detected, tracking initialized
        //"lost" : lost tracking of face
        //"redetecting" : trying to redetect face
        //"stopped" : face tracking was stopped
        if (event.status == "getUserMedia") {
            //alert("getUserMedia is supported!");
        }
    });

    document.addEventListener('facetrackingEvent', function(event) {
        //height : height of face on canvas
        //width : width of face on canvas
        //angle : angle of face on canvas (in radians). The angle is calculated in normal counter-clockwise direction. I.e. if head is upright, this will return π/2, if head is tilted towards right (as seen on canvas), this will return a degree between 0 and π/2. Note that this is only calculated if "calcAngles" is enabled via parameters, default is that this is not enabled. When "calcAngles" is not enabled, this will always return π/2, i.e. 90°.
        //x : x-position of center of face on canvas
        //y : y-position of center of face on canvas
        //confidence : confidence in the detection (will only give a value for detection, not tracking)
        //detection : type of detection/tracking, either "VJ" for Viola-Jones or "CS" for Camshift
        //time : How long time it took to calculate this position (for debugging only)

    });

    document.addEventListener('headtrackingEvent', function(event) {
        //x : position of head in cm's right of camera as seen from users point of view (see figure)
        //y : position of head in cm's above camera (see figure)
        //z : position of head in cm's distance from camera (see figure)
    });

    function onCaptureSuccess(stream) {
        viewModel.init();
        $("#infoContainer").dxToast('instance').show();
        viewModel.lastTime(viewModel.audioCtx.currentTime);
        $(viewModel.ytplayer).hide();

        try {
            viewModel.video.src = window.URL.createObjectURL(stream);
            viewModel.video.onloadedmetadata = function(e) {
                // Do something with the video here.
                viewModel.viewWidth($("#field").width());
                $(window).resize(function() {
                    viewModel.viewWidth($("#field").width());
                });
                viewModel.resize();
                viewModel.flipHorizontal.subscribe(viewModel.resize);
                viewModel.flipVertical.subscribe(viewModel.resize);
                viewModel.viewWidth.subscribe(viewModel.resize);
            };
        } catch (e) {
        }


        try {
            var value = new Float32Array(4);
            for (var i = 0; i < 4; i++) value[i] = 0;
            viewModel.input = viewModel.audioCtx.createMediaStreamSource(stream);
            viewModel.input.connect(viewModel.gain);
            viewModel.gain.connect(viewModel.compressor);
            viewModel.compressor.connect(viewModel.analyser);
            viewModel.analyser.connect(viewModel.recorder);
            viewModel.recorder.connect(viewModel.destination);
        } catch (e) {
        }

        viewModel.video.onplay = function(e) {
            try {
                //htracker.start();
                viewModel.timer = [
                    setInterval(viewModel.updateSpectrum, viewModel.interval()),
                    setInterval(viewModel.updateWaveform, viewModel.interval()),
                    setInterval(viewModel.updateTimeline, viewModel.interval()),
                    setInterval(viewModel.updateGrayscale, 200),
                    setInterval(viewModel.sliceTimeline, viewModel.period()),
                    setInterval(viewModel.sliceWaveform, viewModel.period())
                ];
            } catch (e) {
            }
        };

        viewModel.video.onended = function(e) {
            try {
                //htracker.stop();
                $.each(viewModel.timer, function(index, element) {
                    window.clearInterval(element);
                });
            } catch (e) {
            }
        };
    }

    function onCaptureError(error) {
        DevExpress.ui.notify(error, "error", 2000);
    }

    //    Properties
    //    MediaStreamTrack.enabled
    //    Is a Boolean value with a value of true if the track is enabled, that is allowed to render the media source stream; or false if it is disabled, that is not rendering the media source stream but silence and blackness. If the track has been disconnected, this value can be changed but has no more effect.
    //    MediaStreamTrack.id Read only
    //    Returns a DOMString containing a unique identifier (GUID) for the track; it is generated by the browser.
    //    MediaStreamTrack.kind Read only
    //    Returns a DOMString set to "audio" if the track is an audio track and to "video", if it is a video track. It doesn't change if the track is deassociated from its source.
    //    MediaStreamTrack.label Read only
    //    Returns a DOMString containing a user agent-assigned label that identifies the track source, as in "internal microphone". The string may be left empty and is empty as long as no source has been connected. When the track is deassociated from its source, the label is not changed.
    //    MediaStreamTrack.muted Read only
    //    Returns a Boolean value with a value of true if the track is muted, false otherwise.
    //    MediaStreamTrack.readonly Read only
    //    Returns a Boolean value with a value of true if the track is readonly (such a video file source or a camera that settings can't be modified),false otherwise.
    //MediaStreamTrack.readyState Read only
    //Returns an enumerated value giving the status of the track.It takes one of the following values:
    //    "live" which indicates that an input is connected and does its best-effort in providing real-time data. In that case, the output of data can be switched on or off using the MediaStreamTrack.enabled attribute.
    //    "ended" which indicates that the input is not giving any more data and will never provide new data.
    //    MediaStreamTrack.remote Read only
    //    Returns a boolean value with a value of true if the track is sourced by a RTCPeerConnection, false otherwise.
    function gotSources(sourceInfos) {
        var audioSource = viewModel.audioSource();
        var videoSource = viewModel.videoSource();

        $.each(sourceInfos, function(index, sourceInfo) {
            var option = {};
            option.value = sourceInfo.id;
            if (sourceInfo.kind === 'audio') {
                option.text = sourceInfo.label || 'microphone ' + (audioSource.length + 1);
                audioSource.push(option);
            } else if (sourceInfo.kind === 'video') {
                option.text = sourceInfo.label || 'camera ' + (videoSource.length + 1);
                videoSource.push(option);
            } else {
                console.log('Some other kind of source: ', sourceInfo);
            }
        });

        viewModel.audioSource(audioSource);
        viewModel.videoSource(videoSource);
    }

    viewModel.showPopup = function() {
        viewModel.popupVisible(true);
    };

    viewModel.hidePopup = function() {
        switch (viewModel.currentSource()) {
        default:
            var currentAudioSource = viewModel.currentAudioSource();
            var currentVideoSource = viewModel.currentVideoSource();
            viewModel.popupVisible(false);
            //Prompts the user for permission to use a media device such as a camera or microphone. If the user provides permission, the successCallback is invoked on the calling application with a LocalMediaStream object as its argument.
            navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
            navigator.getUserMedia({
                audio: {
                    optional: [
                        {
                            sourceId: currentAudioSource
                        }
                    ]
                },
                video: {
                    optional: [
                        {
                            sourceId: currentVideoSource
                        }
                    ]
                }
            }, onCaptureSuccess, onCaptureError);
        }
    };

    viewModel.visibleVideoSource = ko.computed(function() { return viewModel.currentSource() == "camera"; }, this);
    viewModel.visibleAudioSource = ko.computed(function() { return viewModel.currentSource() == "camera"; }, this);
    viewModel.visibleVideoId = ko.computed(function() { return viewModel.currentSource() == "yt"; }, this);
    viewModel.visibleUri = ko.computed(function() { return viewModel.currentSource() == "uri"; }, this);

    viewModel.audioSourceOptions = {
        dataSource: viewModel.audioSource,
        valueExpr: 'value',
        displayExpr: 'text',
        value: viewModel.currentAudioSource,
        visible: viewModel.visibleAudioSource
    };

    viewModel.videoSourceOptions = {
        dataSource: viewModel.videoSource,
        valueExpr: 'value',
        displayExpr: 'text',
        value: viewModel.currentVideoSource,
        visible: viewModel.visibleVideoSource
    };

    viewModel.videoIdOptions = {
        placeholder: 'Enter Yt videoId',
        value: viewModel.videoId,
        visible: viewModel.visibleVideoId
    };

    viewModel.uriOptions = {
        placeholder: 'Enter URI',
        value: viewModel.uri,
        visible: viewModel.visibleUri
    };

    viewModel.hidePopupOptions = {
        text: 'Start',
        onClick: viewModel.hidePopup
    };

    viewModel.viewRendered = function(e) {
        //The MediaStream interface represents a stream of media content. A stream consists of several tracks, like video or audio tracks.
        if (typeof MediaStreamTrack.getSources === 'undefined') {
            DevExpress.ui.notify('This browser does not support MediaStreamTrack.\n\nTry Chrome Canary.');
        } else {
            MediaStreamTrack.getSources(gotSources);
        }
        viewModel.showPopup();
    };

    viewModel.viewShown = function(e) {
    };

    viewModel.viewHidden = function(e) {
    };

    return viewModel;
};