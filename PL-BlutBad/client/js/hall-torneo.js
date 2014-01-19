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


var addSomeUsers = function(participantes, num) {
    console.log("addSomeUsers");
    var party = {};
    party.jugadores = [];
    // -1 porque si paso 3, se cogeran 4 y no 3, el 0 cuenta.
    console.log("__Participantes.length:" + participantes.length + ", num: "+num);
    for (var i = num-1; i >= 0; i--) {
        var rnd = Math.floor(Math.random() * participantes.length);

        console.log("\trnd: " + rnd+ ", id: "+participantes[rnd]);

        party.jugadores.push({user_id:participantes[rnd], estado: "Torneo Inactivo"});
        participantes=_.without(participantes, participantes[rnd]);
    }
    party.ganador = party.jugadores[2];
    return {party: party, participantes:participantes};
}

var crearPartidasEtapa = function (etapa) {
    console.log("Crear partidas | ETAPA: " +etapa+"\n");
    var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne(tid);
    

    participantes = tor.participantes;
    partys = [];

    if (tor.participantes.length<3){
        console.log("Imposible crear al menos una partida");
    }else{
        for (var k=0;participantes.length > 0 && k<30;k++) {
            var mod= participantes.length % 4;

            if(mod == 2 || mod == 3){
                var ret =addSomeUsers(participantes,3);
            }else if (mod ==1) {
                var ret =addSomeUsers(participantes,5);
            }else if (mod == 0){
                var ret =addSomeUsers(participantes,4);
            };

            partys.push(ret.party);
            participantes = ret.participantes;
            
            };

        };
    console.log("\t__Partidas Creadas__");
    console.log(partys);

    //Insertando partidas de la etapa
    var obj = {};
    console.log(tor.etapas);
    if (!!tor.etapas){
        obj.etapas = {}
        obj.etapas = tor.etapas;
        obj.etapas[etapa] = [];
        //console.log("tor.etapas");
    }else{
        obj.etapas = {};
        obj.etapas[etapa]=[];
        //console.log("x normal");
    }
    //console.log(x)
    //console.log(tor.etapas)

    //x.etapas[etapa].push({id: 22222, jugadores:{id:1212, id:2222}});
    //x.etapas[etapa].push({id: 11111, jugadores:{id:3333, id:4444}});
    obj.etapas[etapa] = partys;
    Torneos.update(tid, {$set:obj});
    console.log("\t__Partidas Insertadas__");
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
        //startTorneo();
        //startTorneoXXX("preXX");
        crearPartidasEtapa("preseleccion")
    },
    
    'click .finalizarTorneo': function() {
        stopTorneo();
    },

    'click .jugarEtapa': function() {
        console.log("jugarEtapa");
        hacerEtapa()
    }
};

function startTorneoXXX(etapa, partys) {
    var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne(tid);

    var x={};
    console.log(etapa);
    console.log(tor.etapas);
    if (!!tor.etapas){
        x.etapas = {}
        x.etapas = tor.etapas;
        console.log("tor.etapas");
        x.etapas[etapa] = [];
    }else{
        x.etapas = {};
        x.etapas[etapa]=[];
        console.log("x normal");
    }
    console.log(x)
    console.log(tor.etapas)

    //x.etapas[etapa].push({id: 22222, jugadores:{id:1212, id:2222}});
    //x.etapas[etapa].push({id: 11111, jugadores:{id:3333, id:4444}});
    x.etapas[etapa] = partys;
    Torneos.update(tid, {$set:x});
}


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


function insertPartyVolatiles(torid, participantes) {
    PartidasVolatiles.insert({
        torneo_id: torid,
        jugadores :participantes,
        listos: false,
    });
};

/*
1. Las etapa son indep del klarki hall, eliminar las partidas de las etapas viejas



*/

var  hacerEtapa = function(){
    var tid = Session.get('showTorneoId');

    if (Torneos.findOne({_id:tid, pre_finish:{$exists:false}})){
        console.log("Etapa de preseleccion!");

        Torneos.update(tid, {$set:{pre_finish:true}});
        startTorneoXXX("preseleccion");

    } else if (Torneos.findOne({_id:tid, cuartos_finish:{$exists:false}})){
        console.log("Etapa de Cuartos!");

        Torneos.update(tid, {$set:{cuartos_finish:true}});
        startTorneoXXX("cuartos");

    } else if (Torneos.findOne({_id:tid, semifinal_finish:{$exists:false}})){
        console.log("Etapa de Semi-Final!");
    
        Torneos.update(tid, {$set:{semifinal_finish:true}});
        startTorneoXXX("semifinal");

    } else if (Torneos.findOne({_id:tid, final_finish:{$exists:false}})){
        console.log("Etapa de la Final!");
        startTorneoXXX("final");

        Torneos.update(tid, {$set:{final_finish:true}});

    }else{
        console.log("El torneo ha terminado!");
    }
}


Deps.autorun(function(c) {
    var tid = Session.get('showTorneoId');
    if (Torneos.findOne({_id:tid, pre_finish: true, cuartos_finish:{$exists:false}, semifinal_finish:{$exists:false},final_finish:{$exists:false}})){
        console.log("Deps: Etapa de preseleccion ha terminado!");


    } else if (Torneos.findOne({_id:tid, cuartos_finish: true, semifinal_finish:{$exists:false},final_finish:{$exists:false}})){
        console.log("Deps: Etapa de Cuartos! ha terminado!");


    } else if (Torneos.findOne({_id:tid, semifinal_finish: true,final_finish:{$exists:false}})){
        console.log("Deps: Etapa de Semi-Final ha terminado!");
    

    } else if (Torneos.findOne({_id:tid, final_finish: true})){
        console.log(" Deps:  Etapa de la Final ha terminado!");


    }else{
        console.log("Deps: Caso en el cual no se que hacer!");
    }
});





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
