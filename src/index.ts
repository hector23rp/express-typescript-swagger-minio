import express from 'express'
import definition from './server-spec.json'
import * as path from 'path'
import swaggerJsdoc from 'swagger-jsdoc'
import * as swaggerUi from 'swagger-ui-express'
import helloRouter from './routes/hello.route'

const options = {
  definition,
  apis: [path.resolve(__dirname, './routes/*.ts')]
}

const openapiSpecification = swaggerJsdoc(options)

const app = express()
app.use(helloRouter)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification))
app.listen(5000, () => {
  console.log('Server listening in http://localhost:5000')
  console.log('- API Docs in http://localhost:5000/api-docs')
})
