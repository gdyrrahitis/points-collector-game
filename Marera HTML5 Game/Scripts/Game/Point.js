/// <reference path="~/Scripts/Libs/requirejs/require.js"></reference>
/// <reference path="~/Scripts/Libs/jquery/dist/jquery.js"></reference>
/// <reference path="~/Scripts/Libs/EaselJS/lib/easeljs-0.7.1.combined.js"></reference>
define(["easeljs", "soundjs"], function () {
    /* Class that represents a point on screen
    * @params:
    *   @Texture: the point texture
    */
    var Point = function (Texture) {
        //if the point isnt instantiated, instantiate it
        if (!(this instanceof Point)) {
            return new Point(Texture);
        }
        var texture = Texture, bitmap;

        /* Creates a point on screen, in the specified position
        * @params:
        *   @PosX: the X coords
        *   @PosY: the Y coords
        */
        var Create = function (PosX, PosY) {
            bitmap = new createjs.Bitmap(texture);
            bitmap.x = PosX;
            bitmap.y = PosY;

            return bitmap;
        };

        /* Plays a sound. Called on collision */
        var Collision = function () {
            createjs.Sound.play("coinhit", {volume: 0.3});
        }

        /* Removes the point listeners, so it can be deleted later. */
        var Destroy = function () {
            bitmap.removeAllEventListeners();
        };

        /* Retrieves the point bitmap */
        var GetBitmap = function () {
            return bitmap;
        };

        //public API
        return {
            Create: Create,
            Destroy: Destroy,
            GetBitmap: GetBitmap,
            Collision: Collision
        }
    };
    return Point;
});