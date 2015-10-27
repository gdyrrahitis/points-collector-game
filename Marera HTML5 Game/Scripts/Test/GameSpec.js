/// <reference path="../Libs/jasmine/dist/jasmine-standalone-2.1.3/lib/jasmine-2.1.3/jasmine.js" />
/// <reference path="../Libs/jasmine/dist/jasmine-standalone-2.1.3/lib/jasmine-2.1.3/boot.js" />
define(["Game/Game", "easeljs"], function (Game) {
    describe("Game Spec", function () {
        var game, canvas;
        beforeEach(function () {
            canvas = { element: "#canvas", width: 100, height: 100 };
            game = new Game.Initialize(canvas, 0);
        });

        it("Should have a value", function () {
            expect(game).not.toBe(null);
        });

        it("Should return a canvas", function () {
            expect(game.Canvas).toEqual(canvas);
        });

        it("Should know Canvas's center", function () {
            expect(game.Center.CenterX).toEqual(50)
            expect(game.Center.CenterY).toEqual(50)
        })
    });
})