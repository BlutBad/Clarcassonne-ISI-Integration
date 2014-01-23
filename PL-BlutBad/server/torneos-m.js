


/* ****************************************************** */
var insertPartyVolatiles = function (torid, party, etapa) {
    PartidasVolatiles.insert({
        torneo_id: torid,
        jugadores : party.jugadores,
        party_id: party.party_id,
        etapa: etapa,
        listos: false,
    });
};



var addSomeUsers = function(participantes, num) {
    //console.log("addSomeUsers");
    var party = {};
    party.jugadores = [];
    party.puntuacion = [];
    // -1 porque si paso 3, se cogeran 4 y no 3, el 0 cuenta.
    ///console.log("__Participantes.length:" + participantes.length + ", num: "+num);
    for (var i = num-1; i >= 0; i--) {
        var rnd = Math.floor(Math.random() * participantes.length);

        //console.log("\trnd: " + rnd+ ", id: "+participantes[rnd]);

        party.jugadores.push({  user_id : participantes[rnd],
                                estado  : "Torneo Inactivo"});

        party.party_id = Math.floor(Math.random()*2000000);
        participantes = _.without(participantes, participantes[rnd]);
    }

    //party.ganador = playerWiner(party.puntuacion);

    return {party: party, participantes:participantes};
}

var getPlayersEtapa = function (partidas, toSlice) {
    //console.log("getPlayersEtapa");
    //console.log(partidas);
    var players = [];
    for (var i = partidas.length - 1; i >= 0; i--) {
        for (var j = partidas[i].jugadores.length - 1; j >= 0; j--) {
            players.push(partidas[i].jugadores[j]);
        };
    };
    
    //console.log("players sortBy 1 ");
    //console.log(players);

    players = _.sortBy(players, function(num){ return num.puntos;});

    

    var players_id = [];
    for (var i = players.length - 1 , sli = i-toSlice; i >= 0 && i>=sli; i--) {
        players_id.push(players[i].user_id);
    };

    //console.log("players sortBy 2 , slice " + toSlice);
    //console.log(players_id);
    //players = players.slice(players.length-toSlice,players.length);
    return players_id;
    //return players;
}


//la etapa es previa etapa, si por ejemplo le paso participantes, es que se 
//van a crear las partidas para la siguiente etapa, octavos o cuartos.
var crearPartidasEtapa = function (etapa, tid, firstFlag) {
    //console.log("Crear partidas | ETAPA: " +etapa+"\n");
    //var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne(tid);

    var participantes = [];
    if (etapa == "participantes" || firstFlag) {
            participantes = tor.participantes;
    } else {
            participantes = getPlayersEtapa(tor.etapas[etapa].partidas,
                                            tor.etapas[etapa].maxPlayersNextEtapa);
            //console.log("Partidas para la ->" + etapa);
    };

    console.log(etapa);
    partys = [];
    if (participantes.length<3){
        console.log("Imposible crear al menos una partida");
        return false;
    }else{
        for (var k=0;participantes.length > 0 && k<30;k++) {
            var mod= participantes.length % 4;

            if(mod == 2 || mod == 3){
                var ret = addSomeUsers(participantes,3);
            }else if (mod ==1) {
                var ret = addSomeUsers(participantes,5);
            }else if (mod == 0){
                var ret = addSomeUsers(participantes,4);
            };

            partys.push(ret.party);
            participantes = ret.participantes;
            
            };

        };
    //console.log("\t__Partidas Creadas__");
    //console.log(partys);
    return partys;
}

