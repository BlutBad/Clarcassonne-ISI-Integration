
Template.chat.chatName = function () {
	return "General";
}

Template.messages.messages = function () {
    return Global_msgs.find({}, { sort: { time: -1 }});
}

notRegisterChat = function () {
	$(".not-register-chat").dialog({
      		modal: true,
      		buttons: {
        		Ok: function() {
          		$( this ).dialog( "close" );
        	}
      	}
    });
}

Template.chat.events = {
	'click input#hidechat': function () {
		$("#boxchat").hide();
	},
	'click input#showchat': function () {
		if (Meteor.userId()) {
			$("#boxchat").show("clip", 2000);
		} else {
			notRegisterChat();
		}
	}
}

Template.input.events = {
	'keydown input#message': function (e) {
		if (e.which == 13) {
			if (Meteor.userId()) {
				var user_id = Meteor.user()._id;
				var msg = $("#message").val();
				if (msg != '') {
					Global_msgs.insert({
						user_id: user_id,
						msg: msg,
						time: Date.now()
					})
					$("#message").val('');
				}
 			} else {
 				$("#message").val('');
 				$("#boxchat").hide();
			}
		}
	},
}