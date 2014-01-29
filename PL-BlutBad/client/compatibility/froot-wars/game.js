// Declare all the commonly used objects as variables for convenience
var b2Vec2 = Box2D.Common.Math.b2Vec2;
var b2BodyDef = Box2D.Dynamics.b2BodyDef;
var b2Body = Box2D.Dynamics.b2Body;
var b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
var b2Fixture = Box2D.Dynamics.b2Fixture;
var b2World = Box2D.Dynamics.b2World;
var b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
var b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
var b2DebugDraw = Box2D.Dynamics.b2DebugDraw;

// Setup requestAnimationFrame and cancelAnimationFrame for use in the gameFroot code
(function() {
	var lastTime = 0;
	var vendors = ['ms', 'moz', 'webkit', 'o'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
		window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
		window.cancelAnimationFrame = 
		  window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
	}
 
	if (!window.requestAnimationFrame)
		window.requestAnimationFrame = function(callback, element) {
			var currTime = new Date().getTime();
			var timeToCall = Math.max(0, 16 - (currTime - lastTime));
			var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
			  timeToCall);
			lastTime = currTime + timeToCall;
			return id;
		};
 
	if (!window.cancelAnimationFrame)
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id);
		};
}());


//Lanzar frootWars
$(window).load(function() {
	gameFroot.init();
});




