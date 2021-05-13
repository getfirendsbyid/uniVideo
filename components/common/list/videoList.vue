<template>
	<view class="wrap">
		<u-row  justify="center">
			<u-col span="4" v-for="(item, index) in list" :key="index">
				<u-lazy-load :image="item.src" border-radius="8"></u-lazy-load>
				<text class="demo-layout u-line-2">{{item.title}}</text>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadStatus: 'loadmore',
				flowList: [],
				list: [{
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},
					{
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},
					{
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},
					{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://i1.wp.com/www.5dm.tv/wp-content/uploads/2020/09/2020092616144684-520x293.png",
						title: "测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试",
					},
				]
			}
		},
		onLoad() {
			this.addRandomData();
		},
		onReachBottom() {
			this.loadStatus = 'loading';
			// 模拟数据加载
			setTimeout(() => {
				this.addRandomData();
				this.loadStatus = 'loadmore';
			}, 1000)
		},
		methods: {
			addRandomData() {
				for (let i = 0; i < 10; i++) {
					let index = this.$u.random(0, this.list.length - 1);
					// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					let item = JSON.parse(JSON.stringify(this.list[index]))
					item.id = this.$u.guid();
					this.flowList.push(item);
				}
			},
			remove(id) {
				this.$refs.uWaterfall.remove(id);
			},
			clear() {
				this.$refs.uWaterfall.clear();
			}
		}
	}
</script>


<style lang="scss" scoped>
	.wrap {
		padding: 24rpx;
		.u-lazy-item {
			border-radius: 8rpx;
		}
		.demo-layout {
			height: 80rpx;
			border-radius: 8rpx;
		}
		.u-row {
			margin-top: 100rpx;
			border-radius: 3rpx;
		}
		.u-col {
			border-radius: 3rpx;
		}
	}
</style>
