Template.juegos.show = function() {
    return Session.get('current_stage') == 'Juegos';
};

Template.juegos.juegos = function() {
    return Juegos.find({});
};

Template.juegos.editar=function(){
	if (Meteor.user()){
		if (Meteor.user().username=="admin") {
    		return true;
 		}else{
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
			if (this.name == 'Clarcassone') {
		    	Session.set('current_stage', "klarkiHall");
			} else {
		    	Session.set('current_stage', this.name);
		    	Session.set('load_game', this);
			}
		   // Session.set('load_game', true);
		    //curGameHall
		}
    },
    'click .edit_game' : function() {
    	//console.log("clickkk");
		Session.set('gameToEdit', this._id);
		//console.log(this._id);
    }
}); 

Deps.autorun(function(c) {
    lg = Session.get('load_game'); 
    if (lg && lg.mode == "solo") {  
		$('#gamecontainer').show();
		Session.set('showGameIdn', lg.idn);
		Session.set("current_game", lg._id);
	    eval(lg.wrapf); 
    } else { 
		$('#gamecontainer').hide();
		Session.set('showGameIdn', null); 
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
    if (Session.equals('showGameIdn', 'Clarca')) {
		$('#CanvasclarcaGame').show();
    } else {
		$('#CanvasclarcaGame').hide();
    }
});

Template.gamecontainer.render = function() {
    $('#gamecontainer').show();
};


///////

Template.juegos.showEditGame = function() {
	if (Meteor.user()){
		if (Meteor.user().username=="admin") {
    		return !Session.equals('gameToEdit', null);
 		};
 	};
}


Template.editGame.game = function() {
    var id = Session.get('gameToEdit');
    //console.log(id);
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
		//console.log(name + ' ' + description);

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
