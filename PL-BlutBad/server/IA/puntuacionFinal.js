puntosFinal = function(){

	  for(var i=0;i<(140*140);i++){      
				ficha = Tablero.huecos[i];
				if (ficha.seguidores.length != 0){
						
						if (_.find(ficha.seguidores,function(obj){return (obj.t=="Granjero")})){
								puntosGranja(ficha,2);
						}

						if (_.find(ficha.seguidores,function(obj){return (obj.t=="Caballero")})){
								Tablero.cierraCastillo(ficha,2);
						}

						if (_.find(ficha.seguidores,function(obj){return (obj.t=="Ladron")})){
								Tablero.cierraCamino(ficha,2);
						}

						if (_.find(ficha.seguidores,function(obj){return (obj.t=="Monje")})){
								Tablero.cierraClaustro(ficha,2);
						}
				}

	  }

};
