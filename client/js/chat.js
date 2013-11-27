// --- Begin: Chat Global ---

// Template.gblmsgs.msgs = function() {
//   return Global_msgs.find({},{sort: {time: -1}});
// };

Template.chat = function() {
  return Session.get('var1') == 'ok';
}

// Template.wrmsg.events = {
//   'click input#sendmsg': function() {
//     if (Meteor.user()) {
//       var user = Meteor.user().emails[0].address;
//     } else {
//       var user = 'Unknown';
//     }
//     var msg = $('input#msg');
//     if (msg.val() != '') {
//         Global_msgs.insert({user:user, msg:msg.val(), time:Date.now});
//         msg.val('');
//       }
//     }
// };

// --------- Prueba 1
// $(document).ready(function(){
//   $("#gblchat").chatbox({
//     id: "danny",
//     user: {key: "value"},
//     title: "test",
//     messageSent: function(id, user, msg){
//       $("#gblchat").chatbox("option", "boxManager").addMsg(id, msg);
//     }
//   });
// });


// -------- Prueba 2

// chat = {
//   setup: function() {
//     $("#gblchat").chatbox({
//       id: "danny",
//       user: {key: "value"},
//       title: "test",
//       messageSent: function(id, user, msg){
//         $("#gblchat").chatbox("option", "boxManager").addMsg(id, msg);
//       }
//     })
//   }
// }


// $(chat.setup);


 // $(document).ready(function(){
 //          // to create
 //          $("#chat_div").chatbox({id : "chat_div",
 //                                  title : "Title",
 //                                  user : "can be anything",
 //                                  offset: 200,
 //                                  messageSent: function(id, user, msg){
 //                                       alert("DOM " + id + " just typed in " + msg);
 //                                  }});
 //          // to insert a message
 //          $("#chat_div").chatbox("option", "boxManager").addMsg("Mr. Foo", "Barrr!");
 //      });

//});
// --- End: Chat Global ---