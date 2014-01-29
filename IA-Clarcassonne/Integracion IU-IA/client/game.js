spritesC = {
        Rrecta: { sx: 0, sy: 0, w:100, h: 100, frames: 1 },
        Rcurva: { sx: 0, sy: 400, w: 100, h: 100, frames: 1 },
        Catedral: { sx: 0, sy: 500, w: 100, h: 100, frames: 1 },
        Posada: { sx: 200, sy: 400, w: 100, h: 100, frames: 1 },  
        Ccruce: { sx: 200, sy: 200, w: 100, h: 100, frames: 1 },   
        CiudadE: { sx: 300, sy: 0, w: 100, h: 100, frames: 1 },    
        Ciudad3lc: { sx: 600, sy: 0, w: 100, h: 100, frames: 1 },  
        Ciudad3lcE: { sx: 500, sy: 0, w: 100, h: 100, frames: 1 },     
        Ciudad3l: { sx: 500, sy: 100, w: 100, h: 100, frames: 1 },    
        Ciudad3lE: { sx: 300, sy: 100, w: 100, h: 100, frames: 1 },
        Ciudad2lc: { sx: 400, sy: 200, w: 100, h: 100, frames: 1 },   
        Ciudad2lcE: { sx: 300, sy: 200, w: 100, h: 100, frames: 1 },
        Ciudad2l: { sx: 400, sy: 300, w: 100, h: 100, frames: 1 },  
        Ciudad2lE: { sx: 300, sy: 400, w: 100, h: 100, frames: 1 },  
        CiudadPuerta: { sx: 600, sy: 400, w: 100, h: 100, frames: 1 },
        CiudadPuertaE: { sx: 500, sy: 400, w: 100, h: 100, frames: 1 },  
        Ciudadext: { sx: 500, sy: 500, w: 100, h: 100, frames: 1 },  
        Ciudad1l2crect: { sx: 700, sy: 0, w: 100, h: 100, frames: 1 },  
        Ciudadcurvder: { sx: 700, sy: 100, w: 100, h: 100, frames: 1 },  
        Ciudadcurvizq: { sx: 700, sy: 200, w: 100, h: 100, frames: 1 },
        Ciudad1lcruce: { sx: 700, sy: 300, w: 100, h: 100, frames: 1 },
        Ciudad1ll: { sx: 1000, sy: 100, w: 100, h:100, frames:1},
        Ciudad1l: { sx: 1000, sy: 300, w: 100, h: 100, frames:1},
        Tcruce: {sx: 1000, sy: 500, w: 100, h: 100, frames:1},
        
        ficha_rojo: { sx: 1152, sy: 0, w: 48, h: 48, frames: 1 },
        cura_rojo: { sx: 1200, sy: 0, w: 48, h: 48, frames: 1 },
        caballero_rojo: { sx: 1248, sy: 0, w: 48, h: 48, frames: 1 },
        granjero_rojo: { sx: 1296, sy: 0, w: 48, h: 48, frames: 1 },
        ladron_rojo: { sx: 1344, sy: 0, w: 48, h: 48, frames: 1 },
        
        ficha_azul: { sx: 1152, sy: 48, w: 48, h: 48, frames: 1 },
        cura_azul: { sx: 1200, sy: 48, w: 48, h: 48, frames: 1 },
        caballero_azul: { sx: 1248, sy: 48, w: 48, h: 48, frames: 1 },
        granjero_azul: { sx: 1296, sy: 48, w: 48, h: 48, frames: 1 },
        ladron_azul: { sx: 1344, sy: 48, w: 48, h: 48, frames: 1 },
        
        ficha_amarillo: { sx: 1152, sy: 96, w: 48, h: 48, frames: 1 },
        cura_amarillo: { sx: 1200, sy: 96, w: 48, h: 48, frames: 1 },
        caballero_amarillo: { sx: 1248, sy: 96, w: 48, h: 48, frames: 1 },
        granjero_amarillo: { sx: 1296, sy: 96, w: 48, h: 48, frames: 1 },
        ladron_amarillo: { sx: 1344, sy: 96, w: 48, h: 48, frames: 1 },
        
        ficha_verde: { sx: 1152, sy: 144, w: 48, h: 48, frames: 1 },
        cura_verde: { sx: 1200, sy: 144, w: 48, h: 48, frames: 1 },
        caballero_verde: { sx: 1248, sy: 144, w: 48, h: 48, frames: 1 },
        granjero_verde: { sx: 1296, sy: 144, w: 48, h: 48, frames: 1 },
        ladron_verde: { sx: 1344, sy: 144, w: 48, h: 48, frames: 1 },
        
        ficha_gris: { sx: 1152, sy: 192, w: 48, h: 48, frames: 1 },
        cura_gris: { sx: 1200, sy: 192, w: 48, h: 48, frames: 1 },
        caballero_gris: { sx: 1248, sy: 192, w: 48, h: 48, frames: 1 },
        granjero_gris: { sx: 1296, sy: 192, w: 48, h: 48, frames: 1 },
        ladron_gris: { sx: 1344, sy: 192, w: 48, h: 48, frames: 1 },
        
        ficha_rosa: { sx: 1152, sy: 240, w: 48, h: 48, frames: 1 },
        cura_rosa: { sx: 1200, sy: 240, w: 48, h: 48, frames: 1 },
        caballero_rosa: { sx: 1248, sy: 240, w: 48, h: 48, frames: 1 },
        granjero_rosa: { sx: 1296, sy: 240, w: 48, h: 48, frames: 1 },
        ladron_rosa: { sx: 1344, sy: 240, w: 48, h: 48, frames: 1 },
}



