import axios from 'axios'
import express from 'express'
import bodyParser from 'body-parser'

const router = express.Router()

const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.post('/user', bodyParser.json(), async (req, res) => {
  const { data } = await axios({
    method: 'get',
    url: `${process.env.DISCORD_API_BASE}/users/@me`,
    headers: {
      Authorization: `Bearer ${req.body.token}`,
    },
  })

  return res.json(data)
})

router.post('/notify', bodyParser.json(), async (req, res) => {
  const embedContent = process.env.OWNER_ID
    ? `<@${process.env.OWNER_ID}>`
    : 'Owner ID is not set, please set it in your `.env` file.'

  await axios({
    method: 'post',
    url: process.env.WEBHOOK_URL,
    data: {
      content: embedContent,
      embeds: [
        {
          title: "You've got mail!",
          description: `Please check your admin inbox!\n\n[Read Message](${process.env.WEBSITE_URL}/admin?messageID=${req.body.messageID})`,
          timestamp: new Date(),
        },
      ],
      allowed_mentions: {
        parse: ['users'],
      },
    },
  })

  return res.json({ message: 'Sent message notification!' })
})

export default {
  path: '/api/discord',
  handler: router,
}
