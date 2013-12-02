Template.ranking.show = function() {
	return Session.get('current_stage') == 'Ranking';
};

Template.ranking.scores = function() { 
	idgame_session = Session.get("gamerank");
	if (idgame_session == null) {
		rankings = Ranking.find({});
	} else {
		rankings = Ranking.find({gameId: idgame_session})
	}
	scores = [];
	rankings.forEach(function(each) { 
		sco = {};   
		sco.game = Juegos.findOne({_id: each.gameId}).name;
		sco.user = Meteor.user(each.userId).username;
    	sco.maxScore = each.maxScore;
    	sco.totalScore = each.totalScore;
    	sco.rango = Rangos.findOne({_id: each.rango_id}).rango;
    	scores.push(sco);
    });  
    return scores;  
}; 


Template.ranking.events = {
	'click .sortBy': function () {
		Session.set("gamerank", this._id); 
	},
	'click #mostrar_ranking': function() {
		Session.set("gamerank", null);
	}
}; 

Template.ranking.juegos=function(){
	return Juegos.find({}); 
};