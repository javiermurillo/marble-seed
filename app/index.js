const path = require('path')
const express = require('express')
const webpack = require('webpack')
const config = require('config')
const Paperpress = require('paperpress')
const expressNunjucks = require('express-nunjucks')
const expressStaticGzip = require('express-static-gzip')

const _ = require('underscore')

const webpackConfig = require('./webpack/dev.config')

const app = express()

var paperpress = new Paperpress({
  baseDirectory: 'app/static'
  // uriPrefix: '/doc'
})
paperpress.load()

app.get('/doc', function (req, res) {
  var docs = paperpress.getCollection('doc')

  res.send(docs)
})

app.get('/doc/:doc', function (req, res) {
  var docs = paperpress.getCollection('doc')
  var doc = _.findWhere(docs, {slug: req.params.doc})
  // console.log('doc =======> ' + JSON.stringify(doc))
  res.render({doc: doc})
})

app.set('views', path.resolve('./app/views'))

expressNunjucks(app, {
  noCache: false
})

if (config.env === 'development') {
  console.log('Starting server in development with webpack hot reload')

  const compiler = webpack(webpackConfig)
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }))

  app.use(require('webpack-hot-middleware')(compiler, {
    log: console.log,
    path: '/__webpack_hmr',
    heartbeat: 10 * 1000
  }))
} else {
  console.log(`Starting server in ${config.env} with static assets`)
  app.use('/assets', expressStaticGzip('app/dist'))
}

app.get('*', function (req, res) {
  res.render('index', {env: config.env})
})

module.exports = app
