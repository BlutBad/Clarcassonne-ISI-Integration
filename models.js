
// Colección de la base de datos del chat global
Global_msgs = new Meteor.Collection('global_msgs');


//Menu -- {name: String}
Menu = new Meteor.Collection("menu");


//Menu de user -- {name: String}
Menu_user = new Meteor.Collection("menu_user");

Juegos = new Meteor.Collection("juegos");

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