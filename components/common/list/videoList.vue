<template>
	<view class="wrap">
		<u-row  justify="center">
			<u-col span="4" v-for="(item, index) in list" :key="index">
				<u-lazy-load :image="item.src" border-radius="8"></u-lazy-load>
				<text class="title u-line-2">{{item.title}}</text>
			</u-col>
		</u-row>
	</view>
</template>

<script>
	export default {
		props:['videoData'],
		data() {
			return {
				loadStatus: 'loadmore',
				flowList: [],
				list: []
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
		},
		computed: {
		    change (){
		       this.list = this.videoData
			   console.log(this.list)
		    }
		  },
	}
</script>


<style lang="scss" scoped>
	.wrap{
		.title{
			height: 72rpx;
		}
	}
	
</style>
