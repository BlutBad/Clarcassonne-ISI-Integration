sprites = {
        Rrecta: { sx: 0, sy: 0, w:100, h: 100, frames: 1 },
        Rcurva: { sx: -200, sy: 400, w: 100, h: 100, frames: 1 },
        Catedral: { sx: -200, sy: 500, w: 100, h: 100, frames: 1 },
        Posada: { sx: 0, sy: 400, w: 100, h: 100, frames: 1 },
        Ccruze: { sx: 0, sy: 200, w: 100, h: 100, frames: 1 },
        CiudadE: { sx: 100, sy: 0, w: 100, h: 100, frames: 1 },
        Ciudad3lc: { sx: 400, sy: 0, w: 100, h: 100, frames: 1 },
        Ciudad3lcE: { sx: 300, sy: 0, w: 100, h: 100, frames: 1 },
        Ciudad3l: { sx: 300, sy: 100, w: 100, h: 100, frames: 1 },
        Ciudad3lE: { sx: 100, sy: 100, w: 100, h: 100, frames: 1 },
        Ciudad2lc: { sx: 200, sy: 200, w: 100, h: 100, frames: 1 },
        Ciudad2lcE: { sx: 100, sy: 200, w: 100, h: 100, frames: 1 },
        Ciudad2l: { sx: 300, sy: 300, w: 100, h: 100, frames: 1 },
        Ciudad2lE: { sx: 100, sy: 400, w: 100, h: 100, frames: 1 },
        CiudadPuerta: { sx: 400, sy: 400, w: 100, h: 100, frames: 1 },
        CiudadPuertaE: { sx: 300, sy: 400, w: 100, h: 100, frames: 1 },
        Ciudadext: { sx: 300, sy: 500, w: 100, h: 100, frames: 1 },
        Ciudad1l2crect: { sx: 500, sy: 0, w: 100, h: 100, frames: 1 },
        Ciudadcurvder: { sx: 500, sy: 100, w: 100, h: 100, frames: 1 },
        Ciudadcurvizq: { sx: 500, sy: 200, w: 100, h: 100, frames: 1 },
        Ciudad1lcruze: { sx: 500, sy: 300, w: 100, h: 100, frames: 1 },
        
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

Jugador1 = {nombre: "Carlos" , color: "ficha_rojo", puntos:0, turno:0};
Jugador2 = {nombre: "Mario"  , color: "ficha_azul", puntos:10, turno: 1};
Jugador3 = {nombre: "Maria"  , color: "ficha_amarillo", puntos:20, turno: 0};
Jugador4 = {nombre: "Ana"    , color: "ficha_verde", puntos:30, turno: 0};

CurrentScroll = {x:70,y:70,active: true};

function getTurno () {
	if (Jugador1.turno == 1) return Jugador1;
	if (Jugador2.turno == 1) return Jugador2;
	if (Jugador3.turno == 1) return Jugador3;
	if (Jugador4.turno == 1) return Jugador4;
}

function pasarTurno () {
	if (Jugador1.turno == 1) { Jugador2.turno = 1; Jugador1.turno = 0;}
	if (Jugador2.turno == 1) { Jugador3.turno = 1; Jugador2.turno = 0;}
	if (Jugador3.turno == 1) { Jugador4.turno = 1; Jugador3.turno = 0;}
	if (Jugador4.turno == 1) { Jugador1.turno = 1; Jugador4.turno = 0;}
}



startGame = function() {    
	Game.setBoard(0,new Background());
	Game.setBoard(1,new Jugadores());
	Game.setBoard(2,new Rejilla()); 
	Game.setBoard(3,new Scroll()); 
	
	Tablero = new GameBoard();
	Game.setBoard(4,Tablero);
	
	Tablero.add(new PiezaMapa(75,73,'Rrecta',90));
	
	Game.setBoard(5,new Ficha_abajo());
	//Game.setBoard(6,new Set(new PiezaMapa(72,72,'Rrecta',0)));

	
	

};


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
		ctx.drawImage(img2, 500, 500);   		
    }
    this.step = function(dt) { 
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
      
      ctx.fillStyle="rgb(255,255," + Jugador4.turno * 255 +")";
      ctx.fillText(Jugador4.nombre,435,540);
      SpriteSheet.draw(ctx,Jugador4.color,410,520,1,0,0.5);
      ctx.fillText(Jugador4.puntos,440,570);

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
	this.step= function(dt){};
}; 

PiezaMapa = function (cx,cy, sprite,rotate) {
	this.x = 100*(cx - CurrentScroll.x); // cx + scrollX
	this.y = 100*(cy - CurrentScroll.y); // cy + scrollY
	this.rotation = rotate;
	this.sprite = sprite;
	this.type = 'PiezaMapa';
	
	this.draw = function (ctx) {
		if (this.y < 500 && this.y >= 0 && this.x >= 0 && this.x < 800) {
			SpriteSheet.draw(ctx,this.sprite,this.x,this.y,1,this.rotation,1);
		}
	}
	
	this.step = function () { }

}




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
	
	this.step = function () { }
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
			Game.setBoard(6,Blank);
			CurrentScroll.active = true;
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
			SpriteSheet.draw(ctx,this.pieza.sprite,370,195,1,this.pieza.rotation,1.5);
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
					Tablero.add(this.pieza);
					Game.setBoard(6,Blank);
					CurrentScroll.active = true;

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
				Tablero.add(this.pieza);
				Tablero.add(new Seguidor (this.pieza.x/100,this.pieza.y/100,this.setSeguidorType(),this.optionx,this.optiony));
				Game.setBoard(6,Blank);
				CurrentScroll.active = true;
				
			}
		}
	}
	
	this.setSeguidorType = function () {
		var color = (function () { 
							var ficha_color = getTurno().color; 
							var color = ficha_color.indexOf("_") + 1; 
							return ficha_color.slice(color);
						})(); 
		if (this.option == 1){
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

$(function() {
    Game.initialize("game",sprites,startGame);
});
