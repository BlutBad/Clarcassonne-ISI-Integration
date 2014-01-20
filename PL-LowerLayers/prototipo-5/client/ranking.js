//Encuentra juegos para ranking
Template.gamesrankingtemp.games=function(){
	return Games.find();
}

//Mostramos puntuaciones para un juego
Template.gamesrankingtemp.events = {
	'click .linkgameranking':function(event){
		$("#ranking").children().hide();
		$("#gameRanking").html($(this)[0].name);
		Session.set('game_id', $(this)[0]._id);
		$("#bygameranking").fadeIn();
	}
}

// Mostramos puntuaciones para un usuario
Template.userstemp.events = {
	'click .linkuserranking':function(event){
		$("#ranking").children().hide();
		$("#usernameRanking").html($(this)[0].username);
		Session.set('user_id', $(this)[0]._id);
		$("#byuserranking").fadeIn();
	}
}

//Volvemos atras
Template.byuserrankingtemp.events = {
	'click a.linkback':function(event){
		$("#ranking").children().fadeIn();
		$("#byuserranking").hide();
		$("#bygameranking").hide();
		$("#usernameRanking").html("");
	}
}

//Volvemos atras
Template.bygamerankingtemp.events = {
	'click a.linkback':function(event){
		$("#ranking").children().fadeIn();
		$("#byuserranking").hide();
		$("#bygameranking").hide();
		$("#gameRanking").html("");
	}
}

//Carga puntuaciones para usuario
Template.byuserrankingtemp.ranking=function(){
	if (Ranking.find().count()!=0){
		var list = Ranking.find({user_id: Session.get("user_id")});
		var list2=[];
		list.forEach(function(elem) {
			list2.push({"game":Games.findOne({_id:elem.game_id}).name,"user":elem.user_id, "score":elem.score});
		});
		return list2;
	}
}

//Carga puntuaciones para juego
Template.bygamerankingtemp.ranking=function(){
	if (Ranking.find().count()!=0){
		var list = Ranking.find({game_id: Session.get("game_id")});
		var list2=[];
		list.forEach(function(elem) {
			list2.push({"game":elem.game_id,"user":Meteor.users.findOne({_id:elem.user_id}).username, "score":elem.score});
		});
		return list2;
	}
}