Template.juegos.show = function() {
	return Session.get('current_stage') == 'Juegos';
};

Template.juegos.juegos = function() {
	return Juegos.find({});
}


Template.juegos.events({
	'click img' : function() {
		//console.log(this.name);
		// Si estas pinchando sobre el mismo tag que ya esta seleccionado
		if (Session.equals('current_stage', this.name)) {
			// Poner lo a null, es decir celeccionar por defecto
			Session.set('current_stage', 'Juegos');
			//Session.set('load_game', null);
		} else {
			// De otra manera apuntar nuevo id del tag seleccionado
			Session.set('current_stage', this.name);
			Session.set('load_game', this.wrapf);
			//console.log(Session.get('load_game'));
		}
	}
});

var canvas;

//la parte de cll parece un infierno, pero en el server no se conoce Session.
Deps.autorun(function(c) {
	//console.log(Session.get('load_game') + '("dummydiv", null, null)');
	if (Session.get('load_game')) {
		//console.log(Session.get('load_game'));
		
		x = Session.get('load_game');
		b = Juegos.findOne({wrapf:x});
		if (b._id == null){
			console.log('Es null')
		}
		cll = Session.get('load_game') + '("dummydiv", null, null, "' +b._id+'")';  
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



