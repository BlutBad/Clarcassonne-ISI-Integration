//////// JUEGOS ////////
//Mira si la partida ha comenzado
Deps.autorun(function() {
	var doc_partidas = Partidas.findOne({_id : Session.get('match_id')});
	if(doc_partidas){
		var empezada = doc_partidas.initiated;
		if(empezada == 'true'){
			$('#clarcassonnecontainer').show();
			ClarcassonneGameIU.initialize('#clarcassonnecanvas', Session.get('match_id'));
		};
	};
});


//Carga el nombre del juego
Template.gamenametemp.gamename=function(){
	var gameName = "None";
	if(Games.findOne({_id: Session.get('game_id')})){
		gameName = Games.findOne({_id: Session.get('game_id')}).name;
	};
	return gameName;
}
//Carga el título de la partida
Template.matchnametemp.matchname=function(){
	var matchName = "None";
	if(Partidas.findOne({_id: Session.get('match_id')})){
		matchName = Partidas.findOne({_id: Session.get('match_id')}).name;
	};
	return matchName;
}
//Carga los jugadores presentes en una partida
Template.roomplayerstemp.players=function(){	
	var matches_document = Partidas.findOne({_id : Session.get('match_id')});
	var players_list;
	var players_names = [];
	if(matches_document){
		players_list = matches_document.jugadores;
		players_list.forEach(function(entry){
			players_names.push({"name" : Meteor.users.findOne({_id:entry}).username});
		});
	};
	return players_names;
}


// Abrimos sesión en uno de los juegos
Template.gamestemp.events = {
	'click .linkgame':function(event){
		Session.set('game_id', $(this)[0]._id);
		$('#games').hide();
		$('#matches').fadeIn();
	}
}

Template.matchestemp.events = {
	// Creamos una partida nueva en la base de datos y nos unimos automáticamente
	'keydown input#match_creator':function(event){
		if(event.which==13){
			if(!Partidas.findOne({name : $("#match_creator").val()})){
				if ($("#match_creator").val()!=''){
					Partidas.insert({
						name: $("#match_creator").val(),
						game_id: Session.get("game_id"),
						created: new Date(),
						initiated: false,
						finish: false,
						admin_by: Meteor.userId()
					});

					var current_match_id = Partidas.findOne({name: $("#match_creator").val()})._id;
					Session.set('match_id', current_match_id);
					$('#matches').hide();
					$('#roomcontainer').fadeIn();
					if (Games.findOne({_id : Session.get("game_id")}).name=="Alien_Invasion")
						$('#aliencontainer').show();
					else if (Games.findOne({_id :Session.get("game_id")}).name=="Froot_Wars")
						$('#frootwarscontainer').show();
					Partidas.update({_id : Session.get('match_id')},{$push: {jugadores: {user_id: Meteor.userId()}},$inc:{num_players :1}});
					$("#match_creator").val('');
				};
			} else {
				alert("Ya existe una partida con ese nombre. Pruebe con otro.");
			};
		};
	},
	// Entramos en una partida
	'click a.linkmatch':function(event){
		var lim = Games.findOne({_id : $(this)[0].game_id}).players_max;
		var no_limit = Partidas.findOne({_id : $(this)[0]._id}).num_players < lim;
		var players_array = Partidas.findOne({_id : $(this)[0]._id}).jugadores;
		var already_into = players_array.indexOf(Meteor.userId()) != -1;
		if(no_limit || already_into){
			Session.set('match_id', $(this)[0]._id);
			$('#matches').hide();
			$('#roomcontainer').fadeIn();
			$('#empezarboton').hide();
			console.log('AAA');
			if(Partidas.findOne({_id : Session.get('match_id')}).admin_by == Meteor.userId()){
				console.log('BBB');
				$('#empezarboton').show();
			};

			if (Games.findOne({_id : Session.get('game_id')}).name=="Alien_Invasion")
				$('#aliencontainer').show();
			else if (Games.findOne({_id : Session.get('game_id')}).name=="Froot_Wars")
				$('#frootwarscontainer').show();
			if(!already_into){
				Partidas.update({_id : Session.get('match_id')}, {$push: {jugadores: {user_id: Meteor.userId()}},$inc: {num_players: 1}});
			}
		} else {
			Session.set('match_id', undefined);
			alert("Partida llena. Pruebe en otra partida.");
		};

	},
	// Volvemos atrás para elegir otro juego
	'click a#match_back':function(event){
		Session.set('game_id', undefined);
		$('#matches').hide();
		$('#games').fadeIn();
	}
}


Template.roomgametemp.events = {
	// Salimos de una partida
	'click a#exitgame':function(event){
		var quiter_id = Meteor.userId();
		var quited_match_id = Session.get('match_id');
		var players_array = Partidas.findOne({_id : quited_match_id}).jugadores;
		players_array = _.reject(players_array, function(player){ return player == quiter_id; });
		Partidas.update({_id : quited_match_id}, {$set:{jugadores : players_array},$inc: {num_players: -1}});

		if(Partidas.findOne({_id : quited_match_id}).num_players == 0){
			Partidas.remove({_id : quited_match_id});
		} else {
			if(quiter_id == Partidas.findOne({_id : quited_match_id}).admin_by){
				Partidas.update({_id : quited_match_id}, {$set:{admin_by : players_array[0]}});
			};
		};

		Session.set('match_id', undefined);
		$('#clarcassonnecontainer').hide();
		$('#roomcontainer').hide();
		$('#aliencontainer').hide();
		$('#frootwarscontainer').hide();
		$('#matches').fadeIn();

		///ocultar videochat
		endVideoChat();
	}
};


// Pone la partida en "empezada"
Template.roomplayerstemp.events = {
	'click #EmpezarCarca' : function(event){
				if(Partidas.findOne({_id : Session.get('match_id')}).admin_by == Meteor.userId()){
					if(Partidas.findOne({_id : Session.get('match_id')}).num_players >= 3){
						$('#empezarboton').hide();	
						Partidas.update({_id: Session.get('match_id')}, {$set: {initiated: 'true'}});
					} else {
						alert("Se necesitan al menos tres jugadores.");
					}
				} else {
					alert("No eres el administrador de esta partida. Espera hasta que el administrador comience.");
				};
	}
};

// Devuelve 'true' si eres administrador para representar el botón de empezar
Template.roomplayerstemp.admin = function() {
	var isAdmin = false;
	if(Meteor.userId() && Session.get('match_id')){
		isAdmin = Meteor.userId() == Partidas.findOne({_id : Session.get('match_id')}).admin_by;
	};
	return isAdmin;
} 

