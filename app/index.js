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

app.get('/documentation', function (req, res) {
  var docs = []
  var getStarted = []
  var runningProduction = []
  var files = paperpress.getCollections(['get-started', 'docs', 'running-and-production'])

  files.find((item, i) => {
    if (item.type === 'docs') {
      docs.push(item)
    } else if (item.type === 'get-started') {
      getStarted.push(item)
    } else if (item.type === 'running-and-production') {
      runningProduction.push(item)
    }
  })
  res.render('home', {
    docs: docs,
    getStarted: getStarted,
    runningProduction: runningProduction
  })
})

app.get('/documentation/:doc', function (req, res) {
  var files = paperpress.getCollections(['get-started', 'docs'])
  var file = _.findWhere(files, {slug: req.params.doc})

  res.render('documentation', {file})
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
