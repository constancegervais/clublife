// first, remove configuration entry in case service is already configured
Accounts.loginServiceConfiguration.remove(
{
  service: "facebook"
});

Accounts.loginServiceConfiguration.insert(
{
  service: "facebook",
  appId: "1414946185419628",
  secret: "b2ce13611bcaf0d030080864467f3b0c"
});

// Accounts.onCreateUser(function(options, user) {
//     if (options.profile) {
//         options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture?type=larger";
//         user.profile = options.profile;
//     }
//     return user;
// });

