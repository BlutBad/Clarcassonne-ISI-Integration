var spritesAlien = {
    ship: { sx: 0, sy: 0, w: 37, h: 42, frames: 1 },
    missile: { sx: 0, sy: 30, w: 2, h: 10, frames: 1 },
    enemy_purple: { sx: 37, sy: 0, w: 42, h: 43, frames: 1 },
    enemy_bee: { sx: 79, sy: 0, w: 37, h: 43, frames: 1 },
    enemy_ship: { sx: 116, sy: 0, w: 42, h: 43, frames: 1 },
    enemy_circle: { sx: 158, sy: 0, w: 32, h: 33, frames: 1 },
    explosion: { sx: 0, sy: 64, w: 64, h: 64, frames: 12 },
	 fireball: { sx: 0, sy: 64, w: 64, h: 64, frames: 1 },
    enemy_missile: { sx: 9, sy: 42, w: 3, h: 20, frame: 1 }
};


var enemies = {

    // straight s�lo tiene el par�metro E para la velocidad vertical,
    // por lo que se mueve hacia abajo a velocidad constante.
    straight: { x: 0,   y: -50, sprite: 'enemy_ship', health: 10, 
		E: 100 },

    //  ltr (left to right) tiene velocidad constante vertical pero
    //  tiene par�metros B y C que le dotan de una velocidad
    //  horizontal sinusoidal suave.
    ltr:      { x: 0,   y: -100, sprite: 'enemy_purple', health: 10, 
		B: 75, C: 1, E: 100  },

    // circle tiene velocidad sinusoidal vx e vy, que junto al
    // par�metro H de desplazamiento en el tiempo le dotan de un
    // movimiento circular.
    circle:   { x: 250,   y: -50, sprite: 'enemy_circle', health: 10, 
		A: 0,  B: -100, C: 1, E: 20, F: 100, G: 1, H: Math.PI/2 },
    circle2:   { x: 250,   y: -50, sprite: 'enemy_circle', health: 10, 
		A: 0,  B: -100, C: 1, E: 20, F: 100, G: 1, H: Math.PI/6 },

    //  wiggle y step tienen los mismos par�metros pero con diferentes
    //  magnitudes que les hacen serpentear de manera diferente seg�n
    //  van bajando.
    wiggle:   { x: 100, y: -50, sprite: 'enemy_bee', health: 20, 
		B: 50, C: 4, E: 100 },
    step:     { x: 0,   y: -50, sprite: 'enemy_circle', health: 10,
		B: 150, C: 1.2, E: 75 }
};


var OBJECT_PLAYER = 1,
OBJECT_PLAYER_PROJECTILE = 2,
OBJECT_ENEMY = 4,
OBJECT_ENEMY_PROJECTILE = 8,
OBJECT_POWERUP = 16;

var startGameAlien = function() {
    GameAlien.setBoard(0,new Starfield(20,0.4,100,true));
    GameAlien.setBoard(1,new Starfield(50,0.6,100));
    GameAlien.setBoard(2,new Starfield(100,1.0,50));
    GameAlien.setBoard(3,new TitleScreenAlien("Alien Invasion", 
                                    "Press fire to start playing",
                                    playGameAlien1));
	GameAlien.setBoard(5,new GameAlienPoints(0));
};

var collision1;
var collision2;


// Definici�n del nivel LevelAlien1.  

// Est� definido por una colecci�n de
// bater�as de naves enemigas, una por fila. Para cada fila, los
// enemigos de esa bater�a se comienzan a crear cuando llega el
// Comienzo de la bater�a, y se est�n creando hasta que llega el Fin
// de la bater�a, con una separaci�n entre cada dos enemigos creados
// de Frecuencia ms.  Para cada tanda de enemigos se especifica su
// tipo para poder encontrar su plantilla en enemies, y par�metros
// override que substituyen a los de la plantilla en enemies para ese
// enemigo.

var LevelAlien1 = [
  //  Comienzo, Fin,   Frecuencia,  Tipo,       Override
    [ 0,        4000,  500,         'step'                 ],
    [ 6000,     13000, 800,         'ltr'                  ],
    [ 10000,    16000, 400,         'circle'               ],
    [ 17800,    20000, 500,         'straight', { x: 50  } ],
    [ 18200,    20000, 500,         'straight', { x: 90  } ],
    [ 18200,    20000, 500,         'straight', { x: 10  } ],
    [ 22000,    25000, 400,         'wiggle',   { x: 150 } ],
    [ 22000,    25000, 400,         'wiggle',   { x: 100 } ]
];

