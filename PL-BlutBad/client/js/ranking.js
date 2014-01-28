Template.ranking.show = function() {
	return Session.get('current_stage') == 'Ranking';
};


var levelsPosition = {
        i:"label label-important",
        ii:"label label-warning",
        iii:"label label-success",
        o:"label",
};

function getClass(index){
    if(index == 0){
        clacc  = levelsPosition.i;
    }else if(index ==1){
        clacc  = levelsPosition.ii;
    }else if (index ==2){
        clacc  = levelsPosition.iii;
    }else{
        clacc  = levelsPosition.o;
    }
    return clacc;
}


Template.ranking.scores = function() { 
	idgame_session = Session.get("gamerank");
	if (idgame_session == null) {
		rankings = Ranking.find({},{sort:{maxScore: -1}});
	} else {
		rankings = Ranking.find({game_id: idgame_session}, {sort:{maxScore: -1}})
	}
	scores = [];
	rankings.forEach(function(each,index) { 
		sco = {};   
		sco.No = index+1;
		sco.game = Juegos.findOne({_id: each.game_id}).name; //el error estaba aqui he cambiado finOne por find
		sco.user = Meteor.users.findOne({_id: each.user_id}).username; //el error estaba aqui he cambiado findOne por find
		sco.maxScore = each.maxScore;
    	sco.totalScore = each.totalScore;
    	sco.rango = Rangos.findOne({_id: each.rango_id}).rango;
    	sco.clacc = getClass(index);
    	scores.push(sco);
    });  
    return scores;  
}; 


Template.ranking.events = {
	'click .sortBy': function () {
		Session.set("gamerank", this._id); 
	},
	'click #mostrar_ranking': function() {
		Session.set("gamerank", null);
	},
	'click .fakeRanking': function() {	


		games = Juegos.find({});		
		games.forEach(function (game) {
			//console.log(game.name);
			fakeUsers = Meteor.users.find({});
			//console.log(games.count() + " "+ fakeUsers.count() );
			fakeUsers.forEach(function (user) {
				if (Math.random() < 0.15) {
					//console.log(user.username);
					maxScore = Math.floor((Math.random()*100)+1);
					opts = {user_id: user._id, game_id: game._id, score:maxScore, torneo_id:null}
					Meteor.call("matchFinish", opts);
				};
			});
		});
	}
}; 



Template.ranking.juegos=function(){
	return Juegos.find({}); 
};


Template.ranking.gameName=function(){
    idgame_session = Session.get("gamerank");
    return Juegos.findOne({_id: idgame_session}).name; 
};

Template.ranking.anyGamerName=function(){
    idgame_session = Session.get("gamerank");
    var ran = Ranking.find({game_id: idgame_session}).count();
    return ran > 0;
};




//Devuelve a los 3 mejores jugadores en el ranking del juego en cuestion
Template.ranking.bestPlayers3=function(idgame_session){

    var rank3 = Ranking.find({game_id: idgame_session}, {sort:{maxScore: -1}}).fetch();
    rank3 =  rank3.slice(0,3);
    

    scores = [];
    rank3.forEach(function(each,index) { 
        sco = {};   
        sco.No = index+1;
        sco.user = Meteor.users.findOne({_id: each.user_id}).username; //el error estaba aqui he cambiado findOne por find
        sco.maxScore = each.maxScore;
        sco.totalScore = each.totalScore;
        sco.rango = Rangos.findOne({_id: each.rango_id}).rango;
        sco.clacc = getClass(index);
        scores.push(sco);
    });  
    return scores;  
    
    
    
    
};


//Comprueba si hay algun jugador que ha jugado al juego, para saber si mostrarlo(el juego) en el top3 o no.
Template.ranking.anyGamer = function(game_id){
    var gamers = Ranking.find({game_id: game_id}).fetch();
     if (gamers.length > 0){
         return true;
     }else{
         return false;
     }
};

Template.ranking.show3BestRanking=function(){
    return Session.equals("gamerank", null);
};

