<template>
	<view>
		<view>
			<Header></Header>
		</view>
		<view class="tagList">
			<view class="nav">
				<view class="name">地区</view>
				<view class="list">
					<span>四川</span>
					<span>成都</span>
					<span>眉山</span>
				</view>
			</view>
			<view class="nav">
				<view class="name">年份</view>
				<view class="list">
					<span>2001</span>
					<span>2002</span>
					<span>2003</span>
					<span>2003</span>
					<span>2003</span>
					<span>2003</span>
					<span>2003</span>
					<span>2003</span>
					<span>2003</span>
				</view>
			</view>
			<view class="nav">
				<view class="name">标签</view>
				<view class="list">
					<span>有趣</span>
					<span>无趣</span>
					<span>高兴</span>
					<span>悲伤</span>
					<span>乐观</span>
				</view>
			</view>
			<view class="nav">
				<view class="name">类型</view>
				<view class="list">
					<span>ov</span>
					<span>oa</span>
					<span>ol</span>
					<span>oz</span>
				</view>
			</view>
		</view>
		<view>
			<videoList></videoList>
		</view>
		<view>
			<Footer></Footer>
		</view>
	</view>
</template>

<script>
	import Header from "@/components/common/header.vue"
	import Footer from "@/components/common/footer.vue"
	import videoList from "@/components/common/list/videoList.vue"
	export default {
		components: {
			Header,
			videoList,
			Footer,
		},
		data() {
			return {
				title: "分类"
			}
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	::-webkit-scrollbar
	{  
	    width: 1rpx;  
	    height: 1rpx;  
	}  
	.tagList{
		margin-left: 12rpx;
		margin-right: 12rpx;
		margin-top: 48rpx;
		display: flex;
		flex-direction: column;
		.nav{
			display: flex;
			justify-content: flex-start;
			white-space: nowrap;  //不换行
			overflow-x: scroll; //允许横向滚动
			overflow-y:hidden;
			height: 72rpx;
			.name{
				margin-left: 24rpx;
				height: 24rpx;
				line-height: 24rpx;
			}
			.list{
				height: 24rpx;
				line-height: 24rpx;
				span{
					margin-left: 24rpx;
				}
			}
		}
	}

</style>
