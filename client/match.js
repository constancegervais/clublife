Meteor.startup(function () {

Session.set('extraversion', null);
Session.set('sensing', null);
Session.set('feeling', null);
Session.set('prospecting', null);

Template.match.events({
		'click .extraversion': function() {
			Session.set('extraversion', 'etrue');

			router.matchTwo();
		},
		'click .introversion': function(e) {
			Session.set('extraversion', 'efalse');

			router.matchTwo();
		},
		'click .sensing': function(e) {
			Session.set('sensing', 'strue');

			router.matchThree();
		},
		'click .intuition': function(e) {
			Session.set('sensing', 'sfalse');

			router.matchThree();
		},
		'click .feeling': function() {
			Session.set('feeling', 'ftrue');

			router.matchFour();
		},
		'click .thinking': function(e) {
			Session.set('feeling', 'ffalse');

			router.matchFour();
		},
		'click .prospecting': function(e) {
			Session.set('prospecting', 'ptrue');

			router.matchResults();
		},
		'click .judging': function(e) {
			Session.set('prospecting', 'pfalse');

			router.matchResults();
		}
	});
});