Template.miperfiltemp.mi = function () {
	if (Meteor.user())
		return Meteor.user();
};

Template.imgmiperfiltemp.avatar = function () {
	if (Meteor.user())
		return Meteor.user().avatar;
};

Template.miperfiltemp.amigos = function () {
	if (Meteor.user() && (Meteor.user().amigos!=undefined) ){
		var nombresAmigos=new Array();
		(Meteor.user().amigos).forEach(function(id_amigo){
			var amigo=Meteor.users.findOne({_id: id_amigo});
			nombresAmigos.push(amigo.username);
		});
		return nombresAmigos.join(", ");
	}	
};

Template.miperfiltemp.rank = function(){
	if(Ranking.find().count()!=0){
		var listelems = Ranking.find({"user_id": Session.get("IdPerfil")});
		
		var elemfound = false;
		var listbestelems = [];
		var listbestscores=[];
		listelems.forEach(function(elem){
			elemfound = false;
			for(var i=0;i<listbestelems.length;i++){
				if (listbestelems[i].game_id==elem.game_id){
					elemfound=true;
					if(listbestelems[i].score<elem.score)
						listbestelems[i].score=elem.score;
				}		
			}; 
			if (elemfound==false)
				listbestelems.push(elem);
		});
		
		listbestelems.forEach(function(bestelem){
			listbestscores.push({"game": Games.findOne({_id:bestelem.game_id}).name,"points": bestelem.score});
		});

		return listbestscores;
	}
};

Template.imgmodmiperfiltemp.avatar = function () {
	return Session.get("url");
};

Template.modmiperfiltemp.socialred = function() {
	if (Meteor.user())
		return Meteor.user().socialred;
};




Deps.autorun(function(){
	var miIdPerfil=Session.get("IdPerfil");
	Meteor.subscribe("ranking",undefined,miIdPerfil);
});



	
function valEmail(email){
	if (email == ""){
		return true;
	}else{
		re=/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if(!re.test(email)) { 
			return false; 
		}else{ 
			return true; 
		}
	}	
}





$(document).ready(function() {


	$(document).on("click","a[href='#perfil']",function(){
		if (Meteor.user())
			Session.set("IdPerfil",Meteor.userId());
		$("#contenedorimagenes").css("display","none");
		$("#moddataprofile").css("display","none");
		$("#dataprofile").css("display","block");
		$("#imgdataprofile").css("display","block");
	});

	var contadorAvatarSlider;	

	$(document).on("click", "#nextavatar" ,function(){
		contadorAvatarSlider++;
		if(contadorAvatarSlider == 93)
			contadorAvatarSlider = 0;
		Session.set("url","Avatares/"+contadorAvatarSlider+".jpg");
	});

	$(document).on("click", "#previousavatar" ,function(){
		contadorAvatarSlider--;
		if(contadorAvatarSlider == -1)
			contadorAvatarSlider = 92;
		Session.set("url","Avatares/"+contadorAvatarSlider+".jpg");
	});
	
	$(document).on("click","#modifprof", function(){
		$(function() {
			if (Meteor.user().birthday==undefined){
				$("#datepickerprof").datepicker({
					dateFormat: "dd/mm/yy",
					changeMonth: true,
					changeYear: true,
					yearRange: '1955:2020',
					maxDate: new Date(),
					showOn: "button",
					buttonImage: "Calendar-icon.gif",
					buttonImageOnly: true
				});
			}else{
				$("#datepickerprof").datepicker("destroy");
			}	
		});
		$("#imgdataprofile").css("display","none");
		$("#dataprofile").css("display","none");
		$("#datepickerprof").val(Meteor.user().birthday);
		if (Meteor.user().socialred==undefined){
			if (Meteor.user().avatar==undefined)
				contadorAvatarSlider=0;
			else
				contadorAvatarSlider=parseInt( (Meteor.user().avatar).slice(9,-4) );
			Session.set("url","Avatares/"+contadorAvatarSlider+".jpg");
		
			$("#modemail").val(Meteor.user().address);
			$("#contenedorimagenes").css("display","block");
		}	
		$("#moddataprofile").css("display","block");	
	});

	$(document).on("click","#saveprof", function(){
		if (Meteor.user().socialred){
			if ( Meteor.user().birthday == undefined ){
				if ( $("#datepickerprof").val() != "" )
					Meteor.call("definirFecha",$("#datepickerprof").val(),function(error,result){console.log(error);console.log(result);});
			}
		}else{
			if( !valEmail($("#modemail").val()) ){
				$("#dialog_bademail").dialog("open");
			}else{
				if ( Meteor.user().birthday == undefined ){
					if ( $("#datepickerprof").val() != "" )
						Meteor.call("definirFecha",$("#datepickerprof").val(),function(error,result){console.log(error);console.log(result);});
				}	
				if (Meteor.user().avatar != Session.get("url"))
					Meteor.call("definirAvatar",Session.get("url"),function(error,result){console.log(error);console.log(result);});
				if ( Meteor.user().address != $("#modemail").val() ){
					if ( $("#modemail").val() != "" )
						Meteor.call("definirEmail",$("#modemail").val(),function(error,result){console.log(error);console.log(result)});	
				}
			}		
		}
		$("#contenedorimagenes").css("display","none");
		$("#moddataprofile").css("display","none");
		$("#dataprofile").fadeIn("slow");
		$("#imgdataprofile").fadeIn("slow");
	});

	$(document).on("click","#nosaveprof", function(){
		$("#contenedorimagenes").css("display","none");
		$("#moddataprofile").css("display","none");
		$("#dataprofile").css("display","block");
		$("#imgdataprofile").css("display","block");
	});

	$(document).on("click","#birthbutton_dialog", function(){
		if($("#datepickerprof_dialog").val() == ""){
			$("#error_birthdialog").remove();
			$("#birthbutton_dialog").before('<p id="error_birthdialog" style="color: red;">Debes introducir una fecha.</p>');
		} else {
			var fechanacimiento = $("#datepickerprof_dialog").val();
			Meteor.users.update({_id: Meteor.userId()},{$set: {birthday:fechanacimiento}});
			$( "#dialog_birthdate" ).dialog("close");
		};
	});


});	


