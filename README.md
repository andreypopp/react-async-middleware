# react-async-middleware

Connect/express middleware to serve [react-async][ra] components.

    var express           = require('express')
    var ReactMiddleware   = require('react-async-middleware')
    var React             = require('react')

    var App = React.createClass({
      ...
    })

    express()
      .use(ReactMiddleware(App))
      .listen(3000)

[ra]: https://github.com/andreypopp/react-async
