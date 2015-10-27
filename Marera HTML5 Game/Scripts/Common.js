/// <reference path="~/Scripts/Libs/requirejs/require.js"></reference>
require.config({
    //baseUrl: "Scripts/",
    paths: {
        "jquery": "Libs/jquery/dist/jquery",
        "text": "Libs/requirejs-text/text",
        "json": "Libs/requirejs-plugins/src/json",
        "easeljs": "Libs/EaselJS/lib/easeljs-0.7.1.combined",
        "tweenjs": "Libs/TweenJS/lib/tweenjs-0.5.1.combined",
        "soundjs": "Libs/SoundJS/lib/soundjs-0.5.2.combined",
        "preloadjs": "Libs/PreloadJS/lib/preloadjs-0.4.1.combined",
        "pub_sub": "Libs/pub-sub",
        "collision": "Libs/Collision-Detection-for-EaselJS/src/ndgmr.Collision"
    },
    shims: {
        "easeljs": { exports: "createjs" },
        "jquery": { exports: "$" },
        "tweenjs": { deps: ["easeljs"], exports: "Tween" },
        "soundjs": { deps: ["easeljs"], exports: "Sound" },
        "preloadjs": { deps: ["easeljs"], exports: "Preload" },
        "collision": { deps: ["easeljs"], exports: "ndgmr" }
    },
    deps: ['app/app']
});