var LevelAlien2 = [
  //  Comienzo, Fin,   Frecuencia,  Tipo,       Override
	[ 0,         4000, 400,         'circle2'     ],	
	[ 3000,      7000, 400,         'circle2'     ],
	[ 6000,      10000, 400,        'circle2'     ],
	[ 6000,     13000, 500,         'straight', { x: 230  } ],
	[ 6000,     13000, 500,         'straight', { x: 50  } ],
	[ 13000,    16000, 400,         'wiggle',   { x: 50 } ],
   	[ 13000,    16000, 400,         'wiggle',   { x: 230 } ],
	[ 13000,    16000, 400,         'wiggle',   { x: 80 } ],
    	[ 13000,    16000, 400,         'wiggle',   { x: 200 } ],
	[ 16000,    25000, 800,         'ltr'                  ],
	[ 18000,    25000,  500,         'step'                 ]
];


var playGameAlien1 = function() {
    var board = new GameAlienBoard();
    board.add(new PlayerShip());

    // Se a�ade un nuevo nivel al tablero de juego, pasando la definici�n de
    // nivel LevelAlien1 y la funci�n callback a la que llamar si se ha
    // ganado el juego
    board.add(new LevelAlien(LevelAlien1, nextLevel));
    GameAlien.setBoard(3,board);
	GameAlien.points=0;
};

var playGameAlien2 = function() {
    var board = new GameAlienBoard();
    board.add(new PlayerShip());

    board.add(new LevelAlien(LevelAlien2, winGameAlien));
    GameAlien.setBoard(3,board);
};

var share = function() {
	$(".tweetbtn").html("<iframe allowtransparency='true' frameborder='0' scrolling='no'"+
                        "src='https://platform.twitter.com/widgets/tweet_button.html?text=He jugado a Alien Invasion en lowerlayers.meteor.com y he obtenido "+GameAlien.points+" puntos"+"'"+
                         "style='width:130px; height:20px;'></iframe>");                   
	$(".fbsharebtn").html("<iframe src='//www.facebook.com/plugins/like.php?href=https%3A%2F%2Flowerlayers.meteor.com&amp;width&amp;ref=hola&amp;layout=standard&amp;action=like&amp;show_faces=true&amp;share=true&amp;height=80' scrolling='no' frameborder='0' style='border:none; overflow:hidden; height:80px;' allowTransparency='true'></iframe>");
	$(".gsharebtn").html("<a href='https://plus.google.com/share?url=http://lowerlayers.meteor.com/' onclick='javascript:window.open(this.href,"+
                          "'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;'><img src='https://www.gstatic.com/images/icons/gplus-32.png' alt='Share on Google+'/></a>");
}

var profits = function() {	
	if (GameAlien.points == 10000){
		var userid = Partidas.findOne({_id:Session.get("match_id")}).jugadores[0].user_id;
		var gameid = Partidas.findOne({_id:Session.get("match_id")}).game_id;
		var profits = Games.findOne({name: "Alien_Invasion"}).profits;
		var profitusers;
		var saved = false;
		profits.forEach(function(elem) {
			if (elem.title=="Has hecho 10000 pts")
				profitusers=elem.users;
		});
		profitusers.forEach(function(elem) {
			if (elem==userid){
				saved=true;
			}
		});
		if (saved==false){
            var icon = $(window.document.createElement('img')).attr('src', 'awardicon.png');
			$.ambiance({message: icon, title: "Has obtenido 10000 puntos!",type: "success"});
			profitusers.push(userid);
			Games.update({_id: gameid }, {$set: {profits: [{title:"Has hecho 10000 pts", users:profitusers }] } });
		}
	}
};

// Llamada cuando han desaparecido todos los enemigos del nivel sin
// que alcancen a la nave del jugador
var winGameAlien = function() {
	Meteor.call("matchFinish", Session.get("match_id"), Session.get("game_id"), GameAlien.points);
	share();
    GameAlien.setBoard(3,new TitleScreenAlien("You win!", "Press fire to play again", playGameAlien1));
};


