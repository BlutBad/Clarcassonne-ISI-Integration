Template.tienda.show = function() {
  return Session.get('current_stage') == 'Premium';
};

Template.tienda.total=function(){
	id=Meteor.user()._id;
	rankings = Ranking.find({user_id: id});
	totale=0;
	rankings.forEach(function(each,index) { 
		totale=totale+each.totalScore;
	});  
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
		return isicoins;
	}else{
		return 0;
	};
};

Template.tienda.bono=function(){	
	//saber si el usuario ya tiene el bonus y cuantos tiene
	bno=Bono.find({});
	bonus=[];
	bno.forEach(function(each,index){
		bn={};
		bn.nome=each.name;
		bn.id=each._id;
		if(User_Bono.findOne({user_id:Meteor.user()._id, bono_id:each._id})){
			bn.n_bono=User_Bono.findOne({user_id:Meteor.user()._id, bono_id:each._id}).n_bono;
		}else{
			bn.n_bono=0;
		}
		bonus.push(bn);
	});
	return bonus;
};

Template.tienda.icambiar=function(){
	//si el usuarion no tiene los suficientes puntos que no aparezca
	id=Meteor.user()._id;
	rankings = Ranking.find({user_id: id});
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
		id=Meteor.user()._id;
		//guardar el id del bono id del usuario y n_bono
		if (User_Bono.findOne({user_id:id, bono_id:this.id})){
			obj=User_Bono.findOne({user_id:id, bono_id: this.id});
			User_Bono.update(obj._id,{
				$set : {
					"n_bono": obj.n_bono+1,
				}
			});
		}else{
			User_Bono.insert({user_id:id, bono_id:this.id, n_bono: 1});
		};
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
