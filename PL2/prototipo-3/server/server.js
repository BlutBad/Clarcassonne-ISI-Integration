
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

Meteor.publish("games", function() {
 	
	return Games.find();

});

// Para cada cliente, publica la lista de partidas del juego en el que abre sesión.
Meteor.publish("matches", function(current_game_id) {

	return Matches.find({"game_id" : current_game_id});	

});

// Para cada cliente, publica la lista de jugadores de una partida en la que he abierto sesión.
Meteor.publish("plays", function() {

	return Plays.find();	

});



Meteor.users.allow({
    update: function(userId, docs, fields, modifier) {
        return true;
    }
});
