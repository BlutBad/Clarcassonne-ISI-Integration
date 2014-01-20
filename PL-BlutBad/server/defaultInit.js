// if the database is empty on server start, create some sample data.

Meteor.startup(function() {
 
	var partidasV = [];
    if (Menu.find().count() === 0) {
		var data = [ {
		    name : "Juegos",
		    contents : []
		}, {
		    name : "Ranking",
		    contents : []
		}, {
		    name : "Torneos",
		    contents : []
		},
		/*
		{
		    name : "Tienda",
		    contents : []
		},*/ 
		
		];

		var timestamp = (new Date()).getTime();
		for ( var i = 0; i < data.length; i++) {
		    var list_id = Menu.insert({
			name : data[i].name
		    });
		}
		
		fakeUsers = "Cheyrd_Inaurtle Oechi_Honomon Saml_Rodizard Ineh_Lorochu Tand_Knockeromon Quaq_Vorizard Elms_Kimizard Kell_Clotachu Cond_Aughamon Umy_Clotizard Lorrt_Denamon Scheas_Rodertle Ekalu_Goofortle Yinao_Sulachu Skeln_Wadezard Geal_Thimbleortle Schein_Snarkyzard Vun_Twerpirtle Oskelo_Thimbleechu Edyne_Undartle Yagea_Perozard Ros_Ashertle Erise_Ageychu Eingo_Faceemon Dars_Ardartle Clur_Twitymon Seev_Tasurtle Siy_Goofirtle Rayt_Numbachu Laeg_Boneurtle Ahini_Fumbleumon Inalo_Bumbleichu Wheuv_Footezard Tait_Ormichu Llaunt_Onartle Imy_Clodamon Osf_Wimpezard Chagh_Meatomon Rhey_Skullumon Shaid_Etochu Ett_Osymon Urado_Faceurtle Oite_Torichu Chrent_Faceomon Uma_Bumbleamon Ess_Ghaozard Aunta_Dumbyrtle Tanf_Loafechu Apere_Chauzard Oete_Footachu Ghat_Puffemon Luiz_Knuckleimon Uworo_Dipazard Avori_Untuzard Quek_Skeluchu Atnt_Angazard Ianga_Ballemon Reyd_Sulirtle Phew_Headazard Undn_Puffozard Orilu_Iamon Isk_Faceychu Ustn_Undyzard Suls_Twerpemon Eldrd_Draemon Yrano_Kimachu Nysr_Adochu Emc_Goofurtle Auski_Doofemon Eorma_Raymon Uemu_Ballomon Cheet_Sneezeamon Schiech_Tonuzard Irph_Ineertle Died_Numbuchu Ads_Ineamon Ymore_Ormazard Itb_Turychu Oathi_Imazard Iryni_Wadozard Ward_Denertle Weyk_Therortle Wark_Rayemon Inala_Oldemon Heik_Risamon Yieg_Verirtle Ads_Fingerozard Oia_Cloduzard Lab_Leromon Zhiec_Ustumon Bin_Enumon Rab_Nyurtle Lyenn_Doofychu Urnch_Knockizard Unyu_Atemon Atd_Wipeozard Nyv_Headortle Zhok_Boneortle Sayf_Enimon Thier_Ackortle Leis_Skelichu Gaiv_Thimbleizard Eemi_Bumbleirtle Quel_Wimpechu Ehini_Ghauchu Urilo_Boneichu Eml_Sneezeochu Ykimu_Oldimon Olyea_Airomon Emst_Inaymon Driel_Skullochu Reinn_Headyrtle Llooc_Sayachu Queal_Ankleazard Dais_Nyozard Samw_Draichu Zhoph_Faceachu Rakk_Echomon Osere_Lunkuchu";
		fakeUsersArray = fakeUsers.split(" ");
		fakeUsersId = [];
		//console.log("Creando (" + fakeUsersArray.length + ") usuarios falsos...");
		for ( var i = 0; i < fakeUsersArray.length; i++) {
		    fakeUser = fakeUsersArray[i];
		    fakeUsersId[i] = Accounts.createUser({
		    	fakeUser : true,
		    	username:fakeUser,
		    	email:(fakeUser+"@kaka.aka"), 
		    	password:"123"
		    });
		    Meteor.users.update(fakeUsersId[i],
		    	{$set:{fakeUser:true}
		    });
		};

		for (var i = 0; i <= 5; i++) {
			partidasV[i] = {
				creator_id : fakeUsersId[i],
				jugadores : [
					{
						user_id : fakeUsersId[i],
						estado : "Pendiente"
					},
					{
						user_id : fakeUsersId[i+1],
						estado : "Pendiente"
					},
					{
						user_id : fakeUsersId[i+2],
						estado : "Pendiente"
					}
				],
				listos : false,
				torneo_id : false,  
			};
		};
		
		// USUARIOS POR DEFECTOs 
		user = Accounts.createUser({username:"user",email:"user@kaka.aka", password:"123"})
		sara = Accounts.createUser({username:"sara",email:"sara@kaka.aka", password:"123"})
		itzi = Accounts.createUser({username:"itzi",email:"itzi@kaka.aka", password:"123"})
		dany = Accounts.createUser({username:"dany",email:"dany@kaka.aka", password:"123"})		
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
		}, ];

		var timestamp = (new Date()).getTime();
		for ( var i = 0; i < data.length; i++) {
		    var list_id = Menu_user.insert({
				name : data[i].name
		    });
		}
    };

	if (PartidasVolatiles.find().count() === 0) {  
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
			    name : 'AlienInvasion',
			    wrapf : 'null', //'gameAlien.initialize("gamecanvasAlien",spritesAlien,startGameAlien)',
			    logo_src : '/images/games_logo/alieninvasion.jpg',
			    logo_alt : 'Juega es este juego',
			    title_desc : 'Titulo para la descripcion del juego',
			    description : 'Descripcion del juego!',
			    idn : 'alien',
			    mode : 'solo',
			    hall : 'alienHall',
			    rangos : [ {
					rango : "Fantasma",
					minPoints : 0,
			    }, {
					rango : "Noob",
					minPoints : 500,
			    }, {
					rango : "Capitan",
					minPoints : 1000,
			    }, {
					rango : "Comandante",
					minPoints : 4000,
			    }, {
					rango : "General",
					minPoints : 7000,
			    }, {
					rango : "Heroe",
					minPoints : 9000,
			    } ],
			    insignias : [
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 1,
						insig_image_src : '/insignias/3.jpg'
				    },
				    {
						description : "Has jugado dos veces a este juego",
						timesPlayed : 2,
						insig_image_src : '/insignias/6.jpg'
				    },
				    {
						description : "Has jugado tres veces a este juego",
						timesPlayed : 3,
						insig_image_src : '/insignias/7.jpg'
				    },
				    {
						description : "Has jugado 4 veces a este juego",
						timesPlayed : 4,
						insig_image_src : '/insignias/8.jpg'
				    },
				    {
						description : "Has jugado 5 veces a este juego",
						timesPlayed : 5,
						insig_image_src : '/insignias/9.jpg'
				    }, 
				],
			    torneos : [
				    {
	                    title : "Torneo AlienInvasion", 
	                    date_start : "11/29/2013",
	                    date_finish : "12/29/2013",
	                    pic : '/images/games_logo/alieninvasion.jpg',
	                    description : 'Descripcion del juego!, el ganador se lleva una copa y puntos para subir de nivel',
	                    description_long:'Id vel sensibus honestatis omittantur, vel cu nobis commune patrioque. In accusata definiebas qui, id tale malorum dolorem sed, solum clita phaedrum ne his. Eos mutat ullum forensibus ex, wisi perfecto urbanitas cu eam, no vis dicunt impetus. Assum novum in pri, vix an suavitate moderatius, id has reformidans referrentur. Elit inciderint omittantur duo ut, dicit democritum signiferumque eu est, ad suscipit delectus mandamus duo. An harum equidem maiestatis nec.',
	                	participantes:[]
	                }
                ]

			},

			{
			    name : 'Clarcassone',
			    wrapf : 'ClarcassonneGameIU.initialize(idCanvasElement, party_id);',
			    logo_src : '/images/games_logo/clarkasone.jpg',
			    logo_alt : 'Juega es este juego',
			    title_desc : 'Titulo para la descripcion del juego',
			    description : 'Descripcion del juego!',
			    idn : 'klarki',
			    mode : 'multi',
			    hall : 'klarkiHall',
			    rangos : [ {
					rango : "Fantasma",
					minPoints : 0,
			    }, {
					rango : "Noob",
					minPoints : 500,
			    }, {
					rango : "Capitan",
					minPoints : 1000,
			    }, {
					rango : "Comandante",
					minPoints : 4000,
			    }, {
					rango : "General",
					minPoints : 7000,
			    }, {
					rango : "MotherFucker",
					minPoints : 9000,
			    } ],
			    insignias : [
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 1,
						insig_image_src : '/insignias/1.jpg'
				    },
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 2,
						insig_image_src : '/insignias/2.jpg'
				    },
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 3,
						insig_image_src : '/insignias/3.jpg'
				    },
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 4,
						insig_image_src : '/insignias/4.jpg'
				    },
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 5,
						insig_image_src : '/insignias/5.jpg'
				    }, 
				],

			    torneos : [ 
					{
                        title : "Torneo Clarcassone", 
                        date_start : "11/29/2013",
                        date_finish : "12/29/2013",
                        pic : '/images/games_logo/clarkasone.jpg',
                        description : 'Descripcion del juego!, el ganador se lleva una copa y puntos para subir de nivel',
                        description_long:'Id vel sensibus honestatis omittantur, vel cu nobis commune patrioque. In accusata definiebas qui, id tale malorum dolorem sed, solum clita phaedrum ne his. Eos mutat ullum forensibus ex, wisi perfecto urbanitas cu eam, no vis dicunt impetus. Assum novum in pri, vix an suavitate moderatius, id has reformidans referrentur. Elit inciderint omittantur duo ut, dicit democritum signiferumque eu est, ad suscipit delectus mandamus duo. An harum equidem maiestatis nec.',
                        participantes:[]
				}
			    ],
			},

			{
			    name : 'Froot Wars',
			    wrapf : 'null', //'gameFroot.init()',
			    logo_src : '/images/splashscreen.png',
			    logo_alt : 'Juega es este juego',
			    title_desc : 'Titulo para la descripcion del juego',
			    description : 'Descripcion del juego!',
			    idn : 'froot',
			    mode : 'solo',
			    hall : 'frootHall',
			    rangos : [ {
					rango : "Fantasma",
					minPoints : 0,
			    }, {
					rango : "Noob",
					minPoints : 500,
			    }, {
					rango : "Capitan",
					minPoints : 1000,
			    }, {
					rango : "Comandante",
					minPoints : 4000,
			    }, {
					rango : "General",
					minPoints : 7000,
			    }, {
					rango : "Heroe",
					minPoints : 9000,
			    } ],
			    insignias : [
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 1,
						insig_image_src : '/insignias/3.jpg'
				    },
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 2,
						insig_image_src : '/insignias/2.jpg'
				    },
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 3,
						insig_image_src : '/insignias/4.jpg'
				    },
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 4,
						insig_image_src : '/insignias/5.jpg'
				    },
				    {
						description : "Has jugado una vez a este juego",
						timesPlayed : 5,
						insig_image_src : '/insignias/6.jpg'
				    }, ],
			    torneos : [ 
			    	{
                        title : "Torneo Froot War", 
                        date_start : "11/29/2013",
                        date_finish : "12/29/2013",
                        pic : '/images/splashscreen.png',
                        description : 'Descripcion del juego!, el ganador se lleva una copa y puntos para subir de nivel',
                        description_long:'Id vel sensibus honestatis omittantur, vel cu nobis commune patrioque. In accusata definiebas qui, id tale malorum dolorem sed, solum clita phaedrum ne his. Eos mutat ullum forensibus ex, wisi perfecto urbanitas cu eam, no vis dicunt impetus. Assum novum in pri, vix an suavitate moderatius, id has reformidans referrentur. Elit inciderint omittantur duo ut, dicit democritum signiferumque eu est, ad suscipit delectus mandamus duo. An harum equidem maiestatis nec.',
                        participantes:[]
                     }
			    ]
			} 
		]

		var timestamp = (new Date()).getTime();
		
		//////////////////////AÑADIR JUEGOS//////////////////////////
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
		    for ( var j = 0; j < data[i].rangos.length; j++) {
				var info = data[i].rangos[j];
				Rangos.insert({
				    game_id : juego_id,
				    rango : info.rango,
				    minPoints : info.minPoints
				});
				timestamp += 1; // ensure unique timestamp.
		    }

		    //////////////////////INSIGNIAS PARA JUEGOS//////////////////////////
		    for ( var j = 0; j < data[i].insignias.length; j++) {
				var info = data[i].insignias[j];
				Insignias.insert({
				    game_id : juego_id,
				    insig_image_src : info.insig_image_src,
				    description : info.description,
				    timesPlayed : info.timesPlayed,
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
				    if (Math.random() < 0.535) {
						Torneos.update(torneoId, { $push : {participantes : user._id}});
				    }
				});
		    }
	
		    
		    //Añadir torneos, enlazando cada torneo con su juego.
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
				    participantes: []
				});
				ApuntameUsuariosFakes(torneoId);
		    }
		}
	}
});
