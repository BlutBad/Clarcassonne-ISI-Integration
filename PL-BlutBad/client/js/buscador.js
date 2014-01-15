//Templates

Template.buscador.show = function() {
  buscar = Session.get('current_stage') == 'Buscar usuarios'; 
  if (buscar){    
    $('#gamecontainer').hide();
    Session.set('showGameIdn', false); 
  }
  return buscar;
};

Template.buscador.register = function() {
  if (Meteor.user()) {
    return true;
  } else {
    return false;
  }
};

Template.buscador.showprofilfriend = function() {
    return Session.get('profilfriend', this._id); 
};

Template.friendprofil.usuario = function() {
    var id = Session.get('profilfriend');
    //console.log(id)
    return Meteor.users.findOne({
        _id : id
    });
};

Template.stadGraphic.rendered =function(){
  var id= Session.get('profilfriend');
  rankings = Ranking.find({user_id: id});
  scores = [];
  rankings.forEach(function(each,index) { 
    sco = {};   
    sco.No = index+1;
    sco.win=each.winTimes;
    sco.lose=each.loseTimes;
    sco.total=each.timesPlayed;
    sco.totalScore = each.totalScore;
    sco.game = Juegos.findOne({_id: each.game_id}).name;
    scores.push(sco);
  });  
  //console.log(scores.length);
  if (scores.length!==0){
    if (scores.length===1){ 
      var colors = Highcharts.getOptions().colors,
      categories = [scores[0].game, ' ', ' '],
      name = 'Browser brands',
      data = [{
        y: scores[0].total,
        color: colors[0],
        drilldown: {
          name: scores[0].game,
          categories: ['Ganadas', 'Perdidas'],
          data: [scores[0].win, scores[0].lose],
          color: colors[0]
        }
      }, {
        y: 0,
        color: colors[1],
        drilldown: {
          name: ' ',
          categories: ['Ganadas', 'Perdidas'],
          data: [0, 0],
          color: colors[1]
        }
      }, {
        y: 0,
        color: colors[2],
        drilldown: {
          name: ' ',
          categories: ['Ganadas', 'Perdidas'],
          data: [0, 0],
          color: colors[2]
        }
      }];

    }else if (scores.length===2){
    var colors = Highcharts.getOptions().colors,
    categories = [scores[0].game, scores[1].game, ' '],
    name = 'Browser brands',
    data = [{
        y: scores[0].total,
        color: colors[0],
        drilldown: {
          name: scores[0].game,
          categories: ['Ganadas', 'Perdidas'],
          data: [scores[0].win, scores[0].lose],
          color: colors[0]
        }
      }, {
        y: scores[1].total,
        color: colors[1],
        drilldown: {
          name: scores[1].game,
          categories: ['Ganadas', 'Perdidas'],
          data: [scores[1].win, scores[1].lose],
          color: colors[1]
        }
      }, {
        y: 0,
        color: colors[2],
        drilldown: {
          name: ' ',
          categories: ['Ganadas', 'Perdidas'],
          data: [0, 0],
          color: colors[2]
        }
      
      }];

    }else if (scores.length===3){
      var colors = Highcharts.getOptions().colors,
    categories = [scores[0].game, scores[1].game, scores[2].game],
    name = 'Browser brands',
    data = [{
        y: scores[0].total,
        color: colors[0],
        drilldown: {
          name: scores[0].game,
          categories: ['Ganadas', 'Perdidas'],
          data: [scores[0].win, scores[0].lose],
          color: colors[0]
        }
      }, {
        y: scores[1].total,
        color: colors[1],
        drilldown: {
          name: scores[1].game,
          categories: ['Ganadas', 'Perdidas'],
          data: [scores[1].win, scores[1].lose],
          color: colors[1]
        }
      }, {
        y: scores[2].total,
        color: colors[2],
        drilldown: {
          name: scores[2].game,
          categories: ['Ganadas', 'Perdidas'],
          data: [scores[2].win, scores[2].lose],
          color: colors[2]
        }
      
      }];
    };

  // Build the data arrays
  var browserData = [];
  var versionsData = [];
  for (var i = 0; i < data.length; i++) {

    // add browser data
    browserData.push({
      name: categories[i],
      y: data[i].y,
      color: data[i].color
    });

    // add version data
    for (var j = 0; j < data[i].drilldown.data.length; j++) {
      var brightness = 0.2 - (j / data[i].drilldown.data.length) / 5 ;
      versionsData.push({
        name: data[i].drilldown.categories[j],
        y: data[i].drilldown.data[j],
        color: Highcharts.Color(data[i].color).brighten(brightness).get()
      });
    }
  }

  // Create the chart
  $('#graficoEstadisticas').highcharts({
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Estadística de las partidas jugadas.'
    },
    yAxis: {
      title: {
        text: 'Procentaje raro'
      }
    },
    plotOptions: {
      pie: {
        shadow: false,
        center: ['70%', '30%']
      }
    },
    tooltip: {
      valueSuffix: ' partidas'
    },
    series: [{
      name: ' ',
      data: browserData,
      size: '30%',
      dataLabels: {
        formatter: function() {
          return this.y >= 1 ? this.point.name : null;
        },
        color: 'white',
        distance: -30
      }
    }, {
      name: ' ',
      data: versionsData,
      size: '50%',
      innerSize: '30%',
      dataLabels: {
        formatter: function() {
          // display only if larger than 1
          return this.y >= 1 ? '<b>'+ this.point.name +' </b> ': null;
        }
      }
    }]
  })
}
};



//Events

Template.buscador.events({
  'keydown input#tags': function(e){
    if (e.which == 13) {
      var name=$("#tags").val();
      if (Meteor.users.findOne({username: name})){
        Session.set("profilfriend", Meteor.users.findOne({username: name})._id);
      }else{
        alert("El usuario buscado no existe.");
         $("#tags").val('')
      }
    };
  }

});

Template.friendprofil.events({

    'click .cancel' : function() {
        Session.set('profilfriend', null);
        $("#tags").val('')
    },

    'click #add-new-user': function() {
      var userToAddFriends = $("#tags").val();
      console.log(name);
      if (userToAddFriends !== Meteor.user().username) {

        console.log ("add to my list of friends");
        var myFriendsId = Friends.findOne({username: Meteor.user().username})._id;
        var newFriend = {name: userToAddFriends};

        Friends.update(myFriendsId, {
          $push: {
            friends: newFriend
          }
        });

        $("#amigoAddOk").dialog({
          resizable: false,
          height:180,
          modal: true,
          buttons: {
            Aceptar: function() {
                $( this ).dialog( "close" );
            }
          }
        });

        Session.set('profilfriend', null);

      } else {

        $("#noAddMe").dialog({
          resizable: false,
          height:180,
          modal: true,
          buttons: {
            Aceptar: function() {
                $( this ).dialog( "close" );
            }
          }
        });

        Session.set('profilfriend', null);
      }

      $("#tags").val('')
    }
});