var img = new Image();
img.src = 'images/background.png';

var img2 = new Image();
img2.src = 'images/abajo.png';

//var img3 = new Image();
//img3.src = 'images/musica.png';

var img4 = new Image();
img4.src = 'images/ControlHelp.png';






CurrentScroll = {x:70,y:70,active: true};

CurrentMove = 0;
CurrentTurn = 0;
sonar = true;

function traducirSeguidor (x,y) {
	if (x == 0 && y == 0) { return 7; } 
	else if (x == 1 && y == 0) { return 0;} 
	else if (x == 2 && y == 0) {return 1;} 
	else if (x == 0 && y == 1) {return 6;} 
	else if (x == 1 && y == 1) {return 8;}
	else if (x == 2 && y == 1) {return 2;}
	else if (x == 0 && y == 2) {return 5;}
	else if (x == 1 && y == 2) {return 4;} 
	else {return 3;}
}

function Seguidortraducir (pos) {
	if (pos == 0) {return {x: 1, y: 0}; }
	else if (pos == 1) {return  {x: 2, y: 0}; }
	else if (pos == 2) {return  {x: 2, y: 1}; }
	else if (pos == 7) {return  {x: 0, y: 0}; }
	else if (pos == 8) {return  {x: 1, y: 1}; }
	else if (pos == 3) {return  {x: 2, y: 2}; }
	else if (pos == 6) {return  {x: 0, y: 1}; }
	else if (pos == 5) { return {x: 0, y: 2}; }
	else { return {x: 1, y:2 }; }
}


function traducirTipoSeguidor (x) {
	if (x== 1) { return "Granjero"; } 
	else if (x == 2) { return "Ladron";} 
	else if (x == 3) {return "Caballero";} 
	else if (x == 4) {return "Monje";} 
}


function SetSeguidorEn (Seguidor, Posiciones) {
	var encaja = false;
	var posible;
	for (pos in Posiciones) {

		posible = Seguidortraducir (Posiciones[pos].n);
		console.log(traducirTipoSeguidor(Seguidor.t), Posiciones[pos].t);
		if (posible.x == Seguidor.x && posible.y == Seguidor.y && traducirTipoSeguidor(Seguidor.t) ==  Posiciones[pos].t) {
			encaja = true;	
		}
 	}
 	return encaja;

}




function SetFichaEn (NuevaPieza, Posiciones) {
	var encaja = false;

	
	for (pieza in Posiciones) {
		
		if (Posiciones[pieza].x == NuevaPieza.x/100 +CurrentScroll.x && Posiciones[pieza].y == NuevaPieza.y/100 +CurrentScroll.y) {
			encaja = true;
		}
	}
	
	if (Posiciones.length == 0) {
		encaja = true;
	}
	
	return encaja;
}


LastData = undefined;

function SetPlayers (err, data) {
	console.log(data);
	Jugador1 = {nombre: data[0].nombre.slice(0,6), color: "ficha_rojo", puntos: data[0].puntos, id:data[0].id, turno:1};
	Jugador2 = {nombre: data[1].nombre.slice(0,6) , color: "ficha_azul", puntos:data[1].puntos, id: data[1].id, turno: 0};
	Jugador3 = {nombre: data[2].nombre.slice(0,6)  , color: "ficha_amarillo", puntos:data[2].puntos, id: data[2].id, turno: 0};
	if (data.length >= 4) {
		Jugador4 = {nombre: data[3].nombre.slice(0,6)    , color: "ficha_verde", puntos:data[3].puntos, id: data[3].id, turno: 0};
	}
	if (data.length == 5) {
		Jugador5 = {nombre: data[4].nombre.slice(0,6)  , color: "ficha_gris", puntos:data[4].puntos, id: data[4].id, turno: 0};
	}
	nJugadores = data.length;
	
	Meteor.subscribe("partidas", idParty);
	
	var u = Partidas.findOne({_id:idParty})
	console.log(u);
	if (u.movimientos) {
		console.log(u.movimientos.pop().jugador);
		setTurno(u.movimientos.pop().jugador);
		
		for (moves in u.movimientos) {
			if (u.movimientos[moves].ficha != 0) {
				NP = new PiezaMapa(u.movimientos[moves].ficha.x,u.movimientos[moves].ficha.y, u.movimientos[moves].ficha.sprite,u.movimientos[moves].ficha.rotation);
				NP.colocada = true;
				Tablero.add(NP);
			}
			if (u.movimientos[moves].seguidor != 0) {
				Tablero.add(new Seguidor (u.movimientos[moves].seguidor.fx, u.movimientos[moves].seguidor.fy,u.movimientos[moves].seguidor.t,u.movimientos[moves].seguidor.sx,u.movimientos[moves].seguidor.sy));
			}
			setPoint (u.movimientos[moves].puntos);
			LastData = u.movimientos[moves];
		
		}
	
	} 
	
	
	
	Deps.autorun(function(){
		
		
		console.log (Partidas.findOne({_id:idParty}));
		var last = Partidas.findOne({_id:idParty}).movimientos;
		if (last != undefined) {
			var ultimo = last.pop();
			
			if (ultimo == LastData) {
				return;
			}
			LastData = ultimo;
			if (ultimo.ficha != 0) {
			NP = new PiezaMapa(ultimo.ficha.x,ultimo.ficha.y, ultimo.ficha.sprite,ultimo.ficha.rotation);
			NP.colocada = true;
			Tablero.add(NP);
			}
			if (ultimo.seguidor != 0) {
				Tablero.add(new Seguidor (ultimo.seguidor.fx,ultimo.seguidor.fy,ultimo.seguidor.t,ultimo.seguidor.sx,ultimo.seguidor.sy));
			}
			setPoint (ultimo.puntos);
			console.log(ultimo);
			pasarTurno();
		}
		
	});

	Juego.initialize(idCanvas.slice(1),spritesC,startGameC);
}



