/// <reference path="~/Scripts/Libs/requirejs/require.js"></reference>
/// <reference path="~/Scripts/Libs/jquery/dist/jquery.js"></reference>
/// <reference path="~/Scripts/Libs/EaselJS/lib/easeljs-0.7.1.combined.js"></reference>
define(["Game/Game", "Game/Scene", "Game/Spaceship", "jquery", "pub_sub", "easeljs", "collision", "bootstrap"], function (Game, Scene, Spaceship) {
    //the ticker event handler
    var tickerFn;

    /* Toggles game sounds. Event listener
    * @params: evt: the event that the listener receives
    */
    var toggleMute = function (evt) {
        if (evt.type === "sound/mute") {
            createjs.Sound.setMute(true);
        } else {
            createjs.Sound.setMute(false);
        }
    };

    /* Game over screen.
    * @params: 
    *   @scene: The scene factory
    *   @flyingScene: The previous shown screen
    *   @game: The game class.
    */
    var EndGame = function (scene, flyingScene, game) {
        //stop game and stop listen to touch
        flyingScene.ToggleTouch(false);
        createjs.Ticker.off("tick", tickerFn);

        //create the game over screen
        var endScene = scene.CreateScene({
            area: { width: game.Stage.canvas.width, height: game.Stage.canvas.height }, //the dimensions of the screen
            bgColor: "rgba(28, 28, 28, 0.7)", //the background color
            Stage: game.Stage, //the stage object
            Score: game.Score, //the game score
            Header: { font: "48px Gloria Hallelujah", color: "#fff" }, //the font properties of the header
            SubHeader: { font: "36px Gloria Hallelujah", color: "#fff" }, //the font properties of the subheader
            Points: { font: "36px Gloria Hallelujah", color: "#fff" }, //the font properties of the points text
            SceneType: "end" //the name of the screen, to provide to factory
        });
        //add the text for the game over scene
        endScene.AddText();
        //set the main container on screen
        endScene.AddAllSceneComponents();

        $("#Refresh").attr("disabled", false);
        $("#Refresh").off("click").on("click", function () {
            endScene.Clear();
            createjs.Sound.removeAllSounds();
            $("#Refresh").attr("disabled", true);
            $("#StartGame").attr("disabled", false);
            //window.location.reload(true);
        });
    };

    /* The first game screen. It's an event listener.
    *  @params:
    *   @game: The game object.
    *   evt: The event object
    */
    var BeginGame = function (game, evt) {
        //initialize collision method for collision detection
        var collisionMethod = ndgmr.checkPixelCollision;
        createjs.Ticker._inited = false;
        createjs.Ticker.init();
        //listen for mute, continue sound events
        $.subscribe("sound/mute", toggleMute);
        $.subscribe("sound/continue", toggleMute);

        //create a scene
        var scene = new Scene();

        //create the flying scene from the factory method
        var flyingScene = scene.CreateScene({
            Background: game.Queue.getResult("sky"), //the background image
            Stage: game.Stage, //the stage object
            Music: "bgmusic", //the id of music resource
            SceneType: "flying" //the name of the scene to provide to factory
        });

        //Adds all the specified components to screen and start listen to touch events
        flyingScene.ToggleTouch(true);
        flyingScene.AddAllSceneComponents();

        //create the spaceship
        //registration point centers the bitmap to the specified X and Y coords
        var spaceShip = new Spaceship({
            Fly: [0, 15], //the instances of the sprite
            Height: 100, //the height of the object
            Width: 100, //the width of the object
            RegistrationPointX: 50, //the registration point in X 
            RegistrationPointY: 50, //the registration point in Y
            Texture: "Images/shipsprites.png", //the object 2d texture
            CanvasWidth: game.Canvas.width, //the canvas width
            CanvasHeight: game.Canvas.height //the canvas height
        });

        //create the points, set them and add them on screen
        var randomPoints = flyingScene.GenerateRandomPoints({
            area: {
                width: game.Canvas.width,
                height: game.Canvas.height
            }, //the area to spread the points
            size: 24, //the dimensions of each point
            count: (40 + Math.random() * 70).toFixed(0), //how many points are displayed on screen
            imgURL: game.Queue.getResult("coin") //the texture for the point object
        });
        flyingScene.SetPointsOnScreen(randomPoints);
        for (var i = 0; i < randomPoints.length; i++) {
            flyingScene.AddComponent(randomPoints[i].GetBitmap());
        }
        //play the bg music
        flyingScene.PlayMusic({ loop: -1 });

        //show the button to manage sounds
        $("#Sound").removeAttr("disabled");

        //begin the spaceship animation, add it on screen and display the textual components
        spaceShip.ToggleAnimation("fly");
        flyingScene.AddComponent(spaceShip.ship);
        flyingScene.AddHUD();

        //update function
        tickerFn = createjs.Ticker.on("tick", function (evt) {

            //collision detection
            //if the spaceship intersects with the point, play a sound and delete it from screen
            for (var i = 0; i < randomPoints.length; i++) {
                var p = randomPoints[i];
                if (typeof p !== "undefined") {
                    var bmp = p.GetBitmap();
                    var intersection = collisionMethod(spaceShip.ship, bmp, 0);

                    if (intersection) {
                        p.Collision();
                        flyingScene.RemovePoint(bmp);
                        game.Score++;
                        flyingScene.UpdateScore(game.Score);
                        delete randomPoints[i];
                    }
                }
            }

            //start game countdown
            flyingScene.Countdown();
            //move the spaceship in the world
            spaceShip.Movement(game.Stage.mouseX, game.Stage.mouseY, evt.delta / 1000);
            //update game screen, based on FPS
            flyingScene.UpdateScene();
        });

        //listen for game end
        $.subscribe("game/end", EndGame.bind(this, scene, flyingScene, game));
    };

    /* When fail happens to the promise, logs it
    * @params:
    *   @err: The error object
    */
    var Fail = function (err) {
        console.log("Fail!");
        console.log(err);
    };

    /* Handler that gets the game underway
    * @params:
    *   @manifest: The manifest of the game resources
    *   @evt: The event object for the handler
    */
    var StartButtonHandler = function (manifest, evt) {
        $("#myModal").modal("show");
        $("#StartGame").attr("disabled", "disabled");

        //Initialize stage and kickoff the game
        var canvas = $("#canvas")[0];
        var game = new Game.Initialize(canvas, 0);
        game.SetFPS(60);
        game.Score = 0;
        game.AssetLoader(manifest).then(function() {
            $("#myModal").modal("hide");
            BeginGame.bind(this, game)();
        }, Fail);
    };

    /* Manages the sound for the application. Toggles the mute based on button click */
    var SoundManager = function () {
        var btn = $(this);
        var btnIcon = btn.children("i").first();
        if (btnIcon.is(".fa-volume-up")) {
            btn.removeClass("btn-success").addClass("btn-danger");
            btnIcon.removeClass("fa-volume-up").addClass("fa-volume-off");
            //turn off sounds
            $.publish("sound/mute");
        } else {
            btn.removeClass("btn-danger").addClass("btn-success");
            btnIcon.removeClass("fa-volume-off").addClass("fa-volume-up");
            //turn on sounds
            $.publish("sound/continue");
        }
    }

    /* When the page loads */
    $(document).ready(function () {
        $("span.copyright-date").text(new Date().getFullYear());

        //the manifest of the game resources
        var manifest = [
            { id: "sky", src: "Images/sky.png" },
            { id: "ship", src: "Images/ship.png" },
            { id: "coin", src: "Images/Coin.png" },
            { id: "coinhit", src: "Audio/126413_1666767-lq.mp3" },
            { id: "bgmusic", src: "Audio/Podington_Bear_-_Gentle_Chase.mp3" }
        ];

        //event listeners on click events
        $(document).on("click", "#StartGame", StartButtonHandler.bind(this, manifest));
        $(document).on("click", "#Sound", SoundManager);
    });
});