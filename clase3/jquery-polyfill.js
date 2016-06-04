'use strict';

(function () {
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
    };
  };
  // $.getJSON()
  $.getJSON = $.getJSON || function (url, callback) {
    if (window.fetch) {
      fetch(url)
        .then(response => response.json())
        .then(callback);
    } else {
      var request = new XMLHttpRequest();
      request.open('GET', url, true);
      request.onload = function () {
        if (request.status >= 200 && request.status < 400) {
          callback(JSON.parse(request.responseText));
        }
      };
      request.send();
    }
  };
})();
