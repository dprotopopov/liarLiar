
// NOTE object below must be a valid JSON
window.liarLiar = $.extend(true, window.liarLiar, {
    "config": {
        "layoutSet": "navbar",
        "navigation": [
            {
                "title": "Capture",
                "onExecute": "#MainView",
                "icon": "info"
            },
            {
                "title": "About",
                "onExecute": "#About",
                "icon": "info"
            }
        ]
    }
});
