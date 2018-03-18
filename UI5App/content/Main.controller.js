// the controller for the view Main
sap.ui.controller("content.Main", { 
    
    
onInit: function() {


var shell = this.getView().byId("shell");
// if there is not content displayed,
// show the page of the first navigation item
if (shell.getContent().length === 0) {
// first, we need to check if there any workitems
// defined, otherwise we cannot load anything
var worksetItems = shell.getWorksetItems();
if (worksetItems.length > 0) {
// this line is doing the same thing
// as our "normal" navigation
shell.setContent(
this.getContent(worksetItems[0].getKey())
);
}
}





},
onExit: function() {
// this function is called when the view is destroyed.
// Used for clean-up activities
},
onAfterRendering: function() {
// this function is called when the view has been rendered.
// Used for post-rendering manipulation of the HTML code
},
onBeforeRendering: function() {
// this function is called before the view is re-rendered // (not before first rendering)
},


itemSelected: function(oEvent) {
var itemKey = oEvent.getParameter("key");
var oShell = oEvent.oSource;
var content = this.getContent(itemKey);
oShell.setContent(content, true);
},

getContent: function(key) {
    var content = null;
    
    switch (key) {
        case "overview":
            content = sap.ui.view({
            viewName: "content.Overview",
            type: sap.ui.core.mvc.ViewType.XML
            });
            break;
        case "salesOrders":
            content = sap.ui.view({
            // location and name of the view
            viewName: "content.SalesOrders",
            type: sap.ui.core.mvc.ViewType.XML
            });
            break;
        default:
            content = null; 
            break;
    }
    return content;
    
}
    
    
    
    
    
    
});