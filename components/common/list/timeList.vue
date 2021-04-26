<template>
	<view>
		<view>
			<u-tabs-swiper ref="uTabs" :list="list" :active-color="activeColor"  :current="current" :show-bar="showBar" @change="tabsChange" :is-scroll="true"
			 swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item class="swiper-item" v-for="(item, index) in tabs" :key="index">
				
				<scroll-view scroll-x scroll-y upper-threshold=50  lower-threshold=50 style="height:800rpx;width: 100%;" @scrolltolower="onreachBottom">
				
				<template>
					<u-time-line>
						<u-time-line-item nodeTop="2">
							<!-- 此处自定义了左边内容，用一个图标替代 -->
							<template v-slot:node>
								<view class="u-node" style="background: #19be6b;">
									<!-- 此处为uView的icon组件 -->
									<u-icon name="pushpin-fill" color="#fff" :size="24"></u-icon>
								</view>
							</template>
							<template v-slot:content>
								<view>
									<view class="u-order-title">待取件</view>
									<view class="u-order-desc">[自提柜]您的快件已放在楼下侧门，直走前方53.6米，左拐约10步，再右拐直走，见一红灯笼停下，叩门三下，喊“芝麻开门”即可。</view>
									<view class="u-order-time">2019-05-08 12:12</view>
								</view>
							</template>
						</u-time-line-item>
						<u-time-line-item>
							<!-- 此处没有自定义左边的内容，会默认显示一个点 -->
							<template v-slot:content>
								<view>
									<view class="u-order-desc">【深圳市】日照香炉生紫烟，遥看瀑布挂前川，飞流直下三千尺，疑是银河落九天。</view>
									<view class="u-order-time">2019-12-06 22:30</view>
								</view>
							</template>
						</u-time-line-item>
					</u-time-line>
				</template>

				
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				showBar:true,
				activeColor:"#fb7299",
				tabs:[
					{
						name: '十年'
					}, {
						name: '青春'
					}, {
						name: '之约'
					}, {
						name: '之约'
					}, {
						name: '之约'
					}, {
						name: '之约'
					}, {
						name: '之约'
					}, {
						name: '之约'
					}, {
						name: '之约'
					}, {
						name: '之约'
					}, {
						name: '之约'
					}, {
						name: '之约'
					}, {
						name: '之约'
					}, {
						name: '之约'
					}, {
						name: '之约'
					}
				],
				list: [{
					name: '十年'
				}, {
					name: '青春'
				}, {
					name: '之约'
				}, {
					name: '之约'
				}, {
					name: '之约'
				}, {
					name: '之约'
				}, {
					name: '之约'
				}, {
					name: '之约'
				}, {
					name: '之约'
				}, {
					name: '之约'
				}, {
					name: '之约'
				}, {
					name: '之约'
				}, {
					name: '之约'
				}, {
					name: '之约'
				}, {
					name: '之约'
				}],
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			};
		},
		methods: {
			// tabs通知swiper切换
			tabsChange(index) {
				console.log("tab"+index)
				console.log(this.swiperCurrent)
				this.swiperCurrent = index;
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				
			}
		}
	};
</script>

<style lang="scss" scoped>
	.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}
	
	.u-order-title {
		color: #333333;
		font-weight: bold;
		font-size: 32rpx;
	}
	
	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}
	
	.u-order-time {
		color: rgb(200, 200, 200);
		font-size: 26rpx;
	}
</style>