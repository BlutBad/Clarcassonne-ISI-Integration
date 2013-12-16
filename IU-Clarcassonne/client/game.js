sprites = {
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
img.src = 'Clarcassonne/images/background.png';

var img2 = new Image();
img2.src = 'Clarcassonne/images/abajo.png';

var img3 = new Image();
img3.src = 'Clarcassonne/images/musica.png';

var img4 = new Image();
img4.src = 'Clarcassonne/images/ControlHelp.png';




CurrentScroll = {x:70,y:70,active: true};

CurrentMove = 0;
CurrentTurn = 0;
sonar = 1;



function SetPlayers (err, data) {
	Jugador1 = {nombre: data[0].nombre, color: "ficha_rojo", puntos: data[0].puntos, id: "DX6EHwZNZwLezftTz", turno:1};
	Jugador2 = {nombre: data[1].nombre  , color: "ficha_azul", puntos:data[1].puntos, id: data[1].id, turno: 0};
	Jugador3 = {nombre: data[2].nombre  , color: "ficha_amarillo", puntos:data[2].puntos, id: data[2].id, turno: 0};
	if (data.length >= 4) {
		Jugador4 = {nombre: data[3].nombre    , color: "ficha_verde", puntos:data[3].puntos, id: data[3].id, turno: 0};
	}
	if (data.length == 5) {
		Jugador5 = {nombre: data[4].nombre   , color: "ficha_gris", puntos:data[4].puntos, id: data[4].id, turno: 0};
	}
	nJugadores = data.length;
	Game.initialize(idCanvas.slice(1),sprites,startGame);
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
startGame = function() {   
	
	
	Game.setBoard(0,new Background());
	Game.setBoard(1,new Jugadores());
	Game.setBoard(2,new Rejilla()); 
	Game.setBoard(3,new Scroll()); 
	
	Tablero = new GameBoard();
	Game.setBoard(4,Tablero);
	
	Game.setBoard(5,new Ficha_abajo());
	Game.setBoard(9,new Helptext()); 
	Game.setBoard(10, new Time());	
	Game.setBoard(11, new HelpScreen());

	
	
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
			pasarTurno();
			turno = CurrentTurn;
			Game.setBoard(7, Blank);
			Game.setBoard(8, Blank);
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
		
		if(sonar == 1){
		      ctx.fillText("pulsa 'm' para silenciar y 'n' para volver a sonar", 250,465);  
		}
		
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
		if(!Game.keys['help']) up = true;
    	if(up && Game.keys['help']) {
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
    	
	var up = false;
	var NuevaPieza;
	this.step = function(dt) {
         /*if(!Game.keys['sonar']) sonar = true;
        
        if(sonar && Game.keys['sonar']) {
                sonar = false;
        }*/
 
		 if(Game.keys['sonar']&& sonar == 0){
		            console.log("doy a sonar");
		            console.log(sonar);
		            sonar = 1;
		 }
		 if(Game.keys['sonar']&&sonar == 1){
		            console.log("doy a mutar");
		            console.log(sonar);
		            sonar = 0;
		}
        
	if(!Game.keys['sacar_ficha']) up = true;
	
    	if(up && Game.keys['sacar_ficha']) {
    		up = false;
    		//console.log(Meteor.userId());
    		if (CurrentMove == 0 && getTurno().id == Meteor.userId())  {
    			
    			Meteor.call("Robar", function(err, data) { 
    					NuevaPieza = new PiezaMapa(CurrentScroll.x + 7,CurrentScroll.y + 5, data[0],0);
			
						sonido_ladron.play();
			
						Game.setBoard(7, NuevaPieza);
						CurrentMove = 1; 
						console.log(data);
					});
			
		} else if (CurrentMove == 1 && getTurno().id == Meteor.userId()) {
		
			Meteor.call("ColocarFicha", idParty, NuevaPieza.sprite, {x: NuevaPieza.x, y: NuevaPieza.y}, function(err, data) { 
			
    					Game.setBoard(8,new Set(NuevaPieza));
					CurrentMove = 2;
					
			});
		
		
		
		
		
			
		}
	}
		
}
};



Jugadores = function() {  
   this.draw = function(ctx){
     // ctx.beginPath();
      ctx.save();
      ctx.font="bold 25px Arial";
      
      ctx.fillStyle="rgb(255,255," + Jugador1.turno * 255 +")";
      ctx.fillText(Jugador1.nombre,45,540);
      SpriteSheet.draw(ctx, Jugador1.color ,20,520,1,0,0.5);
      ctx.fillText(Jugador1.puntos,50,570);
      
      ctx.fillStyle="rgb(255,255," + Jugador2.turno * 255 +")";
      ctx.fillText(Jugador2.nombre,175,540);
      SpriteSheet.draw(ctx,Jugador2.color,150,520,1,0,0.5);
      ctx.fillText(Jugador2.puntos,180,570);
      
      ctx.fillStyle="rgb(255,255," + Jugador3.turno * 255 +")";
      ctx.fillText(Jugador3.nombre,305,540);
      SpriteSheet.draw(ctx,Jugador3.color,280,520,1,0,0.5);
      ctx.fillText(Jugador3.puntos,310,570);
      
      if (nJugadores >= 4) {
      	 ctx.fillStyle="rgb(255,255," + Jugador4.turno * 255 +")";
     	 ctx.fillText(Jugador4.nombre,435,540);
      	 SpriteSheet.draw(ctx,Jugador4.color,410,520,1,0,0.5);
     	 ctx.fillText(Jugador4.puntos,440,570);
      }
      if (nJugadores == 5) {
      	 ctx.fillStyle="rgb(255,255," + Jugador5.turno * 255 +")";
      	 ctx.fillText(Jugador5.nombre,565,540);
      	 SpriteSheet.draw(ctx,Jugador5.color,540,520,1,0,0.5);
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
				SpriteSheet.draw(ctx,this.sprite,this.x,this.y,1,this.rotation,1);
			}
		} else {
			SpriteSheet.draw(ctx,this.sprite,this.x,this.y,1,this.rotation,1);
		}
	}
	
	var init = false;
	var rotacion = false;
	var mouseIsDown = false;
	
	this.step = function () { 

		var that = this;
	   
		if (this.colocada == false ) {
		
		
			if(!Game.keys['rotar']) rotacion = true;
			if(rotacion && Game.keys['rotar']) {
				rotacion = false;
				this.rotation = this.rotation -90;
			}
	
			if (init == false) {
				$(idCanvas).mousedown(function(e){
	          	  	if (that.colocada == false ) {
	         
						if (e.clientX > that.x && e.clientY > that.y && e.clientX < that.x + 100 && e.clientY < that.y + 100){
							posicion_x = e.clientX - that.x;
							posicion_y = e.clientY - that.y;
	                  
							mouseIsDown = true;
						}
					}
				})
		
				$(idCanvas).mouseup(function(e){
       		 	 // cuando mueves. soltar ficha en una casilla
                	if (that.colocada == false ) {
						that.x = Math.floor(e.clientX/100)* 100;
						that.y = Math.floor(e.clientY/100)* 100;
					}
					mouseIsDown = false;
				})
               

				$(idCanvas).mousemove(function(e){
             
					if(!mouseIsDown) return;
   					if (that.colocada == false ) {
						that.x = e.clientX - posicion_x;
						that.y = e.clientY - posicion_y;
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
    	if(!Game.keys['ayuda']) up = true;
    	if(up && Game.keys['ayuda']) {
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
		SpriteSheet.draw(ctx,this.sprite,this.x + this.posx,this.y + this.posy,1,0,0.5);
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
			Game.setBoard(8,Blank);
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
                		SpriteSheet.draw(ctx,this.pieza.sprite,370,195,1,this.pieza.rotation,1.5);
            		} else if (this.pieza.rotation == -90) {
                		SpriteSheet.draw(ctx,this.pieza.sprite,370,245,1,this.pieza.rotation,1.5);
            		} else if (this.pieza.rotation == -180) {
                		SpriteSheet.draw(ctx,this.pieza.sprite,420,245,1,this.pieza.rotation,1.5);
            		} else if (this.pieza.rotation == -270) {
                		SpriteSheet.draw(ctx,this.pieza.sprite,420,195,1,this.pieza.rotation,1.5);
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
		if (CurrentScroll.active) CurrentScroll.active = false;
		
		if(!Game.keys['back']) up6 = true;
		if(up6 && Game.keys['back']) {
			up6 = false;
			this.menu -= 1;
			this.option = 0; 
			this.optionx = 0;
			this.optiony = 0; 
		}
		
		if (this.menu == 0) {
			if(!Game.keys['up']) up1 = true;
			if(up1 && Game.keys['up']) {
				up1 = false;
				if (this.option > 0) {
					this.option -= 1;
				}
			}
			
			if(!Game.keys['down']) up2 = true;
			if(up2 && Game.keys['down']) {
				up2 = false;
				if (this.option < 4) {
					this.option += 1;
				}
			}
			
			if(!Game.keys['sacar_ficha']) up3 = true;
			if(up3 && Game.keys['sacar_ficha']) {
				up3 = false;
				if (this.option > 0) {
					this.menu += 1;
				} else {
					// Coloco la ficha en el mapa
					this.pieza.colocada = true;
					Tablero.add(this.pieza);
					Game.setBoard(8,Blank);
					Game.setBoard(7, Blank);
					CurrentScroll.active = true;
					pasarTurno();

				}
			}


		}
		
		if (this.menu == 1) {
		
			if(!Game.keys['up']) up1 = true;
			if(up1 && Game.keys['up']) {
				up1 = false;
				if (this.optiony > 0) {
					this.optiony -= 1;
				}
			}
			
			if(!Game.keys['down']) up2 = true;
			if(up2 && Game.keys['down']) {
				up2 = false;
				if (this.optiony < 2) {
					this.optiony += 1;
				}
			}
			if(!Game.keys['left']) up4 = true;
			if(up4 && Game.keys['left']) {
				up4 = false;
				if (this.optionx > 0) {
					this.optionx -= 1;
				}
			}
			
			if(!Game.keys['right']) up5 = true;
			if(up5 && Game.keys['right']) {
				up5 = false;
				if (this.optionx < 2) {
					this.optionx += 1;
				}
			}
			
			if(!Game.keys['sacar_ficha']) up3 = true;
			if(up3 && Game.keys['sacar_ficha']) {
				up3 = false;
				// Coloco la ficha en el mapa en la posicion optionx,optiony
				this.pieza.colocada = true;
				Tablero.add(this.pieza);
				Tablero.add(new Seguidor (this.pieza.x/100,this.pieza.y/100,this.setSeguidorType(),this.optionx,this.optiony));
				Game.setBoard(8,Blank);
				Game.setBoard(7, Blank);
				CurrentScroll.active = true;
				pasarTurno();
				
			}
		}
	}
	
	this.setSeguidorType = function () {
		var color = (function () { 
							var ficha_color = getTurno().color; 
							var color = ficha_color.indexOf("_") + 1; 
							return ficha_color.slice(color);
						})(); 
		 if(Game.keys['sonar']&& sonar == 0){
		           
		            sonar = 1;
		 }
		 if(Game.keys['silenciar']&&sonar == 1){
		            sonar = 0;
		}
        
        if (sonar == 1){
        
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
		}else if (sonar == 0){
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
		if(!Game.keys['left']) up1 = true;
		if(up1 && Game.keys['left']) {
			up1 = false;
			if (this.scrollx != 0) {
				this.scrollx -= 1;
				CurrentScroll.x -= 1;
				Tablero.translate(1,0);
				
			}
		}
		if(!Game.keys['right']) up2 = true;
		if(up2 && Game.keys['right']) {
			up2 = false;
			if (this.scrollx != this.width) {
				this.scrollx += 1;
				CurrentScroll.x += 1;
				Tablero.translate(-1,0);
				
			}
		}
		if(!Game.keys['up']) up3 = true;
		if(up3 && Game.keys['up']) {
			up3 = false;
			if (this.scrolly != 0) {
				this.scrolly -= 1;
				CurrentScroll.y -= 1;
				Tablero.translate(0,1);
				
			}
		}
		if(!Game.keys['down']) up4 = true;
		if(up4 && Game.keys['down']) {
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



ClarcassonneGameIU = function ()  {

	this.initialize = function () (idCanvasElement, sprite_url, callback, party_id) {
	
		Meteor.call("InicioJuego", party_id, SetPlayers);
		idCanvas = idCanvasElement;
		idParty = party_id;
	}
	
}

//$(function () {
//	Meteor.call("InicioJuego", SetPlayers);
//	idCanvas = "#game";
//	urlSprite = 'images/sprites.png';
//
//});
