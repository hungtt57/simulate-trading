import httpClient from '@utils/axiosTrade'
class IndexService {
  public static async getData (): Promise<any>{
    try {
      let response = await httpClient.get('/api/v3/trades?limit=20&&symbol=ETHBTC')
      return response.data
    }catch (e) {
      return []
    }

  }

}

export default IndexService;
