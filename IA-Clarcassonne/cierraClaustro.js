// Funcion Cierra Claustro
// Comprueba si tenemos un monje y si esta rodeado un claustro.


Tablero.cierraClaustro = function(ficha,flag){
		var puntos = 0;
		var monje;

		var sumarpuntos = function(){
	           	var jugador= _.find(Tablero.listaJugadores,function(obj){return (obj.numero==monje.j)});				
							jugador.puntos+=puntos;    
              jugador.n_seguidores++;
              var pos = monje.f.seguidores.indexOf( monje );
              pos > -1 && monje.f.seguidores.splice( pos, 1 );              
		}
                        
			var closeClaustro = function(ficha){
		  	var haymonje = false;
				puntos++;
			  if (_.find(ficha.seguidores,function(obj){return (obj.t=="Monje")})){
	 		   	haymonje=true;
					monje = _.find(ficha.seguidores,function(obj){return (obj.t=="Monje", obj.n==8)});
	 		   }
				var rodeado=0;
					ficha2 = Tablero.buscarxcoor(ficha.x+1, ficha.y);
				if (ficha2.lleno){puntos++;rodeado++}
					ficha2 = Tablero.buscarxcoor(ficha.x-1, ficha.y);
				if (ficha2.lleno){puntos++;rodeado++}
					ficha2 = Tablero.buscarxcoor(ficha.x, ficha.y+1);
				if (ficha2.lleno){puntos++;rodeado++}
					ficha2 = Tablero.buscarxcoor(ficha.x, ficha.y-1);
				if (ficha2.lleno){puntos++;rodeado++}
					ficha2 = Tablero.buscarxcoor(ficha.x+1, ficha.y+1);
				if (ficha2.lleno){puntos++;rodeado++}
					ficha2 = Tablero.buscarxcoor(ficha.x+1, ficha.y-1);
				if (ficha2.lleno){puntos++;rodeado++}
					ficha2 = Tablero.buscarxcoor(ficha.x-1, ficha.y+1);
				if (ficha2.lleno){puntos++;rodeado++}		
					ficha2 = Tablero.buscarxcoor(ficha.x-1, ficha.y-1);
				if (ficha2.lleno){puntos++;rodeado++}

			if (flag == 1 || flag == 2){			
				if(rodeado==8 && haymonje == true){             
						sumarpuntos();
						return [true,haymonje];}
				else{
					sumarpuntos();
					return [false,haymonje];}
			}else{return [false,haymonje];}
		}
	
		if ((ficha.tipo == "Catedral") || (ficha.tipo == "Posada")){return closeClaustro(ficha)}
		ficha2 = Tablero.buscarxcoor(ficha.x+1, ficha.y);
		if ((ficha2.tipo == "Catedral") || (ficha2.tipo == "Posada") ){return closeClaustro(ficha2)}
		ficha2 = Tablero.buscarxcoor(ficha.x-1, ficha.y);
		if ((ficha2.tipo == "Catedral") || (ficha2.tipo == "Posada") ){return closeClaustro(ficha2)}
		ficha2 = Tablero.buscarxcoor(ficha.x, ficha.y+1);
		if ((ficha2.tipo == "Catedral") || (ficha2.tipo == "Posada") ){return closeClaustro(ficha2)}
		ficha2 = Tablero.buscarxcoor(ficha.x, ficha.y-1);
		if ((ficha2.tipo == "Catedral") || (ficha2.tipo == "Posada") ){return closeClaustro(ficha2)}
		ficha2 = Tablero.buscarxcoor(ficha.x+1, ficha.y+1);
		if ((ficha2.tipo == "Catedral") || (ficha2.tipo == "Posada") ){return closeClaustro(ficha2)}
		ficha2 = Tablero.buscarxcoor(ficha.x+1, ficha.y-1);
		if ((ficha2.tipo == "Catedral") || (ficha2.tipo == "Posada") ){return closeClaustro(ficha2)}
		ficha2 = Tablero.buscarxcoor(ficha.x-1, ficha.y+1);
		if ((ficha2.tipo == "Catedral") || (ficha2.tipo == "Posada") ){return closeClaustro(ficha2)}
	 	ficha2 = Tablero.buscarxcoor(ficha.x-1, ficha.y-1);
		if ((ficha2.tipo == "Catedral") || (ficha2.tipo == "Posada") ){return closeClaustro(ficha2)}
		else{return [false,false,0]}
  }
