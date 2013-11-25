// if the database is empty on server start, create some sample data.
Meteor.startup(function() {
  if (Menu.find().count() === 0) {
    var data = [ {
      name : "Juegos",
      contents : []
    }, {
      name : "Ranking",
      contents : []
    }, {
      name : "Torneos",
      contents : []
    }, {
      name : "Comunidad",
      contents : []
    }, ];

    var timestamp = (new Date()).getTime();
    for (var i = 0; i < data.length; i++) {
      var list_id = Menu.insert({
        name : data[i].name
      });
    }
  }

  if (Menu_user.find().count() === 0) {
    var data = [ {
      name : "Mi perfil",
      contents : []
    }, {
      name : "Mi clan",
      contents : []
    }, {
      name : "Configuración de mi cuenta",
      contents : []
    }, ];

    var timestamp = (new Date()).getTime();
    for (var i = 0; i < data.length; i++) {
      var list_id = Menu_user.insert({
        name : data[i].name
      });
    }
  }

  if (Juegos.find().count() === 0) {
    var data = [ {
      name : 'AlienInvasion',
      logo_src : '/images/games_logo/alieninvasion.jpg',
      logo_alt : 'Juega es este juego',
      title_desc : 'Titulo para la descripcion del juego',
      description : 'Descripcion del juego!'
    }, {
      name : 'Clarkasone',
      logo_src : '/images/games_logo/clarkasone.jpg',
      logo_alt : 'Juega es este juego',
      title_desc : 'Titulo para la descripcion del juego',
      description : 'Descripcion del juego!'
    },

    {
      name : 'Froot war',
      logo_src : '/images/games_logo/frootwars.jpg',
      logo_alt : 'Juega es este juego',
      title_desc : 'Titulo para la descripcion del juego',
      description : 'Descripcion del juego!'
    } ];

    for (var i = 0; i < data.length; i++) {
      var list_id = Juegos.insert(data[i]);
    }
  }

  if (Torneos.find().count() === 0) {
    var data = [ {
      title : "Torneo AlienInvasion",
      game : 'AlienInvasion',
      date_start: "11/29/2013",
      date_finish: "12/29/2013",
      pic: '/images/games_logo/alieninvasion.jpg',
      description : 'Descripcion del juego!, el ganador se lleva una copa y puntos para subir de nivel'
    }, 
    {
      title : "Torneo Clarcassone",
      game : 'Clarcassone',
      date_start: "11/29/2013",
      date_finish: "12/29/2013",
      pic: '/images/games_logo/clarkasone.jpg',
      description : 'Descripcion del juego!, el ganador se lleva una copa y puntos para subir de nivel'
    },
      
    {
      title : "Torneo Froot War",
      game : 'Froot War',
      date_start: "11/29/2013",
      date_finish: "12/29/2013",
      pic: '/images/games_logo/frootwars.jpg',
      description : 'Descripcion del juego!, el ganador se lleva una copa y puntos para subir de nivel'
    } ];

    for (var i = 0; i < data.length; i++) {
      var list_id = Torneos.insert(data[i]);
    }
  }
});
