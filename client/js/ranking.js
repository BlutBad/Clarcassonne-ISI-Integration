Template.ranking.show = function() {
	return Session.get('current_stage') == 'Ranking';
};

Template.ranking.scores = function() { 
	idgame_session = Session.get("game");
	if (idgame_session == undefined) {
		rankings = Ranking.find({});
	} else {
		rankings = Ranking.find({gameId: idgame_session})
	}
	scores = [];
	rankings.forEach(function(each) { 
		sco = {}; 
		sco.game = Juegos.findOne({_id: each.gameId}).name;
		sco.user = Meteor.user(each.userId).username;
    	sco.score = each.score;  
    	scores.push(sco);
    });  
    return scores;  
}; 

Template.ranking.events = {
	'click .sortBy': function () {
		Session.set("game", this._id); 
	},
	'click #mostrar_ranking': function() {
		Session.set("game", undefined);
	}
}; 

Template.ranking.juegos=function(){
	return Juegos.find({}); 
};