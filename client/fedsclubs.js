if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to fedsclubs.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}


Template.profile_pic.profile_pic = function() {
  if (Meteor.user()) {
    var picture = Meteor.user().profile.picture;

    if (!picture) return '';
    return picture;
  }
}
// Meteor.loginWithUWaterlooId = function(uWaterlooId, callback) {
//   //create a login request with admin: true, so our loginHandler can handle this request
//   var loginRequest = {uWaterlooId: uWaterlooId};

//   //send the login request
//   Accounts.callLoginMethod({
//     methodArguments: [loginRequest],
//     userCallback: callback
//   });
// };

