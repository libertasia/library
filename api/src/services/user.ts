import User, { UserDocument } from '../models/User'
import { BadRequestError, NotFoundError } from '../helpers/apiError'

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUsers = await User.find({
    $and: [
      {
        $or: [
          {
            userName: update.userName,
          },
        ],
      },
      {
        _id: { $ne: userId },
      },
    ],
  })

  if (foundUsers.length > 0) {
    throw new BadRequestError(
      'User with this userName has already existed in the system'
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

const save = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find()
}
const findOne = async (email: string): Promise<UserDocument | null> => {
  console.log('email:', email)
  return User.findOne({ email })
}

export default {
  update,
  save,
  findAll,
  findOne,
}
