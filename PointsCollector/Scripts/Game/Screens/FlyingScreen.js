/// <reference path="~/Scripts/Libs/requirejs/require.js"></reference>
/// <reference path="~/Scripts/Libs/jquery/dist/jquery.js"></reference>
/// <reference path="~/Scripts/Libs/EaselJS/lib/easeljs-0.7.1.combined.js"></reference>
/// <reference path="../Libs/SoundJS/lib/soundjs-0.5.2.combined.js" />
define(["Game/Point", "Libs/ObservableProperty", "easeljs", "jquery", "pub_sub"], function (Point, Observable) {
    var FlyingScreen = function (options) {
        //Throw an error if the required fields aren't present
        if (!(options.Background) || !(options.Stage)) { throw new Error("The Background and Stage options are required!"); }

        var that = this,
            _Stage,
            _Music,
            _bg,
            _score,
            _timer,
            time,
            gameTime = 30,
            _points = [];

        Object.defineProperties(FlyingScreen, {
            Background: {
                set: function (val) {
                    //TODO
                    _bg = val;

                },
                get: function () {
                    //TODO
                    return _bg;
                },
                configurable: true,
                enumerable: true
            }
        });

        var bg = new createjs.Shape(),
            //initialize game watch
            watch = new Observable("time", gameTime);

        //watch observable handlers
        watch.onChanging(function (w, val) {
            if (val <= 0) {
                //countdown ended
                //publish the game over event
                $.publish("game/end");
                return false;
            }
            return true;
        });

        watch.onChanged(function (w) {
            that.UpdateTime(w.time());
        });

        bg.name = options.Background.src;
        var matrix = new createjs.Matrix2D();
        matrix.scale(1, 2);
        bg.graphics.beginBitmapFill(options.Background, "repeat-x", matrix).drawRect(0, 0, options.Stage.canvas.width, options.Stage.canvas.height);
        this.Background = bg;

        _Music = options.Music;
        _Stage = options.Stage;

        _score = new createjs.Text("Score: " + (options.score || 0), "24px Gloria Hallelujah", "#333030");
        _score.x = _Stage.canvas.width - 10;
        _score.y = 0;
        _score.textAlign = "right";

        _timer = new createjs.Text("Time: " + (options.time || gameTime || 60), "24px Gloria Hallelujah", "#333030");
        _timer.x = 10;
        _timer.y = 0;

        this.UpdateScene = function () {
            _Stage.update();
        };

        this.GetPointsOnScene = function () {
            //TODO
            return _points;
        };

        this.GenerateRandomPoints = function (options) {
            //options --> { area: { width: int, height: int }, count: int, maxRadius: int, PointsClass: class }
            var width = options.area.width,
                height = options.area.height,
                size = options.size,
                count = options.count,
                points = [],
                imgURL = options.imgURL

            maxRadius = options.maxRadius,
            PointsClass = options.PointsClass;


            //var platforms = [],
            //        platformSize = 20,
            //        platformWidth = 800,
            //        platformHeight = 800;

            function generatePoints(k) {
                var placed = 0,
                    maxAttempts = k * 10;
                while (placed < k && maxAttempts > 0) {
                    var x = Math.floor(Math.random() * width),
                        y = Math.floor(24 + Math.random() * height),
                        available = true;
                    for (var point in points) {
                        if (Math.abs(point.x - x) < size && Math.abs(point.y - y) < size) {
                            available = false;
                            break;
                        }
                    }
                    if (available) {
                        var point = new Point(imgURL);
                        point.Create(x, y)

                        points.push(point);
                        placed += 1;
                    }
                    maxAttempts -= 1;
                }
                return points;
            }
            return generatePoints(count);
        };

        this.SetPointsOnScreen = function (val) {
            //TODO
            _points = val;
        };

        this.PlayMusic = function (options) {
            createjs.Sound.play(_Music, options)
        };

        this.StopMusic = function () {
            createjs.Sound.stop(_Music);
        };

        this.AddAllSceneComponents = function () {
            _Stage.addChild(this.Background);
        }

        this.AddComponent = function (component) {
            _Stage.addChild(component);
        };

        this.RemoveComponent = function (component) {
            _Stage.removeChild(component);
        };

        this.ClearAllEvents = function () {
            _Stage.removeAllEventListeners();
        };

        this.AddHUD = function () {
            _Stage.addChild(_score);
            _Stage.addChild(_timer);
        }

        this.UpdateTime = function (second) {
            _timer.text = "Time: " + second;
        }

        this.Countdown = function () {
            var tickerTime = (createjs.Ticker.getTime() / 1000).toFixed(0);
            if (!time) time = (createjs.Ticker.getTime() / 1000).toFixed(0);
            if (tickerTime !== time && (gameTime - tickerTime) >= 0) {
                time = tickerTime;
                watch.time(gameTime - tickerTime);
                console.log(gameTime - tickerTime);
            }
        }

        this.RemovePoint = function (p) {
            _Stage.removeChild(p);
        };

        this.UpdateScore = function (score) {
            _score.text = "Score: " + score;
        }

        this.ToggleTouch = function (enable) {
            if (enable) {
                createjs.Touch.enable(_Stage);

            } else {
                createjs.Touch.disable(_Stage);
            }
        };
    };
    return FlyingScreen;
});