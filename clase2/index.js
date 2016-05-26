'use strict';

var AC = {
  user: null,
  loadUser: function (userId, callback) {
    $.getJSON('/' + userId + '.json', function (data) {
      AC.user = data;
      callback();
    });
  },
  getUserHtml: function () {
    var html = '';
    html += '<h1>' + AC.user.name + '</h1>';
    html += '<div>Email: ' + AC.user.email + '</div>';
    html += '<div>Twitter: ' + AC.user.twitter + '</div>';
    html += '<div>Professions: ' + AC.user.profession.join(', ') + '</div>';
    return html;
  },
  renderUser: function () {
    $('#content')
      .html(AC.getUserHtml())
      .css({ backgroundColor: AC.config.backgroundColor });
  },
  config: {
    backgroundColor: 'lightgray'
  },
  polyfill: function () {
    // $(selector)
    window.$ = window.$ || function (selector) {
      var elements = document.querySelectorAll(selector);
      var list = Array.prototype.slice.call(elements);
      return {
        // $().click()
        click: function (handler) {
          list.forEach(function (elem) {
            elem.addEventListener('click', handler);
          });
          return this;
        },
        // $().html()
        html: function (html) {
          list.forEach(function (elem) {
            elem.innerHTML = html;
          });
          return this;
        },
        // $().css()
        css: function (properties) {
          list.forEach(function (elem) {
            Object.keys(properties).forEach(function (prop) {
              elem.style[prop] = properties[prop];
            });
          });
          return this;
        }
      }
    }
    // $.getJSON()
    $.getJSON = $.getJSON || function (url, callback) {
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          callback(JSON.parse(request.responseText));
        }
      };
      request.send();
    }
  },
  init: function (selector) {
    AC.polyfill();
    $(selector).click(function () {
      AC.loadUser(prompt('Enter user name'), AC.renderUser);
    });
  }
};

// ---

AC.config.backgroundColor = 'lightblue';
AC.init('#load');
