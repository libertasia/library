// @ts-ignore
import GoogleStrategy from 'passport-google-id-token'

import User, { UserDocument } from '../models/User'
import UserService from '../services/user'

const isAdmin = (email: string) => {
  if (email !== 'erokhinaanastasiia@gmail.com') return false
  return true
}

const loginWithGoogle = () => {
  return new GoogleStrategy(
    {
      cliendID: process.env.GOOGLE_CLIENT_ID,
    },
    async (
      parsedToken: {
        payload: {
          family_name: string
          given_name: string
          name: string
          email: string
          hd: string
        }
      },
      googleID: string,
      done: Function
    ) => {
      try {
        let user = await UserService.findOne(parsedToken.payload.email)
        console.log('isUserExists:', !!user)

        if (!user) {
          user = {
            firstName: parsedToken.payload.given_name || '',
            lastName: parsedToken.payload.family_name || '',
            userName: parsedToken.payload.name || '',
            email: parsedToken.payload.email,
            role: isAdmin(parsedToken.payload.email) ? 'ADMIN' : 'USER',
          } as UserDocument

          const newUser = new User(user)
          await UserService.save(newUser)
        }
        // Append user object to req.user
        done(null, user)
      } catch (error) {
        done(error)
      }
    }
  )
}

export default loginWithGoogle
