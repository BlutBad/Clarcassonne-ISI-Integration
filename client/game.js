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
        
        ficha_roja: { sx: 1152, sy: 0, w: 48, h: 48, frames: 1 },
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

Jugador1 = {nombre: "Carlos" , color: "ficha_roja", puntos:0, turno:1};
Jugador2 = {nombre: "Mario"  , color: "ficha_azul", puntos:10, turno: 0};
Jugador3 = {nombre: "Maria"  , color: "ficha_amarillo", puntos:20, turno: 0};
Jugador4 = {nombre: "Ana"    , color: "ficha_verde", puntos:30, turno: 0};



startGame = function() {    
	Game.setBoard(0,new Background());
	Game.setBoard(1,new Jugadores());
	Game.setBoard(2,new Rejilla()); 
	  
	var board = new GameBoard();
	board.add(new Scroll());
	Game.setBoard(3,board);
	
	board.add(new PiezaMapa(2,2,'Rrecta',90));
	

};


// Se encarga de pintar el fondo del juego
Background = function() {
    this.draw = function(ctx) {
		ctx.drawImage(img, 0, 0);   		
    }
    this.step = function(dt) { }
};

Jugadores = function() {  
   this.draw = function(ctx){
     // ctx.beginPath();
      ctx.save();
      ctx.fillStyle="rgb(255,255,0)";
      ctx.font="bold 25px Arial";
      
      ctx.fillText(Jugador1.nombre,45,540);
      SpriteSheet.draw(ctx, Jugador1.color ,20,520,1,0,0.5);
      ctx.fillText(Jugador1.puntos,50,570);
      
      ctx.fillText(Jugador2.nombre,175,540);
      SpriteSheet.draw(ctx,Jugador2.color,150,520,1,0,0.5);
      ctx.fillText(Jugador2.puntos,180,570);
      
      ctx.fillText(Jugador3.nombre,305,540);
      SpriteSheet.draw(ctx,Jugador3.color,280,520,1,0,0.5);
      ctx.fillText(Jugador3.puntos,310,570);
      
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
	this.x = 100*cx; // cx + scrollX
	this.y = 100*cy; // cy + scrollY
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


seguidor = function (cx,cy, sprite,rotate) {
	this.x = 100*cx;
	this.y = 100*cy;
	
	this.draw = function (ctx) {
		ctx.rotate(rotate*Math.PI/180);
		SpriteSheet.draw(ctx,sprite,this.x,this.y,1);
	}
	
	this.step = function () { }
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
		if(!Game.keys['left']) up1 = true;
		if(up1 && Game.keys['left']) {
			up1 = false;
			if (this.scrollx != 0) {
				this.scrollx -= 1;
				this.board.translate(1,0);
				
			}
		}
		if(!Game.keys['right']) up2 = true;
		if(up2 && Game.keys['right']) {
			up2 = false;
			if (this.scrollx != this.width) {
				this.scrollx += 1;
				this.board.translate(-1,0);
				
			}
		}
		if(!Game.keys['up']) up3 = true;
		if(up3 && Game.keys['up']) {
			up3 = false;
			if (this.scrolly != 0) {
				this.scrolly -= 1;
				this.board.translate(0,1);
				
			}
		}
		if(!Game.keys['down']) up4 = true;
		if(up4 && Game.keys['down']) {
			up4 = false;
			if (this.scrolly != this.height) {
				this.scrolly += 1;
				this.board.translate(0,-1);
			}
		}
		
	
	}
	
}

$(function() {
    Game.initialize("game",sprites,startGame);
});
