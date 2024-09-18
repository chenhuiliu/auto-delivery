import jwt from 'jsonwebtoken';

export default function signToken(payload, secret) {
  return jwt.sign(payload, secret);
}


