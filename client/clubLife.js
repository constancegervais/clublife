Session.set('partial', 'home');

// # logged Out
// ============

Template.loggedOut.helpers({
	partial: function(partialName) {
		return Session.get('partial') === partialName;
	}
});

Template.loggedOut.events({
	'click .goto-club-login': function() {
		router.clubLoginView();
	}
});

//# Club Login
//=============
Session.set('loggedInClub', null);

Template.clubLogin.events({
	'click .goto-club-view': function(e){
		var username = $('#club_username').val();
		var club = FedsClubs.findOne({
			clubName: username
		});

		if (!club) return;

		Session.set('loggedInClub', club);

		router.clubHome(club.clubName);
	},
	'click .goto-create-club': function() {
		router.createClub();
	}
});

//# Create Club
//=============
Session.set('loggedInClub', null);

Template.createClub.events({
	'click .createClub': function(e) {
		//Create Club to add to Collection
		var club = $('#clubName').val();


		Session.set('loggedInClub', club);

		router.clubHome(club);	
	}
});

//# Club Menu
//===========
Template.clubMenu.events({
	'click .brand':function() {
		var club = Session.get('loggedInClub');
		router.clubHome(club.clubName);	
	},
	'click .event': function() {
		var club = Session.get('loggedInClub');
		router.events(club.clubName);
	},
	'click .members': function() {
		var club = Session.get('loggedInClub');
		router.members(club.clubName);
	},
	'click .logout': function(){
		router.home();
	}
});

//# Club Home
//===========

//# Club Create Event
//===================

//# CLub Memebers
//===============

//# Logged In
//===========

Template.loggedIn.helpers({
	partial: function(partialName){
		return Session.get('partial') === partialName;
	}
});

//# User Nav Bar
//=========

Template.userMenu.events({
	'click .search': function() {
		router.userSearch();
	},
	'click .match': function() {
		router.userMatch();
	},
	'click .userHome': function() {
		router.home();
	},
	'click .aboutUs': function() {
		router.aboutUs();
	},
	'click .logout': function(){
		router.home();
	}
});

//# User Home
//===========

//# User Search
//=============
Template.userSearch.events = {
  'click input.search-bar': function () {
        //Have to figure out how to avoid empty searches.
    var searchQuery = document.getElementById("search").value;
    if (searchQuery && searchQuery !== " "){
      var cursor = FedsClubs.find({ $or: [{clubTag: { $all: [searchQuery]}}, 
        { clubCategory: searchQuery }, 
        { clubDescription: new RegExp(searchQuery) },
        { clubName: new RegExp(searchQuery)} ]});
      console.log((cursor.fetch()));
    }
    else
    {
      console.log("Please enter a query.");
    }
  }
}

Template.searchFaculty.events = {
  'click input.searchFaculty': function() {
    //Get output from form.
    var searchF = "Science";
    var cursor = FedsClubs.find({ Faculty: searchF });
    console.log((cursor.fetch()));
  } 
    //DO SOMETHING WITH searchQuery here.
}
//# User Match
//============
Template.match.events = {
  'click input.match-me': function () {
    //THIS WILL BE INPUT FROM THE USER.
    var extraversion;
    var sensing;
    var feeling;
    var prospecting;

    if(true)
    {
      extraversion = "etrue";
      sensing = "strue";
      feeling = "ftrue";
      prospecting = "ptrue";
    }

    var perfectClubMatch = FedsClubs.find({$and: [{"PersonalityTest" : extraversion}, {"PersonalityTest" : sensing}, 
      {"PersonalityTest" : feeling}, {"PersonalityTest" : prospecting}]});

    var similarClubMatch = FedsClubs.find({$or: [{$and: [{"PersonalityTest" : {$ne: extraversion}}, 
      {"PersonalityTest" : {$ne: sensing}}, {"PersonalityTest" : {$ne: feeling}}, {"PersonalityTest" : {$ne: prospecting}}]}, 
      {$or: [{"PersonalityTest" : extraversion}, {"PersonalityTest" : sensing}, 
      {"PersonalityTest" : feeling}, {"PersonalityTest" : prospecting}]}]});


    //WHEN OUTPUTTING TO HTML, MAKE SURE THAT IT WILL FILTER OUT DUPLICATES WHEN
    //MAKING THE RESULTS OBJECTS. CURRENTLY, WILL HAVE DUPLICATES. :/
    
    if (perfectClubMatch.count() > 0)
    {
      console.log("Perfect Match!");
      console.log(perfectClubMatch.fetch());

      if(similarClubMatch.count() > 0)
      {
        console.log("Similar Matches!");
        console.log(similarClubMatch.fetch());
      }
    }
    else if (similarClubMatch.count() > 0)
    {
      console.log("Similar Matches!");
      console.log(similarClubMatch.fetch());
    }
    else
    {
      console.log("No matches. :(")
    }
  }
}

//# View Club Information
//=======================

//# About Us
//==========

//# User Profile
//==============


//# Router 
//========

var Router = Backbone.Router.extend({
	routes: {
		'club': 'clubLoginView',
		'club/:club': 'clubHome',
		'search': 'userSearch',
		'match': 'userMatch',
		'': 'home',
		'aboutUs': 'aboutUs',
		'createClub': 'createClub',
		'event/:club': 'event',
		'members/:club': 'members'
	},

	clubLoginView: function() {
		Session.set('partial', 'clubLogin');
		this.navigate('store', true);
	},

	clubHome: function(clubName) {
		var club = Session.get('loggedInClub');

		if(!club){
			this.home();
			return;
		}

		Session.set('partial', 'clubHome');

		this.navigate('club/'+clubName, true);
	},

	userSearch: function() {
		Session.set('partial', 'userSearch');
		this.navigate('search', true);		
	},

	userMatch: function() {
		Session.set('partial', 'match');
		this.navigate('match', true);
	},

	home: function() {
		Session.set('partial', 'home');
		this.navigate('', true);
	},

	aboutUs: function() {
		Session.set('partial', 'aboutUs');
		this.navigate('aboutUs', true);
	},

	createClub: function() {
		Session.set('partial', 'createClub');
		this.navigate('createClub', true);
	},

	events: function(clubName) {
		Session.set('partial', 'clubEvent');
		this.navigate('event/'+clubName, true);

	},

	members: function(clubName) {
		Session.set('partial', 'clubMembers');
		this.navigate('members/'+clubName, true);
	}
});

router = new Router;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});