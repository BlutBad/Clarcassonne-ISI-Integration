
Template.chat.chatName = function () {
	return "General";
}

// Template.messages.messages = function () {

// }

Template.chat.events = {
	'click input#hidechat': function () {
		$("#boxchat").hide();
	},
	'click input#showchat': function () {
		$("#boxchat").show();
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
				$("#loginError").show();
			}
		}
	},
	'click input#hidelogerror': function () {
		$("#loginError").hide();
	}
}