import httpClient from '@utils/axiosTrade'
import {logger} from '@utils/logger';

class IndexService {
  public static async getDataOrder(): Object {
    let data = await this.getData();
    if (data) {
      data = IndexService.generateDataOrder(data)
    }
    return data
  }

  public static async getData(): Promise<any> {
    try {
      let response = await httpClient.get('/api/v3/klines?symbol=ETHBTC&interval=1m&&limit=1')
      if (response.data) {
        let item = response.data[0]
        return { high: Number(item[2]), low: Number(item[3]) }
      }
      return response.data
    } catch (e) {
      logger.error(`IndexService@getData: ` + e.message)
      return null
    }
  }

  public static generateDataOrder(data: { high: number, low: number }): Object {
    let numberFake = Math.pow(10, 8)
    let high: number = data.high
    let low: number = data.low
    let maxTotalBuy = 5
    let totalSizeSell = 150
    let listBuy = []
    let listSell = []
    //generate buy
    let flagBuy = true
    let flagSell = true
    let totalBuyGenerated: number = 0
    let totalSizeSelled: number = 0
    let price: number = 0
    let size: number = 0
    while (flagBuy) {
      price = (listBuy.length === 0) ? low : this.getRandomNumberBetween(low, (low + high) / 2)
      size = this.getRandomNumberBetween(0, (5 / 10) / high)
      if (!size) {
        continue
      }
      totalBuyGenerated += (Number(price) * numberFake * size)
      if (totalBuyGenerated > (maxTotalBuy * numberFake)) {
        flagBuy = false
      } else {
        listBuy.push({
          price: price,
          size: size
        })
      }
    }
    while (flagSell) {
      price = (listSell.length === 0) ? high : this.getRandomNumberBetween((low + high) / 2, high)
      size = this.getRandomNumberBetween(0, totalSizeSell / 10)
      if (!size) {
        continue
      }
      totalSizeSelled += size * numberFake
      if (totalSizeSelled > (totalSizeSell * numberFake)) {
        flagSell = false
      } else {
        listSell.push({
          price: price,
          size: size
        })
      }
    }
    return {
      buy: listBuy,
      sell: listSell
    }
  }

  public static getRandomNumberBetween(min, max): number {
    return (Math.random() * (max - min) + min).toFixed(8)
  }
}

export default IndexService;
