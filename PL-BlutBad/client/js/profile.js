Template.profil.showprofile = function() { 
	//name= Meteor.user().profile.name;
	//username= Meteor.user().username;
	miperf = Session.get('current_stage') == 'Mi perfil';
	if (miperf){		
		$('#gamecontainer').hide();
		Session.set('showGameIdn', false); 
	}
	return miperf;
};

Template.profil.registrado=function(){
	if (Meteor.user()) {
		//console.log(Meteor.user()._id);
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
		//console.log("guardar");
		//console.log(Meteor.user()._id);
		id=Meteor.user()._id;
     	datebirth=$("#datebirth").val();
      	genero=$("#genero").val();
      	Meteor.users.update({_id:Meteor.user()._id}, {
          $set : {"profile.datebirth" : datebirth}
      });
      	Meteor.users.update({_id:Meteor.user()._id}, {
          $set : {"profile.genero" : genero}
      });
	}
});



Template.profil.scores=function(){
	rankings = Ranking.find({user_id: Meteor.user()._id});
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
	return scores; 
};
/*Ranking.insert({
gameId : gameId,
userId : this.userId,
score : score
game_id" : "CoSMnvGLztupC8k5s
});*/


Template.stadisticGraphic.rendered =function(){
	rankings = Ranking.find({user_id: Meteor.user()._id});
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
				center: ['50%', '50%']
			}
		},
		tooltip: {
			valueSuffix: ' partidas'
		},
		series: [{
			name: ' ',
			data: browserData,
			size: '50%',
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
			size: '70%',
			innerSize: '50%',
			dataLabels: {
				formatter: function() {
					// display only if larger than 1
					return this.y >= 1 ? '<b>'+ this.point.name +':</b> '+ this.y + 'partidas' : null;
				}
			}
		}]
	})
}
};
