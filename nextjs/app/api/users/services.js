import dbConnect from 'app/api/db-connect';
import User from './model'

export const createUser = async (email, password, username) => {
  await dbConnect();
  return await User.create({ email, password, username });
}

export const findUserByEmail

  = async (email) => {
    await dbConnect();
    return await User.findOne({ email });
  };
