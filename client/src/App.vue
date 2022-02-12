<template>
    <div id="app-component">
        <div class="row table-list">
            <div class="col-xs-12"><h1>Current List Trades of Binance ETHBTC</h1></div>
            <div class="col-xs-6">
                <div>
                    <div class="col-xs-6 text-left"><b>Size</b></div>
                    <div class="col-xs-6 text-right"><b>Bid</b></div>
                </div>
                <div v-for="(item, index) in dataBuy" :key="index">
                    <div class="col-xs-6 text-left">{{item.size}}</div>
                    <div class="col-xs-6 text-right">{{item.price}}</div>
                </div>
                <div style="font-size: 18px" v-if="dataBuy.length">
                    <div class="col-xs-6 text-left"><b>Total Amount</b></div>
                    <div class="col-xs-6 text-right"><b>{{totalAmountBuy}}</b></div>
                </div>
            </div>
            <div class="col-xs-6">
                <div>
                    <div class="col-xs-6 text-left"><b>Ask</b></div>
                    <div class="col-xs-6 text-right"><b>Size</b></div>
                </div>
                <div v-for="(item, index) in dataSell" :key="index">
                    <div class="col-xs-6 text-left">{{item.price}}</div>
                    <div class="col-xs-6 text-right">{{item.size}}</div>
                </div>
                <div style="font-size: 18px" v-if="dataSell.length">
                    <div class="col-xs-6 text-left"><b>Total Size</b></div>
                    <div class="col-xs-6 text-right"><b>{{totalSizeSell}}</b></div>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
  import httpClient from '@/utils/httpClient'
  import io from "socket.io-client";
  import config from './config/config'

  export default {
    name: 'home',
    components: {},
    data() {
      return {
        dataBuy: [],
        dataSell: []
      }
    },
    computed: {
      totalAmountBuy() {
        let total = 0
        for (let i = 0; i < this.dataBuy.length; i++) {
          let item = this.dataBuy[i]
          total += Number(item.price) * Number(item.size) * Math.pow(10, 8)
        }
        return (total / Math.pow(10, 8)).toFixed(8)
      },
      totalSizeSell() {
        let total = 0
        for (let i = 0; i < this.dataSell.length; i++) {
          let item = this.dataSell[i]
          total += Number(item.size) * Math.pow(10, 8)
        }
        return (total / Math.pow(10, 8)).toFixed(8)
      }
    },
    watch: {},
    createdAt() {
    },
    mounted() {
      this.getData()
      this.initSocket()
    },
    beforeDestroy() {

    },
    methods: {
      initSocket() {
        const socket = io(config.SERVER_URL, { transports: ["websocket"] });

        socket.on("connect", () => {
          console.log('Connected Socket')
        });

        socket.on("get-data-sell", (data) => {
          this.setupData(JSON.parse(data))
        });
      },
      setupData(data) {
        let buy = data.buy
        let sell = data.sell
        if (buy.length || sell.length) {
          buy = buy.sort((a, b) => {
            return Number(b.price) - Number(a.price)
          })
          this.dataBuy = buy

          sell = sell.sort((a, b) => {
            return Number(a.price) - Number(b.price)
          })
          this.dataSell = sell
        }
      },
      async getData() {
        try {
          let response = await httpClient.get('/get-data-sell')
          let data = response.data.data
          if (data) {
            this.setupData(data)
          }
        } catch (e) {
          console.log(e)
        }

      }
    },

  }
</script>
<style>

</style>
<style scoped>
    .text-left {
        text-align: left;
    }

    .text-right {
        text-align: right;
    }

    .table-list {
        width: 60%;
        margin-left: 20%;
    }
</style>
