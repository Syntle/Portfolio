import { graphqlHTTP } from 'express-graphql'
import { buildSchema } from 'graphql'
import { SessionSchema } from './models/Session'
import { createConnection } from 'mongoose'
import { MessageSchema } from './models/Message'

const sessionConn = createConnection(process.env.MONGODB_URL!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

const SessionModel = sessionConn.model('Session', SessionSchema)

const messageConn = createConnection(process.env.MONGODB_URL!, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
})

const MessageModel = messageConn.model('Message', MessageSchema)

interface SessionData {
  id: string
  accessToken: string
  refreshToken: string
  expiresIn: number
  scope: string
}

interface MessageData {
  id: string
  ipAddress: string
  name: string
  email: string
  message: string
  read: boolean
  favourited: boolean
}

const schema = buildSchema(`
  scalar DateTime

  type Query {
    getSession(id: ID!): Session
    sessionExists(accessToken: String!): Session
    getMessage(id: ID!): Message
    getMessages: [Message]!
  }
  
  type Mutation {
    setSession(
      accessToken: String!
      refreshToken: String!
      expiresIn: Int!
      scope: String!
    ): Session!
    deleteSession(id: ID!): String
    setMessage(
      ipAddress: String!
      name: String!
      email: String!
      message: String!
    ): Message!
    setMessageRead(
      id: ID!
      read: Boolean!
    ): String
    setMessageFavourite(
      id: ID!
      favourited: Boolean!
    ): String
    deleteMessage(id: ID!): String
  }
  
  type Session {
    id: ID!
    accessToken: String!
    expiresIn: Int!
    refreshToken: String!
    scope: String!
  }

  type Message {
    id: ID!
    ipAddress: String!
    name: String!
    email: String!
    message: String!
    read: Boolean!
    favourited: Boolean!
    createdAt: DateTime!
  }
`)

const resolvers = {
  setSession: ({ accessToken, refreshToken, expiresIn, scope }: SessionData) =>
    SessionModel.create({
      accessToken: accessToken,
      refreshToken: refreshToken,
      expiresIn: expiresIn,
      scope: scope,
    }),
  deleteSession: ({ id }: SessionData) => SessionModel.findByIdAndDelete(id),
  getSession: ({ id }: SessionData) => SessionModel.findById(id),
  sessionExists: ({ accessToken }: SessionData) =>
    SessionModel.findOne({ accessToken: accessToken }),
  setMessage: ({ ipAddress, name, email, message }: MessageData) =>
    MessageModel.create({
      ipAddress: ipAddress,
      name: name,
      email: email,
      message: message,
    }),
  setMessageRead: ({ id, read }: MessageData) =>
    MessageModel.updateOne({ _id: id }, { read: read }),
  setMessageFavourite: ({ id, favourited }: MessageData) =>
    MessageModel.updateOne({ _id: id }, { favourited: favourited }),
  deleteMessage: ({ id }: MessageData) => MessageModel.findByIdAndDelete(id),
  getMessage: ({ id }: MessageData) => MessageModel.findById(id),
  getMessages: () => MessageModel.find().sort('-createdAt'),
}

export default {
  path: '/graphql',
  handler: graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: process.env.NODE_ENV === 'development',
  }),
}
