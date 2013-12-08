Accounts.loginServiceConfiguration.remove({ 
  service: "google" 
}); 

Accounts.loginServiceConfiguration.remove({
		service: "facebook"
});


Accounts.loginServiceConfiguration.remove({ 
  service: "twitter" 
}); 

Accounts.loginServiceConfiguration.remove({ 
  service: "github" 
}); 


Accounts.loginServiceConfiguration.insert({
	service: "facebook",
	appId: "566975130035476",
	secret: "d292493beb1c02c2e1f732846775fe9c"
});

Accounts.loginServiceConfiguration.insert({
	service: "github",
	clientId: "dbb7ea7d5e4a339bed3c",
	secret:"fbe35d056f81c98144201599d2e0c67fed5efab8"
});


Accounts.loginServiceConfiguration.insert({ 
  service: "google", 
  clientId: "717215542174-g4qcjn7qhcl0hoi3pf6t8mbnsva9i5mr.apps.googleusercontent.com",   
  secret: "X45Ijyr5cdmYQ9J_FAUipf5e" 
});

Accounts.loginServiceConfiguration.insert({
		service: "twitter",
		consumerKey: "1Mr9vItG9LY6Ojx8XyNWFQ",
		secret: "clBRGarlfCvPvL0fmwGyNSUHs9k4HwWAQexxc1GU"
});