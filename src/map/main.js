enchant();

window.onload = function() {
    var game = new Game(320, 320);
    game.fps = 20;
    game.preload('chara1.png', 'map1.png');
    game.onload = function() {
        var map = new Map(16, 16);
        map.image = game.assets['map1.png'];
        map.loadData(
            [
                [131, 131, 131, 131, 131, 131, 131, 131, 131],
                [131, 132, 132, 132, 132, 132, 132, 132, 131],
                [131, 132, 132, 132, 132, 132, 132, 132, 131],
                [131, 132, 132, 132, 132, 132, 132, 132, 131],
                [131, 132, 132, 132, 132, 132, 132, 132, 131],
                [131, 132, 132, 132, 132, 132, 132, 132, 131],
                [131, 131, 131, 131, 131, 131, 131, 131, 131]
            ]
        );

        game.rootScene.addChild(map);
    };
    game.start();
};