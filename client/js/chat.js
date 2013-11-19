// --- Begin: Chat Global ---

Template.gblmsgs.msgs = function() {
  return Global_msgs.find({},{sort: {time: -1}});
};

Template.wrmsg.events = {
  'click input#sendmsg': function() {
    if (Meteor.user()) {
      var user = Meteor.user().emails[0].address;
    } else {
      var user = 'Unknown';
    }
    var msg = $('input#msg');
    if (msg.val() != '') {
        Global_msgs.insert({user:user, msg:msg.val(), time:Date.now});
        msg.val('');
      }
    }
};
// --- End: Chat Global ---