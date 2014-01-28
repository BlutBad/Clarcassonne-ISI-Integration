Template.ayuda.show = function() {
  	return Session.get('current_stage') == 'Ayuda';
};
var openCreateTerm = function () {
	Session.set("creatTError", null);
	Session.set("showtermine", true);
}; 

Template.ayuda.events = {    
   
	'click .terms': function() {
		console.log("here");
		openCreateTerm();
	}	 
}; 




Template.ayuda.showterms = function() {
    return Session.get('showtermine'); 
};

