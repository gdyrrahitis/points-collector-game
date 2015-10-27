/// <reference path="../Libs/jasmine/dist/jasmine-standalone-2.1.3/lib/jasmine-2.1.3/jasmine.js" />
/// <reference path="../Libs/jasmine/dist/jasmine-standalone-2.1.3/lib/jasmine-2.1.3/boot.js" />
define(["Game/Spaceship", "easeljs"], function (Spaceship) {
    describe("Spaceship Spec", function () {
        var spaceship;
        beforeEach(function () {
            spaceship = new Spaceship({
                Fly: [0, 15], //to pass
                Height: 100, //to pass
                Width: 100, //to pass
                RegistrationPointX: 50, //to pass
                RegistrationPointY: 50, //to pass
                Texture: "Images/shipsprites.png", //to pass
                CanvasWidth: 800, //to pass
                CanvasHeight: 800 //to pass
            });
        });

        it("Should have a value", function () {
            expect(spaceship).not.toBe(null);
        });

        it("Should not throw an exception at AnimationToggle", function () {
            var ship = spaceship.ToggleAnimation("fly");
            expect("Spaceship").toBe(ship.name);
        });

        it("Should not throw an exception at Movement", function () {
            var ship = spaceship.Movement(1, 1, 0.331);
            expect(true).toBe(true);
        })
    });
})