sprites = {}

Jugador1 = {nombre: "Juanjo" , color: "rojo", puntos:0};
Jugador2 = {nombre: "Mario"  , color: "azul", puntos:10};
Jugador3 = {nombre: "Maria"  , color: "amarillo", puntos:20};
Jugador4 = {nombre: "Ana"    , color: "verde", puntos:30};
Jugador5 = {nombre: "Lucia"  , color: "gris", puntos:40};
Jugador6 = {nombre: "Marcos" , color: "morado", puntos:50};

startGame = function() {
	SpriteSheet.load({
	    	Rrecta: { sx: 0, sy: 0, w:100, h: 100, frames: 1 },
        	Rcurva: { sx: -100, sy: 400, w: 100, h: 100, frames: 1 },
       		Catedral: { sx: 0, sy: 500, w: 100, h: 100, frames: 1 },
        	Posada: { sx: 0, sy: 400, w: 100, h: 100, frames: 1 },
        	Ccruze: { sx: 0, sy: 200, w: 100, h: 100, frames: 1 },
        	CiudadE: { sx: 100, sy: 0, w: 100, h: 100, frames: 1 },
        	Ciudad3lc: { sx: 400, sy: 0, w: 100, h: 100, frames: 1 },
        	Ciudad3lcE: { sx: 300, sy: 0, w: 100, h: 100, frames: 1 },
        	Ciudad3l: { sx: 300, sy: 100, w: 100, h: 100, frames: 1 },
        	Ciudad3lE: { sx: 100, sy: 100, w: 100, h: 100, frames: 1 },
        	Ciudad2lc: { sx: 200, sy: 200, w: 100, h: 100, frames: 1 },
        	Ciudad2lcE: { sx: 100, sy: 200, w: 100, h: 100, frames: 1 },
        	Ciudad2l: { sx: 300, sy: 300, w: 100, h: 100, frames: 1 },
        	Ciudad2lE: { sx: 100, sy: 400, w: 100, h: 100, frames: 1 },
        	CiudadPuerta: { sx: 400, sy: 400, w: 100, h: 100, frames: 1 },
        	CiudadPuertaE: { sx: 300, sy: 400, w: 100, h: 100, frames: 1 },
        	Ciudadext: { sx: 300, sy: 500, w: 100, h: 100, frames: 1 },
        	Ciudad1l2crect: { sx: 500, sy: 0, w: 100, h: 100, frames: 1 },
        	Ciudadcurvder: { sx: 500, sy: 100, w: 100, h: 100, frames: 1 },
        	Ciudadcurvizq: { sx: 500, sy: 200, w: 100, h: 100, frames: 1 },
        	Ciudad1lcruze: { sx: 500, sy: 300, w: 100, h: 100, frames: 1 },
        	Ciudad1ll: { sx: 800, sy: 200, w: 100, h: 100, frames: 1 },
        	Ciudad1l: { sx: 800, sy: 300, w: 100, h: 100, frames: 1 },
        	Tcruze: { sx: 800, sy: 500, w: 100, h: 100, frames: 1 },
    	});
    	
	Game.setBoard(0,new Background());
	Game.setBoard(1,new Jugadores());
	Game.setBoard(2,new Rejilla());
    
};


// Se encarga de pintar el fondo del juego
Background = function() {

    this.draw = function(ctx) {
			var img = new Image();
			img.src = 'images/background.png';
			img.onload = function(){
				ctx.drawImage(img, 0, 0);
			} 
			
			// prueba de pintar sprites (ELIMINAR EN SEGUNDA VERSION)
			/*var img2 = new Image();
				img2.src = 'images/sprites.png';
				img2.onload = function() {
				ctx.drawImage(img2,    40, 40, 720,   420);
   				}*/
   				
   			var img3 = new Image();
				img3.src = 'images/sprites.png';
				img3.onload = function() {
				SpriteSheet.draw(ctx, "Ciudad3lE", 0, 0, 3);
   				}
   		
    }

    this.step = function(dt) { }
};

Jugadores = function() {
   
   this.draw = function(ctx){
     // ctx.beginPath();
      ctx.save();
      ctx.fillStyle="rgb(255,255,0)";
      ctx.font="bold 25px Arial";
      ctx.fillText(Jugador1.nombre,20,540);
      ctx.fillText(Jugador2.nombre,150,540);
      ctx.fillText(Jugador3.nombre,280,540);
      ctx.fillText(Jugador4.nombre,410,540);
      ctx.fillText(Jugador5.nombre,540,540);
      ctx.fillText(Jugador6.nombre,670,540);
      //ctx.fillText(Jugador1.color,20,540);
      //ctx.fillText(Jugador2.color,150,540);
      //ctx.fillText(Jugador3.color,280,540);
      //ctx.fillText(Jugador4.color,410,540);
      //ctx.fillText(Jugador5.color,540,540);
      //ctx.fillText(Jugador6.color,670,540);
      ctx.fillText(Jugador1.puntos,20,580);
      ctx.fillText(Jugador2.puntos,150,580);
      ctx.fillText(Jugador3.puntos,280,580);
      ctx.fillText(Jugador4.puntos,410,580);
      ctx.fillText(Jugador5.puntos,540,580);
      ctx.fillText(Jugador6.puntos,670,580);
      ctx.restore();
   
   }
   
   
  this.step = function(dt) { }
   
     


};

Rejilla =  function(){
	
	this.draw =function(ctx){
	ctx.save();
	for(var x=0; x<=800; x=x+100){
		ctx.moveTo(x,0);
		ctx.lineTo(x,500);
	};
	
	for(var y=0; y<=500; y=y+100){
		ctx.moveTo(0,y);
		ctx.lineTo(800,y);
	};

	ctx.strokeStyle ="#190B07";
	ctx.stroke();
	ctx.restore();
	
	}
	this.step= function(dt){};

}; 

$(function() {
    Game.initialize("game",sprites,startGame);
});
