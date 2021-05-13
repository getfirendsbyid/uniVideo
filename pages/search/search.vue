<template>
	<view class="container">
		<view>
			<Header></Header>
		</view>
		<view class="wrap">
			<view class="tip">搜索历史</view>
			<view class="keywordsList">
				<text class="keyword">1224</text>
				<text class="keyword">122412412</text>
				<text class="keyword">122412</text>
				<text class="keyword">1221</text>
				<text class="keyword">12242</text>
				<text class="keyword">12发顺丰12412</text>
				<text class="keyword">1224124发1暗示</text>
				<text class="keyword">122412412</text>
				<text class="keyword">圣诞节开始</text>
				<text class="keyword">圣诞节开始</text>
			</view>
		</view>
	</view>
	
	
</template>

<script>
	import Header from "../../components/common/header.vue"
	export default {
		components:{
			Header
		},
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.container{
		.wrap{
			margin:24rpx;
			
			.tip{
				font-weight: 900;
			}
			
			.keywordsList{
				margin-top: 12rpx;
				height: 48rpx;
				display: flex;
				justify-content: flex-start;
				flex-wrap: wrap;
				.keyword{
					margin-top:12rpx;
					margin-right: 24rpx;
					background-color: #f9f9f9;
					padding: 18rpx;
					line-height: 24rpx;
					border-radius: 6rpx;
					border:15rpx none ;
					
				}
			}
			
		}
		
	}
</style>
