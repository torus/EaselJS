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

    var gen = (function () {
        var x = 100
        // var x = canvas_w / 2
        var y = canvas_h / 2
        var dir = -1.5
        var r = 63

        var next = function () {
            var prev_x = x
            var prev_y = y

            x += Math.cos(dir) * r * 2
            y += Math.sin(dir) * r * 2

            var col = ctx.getImageData(x, y, 1, 1).data[0]
            console.log("col", col)
            var prev_r = r
            r = Math.sqrt((x - prev_x) * (x - prev_x) +
                          (y - prev_y) * (y - prev_y)) - prev_r

            r = Math.min(255 - col, r)

            dir += 0.4

            return next
        }

        return function () {
            next = next()

            return {x: x, y: y, r: r}
        }
    })()

    var f = function (k) {
        if (k < 100) {
            var next = gen()
            var x = next.x
            var y = next.y
            var r = next.r

            if (r > 0) {
                pos.push([x, y, r])

                for (var r = 255; r > 0; r -= 16) {
                    for (var i in pos) {
                        var x = pos[i][0]
                        var y = pos[i][1]
                        var r_base = pos[i][2]

                        g.beginFill(Graphics.getRGB(255 - r + 15, 0, 0, 1)).
                            drawCircle(x, y, r_base + r)
                        stage.addChild(shape)
                    }
                }
                stage.update()
            }

            setTimeout(f, 1, k + 1)
        } else {
            for (var i in pos) {
                g.beginStroke("white").beginFill("red").drawCircle(pos[i][0], pos[i][1], pos[i][2]).endStroke()
            }
            stage.update();
        }
    }

    f(0)

    // g.clear()
}
