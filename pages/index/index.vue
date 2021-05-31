<template>
	<view class="app">
		<Header></Header>
		<Swiper class="swiper" :banner="banner"></Swiper>
		
		<view class="videoList" v-for="series in videoData">
			<view class="tip">{{series.series}}</view>
			<videoList :videoData="series.data"></videoList>
		</view>
		
	
		<Footer></Footer>
	</view>
</template>

<script>
	import Header from '@/components/common/header.vue'
	import Footer from '@/components/common/footer.vue'
	import Swiper from '@/components/common/swiper.vue'
	import videoList from '@/components/common/list/videoList.vue'
	import api from '@/api/index.js'
	export default {
		components: {
			Header,
			Swiper,
			Footer,
			videoList,
		},
		data() {
			return {
				banner:"",
				videoData:"",
			}
		},
	
		methods: {
			_getBanner(){
				api.banner().then(res => {
					this.banner = res.data
				});
			},
			_getVideo(){
				api.videoList().then(res => {
					this.videoData = res.data
				});
			}
		},
		created:function() {
			this._getBanner();
			this._getVideo();
		},

	}
</script>

<style lang="scss">
	.app{
		margin: 24rpx;
		.swiper{
			margin: 10rpx;
		}
		.videoList{
			margin-top: 24rpx;
			.tip{
				padding-left: 10rpx;
				margin-bottom: 12rpx;
				font-weight: 900;
			}
		}
	}
	
</style>
