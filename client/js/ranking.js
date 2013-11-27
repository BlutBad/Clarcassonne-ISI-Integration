Template.ranking.show = function() {
	return Session.get('current_stage') == 'Ranking';
};

Template.ranking.scores = function() {
	return Ranking.find({});
}

Template.ranking.juegos=function(){
	return Juegos.find({});
};