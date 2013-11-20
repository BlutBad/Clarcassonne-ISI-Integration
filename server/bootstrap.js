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
      name : 'Alien Invasion',
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
});
