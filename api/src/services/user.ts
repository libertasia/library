import User, { UserDocument } from '../models/User'
import { BadRequestError, NotFoundError } from '../helpers/apiError'

const signUp = async (user: UserDocument): Promise<UserDocument> => {
  const foundUsers = await User.find({
    $or: [
      {
        email: user.email,
      },
      {
        password: user.password,
      },
      {
        userName: user.userName,
      },
    ],
  })

  if (foundUsers.length > 0) {
    throw new BadRequestError('User has already existed in the system')
  }

  return user.save()
}

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUsers = await User.find({
    $or: [
      {
        email: update.email,
      },
      {
        userName: update.userName,
      },
    ],
  })

  if (foundUsers.length > 0) {
    throw new BadRequestError(
      'User with this email or userName has already existed in the system'
    )
  }

  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser
}

export default {
  signUp,
  update,
}
