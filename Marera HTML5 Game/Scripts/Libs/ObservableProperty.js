/// <reference path="~/Scripts/Libs/requirejs/require.js"></reference>
/// <reference path="~/Scripts/Libs/jquery/dist/jquery.js"></reference>
define([], function () {
    var Observable = function (propName, /*Optional*/defaultValue) {
        //store callbacks
        var evtPropChanging = [], evtPropChanged = [];

        this[propName] = function (val) {
            if (typeof val !== "undefined" && val !== defaultValue) {
                for (var i = 0; i < evtPropChanging.length; i++) {
                    if (!evtPropChanging[i](this, val)) {
                        return defaultValue;
                    }
                }

                defaultValue = val;
                for (var j = 0; j < evtPropChanged.length; j++) {
                    evtPropChanged[j](this);
                }
            }
            return defaultValue;
        };

        this.onChanging = function (callback) {
            evtPropChanging.push(callback);
        }

        this.onChanged = function (callback) {
            evtPropChanged.push(callback);
        }
    };

    return Observable;
});