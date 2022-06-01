import express from 'express'
// import lusca from 'lusca' will be used later
import dotenv from 'dotenv'
import passport from 'passport'
import cors from 'cors'

import initRouter from './routers/initLibrary'
import authRouter from './routers/auth'
import categoryRouter from './routers/category'
import bookRouter from './routers/book'
import authorRouter from './routers/author'
import userRouter from './routers/user'
import apiErrorHandler from './middlewares/apiErrorHandler'
import apiContentType from './middlewares/apiContentType'
import loginWithGoogle from './passport/google'

dotenv.config({ path: '.env' })
const app = express()

// Express configuration
app.set('port', process.env.PORT || 3000)

// Global middleware
app.use(apiContentType)
app.use(express.json())
app.use(cors())

app.use(passport.initialize())
passport.use(loginWithGoogle())

// Set up routers
app.use('/api/v1/', initRouter)
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/categories', categoryRouter)
app.use('/api/v1/books', bookRouter)
app.use('/api/v1/authors', authorRouter)
app.use('/api/v1/users', userRouter)

// Custom API error handler
app.use(apiErrorHandler)

export default app