var gameFroot = {
	// Start initializing objects, preloading assets and display start screen
	init: function(){
		// Initialize objects   
		levels.init();
		loader.init();
		mouse.init();

		// Load All Sound Effects and Background Music
	
		//"Kindergarten" by Gurdonark
		//http://ccmixter.org/files/gurdonark/26491 is licensed under a Creative Commons license
		gameFroot.backgroundMusic = loader.loadSound('audio/gurdonark-kindergarten');

		gameFroot.slingshotReleasedSound = loader.loadSound("audio/released");
		gameFroot.bounceSound = loader.loadSound('audio/bounce');
		gameFroot.breakSound = {
			"glass":loader.loadSound('audio/glassbreak'),
			"wood":loader.loadSound('audio/woodbreak')
		};


		// Hide all gameFroot layers and display the start screen
		$('.gameFrootlayer').hide();
		$('#gameFrootstartscreen').show();

		//Get handler for gameFroot canvas and context
		//gameFroot.canvas = document.getElementById('gamecanvas');
		gameFroot.canvas = document.getElementById('gameFrootcanvas');
		gameFroot.context = gameFroot.canvas.getContext('2d');
	},	  
	startBackgroundMusic:function(){
		var toggleImage = $("#togglemusic")[0];	
		gameFroot.backgroundMusic.play();
		toggleImage.src="images/icons/sound.png";	
	},
	stopBackgroundMusic:function(){
		var toggleImage = $("#togglemusic")[0];	
		toggleImage.src="images/icons/nosound.png";	
		gameFroot.backgroundMusic.pause();
		gameFroot.backgroundMusic.currentTime = 0; // Go to the beginning of the song
	},
	toggleBackgroundMusic:function(){
		var toggleImage = $("#togglemusic")[0];
		if(gameFroot.backgroundMusic.paused){
			gameFroot.backgroundMusic.play();
			toggleImage.src="images/icons/sound.png";
		} else {
			gameFroot.backgroundMusic.pause();	
			$("#togglemusic")[0].src="images/icons/nosound.png";
		}
	},
	showLevelScreen:function(){
		$('.gameFrootlayer').hide();
		$('#levelselectscreen').show('slow');
	},
	restartLevel:function(){
		window.cancelAnimationFrame(gameFroot.animationFrame);		
		gameFroot.lastUpdateTime = undefined;
		levels.load(gameFroot.currentLevel.number);
	},
	startNextLevel:function(){
		window.cancelAnimationFrame(gameFroot.animationFrame);		
		gameFroot.lastUpdateTime = undefined;
		levels.load(gameFroot.currentLevel.number+1);
	},
	// gameFroot Mode
	mode:"intro", 
	// X & Y Coordinates of the slingshot
	slingshotX:140,
	slingshotY:280,
	start:function(){
		$('.gameFrootlayer').hide();
		// Display the gameFroot canvas and score 
		$('#gameFrootcanvas').show();
		$('#scorescreen').show();
	
		gameFroot.startBackgroundMusic();
	
		gameFroot.mode = "intro";	
		gameFroot.offsetLeft = 0;
		gameFroot.ended = false;
		gameFroot.animationFrame = window.requestAnimationFrame(gameFroot.animate,gameFroot.canvas);
	},	

	

	// Maximum panning speed per frame in pixels
	maxSpeed:3,
	// Minimum and Maximum panning offset
	minOffset:0,
	maxOffset:300,
	// Current panning offset
	offsetLeft:0,
	// The gameFroot score
	score:0,

	//Pan the screen to center on newCenter
	panTo:function(newCenter){
		if (Math.abs(newCenter-gameFroot.offsetLeft-gameFroot.canvas.width/4)>0 
			&& gameFroot.offsetLeft <= gameFroot.maxOffset && gameFroot.offsetLeft >= gameFroot.minOffset){
		
			var deltaX = Math.round((newCenter-gameFroot.offsetLeft-gameFroot.canvas.width/4)/2);
			if (deltaX && Math.abs(deltaX)>gameFroot.maxSpeed){
				deltaX = gameFroot.maxSpeed*Math.abs(deltaX)/(deltaX);
			}
			gameFroot.offsetLeft += deltaX; 
		} else {
			
			return true;
		}
		if (gameFroot.offsetLeft <gameFroot.minOffset){
			gameFroot.offsetLeft = gameFroot.minOffset;
			return true;
		} else if (gameFroot.offsetLeft > gameFroot.maxOffset){
			gameFroot.offsetLeft = gameFroot.maxOffset;
			return true;
		}		
		return false;
	},
	countHeroesAndVillains:function(){
		gameFroot.heroes = [];
		gameFroot.villains = [];
		for (var body = box2d.world.GetBodyList(); body; body = body.GetNext()) {
			var entity = body.GetUserData();
			if(entity){
				if(entity.type == "hero"){				
					gameFroot.heroes.push(body);			
				} else if (entity.type =="villain"){
					gameFroot.villains.push(body);
				}
			}
		}
	},
	mouseOnCurrentHero:function(){
		if(!gameFroot.currentHero){
			return false;
		}
		var position = gameFroot.currentHero.GetPosition();
		var distanceSquared = Math.pow(position.x*box2d.scale - mouse.x-gameFroot.offsetLeft,2) + Math.pow(position.y*box2d.scale-mouse.y,2);
		var radiusSquared = Math.pow(gameFroot.currentHero.GetUserData().radius,2);		
		return (distanceSquared<= radiusSquared);	
	},
	handlePanning:function(){
		   if(gameFroot.mode=="intro"){		
			   if(gameFroot.panTo(700)){
				   gameFroot.mode = "load-next-hero";
			   }			 
		   }	   

		   if (gameFroot.mode=="wait-for-firing"){  
			if (mouse.dragging){
				if (gameFroot.mouseOnCurrentHero()){
					gameFroot.mode = "firing";
				} else {
					gameFroot.panTo(mouse.x + gameFroot.offsetLeft)
				}
			} else {
				gameFroot.panTo(gameFroot.slingshotX);
			}
		}

		if (gameFroot.mode == "firing"){  
			if(mouse.down){
				gameFroot.panTo(gameFroot.slingshotX);				
				gameFroot.currentHero.SetPosition({x:(mouse.x+gameFroot.offsetLeft)/box2d.scale,y:mouse.y/box2d.scale});
			} else {
				gameFroot.mode = "fired";
				gameFroot.slingshotReleasedSound.play();								
				var impulseScaleFactor = 0.75;
				
				// Coordinates of center of slingshot (where the band is tied to slingshot)
				var slingshotCenterX = gameFroot.slingshotX + 35;
				var slingshotCenterY = gameFroot.slingshotY+25;
				var impulse = new b2Vec2((slingshotCenterX -mouse.x-gameFroot.offsetLeft)*impulseScaleFactor,(slingshotCenterY-mouse.y)*impulseScaleFactor);
				gameFroot.currentHero.ApplyImpulse(impulse,gameFroot.currentHero.GetWorldCenter());

			}
		}

		if (gameFroot.mode == "fired"){		
			//pan to wherever the current hero is...
			var heroX = gameFroot.currentHero.GetPosition().x*box2d.scale;
			gameFroot.panTo(heroX);

			//and wait till he stops moving  or is out of bounds 
			if(!gameFroot.currentHero.IsAwake() || heroX<0 || heroX >gameFroot.currentLevel.foregroundImage.width ){
				// then delete the old hero
				box2d.world.DestroyBody(gameFroot.currentHero);
				gameFroot.currentHero = undefined;
				// and load next hero
				gameFroot.mode = "load-next-hero";
			}
		}
		

		if (gameFroot.mode == "load-next-hero"){
			gameFroot.countHeroesAndVillains();

			// Check if any villains are alive, if not, end the level (success)
			if (gameFroot.villains.length == 0){
				gameFroot.mode = "level-success";
				return;
			}

			// Check if there are any more heroes left to load, if not end the level (failure)
			if (gameFroot.heroes.length == 0){
				gameFroot.mode = "level-failure"	
				return;		
			}

			// Load the hero and set mode to wait-for-firing
			if(!gameFroot.currentHero){
				gameFroot.currentHero = gameFroot.heroes[gameFroot.heroes.length-1];
				gameFroot.currentHero.SetPosition({x:180/box2d.scale,y:200/box2d.scale});
				gameFroot.currentHero.SetLinearVelocity({x:0,y:0});
				gameFroot.currentHero.SetAngularVelocity(0);
				gameFroot.currentHero.SetAwake(true);				
			} else {
				// Wait for hero to stop bouncing and fall asleep and then switch to wait-for-firing
				gameFroot.panTo(gameFroot.slingshotX);
				if(!gameFroot.currentHero.IsAwake()){
					gameFroot.mode = "wait-for-firing";
				}
			}
		   }	
   
			if(gameFroot.mode=="level-success" || gameFroot.mode=="level-failure"){		
				if(gameFroot.panTo(0)){
					gameFroot.ended = true;					
					gameFroot.showEndingScreen();
				}			 
			}
			

		},
		showEndingScreen:function(){
			gameFroot.stopBackgroundMusic();				
			if (gameFroot.mode=="level-success"){			
				if(gameFroot.currentLevel.number<levels.data.length-1){
					$('#endingmessage').html('Level Complete. Well Done!!!');
					$("#playnextlevel").show();
					
					//**************************CALL TO API********************************//
					ifg = Session.get('infoForGame');
					opt = {game_id: ifg.game_id,
						   torneo_id: ifg.torneo_id,
						   score:  gameFroot.score,
						   win: true,
						   }
					
					Meteor.call("matchFinish", opt);
				  //**********************************************************// 
					
					
				} else {
					$('#endingmessage').html('All Levels Complete. Well Done!!!');
					$("#playnextlevel").hide();


						
				   //**************************CALL TO API********************************//
					 ifg = Session.get('infoForGame');
					 opt = {game_id: ifg.game_id,
							torneo_id: ifg.torneo_id,
							score:  gameFroot.score,
							win: true,
							}
					 
					 Meteor.call("matchFinish", opt);
				   //**********************************************************//    		        
						
						
						

				}
			} else if (gameFroot.mode=="level-failure"){			
				
				//**************************CALL TO API********************************//
				ifg = Session.get('infoForGame');
				opt = {game_id: ifg.game_id,
					   torneo_id: ifg.torneo_id,
					   score:  gameFroot.score,
					   win: false,
					   }
				
				Meteor.call("matchFinish", opt);
			  //**********************************************************//    			        
				
				$('#endingmessage').html('Failed. Play Again?');
				$("#playnextlevel").hide();
			}		
	
			$('#endingscreen').show();
		},
	
	animate:function(){
		// Animate the background
		gameFroot.handlePanning();

		// Animate the characters
			var currentTime = new Date().getTime();
			var timeStep;
			if (gameFroot.lastUpdateTime){
				timeStep = (currentTime - gameFroot.lastUpdateTime)/1000;
				if(timeStep >2/60){
					timeStep = 2/60
				}
				box2d.step(timeStep);
			} 
			gameFroot.lastUpdateTime = currentTime;
	

		//  Draw the background with parallax scrolling
		gameFroot.context.drawImage(gameFroot.currentLevel.backgroundImage,gameFroot.offsetLeft/4,0,640,480,0,0,640,480);
		gameFroot.context.drawImage(gameFroot.currentLevel.foregroundImage,gameFroot.offsetLeft,0,640,480,0,0,640,480);

		// Draw the slingshot
		gameFroot.context.drawImage(gameFroot.slingshotImage,gameFroot.slingshotX-gameFroot.offsetLeft,gameFroot.slingshotY);

		// Draw all the bodies
		gameFroot.drawAllBodies();
	
		// Draw the band when we are firing a hero 
		if(gameFroot.mode == "wait-for-firing" || gameFroot.mode == "firing"){  
			gameFroot.drawSlingshotBand();
		}

		// Draw the front of the slingshot
		gameFroot.context.drawImage(gameFroot.slingshotFrontImage,gameFroot.slingshotX-gameFroot.offsetLeft,gameFroot.slingshotY);

		if (!gameFroot.ended){
			gameFroot.animationFrame = window.requestAnimationFrame(gameFroot.animate,gameFroot.canvas);
		}	
	},
	drawAllBodies:function(){  
		box2d.world.DrawDebugData();	

		// Iterate through all the bodies and draw them on the gameFroot canvas			  
		for (var body = box2d.world.GetBodyList(); body; body = body.GetNext()) {
			var entity = body.GetUserData();
  
			if(entity){
				var entityX = body.GetPosition().x*box2d.scale;
				if(entityX<0|| entityX>gameFroot.currentLevel.foregroundImage.width||(entity.health && entity.health <0)){
					box2d.world.DestroyBody(body);
					if (entity.type=="villain"){
						gameFroot.score += entity.calories;
						$('#score').html('Score: '+gameFroot.score);
					}
					if (entity.breakSound){
						entity.breakSound.play();
					}
				} else {
					entities.draw(entity,body.GetPosition(),body.GetAngle())				
				}	
			}
		}
	},
	drawSlingshotBand:function(){
		gameFroot.context.strokeStyle = "rgb(68,31,11)"; // Darker brown color
		gameFroot.context.lineWidth = 6; // Draw a thick line

		// Use angle hero has been dragged and radius to calculate coordinates of edge of hero wrt. hero center
		var radius = gameFroot.currentHero.GetUserData().radius;
		var heroX = gameFroot.currentHero.GetPosition().x*box2d.scale;
		var heroY = gameFroot.currentHero.GetPosition().y*box2d.scale;			
		var angle = Math.atan2(gameFroot.slingshotY+25-heroY,gameFroot.slingshotX+50-heroX);	
	
		var heroFarEdgeX = heroX - radius * Math.cos(angle);
		var heroFarEdgeY = heroY - radius * Math.sin(angle);
	
	
	
		gameFroot.context.beginPath();
		// Start line from top of slingshot (the back side)
		gameFroot.context.moveTo(gameFroot.slingshotX+50-gameFroot.offsetLeft, gameFroot.slingshotY+25);	

		// Draw line to center of hero
		gameFroot.context.lineTo(heroX-gameFroot.offsetLeft,heroY);
		gameFroot.context.stroke();		
	
		// Draw the hero on the back band
		entities.draw(gameFroot.currentHero.GetUserData(),gameFroot.currentHero.GetPosition(),gameFroot.currentHero.GetAngle());
			
		gameFroot.context.beginPath();		
		// Move to edge of hero farthest from slingshot top
		gameFroot.context.moveTo(heroFarEdgeX-gameFroot.offsetLeft,heroFarEdgeY);
	
		// Draw line back to top of slingshot (the front side)
		gameFroot.context.lineTo(gameFroot.slingshotX-gameFroot.offsetLeft +10,gameFroot.slingshotY+30)
		gameFroot.context.stroke();
	},

}
var levels = {
	// Level data

	data:[
	{   // First level 
		foreground:'desert-foreground',
		background:'clouds-background',
		entities:[
			{type:"ground", name:"dirt", x:500,y:440,width:1000,height:20,isStatic:true},
			{type:"ground", name:"wood", x:185,y:390,width:30,height:80,isStatic:true},

			{type:"block", name:"wood", x:520,y:380,angle:90,width:100,height:25},
			{type:"block", name:"glass", x:520,y:280,angle:90,width:100,height:25},								
			{type:"villain", name:"burger",x:520,y:205,calories:590},

			{type:"block", name:"wood", x:620,y:380,angle:90,width:100,height:25},
			{type:"block", name:"glass", x:620,y:280,angle:90,width:100,height:25},								
			{type:"villain", name:"fries", x:620,y:205,calories:420},				

			{type:"hero", name:"orange",x:80,y:405},
			{type:"hero", name:"apple",x:140,y:405},
		]
	},
		{   // Second level 
			foreground:'desert-foreground',
			background:'clouds-background',
			entities:[
				{type:"ground", name:"dirt", x:500,y:440,width:1000,height:20,isStatic:true},
				{type:"ground", name:"wood", x:185,y:390,width:30,height:80,isStatic:true},
	
				{type:"block", name:"wood", x:820,y:380,angle:90,width:100,height:25},
				{type:"block", name:"wood", x:720,y:380,angle:90,width:100,height:25},
				{type:"block", name:"wood", x:620,y:380,angle:90,width:100,height:25},
				{type:"block", name:"glass", x:670,y:317.5,width:100,height:25},
				{type:"block", name:"glass", x:770,y:317.5,width:100,height:25},				

				{type:"block", name:"glass", x:670,y:255,angle:90,width:100,height:25},
				{type:"block", name:"glass", x:770,y:255,angle:90,width:100,height:25},
				{type:"block", name:"wood", x:720,y:192.5,width:100,height:25},	

				{type:"villain", name:"burger",x:715,y:155,calories:590},
				{type:"villain", name:"fries",x:670,y:405,calories:420},
				{type:"villain", name:"sodacan",x:765,y:400,calories:150},

				{type:"hero", name:"strawberry",x:30,y:415},
				{type:"hero", name:"orange",x:80,y:405},
				{type:"hero", name:"apple",x:140,y:405},
			]
		},
		//tercer nivel si tienes el bono
		
			{   // Third level 
				foreground:'desert-foreground',
				background:'clouds-background',
				entities:[
					{type:"ground", name:"dirt", x:500,y:440,width:1000,height:20,isStatic:true},

					{type:"ground", name:"wood", x:185,y:390,width:30,height:80,isStatic:true},
					{type:"block", name:"wood", x:820,y:380,angle:90,width:100,height:25},
					{type:"block", name:"wood", x:720,y:380,angle:90,width:100,height:25},
					{type:"block", name:"wood", x:620,y:380,angle:90,width:100,height:25},

					{type:"block", name:"glass", x:670,y:317.5,width:100,height:25},
					{type:"block", name:"glass", x:770,y:317.5,width:100,height:25},				
					{type:"block", name:"glass", x:670,y:255,angle:90,width:100,height:25},
					{type:"block", name:"glass", x:770,y:255,angle:90,width:100,height:25},
					
					{type:"block", name:"wood", x:720,y:192.5,width:100,height:25},	

					{type:"villain", name:"burger",x:715,y:155,calories:590},
					{type:"villain", name:"fries",x:670,y:405,calories:420},
					{type:"villain", name:"sodacan",x:765,y:400,calories:150},
					{type:"villain", name:"pizza", x:715, y:200, calories: 300},

					{type:"hero", name:"strawberry",x:30,y:415},
					{type:"hero", name:"orange",x:80,y:405},
					{type:"hero", name:"apple",x:140,y:405},
				]
			}
	],

	// Initialize level selection screen
	init:function(){
		var html = "";
		id_bono=Bono.findOne({numeracion:4})._id;
    	if (Meteor.user()!=null && User_Bono.findOne({user_id: Meteor.user()._id, bono_id: id_bono}) && User_Bono.findOne({user_id: Meteor.user()._id, bono_id: id_bono}).n_bono>=1 ){
        	//actualizo el bono
        	bobj=User_Bono.findOne({user_id:Meteor.user()._id, bono_id:id_bono});
        	User_Bono.update(bobj._id,{
            	$set: {
            	    'n_bono':bobj.n_bono-1,
          	  }
       		});
			for (var i=0; i < levels.data.length; i++) {
				var level = levels.data[i];
				html += '<input type="button" value="'+(i+1)+'">';
			};
		}else{
			for (var i=0; i < levels.data.length-1; i++) {
				var level = levels.data[i];
				html += '<input type="button" value="'+(i+1)+'">';
			};
		}
		$('#levelselectscreen').html(html);
		
		// Set the button click event handlers to load level
		$('#levelselectscreen input').click(function(){
			levels.load(this.value-1);
			$('#levelselectscreen').hide();
		});
	},

	// Load all data and images for a specific level
	load:function(number){
	   //Initialize box2d world whenever a level is loaded
		box2d.init();

		// declare a new current level object
		gameFroot.currentLevel = {number:number,hero:[]};
		gameFroot.score=0;
		$('#score').html('Score: '+gameFroot.score);
		gameFroot.currentHero = undefined;
		var level = levels.data[number];


		//load the background, foreground and slingshot images
		gameFroot.currentLevel.backgroundImage = loader.loadImage("images/backgrounds/"+level.background+".png");
		gameFroot.currentLevel.foregroundImage = loader.loadImage("images/backgrounds/"+level.foreground+".png");
		gameFroot.slingshotImage = loader.loadImage("images/slingshot.png");
		gameFroot.slingshotFrontImage = loader.loadImage("images/slingshot-front.png");

		// Load all the entities
		for (var i = level.entities.length - 1; i >= 0; i--){	
			var entity = level.entities[i];
			entities.create(entity);			
		};

		  //Call gameFroot.start() once the assets have loaded
	   if(loader.loaded){
		   gameFroot.start()
	   } else {
		   loader.onload = gameFroot.start;
	   }
	}
}


