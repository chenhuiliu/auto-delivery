import dbConnect from 'app/api/db-connect';
import User from './model'

export const createUser = async (email, password, username) => {
  await dbConnect();
  // 新注册会员，24小时体验会员
  return await User.create({
    email,
    password,
    rose: '2',
    username,
    roseExpireAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
    createTime: new Date()
  })
}

export const findUserByEmail
  = async (email) => {
    await dbConnect();
    return await User.findOne({ email });
  };
export const findUserByEmailAndId
  = async (email, userId) => {
    await dbConnect();
    return await User.findOne({ email, _id: userId }, { password: 0, });
  };

export const updateUser = async (userId, updates) => {
  await dbConnect();
  return await User.findByIdAndUpdate(userId, updates, { new: true });
}

export const findTokenByIdAndType = async (code) => {
  await dbConnect();
  return await User.findOne({ code1: code });
}