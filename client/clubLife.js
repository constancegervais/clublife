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

		router.gotoClubHome(club.clubName);
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
		var club = {
			createdAt: (new Date()),
	        clubName: $('#clubName').val(),
	        members: [],
	        events:[],
	        clubDescription: $('#clubDesc').val(),
	        clubCategory: $('#clubCat').val(),
	        clubTag: $('#clubTag').val().split(','),
	        Faculty: $('#clubFaculty').val(),
	        logo: $('clubPic').val(),
			PersonalityTest: [
				$('input[name="extraversion"]:checked').val(),
				$('input[name="Sensing"]:checked').val(),
				$('input[name="feeling"]:checked').val(),
				$('input[name="prospecting"]:checked').val()
			]
		};

		FedsClubs.insert(club);
		Session.set('loggedInClub', club);
		router.gotoClubHome(club.clubName);	
	}
});

//# Club Menu
//===========
Template.clubMenu.events({
	'click .brand':function() {
		var club = Session.get('loggedInClub');
		router.gotoClubHome(club.clubName);	
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
Template.clubHome.currentClub = function () {
	var club = Session.get('loggedInClub');
    return FedsClubs.find({
    	clubName: club.clubName
    });
};

$(document).on('click', '#clubLoginBtn, #clubHomePage, #createEvent, .createClub', function() {
setTimeout(function(){
		var currentClub = Session.get('loggedInClub');
		var cEvents =  currentClub.events;

	   	var calendar = $("#calendar").fullCalendar({
	        header: {
	          left: 'prev,next today',
	          center: 'title',
	          right: 'month,agendaWeek,agendaDay'
	        },
	        editable: true,
	        events: cEvents
	      });
}, 10);
});


//# Club Create Event
//===================
Template.clubEvent.rendered = function() {
	 $(function() {
	 	$( "#datepicker" ).datepicker();
	 });
};

Template.clubEvent.events({

	'click .createEvent':function(){

		var currentClub = Session.get('loggedInClub');
		var cEvent = {
			title: $('#eventName').val(),
			start: $('#datepicker').val(),
			url: $('#eURL').val()
		}; 

    	FedsClubs.update(currentClub._id, {$addToSet: {events: cEvent}});

    	Session.set('lo')
		router.gotoClubHome(currentClub.clubName);
	}
});

//# Club Memebers
//===============
Template.clubMembers.members = function () {
	var club = Session.get('loggedInClub');

    var clubCursor = FedsClubs.findOne({
    	clubName: club.clubName
    });
    return clubCursor.members;
};

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
	'click .brand':function() {
		router.home();
	},
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

//For some reason, this is showing up even when not called. :/
Template.searchR.searchResults = function () {
    var keyword = Session.get("search-query");
    var query = new RegExp( keyword, 'i' );
    return FedsClubs.find({ $or: [{clubTag: { $all: [query]}}, 
        { clubCategory: query }, 
        { clubDescription: query },
        { clubName: query }, 
        { Faculty: query } ]});
 };

Template.userSearch.events({
    'keyup input.search-query': function (evt) {
          Session.set("search-query", evt.currentTarget.value);
    },
    'submit form':function(evt,template){
    event.preventDefault();
    Session.set("searchQuery",template.find(".search-query").value);
    }
});

Template.searchR.events({
	'click .searchResults': function(e){
    	var selectedClub = this._id;

    	Session.set('selectedClub', this);
    	router.gotoUserClub(selectedClub);
    } 
});
//# User Match
//============

Template.matchResults.perfMatching = function () {
    //THIS WILL BE INPUT FROM THE USER.
    extraversion = Session.get("extraversion");
    sensing = Session.get("sensing");
    feeling = Session.get("feeling");
    prospecting = Session.get("prospecting");

    //var perfectClubMatch 
    return (FedsClubs.find({$and: [{"PersonalityTest" : extraversion}, {"PersonalityTest" : sensing}, 
      {"PersonalityTest" : feeling}, {"PersonalityTest" : prospecting}]}));
};

Template.matchResults.events({
	'click .matches': function(e){
    	var selectedClub = this._id;

    	Session.set('selectedClub', this);
    	router.gotoUserClub(selectedClub);
    } 
});

//# View Club Information
//=======================
Template.userClub.club = function(){
	var club = Session.get('selectedClub');
	return FedsClubs.find({
		_id: club._id
	});
};

Template.userClub.events({
	'click .joinClub': function(){
		var selectedClub = Session.get('selectedClub');
		var user = Meteor.user();
		var member = {
			mID: user._id,
			mName: user.profile.name,
			mPic: user.profile.picture
		};

		FedsClubs.update(selectedClub._id, {$addToSet: {members: member}});
		router.gotoJoinClub();
	}
});

Template.joinedClub.clubJoined = function(){
	var club = Session.get('selectedClub');
	return FedsClubs.find({
		_id: club._id
	});
};

Template.joinedClub.memberJoined = function()
{
	if (Meteor.user()) {
		var name = Meteor.user().profile.name;

		if (!name) return '';
		return name;
	}
};

$(document).on('click', '.searchResults, .matches', function() {
setTimeout(function(e){

		var currentClub = Session.get('selectedClub');

		var cEvents =  currentClub.events;
	   	var calendar = $("#clubCalendar").fullCalendar({
	        header: {
	          left: 'prev,next today',
	          center: 'title',
	          right: 'month,agendaWeek,agendaDay'
	        },
	        editable: true,
	        events: cEvents
	      });
}, 10);
});

//# About Us
//==========

//# User Profile
//==============
Template.profile_pic.profile_pic = function() {
	if (Meteor.user()) {
		var picture = Meteor.user().profile.picture;

		if (!picture) return '';
		return picture;
	}
};



//# Router 
//========

var Router = Backbone.Router.extend({
	routes: {
		'club': 'clubLoginView',
		'club/:club': 'gotoClubHome',
		'search': 'userSearch',
		'match': 'userMatch',
		'': 'home',
		'aboutUs': 'aboutUs',
		'createClub': 'createClub',
		'event/:club': 'event',
		'members/:club': 'members',
		'match': 'match',
    	'match/one': 'matchOne',
    	'match/two': 'matchTwo',
    	'match/three': 'matchThree',
    	'match/four': 'matchFour',
    	'match/results': 'matchResults',
    	'userClub/:clubId': 'gotoUserClub',
    	'joinedClub': 'gotoJoinClub',
    	'eventCreated': 'gotoEventCreated'
	},

	clubLoginView: function() {
		Session.set('partial', 'clubLogin');
		this.navigate('store', true);
	},

	gotoClubHome: function(clubName) {
		// var club = Session.get('loggedInClub');

		Session.set('partial', 'clubHome');

		this.navigate('club/'+clubName, true);
	},

	userSearch: function() {
		Session.set('partial', 'userSearch');
		this.navigate('search', true);		
	},

	userMatch: function() {
		Session.set('partial', 'match');
		this.matchOne();
	},

	matchOne: function(){
		Session.set('partial', 'match');

  		$("#match_one").addClass("active");
  		router.navigate('match/one', true);
			$("#match_one").fadeIn();

			$("#match_two, #match_three, #match_four, #match_results").hide();
  	},

	matchTwo: function(){
		Session.set('partial', 'match');

  		$("#match_two").addClass("active");
			$("#match_one").fadeOut( function() {
				$(this).removeClass("active");
				router.navigate('match/two', true);
			$("#match_two").fadeIn();
			});

		$("#match_three, #match_four, #match_results").hide();
  	},

	matchThree: function(){
		Session.set('partial', 'match');

  		$("#match_three").addClass("active");
			$("#match_two").fadeOut( function() {
				$(this).removeClass("active");
				router.navigate('match/three', true);
			$("#match_three").fadeIn();
			});

		$("#match_one, #match_four, #match_results").hide();
  	},

	matchFour: function(){
		Session.set('partial', 'match');

  		$("#match_four").addClass("active");
			$("#match_three").fadeOut( function() {
				$(this).removeClass("active");
				router.navigate('match/four', true);
			$("#match_four").fadeIn();
			});

		$("#match_one, #match_two, #match_results").hide();
  	},

	matchResults: function(){
		Session.set('partial', 'match');

  		$("#match_results").addClass("active");
			$("#match_four").fadeOut( function() {
				$(this).removeClass("active");
				router.navigate('match/results', true);
			$("#match_results").fadeIn();
			});

		$("#match_one, #match_two, #match_three").hide();
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
	},

	gotoUserClub: function(clubId){
		Session.set('partial', 'userClub');
		this.navigate("userClub/"+clubId, true);

	},

	gotoJoinClub: function(){
		Session.set('partial', 'joinedClub');
		this.navigate('joinedClub', true);

	},
	// gotoEventCreated: function(club){
	// 	Session.set('partial', 'eventCreated');
	// 	this.navigate('eventCreated', true);
	// }
});

router = new Router;

Meteor.startup(function () {
  Backbone.history.start({pushState: true});
});