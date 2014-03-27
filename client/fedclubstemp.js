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

		router.clubView(club.clubName);
	}
});

//# Create Club
//=============

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
		return Session.get('partial') ==== partialName;
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
		router.userHome();
	},
	'click .aboutUs': function() {
		router.aboutUs();
	}
});

//# User Home
//===========

//# User Search
//=============

//# User Match
//============

//# View Club Information
//=======================

//# About Us
//==========


//# Router 
//========

var Router = Backbone.Router.extend({
	routes: {
		'club': 'clubLoginView',
		'club/:club': 'clubHome',
		'search': 'userSearch',
		'match': 'userMatch',
		'': 'userHome',
		'aboutUs': 'aboutUs'
	},

	clubLoginView: function() {
		Session.set('partial', 'clubLogin');
		this.navigate('store', true);
	},

	clubView: function(clubName) {
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

	userHome: function() {
		Session.set('partial', 'home');
		this.navigate('', true);
	},

	aboutUs: function() {
		Session.set('partial', 'aboutUs');
		this.navigate('aboutUs', true);
	}
})