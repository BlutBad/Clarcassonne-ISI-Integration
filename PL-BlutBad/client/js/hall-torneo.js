// http://bootsnipp.com/snippets/featured/radio-button-tabs
// http://bootsnipp.com/snippets/featured/simple-blog-layout-example

Template.hall_torneo.show = function() {
  return Session.get('current_stage') == 'showTorneo';
};

var levelsPosition = {
        i:"label label-important",
        ii:"label label-warning",
        iii:"label label-success",
        o:"label",
};

var getClass = function(index){
    if(index == 0){
        clacc  = levelsPosition.i;
    }else if(index ==1){
        clacc  = levelsPosition.ii;
    }else if (index ==2){
        clacc  = levelsPosition.iii;
    }else{
        clacc  = levelsPosition.o;
    }
    return clacc;
}

//Informacion general sobre el torneo!
Template.hall_torneo.torneo = function() {
    var tid = Session.get('showTorneoId');
    return Torneos.findOne(tid);
}

Template.hall_torneo.numParticip = function() {
    var tid = Session.get('showTorneoId');
    return Torneos.findOne(tid).participantes.length;
};


Template.hall_torneo.participoClass = function() {
    var tid = Session.get('showTorneoId');
    u_id = Meteor.userId();
    if (u_id){
        var u = Torneos.findOne({_id:tid, participantes: {$in: [u_id]}});
        if (u){
            return 'label label-success';
        }
    }
    return 'label';
}

/*
Template.hall_torneo.creador = function() {
    var tid = Session.get('showTorneoId');
    creator = Torneos.findOne(tid).user_create; 
    if (creator == Meteor.userId())
        return true;
    return false;
}
*/
var insertPartyVolatiles = function (torid, party, etapa) {
    PartidasVolatiles.insert({
        torneo_id: torid,
        jugadores : party.jugadores,
        party_id: party.party_id,
        etapa: etapa,
        listos: false,
    });
};

var playerWiner = function (players) {
    var maxPlayer = players[0];
    for (var i = players.length - 1; i >= 0; i--) {
        if (players[i].puntos > maxPlayer.puntos){
            maxPlayer = players[i];
        }
    };
    return maxPlayer;
};

var addSomeUsers = function(participantes, num) {
    console.log("addSomeUsers");
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
        //party.puntuacion.push({user_id  : participantes[rnd],
        //                        puntos  : (Math.floor(Math.random()*200))});
        party.party_id = Math.floor(Math.random()*2000000);
        participantes=_.without(participantes, participantes[rnd]);
    }

    //party.ganador = playerWiner(party.puntuacion);

    return {party: party, participantes:participantes};
}

