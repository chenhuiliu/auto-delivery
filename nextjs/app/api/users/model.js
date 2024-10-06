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
  username: { type: String, required: [true, '用户名不能为空'] },
  rose: { type: String },// 1 管理员 2. 普通用户 3. 普通会员用户 4.会员高级用户
  roseExpireAt: { type: Date },// 会员权限到期时间
  code1: { type: String },// 邮箱验证码
  code1ExpireAt: { type: Date },
  config: Object, //用户配置
  token: { type: String }, //登录 token
  tokenExpireAt: { type: Date },// token 有效期
  createTime: { type: Date }, // 创建时间
});
const modelUser = mongoose.models && mongoose.models.User;
export default (modelUser || mongoose.model('User', UserSchema));
