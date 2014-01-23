Template.tienda.show = function() {
  return Session.get('current_stage') == 'Tienda';
};

Template.tienda.total=function(){
	rankings = Ranking.find({user_id: Meteor.user()._id});
	//console.log("here");
	totale=0;
	rankings.forEach(function(each,index) { 
		totale=totale+each.totalScore;
	});  
	console.log(totale);
	if (Shop.findOne({user_id:Meteor.user()._id})){
		obj=Shop.findOne({user_id:Meteor.user()._id});
		total=totale-obj.isicoins_shop*100;
	}else{
		Shop.insert({user_id: Meteor.user()._id, isicoins_shop:0, isi_coins: 0, vidas:0});
		total=0;
	};
	return total; 
	
};

Template.tienda.isicoins=function(){
	id=Meteor.user()._id;

	if (Shop.findOne({user_id:id})){
		isicoins=Shop.findOne({user_id:id}).isi_coins;
		console.log(isicoins);
		return isicoins;
	}else{
		console.log("no esta el usuario");
		return 0;
	};
};

Template.tienda.bono=function(){
	//saber si el usuario ya tiene el bonus
	return Bono.find({});
};

Template.tienda.icambiar=function(){
	return true;
}
Template.tienda.events = {
	'click input#ichange': function() {
		console.log("cambiar");
		id=Meteor.user()._id;
		obj=Shop.findOne({user_id: id});
		isicoins=obj.isi_coins;
		ictotal=obj.isicoins_shop;
		id_shop=obj._id;
		isi=isicoins+1;
		ic=ictotal+1;
		Shop.update(id_shop, {
		    $set : {
		    	"isicoins_shop": ic,
				"isi_coins" : isi,
			}
		});
	},
	'click input#bchange': function() {
		Session.set('current_stage', 'Tienda');
		console.log(this._id);
		Session.set('addbono', this._id);  
		//guardar el id del bono y el id del usuario
		
	}
}; 

Template.tienda.vidas=function(){
	id=Meteor.user()._id;

	if (Shop.findOne({user_id:id})){
		vidas=Shop.findOne({user_id:id}).vidas;
		return vidas;
	}else{
		console.log("no esta el usuario");
		return 0;
	};
};

Template.tienda.bcambiar=function(){
	return true;
}