var getPlayersEtapa = function (partidas, toSlice) {
    console.log("getPlayersEtapa");
    //console.log(partidas);
    var players = [];
    for (var i = partidas.length - 1; i >= 0; i--) {
        for (var j = partidas[i].puntuacion.length - 1; j >= 0; j--) {
            players.push(partidas[i].puntuacion[j]);
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
var crearPartidasEtapa = function (etapa) {
    console.log("Crear partidas | ETAPA: " +etapa+"\n");
    var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne(tid);

    var participantes = [];
    if (etapa == "participantes") {
            participantes = tor.participantes;
    } else {
            participantes = getPlayersEtapa(tor.etapas[etapa].partidas,
                                            tor.etapas[etapa].maxPlayersNextEtapa);
            //console.log("Partidas para la ->" + etapa);
    };


    partys = [];
    if (participantes.length<3){
        console.log("Imposible crear al menos una partida");
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

var primeraEtapa = function(){
    console.log("primeraEtapa");
    var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne(tid);

    //console.log(tor.etapas);
    //Si no hay octavos, entonces no se ha creado ninguna etapa todavia
    if (!tor.etapas.octavos.start){

        var partidas = crearPartidasEtapa("participantes");

        var numP  = tor.participantes.length;
        
        var inRange = function(num, lo, hi){
            console.log("inRange");
            return num >= lo && num <= hi;
        };
        
        if(inRange(numP, 3, 5)){
            //crearPartidasEtapa("final");
            console.log("final");
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
            console.log("semifinal");
            Torneos.update(tid, {$set:  {"etapas.octavos.start": true,
                                        "etapas.octavos.finish": true,
                                        "etapas.cuartos.start": true,
                                        "etapas.cuartos.finish": true,
                                        "etapas.semifinal.start": true,
                                        "etapas.semifinal.partidas": partidas}
                                });

        }else if(inRange(numP, 18, 65)){
            console.log("cuartos");
            //crearPartidasEtapa("cuartos");
            Torneos.update(tid, {$set:  {"etapas.octavos.start": true,
                                        "etapas.octavos.finish": true,
                                        "etapas.cuartos.start": true,
                                        "etapas.cuartos.partidas": partidas}
                                });
            

        }else if(inRange(numP, 66, 257)){
            console.log("octavos");
            Torneos.update(tid, {$set:  {"etapas.octavos.start": true,
                                        "etapas.octavos.partidas": partidas}
                                });
        }

        console.log(partidas);

        //Insertar las partidas de la etapa a las partidas volatiles para que se puedan jugar
        for (var i = partidas.length - 1; i >= 0; i--) {
            insertPartyVolatiles(tid, partidas[i], "octavos");
        };
    }
    
}




Template.hall_torneo.events = {
    //Apuntarme o Salir del torneo
    'click .apuntarme': function() {
        u_id = Meteor.userId();
        if (u_id){
            var u = Torneos.findOne({_id:this._id, participantes: {$in: [u_id]}, finalizado: { $exists: false }});
                if (u) {
                    Torneos.update(this._id, {$pull: {participantes: u_id}});
                }else{
                    Torneos.update(this._id, { $push : {participantes : u_id}});
                }
        }
    },
    'click .startTorneo': function() {
        //console.log("Start Torneo");
        primeraEtapa();
        //crearPartidasEtapa("octavos");
    },
    'click .finalizarTorneo': function() {
        //stopTorneo();
    },
    'click .jugarEtapa': function() {
        console.log("jugarEtapa");
        //hacerEtapa()
        nextEtapa();
    },
    'click .etapasTorneo': function(){
        console.log(this);
        if (Session.equals('etapasTorneoActive',this.etapa)){
            Session.set('etapasTorneoActive', null);
        }else{
            Session.set('etapasTorneoActive', this.etapa);
        }
    },
    'click .simularEtapa':function(){
        var tid = Session.get('showTorneoId');
        Meteor.call("simularPartidasEtapa", tid); 
    },
    'click .multiMenuTorneo' : function(){
        console.log(this);
        if (Session.equals('multiMenuTorneoActive',this.short)){
            Session.set('multiMenuTorneoActive', null);
        }else{
            Session.set('multiMenuTorneoActive', this.short);
        }
    }
};


function stopTorneo() {
    var tid = Session.get('showTorneoId');
    Torneos.update(tid, {$set:{finalizado: true}});
}

//******************MULTI TORNEO*************************

Template.hall_torneo.multiTorneo = function() {
    var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne(tid);
    var gameM = Juegos.findOne(tor.game_id); //aqui esta el error
    return gameM.mode == "multi";
}

Template.hall_torneo.partidasTorneo = function() {
    var tid = Session.get('showTorneoId');
    var partys = PartidasVolatiles.find({torneo_id:tid});
    pp  = [];
    partys.forEach(function(each, index) {
        each.no = (index+1);
        pp.push(each);
    });
    return pp;
}




/*
1. Las etapa son indep del klarki hall, eliminar las partidas de las etapas viejas



*/

var  nextEtapa = function(){
    var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne({_id:tid});
    
    //Estas partidas no son actuales, ya que se va pasar a la siguiente etapa del torneo, 
    //y son de la anterior.
    var partysToRemove = PartidasVolatiles.find({torneo_id: tid});
    partysToRemove.forEach(function(each) {
        PartidasVolatiles.remove(each._id)
    });
    

    var partidas = [];
    var etapa;
    if (!tor.etapas.octavos.finish){
        etapa = "cuartos";
        var partidas = crearPartidasEtapa("octavos");
        Torneos.update(tid, {$set:  {   "etapas.octavos.finish": true,
                                        "etapas.cuartos.start": true,
                                        "etapas.cuartos.partidas": partidas}
                                    });

    }else if (!tor.etapas.cuartos.finish){
        etapa = "semifinal";
        var partidas = crearPartidasEtapa("cuartos");
        Torneos.update(tid, {$set:      {"etapas.cuartos.finish": true,
                                        "etapas.semifinal.start" : true,
                                        "etapas.semifinal.partidas": partidas}
                                    });

    }else if(!tor.etapas.final.finish){
        etapa = "final";
        var partidas = crearPartidasEtapa("semifinal");
        Torneos.update(tid, {$set:      {"etapas.semifinal.finish": true,
                                        "etapas.final.start" : true,
                                        "etapas.final.partidas": partidas}
                                    });
    }else{
        etapa = "final";
        var partidas = crearPartidasEtapa(etapa);
        Torneos.update(tid, {$set:  {"etapas.final.finish": true} });
    }

    for (var i = partidas.length - 1; i >= 0; i--) {
            insertPartyVolatiles(tid, partidas[i], etapa);
        };


}


Deps.autorun(function(c) {
    var tid = Session.get('showTorneoId');
});


// El menu del multiTorneo, ETAPAS | RANKING
Template.hall_torneo.multiMenuTorneo = function() {
  return Menu.find({menuType : "multiTorneo"});
};

Template.hall_torneo.multiMenuTorneoActive = function() {
  return Session.equals('multiMenuTorneoActive', this.short) ? 'active' : '';
};


// Mostrar el menu de las ETAPAS del multi-torneo
Template.hall_torneo.showEtapasTorneo = function() {
  return Session.equals('multiMenuTorneoActive', 'etapas');
};

//Mostrar las etapas del torneo, curtos, semi, final..
Template.hall_torneo.etapasTorneo = function() {
  return Menu.find({menuType : "torneoEtapas"});
};


//Sacar las tablas de la etapa o participantes
Template.hall_torneo.showEtapa = function() {
  return !Session.equals('etapasTorneoActive', "participantes");
};

Template.hall_torneo.showParticipantes = function() {
  return Session.equals('etapasTorneoActive', "participantes");
};

Template.hall_torneo.etapasTorneoActive = function() {
  return Session.equals('etapasTorneoActive', this.etapa) ? 'active' : '';
};




Template.showInfoEtapaTorneo.info = function() {
    var etapa = Session.get('etapasTorneoActive');
    var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne(tid);

    var info = {};
    if (tor.etapas[etapa]){
        info.partidas = tor.etapas[etapa].partidas.length;
        info.participantes = 99;
    }else{
        return null;
    }
    
    return info;
};

//Partidas de cada etapa del torneo!
Template.showEtapaTorneo.partidasEtapaTorneo = function() {
    if (!Session.equals('etapasTorneoActive', "participantes")) {
        var etapa = Session.get('etapasTorneoActive');
        var tid = Session.get('showTorneoId');
        var tor = Torneos.findOne(tid);

        console.log(tor.etapas)

        if(etapa == "octavos"){
            return tor.etapas.octavos.partidas;
        }else if(etapa == "cuartos"){
            return tor.etapas.cuartos.partidas;
        }else if (etapa == "semifinal"){
            return tor.etapas.semifinal.partidas;
        }else if (etapa == "final"){    
            return tor.etapas.final.partidas;
        }else{
            return [];
        }

        //console.log("partidasEtapaTorneo: " + etapa)

        
    };
};

//Mostar los participantes del torneo!
Template.participantes.participantes = function(){
    var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne({_id:tid});
    return tor.participantes;
}




// Mostrar el RANKING del torneo!
Template.hall_torneo.showRankingTorneo = function() {
  return Session.equals('multiMenuTorneoActive', 'ranking');
};






//******************SOLO TORNEO*************************

Template.hall_torneo.soloTorneo = function() {
    var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne(tid);
    var gameM = Juegos.findOne(tor.game_id);
    var tran = Torneos.findOne(tid).ranking;
    return gameM.mode == "solo" && tran;
}


Template.hall_torneo.soloRanking = function(limit) {
    var tid  = Session.get('showTorneoId');
    var tran = Torneos.findOne(tid).ranking;
    
    if (limit){
        console.log("slice");
        tran =  tran.slice(0,3);
    }
    
    ranking  = [];
    tran.forEach(function(each, index) {
        each.no = index+1;
        each.clacc = getClass(index);
        ranking.push(each);
    });
    return ranking;
};

Template.hall_torneo.finishTorneo = function() {
    var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne({_id:tid, finalizado:true});
    if (tor){
        return true;
    }
    return false;
}





