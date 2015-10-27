/// <reference path="../Libs/jasmine/dist/jasmine-standalone-2.1.3/lib/jasmine-2.1.3/jasmine.js" />
/// <reference path="../Libs/jasmine/dist/jasmine-standalone-2.1.3/lib/jasmine-2.1.3/boot.js" />
define(["Game/Point", "easeljs"], function (Point) {
    describe("Point Spec", function () {
        var point;
        beforeEach(function () {
            point = new Point(new Image(), 1, 1);
        });

        it("Should have a value", function () {
            expect(point).not.toBe(null);
        });

        it("Should return a bitmap", function () {
            var bitmap = point.Create(1,1);
            expect(bitmap instanceof createjs.Bitmap).toBeTruthy();

            expect(bitmap.x).toEqual(1);
        });

        it("Should Destroy each bitmap", function () {
            var point1 = new Point(new Image());
            var point2 = new Point(new Image());

            var bitmap1 = point1.Create(2, 2);
            var bitmap2 = point2.Create(3, 3);

            expect(bitmap1 instanceof createjs.Bitmap).toBeTruthy();
            expect(bitmap2 instanceof createjs.Bitmap).toBeTruthy();

            expect(bitmap1).not.toBeNull();
            expect(bitmap2).not.toBeNull();

            expect(bitmap1).toEqual(point1.GetBitmap());
            point1.Destroy();
            expect(bitmap1).not.toEqual(point1.GetBitmap());
            expect(point1.GetBitmap()).toBeNull();
        })
    });
})