//variable para retornar por el camino filtrado
var pathranking = 1;

///Eventos en plantillas////

//Mostramos puntuaciones para un juego
Template.gamesrankingtemp.events = {
	'click .linkgameranking':function(event){
		$("#gamesranking").hide();
		$("#players").hide();
		Session.set('game_id_ranking', $(this)[0]._id);
		$("#bygameranking").fadeIn();
	}
}

//Mostramos puntuaciones para un usuario
Template.playerstemp.events = {
	'click a.linkplayer':function(event){
		$("#gamesranking").hide();
		$("#players").hide();
		Session.set('user_id_ranking', $(this)[0].user_id);
		$("#byuserranking").fadeIn();
	},
	'click #btnplayer':function(event){
		var username = document.getElementById("formplayer").value;
		var user = Meteor.users.findOne({username:username});
		if (user == undefined) {
			$("#dialog_nouser").dialog("open");
		}else{
			if (Ranking.findOne({user_id:user._id})!=undefined){
				$("#gamesranking").hide();
				$("#players").hide();
				Session.set('user_id_ranking', user._id);
				$("#byuserranking").fadeIn();
			} else {
				$("#dialog_nogameplayed").dialog("open");
			}
		}
	}
}

///Puntuaciones por juego, filtrar usuario////

Template.bygamerankingtemp.events = {
	//Volvemos atras
	'click a.linkback':function(event){
		$("#bygameranking").hide();
		$("#players").fadeIn();
		$("#gamesranking").fadeIn();
		Session.set('game_id_ranking', undefined);
	},
	//filtramos por usuario con formulario
	'click #btnplayergame':function(event){
		var username = document.getElementById("formplayergame").value;
		var user = Meteor.users.findOne({username:username});
		if (user == undefined) {
			$("#dialog_nouser").dialog("open");
		}else{
			if (Ranking.findOne({user_id:user._id})!=undefined){
				$("#bygameranking").hide();
				Session.set('user_id_ranking', user._id);
				$("#byusergameranking").fadeIn();
				pathranking=1;
			} else {
				$("#dialog_thisnoplayed").dialog("open");
			}
		}
	},
	// filtramos por usuario con click en la tabla
	'click a.linkuser':function(event){
		$("#bygameranking").hide();
		Session.set('user_id_ranking', $(this)[0].user_id);
		$("#byusergameranking").fadeIn();
		pathranking=1;
	},
	'click a.linkplayergame':function(event){
		$("#bygameranking").hide();
		Session.set('user_id_ranking', $(this)[0].user_id);
		$("#byusergameranking").fadeIn();
		pathranking=1;
	}
}

Template.byuserrankingtemp.events = {
	'click a.linkback':function(event){
		$("#byuserranking").hide();
		$("#players").fadeIn();
		$("#gamesranking").fadeIn();
		Session.set('user_id_ranking', undefined);
	},
	'click a.linkgame':function(event){
		$("#byuserranking").hide();
		Session.set('game_id_ranking', $(this)[0].game_id);
		$("#byusergameranking").fadeIn();
		pathranking = 2;
	}
}

////Puntuaciones de usuario en juego/////

Template.byusergamerankingtemp.events = {
	//Volvemos atras
	'click a.linkback':function(event){
		$("#byusergameranking").hide();
		if (pathranking==1){
			Session.set('user_id_ranking', undefined);
			$("#bygameranking").fadeIn();
		}else if (pathranking==2){
			Session.set('game_id_ranking', undefined);
			$("#byuserranking").fadeIn();
		}
	}
}




//////Helpers//////


// Filtrar por juego o usuario //

//Encuentra juegos para ranking
Template.gamesrankingtemp.games=function(){
	return Games.find();
}

//Encuentra a todos los usuarios que hayan jugado a algun juego
Template.playerstemp.players=function(){
	users = Meteor.users.find();
	players = [];
	users.forEach(function(elem){
		if (Ranking.findOne({user_id:elem._id})!=undefined)
			players.push({"username":elem.username,"user_id":elem._id});
	});
	return players;
}

