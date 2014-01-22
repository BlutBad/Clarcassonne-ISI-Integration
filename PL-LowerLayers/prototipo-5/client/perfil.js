Template.datosperfiltemp.username = function () {
	if (Meteor.user())
		return Meteor.user().username;
};


Template.datosperfiltemp.address = function () {
	if (Meteor.user())
		return Meteor.user().address;
};

Template.datosperfiltemp.birthday = function () {
	if (Meteor.user())
		return Meteor.user().birthday;
};

Template.datosperfiltemp.amigos = function () {
	if (Meteor.user() && (Meteor.user().amigos!=undefined) ){
		var nombresAmigos=new Array();
		(Meteor.user().amigos).forEach(function(id_amigo){
			var amigo=Meteor.users.findOne({_id: id_amigo});
			nombresAmigos.push(amigo.username);
		});
		return nombresAmigos.join(", ");
	}	
};

Template.imagperfiltemp.avatar = function () {
	if (Meteor.user())
		if (Meteor.user().avatar==undefined)
			return "Avatares/0.jpg";
		else
			return Meteor.user().avatar;
};

var rellenadorAvatares= function(){
	for(var i=0;i<=92;i++){
		$("#avatar-slider").append("<img width='150px' height='150px'  src='Avatares/"+i+".jpg'>");		
	}
};


$(document).ready(function() {

	var contadorAvatarSlider;

	rellenadorAvatares();	


	$(document).on("click", "#nextavatar" ,function(){
		contadorAvatarSlider++;
		if(contadorAvatarSlider == $("#avatar-slider img").size())
			contadorAvatarSlider = 0;
		$("#avatar-slider img").hide();
		$("#avatar-slider img").eq(contadorAvatarSlider).fadeIn();
	});


	$(document).on("click", "#previousavatar" ,function(){
		contadorAvatarSlider--;
		if(contadorAvatarSlider == -1)
			contadorAvatarSlider = $("#avatar-slider img").size()-1;
		$("#avatar-slider img").hide();
		$("#avatar-slider img").eq(contadorAvatarSlider).fadeIn();
	});
	



	$(document).on("click","#modifprof", function(){
		
		if (Meteor.user().avatar==undefined)
			contadorAvatarSlider=0;
		else
			contadorAvatarSlider=parseInt( (Meteor.user().avatar).slice(9,-4) );
		
		$("#avatar-slider img").hide();
		$("#avatar-slider img").eq(contadorAvatarSlider).fadeIn();

		$("#dataprofile").css("display","none");
		$("#imgdataprofile").css("display","none");
		$("#datepickerprof").val(Meteor.user().birthday);
		$("#modemail").val(Meteor.user().address);
		$("#moddataprofile").css("display","block");
	});

	$(document).on("click","#saveprof", function(){
		Meteor.call("definirAvatar",($("#avatar-slider").children().eq(contadorAvatarSlider)).attr("src"),function(error,result){
			console.log(error)
			console.log(result)
		});
		Meteor.call("definirFecha",$("#datepickerprof").val(),function(error,result){
			console.log(error)
			console.log(result)
		});
		Meteor.call("definirEmail",$("#modemail").val(),function(error,result){
			console.log(error)
			console.log(result)
		});
		
		$("#moddataprofile").css("display","none");
		$("#dataprofile").fadeIn("slow");
		$("#imgdataprofile").fadeIn("slow");
	
	});

	$(document).on("click","#nosaveprof", function(){
		$("#moddataprofile").css("display","none");
		$("#imgdataprofile").css("display","block");
		$("#dataprofile").css("display","block");
	});	




	$(function() {
		$("#datepickerprof").datepicker({
			dateFormat: "dd/mm/yy",
			changeMonth: true,
			changeYear: true,
			yearRange: '1960:2020',
			showOn: "button",
			buttonImage: "Calendar-icon.gif",
			buttonImageOnly: true
		});
	});



});	


