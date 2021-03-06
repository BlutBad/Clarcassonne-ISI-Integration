

//Para guardar las partidas que se van a jugar
Partidas = new Meteor.Collection('partidas');

//Guardas las partidas que se estan preparando en el hall,
//antes de dar al botno de jugar partida, una coleccion de servicio, para no ensuciar 
//la coleccion buena con partidas que quizas no se creen.
PartidasVolatiles =  new Meteor.Collection('partidasVolatiles');

//Usuarios que estan ahora mismo en el holl de Clarkasone,
UsersInHall =  new Meteor.Collection('usersihall');



// Colección de la base de datos del chat global
Global_msgs = new Meteor.Collection('global_msgs');
/*
	_id | user_id | msg
*/

Private_msgs = new Meteor.Collection('private_msgs');
 // 			_id | user1_id | user2_id | msg


Game_msgs = new Meteor.Collection('game_msgs');
//				_id | user_id | game_id | msg


//Menu -- {name: String}
Menu = new Meteor.Collection("menu");


//Menu de user -- {name: String}
Menu_user = new Meteor.Collection("menu_user");

Juegos = new Meteor.Collection("juegos"); 


Rangos = new Meteor.Collection("rangos");

 
/*
description : "Has jugado una vez a este juego",
timesPlayed : 1,
insig_image_src : '/insignias/6.jpg' */
Insignias = new Meteor.Collection("insignias"); 

InsigniasToUser = new Meteor.Collection("insigniasToUser"); 

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
Torneos.allow({
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


//	gameId : userId : maxScore : totalScore: score rango_id:rango._id
Ranking = new Meteor.Collection("ranking");


Friends = new Meteor.Collection("friends");

/* Modelo de la coleccion Friends:
{
	_id: ***,
	userid: _id,
	username: username,
	friends: [
		{name: username},
		{name: username}, ...
	]
}
*/

Mensajes = new Meteor.Collection("mensajes");

/* Modelo de la coleccion
{
	_id: ***,
	origen: A,
	destino: B,
	mensaje: X,
	time: 0000	
}
*/

/*user_id, isicoins_total isi_coins*/
Shop = new Meteor.Collection("shop");

//name description time game_id
Bono = new Meteor.Collection("bono") 

//user_id bono_id n_bono
User_Bono=new Meteor.Collection("user_bono");