var primeraEtapa = function(tid){
    //console.log("primeraEtapa");
    //var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne(tid);
    var etapa = "octavos";
    //console.log(tor.etapas);
    //Si no hay octavos, entonces no se ha creado ninguna etapa todavia
    if (    !tor.etapas.octavos.start   &&
            !tor.etapas.cuartos.start   &&
            !tor.etapas.semifinal.start &&
            !tor.etapas.final.start         ){

        var partidas = crearPartidasEtapa("participantes", tid);

        var numP  = tor.participantes.length;
        
        var inRange = function(num, lo, hi){
            console.log("inRange");
            return num >= lo && num <= hi;
        };
        
        if(inRange(numP, 3, 5)){
            //crearPartidasEtapa("final");
            //console.log("final");
            etapa = "final";
            //partidas = crearPartidasEtapa("semifinal", tid, true);
            Torneos.update(tid, {$set:  {"etapas.octavos.start": true,
                                        "etapas.octavos.finish": true,
                                        "etapas.cuartos.start": true,
                                        "etapas.cuartos.finish": true,
                                        "etapas.semifinal.start": true,
                                        "etapas.semifinal.finish": true,
                                        "etapas.final.start": true,
                                        "etapas.final.partidas": partidas}
                                });


        }else if(inRange(numP, 5, 17)){
            //crearPartidasEtapa("semifinal");
            //console.log("semifinal");
            //partidas = crearPartidasEtapa("cuartos", tid, true);
            etapa = "semifinal";
            Torneos.update(tid, {$set:  {"etapas.octavos.start": true,
                                        "etapas.octavos.finish": true,
                                        "etapas.cuartos.start": true,
                                        "etapas.cuartos.finish": true,
                                        "etapas.semifinal.start": true,
                                        "etapas.semifinal.partidas": partidas}
                                });

        }else if(inRange(numP, 18, 65)){
            //console.log("cuartos");
            etapa = "cuartos";
            //crearPartidasEtapa("cuartos");
            //partidas = crearPartidasEtapa("octavos", tid, true);
            Torneos.update(tid, {$set:  {"etapas.octavos.start": true,
                                        "etapas.octavos.finish": true,
                                        "etapas.cuartos.start": true,
                                        "etapas.cuartos.partidas": partidas}
                                });
            

        }else if(inRange(numP, 66, 257)){
            //console.log("octavos");
            etapa = "octavos";
            //partidas = crearPartidasEtapa("participantes", tid, true);
            Torneos.update(tid, {$set:  {"etapas.octavos.start": true,
                                        "etapas.octavos.partidas": partidas}
                                });
        }

        //console.log(partidas);

        //Insertar las partidas de la etapa a las partidas volatiles para que se puedan jugar
        for (var i = partidas.length - 1; i >= 0; i--) {
            insertPartyVolatiles(tid, partidas[i], etapa);
        };
    }
    
}



var  nextEtapa = function(tid){

    //var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne({_id:tid});
    

    var partidas = [];
    var etapa;

    if(tor.etapas.semifinal.finish){
        etapa = "final";
        var partidas = crearPartidasEtapa("semifinal",tid);
        if(partidas){
            Torneos.update(tid, {$set:      {//"etapas.semifinal.finish": true,
                                            "etapas.final.start" : true,
                                            "etapas.final.partidas": partidas}
                                        });
        }

    }else if (tor.etapas.cuartos.finish){
        etapa = "semifinal";
        var partidas = crearPartidasEtapa("cuartos",tid);
        if(partidas){
            Torneos.update(tid, {$set:      {//"etapas.cuartos.finish": true,
                                            "etapas.semifinal.start" : true,
                                            "etapas.semifinal.partidas": partidas}
                                        });
        }

    }else if (tor.etapas.octavos.finish){
        etapa = "cuartos";
        var partidas = crearPartidasEtapa("octavos",tid);
        if(partidas){
            Torneos.update(tid, {$set:  {   //"etapas.octavos.finish": true,
                                            "etapas.cuartos.start": true,
                                            "etapas.cuartos.partidas": partidas}
                                        });
        }
    }else{
        console.log("algo raro nextEtapa");
    }

    if(partidas){
        for (var i = partidas.length - 1; i >= 0; i--) {
                insertPartyVolatiles(tid, partidas[i], etapa);
            };
    };
}