function setPoint (data) {
	Jugador1.puntos = data[0].puntos;
	Jugador2.puntos = data[1].puntos;
	Jugador3.puntos = data[2].puntos;
	if (nJugadores >= 4) {
		Jugador4.puntos = data[3].puntos;
	}
	if (nJugadores == 5) {
		Jugador5.puntos = data[4].puntos;
	}



}


function getTurno () {
	if (Jugador1.turno == 1) return Jugador1;
	if (Jugador2.turno == 1) return Jugador2;
	if (Jugador3.turno == 1) return Jugador3;
	if (nJugadores >= 4) {
		if (Jugador4.turno == 1) return Jugador4;
	}
	if (nJugadores == 5) {
		if (Jugador5.turno == 1) return Jugador5;
	}
	
}

function setTurno (jugador) {

	if (nJugadores == 3) {
		if (Jugador1.id == jugador.id) { getTurno().turno = 0; Jugador2.turno = 1; }
		if (Jugador2.id == jugador.id) { getTurno().turno = 0; Jugador3.turno = 1; }
		if (Jugador3.id == jugador.id) { getTurno().turno = 0; Jugador1.turno = 1; }

	}
	if (nJugadores == 4) {
		if (Jugador1.id == jugador.id) { getTurno().turno = 0; Jugador2.turno = 1; }
		if (Jugador2.id == jugador.id) { getTurno().turno = 0; Jugador3.turno = 1; }
		if (Jugador3.id == jugador.id) { getTurno().turno = 0; Jugador4.turno = 1; }
		if (Jugador4.id == jugador.id) { getTurno().turno = 0; Jugador1.turno = 1; }

	}
	if (nJugadores == 5) {
		if (Jugador1.id == jugador.id) { getTurno().turno = 0; Jugador2.turno = 1; }
		if (Jugador2.id == jugador.id) { getTurno().turno = 0; Jugador3.turno = 1; }
		if (Jugador3.id == jugador.id) { getTurno().turno = 0; Jugador4.turno = 1; }
		if (Jugador4.id == jugador.id) { getTurno().turno = 0; Jugador5.turno = 1; }
		if (Jugador5.id == jugador.id) { getTurno().turno = 0; Jugador1.turno = 1; }
	}
	

}

function pasarTurno () {
	
	if (nJugadores == 3) {
		if (Jugador1.turno == 1) { Jugador2.turno = 1; Jugador1.turno = 0;}
		else if (Jugador2.turno == 1) { Jugador3.turno = 1; Jugador2.turno = 0;}
		else if (Jugador3.turno == 1) { Jugador1.turno = 1; Jugador3.turno = 0;}
	}
	
	if (nJugadores == 4) {
		if (Jugador1.turno == 1) { Jugador2.turno = 1; Jugador1.turno = 0;}
		else if (Jugador2.turno == 1) { Jugador3.turno = 1; Jugador2.turno = 0;}
		else if (Jugador3.turno == 1) { Jugador4.turno = 1; Jugador3.turno = 0;}
		else if (Jugador4.turno == 1) { Jugador1.turno = 1; Jugador4.turno = 0;}
	}
	
	if (nJugadores == 5) {
		if (Jugador1.turno == 1) { Jugador2.turno = 1; Jugador1.turno = 0;}
		else if (Jugador2.turno == 1) { Jugador3.turno = 1; Jugador2.turno = 0;}
		else if (Jugador3.turno == 1) { Jugador4.turno = 1; Jugador3.turno = 0;}
		else if (Jugador4.turno == 1) { Jugador5.turno = 1; Jugador4.turno = 0;}
		else if (Jugador5.turno == 1) { Jugador1.turno = 1; Jugador5.turno = 0;}
	}
	
	CurrentMove = 0;
	CurrentTurn += 1;
}


