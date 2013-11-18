sprites = {}

var startGame = function() {
    Game.setBoard(0,new Background());
};

// Se encarga de pintar el fondo del juego
Background = function() {

    this.draw = function(ctx) {
			var img = new Image();
			img.src = 'images/background.png';
			ctx.drawImage(img, 0, 0); 
    }

    this.step = function(dt) { }
}


$(function() {
    Game.initialize("game",sprites,startGame);
});