// Llamada cuando la nave del jugador ha sido alcanzada, para
// finalizar el juego
var loseGameAlien = function() {
	Meteor.call("matchFinish", Session.get("match_id"), Session.get("game_id"), GameAlien.points);
	share();
    GameAlien.setBoard(3,new TitleScreenAlien("You lose!", "Press fire to play again", playGameAlien1));
};

var nextLevel = function() {
    GameAlien.setBoard(3,new TitleScreenAlien("LevelAlien 1 Completed!", "Press fire to play LevelAlien 2", playGameAlien2));
};



// Si se construye con clear==true no se pintan estrellas con fondo
// transparente, sino fondo en negro
var Starfield = function(speed,opacity,numStars,clear) {

    // Creamos un objeto canvas, no visible en la p�gina Web
    var stars = $('<canvas/>')
	.attr('width', GameAlien.width)
	.attr('height', GameAlien.height)[0];
    // Sin jQuery lo hacemos asi:
    //    var stars = document.createElement("canvas");
    //    stars.width = GameAlien.width; 
    //    stars.height = GameAlien.height;


    var starCtx = stars.getContext("2d");

    var offset = 0;

    // Si la opci�n clear est� activada, el fondo del canvas se pinta
    // de negro. Utilizado en el nivel mas profundo de estrellas
    if(clear) {
	starCtx.fillStyle = "#000";
	starCtx.fillRect(0,0,stars.width,stars.height);
    }

    // Dibujamos las estrellas blancas sobre el canvas no visible,
    // como rect�ngulos de 2 pixeles en posiciones aleatorias
    starCtx.fillStyle = "#FFF";
    starCtx.globalAlpha = opacity; // nivel de transparencia de las estrellas
    for(var i=0;i<numStars;i++) {
	starCtx.fillRect(Math.floor(Math.random()*stars.width),
			 Math.floor(Math.random()*stars.height),
			 2,
			 2);
    }

    // Se llama a este m�todo en cada frame de la animaci�n para dibujar
    // el campo de estrellas en la pantalla
    this.draw = function(ctx) {
	var intOffset = Math.floor(offset);
	var remaining = stars.height - intOffset;

	// Dibujar sobre el contexto ctx la parte de arriba del canvas con
	// las estrellas
	if(intOffset > 0) {
	    ctx.drawImage(stars,
			  0, remaining,
			  stars.width, intOffset,
			  0, 0,
			  stars.width, intOffset);
	}

	// Dibujar sobre el contexto ctx la parte inferior del canvas con
	// las estrellas
	if(remaining > 0) {
	    ctx.drawImage(stars,
			  0, 0,
			  stars.width, remaining,
			  0, intOffset,
			  stars.width, remaining);
	}
    }

    // En cada paso de la animaci�n, movemos el campo de estrellas
    // modificando el offset seg�n la cantidad de tiempo transcurrida
    this.step = function(dt) {
	offset += dt * speed; // velocidad = espacio / tiempo
	offset = offset % stars.height;
    }
}


// La clase PlayerShip tambien ofrece la interfaz step(), draw() para
// poder ser dibujada desde el bucle principal del juego
var PlayerShip = function() { 
    this.setup('ship', { vx: 0, reloadTime: 0.25, maxVel: 200 });

    this.reload = this.reloadTime;
    this.x = GameAlien.width/2 - this.w / 2;
    this.y = GameAlien.height - GameAlien.playerOffset - this.h;

	this.pressed = true;

    this.step = function(dt) {
		if(GameAlien.keys['left']) { this.vx = -this.maxVel; }
		else if(GameAlien.keys['right']) { this.vx = this.maxVel; }
		else { this.vx = 0; }

		this.x += this.vx * dt;

		if(this.x < 0) { this.x = 0; }
		else if(this.x > GameAlien.width - this.w) { 
			this.x = GameAlien.width - this.w;
		}

		this.reload-=dt;
		if(!GameAlien.keys['fire']) { this.pressed=true; }

		if(GameAlien.keys['fire'] && this.reload < 0 && this.pressed) {
			// Esta pulsada la tecla de disparo y ya ha pasado el tiempo reload
			//
			this.pressed = false;
			this.reload = this.reloadTime;

			// Se a�aden al GameAlienboard 2 misiles 
			this.board.add(new PlayerMissile(this.x,this.y+this.h/2));
			this.board.add(new PlayerMissile(this.x+this.w,this.y+this.h/2));
		}
		if (GameAlien.keys['fireleft'] && this.reload < 0) {
			this.board.add(new FireBall(this.x,this.y+this.h/2,"left"));
			this.reload = this.reloadTime;	
		} 
		if (GameAlien.keys['fireright'] && this.reload < 0) {
			this.board.add(new FireBall(this.x+this.w,this.y+this.h/2,"right"));
			this.reload = this.reloadTime;
		}
    };
};


