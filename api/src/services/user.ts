import User, { UserDocument } from '../models/User'
import { BadRequestError, NotFoundError } from '../helpers/apiError'

const update = async (
  userId: string,
  update: Partial<UserDocument>
): Promise<UserDocument | null> => {
  const foundUser = await User.findByIdAndUpdate(userId, update, {
    new: true,
  })

  if (!foundUser) {
    throw new NotFoundError(`User ${userId} not found`)
  }

  return foundUser.populate('borrowedBooks')
}

const save = async (user: UserDocument): Promise<UserDocument> => {
  return user.save()
}

const findAll = async (): Promise<UserDocument[]> => {
  return User.find().populate('borrowedBooks')
}
const findOne = async (email: string): Promise<UserDocument | null> => {
  return User.findOne({ email }).populate('borrowedBooks')
}

export default {
  update,
  save,
  findAll,
  findOne,
}
