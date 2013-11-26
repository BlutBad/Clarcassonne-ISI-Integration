
Template.torneos.show = function() {
	return Session.get('current_stage') == 'Torneos';
};

Template.torneos.events = {
	'click input#crear_torneo': function() {
		openCreateDialog();
	}
};

var openCreateDialog = function () {
	Session.set("createError", null);
	Session.set("showCreateDialog", true);
};


Template.torneos.showCreateDialog = function () {
	return Session.get("showCreateDialog");
};

Template.createDialog.events({
	'click .save': function () {
		if (Meteor.user()) {
			if (Meteor.user().username) {
				var user_create = Meteor.user().username;
			}else{
				var user_create = Meteor.user().profile.name;
			};
			var title = $('input#title');
			var description = $('#description');
			var date_start = $('input#date_start');
			var date_finish = $('input#date_finish');
			var game = $('#game');
			var pic = $('input#pic');
			Torneos.insert({title:title.val(), game: game.val(), user_create: user_create, date_start: date_start.val(), date_finish: date_finish.val(), description: description.val(), pic: pic.val() });
			Session.set("showCreateDialog", false);
		} else {
			Session.set("createError", "It needs a title and a description, or why bother?");
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
				buttonImageOnly: true

			});
		});
	},
	'click #date_finish': function(){
		$(function() {
			$( "#date_finish").datepicker({
				showOn: "button",
				buttonImage: "images/calendar.gif",
				buttonImageOnly: true
			});
		});
	}
});

Template.createDialog.error = function () {
	return Session.get("createError");
};

Template.torneos.torneo=function(){
	return Torneos.find({});
};

Template.torneos.juegos=function(){
	return Juegos.find({});
};

			
