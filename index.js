var url        = require('url');
var ReactAsync = require('react-async');

module.exports = function(component) {
  return function(req, res, next) {
    var path = url.parse(req.url).pathname;
    var c = component({path: path});
    ReactAsync.renderComponentToString(c, function(err, markup) {
      if (err) return next(err);
      res.send(markup);
    });
  }
}
