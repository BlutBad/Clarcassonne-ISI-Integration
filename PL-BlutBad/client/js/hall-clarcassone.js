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
        // Para que no se muestre la plantilla 
        $('#gamecontainer').hide(); 
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

            todos_listos = false; 
            // Comprobar que todos los participantes estén listos.
            for ( var i = 0, l = usersJoined.length; i < l; i++) {
                if (usersJoined[i].estado == estadosU.listo) {
                    party_jugadores.push({
                        user_id : usersJoined[i].user_id
                    });
                    todos_listos = true;
                } else {
                    todos_listos = false;
                    break;
                }
            } 
            // id de la partida que ha sido creada.
            if (todos_listos) {
                party_id = Partidas.insert({
                    jugadores : party_jugadores,
                    terminada : false, 
                });
                PartidasVolatiles.update(this._id, {
                    $set: {jugadores : usersJoined,
                           listos: true,
                           partyid: party_id} 
                });   
                cargaClarca(party_id);
                setTimeout(removePartyV(this._id), 50000);
            } else {
                Session.set("createError",
                            "Todos los participantes deben estar listos!");

            }
        } 
        // Hacer una entrada a la coleccion de Partidas,
        // y llamar a ui y ai con ese _id de la partida. 
    },

    'click .unirme' : function() {  
        // Encontrar el user actual en alguna partida volátil normal (no de torneo)
        userInparty = PartidasVolatiles.find({  
            jugadores: { 
                $elemMatch: { 
                    user_id: Meteor.userId() 
                } 
            },
            torneo_id: false 
        }).fetch();  
        userA = UsersInHall.findOne({
            user_id : Meteor.userId()
        });
        if (userInparty.length == 0) {
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
    },
    'click .continue' : function() {   
        party_id = this._id;
        cargaClarca(party_id); 
    }
});

removePartyV = function(id) {
    PartidasVolatiles.remove(id);
}

cargaClarca = function(partyid) {
    ClarcassonneGameIU.initialize('#CanvasclarcaGame', party_id); 

    // Para que se muestre el canvas del juego,
    Session.set('showGameIdn', "clarki");

    // Para esconder el hall, solo se ve el canvas
    Session.set('current_stage', false); 

    // Para id de la partty para el room de webRTC
    Session.set('current_party_id_webRTC', partyid);      

    $('#gamecontainer').show();       
}

Deps.autorun(function(c) {   
    partidav = PartidasVolatiles.findOne({
        jugadores: {
            $elemMatch: {
                user_id: Meteor.userId()
            }
        },
        listos: true
    }); 
    if (partidav != undefined) {
        party_id = partidav.partyid;  
        cargaClarca(party_id);
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

Template.hall_clarcassone.CurrentParty = function() { 
    userin = Partidas.find({  
        jugadores: { 
            $elemMatch: { 
                user_id: Meteor.userId() 
            } 
        },
    }).fetch(); 
    if (userin.length != 0) {
        return userin
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
     gid = Session.get("current_game"); 
     if (gid) {
        //console.log(user_id) 
        rankingU = Ranking.findOne({ 
            game_id : gid, 
            user_id : user_id 
        }); 
        //console.log(rankingU)
        if (rankingU) { 
            return Rangos.findOne({ 
                _id : rankingU.rango_id 
            }).rango; 
        } else { 
            return "Fantasma";
        } 
    } else { 
        return "--";
    }  
}

Template.hall_clarcassone.tipo_partys= function() {     
    clk_tor = Session.get('clickado_mistor');     
    if (clk_tor == undefined || clk_tor) { 
        return "Partidas creadas en HALL";
    } else {
        return "Partidas creadas en Torneo";
    }
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

Template.hall_clarcassone.point = function(id_user, obj_party) { 
    mov = obj_party.movimientos; 
    last_mov = mov[mov.length-1];
    punts = last_mov.puntos;
    for (i = 0; i < punts.length; i++) {
        if (punts[i].id == id_user) {
            return punts[i].puntos;
        }
    }
}     