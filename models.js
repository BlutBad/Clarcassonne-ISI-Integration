
// Colección de la base de datos del chat global
Global_msgs = new Meteor.Collection('global_msgs');
/*
	_id | id_user | msg
*/

Private_msgs = new Meteor.Collection('private_msgs');
/*
	_id | id_user1 | id_user2 | msg
*/

Game_msgs = new Meteor.Collection('game_msgs');
/*
	_id | id_user | id_game | msg
*/

//Menu -- {name: String}
Menu = new Meteor.Collection("menu");


//Menu de user -- {name: String}
Menu_user = new Meteor.Collection("menu_user");

Juegos = new Meteor.Collection("juegos"); 


Juegos.allow({
	  insert: function (userId, doc) {
	    // the user must be logged in, and the document must be owned by the user
	    return true;
	  },
	  update: function (userId, doc, fields, modifier) {
	    // can only change your own documents
	    return true;
	  },
	  remove: function (userId, doc) {
	    // can only remove your own documents
	    return true;
	  },
	  fetch: ['owner']
	});




//Crear torneos
/*campos para torneos: 
	title
	game
	user_create
	date_start
	date_finish
	description,  
	pic
	user_participant 
*/
Torneos= new Meteor.Collection("torneos");


Ranking = new Meteor.Collection("ranking");

/*
Ranking.insert({
gameId : gameId,
userId : this.userId,
score : score
});

*/

//Apuntarse a torneos 
/* campos para champuser:
	id_user
	id_torneo
*/
ChampUser = new Meteor.Collection("champuser");
