<template>
	<view class="wrap">
		<u-swiper :list="list"  :interval="interval" :current="current" :mode="mode" :title="title" :circular="false"></u-swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				autoplay:true,
				interval:2000,
				title:true,
				mode:"rect",
				current:0,
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	.wrap {
		padding: 40rpx;
	}
	.safe-area-inset-bottom {
		height:0rpx;
	}
</style>