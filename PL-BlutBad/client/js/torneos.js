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
        sortTorneos = Torneos.find({
            game_id: game_session
        });  
    }          

    return sortTorneos; 
};  

Template.torneos.juegos=function(){
    return Juegos.find({});
};

Template.torneos.clase_Apuntada = function(t_id, u_id){ 
    // Array de jugadores.
    parts = Torneos.findOne({
        _id: t_id
    }).participantes;    
    if (_.contains(parts, u_id)) { 
        return "selected_apunto";
    } else {
        return "apunto";
    }
}

Template.torneos.apunto = function(t_id, u_id){  
    // Array de jugadores.
    parts = Torneos.findOne({
        _id: t_id
    }).participantes;   
    if (_.contains(parts, u_id)) { 
        return "Apuntado!";
    } else {
        return "Me apunto!";
    }
}

Template.torneos.getnamegame = function(g_id) {  
    return Juegos.findOne({
        _id: g_id
    }).name; 
}  

Template.torneos.participantes = function(t_id){ 
    parts = Torneos.findOne({
        _id: t_id
    }).participantes;   
    num_parts = parts.length;
    participantes = "(" + num_parts + ")"; 
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
    'click img': function() {

        //console.log("Pasar a la pagina de ver torneo");
        // Poner lo a null, es decir celeccionar por defecto
        Session.set('current_stage', 'showTorneo');
        Session.set('showTorneoId', this._id);        
    },
        
	//Acciones para empezar el torrneo      
	'click .empezarTorneo': function() {
	    //console.log(this);
	},
    
	//Para finalizar el torrneo.
    'click .finalizarTorneo': function() {
        //console.log(this);
    },

    'click input#crear_torneo': function() {
        openCreateDialog();
    },
    
    'click .sortBy': function () {
        Session.set("gametor", this._id); 
    },
    'click #mostrar_torneos': function() {
        Session.set("gametor", undefined);
    },
    'click .apunto': function (){    
        Torneos.update(this._id, { 
            $push : {participantes : Meteor.userId()}
        });
        $("#" + this._id + ".apunto").replaceWith("Apuntado!"); 
    },
    'click .selected_apunto': function () { 
        Session.set("apuntado", false);   
        Torneos.update(this._id, { 
            $pull : {participantes : Meteor.userId()}
        });        
        $("#" + this._id + ".selected_apunto").replaceWith("Me apunto!"); 
    },       
    'click .editar' : function() {
        Session.set('tornToEdit', this._id);  
    },    
    'click .borrar_tor' : function() {
        Torneos.remove(this._id);
    }, 
}; 

Template.createDialog.events({
    'click .save': function () {
        if (Meteor.user()) {
            user_create = Meteor.userId();
            var title = $('input#title').val();
            var description = $('#description').val();
            var date_start = $('input#date_start').val();
            var date_finish = $('input#date_finish').val();
            var game = $('#game').val();
            game_id = Juegos.find({
                name: game
            }).fetch()[0]._id; 
            var pic = $('input#pic').val();  
            if (title == '' | description == '' | date_start == '' |
                date_finish == '' | game == 'elige' | pic == '') {
                Session.set("createError", "Please, complete all the fields"); 
            } else if (!date_compare(date_start, date_finish)) {
                Session.set("createError", "La fecha de inicio no puede ser después que la de fin o antes que la de hoy"); 
            } else {
                Torneos.insert({title:title, game_id: game_id, user_create: user_create, 
                    date_start: date_start, date_finish: date_finish, 
                    description: description, pic: pic, participantes: []});
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

//////////////////////////EDIT CHAMPIONSHIP////////////////////////////////

Template.editTor.events({

    'click .save_edit' : function(event, template) {
        var gid = Session.get('tornToEdit');

        var title = template.find("#title").value;
        var date_start = template.find("#date_start").value;
        var date_finish = template.find("#date_finish").value;
        var description = template.find("#description").value; 
        var logo_src = template.find("#pic").value; 

        Torneos.update(gid, {
            $set : {
                title : title,
                logo_src : logo_src,
                date_start : date_start,
                date_finish: date_finish,
                pic: logo_src,
                description : description
            }
        });

        Session.set('tornToEdit', null);
    },

    'click .cancel' : function() {
        Session.set('tornToEdit', null); 
    }

});

Template.editTor.torneo = function() {
    var id = Session.get('tornToEdit');
    //console.log(id)
    return Torneos.findOne({
        _id : id
    });
};

Template.torneos.showEditTorn = function() {
    return Session.get('tornToEdit'); 
}   

Template.torneos.current_creator = function(id_torneo) {   
    id_userc = Torneos.findOne({
        _id: id_torneo
    }).user_create; 
    if (Meteor.userId() == id_userc) {
        return true;
    } else {
        return false;
    }
}