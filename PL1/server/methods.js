
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

				
				rango = Rangos.findOne({game_id:gameId, minPoints:{$gte: curUser.totalScore}});
				//curUser.rango_id = rango._id;
				
				
				curUser.timesPlayed +=1;
				insig = Insignias.findOne({game_id:gameId, timesPlayed:{$gte: curUser.timesPlayed}});
				
				insigToUser = InsigniasToUser.findOne({user_id:curUser.userId, game_id:gameId});
				if(!!insigToUser){
					InsigniasToUser.insert({user_id:curUser.userId,
											game_id:gameId,
											insignia_id: insig._id});
				}
				
				
				
				
				Ranking.update(curUser._id, {$set : {
					rango_id:rango._id,
					totalScore:curUser.totalScore,
					maxScore:curUser.maxScore,
					timesPlayed: curUser.timesPlayed
				}});
				
				
				
			}else{
				rango = Rangos.findOne({game_id:gameId, minPoints:{$gte: score}});
				
				
				insig = Insignias.findOne({game_id:gameId, timesPlayed:{$gte: 1}});	
				
				InsigniasToUser.insert({user_id:this.userId,
											game_id:gameId,
											insignia_id: insig._id});
			
				
				Ranking.insert({
					gameId : gameId,
					userId : this.userId,
					maxScore : score,
					totalScore: score, 
					rango_id:rango._id,
					timesPlayed: 1
				});
			}
			
			return true;
		} else {
			return false;
		}
	}
});
 