var entities = {
	definitions:{
		"glass":{
			fullHealth:100,
			density:2.4,
			friction:0.4,
			restitution:0.15,
		},
		"wood":{
			fullHealth:500,
			density:0.7,
			friction:0.4,
			restitution:0.4,
		},
		"dirt":{
			density:3.0,
			friction:1.5,
			restitution:0.2,	
		},
		"burger":{
			shape:"circle",
			fullHealth:40,
			radius:25,
			density:1,
			friction:0.5,
			restitution:0.4,	
		},
		"sodacan":{
			shape:"rectangle",
			fullHealth:80,
			width:40,
			height:60,
			density:1,
			friction:0.5,
			restitution:0.7,	
		},
		"pizza":{
			shape:"rectangle",
			fullHealth:80,
			width:40,
			height:40,
			density:1,
			friction:0.5,
			restitution:0.5,	
		},
		"fries":{
			shape:"rectangle",
			fullHealth:50,
			width:40,
			height:50,
			density:1,
			friction:0.5,
			restitution:0.6,	
		},
		"apple":{
			shape:"circle",
			radius:25,
			density:1.5,
			friction:0.5,
			restitution:0.4,	
		},
		"orange":{
			shape:"circle",
			radius:25,
			density:1.5,
			friction:0.5,
			restitution:0.4,	
		},
		"strawberry":{
			shape:"circle",
			radius:15,
			density:2.0,
			friction:0.5,
			restitution:0.4,	
		},
	},
	// take the entity, create a box2d body and add it to the world
	create:function(entity){
		var definition = entities.definitions[entity.name];	
		if(!definition){
			console.log ("Undefined entity name",entity.name);
			return;
		}	
		switch(entity.type){
			case "block": // simple rectangles
				entity.health = definition.fullHealth;
				entity.fullHealth = definition.fullHealth;
				entity.shape = "rectangle";	
				entity.sprite = loader.loadImage("images/entities/"+entity.name+".png");						
				entity.breakSound = gameFroot.breakSound[entity.name];
				box2d.createRectangle(entity,definition);				
				break;
			case "ground": // simple rectangles
				// No need for health. These are indestructible
				entity.shape = "rectangle";  
				// No need for sprites. These won't be drawn at all   
				box2d.createRectangle(entity,definition);			   
				break;	
			case "hero":	// simple circles
			case "villain": // can be circles or rectangles
				entity.health = definition.fullHealth;
				entity.fullHealth = definition.fullHealth;
				entity.sprite = loader.loadImage("images/entities/"+entity.name+".png");
				entity.shape = definition.shape;  
				entity.bounceSound = gameFroot.bounceSound;
				if(definition.shape == "circle"){
					entity.radius = definition.radius;
					box2d.createCircle(entity,definition);					
				} else if(definition.shape == "rectangle"){
					entity.width = definition.width;
					entity.height = definition.height;
					box2d.createRectangle(entity,definition);					
				}												 
				break;							
			default:
				console.log("Undefined entity type",entity.type);
				break;
		}		
	},

	// take the entity, its position and angle and draw it on the gameFroot canvas
	draw:function(entity,position,angle){
		gameFroot.context.translate(position.x*box2d.scale-gameFroot.offsetLeft,position.y*box2d.scale);
		gameFroot.context.rotate(angle);
		switch (entity.type){
			case "block":
				gameFroot.context.drawImage(entity.sprite,0,0,entity.sprite.width,entity.sprite.height,
						-entity.width/2-1,-entity.height/2-1,entity.width+2,entity.height+2);	
			break;
			case "villain":
			case "hero": 
				if (entity.shape=="circle"){
					gameFroot.context.drawImage(entity.sprite,0,0,entity.sprite.width,entity.sprite.height,
							-entity.radius-1,-entity.radius-1,entity.radius*2+2,entity.radius*2+2);	
				} else if (entity.shape=="rectangle"){
					gameFroot.context.drawImage(entity.sprite,0,0,entity.sprite.width,entity.sprite.height,
							-entity.width/2-1,-entity.height/2-1,entity.width+2,entity.height+2);
				}
				break;				
			case "ground":
				// do nothing... We will draw objects like the ground & slingshot separately
				break;
		}

		gameFroot.context.rotate(-angle);
		gameFroot.context.translate(-position.x*box2d.scale+gameFroot.offsetLeft,-position.y*box2d.scale);
	}

}

