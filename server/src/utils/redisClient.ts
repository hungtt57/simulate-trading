import {logger} from '@utils/logger'
const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const redis = require('redis')
const client = redis.createClient({ host: REDIS_HOST, port: REDIS_PORT, prefix: 'redoak-app:' })
client.on('error', function (err) {
  logger.info(`Error on connect Redis ${err}`)
})
export default client
