(function(){Template.__define__("userSearch",Package.handlebars.Handlebars.json_ast_to_func([[">","userMenu"],"\n  <div id=\"search-bar-container\">\n    <input type=\"text\" id=\"search\" placeholder=\"Club Name\">\n    <input type=\"button\" class=\"search-bar\" value=\"Search\">\n  </div>\n  ",[">","searchFaculty"]]));
Template.__define__("searchFaculty",Package.handlebars.Handlebars.json_ast_to_func(["<div>\n    <select>\n      <option value=\"Engineering\" ? ' selected=\"selected\"'>Engineering </option>\n      <option value=\"Math\" ? ' selected=\"selected\"'>Math</option>\n      <option value=\"Arts\" ? ' selected=\"selected\"'>Arts</option>\n      <option value=\"Science\" ? ' selected=\"selected\"'>Science</option>\n    </select>\n    <input type=\"button\" class=\"searchFaculty\" value=\"Search\">  \n  </div>"]));

})();