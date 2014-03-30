(function(){// if (Meteor.isClient) {
//       var date = new Date();
//       var d = date.getDate();
//       var m = date.getMonth();
//       var y = date.getFullYear();
//     $(document).ready(function() {
//       $("#calendar").fullCalendar({
//         header: {
//           left: 'prev,next today',
//           center: 'title',
//           right: 'month,agendaWeek,agendaDay'
//         },
//         editable: true,
//         events: [
//           {
//             title: 'All Day Event',
//             start: new Date(y, m, 1)
//           },
//           {
//             title: 'Long Event',
//             start: new Date(y, m, d-5),
//             end: new Date(y, m, d-2)
//           },
//           {
//             id: 999,
//             title: 'Repeating Event',
//             start: new Date(y, m, d-3, 16, 0),
//             allDay: false
//           },
//           {
//             id: 999,
//             title: 'Repeating Event',
//             start: new Date(y, m, d+4, 16, 0),
//             allDay: false
//           },
//           {
//             title: 'Click for Google',
//             start: new Date(y, m, 28),
//             end: new Date(y, m, 29),
//             url: 'http://google.com/'
//           }
//         ]
//       });
//     });
// }

// Template.profile_pic.profile_pic = function() {
//   if (Meteor.user()) {
//     var picture = Meteor.user().profile.picture;

//     if (!picture) return '';
//     return picture;
//   }
// }


})();
