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
};
Array.prototype.contains = function(value){
	for(var i = 0; i < this.length; i++){
		if(this[i] === value){
			return true;
		}
	}
	return false;
};

/*
 * Generate Map
 */
function mapGen(col,row) {
	// initialize map
	var map = new Array(row*10);
	for(var i=0;i<map.length;i++){
		map[i] = new Array(col*10);
		for(var j=0;j<map[i].length;j++){
			map[i][j] = 131;
		}
	}
	
	// choice room indexes
	var indexes = (function (num){
		var ids = new Array(num);
		for(var i=0;i<ids.length;i++){
			ids[i] = i;
		}

		var len = Math.floor(Math.random()*(num/6) + num/3);
		ids.shuffle();
		for(var i=0;i<len;i++) ids.pop(); 
		
		ids.sort();
		return ids;
	})(col*row);

	console.log(indexes);

	// gen room
	for (var i = 0; i < indexes.length; i++) {
		//offset
		var offset_x = Math.floor(Math.floor(indexes[i]%col)*10);
		var offset_y = Math.floor(Math.floor(indexes[i]/col)*10);

		var random_h = Math.floor(Math.random()*3 + 5);
		var random_w = Math.floor(Math.random()*3 + 5);
		var h = Math.floor(5 - Math.floor(random_h/2));
		var w = Math.floor(5 - Math.floor(random_w/2));
		offset_y = offset_y + h;
		offset_x = offset_x + w;

		for (var j = offset_y; j < offset_y+random_h ; j++) {
			for (var k = offset_x; k < offset_x+random_w ; k++) {
				map[j][k] = 132;
			};
		};
	};

	
	var make_path = function(p,q){
		var pt_1 = [Math.floor(Math.floor(p%col)*10+4), Math.floor(Math.floor(p/col)*10+4)];
		var pt_2 = [Math.floor(Math.floor(q%col)*10+4), Math.floor(Math.floor(q/col)*10+4)];

		for (pt_1[0] ; pt_1[0] <= pt_2[0]; pt_1[0]++) {
			map[pt_1[1]][pt_1[0]] = 132;
		};
		for (pt_1[1] ; pt_1[1] <= pt_2[1]; pt_1[1]++) {
			map[pt_1[1]][pt_1[0]] = 132;
		};
	};

	// gen path
	for (var i = 0; i < indexes.length; i++) {
		var p = indexes[i];
		if(p%col !== col-1 && indexes.contains(p+1)){
			make_path(p,p+1);
		}
		if(indexes.contains(p+col)){
			make_path(p,p+col);
		}
	}
	
	return map;
}

/*
 * Generate mini Map
 */
function minimapGen(x,y,map){
	var mini_map = new Group();
	mini_map.x = mini_map.y = 40;
	const WALL = map[0][0];
	const T_SIZE = 4;

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
        var map_data = mapGen(6,4);
        var mini_map = new minimapGen(6,4,map_data);

        map.image = game.assets['map1.png'];
        map.loadData( map_data );

        game.rootScene.addChild(map);
        game.rootScene.addChild(mini_map);
    };
    game.start();
};
