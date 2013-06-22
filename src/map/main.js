enchant();

Array.prototype.shuffle = function() {
	var i = this.length;
	while(i){
		var j = Math.floor(Math.random()*i);
		var t = this[--i];
		this[i] = this[j];
		this[j] = t;
	}
	
	return this;
}

/*
 * Generate Map
 */
function mapGen(col,row) {
	// initialize map
	var map = new Array(row*10);
	for(i=0;i<map.length;i++){
		map[i] = new Array(col*10);
		for(j=0;j<map[i].length;j++){
			map[i][j] = 131;
		}
	}
	
	// choice room indexes
	var indexes = (function (num){
		var ids = new Array(num);
		for(i=0;i<ids.length;i++){
			ids[i] = i;
		}
		
		var len = Math.floor(Math.random()*(num/6) + num/3);
		for(i=0;i<len;i++) ids.pop(); 
		
		return ids;
	})(col*row);
	
	return map;
}

/*
 * Generate mini Map
 */
function minimapGen(x,y,map){
	var mini_map = new Group();
	mini_map.x = mini_map.y = 40;
	const WALL = map[0][0];
	const T_SIZE = 5;

	for (var i = 0; i < map.length; i++) {
		for (var j = 0; j < map[i].length; j++) {
			if(map[i][j]==WALL){
				var chip = new Sprite(T_SIZE,T_SIZE);
				chip.width = chip.height = T_SIZE;
				chip.x = j*T_SIZE;chip.y = i*T_SIZE;
				chip.backgroundColor = 'rgba(10,10,120,0.5)';
				mini_map.addChild(chip);
			}
		};
	};

	return mini_map;
}

window.onload = function() {
    var game = new Game(320, 320);
    game.fps = 20;
    game.preload('chara1.png', 'map1.png');
    game.onload = function() {
        var map = new Map(16, 16);
        var map_data = mapGen(5,3);
        var mini_map = new minimapGen(5,3,map_data);

        map.image = game.assets['map1.png'];
        map.loadData( map_data );

        game.rootScene.addChild(map);
        game.rootScene.addChild(mini_map);
    };
    game.start();
};
