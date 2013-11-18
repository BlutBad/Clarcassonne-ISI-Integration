sprites = {}

var startGame = function() {
	Game.setBoard(0,new Background());
    
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
   		// (HASTA AQUI)
    }

    this.step = function(dt) { }
}


$(function() {
    Game.initialize("game",sprites,startGame);
});
