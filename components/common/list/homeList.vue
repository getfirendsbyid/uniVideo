<template>
	<view class="wrap">
		<u-row gutter="16"  justify="center">
			<!-- <u-col span="6"  text-align="left"   v-for="(item, index) in list" :key="index">
				<u-lazy-load  :image="item.src" ></u-lazy-load>
				<view>123</view>
			</u-col> -->
			<u-col span="6" v-for="(item, index) in list" :key="index">
				<u-lazy-load   :image="item.src"  border-radius="8" ></u-lazy-load>
					<view class="demo-layout bg-purple"></view>
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
					},
					{
						src: "https://tva3.sinaimg.cn/large/005R6Otmgy1g6d8uftwwvj30a00f0n10.jpg",
					},
					{
						src: "https://tva1.sinaimg.cn/large/0080xEK2ly1gnvpkt0u70j30dw08p0sz.jpg",
					},
					{
						// 这里图片不存在，会加载失败，显示错误的占位图
						src: "https://tva1.sinaimg.cn/large/0080xEK2ly1gp0wh77gacj30dl09ddh5.jpg",
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

<style>
	/* page不能写带scope的style标签中，否则无效 */
	page {
		background-color: rgb(240, 240, 240);
	}
</style>

<style lang="scss" scoped>
	.wrap {
			padding: 24rpx;
		}
	.u-lazy-item {
		border-radius: 8rpx;
	}
		.u-row {
			margin: 40rpx 0;
			border-radius: 3rpx;
		}
		
	
		.demo-layout {
			height: 80rpx;
			border-radius: 8rpx;
		}
	
		.bg-purple {
			background: #d3dce6;
		}
	
		.bg-purple-light {
			background: #e5e9f2;
		}
	
		.bg-purple-dark {
			background: #99a9bf;
		}
</style>
