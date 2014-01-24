Template.tienda.show = function() {
  return Session.get('current_stage') == 'Premium';
};

Template.tienda.total=function(){
	id=Meteor.user()._id;
	rankings = Ranking.find({user_id: id});
	//console.log("here");
	totale=0;
	rankings.forEach(function(each,index) { 
		totale=totale+each.totalScore;
	});  
	console.log(totale);
	if (Shop.findOne({user_id:id})){
		obj=Shop.findOne({user_id:id});
		total=totale-obj.isicoins_shop*100;
	}else{
		Shop.insert({user_id: id, isicoins_shop:0, isi_coins: 0, vidas:0});
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
	//si el usuarion no tiene los suficientes puntos que no aparezca
	id=Meteor.user()._id;
	rankings = Ranking.find({user_id: id});
	//console.log("here");
	totale=0;
	rankings.forEach(function(each,index) { 
		totale=totale+each.totalScore;
	});  
	if (Shop.findOne({user_id:id})){
		obj=Shop.findOne({user_id:id});
		total=totale-obj.isicoins_shop*100;
	}else{
		total=0;
	};
	if (total>=100){
		return true;
	}else{
		return false;
	}
};

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
	'click input.bchange': function() {
		Session.set('current_stage', 'Tienda');
		console.log(this._id);
		Session.set('addbono', this._id);  
		id=Meteor.user()._id;
		//guardar el id del bono id del usuario y n_bono
		if (User_Bono.findOne({user_id:id, bono_id:this._id})){
			console.log("esta aumento uno en n_bono");
			obj=User_Bono.findOne({user_id:id, bono_id: this._id});
			User_Bono.update(obj._id,{
				$set : {
					"n_bono": obj.n_bono+1,
				}
			});
		}else{
			console.log("no esta lo añado a la coleccion");
			User_Bono.insert({user_id:id, bono_id:this._id, n_bono: 1});
		};
		console.log("dfdfd");
		//quitar las isicoins correspondientes
		obj=Shop.findOne({user_id: id});
		id_shop=obj._id;
		isi=obj.isi_coins-10;
		Shop.update(id_shop, {
			$set:{
				"isi_coins": isi,
			}
		})
		
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
	//si el usuario no tiene suficientes isicoins no se mostrara
	id=Meteor.user()._id;
	if (Shop.findOne({user_id:id}).isi_coins>=10){
		return true;
	}else{
		return false;
	}
}