var matchMulti = function(party_id){
	//console.log("matchMultiFinish " + party_id);

	var party = Partidas.findOne(party_id);

    if(party.torneo_id){
    	var tor = Torneos.findOne(party.torneo_id);

    	for (var i = party.puntuacion.length - 1; i >= 0; i--) {
    		//console.log("ranking s");
    		//party.puntuacion[i].user_id
    		var tu = Torneos.update({"ranking.user_id" : party.puntuacion[i].user_id},
    								{$inc:{"ranking.$.score": party.puntuacion[i].puntos}});

    		//console.log(party);
    		if (tu==0) {
    			tu = Torneos.update(party.torneo_id, {$push: {ranking: {
    														 	user_id : party.puntuacion[i].user_id,
    															score: party.puntuacion[i].puntos 
    																	}
    												}
    											});
    		}

    		//console.log(tu);
    	};
    }
        console.log("Partida no del torneo.");

        
        
        party.puntuacion.forEach(function(each, index){
            opts = {};
            if (index == 0){
                opts.win = true;
            }else{
                opts.win = false;
            }
            opts.score = each.puntos;
            opts.user_id = each.user_id;
            opts.game_id = party.game_id;
            Meteor.call("matchFinish", opts); 
        });


};



Meteor.methods({
	matchMultiFinish: function (party_id) {
		matchMulti(party_id);
	}, 
	
	primeraEtapa : function (tid) {
		primeraEtapa(tid);
	},

	nextEtapa : function (tid) {
		nextEtapa(tid);
	},
    resetearTorneo: function (tid) {
        Torneos.update(tid, {$set:  {etapas : { octavos:    {start:false,finish:false, maxPlayersNextEtapa: 64, partidas:[]},
                                                cuartos:    {start:false,finish:false, maxPlayersNextEtapa: 16, partidas:[]}, 
                                                semifinal:  {start:false,finish:false, maxPlayersNextEtapa: 4,  partidas:[]},
                                                final:      {start:false,finish:false, maxPlayersNextEtapa: 1000, partidas:[]}
                                            },
                                    ranking: [],
                                    }
                            });
    },

	simularPartidasEtapa: function(tid){
		//console.log("_ini_");
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

		//console.log("how partys PartidasVolatiles: " + partys.count());
		partys.forEach(function(each){
			//console.log(each);
			//console.log(tor.etapas[each.etapa]);

			//console.log(each);
			var puntuacion = [];
			var ganador = null;
			tor.etapas[each.etapa].partidas.forEach(function(each2, index2){
				//console.log(each2);
				if (each2.party_id === each.party_id){
					for (var i = each.jugadores.length - 1; i >= 0; i--) {
						var puntos = (Math.floor(Math.random()*200));
						puntuacion.push({user_id: each.jugadores[i].user_id,
										puntos	: puntos,
                                        estado : "Partida Terminada",
									    });
                        
						//tor.etapas[each.etapa].partidas[index2].jugadores[i].puntos = puntos;
						//console.log(tor.etapas[each.etapa].partidas[index2]);
					};
                    puntuacion = _.sortBy(puntuacion, function(num){ return -1*num.puntos; });

                        //console.log("->");
                    tor.etapas[each.etapa].partidas[index2].jugadores = puntuacion;

					ganador = playerWiner(puntuacion);
					tor.etapas[each.etapa].partidas[index2].ganador = ganador;
                    
                    console.log(tor.etapas[each.etapa].start, "+ + ", tor.etapas[each.etapa].finish);
                    tor.etapas[each.etapa].finish = true;
                    console.log(tor.etapas[each.etapa].start, "+ + ", tor.etapas[each.etapa].finish);
                    
                    //console.log("true")	
					//console.log("find ok");
					//tor.etapas[each.etapa].partidas[index22].puntuacion = puntuacion;
					
		    		
		    		var obj = tor.etapas;
		    		//obj[each.etapa].huak = "XXX";
					Torneos.update(tor._id, {$set: {etapas:obj}});
				}
			});


			

			var partida_id = Partidas.insert({
				                jugadores 	: each.jugadores,
				                puntuacion	: puntuacion,
				                ganador		: ganador,
				                torneo_id	: tid,
				                etapa 		: each.etapa,  
				                terminada 	: true,
                                game_id     : tor.game_id, 
                			});

			matchMulti(partida_id);

			//console.log("partida_id: " +partida_id);

			//console.log("_fin_");

                //Estas partidas no son actuales, ya que se va pasar a la siguiente etapa del torneo, 
                //y son de la anterior.
            var partysToRemove = PartidasVolatiles.find({torneo_id: tid});
            partysToRemove.forEach(function(each) {
                PartidasVolatiles.remove(each._id)
            });

		});
	},

});