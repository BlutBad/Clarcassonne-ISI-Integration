
// FUNCION CIERRA CAMINO


Tablero.cierraCamino = function(ficha,flag){

			var cierracamino = ['Ccruce', 'Posada', 'Ciudad3lc', 'Ciudad3lcE', 'Ciudad1lcruce', 'Tcruce'];
			var jugadores=[];
			var fichaorig = ficha;
			var ladron;
			var puntos=0;
			
			var sumarPuntos= function(){
			    yaSumados=[];
			    
          _.each(jugadores, function(seg){
              var jugador= _.find(Tablero.listaJugadores,function(obj){return (obj.numero==seg.j)});
              if (!_.find(yaSumados,function(obj){return (obj==jugador)})){
                  jugador.puntos+=puntos;
                  yaSumados.push(jugador);
              }     
              jugador.n_seguidores++;
              var pos = seg.f.seguidores.indexOf( seg );
              pos > -1 && seg.f.seguidores.splice( pos, 1 );
              
              
          });
                
			    
			}
			
			
			var recursiva = function(ficha,prohibido){
             
              puntos++; 
              
              ladron =_.find(ficha.seguidores,function(obj){return (obj.t=="Ladron")});
              if (ladron){jugadores.push(ladron)}
              
							if (ficha.arriba=="Rue" && prohibido!="arriba"){		
									ficha2=Tablero.buscarxcoor(ficha.x,ficha.y-1);
									if (ficha2.x==fichaorig.x && ficha2.y==fichaorig.y){cerrado++; return ficha}
									else if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1){ 
									  puntos++;
									  ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==4)});
									  if (ladron){jugadores.push(ladron)}
									  return true;
									}
									else if(!ficha2.lleno){return false}
									else {return recursiva(ficha2,"abajo")}
							}
							else if (ficha.abajo=="Rue" && prohibido!="abajo"){
									ficha2=Tablero.buscarxcoor(ficha.x,ficha.y+1);
									if (ficha2.x==fichaorig.x && ficha2.y==fichaorig.y){cerrado++; return ficha}
									else if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1){
									  puntos++;
									  ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==0)});
									  if (ladron){jugadores.push(ladron)}
									  return true;
									}
									else if(!ficha2.lleno){return false}
									else {return recursiva(ficha2,"arriba")}
							}
							else if (ficha.izda=="Rue" && prohibido!="izquierda"){
									ficha2=Tablero.buscarxcoor(ficha.x-1,ficha.y);
									if (ficha2.x==fichaorig.x && ficha2.y==fichaorig.y){cerrado++; return ficha}
									else if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1){
									  puntos++;
									  ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==2)});
									  if (ladron){jugadores.push(ladron)}
									  return true;
									}
									else if(!ficha2.lleno){return false}
									else {return recursiva(ficha2,"derecha")}
							}
							else if (ficha.derecha=="Rue" && prohibido!="derecha"){
									ficha2=Tablero.buscarxcoor(ficha.x+1,ficha.y);
									if (ficha2.x==fichaorig.x && ficha2.y==fichaorig.y){cerrado++; return ficha}
									else if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1){
									  puntos++;
									  ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==6)});
									  if (ladron){jugadores.push(ladron)}
									  return true;
									}
									else if(!ficha2.lleno){return false}
									else {return recursiva(ficha2,"izquierda")}
							}
					
			}
			
				
			if (cierracamino.indexOf(ficha.tipo) == -1){ //si la ficha no es cierracamino
          //tiene que cerrar camino por dos caminos distintos
          var cerrado=0;   //cerrado tendrá que ser 2
          puntos++;
              
              
          ladron =_.find(ficha.seguidores,function(obj){return (obj.t=="Ladron")});
          if (ladron){jugadores.push(ladron)}

	            
	     	  if (ficha.arriba=="Rue" && cerrado<2){		// si hay camino por arriba 
							ficha2=Tablero.buscarxcoor(ficha.x,ficha.y-1);
							//miramos la ficha siguiente, si está llena y cierra camino cerrado +1
							if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1){
							    puntos++;
							    cerrado++;
								  ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==4)});
								  if (ladron){jugadores.push(ladron)}
							}
							// si no, recorremos el camino con recursiva

							else if(ficha2.lleno && recursiva(ficha2,"abajo")){cerrado++};							  
									
					  }
					  if (ficha.abajo=="Rue" && cerrado<2){
									ficha2=Tablero.buscarxcoor(ficha.x,ficha.y+1);
									if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1){
									  puntos++;
									  cerrado++;
									  ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==0)});
								    if (ladron){jugadores.push(ladron)}
									}
									else if(ficha2.lleno && recursiva(ficha2,"arriba")){cerrado++};
					  }
					  if (ficha.izda=="Rue" && cerrado<2){
      				  ficha2=Tablero.buscarxcoor(ficha.x-1,ficha.y);
									if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1){
									  puntos++;
									  cerrado++;
									  ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==2)});
								  if (ladron){jugadores.push(ladron)}
									}
									else if(ficha2.lleno && recursiva(ficha2,"derecha")){cerrado++};			
					  }
					  if (ficha.derecha=="Rue" && cerrado<2){
									ficha2=Tablero.buscarxcoor(ficha.x+1,ficha.y);
									if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1){
									  puntos++;
									  cerrado++;
									  ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==6)});
								    if (ladron){jugadores.push(ladron)}
									}
									else if(ficha2.lleno && recursiva(ficha2,"izquierda")){cerrado++};
					  }
					  if (jugadores.length>0){ladron = true}else{ladron=false}
					  
            if ((flag==1 && cerrado ==2) || flag==2){
                sumarPuntos();
                
            }
            
					  if (cerrado == 2){return [true,ladron]}
					  
					  else {return [false,ladron]}
			}
			else{

				  if (ficha.tipo=="Ccruce" || ficha.tipo=="Tcruce" || ficha.tipo == "Ciudad1lcruce"){
				  puntos++;
				    
				      Cerrado=undefined;
				  
				      if (ficha.arriba=="Rue"){	
				          
				          ladron =_.find(ficha.seguidores,function(obj){return (obj.t=="Ladron", obj.n==0)});
                  if (ladron){jugadores.push(ladron)}
				          
				          
									ficha2=Tablero.buscarxcoor(ficha.x,ficha.y-1);
									if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1 && flag==1){
									    puntos++;
									    console.log("cierra camino (cruce) por arriba"); 
									    
									    ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==4)});
                      if (ladron){jugadores.push(ladron)}
									    
                      sumarPuntos()
                      puntos=1;
                      jugadores=[];									    
									}

									else if(ficha2.lleno && ficha2!=Cerrado  && flag==1){
									    Cerrado=recursiva(ficha2,"abajo");
									    if (Cerrado){
									      console.log("cierra camino (cruce) por arriba");
									      sumarPuntos();
                      }
                      puntos=1;
                      jugadores=[];	

									}
									else if(ficha2.lleno && flag==2){ 
									  recursiva(ficha2,"abajo");
									  sumarPuntos();
                    puntos=1;	
                    jugadores=[];						  
									} 	
					  }
					  if (ficha.abajo=="Rue"){
					  
					        ladron =_.find(ficha.seguidores,function(obj){return (obj.t=="Ladron", obj.n==4)});
                  if (ladron){jugadores.push(ladron)}
					  
									ficha2=Tablero.buscarxcoor(ficha.x,ficha.y+1);
									if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1 && flag==1){
									    puntos++;
									    console.log("cierra camino (cruce) por abajo");
									    ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==0)});
                      if (ladron){jugadores.push(ladron)}
									    sumarPuntos();
                      puntos=1;
                      jugadores=[];
									}
									else if(ficha2.lleno && ficha2!=Cerrado  && flag==1){
									    Cerrado=recursiva(ficha2,"arriba");
									    if (Cerrado){
									      console.log("cierra camino (cruce) por abajo");
									      sumarPuntos();
                      }
                      puntos=1;
                      jugadores=[];

									}
									else if(ficha2.lleno && flag==2){
									  recursiva(ficha2,"arriba");
									  sumarPuntos();
                    puntos=1;	
                    jugadores=[];						  
									}
					  }
					  if (ficha.izda=="Rue"){
					    
					        ladron =_.find(ficha.seguidores,function(obj){return (obj.t=="Ladron", obj.n==6)});
                  if (ladron){jugadores.push(ladron)}    
					      
      						ficha2=Tablero.buscarxcoor(ficha.x-1,ficha.y);
									if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1 && flag==1){
									    puntos++;
									    console.log("cierra camino (cruce) por la izda");
									    
									    ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==2)});
                      if (ladron){jugadores.push(ladron)}
									    
									    sumarPuntos();
                      puntos=1;
                      jugadores=[];
									}
									else if(ficha2.lleno && ficha2!=Cerrado  && flag==1){
									    Cerrado=recursiva(ficha2,"derecha");
									    if (Cerrado){
									      console.log("cierra camino (cruce) por la izda");
									      sumarPuntos();
                      }
                      puntos=1;
                      jugadores=[];
									}
									else if(ficha2.lleno && flag==2){
									  recursiva(ficha2,"derecha");
									  sumarPuntos();
                    puntos=1;
                    jugadores=[];							  
									}
					  }
					  if (ficha.derecha=="Rue"){
					  
					        ladron =_.find(ficha.seguidores,function(obj){return (obj.t=="Ladron", obj.n==2)});
                  if (ladron){jugadores.push(ladron)}
					  
									ficha2=Tablero.buscarxcoor(ficha.x+1,ficha.y);
									if (ficha2.lleno && cierracamino.indexOf(ficha2.tipo)!=-1 && flag==1){
									    puntos++;
									    console.log("cierra camino (cruce) por la dcha");
									    
									    ladron =_.find(ficha2.seguidores,function(obj){return (obj.t=="Ladron", obj.n==6)});
                       if (ladron){jugadores.push(ladron)}
									    
									    sumarPuntos();
                      puntos=1;
                      jugadores=[];
									}
									else if(ficha2.lleno && ficha2!=Cerrado  && flag==1){
									    Cerrado=recursiva(ficha2,"izquierda");
									    if(Cerrado){
									      console.log("cierra camino (cruce) por la dcha");
									      sumarPuntos();
                      }
                      puntos=1;
                      jugadores=[];
									}
									else if(ficha2.lleno && flag==2){
									  recursiva(ficha2,"izquierda");
									  sumarPuntos();
                    puntos=1;
                    jugadores=[];						  
									}
					  }
				  }
				  else{				                      
				    var devuelve= recursiva(ficha,"");
				    if (jugadores.length>0){ladron = true}else{ladron=false}
            if ((flag==1 && devuelve) || flag==2){
                sumarPuntos();
            }
				    return [devuelve,ladron]	  
				   }
			}

	}
