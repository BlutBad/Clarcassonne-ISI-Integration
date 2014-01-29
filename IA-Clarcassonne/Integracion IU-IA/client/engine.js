Juego = new function() {                                                                  
 var boards = [];

   // Inicializa el juego
 this.initialize = function(canvasElementId,sprite_data,callback) {
 this.canvas = document.getElementById(canvasElementId);
 sonidojuego = document.getElementById("sonidojuego");
   

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
    this.setBoard(4,new TouchControls());
 }

 SpriteSh.load(sprite_data,callback);
 };
 

   // Gesti�n de la entrada (teclas para izda/derecha y disparo)
 var KEY_CODES = { 37:'left', 39:'right', 38 :'up', 40:'down', 32:'sacar_ficha',
    27: 'back', 48:'rotar', 72: 'help', 77:'silenciar', 67:'ayuda'};
 this.keys = {};
   

 this.setupInput = function() {
 var focusCanvas = true;
 $(window).click(function(event){
 if (event.target.id == idCanvas.slice(1))
focusCanvas = true;
 else
       focusCanvas = false;
 });

 $(window).keydown(function(event){
 if (focusCanvas)
  if (KEY_CODES[event.which]) {
               Juego.keys[KEY_CODES[event.which]] = true;
               return false;
       }
  });
       
  $(window).keyup(function(event){
  if (focusCanvas)
        if (KEY_CODES[event.which]) {
               Juego.keys[KEY_CODES[event.which]] = false;
               return false;
        }
   });

   }


   // Bucle del juego
   var boards = [];

   this.loop = function() {
// segundos transcurridos

var dt = 30 / 1000;

   if(Juego.keys['silenciar']){
    sonar = !sonar;
   }
   if(sonar){
sonidojuego.play();
   }else{
sonidojuego.pause();
   }

// Para cada board, de 0 en adelante, se
// llama a su m�todo step() y luego a draw()
for(var i=0,len = boards.length;i<len;i++) {
   if(boards[i]) {
boards[i].step(dt);
boards[i].draw(Juego.ctx);
   }
}

// Ejecutar dentro de 30 ms
setTimeout(Juego.loop,30);
   };
   
   // Para cambiar el panel activo en el juego.
   // Son capas: se dibujan de menor num a mayor
   // Cada capa tiene que tener en su interfaz step() y draw()
   this.setBoard = function(num,board) { boards[num] = board; };
   this.delBoard = function(num) { delete boards[num]; };
   this.getBoard = function(num) { if (boards[num]) {return true;} else {return false;} };



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


// Objeto singleton SpriteSh: se guarda una unica instancia del
// constructor an�nimo en el objeto SpriteSh
SpriteSh = new function() {

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
   this.draw = function(ctx,sprite,x,y,frame,rotation,z) {
   if(!z) z=1;
   if(!rotation) rotation = 0;
var s = this.map[sprite];
if(!frame) frame = 0;
ctx.save();
ctx.translate(x,y);
ctx.translate(s.w/2, s.h/2);
ctx.rotate(rotation*Math.PI/180);
ctx.drawImage(this.image,
                     s.sx + frame * s.w,
                     s.sy,
                     s.w, s.h,
                     Math.floor(-s.w/2), Math.floor(-s.h/2),
                     s.w*z, s.h*z);
  ctx.restore();
   };
}


// TableroJuego implementa un tablero de juego que gestiona la
// interacci�n entre los elementos del juego sobre el que se disponen
// los elementos del juego (fichas, cartas, naves, proyectiles, etc.)

// La clase TableroJuego ofrece la interfaz step(), draw() para que sus
// elementos puedan ser mostrados desde el bucle principal del juego.

TableroJuego = function() {
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

_(this.objects).forEach(function (obj) {
obj[funcName].apply(obj,args)

})
   };

   // Devuelve el primer objeto de objects para el que func es true
   this.detect = function(func) {
var firstobject = _(this.objects).find(function (obj) { return func.call(obj)})
   if (firstobject){
    return firstobject
   }else{
return false;
}
   };

   // Cuando Juego.loop() llame a step(), hay que llamar al m�todo
   // step() de todos los objetos contenidos en el tablero.  Antes se
   // inicializa la lista de objetos pendientes de borrar, y despu�s
   // se borran los que hayan aparecido en dicha lista
   this.step = function(dt) {
this.resetRemoved();
this.iterate('step',dt);
this.finalizeRemoved();
   };

   // Cuando Juego.loop() llame a draw(), hay que llamar al m�todo
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
   
   this.translate = function (x,y) {
    _(this.objects).forEach(function (obj) {
    if (obj.type == "PiezaMapa" || obj.type == "Seguidor") {
obj.x += 100*x;
obj.y += 100*y;
}
})
   
   }

   


};


// Constructor Sprite
CSprite = function() { }

CSprite.prototype.setup = function(CSprite,props) {
   this.sprite =sprite;
   this.merge(props);
   this.frame = this.frame || 0;
   this.w =  SpriteSh.map[sprite].w;
   this.h =  SpriteSh.map[sprite].h;
}

CSprite.prototype.merge = function(props) {
   if(props) {
for (var prop in props) {
   this[prop] = props[prop];
}
   }
}

CSprite.prototype.draw = function(ctx) {
   SpriteSh.draw(ctx,this.sprite,this.x,this.y,this.frame);
}

