Template.dashboard.show = function() {
  return Session.get('current_stage') == 'Dashboard';
};