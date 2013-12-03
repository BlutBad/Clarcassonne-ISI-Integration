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
	Juegos.update(gid, {
	    $set : {
		name : name,
		logo_src : logo_src,
		title_desc : title_desc,
		description : description,
		wrapf : wrapf,
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
    if (Session.get('load_game')) {
	x = Session.get('load_game');
	gw = Juegos.findOne({
	    wrapf : x
	});

	Session.set('showGameIdn', gw.idn);

	$('#gamecontainer').show();

	Session.set("current_game", gw._id);
	eval(gw.wrapf);
	/*
	if (gw.mode === "solo") {
	    eval(gw.wrapf);
	} else if (gw.mode === "multi") {
	    Session.set('current_stage','klarkiHall');
	}
	*/

    } else {
	Session.set('showGameIdn', null);
	canvas = null;
	$('#gamecontainer').hide();
    }
});

var canvasAlien, canvasFroot;
Template.gamecontainer.render = function() {
    $('#gamecontainer').show();
};

Deps.autorun(function(c) {
    if (Session.equals('showGameIdn', 'froot')) {
	$('#gameFrootcontainer').show();
    } else {
	$('#gameFrootcontainer').hide();
    }
});

Deps.autorun(function(c) {
    if (Session.equals('showGameIdn', 'alien')) {
	$('#gamecanvasAlien').show();
    } else {
	$('#gamecanvasAlien').hide();
    }
});

Deps.autorun(function(c) {
    if (Session.equals('showGameIdn', 'alien')) {
	$('#gamecanvasAlien').show();
    } else {
	$('#gamecanvasAlien').hide();
    }
});
