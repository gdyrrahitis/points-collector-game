define(["Game/Test"], function () {
    describe("Simple test", function () {
        var f = myFunc();
        it("Should return hello", function () {
            expect(f).toBe("Hello")
        });
    })
});