//loader.init(); 
startGameC = function() {   
	
	
	Juego.setBoard(0,new Background());
	Juego.setBoard(1,new Jugadores());
	Juego.setBoard(2,new Rejilla()); 
	Juego.setBoard(3,new Scroll()); 
	
	Tablero = new TableroJuego();
	Juego.setBoard(4,Tablero);
	
	Juego.setBoard(5,new Ficha_abajo());
	Juego.setBoard(9,new Helptext()); 
	Juego.setBoard(10, new Time());	
	Juego.setBoard(11, new HelpScreen());

	
	
};

Time = function () {
	this.tiempo = 60;
	this.init = false;
	
	this.draw = function (ctx) {
		ctx.save();
		ctx.fillStyle="rgb(255,255,255)";
		ctx.font="bold 20px Arial";
		ctx.fillText(this.tiempo,670,590);
		//ctx.fillText2(this.tiempo,670,580);
		ctx.restore();
	}
	
	var turno = CurrentTurn;
	this.step = function () {

		if (this.tiempo == 0) {
			this.tiempo = 60;
			//pasarTurno();
			if (nJugadores == 3) {
				var parray = [Jugador1, Jugador2, Jugador3];  
			} else if (nJugadores == 4) {
				var parray = [Jugador1, Jugador2, Jugador3, Jugador4];  
			} else if (nJugadores == 5) { 
				var parray = [Jugador1, Jugador2, Jugador3, Jugador4, Jugador5];  
			}
			Partidas.update(idParty, {
                            $push : {movimientos: {jugador: getTurno(), ficha: 0, seguidor: 0, puntos: parray}}
           });
            //Session.set("turno", CurrentTurn+1);
			
			turno = CurrentTurn;
			Juego.setBoard(7, Blank);
			Juego.setBoard(8, Blank);
		}
		
		if (turno != CurrentTurn) {
			this.tiempo = 60;
			turno = CurrentTurn;
		}
		
		if (this.init == false) {
			var that = this;
			setInterval(function () { that.tiempo -= 1}, 1000);
			this.init = true;
		}
	
	}


}



Helptext = function () {
	this.enabled = true;
	
	this.draw = function (ctx) {
		if (!this.enabled) return;
		ctx.save();
		ctx.fillStyle="rgb(255,255,255)";
		ctx.font="bold 15px Arial";
		
		
		ctx.fillText("pulsa 'm' para activar o desactivar sonido", 250,465);  
		
		if (CurrentMove == 0) {
			
			ctx.fillText("Pulsa espacio para sacar ficha al azar",270,485);
		}
		
		if (CurrentMove == 1) {
			ctx.fillText("Arrastra la ficha con el raton y posicionala con espacio, rotala con 0",170,485);
		}
		
		if (CurrentMove == 2) {
			ctx.fillText("Elige moviendote con las flechas y espacio",265,485);
		
		}
		ctx.restore();
		
		
	}
	
	var up = false;
	this.step = function () {
		if(!Juego.keys['help']) up = true;
    	if(up && Juego.keys['help']) {
    		up = false;
    		this.enabled = !this.enabled;
    	}
    }



}

// Se encarga de pintar el fondo del juego
Background = function() {
    this.draw = function(ctx) {
		ctx.drawImage(img, 0, 0);   		
    }
    this.step = function(dt) { }
};



// Se encarga de pintar la primera ficha boca abajo del juego
Ficha_abajo = function(cx,cy) {
	
	
    this.draw = function(ctx) {
		ctx.drawImage(img2, 700, 500);
	}
	
    	var sonido = true;
		var up = false;
		var NuevaPieza;
		
	this.step = function(dt) {
	
	if (CurrentMove == 0 && getTurno().id.slice(0,10) == "Jugador_IA" && Meteor.userId() == Jugador1.id) {
		Meteor.call('JugadorArtificial', idParty, getTurno().id, function (err, data) {
			Partidas.update(idParty, {
                            $push : {movimientos: {jugador: getTurno(), ficha: {x: data[2], y: data[3], sprite: data[0], rotation: data[1]*-90}, seguidor: 0, puntos: data[4]}}
                          });
			console.log(data, 'IAAAA');
		
			
		}); 
		CurrentMove = 2;
	}
    if(Juego.keys['silenciar']){
    	sonido = !sonido;
   	}
	if(!Juego.keys['sacar_ficha']) up = true;
	
    	if(up && Juego.keys['sacar_ficha']) {
    		up = false;
    		//console.log(Meteor.userId());
    		if (CurrentMove == 0 && getTurno().id == Meteor.userId())  {
    			
    			Meteor.call("Robar", idParty, function(err, data) { 
    					if (data == 0) {
    						alert("Fin de partida");
    						return;
    					}
    						NuevaPieza = new PiezaMapa(CurrentScroll.x + 7,CurrentScroll.y + 5, data[0],0);
			
						//sonido_ladron.play();
						//if (data[1].length != 0 || ) {
						Juego.setBoard(7, NuevaPieza);
						CurrentMove = 1; 
						Posiciones = data[1];
						console.log(data);
						Juego.setBoard(6, new Highlight(data[1]));
						 
			});

		} else if (CurrentMove == 1 && getTurno().id == Meteor.userId()) {
			if (SetFichaEn(NuevaPieza, Posiciones)) {
				Meteor.call("ColocarFicha", idParty, NuevaPieza.sprite, {x: NuevaPieza.x/100 + CurrentScroll.x, y: NuevaPieza.y/100 +CurrentScroll.y}, (NuevaPieza.rotation / -90), getTurno().id, function(err, data) { 
					if (data != 0) {
    					Juego.setBoard(8,new Set(NuevaPieza));
						CurrentMove = 2;
						PosicionesSeg = data;
						console.log(data);
					
					}else{
					        alert("Rota la ficha para colocarla");
					}
					
				});
			} else {
				alert("No puedes colocar la ficha ahí");
			}
		
			
		}
	}
		
}
};


