// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (Menu.find().count() === 0) {
    var data = [
      {name: "Juegos",
       contents: []
      },
      {name: "Ranking",
       contents: []
      },
      {name: "Torneos",
       contents: []
      },
      {name: "Comunidad",
        contents: []
      },
    ];

    var timestamp = (new Date()).getTime();
    for (var i = 0; i < data.length; i++) {
      var list_id = Menu.insert({name: data[i].name});
    }
  }

  if (Menu_user.find().count() === 0) {
    var data = [
      {name: "Mi perfil",
       contents: []
      },
      {name: "Mi clan",
       contents: []
      },
      {name: "Configuración de mi cuenta",
       contents: []
      }, 
    ];

    var timestamp = (new Date()).getTime();
    for (var i = 0; i < data.length; i++) {
      var list_id = Menu_user.insert({name: data[i].name});
    }
  }
  
  if (Juegos.find().count() === 0) {
    var data = [
      {name: 
      },
    ];


    for (var i = 0; i < data.length; i++) {
      var list_id = Juegos.insert({data[i]});
    }
  }
});

