Template.juegos.show = function() {
	return Session.get('current_stage') == 'Juegos';
};

Template.juegos.juegos = function() {
	return Juegos.find({});
};

Template.editGame.game = function() {
	var id = Session.get('gameToEdit');
	return Juegos.findOne({
		_id : id
	});
};

Template.juegos.showEditGame = function() {
	return !Session.equals('gameToEdit', null);
}

Template.juegos.events({
	'click img' : function() {
		// console.log(this.name);
		// Si estas pinchando sobre el mismo tag que ya esta seleccionado
		if (Session.equals('current_stage', this.name)) {
			// Poner lo a null, es decir celeccionar por defecto
			Session.set('current_stage', 'Juegos');
			// Session.set('load_game', null);
		} else {
			// De otra manera apuntar nuevo id del tag seleccionado
			Session.set('current_stage', this.name);
			Session.set('load_game', this.wrapf);
			// console.log(Session.get('load_game'));
		}
	},
	'click input' : function() {
		Session.set('gameToEdit', this._id);
		console.log(this.name);
	}
});

Template.editGame.events({
	'click .save' : function(event, template) {

		var gid = Session.get('gameToEdit');

		var title_desc = template.find("#title_desc").value;

		var logo_src = template.find("#logo_src").value;

		var name = template.find("#name").value;
		var description = template.find("#description").value;
		var wrapf = template.find("#wrapf").value;
		console.log(name + ' ' + description);
		wrapf
		Juegos.update(gid, {
			$set : {
				name : name,
				logo_src : logo_src,
				title_desc : title_desc,
				description : description,
				wrapf:wrapf,
			}
		});

		Session.set('gameToEdit', null);
	},
	'click .cancel' : function() {
		Session.set('gameToEdit', null);
	}
});

var canvas;

// la parte de cll parece un infierno, pero en el server no se conoce Session.
Deps.autorun(function(c) {
	// console.log(Session.get('load_game') + '("dummydiv", null, null)');
	if (Session.get('load_game')) {
		// console.log(Session.get('load_game'));

		x = Session.get('load_game');
		b = Juegos.findOne({
			wrapf : x
		});
		if (b._id == null) {
			console.log('Es null')
		}
		cll = Session.get('load_game') + '("dummydiv", null, null, "' + b._id
				+ '")';
		canvas = eval(cll);

		$('#gamecontainer').show();
	} else {
		canvas = null;
		$('#gamecontainer').hide();

	}
});

Template.gamecontainer.render = function() {
	$('#gamecontainer').show();
};