Highlight = function (positions) {
	this.position = positions;

	this.draw = function(ctx) {
		if (CurrentMove == 1) {
			ctx.save();
            ctx.fillStyle = 'rgba(255,255,255,0.5)';
			for (i in this.position) {
		if (this.position[i].y-CurrentScroll.y < 5) {
            	        ctx.fillRect((this.position[i].x - CurrentScroll.x) * 100,(this.position[i].y-CurrentScroll.y) * 100 ,100,100);
            	 }
            	
               }
            
            ctx.restore();
        }
	};
	this.step= function(dt) {};


}


Jugadores = function() {  
   this.draw = function(ctx){
     // ctx.beginPath();
      ctx.save();
      ctx.font="bold 25px Arial";
      
      ctx.fillStyle="rgb(255,255," + Jugador1.turno * 255 +")";
      ctx.fillText(Jugador1.nombre,45,540);
      SpriteSh.draw(ctx, Jugador1.color ,20,520,1,0,0.5);
      ctx.fillText(Jugador1.puntos,50,570);
      
      ctx.fillStyle="rgb(255,255," + Jugador2.turno * 255 +")";
      ctx.fillText(Jugador2.nombre,175,540);
      SpriteSh.draw(ctx,Jugador2.color,150,520,1,0,0.5);
      ctx.fillText(Jugador2.puntos,180,570);
      
      ctx.fillStyle="rgb(255,255," + Jugador3.turno * 255 +")";
      ctx.fillText(Jugador3.nombre,305,540);
      SpriteSh.draw(ctx,Jugador3.color,280,520,1,0,0.5);
      ctx.fillText(Jugador3.puntos,310,570);
      
      if (nJugadores >= 4) {
      	 ctx.fillStyle="rgb(255,255," + Jugador4.turno * 255 +")";
     	 ctx.fillText(Jugador4.nombre,435,540);
      	 SpriteSh.draw(ctx,Jugador4.color,410,520,1,0,0.5);
     	 ctx.fillText(Jugador4.puntos,440,570);
      }
      if (nJugadores == 5) {
      	 ctx.fillStyle="rgb(255,255," + Jugador5.turno * 255 +")";
      	 ctx.fillText(Jugador5.nombre,565,540);
      	 SpriteSh.draw(ctx,Jugador5.color,540,520,1,0,0.5);
      	 ctx.fillText(Jugador5.puntos,570,570);
      }

      ctx.restore();
   
   }
      
  this.step = function(dt) { }
   
     


};

Rejilla =  function(){	
	this.draw = function(ctx){
		ctx.save();
		for(var x=0; x<=800; x=x+100){
			ctx.moveTo(x,0);
			ctx.lineTo(x,500);
		};
	
		for(var y=0; y<=500; y=y+100){
			ctx.moveTo(0,y);
			ctx.lineTo(800,y);
		};

		ctx.strokeStyle ="#190B07";
		ctx.stroke();
		ctx.restore();
	
	}
	
	this.step= function(dt){ };
}; 

