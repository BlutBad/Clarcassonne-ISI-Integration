// Original game from:
// http://www.lostdecadegames.com/how-to-make-a-simple-html5-canvas-game/
// Slight modifications by Gregorio Robles <grex@gsyc.urjc.es>
// to meet the criteria of a canvas class for DAT @ Univ. Rey Juan Carlos

canvasApp = function() {  

	var canvas = document.getElementById("gamecanvasHero");
	var ctx = canvas.getContext("2d");
	gameOver= false;
	var level = 0;
	var princessesCaught = 0;
	var levelmax = 0;
	var monster = {speed:40};
	var record = 0;

	// Background image
	var bgReady = false;
	var bgImage = new Image();
	bgImage.onload = function () {
		bgReady = true;
	};
	bgImage.src = "TheHero/images/background.png";

	// Hero image
	var heroReady = false;
	var heroImage = new Image();
	heroImage.onload = function () {
		heroReady = true;
	};
	heroImage.src = "TheHero/images/hero.png";

	// princess image
	var princessReady = false;
	var princessImage = new Image();
	princessImage.onload = function () {
		princessReady = true;
	};
	princessImage.src = "TheHero/images/princess.png";

	// stone and monster image
	var myStones= new Array(); //array stones
	var myMonsters= new Array(); //array stones

	

	// Sound
	var snd = new Audio("TheHero/audio/cash.wav");
	var sndover = new Audio("TheHero/audio/gameover.wav");
	// Game objects
	var hero = {
		speed: 256 // movement in pixels per second
	};
	var princess = {};


	var stone = {};


	var keysDown = {};
	//var KEY_CODES_Alien = { 37:'left', 39:'right', 32 :'fire', 66: 'fireleft', 78: 'fireright' };

	herosetupInput = function() {
		$(window).click(function(event){
			if (event.target.id == "gamecanvasHero"){
				focusCanvaxh = true;
			}else{
				focusCanvaxh = false;
			}
		});
	}

	$(window).keydown(function(event){
		if (focusCanvaxh){
			keysDown[event.keyCode] = true;
			return false;
		}
	});

	$(window).keyup(function(event){	
		if (focusCanvaxh){
			delete keysDown[event.keyCode];
			return false;
		}
	});


	/*var keysDown = {};

	addEventListener("keydown", function (e) {
		keysDown[e.keyCode] = true;
	}, false);

	addEventListener("keyup", function (e) {
		delete keysDown[e.keyCode];
	}, false);*/

	hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Reset the game when the player catches a princess
	var reset = function () {

		// Throw the princess somewhere on the screen randomly
		princess.x = 32 + (Math.random() * (canvas.width - 96));
		princess.y = 32 + (Math.random() * (canvas.height - 96));

		if (level ==0){
			var sto ={};var mnsto ={};
			sto.x = 0;
			sto.y = 0;
			mnsto.x = 0;
			mnsto.y = 0;
			myStones[0]=sto;
			myMonsters[0]=mnsto;
		}else if (level > 0){
			for(var i=0;i<level;i+=1){
				var st ={};
				st.x = 32 + (Math.random() * (canvas.width - 96));
				st.y = 32 + (Math.random() * (canvas.height - 96));
				st.image = new Image();
				st.image.src = "TheHero/images/stone.png";
				myStones[i]=st;
	
				var mnst ={};
				mnst.x = 32 + (Math.random() * (canvas.width - 96));
				mnst.y = 32 + (Math.random() * (canvas.height - 96));
				mnst.image = new Image();
				mnst.image.src = "TheHero/images/monster.png";
				myMonsters[i]=mnst;
			//para no permitir que se ponga una piedra en la pos de la princesa o del heroe o el monster donde el heroe
				if (touching(princess,myStones[i]) || touching(hero,myStones[i]) || touching(hero,myMonsters[i]) || touching(princess,myMonsters[i]) ){ 
					reset();
				}
			}	
		}
		
		
	};

	// Update game objects
	var update = function (modifier) {
		if(level == 0){
			aux = 1;
		}else{
			aux= level;
		}

		if(!gameOver){
			for(var i=0;i<aux;i+=1){
				//no tocar piedras
				ishero =true;
				avoidStones (i,hero,aux,ishero,modifier);
				ishero =false;
				avoidStones (i,myMonsters[i],aux,ishero,modifier);
				if (level > 0){//te persiguen monstruos
					if (myMonsters[i].x < hero.x){
						myMonsters[i].x += (monster.speed *modifier)/aux;
					}else{
						myMonsters[i].x -= (monster.speed *modifier)/aux;
					}

					if (myMonsters[i].y < hero.y){
						myMonsters[i].y += (monster.speed *modifier)/aux;	
					}else{
						myMonsters[i].y -= (monster.speed *modifier)/aux;
					}
				}
			}

		}	

		for(var i=0;i<aux;i+=1){
			if (touching(hero,myMonsters[i])) {
				gameOver= true;
			}
		}
		

		// Are they touching?		
		if (touching(hero,princess)) {
			princessesCaught++;

			if ((princessesCaught % 3==0)){//nivel
				level++;
				monster.speed +=30;
			}

			if (princessesCaught > record){//record
				record = princessesCaught;
			}
			snd.play();
			reset();
		}
	};	

	function avoidStones (i,carac,aux,ishero,modifier){
		if (38 in keysDown && carac.y > 35 || !ishero) { // Player holding up
			if (touching(carac,myStones[i])){
				carac.y += 5;
			}else if(ishero){
				carac.y -= carac.speed * (modifier/aux);
			}
		}
		if (40 in keysDown && carac.y < 412 || !ishero) { // Player holding down
			if (touching(carac,myStones[i])){
				carac.y -= 5;
			}else if(ishero){
				carac.y += carac.speed * (modifier/aux);
			}
		}
		if (37 in keysDown && carac.x > 35 || !ishero) { // Player holding left
			if (touching(carac,myStones[i])){
				carac.x += 5;
			}else if(ishero){
				carac.x -= carac.speed * (modifier/aux);
			}
		}
		if (39 in keysDown && carac.x < 445 || !ishero) { // Player holding right
			if (touching(carac,myStones[i])){
				carac.x -= 5;
			}else if(ishero){
				carac.x += carac.speed * (modifier/aux);
			}
		}

	}


	function touching (carac1,carac2){
		if (
			carac1.x <= (carac2.x + 30)
			&& carac2.x <= (carac1.x + 30)
			&& carac1.y <= (carac2.y + 30)
			&& carac2.y <= (carac1.y + 30)
		) {
			return true
		}else{
			return false
		}
	};

	// Draw everything
	var render = function () {
		if (bgReady) {
			ctx.drawImage(bgImage, 0, 0);
		}

		if (heroReady) {
			ctx.drawImage(heroImage, hero.x, hero.y);
		}

		if (princessReady) {
			ctx.drawImage(princessImage, princess.x, princess.y);
		}

		if (level >0){
			for(var i=0;i<level;i+=1){
				ctx.drawImage(myStones[i].image, myStones[i].x, myStones[i].y);
				ctx.drawImage(myMonsters[i].image, myMonsters[i].x, myMonsters[i].y);
			}
		}
		

		
		if(gameOver){
			ctx.fillText("Game Over.Hit Enter", 32, 32);
			hero.x = canvas.width / 2;
			hero.y = canvas.height / 2;
			level = 0;
			Meteor.call("matchFinish", Session.get("match_id"), Session.get("game_id"), princessesCaught);
			share();
			monster.speed =40;

			sndover.play();
			princessesCaught=0;
			if (13 in keysDown){
				gameOver= false;
	
			}
		}else {
			// Score
			ctx.fillStyle = "rgb(250, 250, 250)";
			ctx.font = "24px Helvetica";
			ctx.textAlign = "left";
			ctx.textBaseline = "top";
			ctx.fillText("Princesses caught: " + princessesCaught + " Level: " + level, 32, 32);
		}

	};

	// The main game loop
	var main = function () {
		var now = Date.now();
		var delta = now - then;

		update(delta / 1000);
		render();

		then = now;
	};

	// Let's play this game!
	reset();
	var then = Date.now();
	herosetupInput();

	timerPrin = setInterval(main, 1);
}

var share = function() {
	$(".tweetbtn").html("<iframe allowtransparency='true' frameborder='0' scrolling='no'"+
                        "src='https://platform.twitter.com/widgets/tweet_button.html?text=He jugado a The Hero en lowerlayers.meteor.com y he atrapado "+princessesCaught+" princesas"+"'"+
                         "style='width:130px; height:20px;'></iframe>");                   
	$(".fbsharebtn").html("<iframe src='//www.facebook.com/plugins/like.php?href=https%3A%2F%2Flowerlayers.meteor.com&amp;width&amp;ref=hola&amp;layout=standard&amp;action=like&amp;show_faces=true&amp;share=true&amp;height=80' scrolling='no' frameborder='0' style='border:none; overflow:hidden; height:80px;' allowTransparency='true'></iframe>");
	$(".gsharebtn").html("<a href='https://plus.google.com/share?url=http://lowerlayers.meteor.com/' onclick='javascript:window.open(this.href,"+
                          "'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;'><img src='https://www.gstatic.com/images/icons/gplus-32.png' alt='Share on Google+'/></a>");
}
