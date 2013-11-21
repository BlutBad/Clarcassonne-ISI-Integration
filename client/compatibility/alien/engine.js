// Alien Invasion utiliza duck typing para implementar como dibujar
// elementos en la pantalla (m�todo draw()) y para que actualicen su
// estado cada vez que el bucle de animaci�n marca un nuevo paso
// (m�todo step()).
//
// Estos dos m�todos son implementados por: las pantallas iniciales y
// final del juego, los sprites que se muestran en la pantalla
// (jugador, enemigo, proyectiles, y los elementos como el marcador de
// puntuaci�n o el n�mero de vidas.

// Objeto singleton Game: se guarda una unica instancia del
// constructor an�nimo en el objeto Game



Game = new function() {
  




	// Inicializa el juego
	this.initialize = function(canvasElementId, sprite_data, callback) {
		this.canvas = document.getElementById(canvasElementId)
		
		

          this.canvas.onselectstart = function () { return false; } // ie
		this.canvas.onmousedown = function () { return false; } // mozilla
		
		this.width = this.canvas.width;
		this.height = this.canvas.height;

		this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
		if (!this.ctx) {
			return alert("Please upgrade your browser to play");
		}

		this.setupInput();

		this.loop();

		SpriteSheet.load(sprite_data, callback);
	};

	// Gestion de la entrada (teclas para izda/derecha y disparo)
	var KEY_CODES = {
		37 : 'left',
		39 : 'right',
		32 : 'fire',
		66 : 'fireb_right',
		78 : 'fireb_left'
	};
	this.keys = {};

	var focusCanvas = true;

	this.setupInput = function() {
		$(window).keydown(function(event) {
			if (KEY_CODES[event.which]) {
				Game.keys[KEY_CODES[event.which]] = true;
				return false;
			}
		});

		$(window).keyup(function(event) {
			if (KEY_CODES[event.which]) {
				Game.keys[KEY_CODES[event.which]] = false;
				return false;
			}
		});
		

		
	}

	// Bucle del juego
	var boards = [];

	this.loop = function() {
		// segundos transcurridos
		var dt = 30 / 1000;

		// Para cada board, de 0 en adelante, se
		// llama a su m�todo step() y luego a draw()
		for (var i = 0, len = boards.length; i < len; i++) {
			if (boards[i]) {
				boards[i].step(dt);
				boards[i].draw(Game.ctx);
			}
		}

		// Ejecutar dentro de 30 ms
		setTimeout(Game.loop, 30);
	};

	// Para cambiar el panel activo en el juego.
	// Son capas: se dibujan de menor num a mayor
	// Cada capa tiene que tener en su interfaz step() y draw()
	this.setBoard = function(num, board) {
		boards[num] = board;
	};
};

// Objeto singleton SpriteSheet: se guarda una unica instancia del
// constructor an�nimo en el objeto SpriteSheet
var SpriteSheet = new function() {

	// Almacena nombre_de_sprite: rect�ngulo para que sea mas facil
	// gestionar los sprites del fichero images/sprite.png
	this.map = {};

	// Para cargar hoja de sprites.
	//
	// Par�metros: spriteData: parejas con nombre de sprite, rect�ngulo
	// callback: para llamarla cuando se haya cargado la hoja de
	// sprites
	this.load = function(spriteData, callback) {
		this.map = spriteData;
		this.image = new Image();
		this.image.onload = callback;
		this.image.src = '/images/sprites.png';
	};

	// Para dibujar sprites individuales en el contexto de canvas ctx
	//
	// Par�metros: contexto, string con nombre de sprite para buscar
	// en this.map, x e y en las que dibujarlo, y opcionalmente,
	// frame para seleccionar el frame de un sprite que tenga varios
	// como la explosion
	this.draw = function(ctx, sprite, x, y, frame, dw, dh) {
		var s = this.map[sprite];
		if (!frame)
			frame = 0;
		if (!dw) {
			dw = s.w
		}
		;
		if (!dh) {
			dh = s.h
		}
		;
		ctx.drawImage(this.image, s.sx + frame * s.w, s.sy, s.w, s.h, Math
				.floor(x), Math.floor(y), dw, dh);
	};
}

// La clase TitleScreen ofrece la interfaz step(), draw() para que
// pueda ser mostrada desde el bucle principal del juego

// Usa fillText, con el siguiente font enlazado en index.html <link
// href='http://fonts.googleapis.com/css?family=Bangers'
// rel='stylesheet' type='text/css'> Otros fonts:
// http://www.google.com/fonts

