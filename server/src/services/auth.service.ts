import {logger} from '@utils/logger'
import client from '@utils/redisClient'
class AuthService {
  public storeTokenInRedis(key, value): Promise<any> {
    return new Promise((resolve, reject) => {
      key = 'p_' + key
      if (!value) {
        client.del(key)
        return resolve(true)
      } else {
        client.set(key, value, function (error) {
          if (error) return reject(error)
          return resolve(true)
        })
      }
    })
  }
  public receiveTokenInRedis(key): Promise<any>{
    return new Promise((resolve, reject) => {
      client.get('p_' + key, (error, reply) => {
        if (error) return reject(error)
        return resolve(reply)
      })
    })
  }
  public verifyTokenInRedis  (playerId, token, callback): void{
    client.eval("return redis.call('get', ARGV[1]) == ARGV[2]", 0, 'p_' + playerId, token, (error, response) => {
      if (error) logger.info(error)
      else callback(response === 1)
    })
  }

}

export default AuthService;
