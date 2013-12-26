var estadosU = {
    listo : 'Listo!',
    pendiente : 'Pendiente',
    inactivo : 'Inactivo'
};

Template.hall_clarcassone.show = function() {
    // Mostrar el hall de clarcassone si ...
    userA = UsersInHall.findOne({
        user_id : Meteor.userId()
    });
    if (Session.get('current_stage') == 'klarkiHall') {
        // Encontrar el user actual en alguna partida volátil normal (no de torneo)
        userInparty = PartidasVolatiles.find({ 
            jugadores: { 
                $elemMatch: { 
                    user_id: Meteor.userId() 
                } 
            },
            torneo_id: false 
        }).fetch(); 
        if (Meteor.userId() && !userA && !userInparty.length) {
            UsersInHall.insert({
                user_id : Meteor.userId()
            });
        }
        return true;
    } else {
        // Si el estado cambia, ya no estamos en el hall de clarkasonne
        // borrar al user de los juadores online

        if (userA) {
            UsersInHall.remove(userA._id);
        }
        Session.set("createError", undefined);
        return false;
    }
};

Template.hall_clarcassone.error = function() {
    return Session.get("createError");
};
 
notRegister = function() {
    $(".not-register").dialog({
        modal : true,
        buttons : {
            Ok : function() {
                $(this).dialog("close");
            }
        }
    });
} 

Template.hall_clarcassone.events({
    'click #nuevaPartida' : function() { 
        if (Meteor.user()) {
            userA = UsersInHall.findOne({
                user_id : Meteor.userId()
            });
            userCreator = PartidasVolatiles.findOne({
                creator_id : Meteor.userId()
            });
            if (userCreator) {
                Session.set("createError", "Ya creaste una partida!");
            } else {
                if (userA) {
                    // ^.^ edad = Math.floor(Random.fraction() * 70);
                    PartidasVolatiles.insert({
                        creator_id : Meteor.userId(),
                        jugadores : [ {
                            user_id : Meteor.userId(),
                            estado : estadosU.pendiente,
                        } ],
                        listos: false,
                        torneo_id: false
                    });
                    UsersInHall.remove(userA._id);
                    Session.set("createError", undefined);
                } else {
                    Session.set("createError", 
                        "Ya estás en una partida.... no crees otra! :D");
                }
            } 
        } else {
            notRegister();
        }
    },
    'click .removeparty' : function() { 
        // Sólo se muestra el botón borrar partida al creador!!
        if (Meteor.userId()) { 
            PartidasVolatiles.remove(this._id);
            Session.set("createError", undefined); 
        } 
    },
    'click .startparty' : function() { 
        usersJoined = PartidasVolatiles.findOne({
            _id : this._id
        }).jugadores; 
        // Sólo se muestra el botón empezar al creador
        if (usersJoined.length < 3 || usersJoined.length > 5) {
            Session.set("createError",
                            "Para empezar una partida deben unirse de 3 a 5 jugadores");
        } else {
            var party_jugadores = [];

            for ( var i = 0, l = usersJoined.length; i < l; i++) {
                party_jugadores.push({
                    user_id : usersJoined[i].user_id
                });
            }

            // id de la partida que ha sido creada.
            party_id = Partidas.insert({
                jugadores : party_jugadores,
                terminada : false, 
            });
            PartidasVolatiles.update(this._id, {
                $set: {jugadores : usersJoined,
                       listos: true,
                       partyid: party_id} 
            }); 

            //console.log('eval("ClarcassonneGameIU.initialize(idCanvasElement, party_id)");');
            // eval("ClarcassonneGameIU.initialize(idCanvasElement, party_id)");

            // Id del canvas donde se va a pintar el juego

            ClarcassonneGameIU.initialize('#CanvasclarcaGame', party_id);

            // Para que se muestre el canvas del juego,
            Session.set('showGameIdn', "clarki");

            // Para esconder el hall, solo se ve el canvas
            Session.set('current_stage', false); 

            setTimeout(removePartyV(this._id), 5000); 
        } 
        // Hacer una entrada a la coleccion de Partidas,
        // y llamar a ui y ai con ese _id de la partida. 
    },

    'click .unirme' : function() {  
        // Encontrar el user actual en alguna partida volátil normal (no de torneo)
        userInparty = PartidasVolatiles.findOne({ 
            _id: this._id,
            jugadores: { 
                $elemMatch: { 
                    user_id: Meteor.userId() 
                } 
            },
            torneo_id: false 
        }); 
        userA = UsersInHall.findOne({
            user_id : Meteor.userId()
        });
        if (!userInparty) {
            // UNIRSE A PARTIDA!
            PartidasVolatiles.update(this._id, {
                $push : {
                    jugadores : {
                        user_id : Meteor.userId(),
                        estado : estadosU.pendiente,
                    }
                }
            });
            if (userA) {
                UsersInHall.remove(userA._id);
            }
            Session.set("createError", undefined);
        } else { 
            // ABANDONAR PARTIDA! 
            PartidasVolatiles.update(this._id, {
                $pull: {
                    jugadores: {
                        user_id: Meteor.userId()
                    }
                }
            }); 
            Session.set("createError", undefined);
        } 
    },
    'click .ready' : function() {   
        usersJoined = PartidasVolatiles.findOne({
            _id : this._id
        }).jugadores;  
        usersJoined.forEach(function(each) {
            if (each.user_id == Meteor.userId()) {
                if (each.estado == estadosU.listo) {
                    each.estado = estadosU.pendiente;
                } else if (each.estado == estadosU.pendiente || each.estado == estadosU.inactivo) {
                    each.estado = estadosU.listo;
                } else {
                    each.estado = estadosU.inactivo;
                }
            }
        }); 
        PartidasVolatiles.update(this._id, { 
            $set: {
                jugadores : usersJoined
            } 
        }); 
    }
});

