// first, remove configuration entry in case service is already configured
if (Meteor.isServer) {
  Meteor.startup(function () {
    
    Accounts.loginServiceConfiguration.remove(
    {
      service: "facebook"
    }),

    Accounts.loginServiceConfiguration.insert(
    {
      service: "facebook",
      appId: "1414946185419628",
      secret: "b2ce13611bcaf0d030080864467f3b0c"
    }),

    Accounts.onCreateUser(function(options, user) {
    if (options.profile) {
        options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture?width=300&height=300";
        user.profile = options.profile;
    }
    return user;
});

    }
  );
}

// Accounts.onCreateUser(function(options, user) {
//     if (options.profile) {
//         options.profile.picture = "http://graph.facebook.com/" + user.services.facebook.id + "/picture?type=larger";
//         user.profile = options.profile;
//     }
//     return user;
// });

function Facebook(accessToken) {
    this.fb = Meteor.require('fbgraph');
    this.accessToken = accessToken;
    this.fb.setAccessToken(this.accessToken);
    this.options = {
        timeout: 3000,
        pool: {maxSockets: Infinity},
        headers: {connection: "keep-alive"}
    }
    this.fb.setOptions(this.options);
}

Facebook.prototype.query = function(query, method) {
    var self = this;
    var method = (typeof method === 'undefined') ? 'get' : method;
    var data = Meteor.sync(function(done) {
        self.fb[method](query, function(err, res) {
            done(null, res);
        });
    });
    return data.result;
}

Facebook.prototype.getUserData = function() {
    return this.query('me');
}

Facebook.prototype.getFriendsData = function() {
    return this.query('/me/friends');
}

Meteor.methods({
    getUserData: function() {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getUserData();
        return data;
    },
    getFriendsData: function() { 
    var fb = new Facebook(Meteor.user().services.facebook.accessToken);
    var data = fb.getFriendsData();
    console.log("function");

    data.data.forEach(function(friend){
        ConstanceFriends.insert(friend);
    });	

	}
});