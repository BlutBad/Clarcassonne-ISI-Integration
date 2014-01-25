
// Crea las bases de datos de los juegos si no están creadas.
Meteor.startup(function () {
	if(Games.find({name:"Froot_Wars"}).count() == 0){
		Games.insert({name:"Froot_Wars", players_max : 1});   
	};
	if(Games.find({name:"Alien_Invasion"}).count() == 0){
		Games.insert({name:"Alien_Invasion", players_max : 1});
	};
	if(Games.find({name:"Clarcassonne"}).count() == 0){
		Games.insert({name:"Clarcassonne", players_max : 5});
	};
});

Meteor.publish("users", function() { 	
	return Meteor.users.find();
});

Meteor.publish("messages", function(current_match_id) { 	
	return Messages.find({match_id: current_match_id});
});


Meteor.publish("private_messages", function(orig_name) { 	
	return Private_Messages.find({$or: [ {orig: orig_name} , {dest: orig_name} ] });
});

// Encuentra las partidas en las que a sido invitado
Meteor.publish("invitations", function(isSent) { 	
	return Invitations.find({sent: isSent});
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
