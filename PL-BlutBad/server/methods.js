

var darInsignias = function (user_id, game_id, curUser) {

	var yalatiene = function (insignia_id) {
		console.log("yalatiene");
		//Comprobar si no la tiene ya, si la tiene no darsela otra vez!
		insigToUser = InsigniasToUser.findOne({user_id:user_id,
												 game_id:game_id,
												 insignia_id: insig._id});
		return insigToUser;
	};

	var darsela = function (insignia_id) {
		console.log("darsela");
		return InsigniasToUser.insert({user_id:user_id,
								game_id:game_id,
								insignia_id: insig._id});
	};



	var curUser = Ranking.findOne({	game_id : game_id,
									user_id : user_id});


	//3 veces jugadas y 3000 puntos
	var insig = Insignias.findOne({	game_id:game_id,
									minPoint:{$lte: curUser.totalScore},
									timesPlayed:{$gte: curUser.timesPlayed}
									});
	if (insig){
		console.log(insig)
		if(!yalatiene(insig._id)){
			darsela(insig._id);
		}
	}
	

	// x partidas ganas seguidas
	var insig = Insignias.findOne({	game_id:game_id,
									timesPlayed:{$lte: curUser.timesPlayed},
									winStreak:{$lte: curUser.winStreak}});
	if (insig){
		if(!yalatiene(insig._id)){
			darsela(insig._id);
		}
	}	

	//ser el 1 en el ranking
	var insig = Insignias.findOne({	game_id:game_id,
									firstInRankingScore:true});

	var ranking = Ranking.find({game_id:game_id},{sort:{maxScore: -1}}).fetch();
	console.log(ranking[0].user_id, user_id);
	if(ranking[0].user_id == user_id){
		if (insig){
			if(!yalatiene(insig._id)){
				var ins_id = darsela(insig._id);
				if (insig.owner != ins_id)
				//insig.owner = ins_id; //id de la insignia asignada al user.

				InsigniasToUser.remove(insig.owner);

				Insignias.update(insig._id, {$set:{owner: ins_id}});
			}
		}
	}

	//tener el rango mas alto
	var insig = Insignias.findOne({	game_id:game_id,
									firstInRankingTotalScore:true});

	var ranking = Ranking.find({game_id:game_id},{sort:{totalScore: -1}}).fetch();
	console.log(ranking[0].user_id, user_id);
	if(ranking[0].user_id == user_id){
		if (insig){
			if(!yalatiene(insig._id)){
				var ins_id = darsela(insig._id);
				if (insig.owner != ins_id)
				//insig.owner = ins_id; //id de la insignia asignada al user.

				InsigniasToUser.remove(insig.owner);

				Insignias.update(insig._id, {$set:{owner: ins_id}});
			}
		}
	}	
};


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
				    curUser.winStreak +=1; 
				}else{
				    curUser.loseTimes +=1;
				    curUser.winStreak = 0;
				}
				curUser.timesPlayed +=1;
				curUser.totalScore +=opts.score;

				
				

				var rango = Rangos.findOne({game_id:game_id,
											untilPoints:{$gte: curUser.totalScore}});

				Ranking.update(curUser._id, {$set : {
												rango_id:rango._id,
												totalScore:curUser.totalScore,
												maxScore:curUser.maxScore,
												timesPlayed: curUser.timesPlayed,
												winTimes: curUser.winTimes,
											    loseTimes: curUser.loseTimes,
											    winStreak: curUser.winStreak,
								}});
				
				
				

				
			}else{
				//console.log("kaka "  + game_id, "  ", opts.score);
				var rango = Rangos.findOne({game_id:game_id, untilPoints:{$gte: opts.score}});
				//console.log("kaka "  + rango);

				if (opts.win){
				    var winTimes=1;
				    var loseTimes=0;
				    var winStreak= 1;
				}else{
				    var loseTimes = 1;
				    var winTimes = 0;
				    var winStreak = 0;
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
							winStreak: winStreak,
						});


			}

			darInsignias(user_id, game_id);
			
			

	                 
	                 
		    if (opts.torneo_id){
		        var u = Torneos.findOne({_id:opts.torneo_id,"ranking.user_id":user_id});
		        console.log(u);
		        if (u){
		           Torneos.update({_id:opts.torneo_id, "ranking.user_id": user_id},
		                           {$set : {"ranking.$.score" : opts.score}});
		        }else{
		            Torneos.update(opts.torneo_id, {$push: { ranking: {user_id:user_id, score:opts.score} } });
		        }
		    }
			
			
			return true;
		} else {
			return false;
		}
	}
});
 