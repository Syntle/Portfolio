import { Schema } from 'mongoose'

export const MessageSchema = new Schema({
  ipAddress: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  read: { type: Boolean, default: false, required: true },
  favourited: { type: Boolean, default: false, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
})
