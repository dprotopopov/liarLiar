/// <reference path="../js/jquery-1.9.1.min.js" />
/// <reference path="../js/knockout-2.2.1.js" />
/// <reference path="../js/dx.all.js" />

(function() {
    TestCamera.db = {

        sampleData: new DevExpress.data.RestStore({
            url: "/data/sampleData.json"
        })

    };
})();