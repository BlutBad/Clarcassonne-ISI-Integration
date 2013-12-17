Template.ranking.show = function() {
	return Session.get('current_stage') == 'Ranking';
};

Template.ranking.scores = function() { 
	idgame_session = Session.get("gamerank");
	if (idgame_session == null) {
		rankings = Ranking.find({},{sort:{maxScore: -1}});
	} else {
		rankings = Ranking.find({gameId: idgame_session}, {sort:{maxScore: -1}})
	}
	scores = [];
	rankings.forEach(function(each,index) { 
		sco = {};   
		sco.No = index+1;
		sco.game = Juegos.findOne({_id: each.gameId}).name;
		sco.user = Meteor.users.findOne({_id: each.userId}).username;
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
	},
	'click .fakeRanking': function() {
		
		
		
		games= Juegos.find({});
		
		
		
		games.forEach(function (game) {
		    console.log(game.name);
		    fakeUsers = Meteor.users.find({});
		    console.log(games.count() + " "+ fakeUsers.count() );
		    fakeUsers.forEach(function (user) {
			
			if (Math.random() < 0.035) {
			    console.log(user.username);
			    maxScore = Math.floor((Math.random()*100)+1);
			    Meteor.call("matchFinish", game._id, maxScore, {user_id:user._id});
		    	};
		  });
		 });
		}
}; 



Template.ranking.juegos=function(){
	return Juegos.find({}); 
};
