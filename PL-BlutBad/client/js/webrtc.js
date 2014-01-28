var webrtc;
var isRunning = false;

/*
Template.webRTC.rendered = function(){
}
*/

function goWebRTC(room){
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
				webrtc.joinRoom(room);
				});

}

//isRunning estta implementa por si se pude para la videoTransmision
Template.webRTC.events({
    'click #startWebRTC' : function() {
		if(isRunning){
			//webrtc = null;
			isRunning = false;
			webrtc.stopLocalVideo();
			$("#localVideo").attr("src","");
			//document.getElementById('startWebRTC').style.visibility = 'hidden';
			document.getElementById('startWebRTC').childNodes[0].nodeValue = 'Start WebRTC';
		}else{
			isRunning = true;
			var room_id = Session.get('current_party_id_webRTC'); 
			if(room_id){
				goWebRTC(room_id);
			}else{
				goWebRTC("General");
			}
			
			//document.getElementById('startWebRTC').style.visibility = 'hidden';
			document.getElementById('startWebRTC').childNodes[0].nodeValue = 'Stop WebRTC';
		}
    }
});

Template.webRTC.show = function () {
	return Session.equals('showGameIdn', 'clarki');
}