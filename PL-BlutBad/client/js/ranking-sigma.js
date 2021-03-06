

var sigInst = null;
var isRunning = true;

Template.sigmaGraphic.show = function(){
	rank= Ranking.find().count();
	return Session.equals("gamerank", null) && rank;
};


Template.sigmaGraphic.rendered =function(){
	if (Session.equals("gamerank", null) && rank){
		sigInst = sigma.init(document.getElementById('sigmaGraphic')).drawingProperties({
															    defaultLabelColor: '#ccd',
															    defaultEdgeType: 'curve',
														  	}).mouseProperties({
															    maxRatio: 1,
															});


		var greyColor = '#666';
	  	sigInst.bind('overnodes',function(event){
		    var nodes = event.content;
		    var neighbors = {};
		    sigInst.iterEdges(function(e){
		      if(nodes.indexOf(e.source)<0 && nodes.indexOf(e.target)<0){
		        if(!e.attr['grey']){
		          e.attr['true_color'] = e.color;
		          e.color = greyColor;
		          e.attr['grey'] = 1;
		        }
		      }else{
		        e.color = e.attr['grey'] ? e.attr['true_color'] : e.color;
		        e.attr['grey'] = 0;
		 
		        neighbors[e.source] = 1;
		        neighbors[e.target] = 1;
		      }
		    }).iterNodes(function(n){
		      if(!neighbors[n.id]){
		        if(!n.attr['grey']){
		          n.attr['true_color'] = n.color;
		          n.color = greyColor;
		          n.attr['grey'] = 1;
		        }
		      }else{
		        n.color = n.attr['grey'] ? n.attr['true_color'] : n.color;
		        n.attr['grey'] = 0;
		      }
		    }).draw(2,2,2);
		  }).bind('outnodes',function(){
		    sigInst.iterEdges(function(e){
		      e.color = e.attr['grey'] ? e.attr['true_color'] : e.color;
		      e.attr['grey'] = 0;
		    }).iterNodes(function(n){
		      n.color = n.attr['grey'] ? n.attr['true_color'] : n.color;
		      n.attr['grey'] = 0;
		    }).draw(2,2,2);
		});

		drawSigma();
	}
};

function forceResetGraph (argument) {
	console.log("deps 1");
		if(sigInst){
			console.log("deps 2")
			sigInst.emptyGraph();
			sigInst = null;
		}
};

Deps.autorun(function(c) { 
	if(!Session.equals("gamerank", null)){
		forceResetGraph();
	}
});


var drawSigma = function  () {
	var cRanking = Ranking.find().fetch();
	cRanking.forEach(function(each) {
		each.userName = _extractProfile(each.user_id).username;
		each.gameName = Juegos.findOne({_id:each.game_id}).name;
	});

	var distinctGames = _.uniq(cRanking, false, function(d) {return d.game_id});

	var distinctUsers = _.uniq(cRanking, false, function(d) {return d.user_id});

	console.log("1");
	distinctUsers.forEach(function (each) {
		sigInst.addNode(each.userName,{
		      'x': Math.random(),//getRandomInt(-100,100),
		      'y': Math.random(),//getRandomInt(-20,20),
		      'size': 5,
		      'color': 'rgb('+Math.round(Math.random()*256)+','+
                      		Math.round(Math.random()*256)+','+
                      		Math.round(Math.random()*256)+')',
		      //'cluster': cluster['id']
		    });
	});

	console.log("2");
	var totalRanking = Ranking.find().count();
	distinctGames.forEach(function(each){
			var curntRanking = Ranking.find({game_id:each.game_id}).count();
			var nodeSize = (8 + (10*(curntRanking / totalRanking)))
		 	sigInst.addNode(each.gameName,{
		      'x': Math.random(),// pos.x,//Math.random()*2,
		      'y': Math.random(),//pos.y,//Math.random()*2,
		      'size': nodeSize,
  		      'color': 'rgb('+Math.round(Math.random()*256)+','+
          		Math.round(Math.random()*256)+','+
          		Math.round(Math.random()*256)+')',
		      //'cluster': cluster['id']
		    });
	});

	console.log("3");
	cRanking.forEach(function function_name (each, index) {
		sigInst.addEdge(index,each.gameName, each.userName);
	});

	console.log("4");
	sigInst.startForceAtlas2();
};


Template.sigmaGraphic.events = {	
	'click .sigmaGraphicClass': function () {
			if(isRunning){
				isRunning = false;
				sigInst.stopForceAtlas2();
				//document.getElementById('stop-layout').childNodes[0].nodeValue = 'Start Layout';
			}else{
				isRunning = true;
				sigInst.startForceAtlas2();
				//document.getElementById('stop-layout').childNodes[0].nodeValue = 'Stop Layout';
			}
	},
};




/*
{
	"game_id" : "7qhjNN59Pki3DEdBv",
	"user_id" : "8iztYb54vfKKwyapn",
	"maxScore" : 25,
	"totalScore" : 25,
	"rango_id" : "TFNJHuZwX4rvWrsCR",
	"timesPlayed" : 1,
	"winTimes" : 0,
	"loseTimes" : 1,
	"_id" : "cnmhwRdfj6cbAn7pt"
}
*/