'use strict';

var AC = (function () {
  var user = null;

  var config = {
    backgroundColor: 'lightgray'
  };

  function loadUser(userId, callback) {
    $.getJSON('/' + userId + '.json', function (data) {
      user = data;
      callback();
    });
  }

  function getUserHtml() {
    var html = '';
    html += '<h1>' + user.name + '</h1>';
    html += '<div>Email: ' + user.email + '</div>';
    html += '<div>Twitter: ' + user.twitter + '</div>';
    html += '<div>Professions: ' + user.profession.join(', ') + '</div>';
    return html;
  }

  function renderUser() {
    $('#content')
      .html(getUserHtml())
      .css({ backgroundColor: config.backgroundColor });
  }

  function init(selector) {
    $(selector).click(function () {
      loadUser(prompt('Enter user name'), renderUser);
    });
  }

  return {
    config: config,
    init: init
  };
})();