removePartyV = function(id) {
    PartidasVolatiles.remove(id);
}

Deps.autorun(function(c) { 
    user =  Meteor.userId();    
    ready = false;
    PartidasVolatiles.find({}).forEach(function(each){
        each.jugadores.forEach(function(each2){
            if (each2.user_id == user){
                ready = each.listos;
                partidav = each;
            }
        })
    });
    if (ready) {
        party_id = partidav.partyid; 
        ClarcassonneGameIU.initialize('#CanvasclarcaGame', party_id); 

        // Para que se muestre el canvas del juego,
        Session.set('showGameIdn', "clarki");

        // Para esconder el hall, solo se ve el canvas
        Session.set('current_stage', false);         
    }
});



Template.hall_clarcassone.partidasVolatiles = function() {
    gtsid = Session.get('gameTorneoSelectId');
    if (gtsid){
        return PartidasVolatiles.find({ torneo_id : gtsid});
    } else {
        return PartidasVolatiles.find({ torneo_id: false });
    }    
} 

Template.hall_clarcassone.noTorneo = function() {
    gtsid = Session.get('gameTorneoSelectId');
    if (gtsid){
        return false;
    }
    return true;
} 

Template.hall_clarcassone.UsersInHall = function() {
    return UsersInHall.find({});
}

// El rango del usuario en la tabla de miembros de la partida
Template.hall_clarcassone.userRango = function(user_id) {
    /*
     * gid = Session.get("current_game"); console.log("gid: "+gid); if (gid) {
     * rankingU = Ranking.findOne({ gameId : gid, userId : user_id }) if
     * (rankingU) { return Rangos.findOne({ id : rankingU.rango_id }).rango; }
     * else { return Rangos.findOne({ game_id : gid }).rango; } } else { return
     * "--" }
     */
    return "--"
}

Template.hall_clarcassone.estadoUser = function(estado) {
    if (estado == estadosU.pendiente) {
        clas = 'label label-warning'
    } else if (estado == estadosU.listo) {
        clas = 'label label-success'
    } else if(estado == estadosU.inactivo){
        clas = 'label'
    }
    return clas;
};

Template.hall_clarcassone.estadoUserAct = function(id_partida) {
    usersJoined = PartidasVolatiles.findOne({
        _id : id_partida
    }).jugadores;
    content = 'Listo';
    usersJoined.forEach(function(each) {
        if (each.user_id == Meteor.userId()) {
            if (each.estado == estadosU.pendiente) {
                content = 'Listo';
            } else if (each.estado == estadosU.listo) {
                content = 'Pendiente';
            }
        }
    });
    return content;
};

Template.hall_clarcassone.unir_aband = function(id_partida) { 
    userInparty = PartidasVolatiles.findOne({ 
        _id: id_partida,
        jugadores: { 
            $elemMatch: { 
                user_id: Meteor.userId() 
            } 
        },
        torneo_id: false 
    }); 
    if (!userInparty) { 
        return "Unirse";
    }
    return "Abandonar";
}

Template.hall_clarcassone.muestro_oculto = function(id_partida) {
    userCreator = PartidasVolatiles.findOne({
        _id : id_partida
    }).creator_id;
    if (userCreator == Meteor.userId()) {
        return "muestro";
    }
    return "oculto"; 
}

Template.hall_clarcassone.show_ab = function(id_partida) {
     userCreator = PartidasVolatiles.findOne({
        _id : id_partida
    }).creator_id;
    if (userCreator == Meteor.userId()) {
        return false;
    }
    return true;
}

Template.hall_clarcassone.show_ready = function() { 
    userInparty = PartidasVolatiles.findOne({
        _id : this._id,
        jugadores: { 
            $elemMatch: { 
                user_id: Meteor.userId() 
            } 
        } 
    });
    if (userInparty) {
        return true;
    } 
    return false;
}

Template.hall_clarcassone.rol = function(id_user, id_partida) { 
    userInparty = PartidasVolatiles.findOne({
        _id : id_partida,
        creator_id: id_user
    });
    if (userInparty) {
        return "Creador";
    }
    return "Participante"; 
} 