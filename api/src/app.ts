import express from 'express'
// import lusca from 'lusca' will be used later
import dotenv from 'dotenv'
import passport from 'passport'
import cors from 'cors'
import cookieParser from 'cookie-parser'

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
app.use(cors({
  origin: (origin: any, callback: any) => {
    // add production address here too
    const whitelist = [
      'http://localhost:3000',
      'http://localhost:5000',
      'https://integrify-library-erokhina.herokuapp.com/',
      'https://incomparable-mermaid-5e7253.netlify.app/',
    ]
    // undefined means request comes from the same origin
    if (whitelist.indexOf(origin) !== -1 || origin === undefined) {
      callback(null, true)
    } else {
      callback(new Error(`Origin ${origin} not allowed by CORS policy`))
    }
  },
  credentials: true
}))
app.use(cookieParser())

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
