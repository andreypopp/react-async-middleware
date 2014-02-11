"use strict";

var url        = require('url');
var ReactAsync = require('react-async');

Object.prototype.extend = function(b) {
  for (var prop in b)
    if (b.hasOwnProperty(prop))
      this[prop] = b[prop];
  return this;
};

module.exports = function(component, opts) {
  var opts = opts || { send: true };
  return function(req, res, next) {
    var path = url.parse(req.url).pathname;
    var c = component({path: path}.extend(opts.props || {}));
    ReactAsync.renderComponentToString(c, function(err, markup) {
      if (err) return next(err);
      if (opts.send) res.send(markup);
      else {
        res.body = markup;
        next();
      }
    });
  }
}
