
Template.torneos.show = function() {
  return Session.get('current_stage') == 'Torneos';
};

Template.torneos.events = {
  'click input#crear_torneo': function() {
   		openCreateDialog();
   }
};

var openCreateDialog = function () {
  Session.set("createError", null);
  Session.set("showCreateDialog", true);
};

Template.torneos.showCreateDialog = function () {
  return Session.get("showCreateDialog");
};

Template.createDialog.events({
  'click .save': function (event, template) {
  		return Session.get('current_stage') == 'showCreateDialog';
    
  },

  'click .cancel': function () {
    Session.set("showCreateDialog", false);
  }
});

Template.createDialog.error = function () {
  return Session.get("createError");
};
