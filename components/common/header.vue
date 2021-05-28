<template>
	<view>
		<u-navbar :is-back="isBack" :background="background" :slot="slot">
			<view class="slot-wrap">
				<u-search :disabled="disabled" placeholder="" :shape="shape" :show-action="showAction" @click="goPage" v-model="keyword">
				</u-search>
			</view>
		</u-navbar>
	</view>
</template>

<script>
	import avatarUrl from "@/assets/img/avatar.jpg";
	import logoUrl from "@/assets/img/avatar.jpg";
	export default {

		data() {
			return {
				keyword:"",
				disabled:true,
				showAction: false,
				isBack: false,
				shape: "square",
				slot: "right",
				logoUrl: logoUrl,
				avatarUrl: avatarUrl,
				background: {
					// 渐变色
					backgroundImage: 'linear-gradient(45deg, rgb(255, 105, 145), rgb(255, 105, 145))'
				},
			};
		},
		onLoad(option) {
			
		
		},
		created() {
			let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
			let curRoute = routes[routes.length - 1].route //获取当前页面路由
			if(curRoute=="pages/search/search"){
				this.disabled = false
			}
			console.log(curRoute);
		},
		methods: {
			goPage: function() {
				uni.reLaunch({
					url: "/pages/search/search",
				});
			}
		}
	}
</script>

<style scoped lang="scss">
	.slot-wrap {
		padding-left: 24rpx;
		padding-right: 24rpx;
		display: flex;
		flex: 1;
		justify-content: space-between;
		padding-left: 36rpx;
		padding-right: 36rpx;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		/* padding: 0 30rpx; */
	}
</style>
