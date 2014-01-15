//Granja

puntosGranja = function(ficha,flag,posgranjero){
		var granjeros= [];
		var fichas = [];
		var fichasciudad = [];
		var granjero;
		var ciudad = 0;

    var encontrar = function(lista, obj){
        for(i = 0; i < lista.length; i++){
            if (lista[i] == obj)
                return i;
        }
    }

    // Funcion para sumar los puntos a los jugadores
    var sumarPuntos = function(ObJugador, puntos){
        j1 = 0;
        j2 = 0;
        j3 = 0;
        j4 = 0;
        j5 = 0;
        for(i = 0; i < _.size(ObJugador); i++){
            a =ObJugador[i].j;
            if (a == 1)
                j1++;
            else if(a == 2)
                j2++;
            else if(a == 3)
                j3++;
            else if(a == 4)
                j4++;
            else if(a == 5)
                j5++;
        }

        var lista = [j1, j2, j3, j4, j5];
        var grande = -1;
        for(var j=0;j<5;j++){
            // Devuelve la posicion del que tiene mayor numero de granjeros
            var mayor = function(){
                var mayorque = lista[0];
                for(var i = 1; i < lista.length; i++){
                    if(lista[i] > mayorque)
                        mayorque = lista[i];
                }
                // la posicion de la lista del que tiene mayor nuemro de granjeros
                devolver = encontrar(lista, mayorque);
                // Cuando no hay caballero en ninguno
                if (mayorque == 0){devolver = undefined}
                // la primera vez que entra y si hay granjero
                else if (grande == -1){
                    grande = mayorque;
                }
                // Si hay otro que tenga el mismo numero de granjeros
                else if (grande == mayorque){grande = grande}
                // para que deje de iterar le asigno undefined
                else{devolver = undefined}
                return devolver;
                
            }

            num = mayor();
            if (num == undefined){break}
            else{
                // Sumar puntos a ese jugador

                Tablero.listaJugadores[num].puntos += puntos;
                Tablero.listaJugadores[num].n_segidores++;
                lista[num] = 0;
                console.log("jugador: ", Tablero.listaJugadores[num].nombre, Tablero.listaJugadores[num].puntos);
            }
        }
//Borrar granjeros de la zona.
				_.each(granjeros, function(seg){
             	  var pos = seg.f.seguidores.indexOf( seg );
	 	        	  pos > -1 && seg.f.seguidores.splice( pos, 1 );           
	      });
///
    }

		var granja = function(ficha,prohibido){
			fichas.push({x:ficha.x, y:ficha.y});

//CAMPO
			if(ficha.arriba== "Campo" && prohibido != "arriba"){
				ficha2=Tablero.buscarxcoor(ficha.x,ficha.y-1);
				granjero =_.find(ficha2.seguidores,function(obj){return (obj.t=="Granjero")});
				if(_.find(fichas ,function(obj){return (obj.x == ficha2.x && obj.y == ficha2.y)}) == undefined){		
					if (ficha2.lleno){
						if (ficha2.derecha == "Rue" && ficha2.izda == "Rue"){		  
							if (granjero != undefined){if (granjero.n == 3 || granjero.n == 4 || granjero.n == 5){granjeros.push(granjero)}}
						}else if (ficha2.arriba == "Rue" && ficha2.derecha == "Rue"){
							if (granjero != undefined){if (granjero.n != 0 && granjero.n != 1 && granjero.n != 2){granjeros.push(granjero)}}	
							granja(ficha2);					
						}else if (ficha2.arriba == "Rue" && ficha2.izda == "Rue"){	   
							if (granjero != undefined){if (granjero.n != 0 && granjero.n != 6 && granjero.n != 7){granjeros.push(granjero)}}	
							granja(ficha2);					
						}else{
							if (granjero != undefined){if (granjero){granjeros.push(granjero)}}
							granja(ficha2);
						}
					}
				}
			}

			if(ficha.izda== "Campo" && prohibido != "izda"){
				ficha2=Tablero.buscarxcoor(ficha.x-1,ficha.y);
				granjero =_.find(ficha2.seguidores,function(obj){return (obj.t=="Granjero")});
				if(_.find(fichas ,function(obj){return (obj.x == ficha2.x && obj.y == ficha2.y)}) == undefined){			
					if (ficha2.lleno ){
						if (ficha2.abajo == "Rue" && ficha2.arriba == "Rue"){
							if (granjero != undefined){if (granjero.n == 1 || granjero.n == 2 || granjero.n == 3){granjeros.push(granjero)}}
						}else if (ficha2.abajo == "Rue" && ficha2.izda == "Rue"){
							if (granjero != undefined){if (granjero.n != 6 && granjero.n == 5 && granjero.n == 4){granjeros.push(granjero)}}	
							granja(ficha2);					
						}else if (ficha2.arriba == "Rue" && ficha2.izda == "Rue"){
							if (granjero != undefined){if (granjero.n != 6 && granjero.n == 7 && granjero.n == 0){granjeros.push(granjero)}}	
							granja(ficha2);					
						}else{
							if (granjero != undefined){if (granjero){granjeros.push(granjero)}}
							granja(ficha2);
						}
					}
				}
			}

			if(ficha.derecha== "Campo" && prohibido != "derecha"){
				ficha2=Tablero.buscarxcoor(ficha.x+1,ficha.y);
				granjero =_.find(ficha2.seguidores,function(obj){return (obj.t=="Granjero")});

				if(_.find(fichas ,function(obj){return (obj.x == ficha2.x && obj.y == ficha2.y)}) == undefined){
					if (ficha2.lleno ){
						if (ficha2.abajo == "Rue" && ficha2.arriba == "Rue"){
							if (granjero != undefined){if (granjero.n == 5 || granjero.n == 6 || granjero.n == 7){granjeros.push(granjero)}}
						}else if (ficha2.abajo == "Rue" && ficha2.derecha == "Rue"){
							if (granjero != undefined){if (granjero.n != 2 && granjero.n != 3 && granjero.n != 4){granjeros.push(granjero)}}
							granja(ficha2);					
						}else if (ficha2.arriba == "Rue" && ficha2.derecha == "Rue"){
							if (granjero != undefined){if (granjero.n != 2 && granjero.n != 3 && granjero.n != 4){granjeros.push(granjero)}}	
							granja(ficha2);					
						}else{
							if (granjero != undefined){if (granjero){granjeros.push(granjero)}}
							granja(ficha2);
						}
					}
				}
			}

			if(ficha.abajo== "Campo" && prohibido != "abajo"){
				ficha2=Tablero.buscarxcoor(ficha.x,ficha.y+1);
				granjero =_.find(ficha2.seguidores,function(obj){return (obj.t=="Granjero")});

				if(_.find(fichas ,function(obj){return (obj.x == ficha2.x && obj.y == ficha2.y)}) == undefined){
					if (ficha2.lleno){
							if (ficha2.derecha == "Rue" && ficha2.izda == "Rue"){
								if (granjero != undefined){if (granjero.n == 7 || granjero.n == 0 || granjero.n == 1){granjeros.push(granjero)}}
							}else if (ficha2.abajo == "Rue" && ficha2.izda == "Rue"){
								if (granjero != undefined){if (granjero.n != 4 && granjero.n != 5 && granjero.n != 6){granjeros.push(granjero)}}	
								granja(ficha2);					
							}else if (ficha2.abajo == "Rue" && ficha2.derecha == "Rue"){
								if (granjero != undefined){if (granjero.n != 2 && granjero.n != 3 && granjero.n != 4){granjeros.push(granjero)}}	
								granja(ficha2);					
							}else{
								if (granjero != undefined){if (granjero){granjeros.push(granjero)}}
								granja(ficha2);
							}
						}
				}
			}


//TIERRA
			if (ficha.arriba == "Tierra" && prohibido != "arriba"){
				if(_.find(fichasciudad ,function(obj){if (obj != undefined){
								return (obj.x == ficha.x && obj.y == ficha.y)}}) == undefined){
					fichastierra = cierraCastillo(ficha);			
					fichasciudad = fichasciudad.concat(fichastierra[2]);
					if (fichastierra[0]== true){ciudad++}
				}	
			}

			if (ficha.izda == "Tierra" && prohibido != "izda"){
				if(_.find(fichasciudad ,function(obj){if (obj != undefined){
								return (obj.x == ficha.x && obj.y == ficha.y)}}) == undefined){
					fichastierra = cierraCastillo(ficha);		
					fichasciudad = fichasciudad.concat(fichastierra[2]);
					if (fichastierra[0]== true){ciudad++}
				}
			}

			if (ficha.derecha == "Tierra" && prohibido != "derecha"){
				if(_.find(fichasciudad ,function(obj){if (obj != undefined){
                return (obj.x == ficha.x && obj.y == ficha.y)}}) == undefined){
					fichastierra = cierraCastillo(ficha);			
					fichasciudad = fichasciudad.concat(fichastierra[2]);
					if (fichastierra[0]== true){ciudad++}
				}
			}

			if(ficha.abajo == "Tierra" && prohibido != "abajo"){
				if(_.find(fichasciudad ,function(obj){if (obj != undefined){
                return (obj.x == ficha.x && obj.y == ficha.y)}}) == undefined){
					fichastierra = cierraCastillo(ficha);	
					fichasciudad = fichasciudad.concat(fichastierra[2]);
					if (fichastierra[0]== true){ciudad++}
				}
			}	



//CARRETERA
			if (ficha.arriba == "Rue"){
				ficha2=Tablero.buscarxcoor(ficha.x,ficha.y-1);
				granjero =_.find(ficha2.seguidores,function(obj){return (obj.t=="Granjero")});

				if (ficha2.lleno && _.find(fichas ,function(obj){return (obj.x == ficha2.x && obj.y == ficha2.y)}) == undefined){
					if (ficha2.arriba == "Rue" && ficha2.abajo == "Rue"){
						if (ficha.izda == "Rue"){prohibido= "izda"}
						if (ficha.derecha == "Rue"){prohibido= "derecha";}
						if (prohibido== "izda"){
							if (granjero != undefined){
									if (granjero.n == 1 || granjero.n == 2 || granjero.n == 3){granjeros.push(granjero);}
							}
									granja(ficha2,prohibido);

						}else if (prohibido== "derecha"){
							if (granjero != undefined){
									if (granjero.n == 5 || granjero.n == 6 || granjero.n == 7){granjeros.push(granjero);}
							}
									granja(ficha2,prohibido);	

						}else if (granjero != undefined){
								if(!_.find(granjeros,function(obj){return (obj.f==granjero.f)})){granjeros.push(granjero);}
								granja(ficha2,prohibido);
								
						}
					}
				}
			}

			if (ficha.izda == "Rue"){
				ficha2=Tablero.buscarxcoor(ficha.x-1,ficha.y);
				granjero =_.find(ficha2.seguidores,function(obj){return (obj.t=="Granjero")});

				if (ficha2.lleno && _.find(fichas ,function(obj){return (obj.x == ficha2.x && obj.y == ficha2.y)}) == undefined){
					if (ficha2.arriba == "Rue" && ficha2.abajo == "Rue"){
							if (ficha.arriba == "Rue"){prohibido= "arriba"}
							if (ficha.abajo == "Rue"){prohibido= "abajo"}
							if (prohibido== "arriba"){
								if (granjero != undefined){
										if(granjero.n == 3 || granjero.n == 4 || granjero.n == 5){granjeros.push(granjero);}
								}
										granja(ficha2,prohibido);
							}else if (prohibido== "abajo"){
								if (granjero != undefined){
								}
									if (granjero.n == 7 || granjero.n == 0 || granjero.n == 1){granjeros.push(granjero);}
								granja(ficha2,prohibido);
							}else if (granjero != undefined){
									if(!_.find(granjeros,function(obj){return (obj.f==granjero.f)})){granjeros.push(granjero);}
										granja(ficha2,prohibido);
									
							}
					}						
				}
			}

			if (ficha.derecha == "Rue"){
				ficha2=Tablero.buscarxcoor(ficha.x+1,ficha.y);
				granjero =_.find(ficha2.seguidores,function(obj){return (obj.t=="Granjero")});

				if (ficha2.lleno && _.find(fichas ,function(obj){return (obj.x == ficha2.x && obj.y == ficha2.y)}) == undefined){
					if (ficha2.arriba == "Rue" && ficha2.abajo == "Rue"){
							if (ficha.arriba == "Rue"){prohibido= "arriba"}
							if (ficha.abajo == "Rue"){prohibido= "abajo"}							
							if (prohibido== "arriba"){
								if (granjero != undefined){
										if (granjero.n == 3 || granjero.n == 4 || granjero.n == 5){granjeros.push(granjero);}
								}	
								granja(ficha2,prohibido);
	
							}else if (prohibido== "abajo"){
								if (granjero != undefined){
									if (granjero.n == 7 || granjero.n == 0 || granjero.n == 1){granjeros.push(granjero);}
								}
								granja(ficha2,prohibido);
							}else if (granjero != undefined){
									if(!_.find(granjeros,function(obj){return (obj.f==granjero.f)})){granjeros.push(granjero);}
										granja(ficha2,prohibido);
									
							}					
					}
				}
			}

			if(ficha.abajo == "Rue"){
				ficha2=Tablero.buscarxcoor(ficha.x,ficha.y+1);
				granjero =_.find(ficha2.seguidores,function(obj){return (obj.t=="Granjero")});

				if (ficha2.lleno && _.find(fichas ,function(obj){return (obj.x == ficha2.x && obj.y == ficha2.y)}) == undefined){
					if (ficha2.arriba == "Rue" && ficha2.abajo == "Rue"){
						if (ficha.izda == "Rue"){prohibido= "izda"}
						if (ficha.derecha == "Rue"){prohibido= "derecha"}
						if (prohibido== "izda"){
							if (granjero != undefined){
									if (granjero.n == 1 || granjero.n == 2 || granjero.n == 3){granjeros.push(granjero);}
							}
							granja(ficha2,prohibido);						
						}else if (prohibido== "derecha"){
							if (granjero != undefined){
									if (granjero.n == 5 || granjero.n == 6 || granjero.n == 7){granjeros.push(granjero);}
							}
							granja(ficha2,prohibido);
						}else if (granjero != undefined){
								if(!_.find(granjeros,function(obj){return (obj.f==granjero.f)})){granjeros.push(granjero);}
									granja(ficha2,prohibido);
								
						}
					}
				}		
			}		
		}

		granjero = _.find(ficha.seguidores,function(obj){return (obj.t=="Granjero")});
		if (granjero != undefined){	granjeros.push(granjero);posgranjero = granjero.n}

			if (ficha.izda == "Rue" && ficha.derecha == "Rue"){		
				if (posgranjero == 3 || posgranjero == 4 || posgranjero == 5){ granja(ficha,"arriba"); 			// prohibido arriba
				}else if(posgranjero == 7 || posgranjero == 0 || posgranjero == 1){granja(ficha,"abajo");} 	// prohibido abajo

			}else if (ficha.arriba == "Rue" && ficha.abajo == "Rue"){
				if(posgranjero == 1 || posgranjero == 2 || posgranjero == 3){granja(ficha,"izda");} 					// prohibido izquierda
				else if(posgranjero == 5 || posgranjero == 6 || posgranjero == 7){granja(ficha,"derecha");}	// prohibido derecha

			}else if (ficha.izda == "Rue" && ficha.abajo == "Rue" && posgranjero == 5){					// curva esquina inferior-izquierda
					ficha2=Tablero.buscarxcoor(ficha.x-1,ficha.y+1);
					if (ficha2.lleno){granja(ficha2);}	
			}else if (ficha.derecha == "Rue" && ficha.abajo == "Rue" && posgranjero == 3){				// curva esquina inferior-derecha
					ficha2=Tablero.buscarxcoor(ficha.x+1,ficha.y+1);
					if (ficha2.lleno){granja(ficha2);}	
			}else if (ficha.derecha == "Rue" && ficha.arriba == "Rue" && posgranjero == 1){			// curva esquina superior-derecha
					ficha2=Tablero.buscarxcoor(ficha.x+1,ficha.y-1);
					if (ficha2.lleno){granja(ficha2);}	
			}else if (ficha.izda == "Rue" && ficha.arriba == "Rue" && posgranjero == 7){					// curva esquina superior-izquierda
					ficha2=Tablero.buscarxcoor(ficha.x-1,ficha.y-1);
					if (ficha2.lleno){granja(ficha2);}				
			}else{granja(ficha);}																																// otro caso
			
			if (flag==2){
				puntos = ciudad*3;
				sumarPuntos(granjeros,puntos);	

			}else{
				num_granjeros = granjeros.length;

				if (num_granjeros == 0){
					haygran=false;
				}else{
					haygran=true;
				}
				return haygran;
			}
	};
