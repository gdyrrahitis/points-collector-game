/// <reference path="../Libs/jasmine/dist/jasmine-standalone-2.1.3/lib/jasmine-2.1.3/jasmine.js" />
/// <reference path="../Libs/jasmine/dist/jasmine-standalone-2.1.3/lib/jasmine-2.1.3/boot.js" />
define(["Game/Screens/FlyingScreen", "easeljs"], function (FlyingScreen) {
    describe("Flying Screen Spec", function () {
        var fs;
        beforeEach(function () {
            fs = new FlyingScreen({
                Background: 'Image',
                Stage: "gtrg",
                Music: "hvar",
                SceneType: "flying"
            });
            var my = new FlyingScreen({
                Background: 'Image1',
                Stage: "gtrg1",
                Music: "hvar1",
                SceneType: "flying"
            });
        });

        it("Should have a background", function () {
            expect(fs.Background instanceof createjs.Shape).toBeTruthy();
        });

        it("Should return a background per instance", function () {
            var fs1 = fs = new FlyingScreen({
                Background: 'Image1',
                Stage: "gtrg1",
                Music: "hvar1",
                SceneType: "flying"
            });
            var fs2 = fs = new FlyingScreen({
                Background: 'Image2',
                Stage: "gtrg2",
                Music: "hvar2",
                SceneType: "flying"
            });
            var srcArr1 = fs1.Background.name;
            expect("Sky-" + "Image1").toEqual(srcArr1);

            var srcArr2 = fs2.Background.name;
            expect("Sky-" + "Image2").toEqual(srcArr2);
        });

        it("Should create random non overlaping points", function () {
            var platforms = fs.GenerateRandomPoints({
                area: {
                    width: 800,
                    height: 800
                },
                count: 40,
                size: 20,
                imgURL: ""
            });
            expect(40).toEqual(platforms.length);

            //platforms.sort(function (a, b) {
            //    return a.x - b.x;
            //});
            //expect(platforms[0].x).toBeLessThan(platforms[1].x);
            //for (var i = 1; i < platforms.length; i++) {
            //    expect(platforms[i - 1].x).toBeLessThan(platforms[i].x);
            //}

            //platforms.sort(function (a, b) {
            //    return a.y - b.y;
            //});

            //expect(platforms[0].y).toBeLessThan(platforms[1].y);
            //for (var i = 1; i < platforms.length; i++) {
            //    expect(platforms[i - 1].y).toBeLessThan(platforms[i].y);
            //}
        });

        it("Should set and get points", function () {
            var platforms = fs.GenerateRandomPoints({
                area: {
                    width: 800,
                    height: 800
                },
                count: 40,
                size: 20,
                imgURL: ""
            });
            fs.SetPointsOnScreen(platforms);

            expect(platforms.length).toEqual(fs.GetPointsOnScene().length);
        });
    });
});