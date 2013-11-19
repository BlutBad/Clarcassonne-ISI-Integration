sprites = {}

Jugador1 = {nombre: "Juanjo" , color: "rojo", puntos:0};
Jugador2 = {nombre: "Mario"  , color: "azul", puntos:10};
Jugador3 = {nombre: "Maria"  , color: "amarillo", puntos:20};
Jugador4 = {nombre: "Ana"    , color: "verde", puntos:30};
Jugador5 = {nombre: "Lucia"  , color: "gris", puntos:40};
Jugador6 = {nombre: "Marcos" , color: "morado", puntos:50};

startGame = function() {
	Game.setBoard(0,new Background());
	Game.setBoard(1,new Jugadores());
    
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
			var img2 = new Image();
				img2.src = 'images/sprites.png';
				img2.onload = function() {
				ctx.drawImage(img2,    40, 40, 720,   420);
   		}
   		
    }

    this.step = function(dt) { }
}

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
   
     


}


$(function() {
    Game.initialize("game",sprites,startGame);
});
