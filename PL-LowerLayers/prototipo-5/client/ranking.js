//Encuentra juegos para ranking
Template.gamesrankingtemp.games=function(){
	return Games.find();
}


///Eventos en plantillas////

//Mostramos puntuaciones para un juego
Template.gamesrankingtemp.events = {
	'click .linkgameranking':function(event){
		$("#gamesranking").hide();
		Session.set('game_id_ranking', $(this)[0]._id);
		$("#bygameranking").fadeIn();
	}
}

///Puntuaciones por juego, filtrar usuario////

Template.bygamerankingtemp.events = {
	//Volvemos atras
	'click a.linkback':function(event){
		$("#bygameranking").hide();
		$("#gamesranking").fadeIn();
	},
	//filtramos por usuario con formulario
	'click #btnuserranking':function(event){
		var username = document.getElementById("formuserranking").value;
		var user_id = Meteor.users.findOne({username:username})._id;
		$("#bygameranking").hide();
		Session.set('user_id_ranking', user_id);
		$("#byusergameranking").fadeIn();
	},
	// filtramos por usuario con click en la tabla
	'click a.linkuser':function(event){
		$("#bygameranking").hide();
		Session.set('user_id_ranking', $(this)[0].user_id);
		$("#byusergameranking").fadeIn();
	}
}

////Puntuaciones de usuario en juego/////

Template.byusergamerankingtemp.events = {
	//Volvemos atras
	'click a.linkback':function(event){
		Session.set('user_id_ranking', undefined);
		$("#byusergameranking").hide();
		$("#bygameranking").fadeIn();
	}
}




//////Helpers//////

//Retorna nombre del juego elegido
Template.bygamerankingtemp.gameranking=function(){
	var game = undefined;
	if (Session.get("game_id_ranking")) 
		game = Games.findOne({"_id":Session.get("game_id_ranking")}).name;
	return game;
}

//Comprueba que tiene que rellenar la plantilla por juego
Template.bygamerankingtemp.user_not_selected=function(){
	return Session.get("user_id_ranking")==undefined;
}

//Carga puntuaciones para juego
Template.bygamerankingtemp.ranking=function(){
	if (Ranking.find().count()!=0){
		var list = Ranking.find();
		var list2=[];
		Ranking.find().forEach(function(elem) {
			list2.push({"user":Meteor.users.findOne({_id:elem.user_id}).username,
					    "user_id":elem.user_id, "game_id":elem.game_id, "score":elem.score});
		});
		return list2;
	}
}


//Retorna el nombre y el juego elegido
Template.byusergamerankingtemp.gameranking=function(){
	var gamerank = undefined;
	if (Session.get("game_id_ranking")&&Session.get("user_id_ranking")){
		var game=Games.findOne({"_id":Session.get("game_id_ranking")}).name;
		var user=Meteor.users.findOne({"_id":Session.get("user_id_ranking")}).username;
		gamerank = {user:user,name:game};
	}
	return gamerank;
}

//Comprueba que tiene que rellenar la plantilla por juego y usuario
Template.byusergamerankingtemp.user_selected=function(){
	return Session.get("user_id_ranking");
}

//Carga puntuaciones para juego y un usuario
Template.byusergamerankingtemp.ranking2=function(){
	if (Ranking.find().count()!=0){
		var list = Ranking.find();
		var list2=[];
		list.forEach(function(elem) {
			list2.push({"score":elem.score});
		});
		return list2;
	}
}