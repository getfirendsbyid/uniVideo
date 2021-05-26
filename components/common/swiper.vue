<template>
	<view class="wrap">
		<u-swiper :list="list" :effect3d="true" :interval="interval" :current="current" :mode="mode" :title="title" :circular="false"></u-swiper>
	</view>
</template>

<script>
	export default {
		props:['banner'],
		data() {
			return {
				autoplay:true,
				interval:2000,
				title:true,
				mode:"rect",
				current:0,
				list: [],
			}
		},
		
		methods: {
			
		},
		computed: {
		    change (){
		       this.list = this.banner
			   console.log(this.banner)
		    }
		  },
	}
</script>

<style lang="scss" scoped>
	
	
</style>