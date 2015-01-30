
// NOTE object below must be a valid JSON
window.liarLiar = $.extend(true, window.liarLiar, {
    "config": {
        "layoutSet": "split",
        "navigation": [
            {
                "title": "Capture",
                "onExecute": "#MainView",
                "icon": "info"
            },
            {
                "title": "About",
                "onExecute": "#About",
                "root": false
            }
        ]
    }
});
