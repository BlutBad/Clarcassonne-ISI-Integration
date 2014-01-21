
Meteor.methods({

	// Hay un bug, de vez en cuando sale nul en el id del game :(
	// No soy capaz de reproducir la misma situacion para ver donde falla
	// Hay que registrarse o identificarse!!!!!!
	
	
	
	//Meteor.call("matchFinish", Session.get("current_game"), gameAlien.points);
	
	matchFinish : function(opts) { 
	    //console.log(opts);
		if (this.userId != null) {

        	if(opts.user_id != null){
        	    user_id = opts.user_id;
        	}else{
        	    user_id = this.userId
        	}
    		
            game_id = opts.game_id;
            
            curUser = Ranking.findOne({
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

				
				rango = Rangos.findOne({game_id:game_id, minPoints:{$gte: curUser.totalScore}});

				
				
				/*
				insig = Insignias.findOne({game_id:game_id, timesPlayed:{$gte: curUser.timesPlayed}});
				
				insigToUser = InsigniasToUser.findOne({user_id:curUser.userId, game_id:game_id});
				
				if(!!insigToUser){
					InsigniasToUser.insert({user_id:curUser.userId,
											game_id:gameId,
											insignia_id: insig._id});
				}
				*/
				
				
				
				
				Ranking.update(curUser._id, {$set : {
					rango_id:rango._id,
					totalScore:curUser.totalScore,
					maxScore:curUser.maxScore,
					timesPlayed: curUser.timesPlayed,
					winTimes: curUser.winTimes,
				    loseTimes: curUser.loseTimes,
				}});
				
				
				
			}else{
				rango = Rangos.findOne({game_id:game_id, minPoints:{$gte: opts.score}});
				
				
				//insig = Insignias.findOne({game_id:gameId, timesPlayed:{$gte: 1}});	
				
				//InsigniasToUser.insert({user_id:userId,game_id:gameId,insignia_id: insig._id});
			
				if (opts.win){
				    winTimes=1;
				    loseTimes=0;
				}else{
				    loseTimes = 1;
				    winTimes = 0;
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
	},

	simularPartidasEtapa: function(tid){
		console.log("_ini_");
		var playerWiner = function (players) {
		    var maxPlayer = players[0];
		    for (var i = players.length - 1; i >= 0; i--) {
		        if (players[i].puntos > maxPlayer.puntos){
		            maxPlayer = players[i];
		        }
		    };
		    return maxPlayer;
		};


		var tor = Torneos.findOne(tid);
		var partys = PartidasVolatiles.find({torneo_id:tid});

		console.log("how partys PartidasVolatiles: " + partys.count());
		partys.forEach(function(each){
			var puntuacion = [];


			for (var i = each.jugadores.length - 1; i >= 0; i--) {
				puntuacion.push({user_id: each.jugadores[i].user_id,
								puntos	: (Math.floor(Math.random()*200))});
			};
		
			var ganador = playerWiner(puntuacion);

			var partida_id = Partidas.insert({
				                jugadores 	: each.jugadores,
				                puntuacion	: puntuacion,
				                ganador		: ganador,
				                torneo_id	: tid,
				                etapa 		: each.etapa,  
				                terminada 	: true,
                			});
			console.log("partida_id: " +partida_id);	

			var etapa = each.etapa;
			
			
			var index22 = 0;
			//console.log(each);
			//console.log(tor.etapas[each.etapa]);

			
			tor.etapas[each.etapa].partidas.forEach(function(each2, index2){
				if (each2.party_id === each.party_id){
					index22 = index2;	
					console.log("find ok");
					tor.etapas[each.etapa].partidas[index22].puntuacion = puntuacion;
		    		tor.etapas[each.etapa].partidas[index22].ganador = ganador;
		    		var obj = tor.etapas;
		    		//obj[each.etapa].huak = "XXX";
					Torneos.update(tor._id, {$set: {etapas:obj}});
				}
			});

			console.log("_fin_");
		});
	}
});
 