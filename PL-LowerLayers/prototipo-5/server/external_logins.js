Accounts.loginServiceConfiguration.remove({ 
  	service: "google" 
}); 

Accounts.loginServiceConfiguration.remove({
	service: "facebook"
});


Accounts.loginServiceConfiguration.remove({ 
  	service: "twitter" 
}); 

Accounts.loginServiceConfiguration.insert({
	service: "facebook",
	appId: "732987596711344",
	secret: "ca06dad77f48e0d0282d65ff283917b2"
});

/*Accounts.loginServiceConfiguration.insert({ 
  service: "google", 
  clientId: "931046716974.apps.googleusercontent.com",   
  secret: "OKn53SVBm-oz9kNRaSm_Vx_9" 
});*/

Accounts.loginServiceConfiguration.insert({
		service: "twitter",
		consumerKey: "e071XNVs9ienvcKeb9OSwg",
		secret: "m0HIHNoKri3LhSOSbvSrHMYjrFCP0Yu9JIUDAbaGE"
});