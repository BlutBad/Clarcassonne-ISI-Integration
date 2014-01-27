
Meteor.methods({

	// Hay un bug, de vez en cuando sale nul en el id del game :(
	// No soy capaz de reproducir la misma situacion para ver donde falla
	// Hay que registrarse o identificarse!!!!!!
	
	
	
	//Meteor.call("matchFinish", Session.get("current_game"), gameAlien.points);
	
	matchFinish : function(opts) { 
	    //console.log(opts);
		if (this.userId != null) {
			var user_id;
        	if(opts.user_id != null){
        	    user_id = opts.user_id;
        	}else{
        	    user_id = this.userId
        	}
    		
            var game_id = opts.game_id;
            
            var curUser = Ranking.findOne({
    				game_id : game_id,
    				user_id : user_id});
			
			if(curUser){
			    //Estadisticas de cuantas veces ha jugado, ganado, perdido, puntuacion total.
				if (curUser.maxScore < opts.score){
					curUser.maxScore = opts.score;
				}
				
				if (opts.win){
				    curUser.winTimes +=1;
				}else{
				    curUser.loseTimes +=1;
				}
				curUser.timesPlayed +=1;
				curUser.totalScore +=opts.score;

				
				var rango = Rangos.findOne({game_id:game_id,
											minPoints:{$gte: curUser.totalScore}});

				
				
				
				insig = Insignias.findOne({	game_id:game_id,
											timesPlayed:{$gte: curUser.timesPlayed}});
				console.log("insig"  + insig);

				insigToUser = InsigniasToUser.findOne({user_id:user_id, game_id:game_id});
				console.log("insigToUser"  + insigToUser);
				if(!insigToUser){
					console.log("go to insert");
					InsigniasToUser.insert({user_id:user_id,
											game_id:game_id,
											insignia_id: insig._id});
				}
				
				
				
				
				
				Ranking.update(curUser._id, {$set : {
												rango_id:rango._id,
												totalScore:curUser.totalScore,
												maxScore:curUser.maxScore,
												timesPlayed: curUser.timesPlayed,
												winTimes: curUser.winTimes,
											    loseTimes: curUser.loseTimes,
								}});
				
				

				
			}else{
				//console.log("kaka "  + game_id, "  ", opts.score);
				var rango = Rangos.findOne({game_id:game_id, minPoints:{$gte: opts.score}});
				//console.log("kaka "  + rango);
				
				//insig = Insignias.findOne({game_id:gameId, timesPlayed:{$gte: 1}});	
				
				//InsigniasToUser.insert({user_id:userId,game_id:gameId,insignia_id: insig._id});
			
				if (opts.win){
				    var winTimes=1;
				    var loseTimes=0;
				}else{
				    var loseTimes = 1;
				    var winTimes = 0;
				}
				
				Ranking.insert({
							game_id : game_id,
							user_id : user_id,
							maxScore : opts.score,
							totalScore: opts.score, 
							rango_id:rango._id,
							timesPlayed: 1,
							winTimes:winTimes,
							loseTimes:loseTimes,
						});
			}
			
			

	                 
	                 
		    if (opts.torneo_id){
		        var u = Torneos.findOne({_id:opts.torneo_id,"ranking.user_id":user_id});
		        console.log(u);
		        if (u){
		           Torneos.update({_id:opts.torneo_id, "ranking.user_id": user_id},
		                           {$set : {"ranking.$.maxScore" : opts.score}});
		        }else{
		            Torneos.update(opts.torneo_id, {$push: { ranking: {user_id:user_id, maxScore:opts.score} } });
		        }
		    }
			
			
			return true;
		} else {
			return false;
		}
	}
});
 