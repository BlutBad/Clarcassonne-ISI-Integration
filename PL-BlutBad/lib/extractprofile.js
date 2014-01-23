//@Param userObjId - expects either user object or id
//
//Returns a basic user information object:
// ._id - the Meteor.users id
// .id  - service id
// .accessToken - service access token
// .serviceName - name of service eg. facebook, google etc.
// .email       - user email, not to be expected from twitter service
// .username    - profile username
// .twitterUsername - twitters @username
// 
// tested with facebook, twitter, google, password
// TODO: add picture / profile photo

function getRandomInt (min, max) {
	    return Math.floor(Math.random() * (max - min + 1)) + min;
}
    
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
    //result.email=(user.profile && user.profile.email)?user.profile.email:result.email;
    result.datebirth=(user.profile)?user.profile.datebirth: result.datebirth;
    //console.log(result.email);
    result.genero=(user.profile)?user.profile.genero: result.genero;
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
      }  //EO for
    } //EO user.services

    return result;
  } else {
    //console.log('user id or user object not found: '+userObjId);
    return null;
  }  
}; //EO extractProfile




resolverUser = function(id) {
    result  = _extractProfile(id.user_id)
    fecha = getRandomInt(1,30) + "/"+getRandomInt(1,12) +"/"+getRandomInt(1900,2010)
    return {nombre: result.username, fecha: fecha}
}






getRangoUser = function (game_id, user_id) {
  if (game_id) {
        //console.log(user_id) 
        rankingU = Ranking.findOne({ 
            game_id : game_id, 
            user_id : user_id 
        }); 
        //console.log(rankingU)
        if (rankingU) { 
            return Rangos.findOne({ 
                _id : rankingU.rango_id 
            }).rango; 
        } else {
            var rango = Rangos.findOne({minPoints:{$lte: 0}}).rango; 
            return rango;
        } 
    } else { 
        return "--";
    }  


  // body...
}