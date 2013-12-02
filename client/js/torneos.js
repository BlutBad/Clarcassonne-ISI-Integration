Template.torneos.show = function() { 
	return Session.get('current_stage') == 'Torneos';
};

var openCreateDialog = function () {
	Session.set("createError", null);
	Session.set("showCreateDialog", true);
}; 


Template.torneos.showCreateDialog = function () {
	return Session.get("showCreateDialog");
}; 

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

	//show_torneos = Session.get("showParticipantes");   
	//champ = ChampUser.find({id_torneo: show_torneos});  
	/*sortTorneos.forEach(function(each) {  
		if (each._id == champ.id_torneo) {
			each.participantes = Meteor.user(champ.id_user).username;  
		} 
		console.log(each);
	}); */  

    return sortTorneos; 
};  

Template.torneos.juegos=function(){
	return Juegos.find({});
};

Template.torneos.clase_Apuntada = function(t_id, u_id){ 
	if (ChampUser.findOne({id_torneo: t_id, id_user: u_id})) { 
		return "selected_apunto";
	} else {
		return "apunto";
	}
}

Template.torneos.apunto = function(t_id, u_id){ 
	if (ChampUser.findOne({id_torneo: t_id, id_user: u_id})) { 
		return "Apuntado!";
	} else {
		return "Me apunto!";
	}
}

Template.torneos.lista_participantes = function(t_id){
	return ChampUser.find({id_torneo: t_id});
}


Template.torneos.participantes = function(t_id){ 
	num_parts = (ChampUser.find({id_torneo: t_id})).count(); 
	participantes = "Participantes (" + num_parts + ")";
	return participantes;
}

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
		if (!ChampUser.findOne({id_torneo: this._id, id_user: Meteor.user()._id})) {  
			ChampUser.insert({id_torneo: this._id, id_user: Meteor.user()._id});  
			$("#" + this._id).replaceWith("Apuntado!"); 

		}  
	},
	'click .selected_apunto': function () { 
		if (ChampUser.findOne({id_torneo: this._id, id_user: Meteor.user()._id})) {  
			id_torneo_rm = ChampUser.findOne({id_torneo: this._id, id_user: Meteor.user()._id}); 
			ChampUser.remove(id_torneo_rm._id);
			$("#" + this._id).replaceWith("Me apunto!"); 
		}
	},
	'click #participantes': function(){   
		Session.set("showParticipantes", this._id);
	}
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