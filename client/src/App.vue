<template>
	<div id="app-component">
		<div class="row">
			<div class="col-xs-12"><h1>Current List Trades of Binance ETHBTC</h1></div>
			<div class="col-xs-6">
				<div>
					<div class="col-xs-6">Size</div>
					<div class="col-xs-6">Bid</div>
				</div>
				<div v-for="item in dataBuy" :key="item.id">
					<div class="col-xs-6">{{item.qty}}</div>
					<div class="col-xs-6">{{item.price}}</div>
				</div>
			</div>
			<div class="col-xs-6">
				<div>
					<div class="col-xs-6">Ask</div>
					<div class="col-xs-6">Size</div>
				</div>
				<div v-for="item in dataSell" :key="item.id">
					<div class="col-xs-6">{{item.qty}}</div>
					<div class="col-xs-6">{{item.price}}</div>
				</div>


			</div>
		</div>
	</div>
</template>

<script>

	import httpClient from '@/utils/httpClient'

	export default {
		name: 'home',
		components: {},
		data () {
			return {
				dataBuy: [],
				dataSell: []
			}
		},
		computed: {},
		watch: {},
		createdAt () {},
		mounted () {
			this.getData()
		},
		beforeDestroy () {

		},
		methods: {
			async getData () {
				try {
					let response = await httpClient.get('/get-data-sell')
					let data = response.data.data
					if (data.length) {
						for (let i = data.length -1; i >= 0; i--) {
							if (data[i].isBuyerMaker) {
								this.dataSell.unshift(data[i])
							} else {
								this.dataBuy.unshift(data[i])
							}
						}
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


</style>
