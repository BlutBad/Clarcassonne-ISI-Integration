
_extractProfile = function (userObjId) {
  if (!userObjId)
    return null;
    //Check if an _id isset otherwise assume input as being _id
    var user = (userObjId._id)?userObjId: Meteor.users.findOne({_id: userObjId});
  if (user) {
    //setup default object from user profile
    var result = {
      _id: (user._id)?(user._id):null, //if null then really no point in going on
      id: null,
      accessToken: null,
      serviceName: 'password', //default service
      email: (user.emails && user.emails.length)?user.emails[0].address:null, //a bit off, should be placed in service->password->email?
      username: (user.username)?user.username:null,
      twitterUsername: null, //@username - kinda off that twitter dont do email
    };
    result.username = (user.profile && user.profile.name)?user.profile.name:result.username;

    //Check if the user logged in via a service
    if (user.services) {
      //Iterate through services
      for (var serviceName in user.services) {
        var serviceObject = user.services[serviceName];
        //If an 'id' isset then assume valid service
        if (serviceObject.id) {
          //Merge result with service info
          result.id = serviceObject.id;
          result.email = (serviceObject.email) ? serviceObject.email : result.email;
          result.serviceName = serviceName;
          result.accessToken = (serviceObject.accessToken) ? serviceObject.accessToken : null;
          result.twitterUsername = (serviceObject.screenName) ? serviceObject.screenName : null;
        } //EO serviceObject.id
      } //EO for
    } //EO user.services
    return result;
  } else {
    console.log('user id or user object not found: '+userObjId);
    return null;
  }
}; //EO extractProfile


resolverUser = function(id) {
	var name = Meteor.users.findOne({_id:id.user_id}).username;
    return {nombre: name, fecha: "12/11/1983"}
}
