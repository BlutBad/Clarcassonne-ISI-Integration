Template.dashboard.show = function() {
  return Session.get('current_stage') == 'Dashboard';
};

Template.dashboard.events({
	'click .crea_party' : function() { 
		Session.set('current_stage', 'klarkiHall');
		if (Meteor.userId()) { 
            userCreator = PartidasVolatiles.findOne({
                creator_id : Meteor.userId()
            })
            if (userCreator) {
                Session.set("createError", "Ya creaste una partida!");
            } else { 
                // ^.^ edad = Math.floor(Random.fraction() * 70);
                PartidasVolatiles.insert({
                    creator_id : Meteor.userId(),
                    jugadores : [ {
                        user_id : Meteor.userId(),
                        estado : "Pendiente",
                    } ],
                    listos: false
                }); 
                Session.set("createError", undefined); 
            }
        } else {
            Session.set("createError",
                    "Regístrate para crear partidas!");
        }
	}
});


Template.misInsignias.juegos = function() {
	  return Juegos.find();
};
// return InsigniasToUser.find({user_id : Meteor.userId()});

Template.misInsignias.gameName = function(gameId) {
	  return Juegos.findOne({_id : gameId}).name;
};


Template.misInsignias.insignias = function(gameId, userId) {
	  return InsigniasToUser.find({game_id:gameId, user_id:userId});
};


Template.misInsignias.infoInsignia = function(insigniaId) {
	  return Insignias.findOne({_id:insigniaId});
};

	
/*
InsigniasToUser.insert({user_id:this.userId,
	game_id:gameId,
	insignia_id: insig._id});
*/



