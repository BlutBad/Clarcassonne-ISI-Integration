//Video WebRTC



startVideoChat=function (nameRoom){
	webrtc = new SimpleWebRTC({
		// the id/element dom element that will hold "our" video
		localVideoEl: 'localVideo',
		// the id/element dom element that will hold remote videos
		remoteVideosEl: 'remotesVideos',
		// immediately ask for camera access
		autoRequestMedia: true
	});

	// we have to wait until it's ready
	webrtc.on('readyToCall', function () {
		// you can name it anything
		webrtc.joinRoom(nameRoom);
	});
	Session.set("video_on",true);
}

endVideoChat = function (){
	$("#buttVideoSt").html("Start VideoChat");
	$("#buttVideoSt").css("background-color","#2EFE2E");
	$("#buttVideoSt").css("border","2px solid #2EFE2E");
	$("#buttVideoSt").addClass("StartVC");
	webrtc.stopLocalVideo();
	$("#localVideo").attr("src", "");
}


//Inserta mensajes del chat de sala
Template.input.events = {
	'keydown input#message':function(event){
		if(event.which==13){
			if (Meteor.user()){
				var name = Meteor.user().username;
			}else{
				var name = 'Anonymous';
			}
			var message = $("#message");
			if (message.val()!=''){
				 Messages.insert({
					name: name,
					avatar: Meteor.user().avatar,
					message: message.val(),
					time: Date.now(),
					match_id: Session.get('match_id')
				 });
				message.val(''); //dejamos la caja de texto vacia
			}
		}	
	}
}
