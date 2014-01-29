
// Crea las bases de datos de los juegos si no están creadas.
Meteor.startup(function () {
	if(Games.find({name:"Froot_Wars"}).count() == 0){
		Games.insert({name:"Froot_Wars", players_max : 1});
		//Logros
		Games.update({name: "Froot_Wars"},{$push: {profits: {title:"Has terminado las dos primeras pantallas", users:[]} } });   
	};
	if(Games.find({name:"Alien_Invasion"}).count() == 0){
		Games.insert({name:"Alien_Invasion", players_max : 1});
		//Logros
		Games.update({name: "Alien_Invasion"},{$push: {profits: {title:"Has hecho 10000 pts", users:[]} } });
	};
	if(Games.find({name:"Clarcassonne"}).count() == 0){
		Games.insert({name:"Clarcassonne", players_max : 5});
	};
	if(Games.find({name:"The_Hero"}).count() == 0){
		Games.insert({name:"The_Hero", players_max : 1});
	};
	
});

Meteor.publish("users", function() { 	
	return Meteor.users.find();
});

Meteor.publish("messages", function(current_match_id) { 	
	return Messages.find({match_id: current_match_id});
});


Meteor.publish("private_messages", function(orig) { 	
	return Private_Messages.find({$or: [ {orig_id: orig} , {dest_id: orig} ] });
});

// Encuentra las partidas en las que a sido invitado
Meteor.publish("invitations", function() { 	
	return Invitations.find();
});


Meteor.publish("games", function() {	
	return Games.find();
});

// Para cada cliente, publica la lista de partidas del juego en el que abre sesión.
Meteor.publish("partidas", function(current_game_id) {
	return Partidas.find({"game_id" : current_game_id});	
});

//Se publica la puntuacion selectiva en funcion al criterio a filtrar
Meteor.publish("ranking", function(selected_game_id,selected_user_id){								   
	if (selected_game_id!=undefined && selected_user_id != undefined){
		return Ranking.find({"user_id": selected_user_id,"game_id": selected_game_id});
	}else if (selected_game_id!=undefined && selected_user_id == undefined){
		return Ranking.find({"game_id": selected_game_id});
	}else if (selected_game_id==undefined && selected_user_id != undefined){
		return Ranking.find({"user_id": selected_user_id});
	}else{
		return Ranking.find();
	}
});

Meteor.users.allow({
    update: function(userId, docs, fields, modifier) {
        return true;
    }
});

//Partidas terminadas
matchMulti=function(id_party){
	var match = Partidas.findOne({_id: party_id});
    match.puntuacion[0].forEach(function(elem){
		Ranking.insert({user_id:elem.user_id, game_id:match.game_id, score:elem.puntos});
  	});
}


Accounts.validateNewUser(function (user) {
		if (user.services.google){
			var socialname=user.services.google.name;
			if (Meteor.users.findOne({username:socialname})!=undefined)
				throw new Meteor.Error(403, "Your social name has conflicts with a Username already registered");
		}	
		if (user.services.facebook){
			var socialname=user.services.facebook.name;
			if (Meteor.users.findOne({username:socialname})!=undefined)
				throw new Meteor.Error(403, "Your social name has conflicts with a Username already registered");			
		}	
		if (user.services.twitter){
			var socialname=user.services.twitter.screenName;
			if (Meteor.users.findOne({username:socialname})!=undefined)
				throw new Meteor.Error(403, "Your social name has conflicts with a Username already registered");			
		}

		return true;	
});

Accounts.onCreateUser(function(options, user) {
	if (user.username == undefined){
		if (user.services.google){
			var datasocialuser=user.services.google;
			user.username=datasocialuser.name;
			user.avatar=datasocialuser.picture;
			user.address=datasocialuser.email;
			user.socialred="google";
		}
		if (user.services.facebook){
			var datasocialuser=user.services.facebook;
			user.username=datasocialuser.name;
			user.avatar="http://graph.facebook.com/"+datasocialuser.id+"/picture?type=large";
			user.address=datasocialuser.email;
			user.socialred="facebook";
		}
		if (user.services.twitter){
			var datasocialuser=user.services.twitter;
			user.username=datasocialuser.screenName;
			user.avatar=datasocialuser.profile_image_url_https;
			user.socialred="twitter"
		}
	}else{
		user.avatar="Avatares/0.jpg"
	}	
	return user;
});
