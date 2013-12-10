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

Template.torneos.muestra_part = function(t_id){ 
        show_torneos = Session.get("showParticipantes");    
        if (show_torneos == undefined | !_.contains(show_torneos, t_id)) {
                return "oculta_part";
        } else { 
                return "muestra_part"; 
        } 
}

Template.torneos.participantes = function(t_id){ 
        num_parts = (ChampUser.find({id_torneo: t_id})).count(); 
        participantes = "Participantes (" + num_parts + ")";
        return participantes;
}

Template.createDialog.juegos = function(){
        return Juegos.find({});        
}
Template.editChamp.juegos = function(){
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
                        $("#" + this._id + ".apunto").replaceWith("Apuntado!"); 

                }  
        },
        'click .selected_apunto': function () { 
                if (ChampUser.findOne({id_torneo: this._id, id_user: Meteor.user()._id})) {  
                        id_torneo_rm = ChampUser.findOne({id_torneo: this._id, id_user: Meteor.user()._id}); 
                        ChampUser.remove(id_torneo_rm._id);
                        $("#" + this._id + ".selected_apunto").replaceWith("Me apunto!"); 
                }
        },
        'click .participantes': function(){  
                lista_show = Session.get("showParticipantes");
                if (lista_show == undefined) {
                        lista_show = [];
                } 
                if (!_.contains(show_torneos, this._id)) {
                        $("#" + this._id + ".oculta_part").switchClass("oculta_part", "muestra_part");
                        lista_show.push(this._id);
                } else { 
                        lista_show = _.without(lista_show, _.findWhere(lista_show, this._id));
                        $("#" + this._id + ".muestra_part").switchClass("muestra_part", "oculta_part");
                }
                Session.set("showParticipantes", lista_show);

        },        
    'click .btn_edit' : function() {
                Session.set('tornToEdit', this._id);  
    },
        'click .editar' : function() {
                 Session.set('champToEdit', this._id);
                console.log(this._id);
    },
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

//EDIT CHAMPIONSHIP

Template.torneos.showEditChamp = function() {
    console.log("here");
    return !Session.equals('champToEdit', null);
}


Template.editChamp.champ = function() {
    var id = Session.get('champToEdit');
    return Torneos.findOne({
        _id : id
    });
};
Template.editChamp.events({
    'click .save' : function(event, template) {
            var tid = Session.get('champToEdit');
                var title = $('input#title').val();
                var description = $('#description').val();
                var date_start = $('input#date_start').val();
                var date_finish = $('input#date_finish').val();
                var game = $('#game').val();
                var pic = $('input#pic').val();
        Torneos.update(tid, {
            $set : {
                title : title,
                game : game,
                date_start : date_start,
                date_finish : date_finish,
                description : description,
                pic : pic,
            }
        });
        Session.set('champToEdit', null);
    },
    'click .cancel' : function() {
        Session.set('champToEdit', null);
        console.log(Session.get('curObj'));
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

Template.torneos.editar=function(){
        if (Meteor.user()){
                usuarios=Torneos.findOne({_id : this._id});
                console.log(this._id);
                console.log(usuarios.user_create);
                if (Meteor.user().username==usuarios.user_create) {
                    return true;
                 }else{
                         return false;
                 };
         };
};