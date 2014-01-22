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
        var tid = Session.get('showTorneoId');
        Meteor.call("primeraEtapa", tid); 
    },
    'click .finalizarTorneo': function() {
        //stopTorneo();
    },
    'click .jugarEtapa': function() {

        var tid = Session.get('showTorneoId');
        Meteor.call("nextEtapa",tid); 
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






/*
1. Las etapa son indep del klarki hall, eliminar las partidas de las etapas viejas



*/



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




Template.multiRanking.multiRanking =function(){
    var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne(tid);

    var sortRa = _.sortBy(tor.ranking, function(obj){ return -obj.score; });

    sortRa.forEach(function(each, index) {
       //
    });
    return sortRa;
}



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





