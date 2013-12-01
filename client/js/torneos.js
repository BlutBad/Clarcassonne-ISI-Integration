Template.torneos.show = function() { 
	return Session.get('current_stage') == 'Torneos';
};

Template.torneos.events = {
	'click input#crear_torneo': function() {
		openCreateDialog();
	},
	'click .sortBy': function () {
		Session.set("gametor", this.name);
	},
	'click #mostrar_torneos': function() {
		Session.set("gametor", undefined);
	},
	'click .apunto': function (){  
		//console.log(this._id);
		//console.log(Meteor.user()._id);
		lista_apuntados = Session.get("selected_apunto");
		if (lista_apuntados == undefined) {
			lista_apuntados = [];
		}
		if (!_.contains(lista_apuntados, this._id)) { 
			lista_apuntados.push(this._id);			
		}
		Session.set("selected_apunto", lista_apuntados);
		if (!ChampUser.findOne({id_torneo: this._id, id_user: Meteor.user()._id})){ 
			ChampUser.insert({id_torneo: this._id, id_user: Meteor.user()._id});
		};
	},
	'click .participantes': function(){
		//console.log(this._id);
		Session.set("showParticipantes", this._id);
	}
};

var openCreateDialog = function () {
	Session.set("createError", null);
	Session.set("showCreateDialog", true);
}; 


Template.torneos.showCreateDialog = function () {
	return Session.get("showCreateDialog");
};

Template.torneos.participantes= function(){
	show_torneos = Session.get("showParticipantes");
	//console.log(show_torneos);
	champ = ChampUser.find({id_torneo: show_torneos});
	champ = [];
	champ.forEach(function(each) { 
		console.log(each.id_user);
		usu = {};  
		//if (Meteor.user(each.id_user).username){
			usu.usuarios= Meteor.user(each.id_user).profile.name; 
			usu.game = Torneos.findOne({_id: each.id_torneo}).name
		console.log(usu); 
    	champ.push(usu);
    	console.log(champ);
    });  
    return champ;
};


Template.createDialog.events({
	'click .save': function () {
		if (Meteor.user()) {
			if (Meteor.user().username) {
				var user_create = Meteor.user().username;
			}else{
				var user_create = Meteor.user().profile.name;
			};
			var title = $('input#title').val();
			var description = $('#description').val();
			var date_start = $('input#date_start').val();
			var date_finish = $('input#date_finish').val();
			var game = $('#game').val();
			var pic = $('input#pic').val();  
			if (title == '' | description == '' | date_start == '' |
				date_finish == '' | game == 'elige' | pic == '') {
				Session.set("createError", "Please, complete all the fields"); 
			} else if (!date_compare(date_start, date_finish)) {
				Session.set("createError", "La fecha de inicio no puede ser después que la de fin o antes que la de hoy"); 
			} else {
				Torneos.insert({title:title, game: game, user_create: user_create, 
					date_start: date_start, date_finish: date_finish, 
					description: description, pic: pic});
				Session.set("showCreateDialog", false);
			}
		} else {
			Session.set("createError", "Sign for create this championship");
		}
	},
	'click .cancel': function () {
		Session.set("showCreateDialog", false);
	},
	'click #date_start': function(){
		$(function() {
			$( "#date_start").datepicker({
				showOn: "button",
				buttonImage: "images/calendar.gif",
				buttonImageOnly: true,
				dateFormat: "yy-mm-dd"
			});
		});
	},
	'click #date_finish': function(){
		$(function() {
			$( "#date_finish").datepicker({
				showOn: "button",
				buttonImage: "images/calendar.gif",
				buttonImageOnly: true,
				dateFormat: "yy-mm-dd"
			});
		});
	}
});

Template.createDialog.error = function () {
	return Session.get("createError");
};

Template.torneos.torneo=function(){ 
	game_session = Session.get("gametor");  
	if (game_session == undefined) {
		sortTorneos = Torneos.find({});
	} else {
		sortTorneos = Torneos.find({game: game_session});
	}
	selected = Session.get("selected_apunto");  
			console.log(selected)
	if (selected != undefined) {
		selected.forEach(function(each){
			$("#" + each).toggleClass("selected_apunto", "apunto");
		}); 
	}	
    return sortTorneos;
}; 

Template.torneos.juegos=function(){
	return Juegos.find({});
};

Template.createDialog.juegos = function(){
	return Juegos.find({});	
}

function date_compare (init, fin) { 
	var inicio = Date.parse(init);  
	var fin = Date.parse(fin); 
	var now = new Date();
	now_time = Date.parse(now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate());

	if (inicio > fin | inicio < now_time) { 
	    return false;
	} else {
		return true;
	}
}