//Comprueba que se rellene la platilla
Template.playerstemp.first=function(){
	return Session.get("user_id_ranking")==undefined && Session.get("game_id_ranking")==undefined;
}

//Comprueba que hay jugadores
Template.playerstemp.gotplayers=function(){
	var gotplayers = false;
	if (Ranking.find().count()!=0)
		gotplayers=true;
	return gotplayers;
}

//bygame//

//Comprueba que tiene que rellenar la plantilla por juego
Template.bygamerankingtemp.user_not_selected=function(){
	return Session.get("user_id_ranking")==undefined && Session.get("game_id_ranking");
}

//Retorna nombre del juego elegido
Template.bygamerankingtemp.gameranking=function(){
	var game = undefined;
	if (Session.get("game_id_ranking")) 
		game = Games.findOne({"_id":Session.get("game_id_ranking")}).name;
	return game;
}

//Carga puntuaciones para juego
Template.bygamerankingtemp.ranking=function(){
	if (Ranking.find().count()!=0){
		var list = Ranking.find({game_id:Session.get("game_id_ranking")},{sort:{score:-1},limit:10});
		var list2=[];
		list.forEach(function(elem) {
			list2.push({"user":Meteor.users.findOne({_id:elem.user_id}).username,
					    "user_id":elem.user_id, "score":elem.score});
		});
		return list2;
	}
}

//Encuentra a los usuarios que hayan jugado al juego
Template.bygamerankingtemp.playersgame=function(){
	users = Meteor.users.find();
	playersgame = [];
	game_id = Session.get("game_id_ranking");
	users.forEach(function(elem){
		if (Ranking.findOne({user_id:elem._id,game_id:game_id})!=undefined)
			playersgame.push({"username":elem.username,"user_id":elem._id});
	});
	return playersgame;	
}

//Comprueba si han jugado al juego
Template.bygamerankingtemp.gotplayersgame=function(){
	var gotplayersgame = false;
	game_id = Session.get("game_id_ranking");
	if (Ranking.find({game_id: game_id}).count()!=0)
		gotplayersgame=true;
	return gotplayersgame;
}

//by user//

//Comprueba que tiene que rellenar la plantilla por juego
Template.byuserrankingtemp.game_not_selected=function(){
	return Session.get("user_id_ranking") && Session.get("game_id_ranking")==undefined;
}

//Carga usuario seleccionado
Template.byuserrankingtemp.playerranking=function(){
	var player = undefined;
	if (Session.get("user_id_ranking")) 
		player = Meteor.users.findOne({"_id":Session.get("user_id_ranking")}).username;
	return player;
}

//Carga puntuaciones para usuario
Template.byuserrankingtemp.ranking=function(){
	if(Ranking.find().count()!=0){
  		var listranking = Ranking.find({user_id:Session.get("user_id_ranking")});
  		var elemfound = false;
  		var listbestsids = [];
  		var listbestsnames = [];
  		listranking.forEach(function(elem){
   			elemfound = false;
   			for(var i=0;i<listbestsids.length;i++){
    			if (listbestsids[i].game_id==elem.game_id){
     				elemfound=true;
     				if(listbestsids[i].score<elem.score)
      					listbestsids[i].score=elem.score;
    			}  
   			};
   			if (elemfound==false)
    			listbestsids.push(elem);
  		});
  
  		listbestsids.forEach(function(bestelem){
   			listbestsnames.push({"game": Games.findOne({_id:bestelem.game_id}).name, "score":bestelem.score,
   								 "game_id":bestelem.game_id});
  		});
  	
  		return listbestsnames;
  	}
}


//by usergame//

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
	return Session.get("user_id_ranking") && Session.get("game_id_ranking");
}

//Carga puntuaciones para juego y un usuario
Template.byusergamerankingtemp.ranking=function(){
	if (Ranking.find().count()!=0){
		var list = Ranking.find({game_id:Session.get("game_id_ranking"),user_id:Session.get("user_id_ranking")},{sort:{score:-1}});
		var list2=[];
		list.forEach(function(elem) {
			list2.push({"score":elem.score});
		});
		return list2;
	}
}