

Meteor.methods({
	newScore: function(gameId, score) {
		console.log('juego:' + gameId +' puntuacion '  + score);
		Ranking.insert({
			gameId : gameId,
			userId : this.userId,
			score : score
		});
		return true;

        }
    });
