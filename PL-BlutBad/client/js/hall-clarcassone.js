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
        usersJoined = PartidasVolatiles.find({});
        usersinParty = false;
        usersJoined.forEach(function(each) {
            each.jugadores.forEach(function(each2) {
                if (each2.user_id == Meteor.userId()) {
                    usersinParty = true;
                }
            });
        });
        // Dejar al user estar en lista de jugadores solo si esta auntenticado
        if (Meteor.userId() && !userA && !usersinParty) {
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

Template.hall_clarcassone
        .events({
            'click #nuevaPartida' : function() {
                if (Meteor.userId()) {
                    userA = UsersInHall.findOne({
                        user_id : Meteor.userId()
                    });
                    userCreator = PartidasVolatiles.findOne({
                        creator_id : Meteor.userId()
                    })
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
                                } ]
                            });
                            UsersInHall.remove(userA._id);
                            Session.set("createError", undefined);
                        } else {
                            Session
                                    .set("createError",
                                            "Ya estás en una partida.... no crees otra! :D");
                        }
                    }
                } else {
                    Session.set("createError",
                            "Regístrate para crear partidas!");
                }
            },
            'click .removeparty' : function() {
                if (Meteor.userId()) {
                    if (Meteor.userId()) {
                        userCreator = PartidasVolatiles.findOne({
                            creator_id : Meteor.userId()
                        });
                        if (userCreator) {
                            PartidasVolatiles.remove(this._id);
                            Session.set("createError", undefined);
                        } else {
                            Session
                                    .set("createError",
                                            "No borres partidas que no has creado tú.... o.o");
                        }
                    }
                } else {
                    notRegister();
                }
            },
            'click .startparty' : function() {

                if (Meteor.userId()) {

                    usersJoined = PartidasVolatiles.findOne({
                        _id : this._id
                    }).jugadores;

                    if (usersJoined.length < 1 || usersJoined.length > 5) {
                        Session
                                .set("createError",
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

                        console
                                .log('eval("ClarcassonneGameIU.initialize(idCanvasElement, party_id)");');
                        // eval("ClarcassonneGameIU.initialize(idCanvasElement,
                        // party_id)");

                        // Id del canvas donde se va a pintar el juego

                        setTimeout(function() {
                            ClarcassonneGameIU.initialize('#CanvasclarcaGame',
                                    party_id);
                        }, 500);

                        // Para que se muestre el canvas del juego,
                        Session.set('showGameIdn', "clarki");

                        // Para esconder el hall, solo se ve el canvas
                        Session.set('current_stage', false);
                    }
                    // Hacer una entrada a la coleccion de Partidas,
                    // y llamar a ui y ai con ese _id de la partida.
                } else {
                    notRegister();
                }
            },

            'click .unirme' : function() {
                // console.log('Unirme a una partida');

                if (Meteor.userId()) {

                    usersJoined = PartidasVolatiles.findOne({
                        _id : this._id
                    }).jugadores;
                    usersinParty = false;
                    usersJoined.forEach(function(each) {
                        if (each.user_id == Meteor.userId()) {
                            usersinParty = true;
                        }
                    });
                    // console.log(usersinParty)
                    userA = UsersInHall.findOne({
                        user_id : Meteor.userId()
                    });
                    if (!usersinParty) {
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
                        userCreator = PartidasVolatiles.findOne({
                            _id : this._id
                        }).creator_id;
                        if (userCreator == Meteor.userId()) {
                            Session
                                    .set("createError",
                                            "Si quieres abandonar debes descartar la partida! Eres el creador...");
                        } else {
                            usersJoined = _.without(usersJoined, _.findWhere(
                                    usersJoined, {
                                        user_id : Meteor.userId()
                                    }));
                            PartidasVolatiles.update(this._id, {
                                creator_id : userCreator,
                                jugadores : usersJoined
                            });
                            Session.set("createError", undefined);
                        }
                    }
                } else {
                    notRegister();
                }
            },
            'click .ready' : function() {

                if (Meteor.userId()) {
                    usersJoined = PartidasVolatiles.findOne({
                        _id : this._id
                    });
                    userCreator = usersJoined.creator_id;
                    usersJoined = usersJoined.jugadores;
                    usersJoined.forEach(function(each) {
                        if (each.user_id == Meteor.userId()) {
                            if (each.estado == estadosU.listo) {
                                each.estado = estadosU.pendiente;
                            } else if (each.estado == estadosU.pendiente) {
                                each.estado = estadosU.listo;
                            } else {
                                each.estado = estadosU.inactivo;
                            }
                        }
                    });
                    PartidasVolatiles.update(this._id, {
                        creator_id : userCreator,
                        jugadores : usersJoined
                    });
                } else {
                    notRegister();
                }
            }
        });

Template.hall_clarcassone.partidasVolatiles = function() {
    return PartidasVolatiles.find({});
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
    usersJoined = PartidasVolatiles.findOne({
        _id : id_partida
    }).jugadores;
    usersinParty = false;
    usersJoined.forEach(function(each) {
        if (each.user_id == Meteor.userId()) {
            usersinParty = true;
            conten = "Abandonar";
        }
    });
    if (!usersinParty) {
        conten = "Unirse";
    }
    return conten;
}

Template.hall_clarcassone.rol = function(id_user) {
    usersJoined = PartidasVolatiles.find({});
    usersJoined.forEach(function(each) {
        if (each.creator_id == id_user) {
            conte = "Creador";
        } else {
            conte = "Participante";
        }
    });
    return conte;
}