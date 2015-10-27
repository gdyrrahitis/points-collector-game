/// <reference path="~/Scripts/Libs/requirejs/require.js"></reference>
/// <reference path="~/Scripts/Libs/jquery/dist/jquery.js"></reference>
/// <reference path="~/Scripts/Libs/EaselJS/lib/easeljs-0.7.1.combined.js"></reference>
/// <reference path="../Libs/SoundJS/lib/soundjs-0.5.2.combined.js" />

define(["Game/Screens/FlyingScreen", "Game/Screens/MainScreen", "Game/Screens/EndScreen", "easeljs", "soundjs"], function (FlyingScreen, MainScreen, EndScreen) {
    /* The Factory Method. Implements the Factory Method Pattern */
    var Scene = function () { };
    Scene.prototype.SceneClass = FlyingScreen;
    //Creates a Scene based the input
    Scene.prototype.CreateScene = function (options) {
        switch (options.SceneType) {
            case "main":
                this.SceneClass = MainScreen;
                break;
            case "end":
                this.SceneClass = EndScreen;
                break;
            case "flying":
                this.SceneClass = FlyingScreen;
                break;
        }
        return new this.SceneClass(options);
    };

    return Scene;
});