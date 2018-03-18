sap.ui.controller("content.Overview", {
// controller logic goes here
onInit: function() {
// this function is called when the view is instantiated.
// Used to modify the view before displaying

// first, we have to define the odata model
var dataModel = new sap.ui.model.odata.ODataModel(
"models/GBI.xsodata"
);
// now we can bind the odata model to the SalesOrders
// view, so controls within the view can use it
this.getView().setModel(dataModel);


var oVizFrame = this.byId('barchart');
var oVizPopover = this.byId('vizPopover');
// after that, connecting is easy
oVizPopover.connect(oVizFrame.getVizUid());

},
onExit: function() {
// this function is called when the view is destroyed.
// Used for clean-up activities
},
onAfterRendering: function() {
// this function is called when the view has been rendered.
// Used for post-rendering manipulation of the HTML code


var drs = this.byId('drs');
// because we catch undefined values in our handleChange function,
// we do not care if anything is set in the daterangeslider
drs.fireChange();





},
onBeforeRendering: function() {
// this function is called before the view is re-rendered // (not before first rendering)
},

// this function updates the bar chart
handleChange: function(oEvent) {
// first, we have to get the new values of the two dates
// from our date range selector
var fromDate = oEvent.getSource().getDateValue();
var toDate = oEvent.getSource().getSecondDateValue();
// if there is no fromDate set, we'll set
// it to the 01/01/1970
if (!fromDate) {
fromDate = new Date(1970,1,1);
}
// if there is no toDate set, we'll set
// it to the current date
if (!toDate) {
toDate = new Date();
}
// next, we want to update the filters on our flattened data set
// to manipulate it. first , we have to get it
var fd = this.getView().byId("flattenedData");
var monthFilter = new sap.ui.model.Filter(
"MONTH",
sap.ui.model.FilterOperator.BT,
fromDate.getMonth(),
toDate.getMonth()
);
var yearFilter = new sap.ui.model.Filter(
"YEAR",
sap.ui.model.FilterOperator.BT,
fromDate.getFullYear(),
toDate.getFullYear()
);
// in addition, we want to sort our data by net revenue
// the second (boolean) value defines if the data is sorted
// in descending order
var sorter = new sap.ui.model.Sorter(
"NET_REVENUE",
true
);
fd.bindData(
"/SalesOrders",
null,
[sorter],
[
monthFilter,
yearFilter
]
);
// last, we need to update the chart
// first, we need to get it
var vizFrame = this.getView().byId("barchart");
// then, we update the chart, but only the data
vizFrame.vizUpdate({
'data' : fd
});
}


});