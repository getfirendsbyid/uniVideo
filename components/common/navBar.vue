<template>
	<view class="navBar">
		<u-navbar :is-back="isBack" :is-fixed="isFixed" :back-icon-color="backIconColor" title-size="titleSize" :title-color="titleColor" :titleBold="titleBold" :title="title" :background="background" >
			<view class="slot-wrap">
				
			</view>
		</u-navbar>
		<view class="content">
			<!-- 正文内容 -->
		</view>
	</view>
</template>
<script>
	export default {
		props: {
		      title: String,
		    },
		data() {
			return {
				isBack:true,
				titleColor:"#fff",
				isFixed:true,
				titleSize:30,
				backIconColor:"#fff",
				list: [{
					name: '十年'
				}, {
					name: '青春'
				}, {
					name: '之约'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			};
		},
		methods: {
			
		}
	};
</script>

<style scoped lang="scss">
	.navBar{
		background-color: $uni-theme;
	}
	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		/* padding: 0 30rpx; */
	}
</style>
