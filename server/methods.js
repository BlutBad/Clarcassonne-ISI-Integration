
Meteor.methods({

	// Hay un bug, de vez en cuando sale nul en el id del game :(
	// No soy capaz de reproducir la misma situacion para ver donde falla
	newScore : function(gameId, score) {
		console.log('juego:' + gameId + ' puntuacion ' + score);

		if (this.userId != null) {
			Ranking.insert({
				gameId : gameId,
				userId : this.userId,
				score : score
			});
			return true;
		} else {
			return false;
		}
	}
});
