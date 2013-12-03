Template.dashboard.show = function() {
  return Session.get('current_stage') == 'Dashboard';
};


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