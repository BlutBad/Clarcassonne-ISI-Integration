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
    return ChampUser.find({id_torneo:tid}).count();
}

Template.hall_torneo.participoClass = function() {
    var tid = Session.get('showTorneoId');
    u_id = Meteor.userId();
    if (u_id){
        var u = ChampUser.findOne({id_torneo:tid, id_user: u_id});
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
    return gameM.mode == "solo";
}


Template.hall_torneo.multiTorneo = function() {
    var tid = Session.get('showTorneoId');
    var tor = Torneos.findOne(tid);
    var gameM = Juegos.findOne(tor.game_id);
    return gameM.mode == "multi";
}