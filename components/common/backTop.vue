<template>
	<view class="wrap">
		<text>滑动页面，返回顶部按钮将出现在右下角</text>
		<u-back-top   top="600" :scroll-top="scrollTop"></u-back-top>
	</view>
</template>


<script>
	export default {
		data() {
			return {
				scrollTop: 0,
				mode: 'circle',
				iconStyle: {
					fontSize: '32rpx',
					color: '#2979ff'
				}
			}
		},
		onPageScroll(e) {
			console.log(e.scrollTop)
			this.scrollTop = e.scrollTop;
		}
	};
</script>

<style lang="scss" scoped>
.wrap {
		height: 200vh;
	}
</style>
