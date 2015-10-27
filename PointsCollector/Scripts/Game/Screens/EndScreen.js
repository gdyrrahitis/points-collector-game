/// <reference path="~/Scripts/Libs/requirejs/require.js"></reference>
/// <reference path="~/Scripts/Libs/jquery/dist/jquery.js"></reference>
/// <reference path="~/Scripts/Libs/EaselJS/lib/easeljs-0.7.1.combined.js"></reference>
define(["easeljs"], function () {
    /* The game over screen
    * @params:
    *    @options: {
                area: { width: int, height: int }, 
                bgColor: color, 
                Stage: createjs.Stage, 
                Score: int,  
                Header: {font: string, color: color},
                SubHeader: {font: string, color: color},
                Points: {font: string, color: color}
        }
    */
    var EndScreen = function (options) {
        //the stage object is required
        if (!options.Stage) throw new Error("Stage is required!");

        //a private function to place a component to specific coords.
        //@component: an easeljs component
        //@coords: an object with x,y and regX, regY coords
        function Place(component, coords) {
            //set x,y coords
            component.x = coords.x;
            component.y = coords.y;

            //set registration point
            component.regX = coords.regX;
            component.regY = coords.regY;
        }

        //screen components
        var _Container = new createjs.Container(),
            _Shape = new createjs.Shape(),
            _Stage = options.Stage,
            _Canvas = _Stage.canvas,
            _HeaderText = new createjs.Text("Game Over", options.Header.font, options.Header.color),
            _SubHeaderText = new createjs.Text("Points", options.SubHeader.font, options.SubHeader.color),
            _Points = new createjs.Text(options.Score, options.Points.font, options.Points.color),
            _CenterX = _Canvas.width / 2,
            _CenterY = _Canvas.height / 2;

        //Place shape first
        _Shape.graphics.beginFill(options.bgColor).drawRect(0, 0, options.area.width, options.area.height);
        Place(_Shape, {
            x: 0,
            y: 0,
            regX: 0,
            regY: 0
        });

        //Place _HeaderText
        Place(_HeaderText, {
            x: _CenterX,
            y: _CenterY,
            regX: _HeaderText.getMeasuredWidth() / 2,
            regY: _HeaderText.getMeasuredHeight()
        });

        //Place _SubHeaderText
        Place(_SubHeaderText, {
            x: _CenterX,
            y: _CenterY,
            regX: _SubHeaderText.getMeasuredWidth() / 2,
            regY: -(_HeaderText.getMeasuredHeight() / 2 + _SubHeaderText.getMeasuredHeight() / 2)
        });

        //Place _Points
        Place(_Points, {
            x: _CenterX,
            y: _CenterY,
            regX: _Points.getMeasuredWidth() / 2,
            regY: -(_HeaderText.getMeasuredHeight() / 2 + _SubHeaderText.getMeasuredHeight() / 2 + _Points.getMeasuredHeight())
        });

        //add the shape to the container
        _Container.addChild(_Shape);

        /* Adds the necessary components to the stage object */
        this.AddAllSceneComponents = function () {
            _Stage.addChild(_Container);
        }

        /* Adds the textual components */
        this.AddText = function () {
            _Container.addChild(_HeaderText, _SubHeaderText, _Points);
        }

        /* Clears screen, removes all listeners and children from the container */
        this.Clear = function () {
            _Container.removeAllEventListeners();
            _Container.removeAllChildren();

            //removes the container last
            _Stage.removeChildren(_Container);
        }
    };

    return EndScreen;
});