var box2d = {
	scale:30,
	init:function(){
		// Setup the box2d World that will do most of they physics calculation
		var gravity = new b2Vec2(0,9.8); //declare gravity as 9.8 m/s^2 downwards
		var allowSleep = true; //Allow objects that are at rest to fall asleep and be excluded from calculations
		box2d.world = new b2World(gravity,allowSleep);

	
		var listener = new Box2D.Dynamics.b2ContactListener;
		listener.PostSolve = function(contact,impulse){
			var body1 = contact.GetFixtureA().GetBody();
			var body2 = contact.GetFixtureB().GetBody();
			var entity1 = body1.GetUserData();
			var entity2 = body2.GetUserData();

			var impulseAlongNormal = Math.abs(impulse.normalImpulses[0]);
			// This listener is called a little too often. Filter out very tiny impulses.
			// After trying different values, 5 seems to work well 
			if(impulseAlongNormal>5){
				// If objects have a health, reduce health by the impulse value				
				if (entity1.health){
					entity1.health -= impulseAlongNormal;
				}	

				if (entity2.health){
					entity2.health -= impulseAlongNormal;
				}	
		
				// If objects have a bounce sound, play them				
				if (entity1.bounceSound){
					entity1.bounceSound.play();
				}

				if (entity2.bounceSound){
					entity2.bounceSound.play();
				}
			} 
		};
		box2d.world.SetContactListener(listener);
	},  
	step:function(timeStep){
		// velocity iterations = 8
		// position iterations = 3
		box2d.world.Step(timeStep,8,3);
	},
	createRectangle:function(entity,definition){
			var bodyDef = new b2BodyDef;
			if(entity.isStatic){
				bodyDef.type = b2Body.b2_staticBody;
			} else {
				bodyDef.type = b2Body.b2_dynamicBody;
			}
			
			bodyDef.position.x = entity.x/box2d.scale;
			bodyDef.position.y = entity.y/box2d.scale;
			if (entity.angle) {
				bodyDef.angle = Math.PI*entity.angle/180;
			}
			
			var fixtureDef = new b2FixtureDef;
			fixtureDef.density = definition.density;
			fixtureDef.friction = definition.friction;
			fixtureDef.restitution = definition.restitution;

			fixtureDef.shape = new b2PolygonShape;
			fixtureDef.shape.SetAsBox(entity.width/2/box2d.scale,entity.height/2/box2d.scale);
			
			var body = box2d.world.CreateBody(bodyDef);	
			body.SetUserData(entity);
			
			var fixture = body.CreateFixture(fixtureDef);
			return body;
	},
	
	createCircle:function(entity,definition){
			var bodyDef = new b2BodyDef;
			if(entity.isStatic){
				bodyDef.type = b2Body.b2_staticBody;
			} else {
				bodyDef.type = b2Body.b2_dynamicBody;
			}
			
			bodyDef.position.x = entity.x/box2d.scale;
			bodyDef.position.y = entity.y/box2d.scale;
			
			if (entity.angle) {
				bodyDef.angle = Math.PI*entity.angle/180;
			}			
			var fixtureDef = new b2FixtureDef;
			fixtureDef.density = definition.density;
			fixtureDef.friction = definition.friction;
			fixtureDef.restitution = definition.restitution;

			fixtureDef.shape = new b2CircleShape(entity.radius/box2d.scale);
			
			var body = box2d.world.CreateBody(bodyDef);	
			body.SetUserData(entity);

			var fixture = body.CreateFixture(fixtureDef);
			return body;
	},  
}


