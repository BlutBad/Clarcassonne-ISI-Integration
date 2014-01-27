


Template.resumenPartida.show = function() {
	var party_id = Session.get("partidaEnCursoMultiJuegos");
	if (party_id){
		//Session.set("partidaEnCursoMultiJuegos", null);
		return Partidas.findOne(party_id).terminada;
	}else{
		return false;
	}
}


Template.resumenPartida.resumenMultiPartida = function (argument) {
	var party_id = Session.get("partidaEnCursoMultiJuegos");
	if (party_id){

		//Session.set("partidaEnCursoMultiJuegos", null);
		var resumen = Partidas.findOne(party_id).puntuacion;
		resumen = _.sortBy(resumen, function(num){ return -1*num.puntos; });
		resumen.forEach(function(each, index) {
			each.user = _extractProfile(each.user_id).username;
			each.No = index + 1;
			each.rango = getRangoUser(each.game_id, each.user_id); 	 	
		});

		return resumen;
	}else{
		return [];
	}
}

