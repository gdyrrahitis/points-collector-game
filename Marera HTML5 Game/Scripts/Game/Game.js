/// <reference path="~/Scripts/Libs/requirejs/require.js"></reference>
/// <reference path="~/Scripts/Libs/jquery/dist/jquery.js"></reference>
/// <reference path="~/Scripts/Libs/EaselJS/lib/easeljs-0.7.1.combined.js"></reference>
define(["jquery", "easeljs", "soundjs", "preloadjs"], function () {
    var Game = (function () {
        var instance;
 
        var Initialize = function (Canvas, Score) {
            Object.defineProperties(Game, {
                _canvas: { value: {} },
                _center: { value: {} },
                _stage: { value: {} },
                _score: { value: {} },
                _queue: { value: {} },
                Canvas: {
                    get: function () {
                        return this._canvas;
                    },
                    set: function (val) {
                        this._canvas = val;
                    },
                    configurable: true,
                    enumerable: true
                },
                Center: {
                    get: function () {
                        return this._center;
                    },
                    set: function (val) {
                        this._center = val;
                    },
                    configurable: true,
                    enumerable: true
                },
                Stage: {
                    get: function () {
                        return this._stage;
                    },
                    set: function (val) {
                        this._stage = val;
                    },
                    configurable: true,
                    enumerable: true
                },
                Score: {
                    get: function () {
                        return this._score;
                    },
                    set: function (val) {
                        this._score = val;
                    },
                    configurable: true,
                    enumerable: true
                },
                Queue: {
                    get: function () {
                        return this._queue;
                    },
                    set: function (val) {
                        this._queue = val;
                    },
                    configurable: true,
                    enumerable: true
                }
            });

            this.Canvas = Canvas;
            this.Center = { CenterX: this.Canvas.width / 2, CenterY: this.Canvas.height / 2 };
            this.Stage = new createjs.Stage(this.Canvas);
            this.Score = Score;
            this.AssetLoader = function (assets) {
                var deffered = $.Deferred();

                this.Queue.addEventListener("complete", function (evt) {
                    deffered.resolve({ success: true, event: evt });
                });

                this.Queue.loadManifest(assets);

                return deffered.promise();
            };

            this.SetFPS = function (val) {
                createjs.Ticker.setFPS(val || 60);
            }

            //initialize asset queue
            var queue = new createjs.LoadQueue(false);
            queue.installPlugin(createjs.Sound);
            this.Queue = queue;

            return this;
        };

        return {
            Initialize: function (Canvas, Score) {
                if (!instance) {
                    instance = Initialize(Canvas, Score);
                }
                return instance;
            }
        }
    })();

    return Game;
})