var loader = {
	loaded:true,
	loadedCount:0, // Assets that have been loaded so far
	totalCount:0, // Total number of assets that need to be loaded
	
	init:function(){
		// check for sound support
		var mp3Support,oggSupport;
		var audio = document.createElement('audio');
		if (audio.canPlayType) {
			// Currently canPlayType() returns: "", "maybe" or "probably" 
			mp3Support = "" != audio.canPlayType('audio/mpeg');
			oggSupport = "" != audio.canPlayType('audio/ogg; codecs="vorbis"');
		} else {
			//The audio tag is not supported
			mp3Support = false;
			oggSupport = false;	
		}

		// Check for ogg, then mp3, and finally set soundFileExtn to undefined
		loader.soundFileExtn = oggSupport?".ogg":mp3Support?".mp3":undefined;		
	},
	
	loadImage:function(url){
		this.totalCount++;
		this.loaded = false;
		$('#loadingscreen').show();
		var image = new Image();
		image.src = url;
		image.onload = loader.itemLoaded;
		return image;
	},
	soundFileExtn:".ogg",
	loadSound:function(url){
		this.totalCount++;
		this.loaded = false;
		$('#loadingscreen').show();
		var audio = new Audio();
		audio.src = url+loader.soundFileExtn;
		audio.addEventListener("canplaythrough", loader.itemLoaded, false);
		return audio;   
	},
	itemLoaded:function(){
		loader.loadedCount++;
		$('#loadingmessage').html('Loaded '+loader.loadedCount+' of '+loader.totalCount);
		if (loader.loadedCount === loader.totalCount){
			// Loader has loaded completely..
			loader.loaded = true;
			// Hide the loading screen 
			$('#loadingscreen').hide();
			//and call the loader.onload method if it exists
			if(loader.onload){
				loader.onload();
				loader.onload = undefined;
			}
		}
	}
}

var mouse = {
	x:0,
	y:0,
	down:false,
	init:function(){
		$('#gameFrootcanvas').mousemove(mouse.mousemovehandler);
		$('#gameFrootcanvas').mousedown(mouse.mousedownhandler);
		$('#gameFrootcanvas').mouseup(mouse.mouseuphandler);
		$('#gameFrootcanvas').mouseout(mouse.mouseuphandler);
	},
	mousemovehandler:function(ev){
		var offset = $('#gameFrootcanvas').offset();
		
		mouse.x = ev.pageX - offset.left;
		mouse.y = ev.pageY - offset.top;
		
		if (mouse.down) {
			mouse.dragging = true;
		}
	},
	mousedownhandler:function(ev){
		mouse.down = true;
		mouse.downX = mouse.x;
		mouse.downY = mouse.y;
		ev.originalEvent.preventDefault();
		
	},
	mouseuphandler:function(ev){
		mouse.down = false;
		mouse.dragging = false;
	}
}

