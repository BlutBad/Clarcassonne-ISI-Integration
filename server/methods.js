
Meteor.methods({

	// Hay un bug, de vez en cuando sale nul en el id del game :(
	// No soy capaz de reproducir la misma situacion para ver donde falla
	// Hay que registrarse o identificarse!!!!!!
	
	
	
	//Meteor.call("matchFinish", Session.get("current_game"), gameAlien.points);
	
	matchFinish : function(gameId, score) { 
 
		if (this.userId != null) {
			curUser = Ranking.findOne({
				gameId : gameId,
				userId : this.userId});
			if(curUser){
				if (curUser.maxScore < score){
					curUser.maxScore = score;
				}
				curUser.totalScore +=score;
				
				rango = Rangos.findOne({game_id:gameId, minPoints:{$gt: curUser.totalScore}});
				//curUser.rango_id = rango._id;
				
				Ranking.update(curUser._id, {$set : {
					rango_id:rango._id,
					totalScore:curUser.totalScore,
					maxScore:curUser.maxScore,
				}});
				
				
				
			}else{
				rango = Rangos.findOne({game_id:gameId, minPoints:{$gt: score}});
				Ranking.insert({
					gameId : gameId,
					userId : this.userId,
					maxScore : score,
					totalScore: score, 
					rango_id:rango._id
				});
			}
			
			return true;
		} else {
			return false;
		}
	}
});
 