// Heredamos del prototipo new Sprite()
PlayerShip.prototype = new SpriteAlien();
PlayerShip.prototype.type = OBJECT_PLAYER;


// Llamada cuando una nave enemiga colisiona con la nave del usuario
PlayerShip.prototype.hit = function(damage) {
    if(this.board.remove(this)) {
        this.board.add(new Explosion(this.x + this.w/2, this.y + this.h/2));
        setTimeout(loseGameAlien,800);    
    }
};


// Constructor para los misiles.
// Los metodos de esta clase los a�adimos a su prototipo. De esta
// forma solo existe una copia de cada uno para todos los misiles, y
// no una copia para cada objeto misil
var PlayerMissile = function(x,y) {
    this.setup('missile',{ vy: -700, damage: 10 });
    this.x = x - this.w/2;
    this.y = y - this.h; 
};

PlayerMissile.prototype = new SpriteAlien();
PlayerMissile.prototype.type = OBJECT_PLAYER_PROJECTILE;

PlayerMissile.prototype.step = function(dt)  {
    this.y += this.vy * dt;
    var collision = this.board.collide(this,OBJECT_ENEMY);
    if(collision) {
	collision.hit(this.damage);
	this.board.remove(this);
    } else if(this.y < -this.h) { 
	this.board.remove(this); 
    }
};

var FireBall = function(x,y,direction) {
	this.setup('fireball',{vy: -1300,vx: -150,direction: direction, damage: 20});

    this.x = x - this.w/4.5; 
    this.y = y - this.h/2; 

	if (direction == "right"){
		this.vx = -this.vx;
	}
};

FireBall.prototype = new SpriteAlien();
FireBall.prototype.type = OBJECT_POWERUP;

FireBall.prototype.step = function(dt)  {
    this.y += this.vy * dt;
    this.x += this.vx * dt;
    this.vy += 120; 

	var collision = this.board.collide(this,OBJECT_ENEMY);
    if(collision) {
		collision.hit(this.damage);
    }else if(this.y > 480){
		 this.board.remove(this); 
	}


};

FireBall.prototype.hit = function (){
	this.board.remove(this);
}



// Constructor para las naves enemigas. Un enemigo se define mediante
// un conjunto de propiedades provenientes de 3 sitios distintos, que
// se aplican  este orden:
// 1. baseParameters: propiedad del prototipo con los valores por
//    omisi�n para las constantes A..H de las velocidades vx y vy
// 2. par�metros definidos en la plantilla blueprint que se pasa como
//    par�metro al crear el enemigo. Pueden modificar las propiedades
//    definidas en 1.
// 3. par�metros definidos en el par�metro override. Pueden modificar
// las propiedades definidas en 1 y 2.

// El c�digo del constructor a�ade las propiedades en este orden al
// objeto que crea.

// Para definir un nuevo tipo de enemigo: se elige una plantilla
// existente o se crea una nueva, y se pasan opcionalmente en override
// valores alternativos para los par�metros de la plantilla o de
// baseParameters. Ver c�mo se a�aden 2 enemigos en la funci�n
// playGameAlien() de este fichero.

var Enemy = function(blueprint,override) {
    // Cada instancia tendr� las propiedades definidas en baseParameters
    this.merge(this.baseParameters);

    // Se llama a setup para que se a�adan como propiedades el sprite
    // y los atributos definidos en el par�metro blueprint, pudiendo
    // estas modificar los definidos en baseParameters
    this.setup(blueprint.sprite,blueprint);

    // Se copian los atributos definidos en el par�metro override,
    // pudiendo modificar los definidos en baseParameters y en
    // blueprint
    this.merge(override);
};

