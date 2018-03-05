var mainWindow = new Window("palette", "Expression Injector", undefined);
mainWindow.orientation = "column";

var groupOne = mainWindow.add("group", undefined, "groupOne");
groupOne.orientation = "row";
groupOne.alignment = "left";
var dropDown = groupOne.add("dropdownlist", undefined, ["Position", "Scale", "Opacity"]);
dropDown.selection = 0;

var groupTwo = mainWindow.add("group", undefined, "groupTwo");
groupTwo.orientation = "row";
var expressionText = groupTwo.add("edittext", undefined, "expression text");
expressionText.size = [150, 25];

var groupThree = mainWindow.add("group", undefined, "groupThree");
groupThree.orientation = "row";
groupThree.alignment = "right";
var applyButton = groupThree.add("button", undefined, "Apply Expression");


mainWindow.center();
mainWindow.show();

applyButton.onClick = function() {
        if(app.project.activeItem.selectedLayers.length < 1) {
            alert("Please select a layer to apply expressions to", "");
            return false;
            }
        else {
            app.beginUndoGroup("Expression Injection");
                injectExpression(app.project.activeItem.selectedLayers);
                app.endUndoGroup();
            }
    }

function injectExpression(layerArray) {
    for(var i = 0; i < layerArray.length; i++) {
        layerArray[i].property(getPropertyName()).expression = expressionText.text;
        }
    alert("Expressions applied successfully!", "");
    }

function getPropertyName() {
    switch(dropDown.selection.index) {
        case 0:
            return "Position";
        break;
        case 1:
            return "Scale";
        break;
        case 2:
            return "Opacity";
        break;
        }
    }