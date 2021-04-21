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
			<Footer></Footer>
		</view>

	</view>
</template>

<script>
	import Header from '@/components/common/header.vue'
	import Footer from '@/components/common/footer.vue'
	import Swiper from '@/components/common/swiper.vue'
	import videoList from '@/components/common/list/homeList.vue'
	export default {

		data() {
			return {

			}
		},
		methods: {

		},
		components: {
			Header,
			Swiper,
			Footer,
			videoList,
		}
	}
</script>

<style>

</style>
