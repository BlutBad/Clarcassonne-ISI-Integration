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



Template.hall_torneo.multiTorneo = function() {
    var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne(tid);
    var gameM = Juegos.findOne(tor.game_id);
    return gameM.mode == "multi";
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