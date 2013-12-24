Template.profil.showprofile = function() { 
	//name= Meteor.user().profile.name;
	//username= Meteor.user().username;
	if (Meteor.user()){
	}
	return Session.get('current_stage') == 'Mi perfil';
};

Template.profil.registrado=function(){
	if (Meteor.user()) {
		return true;

	}else{
		return false;
	}

};

Template.profil.events({
	'click #datebirth': function(){
		$(function() {
			$("#datebirth").datepicker({
				showOn: "button",
				buttonImage: "images/calendar.gif",
				buttonImageOnly: true,
				dateFormat: 'dd/mm/yy', 
				changeMonth: true, 
				changeYear: true, 
				yearRange: '-100:+0'
			});
		});
	},

	'click #save': function(){
		console.log("guardar");
		console.log(Meteor.user()._id);
		id=Meteor.user()._id;
		datebirth=$("#datebirth").val();
		genero=$("#genero").val();
		console.log(email);
		Meteor.users.update(id, {
		    $set : {
				"profile.datebirth" : datebirth,
				"profile.genero" : genero,
		    }
		});
	}
});



Template.profil.scores=function(){
	rankings = Ranking.find({user_id: Meteor.user()._id});
	console.log("here");
	scores = [];
	rankings.forEach(function(each,index) { 
		console.log("here this is");
		sco = {};   
		sco.No = index+1;
		sco.win=each.winTimes;
		sco.lose=each.loseTimes;
		sco.total=each.timesPlayed;
		sco.totalScore = each.totalScore;
		sco.game = Juegos.findOne({_id: each.game_id}).name;

		scores.push(sco);
	});  
	return scores; 
};
/*Ranking.insert({
gameId : gameId,
userId : this.userId,
score : score
game_id" : "CoSMnvGLztupC8k5s
});*/


Template.stadisticGraphic.rendered =function(){

    var colors = Highcharts.getOptions().colors,
        categories = ['Clarcassonne', 'Alien Invation', 'Froot Wars'],
        name = 'Browser brands',
        data = [{
                y: 24,
                color: colors[0],
                drilldown: {
                    name: 'Clarcassonne',
                    categories: ['Ganadas', 'Perdidas'],
                    data: [20, 4],
                    color: colors[0]
                }
            }, {
                y: 24,
                color: colors[1],
                drilldown: {
                    name: 'Alien Invation',
                    categories: ['Ganadas', 'Perdidas'],
                    data: [20, 4],
                    color: colors[1]
                }
            }, {
                y: 24,
                color: colors[2],
                drilldown: {
                    name: 'Froot Wars',
                    categories: ['Ganadas', 'Perdidas'],
                    data: [20, 4],
                    color: colors[2]
                }
            
            }];


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
            text: 'Estadisticas de tiempo perdido en los juegos'
        },
        yAxis: {
            title: {
                text: 'Procentaje raro'
            }
        },
        plotOptions: {
            pie: {
                shadow: false,
                center: ['50%', '50%']
            }
        },
        tooltip: {
            valueSuffix: '%'
        },
        series: [{
            name: 'Browsers',
            data: browserData,
            size: '60%',
            dataLabels: {
                formatter: function() {
                    return this.y > 5 ? this.point.name : null;
                },
                color: 'white',
                distance: -30
            }
        }, {
            name: 'Versions',
            data: versionsData,
            size: '80%',
            innerSize: '60%',
            dataLabels: {
                formatter: function() {
                    // display only if larger than 1
                    return this.y > 1 ? '<b>'+ this.point.name +':</b> '+ this.y +'%'  : null;
                }
            }
        }]
    });
};
