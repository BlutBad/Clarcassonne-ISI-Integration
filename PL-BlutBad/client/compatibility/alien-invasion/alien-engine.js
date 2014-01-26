// Alien Invasion utiliza duck typing para implementar como dibujar
// elementos en la pantalla (m�todo draw()) y para que actualicen su
// estado cada vez que el bucle de animaci�n marca un nuevo paso
// (m�todo step()).
//
// Estos dos m�todos son implementados por: las pantallas iniciales y
// final del juego, los spritesAlien que se muestran en la pantalla
// (jugador, enemigo, proyectiles, y los elementos como el marcador de
// puntuaci�n o el n�mero de vidas.




// Objeto singleton gameAlien: se guarda una unica instancia del
// constructor an�nimo en el objeto gameAlien
var gameAlien = new function() {                                                                  
  var boards = [];

    // Inicializa el juego
  this.initialize = function(canvasElementId,sprite_data,callback) {
    this.canvas = document.getElementById(canvasElementId);

	// Propiedades para pantallas t�ctiles
    this.playerOffset = 10;
    this.canvasMultiplier= 1;
    this.setupMobile();

    this.width = this.canvas.width;
    this.height= this.canvas.height;

    this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
    if(!this.ctx) { return alert("Please upgrade your browser to play"); }

    this.setupInput();

    this.loop(); 

      // A�adimos como un nuevo tablero al juego el panel con los
      // botones para pantalla t�ctil, s�lo si hemos detectado pantalla m�vil
    if(this.mobile) {
      this.setBoard(4,new AlienTouchControls());
    }

    AlienSpriteSheet.load(sprite_data,callback);
  };
  

    // Gesti�n de la entrada (teclas para izda/derecha y disparo)
    var AlienKEY_CODES = { 37:'left', 39:'right', 32 :'fire' };
    this.keys = {};

    var alienfocusCanvas = true;

    this.setupInput = function() {
        $(window).click(function(event){
          if (event.target.id == "gamecanvasAlien")
            alienfocusCanvas = true;
          else 
             alienfocusCanvas = false;
        });

	$(window).keydown(function(event){
          if (alienfocusCanvas)
	    if (AlienKEY_CODES[event.which]) {
		gameAlien.keys[AlienKEY_CODES[event.which]] = true;
		return false;
	    }
	});
	
	$(window).keyup(function(event){
          if (alienfocusCanvas)
	    if (AlienKEY_CODES[event.which]) {
	        gameAlien.keys[AlienKEY_CODES[event.which]] = false;
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
	for(var i=0,len = boards.length;i<len;i++) {
	    if(boards[i]) { 
		boards[i].step(dt);
		boards[i].draw(gameAlien.ctx);
	    }
	}

	// Ejecutar dentro de 30 ms
	setTimeout(gameAlien.loop,30);
    };
    
    // Para cambiar el panel activo en el juego.
    // Son capas: se dibujan de menor num a mayor
    // Cada capa tiene que tener en su interfaz step() y draw()
    this.setBoard = function(num,board) { boards[num] = board; };



  this.setupMobile = function() {
    var container = document.getElementById("container"),
        hasTouch =  !!('ontouchstart' in window),
        w = window.innerWidth, h = window.innerHeight;

    if(hasTouch) { this.mobile = true; }

    if(screen.width >= 1280 || !hasTouch) { return false; }

    if(w > h) {
      alert("Please rotate the device and then click OK");
      w = window.innerWidth; h = window.innerHeight;
    }

    container.style.height = h*2 + "px";
    window.scrollTo(0,1);

    h = window.innerHeight + 2;
    container.style.height = h + "px";
    container.style.width = w + "px";
    container.style.padding = 0;

    if(h >= this.canvas.height * 1.75 || w >= this.canvas.height * 1.75) {
      this.canvasMultiplier = 2;
      this.canvas.width = w / 2;
      this.canvas.height = h / 2;
      this.canvas.style.width = w + "px";
      this.canvas.style.height = h + "px";
    } else {
      this.canvas.width = w;
      this.canvas.height = h;
    }

    this.canvas.style.position='absolute';
    this.canvas.style.left="0px";
    this.canvas.style.top="0px";

  };


};


// Objeto singleton SpriteSheet: se guarda una unica instancia del
// constructor an�nimo en el objeto SpriteSheet
var AlienSpriteSheet = new function() {

    // Almacena nombre_de_sprite: rect�ngulo para que sea mas facil
    // gestionar los sprites del fichero images/sprite.png
    this.map = { }; 

    // Para cargar hoja de sprites. 
    //
    // Par�metros: spriteData: parejas con nombre de sprite, rect�ngulo
    // callback: para llamarla cuando se haya cargado la hoja de
    // sprites
    this.load = function(spriteData,callback) { 
	this.map = spriteData;
	this.image = new Image();
	this.image.onload = callback;
	this.image.src = 'images/sprites.png';
    };

    
    // Para dibujar sprites individuales en el contexto de canvas ctx
    //
    // Par�metros: contexto, string con nombre de sprite para buscar
    //  en this.map, x e y en las que dibujarlo, y opcionalmente,
    //  frame para seleccionar el frame de un sprite que tenga varios
    //  como la explosion
    this.draw = function(ctx,sprite,x,y,frame) {
	var s = this.map[sprite];
	if(!frame) frame = 0;
	ctx.drawImage(this.image,
                      s.sx + frame * s.w, 
                      s.sy, 
                      s.w, s.h, 
                      Math.floor(x), Math.floor(y),
                      s.w, s.h);
    };
}

// La clase TitleScreen ofrece la interfaz step(), draw() para que
// pueda ser mostrada desde el bucle principal del juego

// Usa fillText, con el siguiente font enlazado en index.html <link
// href='http://fonts.googleapis.com/css?family=Bangers'
// rel='stylesheet' type='text/css'> Otros fonts:
// http://www.google.com/fonts

var AlienTitleScreen = function AlienTitleScreen(title,subtitle,callback) {
    var up = false;

    // En cada paso, comprobamos si la tecla ha pasado de no pulsada a
    // pulsada. Si comienza el juego con la tecla pulsada, hay que
    // soltarla y
    this.step = function(dt) {
	if(!gameAlien.keys['fire']) up = true;
	if(up && gameAlien.keys['fire'] && callback) callback();
    };

    this.draw = function(ctx) {
	ctx.fillStyle = "#FFFFFF";
	ctx.textAlign = "center";

	ctx.font = "bold 40px bangers";
	ctx.fillText(title,gameAlien.width/2,gameAlien.height/2);

	ctx.font = "bold 20px bangers";
	ctx.fillText(subtitle,gameAlien.width/2,gameAlien.height/2 + 40);
    };
};



// gameAlienBoard implementa un tablero de juego que gestiona la
// interacci�n entre los elementos del juego sobre el que se disponen
// los elementos del juego (fichas, cartas, naves, proyectiles, etc.)

// La clase gameAlienBoard ofrece la interfaz step(), draw() para que sus
// elementos puedan ser mostrados desde el bucle principal del juego.

var gameAlienBoard = function() {
    var board = this;

    // Colecci�n de objetos contenidos por este tablero
    this.objects = [];

    // Propiedad que lleva la cuenta de cu�ntos objetos de cada tipo
    // hay en el tablero de juegos
    this.cnt = {};

    // A�ade obj a objects
    this.add = function(obj) { 
	obj.board=this;  // Para que obj pueda referenciar el tablero
	this.objects.push(obj); 
	
	// Actualizamos el contador de objetos de este tipo
	this.cnt[obj.type] = (this.cnt[obj.type] || 0) + 1;

	return obj; 
    };

    // Los siguientes 3 m�todos gestionan el borrado.  Cuando un board
    // est� siendo recorrido (en step()) podr�a eliminarse alg�n
    // objeto, lo que interferir�a en el recorrido. Por ello borrar se
    // hace en dos fases: marcado, y una vez terminado el recorrido,
    // se modifica objects.

    // Marcar un objeto para borrar
    this.remove = function(obj) { 
	var idx = this.removed.indexOf(obj);
	if(idx == -1) {
	    this.removed.push(obj); 
	    return true;
	} else {
	    return false;
	}
    };


    // Inicializar la lista de objetos pendientes de ser borrados
    this.resetRemoved = function() { this.removed = []; }

    // Elimina de objects los objetos pendientes de ser borrados
    this.finalizeRemoved = function() {
	for(var i=0, len=this.removed.length; i<len;i++) {
	    // Buscamos qu� �ndice tiene en objects[] el objeto i de
	    // removed[]
	    var idx = this.objects.indexOf(this.removed[i]);

	    // splice elimina de objects el objeto en la posici�n idx
	    if(idx != -1) {
		this.cnt[this.removed[i].type]--;
		this.objects.splice(idx,1); 
	    }
	}
    }


    // Iterador que aplica el m�todo funcName a todos los
    // objetos de objects
    this.iterate = function(funcName) {
	// Convertimos en un array args (1..)
	var args = Array.prototype.slice.call(arguments,1);

	for(var i=0, len=this.objects.length; i<len;i++) {
	    var obj = this.objects[i];
	    obj[funcName].apply(obj,args)
	}
    };

    // Devuelve el primer objeto de objects para el que func es true
    this.detect = function(func) {
	for(var i = 0,val=null, len=this.objects.length; i < len; i++) {
	    if(func.call(this.objects[i])) return this.objects[i];
	}
	return false;
    };

    // Cuando gameAlien.loop() llame a step(), hay que llamar al m�todo
    // step() de todos los objetos contenidos en el tablero.  Antes se
    // inicializa la lista de objetos pendientes de borrar, y despu�s
    // se borran los que hayan aparecido en dicha lista
    this.step = function(dt) { 
	this.resetRemoved();
	this.iterate('step',dt);
	this.finalizeRemoved();
    };

    // Cuando gameAlien.loop() llame a draw(), hay que llamar al m�todo
    // draw() de todos los objetos contenidos en el tablero
    this.draw= function(ctx) {
	this.iterate('draw',ctx);
    };

    // Comprobar si hay intersecci�n entre los rect�ngulos que
    // circunscriben a los objetos o1 y o2
    this.overlap = function(o1,o2) {
	// return !((o1 encima de o2)    || (o1 debajo de o2)   ||
        //          (o1 a la izda de o2) || (o1 a la dcha de o2)
	return !((o1.y+o1.h-1<o2.y) || (o1.y>o2.y+o2.h-1) ||
		 (o1.x+o1.w-1<o2.x) || (o1.x>o2.x+o2.w-1));
    };

    // Encontrar el primer objeto de tipo type que colisiona con obj
    // Si se llama sin type, en contrar el primer objeto de cualquier
    // tipo que colisiona con obj
    this.collide = function(obj,type) {
	return this.detect(function() {
	    if(obj != this) {
		var col = (!type || this.type & type) && board.overlap(obj,this)
		return col ? this : false;
	    }
	});
    };


};


// Constructor Sprite 
var AlienSprite = function() { }

AlienSprite.prototype.setup = function(sprite,props) {
    this.sprite = sprite;
    this.merge(props);
    this.frame = this.frame || 0;
    this.w =  AlienSpriteSheet.map[sprite].w;
    this.h =  AlienSpriteSheet.map[sprite].h;
}

AlienSprite.prototype.merge = function(props) {
    if(props) {
	for (var prop in props) {
	    this[prop] = props[prop];
	}
    }
}

AlienSprite.prototype.draw = function(ctx) {
    AlienSpriteSheet.draw(ctx,this.sprite,this.x,this.y,this.frame);
}

AlienSprite.prototype.hit = function(damage) {
    this.board.remove(this);
}


// Clase para implementar los niveles de un juego. 

// Al constructor del nivel se le pasan los datos que definen el nivel
//   (p.ej. level1 en gameAlien.js) y una funci�n a la que llamar si el
//   jugador gana (wingameAlien en gameAlien.js).
var AlienLevel = function(levelData,callback) {
    // Recuerda el formato de cada bater�a de enemigos definida en levelData
    //  Comienzo, Fin,   Frecuencia,  Tipo,       Override
    //  [ 0,       4000,  500,         'step',     { x: 100 } ]
    this.levelData = [];

    // levelData, como todos los objetos en JavaScript, se pasa por
    // referencia. Aqu� realizamos una copia profunda de levelData. Es
    // necesaria porque los datos del nivel se van modificando mientras
    // que se juega el nivel, por lo que si no hacemos una copia no se
    // podr�a volver a jugar un mismo nivel
    for(var i =0; i<levelData.length; i++) {
	// Para copiarla usamos este patr�n JavaScript para realizar
	// copias: Object.create() crea un nuevo objeto que tiene como
	// prototipo el objeto pasado como argumento. Ese objeto, que
	// a todos los efectos podemos considerar como una copia del
	// argumento, se a�ade a this.levelData
	this.levelData.push(Object.create(levelData[i]));
    }

    // La propiedad t lleva la cuenta del tiempo que ha pasado. Se
    // actualiza en step()
    this.t = 0;
    this.callback = callback;
};


// M�todo que, junto a draw(), forma parte de la interfaz que tiene
// que ofrecer cualquier objeto a�adido como tablero a gameAlien.boards.
// En este m�todo se lleva la cuenta del tiempo que ha transcurrido, y
// se van a�adiendo nuevos enemigos al tablero de juegos seg�n lo
// indicado en la definici�n del nivel almacenada en this.levelData
AlienLevel.prototype.step = function(dt) {
    var idx = 0, remove = [], curShip = null;

    // Actualizamos el tiempo que ha pasado 
    this.t += dt * 1000;

    // Recuerda el formato de cada bater�a de enemigos definida en levelData
    //  Comienzo, Fin,   Frecuencia,  Tipo,       Override
    // [ 0,       4000,  500,         'step',     { x: 100 } ]

    // Var recorriendo las bater�as de enemigos (filas en levelData)
    while (curShip = this.levelData[idx]) {

	// Si ya ha pasado el tiempo en el que hay que crear enemigos
	// de esta bater�a, se a�aden a remove para que sean borrados
	// una vez acabado el bucle. �No se eliminan directamente
	// porque el bucle est� iterando sobre la estructura de datos!
	// Es el mismo patr�n que utilizamos cuando borramos sprites
	// del tablero de juegos: marcamos en remove para borrar y
	// borramos una vez conclu�do el bucle.
	if(this.t > curShip[1]) {
	    remove.push(curShip);
	} else if(curShip[0] < this.t) {
	    // Ha llegado la hora de crear un nuevo enemigo de esta bater�a
	    var enemy = enemies[curShip[3]],
            override = curShip[4];

	    this.board.add(new Enemy(enemy,override));

	    // Recuerda el formato de cada bater�a de enemigos definida en levelData
	    //  Comienzo, Fin,   Frecuencia,  Tipo,       Override
	    // [ 0,       4000,  500,         'step',     { x: 100 } ]

	    // Modificamos la definici�n de esta bater�a para
	    // programar la creaci�n del siguiente enemigo dentro de
	    // Frecuencia ms
	    curShip[0] += curShip[2];
	}
	idx++; // Pasamos a la siguiente bater�a de enemigos
    }

    // Elimina del nivel una bater�a de enemigos del nivel si ha sido
    // a�adida a remove en el anterior bucle porque ya ha pasado su
    // ventana de tiempo en la que hay que crear enemigos de dicha
    // bater�a
    for(var i=0,len=remove.length;i<len;i++) {
	var remIdx = this.levelData.indexOf(remove[i]);
	if(remIdx != -1) this.levelData.splice(remIdx,1);
    }

    // Comprueba si hay que terminar el nivel porque no quedan m�s
    // enemigos que generar, y no quedan enemigos en el tablero de
    // juegos.  Para ello se hace uso de la propiedad this.board.cnt
    // que lleva la cuenta de cu�ntos objetos de cada tipo hay en el
    // tablero de juegos.
    if(this.levelData.length === 0 && this.board.cnt[OBJECT_ENEMY] === 0) {
	if(this.callback) this.callback();
    }

};

// Level implementa draw() porque al a�adirse como tablero a gameAlien el
// bucle gameAlien.loop() va a llamar a step() y a draw(). Pero no hay nada
// que hacer en draw() para un nivel, ya que los sprites de los
// enemigos los a�ade el nivel al tablero de juegos (gameAlienBoard). 
AlienLevel.prototype.draw = function(ctx) { };




// Clase para controlar el juego mediante botones en la pantalla
// t�ctil de un m�vil o una tableta
var AlienTouchControls = function() {

    
    // Consideraremos el ancho de la pantalla dividido en 5 franjas
    // verticales o columnas. En las dos de la izda situaremos los
    // botones de direcci�n y en la derecha el de disparo
    var unitWidth = gameAlien.width/5;

    // Separaci�n entre columnas
    var gutterWidth = 10;

    // Ancho de cada columna
    var blockWidth = unitWidth-gutterWidth;

    // Dibuja un rect�ngulo con texto dentro. Usado para representar
    // los botones. 
    // Los botones de las flechas izquierda y derecha usan los
    // caracteres Univode UTF-8 \u25C0 y \u25B6 respectivamente, que
    // corresponden a sendos tri�ngulos
    this.drawSquare = function(ctx,x,y,txt,on) {
	// Usamos un nivel de opacidad del fondo (globalAlpha)
	// diferente para que cambie la apariencia del bot�n en
	// funci�n de si est� presionado (opaco) o no (m�s
	// transparente)
	ctx.globalAlpha = on ? 0.9 : 0.6;

	ctx.fillStyle =  "#CCC";
	ctx.fillRect(x,y,blockWidth,blockWidth);

	ctx.fillStyle = "#FFF";
	ctx.textAlign = "center";
	ctx.globalAlpha = 1.0;
	ctx.font = "bold " + (3*unitWidth/4) + "px arial";


	ctx.fillText(txt, 
                     x+blockWidth/2,
                     y+3*blockWidth/4+5);
    };



    this.draw = function(ctx) {
	// Guarda las propiedades del contexto actual para evitar que
	// los siguientes cambios que se hacen a la opacidad del fondo
	// y al font dentro de drawSquare() afecten a otras llamadas
	// del canvas
	ctx.save();

	var yLoc = gameAlien.height - unitWidth;
	this.drawSquare(ctx,gutterWidth,yLoc,"\u25C0", gameAlien.keys['left']);
	this.drawSquare(ctx,unitWidth + gutterWidth,yLoc,"\u25B6", gameAlien.keys['right']);
	this.drawSquare(ctx,4*unitWidth,yLoc,"A",gameAlien.keys['fire']);

	// Recupera el estado salvado al principio del m�todo
	ctx.restore();
    };

    this.step = function(dt) { };

    this.trackTouch = function(e) {
	var touch, x;
	
	// Elimina comportamiento por defecto para este evento, como
	// scrolling, clicking, zooming, etc.
	e.preventDefault();

	// Detecci�n de eventos sobre las dos franjas de la izquierda
	// correspondientes a flecha izquierda y flecha derecha
	gameAlien.keys['left'] = false;
	gameAlien.keys['right'] = false;
	for(var i=0;i<e.targetTouches.length;i++) {
	    // Independientemente de d�nde se toc� originalmente, nos
	    // fijamos en todos los dedos y si hay alguno sobre los
	    // botones de direcci�n, lo consideramos activado. Esto
	    // permite desplazar los dedos sin levantarlos, y que se
	    // generen eventos cuando pasan por encima de los botones
	    // de direcci�n
	    touch = e.targetTouches[i];

	    // Al fijarnos s�lo en las coordenadas X hacemos que toda
	    // la franja vertical de cada bot�n sea activa.
	    x = touch.pageX / gameAlien.canvasMultiplier - gameAlien.canvas.offsetLeft;
	    if(x < unitWidth) {
		gameAlien.keys['left'] = true;
	    } 
	    if(x > unitWidth && x < 2*unitWidth) {
		gameAlien.keys['right'] = true;
	    } 
	}

	// Detecci�n de eventos sobre franja de la derecha: disparo
	if(e.type == 'touchstart' || e.type == 'touchend') {
	    for(i=0;i<e.changedTouches.length;i++) {
		// S�lo consideramos dedos que han intervenido en el
		// evento actual (touchstart o touchend seg�n
		// comprobamos en el anterior if)
		touch = e.changedTouches[i];

		// Al fijarnos s�lo en las coordenadas X hacemos que toda
		// la franja vertical de cada bot�n sea activa.
		x = touch.pageX / gameAlien.canvasMultiplier - gameAlien.canvas.offsetLeft;
		if(x > 4 * unitWidth) {
		    gameAlien.keys['fire'] = (e.type == 'touchstart');
		}
	    }
	}
    };

    // Registra los manejadores para los eventos t�ctiles asociados al
    // elemento gameAlien.canvas del DOM
    gameAlien.canvas.addEventListener('touchstart',this.trackTouch,true);
    gameAlien.canvas.addEventListener('touchmove',this.trackTouch,true);
    gameAlien.canvas.addEventListener('touchend',this.trackTouch,true);

    // Si ha habido un evento de toque es que estamos en una pantalla
    // tactil, en cuyo caso guardamos un offset para que la nave del
    // jugador est� desplazada hacia arriba para dejar espacio para
    // los botones en la pantalla tactil.  Ver en gameAlien.js c�mo hemos
    // modificado PlayerShip para que tenga en cuenta este
    // offset.
    gameAlien.playerOffset = unitWidth + 20;

};


var gameAlienPoints = function() {
  gameAlien.points = 0;

  var pointsLength = 8;

  this.draw = function(ctx) {
    ctx.save();
    ctx.font = "bold 18px arial";
    ctx.fillStyle= "#FFFFFF";

    var txt = "" + gameAlien.points;
    var i = pointsLength - txt.length, zeros = "";
    while(i-- > 0) { zeros += "0"; }

    ctx.fillText(zeros + txt,gameAlien.canvas.width-40,20);
    ctx.restore();

  };

  this.step = function(dt) { };
};

var gameAlienVida = function() {
    //mirar si tiene el bono de vida extra
    id_bono=Bono.findOne({numeracion:1})._id;
    if (Meteor.user()!=null && User_Bono.findOne({user_id: Meteor.user()._id, bono_id: id_bono}) && User_Bono.findOne({user_id: Meteor.user()._id, bono_id: id_bono}).n_bono>=1 ){
        bobj=User_Bono.findOne({user_id:Meteor.user()._id, bono_id:id_bono});
        gameAlien.vida=bobj.n_bono;
    }else{
        gameAlien.vida = 0;
    };

  var vidaLength = 2;

  this.draw = function(ctx) {
    ctx.save();
    ctx.font = "bold 18px arial";
    ctx.fillStyle= "#FFFFFF";

    var txt = "" + gameAlien.vida;
    var i = vidaLength + txt.length, zeros = "";
    while(i-- > 0) { zeros += "0"; }

    ctx.fillText(zeros + txt,10,20);
    ctx.restore();

  };

  this.step = function(dt) { };
};