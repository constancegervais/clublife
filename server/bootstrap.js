// if the database is empty on server start, create some sample data.
Meteor.startup(function () {

  if (Meteor.users.find({}).count() === 0) {
    var data = [
      {
        _id: 1,
        createdAt: (new Date()),
        profile: {
          name: 'Joe'
        }
      },
      {
        _id: 2,
        createdAt: (new Date()),
        profile: {
          name: 'Nicole'
        }
      },
      {
        _id: 3,
        createdAt: (new Date()),
        profile: {
          name: 'Josh'
        }
      }
    ];

    // for (var i=0; i<data.length; ++i) {
    //   Meteor.loginWithUWaterlooId(data[i]._id);
    // };
  }

  if (FedsClubs.find({}).count() === 0) {
    var clubData = [
      {
      	createdAt: (new Date()),
        clubName: "Glow",
        members: ["1", "9xJrshnTJ9ADMwmiR"],
        clubDescription: "GLOW is the oldest queer student organization in Canada. Run entirely by dedicated student volunteers, it offers a wide variety of discussion groups, social events, advocacy opportunities, awareness campaigns, resources, and information. Come out and help GLOW promote a healthy attitude towards all sexual orientations and gender identities. If you need someone to talk to, visit the Centre for peer support mentoring.",
        clubCategory: "Social",
        clubTag: ["Gay", "Lesbian", "Sexual Orientation"]
      },
      {
      	createdAt: (new Date()),
        clubName: "Tea Culture Club",
        members: ["2", "9xJrshnTJ9ADMwmiR", "3"],
        clubDescription: "The Tea Culture Club serves to bring together those that enjoy a cup (or two... or three) of tea. Our purpose is to drink tea, and promote tea culture. Every meeting will revolve around exploring the nuances of tea, and as well, provide an environment that allows a moment of zen within the chaos that is university.",
        clubCategory: "Social",
        clubTag: ["Tea", "Culture", "Zen"]
      },
      {
      	createdAt: (new Date()),
        clubName: "Waterloo Orientation - Science",
        members: ["1", "2", "3"],
        clubDescription: "This is the University of Waterloo Science Orientation Group for the 2013 year. This will be a place for Science leaders to communicate, gain information and discuss during the summer and up to the week of orientation as well as after.",
        clubCategory: "Science",
        clubTag: ["Frosh", "Science", "Orientation week"]
      }
    ];

    for (var i=0; i<clubData.length; ++i) {
      FedsClubs.insert(clubData[i]);
    };

  }

});
