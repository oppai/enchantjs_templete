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

window.onload = function() {
    var game = new Game(320, 320);
    game.fps = 20;
    game.preload('chara1.png', 'map1.png');
    game.onload = function() {
        var map = new Map(16, 16);
        map.image = game.assets['map1.png'];
        map.loadData( mapGen(5,3) );
        game.rootScene.addChild(map);
    };
    game.start();
};
