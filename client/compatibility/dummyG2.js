dummyG2 = function(canvasElementId, sprite_data, callback) {
	Game.initialize(canvasElementId, sprite_data, callback);
	// Convenio de la plataforma

	// id donde va estarcanvas
	// path de sprites
	// callback para empezar el juego una vez cargado <- ??
	// Game.initialize("gamealien", sprites, startGame);

	Game = new function() {
		// Inicializa el juego
		this.initialize = function(canvasElementId, sprite_data, callback) {
			this.canvas = document.getElementById(canvasElementId)

			this.canvas.onselectstart = function() {
				return false;
			} // ie
			this.canvas.onmousedown = function() {
				return false;
			} // mozilla

			this.width = this.canvas.width;
			this.height = this.canvas.height;

			this.ctx = this.canvas.getContext && this.canvas.getContext('2d');
			if (!this.ctx) {
				return alert("Please upgrade your browser to play");
			}
			//
			// callback()

		};
		
		startGame(this.ctx)

		function startGame(ctx) {
			var canvas = document.getElementById('dummydiv');

			// Make sure we don't execute when canvas isn't supported
			if (canvas.getContext) {

				// use getContext to use the canvas for drawing
				var ctx = canvas.getContext('2d');

				// Filled triangle
				ctx.beginPath();
				ctx.moveTo(25, 25);
				ctx.lineTo(105, 25);
				ctx.lineTo(25, 105);
				ctx.fill();

				// Stroked triangle
				ctx.beginPath();
				ctx.moveTo(125, 125);
				ctx.lineTo(125, 45);
				ctx.lineTo(45, 125);
				ctx.lineWidth = 10;
				ctx.closePath();
			    ctx.strokeStyle = '#ff0000';
				ctx.stroke();
			}
		}
	};

};