Template.ranking.show = function() {
	return Session.get('current_stage') == 'Ranking';
};

Template.ranking.scores = function() { 
	scores = [];
	Ranking.find({}).forEach(function(each) { 
		sco = {}; 
		sco.game = Juegos.findOne({_id: each.gameId}).name;
		sco.user = Meteor.user(each.userId).username;
    	sco.score = each.score;  
    	scores.push(sco);
    });  
    return scores; 
};

Template.ranking.juegos=function(){
	return Juegos.find({}); 
};