Enemy.prototype = new SpriteAlien();
Enemy.prototype.type = OBJECT_ENEMY;

// Inicializa los par�metros de las ecuacione de velocidad, y t, que
// es la edad de este enemigo
Enemy.prototype.baseParameters = { A: 0, B: 0, C: 0, D: 0, 
                                   E: 0, F: 0, G: 0, H: 0,
                                   t: 0, reloadTime: 0.75, 
                                   reload: 0 };


Enemy.prototype.step = function(dt) {
    // Actualizamos la edad
    this.t += dt;

    // El patr�n de movimiento lo dictan las ecuaciones que se utilizar�n
    // para calcular las componentes x e y de su velocidad: vx e vy:
    
    // vx tiene una componente constante A, y otra que va variando
    // c�clicamente en funci�n de la edad del enemigo (t), seg�n la
    // sinuisoide definida por las constantes B, C y D.
    // A: componente constante de la velocidad horizontal
    // B: fuerza de la velocidad horizontal sinusoidal
    // C: periodo de la velocidad horizontal sinusoidal
    // D: desplazamiento en el tiempo de la velocidad horizontal sinusoidal
    this.vx = this.A + this.B * Math.sin(this.C * this.t + this.D);

    // vy tiene una componente constante E, y otra que va variando
    // c�clicamente en funci�n de la edad del enemigo (t), seg�n la
    // sinuisoide definida por las constantes F, G y H.
    // E: componente constante de la velocidad vertical
    // F: fuerza de la velocidad vertical sinusoidal
    // G: periodo de la velocidad vertical sinusoidal
    // H: desplazamiento en el tiempo de la velocidad vertical sinusoidal
    this.vy = this.E + this.F * Math.sin(this.G * this.t + this.H);

    this.x += this.vx * dt;
    this.y += this.vy * dt;

    var collision = this.board.collide(this,OBJECT_PLAYER);
    if(collision) {
	collision.hit(this.damage);
	this.board.remove(this);
    }

    if(this.reload <= 0 && Math.random() < (this.firePercentage || 0.01) ) {
	this.reload = this.reloadTime;
	if(this.missiles == 2) {
	    this.board.add(new EnemyMissile(this.x+this.w-2,this.y+this.h/2));
	    this.board.add(new EnemyMissile(this.x+2,this.y+this.h/2));
	} else {
	    this.board.add(new EnemyMissile(this.x+this.w/2,this.y+this.h));
	}

    }
    this.reload-=dt;

    if(this.y > GameAlien.height ||
       this.x < -this.w ||
       this.x > GameAlien.width) {
	this.board.remove(this);
    }
};

Enemy.prototype.hit = function(damage) {
    this.health -= damage;
    if(this.health <=0) {
	if(this.board.remove(this)) {
	    GameAlien.points += this.points || 100;
	    profits(GameAlien.points);
	    this.board.add(new Explosion(this.x + this.w/2, 
					 this.y + this.h/2));
	}
    }
};


var EnemyMissile = function(x,y) {
    this.setup('enemy_missile',{ vy: 200, damage: 10 });
    this.x = x - this.w/2;
    this.y = y;
};

EnemyMissile.prototype = new SpriteAlien();
EnemyMissile.prototype.type = OBJECT_ENEMY_PROJECTILE;

EnemyMissile.prototype.step = function(dt)  {
    this.y += this.vy * dt;
    collision1 = this.board.collide(this,OBJECT_PLAYER)
    if(collision1) {
		collision1.hit(this.damage);
	 this.board.remove(this);
    	} else if(this.y > GameAlien.height) {
		this.board.remove(this); 
    }
	collision2 = this.board.collide(this,OBJECT_POWERUP)
	if(collision2) {
		collision2.hit();
		this.board.remove(this);
	}
};



// Constructor para la explosi�n

var Explosion = function(centerX,centerY) {
    this.setup('explosion', { frame: 0 });
    this.x = centerX - this.w/2;
    this.y = centerY - this.h/2;
    this.subFrame = 0;
};

Explosion.prototype = new SpriteAlien();

Explosion.prototype.step = function(dt) {
    this.frame = Math.floor(this.subFrame++ / 2);
    if(this.subFrame >= 24) {
	this.board.remove(this);
    }
}
