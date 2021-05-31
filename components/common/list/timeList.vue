<template>
	<view class="app">
		<view>
			<u-tabs-swiper ref="uTabs" :list="timeData" gutter="48" :active-color="activeColor" :current="current"
				:show-bar="showBar" @change="tabsChange" :is-scroll="true" swiperWidth="750"></u-tabs-swiper>
		</view>
		<swiper class="swiperItem" :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
			<swiper-item  v-for="(item, index) in timeData" :key="index">
				<scroll-view scroll-x scroll-y upper-threshold=50 lower-threshold=50 
					@scrolltolower="onreachBottom">
					
					<template>
						<u-time-line>
							<u-time-line-item :nodeTop="index">
								<!-- 此处自定义了左边内容，用一个图标替代 -->
								<template v-slot:content>
									<view class="container" >
										<view class="animeList" v-for="listItem in item.list" >
											<image  border-radius="8rpx" class="cover" :src="listItem.coverSmallImg"></image>
											<view class="detail">
												<view class="name">{{listItem.name}}</view>
												<view class="episodes">{{listItem.latestName}}</view>
											</view>
										</view>
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
			props:['videoData'],
		data() {
			return {
				showBar: true,
				activeColor: "#fb7299",
				timeData:"",
				
				// 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
			};
		},
		methods: {
			getElementHeight(element) {
			    setTimeout(()=>{
			        let query = uni.createSelectorQuery().in(this);
			        query.select(element).boundingClientRect();
			        query.exec((res) => {
						console.log(res)
			            if (!res) {//如果没获取到，再调一次
			                this.getElementHeight();
			            }else {
			                this.swiperHeight = res[0].height;
			            }
						console.log( this.swiperHeight )
			        })
			    },20)
				
			},
			// tabs通知swiper切换
			tabsChange(index) {
				console.log("tab" + index)
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

			},
		},
		computed: {
		    change (){
		       this.timeData = this.videoData
			   console.log(this.timeData)
		    }
		  },
	
		onReady() {
		             //swiper高度自适应
		             this.getElementHeight('.swiperItem')
		         },
		        
	};
</script>

<style lang="scss" scoped>
	.home{
		flex: 1;
		display: flex;
		flex-direction: column;
		.swiperItem {
		  flex: 1;
		    height: calc(100vh - 800rpx);
		}
		
	}
	
	.container {
		width: 100%;
		.animeList {
			margin-top: 12rpx;
			height: 192rpx;
			display: flex;
			justify-content: flex-start;
			.cover {
				height: 100%;
				width: 150rpx;
			}
		
			.detail {
				height: 192rpx;
				padding-left: 24rpx;
				display: flex;
				flex-direction: column;
				.name {
					height: 48rpx;
					font-size: 28rpx;
					font-weight: bold;
				}
		
				.episodes {
					margin-top: 24rpx;
					color: #ff6991;
					height: 48rpx;
				}
			}
		}
	}

	
	
	
</style>
