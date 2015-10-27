/// <reference path="~/Scripts/Libs/requirejs/require.js"></reference>
/// <reference path="~/Scripts/Libs/jquery/dist/jquery.js"></reference>
/// <reference path="~/Scripts/Libs/EaselJS/lib/easeljs-0.7.1.combined.js"></reference>
define(["jquery", "easeljs"], function ($) {
    var Spaceship = function (options) {
        //TODO: REFACTOR EVERYTHING

        this.config = $.extend({}, this.options, options);
        var config = this.config;

        var spriteSheet = new createjs.SpriteSheet({
            animations: {
                fly: config.Fly
            },
            images: [config.Texture],
            frames: {
                regX: config.RegistrationPointX,
                regY: config.RegistrationPointY,
                height: config.Height,
                width: config.Width
            }
        });

        this.ship = new createjs.Sprite(spriteSheet);
        //Named it in order to identify it later
        this.ship.name = "Spaceship";

        //place it in a random position somewhere in canvas
        this.ship.x = options.CanvasWidth / 2;//(Math.random() * options.CanvasWidth).toFixed(0);
        this.ship.y = options.CanvasHeight / 2;//(Math.random() * options.CanvasHeight).toFixed(0);

        this.ship.scaleX = 0.5;
        this.ship.scaleY = 0.5;
    };

    Spaceship.prototype.ToggleAnimation = function (animation) {
        //var that = this, ship = that.ship;
        if (this.ship) {
            if (this.ship.paused) {
                this.ship.gotoAndPlay(animation);
            } else {
                this.ship.gotoAndStop(animation);
            }
        } else {
            throw new Error("Ship isn't initialized!");
        }
        return this.ship;
    };

    Spaceship.prototype.Movement = function (MouseX, MouseY, Delta) {
        var config = this.config;
        /* Slows the rotation a bit */
        var diffX = MouseX - this.ship.x;
        var diffY = MouseY - this.ship.y;

        /* If the mouse is still dont move the mouse toward it, but let it continue     
            its course. Otherwise move it toward the pointer */
        if (MouseX === config.PrevMouseX && MouseY === config.PrevMouseY) {
            this.ship.rotation = config.PrevAngle;
            this.ship.x += -Math.sin(((config.AngleAdjustment + config.PrevAngle) * Math.PI / 180)) * (config.Speed * Delta);
            this.ship.y += Math.cos(((config.AngleAdjustment + config.PrevAngle) * Math.PI / 180)) * (config.Speed * Delta);
        } else {
            config.PrevMouseX = MouseX;
            config.PrevMouseY = MouseY;
            config.Angle = Math.atan2(diffY, diffX) * 180 / Math.PI;
            config.PrevAngle = config.Angle;

            this.ship.rotation = config.Angle;
            this.ship.x += -Math.sin(((config.AngleAdjustment + config.PrevAngle) * Math.PI / 180)) * (config.Speed * Delta);
            this.ship.y += Math.cos(((config.AngleAdjustment + config.PrevAngle) * Math.PI / 180)) * (config.Speed * Delta);
        }

        /* If the ship gets out of boundaries, it gets it back, at the opposite side */
        if (this.ship.y > (config.CanvasHeight + config.Height)) this.ship.y = -config.Height;
        if (this.ship.y < -config.Height) this.ship.y = (config.CanvasHeight + config.Height);

        if (this.ship.x < -config.Width) this.ship.x = (config.CanvasWidth + config.Width);
        if (this.ship.x > (config.CanvasWidth + config.Width)) this.ship.x = -config.Width;
    };

    Spaceship.prototype.options = {
        Angle: 45,
        AngleAdjustment: -90,
        Fly: [], //to pass
        Height: 0, //to pass
        Width: 0, //to pass
        PrevAngle: 45,
        PrevMouseX: 0,
        PrevMouseY: 0,
        RegistrationPointX: 0, //to pass
        RegistrationPointY: 0, //to pass
        Speed: 200,
        Texture: '', //to pass
        CanvasWidth: 0, //to pass
        CanvasHeight: 0, //to pass
        scaleX: 0.5,
        scaleY: 0.5
    };

    return Spaceship;
});