TestCamera.home = function (params) {
    function onPhotoDataSuccess(imageData) {
        var smallImage = $('#smallImage');
        smallImage.css('display', 'block');
        smallImage.attr('src', 'data:image/jpeg;base64,' + imageData);
    }
    function onPhotoURISuccess(imageURI) {
        var largeImage = $('#largeImage');
        largeImage.css('display', 'block');
        largeImage.attr('src', imageURI);
    }
    function getPhoto(source) {
        navigator.camera.getPicture(onPhotoURISuccess, onFail, {
            quality: 50,
            destinationType: TestCamera.destinationType.FILE_URI,
            sourceType: source
        });
    } 
    function onFail(message) {
        alert('Failed because: ' + message);
    }
    var viewModel = {
        capturePhoto: function (e) {
            navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                quality: 50,
                destinationType: TestCamera.destinationType.DATA_URL
            });
        },
        capturePhotoEdit: function (e) {
            navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                quality: 20,
                allowEdit: true,
                destinationType: TestCamera.destinationType.DATA_URL
            });
        },
        photoLibrary: function (e) {
            getPhoto(TestCamera.pictureSource.PHOTOLIBRARY);
        },
        photoAlbum: function (e) {
            getPhoto(TestCamera.pictureSource.SAVEDPHOTOALBUM);
        }
    };

    return viewModel;
};