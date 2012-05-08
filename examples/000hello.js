function init() {
    // get a reference to the canvas we'll be working with:
    var canvas = document.getElementById("testCanvas");

    // create a stage object to work with the canvas. This is the top level node in the display list:
    var stage = new Stage(canvas);

    // Create a new Text object:
    var text = new Text("Hello Woooorld!", "36px Arial", "#777");

    // add the text as a child of the stage. This means it will be drawn any time the stage is updated
    // and that it's transformations will be relative to the stage coordinates:
    stage.addChild(text);

    // position the text on screen, relative to the stage coordinates:
    text.x = 360;
    text.y = 200;

    var ctx = canvas.getContext("2d")
    var w = canvas.width
    var h = canvas.height
    var shape = new Shape()
    var g = shape.graphics

    var pos = []

    for (var i = 0; i < 100; i ++) {
        var x = w * Math.random() | 0
        var y = h * Math.random() | 0

        if (ctx.getImageData(x, y, 1, 1).data[0] == 0) {
            g.beginFill(Graphics.getRGB(10, 0, 0, 0.1)).drawCircle(x, y, 60)
            stage.addChild(shape)
            pos.push([x, y])

            // call update on the stage to make it render the current display list to the canvas:
            stage.update();
        }
    }

    for (var i in pos) {
        g.beginStroke("white").beginFill("red").drawCircle(pos[i][0], pos[i][1], 30).endStroke()
    }
    stage.update();
}
