// http://bootsnipp.com/snippets/featured/radio-button-tabs
// http://bootsnipp.com/snippets/featured/simple-blog-layout-example



Template.hall_torneo.show = function() {
  return Session.get('current_stage') == 'showTorneo';
};


Template.hall_torneo.torneoId = function() {
    return Session.get('showTorneoId');
}