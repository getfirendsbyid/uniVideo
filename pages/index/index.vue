<template>
	<view class="app">
		<view>
			<Header></Header>
		</view>
		<view>
			<Swiper></Swiper>
		</view>
		<view>
			<videoList></videoList>
		</view>
		<view>
			<backTop></backTop>
		</view>
		<view>
			<Footer></Footer>
		</view>
	</view>
</template>

<script>
	import Header from '@/components/common/header.vue'
	import Footer from '@/components/common/footer.vue'
	import Swiper from '@/components/common/swiper.vue'
	import backTop from '@/components/common/backTop.vue'
	import videoList from '@/components/common/list/videoList.vue'
	export default {
		components: {
			Header,
			Swiper,
			Footer,
			videoList,
			backTop,
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		},

	}
</script>

<style lang="scss">
	.tip{
		padding-left: 24rpx;
		font-weight: 900;
	}
</style>
