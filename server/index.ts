import express from 'express'
import consola from 'consola'
import { Nuxt, Builder } from 'nuxt'
import { createConnection } from 'typeorm'
const app = express()

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'

createConnection()
  .then(async connection => {
    consola.info(`Database connection established to ${connection.name}`)

    // Init Nuxt.js
    const nuxt = new Nuxt(config)

    const { host, port } = nuxt.options.server

    await nuxt.ready()
    // Build only in dev mode
    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    }

    // Give nuxt middleware to express
    app.use(nuxt.render)

    // Listen the server
    app.listen(port, host)
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  })
  .catch(error => consola.error('Unable to connect to the database.', error))