PiezaMapa = function (cx,cy, sprite,rotate) {
	this.x = 100*(cx - CurrentScroll.x); // cx + scrollX
	this.y = 100*(cy - CurrentScroll.y); // cy + scrollY
	this.rotation = rotate;
	this.sprite = sprite;
	this.colocada = false;
	this.type = 'PiezaMapa';
	
	this.draw = function (ctx) {
		if (this.colocada == true) {
			if (this.y < 500 && this.y >= 0 && this.x >= 0 && this.x < 800) {
				SpriteSh.draw(ctx,this.sprite,this.x,this.y,1,this.rotation,1);
			}
		} else {
			SpriteSh.draw(ctx,this.sprite,this.x,this.y,1,this.rotation,1);
		}
	}
	
	var init = false;
	var rotacion = false;
	var mouseIsDown = false;
	
	this.step = function () { 

		var that = this;
	   
		if (this.colocada == false ) {
		
		
			if(!Juego.keys['rotar']) rotacion = true;
			if(rotacion && Juego.keys['rotar']) {
				rotacion = false;
				this.rotation = this.rotation -90;
			}
	
			if (init == false) {
				$(idCanvas).mousedown(function(e){
					console.log(e);
	          	  	if (that.colocada == false && CurrentMove == 1) {
	         				
						if ((e.pageX - e.currentTarget.offsetLeft) > that.x &&
							 (e.pageY - e.currentTarget.offsetTop) > that.y &&
							 (e.pageX - e.currentTarget.offsetLeft) < that.x + 100 &&
							 (e.pageY - e.currentTarget.offsetTop) < that.y + 100){
							posicion_x = (e.pageX - e.currentTarget.offsetLeft) - that.x;
							posicion_y = (e.pageY - e.currentTarget.offsetTop) - that.y;
	                  
							mouseIsDown = true;
						}
					}
				})
		
				$(idCanvas).mouseup(function(e){
       		 	 // cuando mueves. soltar ficha en una casilla
                		if (that.colocada == false && CurrentMove == 1) {
						that.x = Math.floor((e.pageX - e.currentTarget.offsetLeft)/100)* 100;
						that.y = Math.floor((e.pageY- e.currentTarget.offsetTop)/100)* 100;
					}
					mouseIsDown = false;
				})
               

				$(idCanvas).mousemove(function(e){
             
					if(!mouseIsDown) return;
   					if (that.colocada == false && CurrentMove == 1) {
						that.x = (e.pageX - e.currentTarget.offsetLeft) - posicion_x;
						that.y = (e.pageY - e.currentTarget.offsetTop) - posicion_y;
                	}
					return false;
				})
				init = true;
			}
		}
	}
}  

//Se encarga de pintar el fondo del juego
HelpScreen = function() {
	
    this.enabled = false;
    this.draw = function(ctx) {
           if (this.enabled == true) {
                ctx.save();
                ctx.fillStyle = 'rgba(255,255,255,0.7)';
                ctx.fillRect(140,90,520,320);
                ctx.strokeStyle = "#ff9933";
                ctx.strokeRect(140,90,520,320);
                ctx.strokeRect(145,95,510,310);
                ctx.drawImage(img4, 150, 100);  
                ctx.restore();
           }
	};
	
		 var up = false;

	this.step = function (dt) {
    	if(!Juego.keys['ayuda']) up = true;
    	if(up && Juego.keys['ayuda']) {
         	up = false;
         	this.enabled = !this.enabled;
    	}
	};


};
Seguidor = function (cx,cy, sprite, posx, posy) {
	this.x = 100*cx;
	this.y = 100*cy;
	this.posx = 33*posx+5;
	this.posy = 33*posy+5;
	this.sprite = sprite;
	this.type = 'Seguidor';
	
	this.draw = function (ctx) {
		SpriteSh.draw(ctx,this.sprite,this.x + this.posx,this.y + this.posy,1,0,0.5);
	}
	
	this.step = function () {
	
	}
}


