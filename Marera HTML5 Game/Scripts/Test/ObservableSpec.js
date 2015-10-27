/// <reference path="../Libs/jasmine/dist/jasmine-standalone-2.1.3/lib/jasmine-2.1.3/jasmine.js" />
/// <reference path="../Libs/jasmine/dist/jasmine-standalone-2.1.3/lib/jasmine-2.1.3/boot.js" />
define(["Libs/ObservableProperty"], function (Observable) {
    describe("Observable Property Spec", function () {
        it("Should create a property", function () {
            var observable = new Observable("MyProp", 0);
            expect(observable.MyProp()).toEqual(0);
        });

        it("Should listen to property changes", function () {
            var observable = new Observable("MyProp", 0);
            observable.onChanging(function (obs, val) {
                if (val > 100) {
                    //the value is 150, the one > 100
                    expect(val).toEqual(150);
                    return false;
                }

                //from change to 15
                expect(val).toEqual(15)
                return true;
            });
            observable.onChanged(function (obs) {
                //the property has changed to 15. At 150 this callback wont run
                expect(obs.MyProp()).toEqual(15);
            });

            //prop hasnt changed, so expect the default value
            expect(observable.MyProp()).toEqual(0);

            //prop changes
            observable.MyProp(15);

            //change to a value > 100. The property wont change
            observable.MyProp(150);
        })
    })
})