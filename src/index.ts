import express from 'express'
import definition from './server-spec.json'
import * as path from 'path'
import swaggerJsdoc from 'swagger-jsdoc'
import * as swaggerUi from 'swagger-ui-express'
import multimediaRouter from './routes/multimedia.route'
import { createBucket } from './services/minio.service'

const init = async () => {
  // Configure Swagger
  const options = {
    definition,
    apis: [path.resolve(__dirname, './routes/*.ts')]
  }
  const openapiSpecification = swaggerJsdoc(options)

  // Configure routes
  const app = express()
  app.use(multimediaRouter)
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))

  // Configure Minio.io Bucket
  try {
    console.log('Connecting to Minio.io server..')
    await createBucket()
    console.log('Connected!')
  } catch (error) {
    console.error(error)
    process.exit(0)
  }

  // Run API
  app.listen(5000, () => {
    console.log('Server listening in http://localhost:5000')
    console.log('- API Docs in http://localhost:5000/api-docs')
  })
}

init()
