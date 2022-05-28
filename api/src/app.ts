import express from 'express'
// import lusca from 'lusca' will be used later
import dotenv from 'dotenv'

import initRouter from './routers/initLibrary'
import categoryRouter from './routers/category'
import bookRouter from './routers/book'
import authorRouter from './routers/author'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

// Global middleware
app.use(apiContentType)
app.use(express.json())

// Set up routers
app.use('/api/v1/', initRouter)
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/authors', authorRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
