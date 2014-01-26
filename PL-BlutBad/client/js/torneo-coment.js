
// Returns an event map that handles the "escape" and "return" keys and
// "blur" events on a text input (given by selector) and interprets them
// as "ok" or "cancel".
var okCancelEvents = function (selector, callbacks) {
  var ok = callbacks.ok || function () {};
  var cancel = callbacks.cancel || function () {};

  var events = {};
  events['keyup '+selector+', keydown '+selector+', focusout '+selector] =
    function (evt) {
      if (evt.type === "keydown" && evt.which === 27) {
        // escape = cancel
        cancel.call(this, evt);

      } else if (evt.type === "keyup" && evt.which === 13 ||
                 evt.type === "focusout") {
        // blur/return/enter = ok/submit if non-empty
        var value = String(evt.target.value || "");
        if (value)
          ok.call(this, value, evt);
        else
          cancel.call(this, evt);
      }
    };

  return events;
};


var activateInput = function (input) {
  input.focus();
  input.select();
};

Template.torComments.events({
	'click .addcoment': function (evt, tmpl) {
	    Session.set('adding_comment', true);
	    Deps.flush(); // update DOM before focus
	    activateInput(tmpl.find("#comment-input"));
	  },
});



Template.torComments.adding_comment = function(){
	return Session.equals("adding_comment", true);
};


var month =["Enero", "Febrero","Marzo",
			"Abril","Mayo","Junio",
			"Julio","Agosto","Septiembre",
			"Octubre","Noviembre", "Diciembre"];

var getMyInfo = function(){
		var dd = new Date(Date.now());
		var min = dd.getMinutes();
		if(min < 10){
			min = "0" + min;
		}

		var time = dd.getHours() + ":" + min + " " + dd.getSeconds() + '"'
		var date = {month: month[dd.getMonth()],
					day	 : 	dd.getDate(),
					year : dd.getFullYear(),
					time : time};

      	var username = _extractProfile(Meteor.userId()).username;
      	return {date: date, username: username}
}

/*
Template.torComments.events({
	  'click .replyComment' : function () {
	  	console.log(this);
		var id = "zKXE9pAKKXSJZao4K";
		var info = getMyInfo();
		Torneos.update({_id:id, "comments.username": this.username}, {$push:{replys: {text: "Reply hola",
												date: info.date,
												username: info.username,
												}
									}
							});

	  }
});
*/

Template.torComments.events(okCancelEvents(
  '#comment-input',
  {
    ok: function (value) {
      var info = getMyInfo();

      var tid = Session.get('showTorneoId');

      Torneos.update(tid, {$push:{comments: {text: value,
      										date: info.date,
      										username: info.username,
      										}
      							}
      					});

      Session.set('adding_comment', null);
    },
    cancel: function () {
      Session.set('adding_comment', null);
    },
  }));







Template.torComments.comments = function(){
	var tid = Session.get('showTorneoId');
	console.log(tid)
	var tor = Torneos.findOne({_id: tid});
	console.log(tor)
	if (tor){
		return tor.comments;
	}else{
		return [];//tor.comments;
	}
}


Template.torComments.myInfo = function (argument) {
	var info = getMyInfo();
	return info;
}


Template.torComments.show = function() {
    return Session.equals('multiMenuTorneoActive', 'comments') ||
    		Session.equals('soloMenuTorneoActive', 'comments');
};
