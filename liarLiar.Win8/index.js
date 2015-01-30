
$(function() {
    var startupView = "MainView";


    liarLiar.app = new DevExpress.framework.html.HtmlApplication({
        namespace: liarLiar,
        layoutSet: DevExpress.framework.html.layoutSets[liarLiar.config.layoutSet],
        navigation: liarLiar.config.navigation,
        commandMapping: liarLiar.config.commandMapping
    });

    $(window).unload(function() {
        liarLiar.app.saveState();
    });

    liarLiar.app.router.register(":view/:id", { view: startupView, id: undefined });
    liarLiar.app.navigate();
});