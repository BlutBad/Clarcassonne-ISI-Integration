
Template.gchat.rendered = function (){
  $("#gblchat").chatbox({
    id: "danny",
    user: {key: "value"},
    title: "test",
    messageSent: function(id, user, msg){
      $("#gblchat").chatbox("option", "boxManager").addMsg(id, msg);
    }
  });
};


// --------- Prueba 1


// Meteor.startup(function () {
//   $("#chat_div").chatbox({
//     id: "danny",
//     user: {key: "value"},
//     title: "test",
//     messageSent: function(id, user, msg){
//       $("#chat_div").chatbox("option", "boxManager").addMsg(id, msg);
//     }
//   });
// });