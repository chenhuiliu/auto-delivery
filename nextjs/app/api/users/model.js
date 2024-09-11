import mongoose, { model } from 'mongoose';

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, '请输入邮箱。'],
    unique: true,
    lowercase: true,
    validate: [
      {
        validator: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: '请输入正确的邮箱地址。',
      },
    ],
  },
  password: {
    type: String,
    required: [true, '密码不能为空。'],
  },
  username: { type: String, required: [true, '用户名不能为空'] }

});
export default (mongoose.models.User || mongoose.model('User', UserSchema));
