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
    var canvas_w = canvas.width
    var canvas_h = canvas.height
    var shape = new Shape()
    var g = shape.graphics

    var pos = []

    for (var i = 0; i < 50; i ++) {
        var x = canvas_w * Math.random() | 0
        var y = canvas_h * Math.random() | 0
        var r = 50 * Math.random() | 0
        pos.push([x, y, r])
    }

    for (var r = 255; r > 0; r -= 16) {
        for (var i in pos) {
            var x = pos[i][0]
            var y = pos[i][1]
            var r_base = pos[i][2]

            var col = ctx.getImageData(x, y, 1, 1).data[0]

            g.beginFill(Graphics.getRGB(255 - r, 0, 0, 1)).drawCircle(x, y, r_base + r)
            stage.addChild(shape)
        }
    }

    stage.update();

    // g.clear()

    // for (var i in pos) {
    //     g.beginStroke("white").beginFill("red").drawCircle(pos[i][0], pos[i][1], pos[i][2]).endStroke()
    // }
    // stage.update();
}
