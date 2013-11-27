
Template.gchat.rendered = function (){
  $("#gblchat").chatbox({
    id: "danny",
    user: {key: "value"},
    title: "test",
    messageSent: function(id, user, msg){
      $("#gblchat").chatbox("option", "boxManager").addMsg(id, msg);
    }
  });
}
