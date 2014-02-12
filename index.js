"use strict";

var url        = require('url');
var ReactAsync = require('react-async');

Object.extend = function(a, b) {
  for (var prop in b)
    if (b.hasOwnProperty(prop))
      a[prop] = b[prop];
  return a;
};

module.exports = function(component, opts) {
  var opts = Object.extend({ sendResponse: true }, opts);
  return function(req, res, next) {
    var path = url.parse(req.url).pathname;
    var props = Object.extend({path: path}, opts.props || {});
    var c = component(props);
    ReactAsync.renderComponentToString(c, function(err, markup) {
      if (err) return next(err);
      if (opts.sendResponse) res.send(markup);
      else {
        res.body = markup;
        next();
      }
    });
  }
}
