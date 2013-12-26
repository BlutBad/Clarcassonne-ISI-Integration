// http://bootsnipp.com/snippets/featured/radio-button-tabs
// http://bootsnipp.com/snippets/featured/simple-blog-layout-example

Template.hall_torneo.show = function() {
  return Session.get('current_stage') == 'showTorneo';
};


Template.hall_torneo.torneoId = function() {
    return Session.get('showTorneoId');
}



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

Template.hall_torneo.events = {
    //Apuntarme o Salir del torneo
    'click .apuntarme': function() {
        u_id = Meteor.userId();
        if (u_id){
            var u = Torneos.findOne({_id:this._id, participantes: {$in: [u_id]}});
            if (u) {
                Torneos.update(this._id, {$pull: {participantes: u_id}});
            }else{
                Torneos.update(this._id, { $push : {participantes : u_id}});
            }
        }
    },
    
    'click .startTorneo': function() {
        //console.log("Start Torneo");
        startTorneo();
    }
};

//******************MULTI TORNEO*************************

Template.hall_torneo.multiTorneo = function() {
    var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne(tid);
    var gameM = Juegos.findOne(tor.game_id);
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


function insertPartyVolatiles(torid, participantes) {
    PartidasVolatiles.insert({
        torneo_id: torid,
        jugadores :participantes,
        create_at:  Date.now(),
    });
};

function startTorneo() {
    var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne(tid);
    
    var numP = tor.participantes.length;
    
    if (numP < 3){
        console.log("Imposible crear al menos una partida");
    }else{
        console.log("Creando partidas");
        for (;numP>=3;) {
            var mod= numP % 4;
            if(mod == 2 || mod == 3){
                console.log("Mod=2/3, formado grupo x3, numP: "+numP);   
                
                jugadores = [];
                for (var k=(numP-3); numP>k; numP--){
                    console.log("#:"+(numP-1) +'  '+tor.participantes[(numP-1)]);
                    jugadores.push({user_id:tor.participantes[(numP-1)], estado: "Inactivo"});
                }
                insertPartyVolatiles(tid, jugadores);
        
            }else if(mod==1){
                console.log("Mod=1 formado grupo x5, numP: "+numP); 
                
                jugadores = [];
                for (var k=(numP-5); numP>k; numP--){
                    console.log("#:"+(numP-1) +'  '+tor.participantes[(numP-1)]);
                    jugadores.push({user_id:tor.participantes[(numP-1)], estado: "Inactivo"});
                }
                insertPartyVolatiles(tid, jugadores);
    
            }else if(mod == 0){
                for (var j=0; numP!=0 && !(numP % 4) && j<100;j++) {
                    console.log("Mod=0 formado grupo x4, numP: "+numP); 
                    
                    jugadores = [];
                    for (var k=(numP-4); numP>k; numP--){
                        console.log("#:"+(numP-1) +'  '+tor.participantes[(numP-1)]);
                        jugadores.push({user_id:tor.participantes[(numP-1)], estado: "Inactivo"});
                    }    
                    insertPartyVolatiles(tid, jugadores);    
                }
            }
        }
    }
}


//******************SOLO TORNEO*************************

Template.hall_torneo.soloTorneo = function() {
    var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne(tid);
    var gameM = Juegos.findOne(tor.game_id);
    var tran = Torneos.findOne(tid).ranking;
    return gameM.mode == "solo" && tran;
}


Template.hall_torneo.soloRanking = function() {
    var tid  = Session.get('showTorneoId');
    var tran = Torneos.findOne(tid).ranking;
    ranking  = [];
    tran.forEach(function(each, index) {
        each.no = index+1;
        ranking.push(each);
    });
    return ranking;

};