
Meteor.methods({

	// Hay un bug, de vez en cuando sale nul en el id del game :(
	// No soy capaz de reproducir la misma situacion para ver donde falla
	// Hay que registrarse o identificarse!!!!!!
	newScore : function(gameId, score) { 
 
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
 