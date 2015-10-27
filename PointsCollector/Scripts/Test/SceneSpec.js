/// <reference path="../Libs/jasmine/dist/jasmine-standalone-2.1.3/lib/jasmine-2.1.3/jasmine.js" />
/// <reference path="../Libs/jasmine/dist/jasmine-standalone-2.1.3/lib/jasmine-2.1.3/boot.js" />
define(["Game/Scene", "Game/Screens/FlyingScreen", "easeljs"], function (Scene, FlyingScreen) {
    describe("Scene Spec", function () {
        var scene;
        beforeEach(function () {
            scene = new Scene();
        });

        it("Should Screen be defined", function () {
            expect(scene).toBeDefined();
        });

        it("Should have a CreateScene method", function () {
            expect(scene.CreateScene).toBeDefined();
        });

        it("Should create an instance", function () {
            var flyingScreen = scene.CreateScene({
                Background: 'Image',
                Stage: "gtrg",
                Music: "hvar",
                SceneType: "flying"
            });
            
            expect(flyingScreen instanceof FlyingScreen).toBeTruthy();
        });
    });
})