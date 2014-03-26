if (Meteor.isClient) {
      var date = new Date();
      var d = date.getDate();
      var m = date.getMonth();
      var y = date.getFullYear();
    $(document).ready(function() {
      $("#calendar").fullCalendar({
        header: {
          left: 'prev,next today',
          center: 'title',
          right: 'month,agendaWeek,agendaDay'
        },
        editable: true,
        events: [
          {
            title: 'All Day Event',
            start: new Date(y, m, 1)
          },
          {
            title: 'Long Event',
            start: new Date(y, m, d-5),
            end: new Date(y, m, d-2)
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, d-3, 16, 0),
            allDay: false
          },
          {
            id: 999,
            title: 'Repeating Event',
            start: new Date(y, m, d+4, 16, 0),
            allDay: false
          },
          {
            title: 'Click for Google',
            start: new Date(y, m, 28),
            end: new Date(y, m, 29),
            url: 'http://google.com/'
          }
        ]
      });
    });
}

Template.profile_pic.profile_pic = function() {
  if (Meteor.user()) {
    var picture = Meteor.user().profile.picture;

    if (!picture) return '';
    return picture;
  }
}

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

Template.search.events = {
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

// Meteor.loginWithUWaterlooId = function(uWaterlooId, callback) {
//   //create a login request with admin: true, so our loginHandler can handle this request
//   var loginRequest = {uWaterlooId: uWaterlooId};

//   //send the login request
//   Accounts.callLoginMethod({
//     methodArguments: [loginRequest],
//     userCallback: callback
//   });
// };

