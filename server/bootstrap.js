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
});