var TitleScreen = function TitleScreen(title, subtitle, callback) {
	var up = false;

	// En cada paso, comprobamos si la tecla ha pasado de no pulsada a
	// pulsada. Si comienza el juego con la tecla pulsada, hay que
	// soltarla y
	this.step = function(dt) {
		if (!Game.keys['fire'])
			up = true;
		if (up && Game.keys['fire'] && callback)
			callback();
	};

	this.draw = function(ctx) {
		ctx.fillStyle = "#FFFFFF";
		ctx.textAlign = "center";

		ctx.font = "bold 40px bangers";
		ctx.fillText(title, Game.width / 2, Game.height / 2);

		ctx.font = "bold 20px bangers";
		ctx.fillText(subtitle, Game.width / 2, Game.height / 2 + 40);
	};
};

// GameBoard implementa un tablero de juego que gestiona la
// interacci�n entre los elementos del juego sobre el que se disponen
// los elementos del juego (fichas, cartas, naves, proyectiles, etc.)

// La clase GameBoard ofrece la interfaz step(), draw() para que sus
// elementos puedan ser mostrados desde el bucle principal del juego.

var GameBoard = function() {
	var board = this;

	// Colecci�n de objetos contenidos por este tablero
	this.objects = [];

	// A�ade obj a objects
	this.add = function(obj) {
		obj.board = this; // Para que obj pueda referenciar el tablero
		this.objects.push(obj);
		return obj;
	};

	// Los siguientes 3 m�todos gestionan el borrado. Cuando un board
	// est� siendo recorrido (en step()) podr�a eliminarse alg�n
	// objeto, lo que interferir�a en el recorrido. Por ello borrar se
	// hace en dos fases: marcado, y una vez terminado el recorrido,
	// se modifica objects.

	// Marcar un objeto para borrar
	this.remove = function(obj) {
		this.removed.push(obj);
	};

	// Inicializar la lista de objetos pendientes de ser borrados
	this.resetRemoved = function() {
		this.removed = [];
	}

	// Elimina de objects los objetos pendientes de ser borrados
	this.finalizeRemoved = function() {
		for (var i = 0, len = this.removed.length; i < len; i++) {
			// Buscamos qu� �ndice tiene en objects[] el objeto i de
			// removed[]
			var idx = this.objects.indexOf(this.removed[i]);

			// splice elimina de objects el objeto en la posici�n idx
			if (idx != -1)
				this.objects.splice(idx, 1);
		}
	}

	// Iterador que aplica el m�todo funcName a todos los
	// objetos de objects
	this.iterate = function(funcName) {
		// Convertimos en un array args (1..)
		var args = Array.prototype.slice.call(arguments, 1);

		for (var i = 0, len = this.objects.length; i < len; i++) {
			var obj = this.objects[i];
			obj[funcName].apply(obj, args)
		}

	};

	// Devuelve el primer objeto de objects para el que func es true
	this.detect = function(func) {
		for (var i = 0, val = null, len = this.objects.length; i < len; i++) {
			if (func.call(this.objects[i]))
				return this.objects[i];
		}
		return false;
	};

	// Cuando Game.loop() llame a step(), hay que llamar al m�todo
	// step() de todos los objetos contenidos en el tablero. Antes se
	// inicializa la lista de objetos pendientes de borrar, y despu�s
	// se borran los que hayan aparecido en dicha lista
	this.step = function(dt) {
		this.resetRemoved();
		this.iterate('step', dt);
		this.finalizeRemoved();
	};

	// Cuando Game.loop() llame a draw(), hay que llamar al m�todo
	// draw() de todos los objetos contenidos en el tablero
	this.draw = function(ctx) {
		this.iterate('draw', ctx);
	};

	// Comprobar si hay intersecci�n entre los rect�ngulos que
	// circunscriben a los objetos o1 y o2
	this.overlap = function(o1, o2) {
		// return !((o1 encima de o2) || (o1 debajo de o2) ||
		// (o1 a la izda de o2) || (o1 a la dcha de o2)
		return !((o1.y + o1.h - 1 < o2.y) || (o1.y > o2.y + o2.h - 1)
				|| (o1.x + o1.w - 1 < o2.x) || (o1.x > o2.x + o2.w - 1));
	};

	// Encontrar el primer objeto de tipo type que colisiona con obj
	// Si se llama sin type, en contrar el primer objeto de cualquier
	// tipo que colisiona con obj
	this.collide = function(obj, type) {
		return this.detect(function() {
			if (obj != this) {
				var col = (!type || this.type & type)
						&& board.overlap(obj, this)
				return col ? this : false;
			}
		});
	};

};

// Constructor Sprite
var Sprite = function() {
}

Sprite.prototype.setup = function(sprite, props) {
	this.sprite = sprite;
	this.merge(props);
	this.frame = this.frame || 0;
	this.w = SpriteSheet.map[sprite].w;
	this.h = SpriteSheet.map[sprite].h;
}

Sprite.prototype.merge = function(props) {
	if (props) {
		for ( var prop in props) {
			this[prop] = props[prop];
		}
	}
}

Sprite.prototype.draw = function(ctx) {
	SpriteSheet.draw(ctx, this.sprite, this.x, this.y, this.frame);
}

Sprite.prototype.hit = function(damage) {
	this.board.remove(this);
}