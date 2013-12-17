Template.juegos.show = function() {
    return Session.get('current_stage') == 'Juegos';
};

Template.juegos.juegos = function() {
    return Juegos.find({});
};

Template.juegos.editar = function() {
    if (Meteor.user()) {
	if (Meteor.user().username == "admin") {
	    return true;
	} else {
	    return false;
	};
    };
};

Template.juegos.events({
    'click img' : function() {
	// Si estas pinchando sobre el mismo tag que ya esta seleccionado
	if (Session.equals('current_stage', this.name)) {
	    Session.set('current_stage', 'Juegos');
	    Session.set('load_game', null);
	} else {
	    Session.set('current_stage', false);
	    Session.set('load_game', this);
	    Session.set('current_game', this._id);
	}
    },
    'click .edit_game' : function() {
	Session.set('gameToEdit', this._id);
	// console.log(this._id);
    }
});

/*
 * if (Meteor.user()) { if (Meteor.user().username == "admin") { return true; }
 * else { return false; }; }; };
 * 
 */

// Los juegos se dividen en dos grupos,
// - Solo, para solo un jugador
// - Multi para mas de un jugador, hay que crear partidas, por eso hay que pasar
// a un estado
// - de creacion de partidas y luego ya arrancar la partida.
Deps.autorun(function(c) {
    // lg - el juego sobre el cual se acaba de pinchar.
    lg = Session.get('load_game');
    if (lg) {
	Session.set("current_game", lg._id);
	// Si es solo, mostramos el game container y el canvas del juego, y
	// seguidamente lo lanzamos.
	if (lg.mode == "solo") {
	    $('#gamecontainer').show();
	    Session.set('showGameIdn', lg.idn);
	    // current_game - es necesaria para el juego, con el id del juego luego
	    // se apunta al jugador en el ranking.
	    Session.set("current_game", lg._id);
	    // Se lanza el juego.
	    eval(lg.wrapf);
	} else if (lg.mode == "multi") {
	    // Si el modo el multi, vamos a pasarl al estado del HALL del juego,
	    // Asi podemos tener muchos juego multi, cada uno con su HALL, y
	    // cargarlo el hall si mucho sufrimiento.
	    Session.set('current_stage', lg.hall)
	}
    } else {
	// Se esconde el contenedor de juegos.
	$('#gamecontainer').hide();
	Session.set('showGameIdn', false);
    }
});

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
    console.log(Session.get("showGameIdn"))
    if (Session.equals('showGameIdn', 'clarki')) {
	// Para los multijuegos, mostramos el contenedor junto con el juego.
	$('#gamecontainer').show();
	$('#CanvasclarcaGame').show();
	//$('#ClarcaGame').show();
	
    } else {
	$('#CanvasclarcaGame').hide();
	//$('#ClarcaGame').hide();
    }
});

Template.gamecontainer.render = function() {
    $('#gamecontainer').show();
};

// /////////////////////////EDIT GAME DESCRIPTION//////////////////////////////

Template.juegos.showEditGame = function() {
    if (Meteor.user()) {
	if (Meteor.user().username == "admin") {
	    return !Session.equals('gameToEdit', null);
	}
	;
    }
    ;
}

Template.editGame.game = function() {
    var id = Session.get('gameToEdit');
    // console.log(id);
    return Juegos.findOne({
	_id : id
    });
};

Template.editGame.events({

    'click .save' : function(event, template) {
	var gid = Session.get('gameToEdit');

	var title_desc = template.find("#title_desc").value;
	var logo_src = template.find("#logo_src").value;
	var name = template.find("#name").value;
	var description = template.find("#description").value;
	var wrapf = template.find("#wrapf").value;
	// console.log(name + ' ' + description);

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

