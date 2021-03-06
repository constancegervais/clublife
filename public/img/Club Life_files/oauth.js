//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
//                                                                      //
// If you are using Chrome, open the Developer Tools and click the gear //
// icon in its lower right corner. In the General Settings panel, turn  //
// on 'Enable source maps'.                                             //
//                                                                      //
// If you are using Firefox 23, go to `about:config` and set the        //
// `devtools.debugger.source-maps-enabled` preference to true.          //
// (The preference should be on by default in Firefox 24; versions      //
// older than 23 do not support source maps.)                           //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;

/* Package-scope variables */
var Oauth;

(function () {

////////////////////////////////////////////////////////////////////////////////////
//                                                                                //
// packages/oauth/oauth_client.js                                                 //
//                                                                                //
////////////////////////////////////////////////////////////////////////////////////
                                                                                  //
Oauth = {};                                                                       // 1
                                                                                  // 2
// Open a popup window, centered on the screen, and call a callback when it       // 3
// closes.                                                                        // 4
//                                                                                // 5
// @param url {String} url to show                                                // 6
// @param callback {Function} Callback function to call on completion. Takes no   // 7
//   arguments.                                                                   // 8
// @param dimensions {optional Object(width, height)} The dimensions of           // 9
//   the popup. If not passed defaults to something sane.                         // 10
Oauth.showPopup = function (url, callback, dimensions) {                          // 11
  // default dimensions that worked well for facebook and google                  // 12
  var popup = openCenteredPopup(                                                  // 13
    url,                                                                          // 14
    (dimensions && dimensions.width) || 650,                                      // 15
    (dimensions && dimensions.height) || 331                                      // 16
  );                                                                              // 17
                                                                                  // 18
  var checkPopupOpen = setInterval(function() {                                   // 19
    try {                                                                         // 20
      // Fix for #328 - added a second test criteria (popup.closed === undefined) // 21
      // to humour this Android quirk:                                            // 22
      // http://code.google.com/p/android/issues/detail?id=21061                  // 23
      var popupClosed = popup.closed || popup.closed === undefined;               // 24
    } catch (e) {                                                                 // 25
      // For some unknown reason, IE9 (and others?) sometimes (when               // 26
      // the popup closes too quickly?) throws "SCRIPT16386: No such              // 27
      // interface supported" when trying to read 'popup.closed'. Try             // 28
      // again in 100ms.                                                          // 29
      return;                                                                     // 30
    }                                                                             // 31
                                                                                  // 32
    if (popupClosed) {                                                            // 33
      clearInterval(checkPopupOpen);                                              // 34
      callback();                                                                 // 35
    }                                                                             // 36
  }, 100);                                                                        // 37
};                                                                                // 38
                                                                                  // 39
                                                                                  // 40
var openCenteredPopup = function(url, width, height) {                            // 41
  var screenX = typeof window.screenX !== 'undefined'                             // 42
        ? window.screenX : window.screenLeft;                                     // 43
  var screenY = typeof window.screenY !== 'undefined'                             // 44
        ? window.screenY : window.screenTop;                                      // 45
  var outerWidth = typeof window.outerWidth !== 'undefined'                       // 46
        ? window.outerWidth : document.body.clientWidth;                          // 47
  var outerHeight = typeof window.outerHeight !== 'undefined'                     // 48
        ? window.outerHeight : (document.body.clientHeight - 22);                 // 49
  // XXX what is the 22?                                                          // 50
                                                                                  // 51
  // Use `outerWidth - width` and `outerHeight - height` for help in              // 52
  // positioning the popup centered relative to the current window                // 53
  var left = screenX + (outerWidth - width) / 2;                                  // 54
  var top = screenY + (outerHeight - height) / 2;                                 // 55
  var features = ('width=' + width + ',height=' + height +                        // 56
                  ',left=' + left + ',top=' + top + ',scrollbars=yes');           // 57
                                                                                  // 58
  var newwindow = window.open(url, 'Login', features);                            // 59
  if (newwindow.focus)                                                            // 60
    newwindow.focus();                                                            // 61
  return newwindow;                                                               // 62
};                                                                                // 63
                                                                                  // 64
// XXX COMPAT WITH 0.7.0.1                                                        // 65
// Private interface but probably used by many oauth clients in atmosphere.       // 66
Oauth.initiateLogin = function (credentialToken, url, callback, dimensions) {     // 67
  Oauth.showPopup(                                                                // 68
    url,                                                                          // 69
    _.bind(callback, null, credentialToken),                                      // 70
    dimensions                                                                    // 71
  );                                                                              // 72
};                                                                                // 73
                                                                                  // 74
////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
if (typeof Package === 'undefined') Package = {};
Package.oauth = {
  Oauth: Oauth
};

})();

//# sourceMappingURL=cc3d70baf1c86af1ff6722f6a7a40636be58646c.map
