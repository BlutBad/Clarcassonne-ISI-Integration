//Encuentra juegos para ranking
Template.gamesrankingtemp.games=function(){
	return Games.find();
}

//Mostramos puntuaciones para un juego
Template.gamesrankingtemp.events = {
	'click .linkgameranking':function(event){
		$("#ranking").children().hide();
		$("#ranking").append($(this)[0].name);
		Session.set('game', $(this)[0].name);
	}
}

// Mostramos puntuaciones para un usuario
Template.userstemp.events = {
	'click .linkuserranking':function(event){
		$("#ranking").children().hide();
		$("#ranking").append($(this)[0].username);
		Session.set('user', $(this)[0].username);
		$("#byuserranking").fadeIn();
		//console.log(Games.findOne({_id : Session.get('game_id')}).name);//$(this)[0]._id);
	}
}

//Carga puntuaciones para usuario
Template.byuserrankingtemp.ranking=function(){
	var ranking = Ranking.find({user: Session.get("user")});
	return ranking;
}