Set = function (PiezaMapa) {
	var up1 = false;
	var up2 = false;
	var up3 = false;
	var up4 = false;
	var up5 = false;
	var up6 = false;
	
	this.pieza = PiezaMapa;
	this.menu = 0;
	this.option = 0; // selecciono tipo de seguidor sin seguidor
	this.optionx = 0; // posicionx casilla
	this.optiony = 0; // posicionx casilla
	
	this.draw = function (ctx) {
	
		ctx.save();
		ctx.font="bold 25px Arial";
		
		
		ctx.fillRect(250,120,400,260);
		ctx.strokeStyle = "#ff9933";
		ctx.strokeRect(250,120,400,260);
		ctx.strokeRect(255,125,390,250);
		
		
		ctx.fillStyle="rgb(255,255,255)";

		ctx.fillRect(350,170,190,2);
		if (this.menu < 0) {
			Juego.setBoard(8,Blank);
			CurrentScroll.active = true;
			CurrentMove = 1;
		}
		if (this.menu == 0) {
			ctx.fillText("Colocar la pieza",350,160);
			ctx.font="bold 20px Arial";
			ctx.fillText("- Colocar sin seguidor",270,215);
			
			ctx.fillText("- Colocar granjero",270,245);
			ctx.fillText("- Colocar ladrón",270,275);
			ctx.fillText("- Colocar caballero",270,305);
			ctx.fillText("- Colocar monje",270,335);
			
			ctx.strokeRect(265,195+this.option*30,250,30);
			
		}
		
		if (this.menu == 1) {
		
			//ctx.fillRect(370+50*this.optionx,195+50*this.optiony,50,50);
			
			ctx.fillText("Colocar seguidor",350,160);
			if (this.pieza.rotation == 0) {
                		SpriteSh.draw(ctx,this.pieza.sprite,370,195,1,this.pieza.rotation,1.5);
            		} else if (this.pieza.rotation == -90) {
                		SpriteSh.draw(ctx,this.pieza.sprite,370,245,1,this.pieza.rotation,1.5);
            		} else if (this.pieza.rotation == -180) {
                		SpriteSh.draw(ctx,this.pieza.sprite,420,245,1,this.pieza.rotation,1.5);
            		} else if (this.pieza.rotation == -270) {
                		SpriteSh.draw(ctx,this.pieza.sprite,420,195,1,this.pieza.rotation,1.5);
            		}
			//SpriteSheet.draw(ctx,this.pieza.sprite,420,195,1,this.pieza.rotation,1.5);
			ctx.font="bold 20px Arial";
			for(var y=0; y<3; y=y+1){
				for(var x=0; x<3; x=x+1){
					ctx.strokeRect(370 + 50 * x, 195 + 50 * y,50,50);
					ctx.fillStyle="rgb(0,0,0)";
					if (x == this.optionx && y == this.optiony) {
						ctx.fillStyle="rgb(255,255,255)";
					}
						ctx.fillText(3*y+x + 1, 390 + 50*x, 225+50*y);
						
					
					
				}
			}
			
		}
		
		ctx.fillStyle="rgb(255,255,255)";
		ctx.font="bold 10px Arial";
		ctx.fillText("Position",275,155);
		ctx.fillText("(" + (this.pieza.x/100 + CurrentScroll.x) + ", " + (this.pieza.y/100 + CurrentScroll.y) + ")" ,275,170);
		
		
		
		ctx.restore();
	}
	
	
	this.step = function () { 
		var that = this;
		
		if (CurrentScroll.active) CurrentScroll.active = false;
		
		if(!Juego.keys['back']) up6 = true;
		if(up6 && Juego.keys['back']) {
			up6 = false;
			if (this.menu != 0) {
				this.menu -= 1;
				this.option = 0; 
				this.optionx = 0;
				this.optiony = 0; 
			}
		}
		
		if (this.menu == 0) {
			if(!Juego.keys['up']) up1 = true;
			if(up1 && Juego.keys['up']) {
				up1 = false;
				if (this.option > 0) {
					this.option -= 1;
				}
			}
			
			if(!Juego.keys['down']) up2 = true;
			if(up2 && Juego.keys['down']) {
				up2 = false;
				if (this.option < 4) {
					this.option += 1;
				}
			}
			
			if(!Juego.keys['sacar_ficha']) up3 = true;
			if(up3 && Juego.keys['sacar_ficha']) {
				up3 = false;
				if (this.option > 0) {
					this.menu += 1;
				} else {
				
					Meteor.call("ColocarSeguidor", idParty, getTurno ().id, {x: this.pieza.x/100 + CurrentScroll.x, y: this.pieza.y/100 +CurrentScroll.y}, 0, function(err, data) { 				// Coloco la ficha en el mapa
						that.pieza.colocada = true;
						//Tablero.add(that.pieza);
						Juego.setBoard(8,Blank);
						Juego.setBoard(7, Blank);
						CurrentScroll.active = true;
						Partidas.update(idParty, {
                            $push : {movimientos: {jugador: getTurno(), ficha: {x: that.pieza.x/100 + CurrentScroll.x, y: that.pieza.y/100 +CurrentScroll.y, sprite: that.pieza.sprite, rotation: that.pieza.rotation}, seguidor: 0, puntos: data}}
                          });
                          	console.log(data);
                          	
                          	$(idCanvas).unbind("mousedown");
                          	$(idCanvas).unbind("mouseup");
                          	$(idCanvas).unbind("mousemove");
                          	
                          //Session.set("turno", CurrentTurn+1);
						
						//pasarTurno();
			

					
				});
					

				}
			}


		}
		
		if (this.menu == 1) {
		
			if(!Juego.keys['up']) up1 = true;
			if(up1 && Juego.keys['up']) {
				up1 = false;
				if (this.optiony > 0) {
					this.optiony -= 1;
				}
			}
			
			if(!Juego.keys['down']) up2 = true;
			if(up2 && Juego.keys['down']) {
				up2 = false;
				if (this.optiony < 2) {
					this.optiony += 1;
				}
			}
			if(!Juego.keys['left']) up4 = true;
			if(up4 && Juego.keys['left']) {
				up4 = false;
				if (this.optionx > 0) {
					this.optionx -= 1;
				}
			}
			
			if(!Juego.keys['right']) up5 = true;
			if(up5 && Juego.keys['right']) {
				up5 = false;
				if (this.optionx < 2) {
					this.optionx += 1;
				}
			}
			
			if(!Juego.keys['sacar_ficha']) up3 = true;
			if(up3 && Juego.keys['sacar_ficha']) {
				up3 = false;
				// Coloco la ficha en el mapa en la posicion optionx,optiony
				if (SetSeguidorEn ( {x: this.optionx, y: this.optiony, t: this.option}, PosicionesSeg)) {
				
					Meteor.call("ColocarSeguidor", idParty, getTurno().id, {x: this.pieza.x/100 + CurrentScroll.x, y: this.pieza.y/100 + CurrentScroll.y}, {t:traducirTipoSeguidor (this.option) ,n: traducirSeguidor (this.optionx,this.optiony)}, function(err, data) {
					
					 	// Coloco la ficha en el mapa
						that.pieza.colocada = true;
						//Tablero.add(that.pieza);
						//Tablero.add(new Seguidor (that.pieza.x/100,that.pieza.y/100,that.setSeguidorType(),that.optionx,that.optiony));
						Partidas.update(idParty, {
                            $push : {movimientos: {jugador: getTurno(), ficha: {x: that.pieza.x/100 + CurrentScroll.x, y: that.pieza.y/100 +CurrentScroll.y, sprite: that.pieza.sprite, rotation: that.pieza.rotation}, seguidor: {fx: that.pieza.x/100 , fy: that.pieza.y/100,t: that.setSeguidorType(),sx:that.optionx,sy:that.optiony}, puntos: data}}
                          });
                         //Session.set("turno", CurrentTurn+1);
						Juego.setBoard(8,Blank);
						Juego.setBoard(7, Blank);
						CurrentScroll.active = true;
						
						$(idCanvas).unbind("mousedown");
                          			$(idCanvas).unbind("mouseup");
                          			$(idCanvas).unbind("mousemove");
						//pasarTurno();
					
					});
					
				}
				
			}
		}
	}
	
	this.setSeguidorType = function () {
		var color = (function () { 
							var ficha_color = getTurno().color; 
							var color = ficha_color.indexOf("_") + 1; 
							return ficha_color.slice(color);
						})(); 
		if(Juego.keys['silenciar']){
    		sonar = !sonar;
   		}
        if (sonar){
			if (this.option == 1){
					sonido_granjero.play();
				return 'granjero_' + color;
			} else if (this.option == 2){
				sonido_ladron.play();
				return 'ladron_' + color;
			} else if (this.option == 3){
				sonido_caballero.play();
				return 'caballero_' + color;
			} else if (this.option == 4){
				sonido_monje.play();
				return 'cura_' + color;
			}
		}else if (!sonar){
			if (this.option == 1){
				sonido_granjero.pause();
				return 'granjero_' + color;
			} else if (this.option == 2){
				return 'ladron_' + color;
			} else if (this.option == 3){
				return 'caballero_' + color;
			} else if (this.option == 4){
				return 'cura_' + color;
			}
		}
	}

}



