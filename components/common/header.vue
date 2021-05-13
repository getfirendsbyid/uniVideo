<template>
	<view>
			<u-navbar :is-back="isBack" :background="background" :slot="slot">
				<u-row gutter="16">
				<view class="slot-wrap">
					<u-col span="2">
						<!-- logo -->
						<view class="demo-layout bg-purple">
							<u-image width="100%" height="300rpx" :src="logoUrl"></u-image>
						</view>
					</u-col>
					<u-col span="12">
						<!-- search -->
						<u-search placeholder="" :shape="shape" :show-action="showAction" @click="goPage()" v-model="keyword">
						</u-search>
					</u-col>
					<u-col span="2">
						<!-- avator -->
						<view class="demo-layout bg-purple-dark">
							<u-avatar :src="avatarUrl"></u-avatar>
						</view>
					</u-col>
				</view>
				</u-row>
			</u-navbar>
		<view class="content">
		</view>
	</view>
</template>

<script>
	import avatarUrl from "@/assets/img/avatar.jpg";
	import logoUrl from "@/assets/img/avatar.jpg";
	export default {
		name: "header",
		data() {
			return {
				showAction: false,
				isBack: false,
				shape: "square",
				slot:"right",
				logoUrl: logoUrl,
				avatarUrl: avatarUrl,
				background: {
					// 渐变色
					backgroundImage: 'linear-gradient(45deg, rgb(255, 105, 145), rgb(255, 105, 145))'
				},
			};
		},
		methods:{
			goPage:function(){
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.slot-wrap {
		display: flex;
		align-items: center;
		/* 如果您想让slot内容占满整个导航栏的宽度 */
		/* flex: 1; */
		/* 如果您想让slot内容与导航栏左右有空隙 */
		/* padding: 0 30rpx; */
	}
</style>
