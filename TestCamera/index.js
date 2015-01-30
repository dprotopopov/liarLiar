window.TestCamera = window.TestCamera || {};

$(function() {
    TestCamera.app = new DevExpress.framework.html.HtmlApplication({
        namespace: TestCamera,
        defaultLayout: TestCamera.config.defaultLayout,
        navigation: TestCamera.config.navigation
    });
    TestCamera.app.router.register(":view/:id", { view: "home", id: undefined });

    TestCamera.app.navigate();

});

TestCamera.pictureSource;   // picture source
TestCamera.destinationType; // sets the format of returned value 

// Wait for Cordova to connect with the device
//
document.addEventListener("deviceready", onDeviceReady, false);

// Cordova is ready to be used!
//
function onDeviceReady() {
    TestCamera.pictureSource = navigator.camera.PictureSourceType;
    TestCamera.destinationType = navigator.camera.DestinationType;
}