Scroll = function() {
	this.width = 140;
	this.height = 140;
	this.scrollx = 70;
	this.scrolly = 70;
	this.type = 'ScrollHandler';
	
	var up1 = false;
	var up2 = false;
	var up3 = false;
	var up4 = false;
	
	this.draw = function (ctx) {
		ctx.save();
		for(var y=0; y<=400; y=y+100){
			for(var x=0; x<=800; x=x+100){
				ctx.fillText("(" + (this.scrollx+x/100) + ",",5+x,10+y);
				ctx.fillText((this.scrolly+y/100) + ")",30+x,10+y);
			};
		};
		
		ctx.restore();
	}
	
	this.step = function () {
		if(!CurrentScroll.active) return;
		if(!Juego.keys['left']) up1 = true;
		if(up1 && Juego.keys['left']) {
			up1 = false;
			if (this.scrollx != 0) {
				this.scrollx -= 1;
				CurrentScroll.x -= 1;
				Tablero.translate(1,0);
				
			}
		}
		if(!Juego.keys['right']) up2 = true;
		if(up2 && Juego.keys['right']) {
			up2 = false;
			if (this.scrollx != this.width) {
				this.scrollx += 1;
				CurrentScroll.x += 1;
				Tablero.translate(-1,0);
				
			}
		}
		if(!Juego.keys['up']) up3 = true;
		if(up3 && Juego.keys['up']) {
			up3 = false;
			if (this.scrolly != 0) {
				this.scrolly -= 1;
				CurrentScroll.y -= 1;
				Tablero.translate(0,1);
				
			}
		}
		if(!Juego.keys['down']) up4 = true;
		if(up4 && Juego.keys['down']) {
			up4 = false;
			if (this.scrolly != this.height) {
				this.scrolly += 1;
				CurrentScroll.y += 1;
				Tablero.translate(0,-1);
			}
		}
		
	
	}
	
}

Blank = new function () {
	this.draw = function() {};
	this.step = function() {};
}



ClarcassonneGameIU = new function ()  {
	
	this.initialize = function (idCanvasElement, party_id) {
		console.log("Estoy siendo llamado IU");
		Meteor.call("InicioJuego", party_id, SetPlayers);
		idCanvas = idCanvasElement;
		idParty = party_id;
		
		
	}
	
}

function sleep(miliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > miliseconds) {
			break;
		}
	}
}

$(function () {
	console.log(Meteor.userId());
	var cnvs = document.getElementById("game");
	var cnvsctx = cnvs.getContext && cnvs.getContext('2d');
	if(!cnvsctx) { return alert("Please upgrade your browser to play"); }
	cnvsctx.save();
	cnvsctx.fillRect(0,0,800,600);
	cnvsctx.fillStyle="rgb(255,255,255)";
	cnvsctx.font="bold 50px Arial";
	cnvsctx.fillText("Loading...", 270,355);  
	cnvsctx.restore();
	Meteor.call("InicioJuego", SetPlayers);
	idCanvas = "#game";
	idParty = "paco";
	urlSprite = 'images/sprites.png';
	Meteor.subscribe("partidas", idParty);
	Partidas.remove({_id: idParty});
	Partidas.insert({_id: idParty});
	
	
	

});
