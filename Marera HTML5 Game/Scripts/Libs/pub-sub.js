define(["jquery"], function ($) {
    var obj = $({});
    $.each({
        trigger: 'publish',
        on: 'subscribe',
        off: 'unsubscribe'
    }, function (key, value) {
        $[value] = function () {
            obj[key].apply(obj, arguments);
        };
    });
});