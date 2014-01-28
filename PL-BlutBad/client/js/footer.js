var openCreateTerm = function () {
	Session.set("creatTError", null);
	Session.set("showtermine", true);
}; 

Template.pie.events = {    
   
	'click .terms': function() {
		console.log("here");
		openCreateTerm();
	}	 
}; 

Template.pie.showterms = function() {
    return Session.get('showtermine'); 
};
