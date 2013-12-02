Template.dashboard.show = function() {
  return Session.get('current_stage') == 'Dashboard';
};

Template.rangos.ColRango = function() {
	  return Rangos.find({});
};

