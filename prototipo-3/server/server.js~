
// Crea las bases de datos de los juegos si no están creadas.
Meteor.startup(function () {
	if(Games.find().count() == 0){
		
		Games.insert({name:"Froot_Wars"});
		Games.insert({name:"Alien_Invasion"});
		Games.insert({name:"Clarcassonne"});	        
	};
});

Meteor.publish("users", function() {
 	
	return Meteor.users.find();

});

Meteor.publish("messages", function() {
 	
	return Messages.find();

});

Meteor.publish("games", function() {
 	
	return Games.find();

});

// Para cada cliente, publica la lista de partidas del juego en el que abre sesión.
Meteor.publish("matches", function(current_game_id) {

	return Matches.find({"game_id" : current_game_id});	

});
