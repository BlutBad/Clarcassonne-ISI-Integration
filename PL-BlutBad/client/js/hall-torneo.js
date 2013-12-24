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
    }
};

//******************MULTI TORNEO*************************

Template.hall_torneo.multiTorneo = function() {
    var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne(tid);
    var gameM = Juegos.findOne(tor.game_id);
    return gameM.mode == "multi";
}

Template.hall_torneo.events = {
        'click .startTorneo': function() {
            console.log("Start Torneo");
            startTorneo();
        }

};

function startTorneo() {
    var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne(tid);
    
    var party_jugadores = [];
    
    var numP = tor.participantes.length;
    
    if (numP < 3){
        console.log("Imposible crear al menos una partida");
    }else{
        console.log("Creando partidas");
    }
    
    var mod = numP % 4;
    /*
    console.log("Mod: "+mod);
    if(mod == 2){
        if (numP=>6){
            console.log("x3");
        }

    }else if(mod == 2){
        console.log("x2")    
    }
    */
    var numP =33;
    for (; numP % 4 && numP==0;) {
        var mod = numP%4;
        console.log("Mod: "+mod);
            if(mod == 2){
                numP -= 3;
                console.log("x3");   
            }else if(mod==3){
                    numP -= 3;
                console.log("x3"); 
            }else if(mod==1){
                numP -= 5;
                console.log("x5"); 
            }
        }
    console.log("Finish: NewMod:" + (numP%4))
    
    
    var numP =7;
    for (var i=0;numP % 4 && i<100;i++) {
        var mod= numP % 4;
        console.log("Mod: "+mod);
        console.log("Mod = "+mod+", numP: "+numP);  
        if(mod == 2){
            numP -= 3;
            console.log("Mod=2, formado grupo x3, numP:"+numP);   
        }else if(mod == 3){
            numP -= 3;
            console.log("Mod=3, formado grupo x3, numP:"+numP); 
        }else if(mod==1){
            numP -= 5;
            console.log("Mod=1 formado grupo x5, numP:"+numP); 
        }

        for (var j=0; numP!=0 && !(numP % 4) && j<100;j++) {
            numP -=4;
            console.log("Mod=0 formado grupo x4, numP:"+numP); 
        }
        
    }
    console.log("Finish: NewMod:" + (numP%4) + ", numP: "+numP)
    /*
    tor.participantes.forEach(function(each, index) {
        if (index % 4){
            console.log("#"+index +" "+each)
        }else{
            console.log("#"+index +" "+each)
            if(index!=0){
                console.log("--\n")
            }
        }
      
    })  */
    /* id de la partida que ha sido creada.
    party_id = Partidas.insert({
        torneo_id : tid,
        jugadores : party_jugadores,
        terminada : false,
        create_at :  Data.now(),
    });*/
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