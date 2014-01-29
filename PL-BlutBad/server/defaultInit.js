// if the database is empty on server start, create some sample data.

Meteor.startup(function() {
	console.log(" [Inicializando la Plataforma] ");
 		var partidasV = [];

	    if (Menu.find().count() === 0) {
	    	console.log("\t [1] Creando Menus...");
			var data = [ {
				    name : "Juegos",
				    menuType : "principal",

				}, {
				    name : "Ranking",
				    menuType : "principal",

				}, {
				    name : "Torneos",
				    menuType : "principal",

				},{
					name: "Premium",
					menuType:"principal",
				},{
					name: "Ayuda",
					menuType: "principal"
				},
				//menu de etapas del torneo
				{
				    name : "Participantes",
				    etapa: "participantes",
				    menuType : "torneoEtapas",
				},{
				    name : "Octavos 1/8",
				    etapa: "octavos",
				    menuType : "torneoEtapas",
				},{
				    name : "Cuartos 1/4",
				    etapa: "cuartos",
				    menuType : "torneoEtapas",
				},{
				    name : "Semi-final",
				    etapa: "semifinal",
				    menuType : "torneoEtapas",
				},{
				    name : "Final",
				    etapa: "final",
				    menuType : "torneoEtapas",
				},
				//menu del multi torneo
				{
					name: "Etapas del torneo!",
					short: "etapas", 
					menuType: "multiTorneo",
				},
				{
					name: "Ranking del torneo!",
					short: "ranking", 
					menuType: "multiTorneo",
				},{
					name: "Comentarios",
					short: "comments", 
					menuType: "multiTorneo",
				},
				{
					name: "Ranking del torneo!",
					short: "ranking", 
					menuType: "soloTorneo",
				},{
					name: "Comentarios",
					short: "comments", 
					menuType: "soloTorneo",
				},{
					name: "Participantes",
					short: "participantes", 
					menuType: "soloTorneo",
				}
			];

			var timestamp = (new Date()).getTime();
			for ( var i = 0; i < data.length; i++) {
				var obj = {	name 	: data[i].name,
							menuType: data[i].menuType};
				if (data[i].etapa){
					obj.etapa = data[i].etapa;
				}
				if(data[i].short){
					obj.short = data[i].short;
				}
			    var list_id = Menu.insert(obj);
			}
			

		
		fakeUsers = "Inea Yiey Eurnu Anysy Keel Bros Oriso Eldd Iashu Waiy Tril Mosc Ensh Quek Uere Thrak Deic Ykalo Uskq Rhonn Phauch Achl Yerr Ydyni Dieth Eorme Thrieph Thod Ormk Ichao Irs Smor Entht Verph Ceum Ler Eseri Stroegh Tangh Liem Neab Ourna Jik Oinee Hish Oita Ualey Easho Cheuss Los Mork Ihinu Maeq Kalv Enl Drauph Reyf Hatm Aormo Uendo Bair Bok Rilm Aundo Morl Echth Aleq Atone Aora Oero Geyn Tais Aeste Whaeth Uisi Odene Ess Chad Dras Isamu Adp Saurr Ashy Iradu Torq Adele Tonl Yhini Atsh Cerc Ans Rayk Eburu Meek Uskt Rakf Nysd Loell Pheif Lit Aemo Fays Obelo Kimb Oati Ishy Llierd Ightgh Moil Quoert Risnt Yeme Reis Byv Rher Cleard Omck Yeich Uinea";
					
		fakeUsersArray = fakeUsers.split(" ");
		fakeUsersId = [];

		console.log("\t [2] Creando "+fakeUsersArray.length +" usuarios falsos");

		for ( var i = 0; i < fakeUsersArray.length; i++) {
		    fakeUser = fakeUsersArray[i];
		    fakeUsersId[i] = Accounts.createUser({
		    	fakeUser : true,
		    	username:fakeUser,
		    	email:(fakeUser+"@pakistan.isi"), 
		    	password:"123"
		    });
		    Meteor.users.update(fakeUsersId[i],
		    	{$set:{fakeUser:true}
		    });
		};

		var i = 0;
		for (var j = 0; j <= 9; j++) {
			partidasV[j] = {
				creator_id : fakeUsersId[i],
				jugadores : [
					{
						user_id : fakeUsersId[i],
						estado : "Listo!"
					},
					{
						user_id : fakeUsersId[i+1],
						estado : "Listo!"
					},
					{
						user_id : fakeUsersId[i+2],
						estado : "Listo!"
					}
				],
				listos : false,
				torneo_id : false,  
			};
			i+=3;
		};
		
		// USUARIOS POR DEFECTOs 
		user = Accounts.createUser({username:"user",email:"user@kaka.aka", password:"123"})
		sara = Accounts.createUser({username:"sara",email:"sara@kaka.aka", password:"123"})
		itzi = Accounts.createUser({username:"itzi",email:"itzi@kaka.aka", password:"123"})
		danny = Accounts.createUser({username:"danny",email:"danny@kaka.aka", password:"123"})	
		serhii = Accounts.createUser({username:"serhii",email:"serhii@kaka.aka", password:"123"})	
    }

    if (Menu_user.find().count() === 0) {
		var data = [ {
		    name : "Mi perfil",
		    contents : []
		}, {
		    name : "Buscar usuarios",
		    contents : []
		}, {
		    name : "Amigos",
		    contents : []
		}, {
			name : "Mis mensajes",
			contents : []
		} ];

		var timestamp = (new Date()).getTime();
		for ( var i = 0; i < data.length; i++) {
		    var list_id = Menu_user.insert({
				name : data[i].name
		    });
		}
    };

    if (Bono.find().count() === 0) {
    	var data = [ {
		    name : "Vida para AlienInvasion: ",
		    description: "Da una vida extra en el juego de AlienInvasion",
		    numeracion: 1 //este campo servira para que lo pueda reconoce dentro del juego porque no se me ocurre otra forma de hacerlo de momento
		}, {
		    name : "Nivel extra en AlienInvasion: ",
		    description: "Descubre un nivel secreto nuevo al finalizar la partida",
		    numeracion: 2
		}, {
		    name : "Doble Puntuación para AlienInvasion: ",
		    description: "La puntuacion será el doble",
		    numeracion: 3 
		}, 
		{
		    name : "Nivel extra para Froot Wars: ",
		    description: "Descubre un nivel secreto",
		    numeracion: 4 
		},];

		for ( var i = 0; i < data.length; i++) {
		    var list_id = Bono.insert({
				name : data[i].name,
				description: data[i].description,
				numeracion: data[i].numeracion
		    });
		};
    };
	if (PartidasVolatiles.find().count() === 0) {  
		console.log("\t [3] Creando "+partidasV.length +" partidas volatiles falsas");
		for (var i = 0; i < partidasV.length; i++) { 
			PartidasVolatiles.insert(
				partidasV[i]
			);
		};
	};

	if (Juegos.find().count() === 0) {

		var admin = Accounts.createUser({username:"admin",email:"admin@kaka.aka", password:"123"});   
		var data = [
			{
			    name : 'Alien Invasion',
			    wrapf : 'null', //'gameAlien.initialize("gamecanvasAlien",spritesAlien,startGameAlien)',
			    logo_src : '/images/games_logo/alieninvasion.jpg',
			    logo_alt : 'Juega a este juego',
			    title_desc : 'AlienInvasion donde podrás detener la invasión alienígena',
			    description : 'Un juego llegado desde el espacio exterior donde podrás acabar con las nave enemigas y tripular tu propia nave espacial. ¿A qué estas esperando? Entra y acaba con todos los enemigos',
			    idn : 'alien',
			    mode : 'solo',
			    hall : 'alienHall',
			    rangos : [ {
					rango : "Xenomorfo",
					fromPoints:0,
					untilPoints : 999,
			    }, {
					rango : "Huevo",
					fromPoints:1000,
					untilPoints : 1499,
			    }, {
					rango : "Abrazacaras",
					fromPoints:1500,
					untilPoints : 1999,
			    }, {
					rango : "Quebrantapechos",
					fromPoints:2000,
					untilPoints : 2999,
			    }, {
					rango : "Alien Oscuro",
					fromPoints: 3000,
					untilPoints : 3199,
			    },{
					rango : "Jock-Alien",
					fromPoints:3200,
					untilPoints : 3499,
			    },{
					rango : "Croc-Alien",
					fromPoints: 3500,
					untilPoints : 3999,
			    },{
					rango : "Pretoriano",
					fromPoints:4000,
					untilPoints : 4999,
			    }, {
					rango : "Reina",
					fromPoints:5000,
					untilPoints : 100000,
			    } ],

			    insignias : [
				    {
						description : "Conseguir 50 puntos en 3 partidas.",
						timesPlayed : 3,
						minPoint: 50, 
						insig_image_src : '/insignias/3.jpg'
				    },
				    {
						description : "Ganar 3 veces seguidas",
						winStreak : 3,
						insig_image_src : '/insignias/7.jpg'
				    },
				    {
						description : "Ser el primero en el ranking de puntuacion mas alta!",
						firstInRankingScore : true,
						insig_image_src : '/insignias/8.jpg'
				    },
				    {
						description : "Tener el rango mas alto, ser primeto en puntuacion acumulada!",
						firstInRankingTotalScore: true,
						insig_image_src : '/insignias/9.jpg'
				    }, 
				],
			    torneos : [
				    {
	                    title : "Torneo AlienInvasion", 
	                    date_start : "11/29/2013",
	                    date_finish : "12/29/2013",
	                    pic : '/images/games_logo/alieninvasion.jpg',
	                    description : 'El ganador se lleva una copa y puntos para subir de nivel',
	                    description_long:'Id vel sensibus honestatis omittantur, vel cu nobis commune patrioque. In accusata definiebas qui, id tale malorum dolorem sed, solum clita phaedrum ne his. Eos mutat ullum forensibus ex, wisi perfecto urbanitas cu eam, no vis dicunt impetus. Assum novum in pri, vix an suavitate moderatius, id has reformidans referrentur. Elit inciderint omittantur duo ut, dicit democritum signiferumque eu est, ad suscipit delectus mandamus duo. An harum equidem maiestatis nec.',
	                	participantes:[],
	                	etapas : {octavos:{}, cuartos:{}, semifinal:{}, final:{}},
	                }
                ]

			},

			{
			    name : 'Clarcassone',
			    wrapf : 'ClarcassonneGameIU.initialize(idCanvasElement, party_id);',
			    logo_src : '/images/games_logo/clarkasone.jpg',
			    logo_alt : 'Juega a este juego',
			    title_desc : 'Si quieres jugar en compañía este es tu juego Clarcassone',
			    description : 'El juego del que todo el mundo habla llegado recientemente desde Pakistán Clarcassone donde te adentraras en un mundo medievale con tus amigos o con desconocidos',
			    idn : 'klarki',
			    mode : 'multi',
			    hall : 'klarkiHall',
			    rangos : [ {
					rango : "Gentilhombre",
					fromPoints: 0,
					untilPoints : 20,
			    }, {
					rango : "Escudero",
					fromPoints: 100,
					untilPoints : 149,
			    }, {
					rango : "Caballero",
					fromPoints: 150,
					untilPoints : 249,
			    }, {
					rango : "Ricohombre",
					untilPoints : 349,
					fromPoints:250,
			    }, {
					rango : "Conde",
					untilPoints : 399,
					fromPoints:350,
			    }, {
					rango : "Marqués",
					untilPoints : 449,
					fromPoints: 400,
			    },{
					rango : "Duque",
					untilPoints : 499,
					fromPoints:450,
			    },{
					rango : "Archiduque",
					untilPoints : 549,
					fromPoints:500,
			    },{
					rango : "Infante",
					untilPoints : 599,
					fromPoints:550,
			    },{
					rango : "Vizconde",
					untilPoints : 799,
					fromPoints: 600,
			    },{
					rango : "Barón",
					untilPoints : 2000,
					fromPoints: 800,
			    },
			     ],
			    insignias : [
				    {
						description : "Conseguir 3000 puntos en 3 partidas.",
						timesPlayed : 3,
						minPoint: 3000, 
						insig_image_src : '/insignias/3.jpg'
				    },
				    {
						description : "Ganar 2 veces seguidas",
						winStreak : 2,
						insig_image_src : '/insignias/7.jpg'
				    },
				    {
						description : "Ser el primero en el ranking de puntuacion mas alta!",
						firstInRankingScore : true,
						insig_image_src : '/insignias/8.jpg'
				    },
				    {
						description : "Tener el rango mas alto, ser primeto en puntuacion acumulada!",
						firstInRankingTotalScore: true,
						insig_image_src : '/insignias/9.jpg'
				    }, 
				],

			    torneos : [ 
					{
                        title : "Torneo Clarcassone", 
                        date_start : "11/29/2013",
                        date_finish : "12/29/2013",
                        pic : '/images/games_logo/clarkasone.jpg',
                        description : 'El ganador se lleva una copa y puntos para subir de nivel',
                        description_long:'Id vel sensibus honestatis omittantur, vel cu nobis commune patrioque. In accusata definiebas qui, id tale malorum dolorem sed, solum clita phaedrum ne his. Eos mutat ullum forensibus ex, wisi perfecto urbanitas cu eam, no vis dicunt impetus. Assum novum in pri, vix an suavitate moderatius, id has reformidans referrentur. Elit inciderint omittantur duo ut, dicit democritum signiferumque eu est, ad suscipit delectus mandamus duo. An harum equidem maiestatis nec.',
                        participantes:[],
	                	etapas : {	octavos: 	{start:false,finish:false, maxPlayersNextEtapa: 64, partidas:[]},
	                			 	cuartos: 	{start:false,finish:false, maxPlayersNextEtapa: 16, partidas:[]}, 
	                			 	semifinal: 	{start:false,finish:false, maxPlayersNextEtapa: 4,	partidas:[]},
	                			 	final: 		{start:false,finish:false, maxPlayersNextEtapa: 1000, partidas:[]}},
				}
			    ],
			},

			{
			    name : 'Froot Wars',
			    wrapf : 'null', //'gameFroot.init()',
			    logo_src : '/images/splashscreen.png', 
			    logo_alt : 'Juega a este juego',
			    title_desc : 'Froot Wars el juego con el que podrás dejar a un lado la comida basura',
			    description : 'Junto a las frutas podrás acabar con la comida basura y adelgazar esos kilos de más', 
			    idn : 'froot',
			    mode : 'solo',
			    hall : 'frootHall',
			    rangos : [ {
					rango : "Espinacas",
					fromPoints: 0,
					untilPoints : 199,
			    }, {
					rango : "Brócoli",
					fromPoints: 200,
					untilPoints : 399,
			    }, {
					rango : "Capitan Alcachofa",
					fromPoints: 400,
					untilPoints : 599,
			    }, {
					rango : "Comandante Calabaza",
					fromPoints: 600,
					untilPoints : 999,
			    }, {
					rango : "General Plátano",
					fromPoints: 1000,
					untilPoints : 1599,
			    }, {
					rango : "Reina Zanahoria",
					fromPoints: 1600,
					untilPoints : 4999,
			    }, {
					rango : "Granada",
					fromPoints: 5000,
					untilPoints : 11999,
			    }, {
					rango : "Princesa Frambuesas",
					fromPoints: 12000,
					untilPoints : 15999,
			    }, {
					rango : "Reina Fresa",
					fromPoints: 16000,
					untilPoints : 190000,
			    } ],
			    insignias : [
				    {
						description : "Conseguir 3500 puntos en 3 partidas.",
						timesPlayed : 3,
						minPoint: 3500, 
						insig_image_src : '/insignias/3.jpg'
				    },
				    {
						description : "Ganar 2 veces seguidas",
						winStreak : 2,
						insig_image_src : '/insignias/7.jpg'
				    },
				    {
						description : "Ser el primero en el ranking de puntuacion mas alta!",
						firstInRankingScore : true,
						insig_image_src : '/insignias/8.jpg'
				    },
				    {
						description : "Tener el rango mas alto, ser primeto en puntuacion acumulada!",
						firstInRankingTotalScore: true,
						insig_image_src : '/insignias/9.jpg'
				    }, 
				],
			    torneos : [ 
			    	{
                        title : "Torneo Froot War", 
                        date_start : "11/29/2013",
                        date_finish : "12/29/2013",
                        pic : '/images/splashscreen.png',
                        description : 'El ganador se lleva una copa y puntos para subir de nivel',
                        description_long:'Id vel sensibus honestatis omittantur, vel cu nobis commune patrioque. In accusata definiebas qui, id tale malorum dolorem sed, solum clita phaedrum ne his. Eos mutat ullum forensibus ex, wisi perfecto urbanitas cu eam, no vis dicunt impetus. Assum novum in pri, vix an suavitate moderatius, id has reformidans referrentur. Elit inciderint omittantur duo ut, dicit democritum signiferumque eu est, ad suscipit delectus mandamus duo. An harum equidem maiestatis nec.',
                        participantes:[],
	                	etapas : {octavos:{}, cuartos:{}, semifinal:{}, final:{}},
                     }
			    ]
			} 
		]

		var timestamp = (new Date()).getTime();
		
		//////////////////////AÑADIR JUEGOS//////////////////////////
		console.log("\t [4] Añadiendo "+data.length +" juegos a la Plataforma");
		console.log("\t\t [4.1] Añadiendo rangos");
		console.log("\t\t [4.2] Añadiendo insignias");
		console.log("\t\t [4.3] Añadiendo torneos");
		for ( var i = 0; i < data.length; i++) {
		    var juego_id = Juegos.insert({
				name : data[i].name,
				wrapf : data[i].wrapf,
				logo_src : data[i].logo_src,
				logo_alt : data[i].logo_alt,
				title_desc : data[i].title_desc,
				description : data[i].description,
				idn : data[i].idn,
				mode : data[i].mode,
				hall : data[i].hall,
		    });

		    
		    //////////////////////RANGOS PARA JUEGOS//////////////////////////
		    //console.log("\t\t [4.1] Añadiendo "+data[i].torneos.length +" rangos");
		    for ( var j = 0; j < data[i].rangos.length; j++) {
				var info = data[i].rangos[j];
				Rangos.insert({
				    game_id : juego_id,
				    rango : info.rango,
				    untilPoints : info.untilPoints,
				    fromPoints: info.fromPoints,
				});
				timestamp += 1; // ensure unique timestamp.
		    }

		    //////////////////////INSIGNIAS PARA JUEGOS//////////////////////////
		    //console.log("\t\t [4.2] Añadiendo "+data[i].torneos.length +" insignias");
		    for ( var j = 0; j < data[i].insignias.length; j++) {
				var info = data[i].insignias[j];
				Insignias.insert({
				    game_id : juego_id,
				    insig_image_src : info.insig_image_src,
				    description : info.description,
				    timesPlayed : info.timesPlayed,
				    minPoint: info.minPoint,
				    winStreak: info.winStreak,
				    firstInRankingScore: info.firstInRankingScore,
				    firstInRankingTotalScore:info.firstInRankingTotalScore,

				});
				timestamp += 1; // ensure unique timestamp.
		    }		    

		    
		    //////////////////////TORNEOS//////////////////////////
		    function ApuntameUsuariosFakes(torneoId) {
				//console.log("Añadiendo usuarios falsos a torneo: " + torneoId);
				fakeUsers = Meteor.users.find({
				    fakeUser : true
				});

				fakeUsers.forEach(function(user) {
				    if (Math.random() < 0.30) {
						Torneos.update(torneoId, { $push : {participantes : user._id}});
				    }
				});
		    }
	
		    
		    //Añadir torneos, enlazando cada torneo con su juego.
		    //console.log("\t\t [4.3] Añadiendo "+data[i].torneos.length +" torneos");
		    for ( var j = 0; j < data[i].torneos.length; j++) {
				var info = data[i].torneos[j];
				var torneoId = Torneos.insert({
				    game_id : juego_id,
				    title : info.title,
				    user_create : admin,
				    date_start : info.date_start,
				    date_finish : info.date_finish,
				    pic : info.pic,
				    description : info.description,
				    description_long: info.description_long,
				    participantes: [],
				    etapas: info.etapas,
				});
				ApuntameUsuariosFakes(torneoId);
		    }
		}
	}
});
