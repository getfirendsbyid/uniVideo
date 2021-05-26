<template>
	<view class="wrap">
		<view class="tagList">
			<view class="nav" v-for="(item, index) in tagList">
				<view class="name">{{item.name}}</view>
				<view class="list" v-for="(tag, index) in item.data">
					<span>{{tag.name}}</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['tag'],
		data() {
			return {
				scrollTop: 0,
				mode: 'circle',
				iconStyle: {
					fontSize: '32rpx',
					color: '#2979ff'
				},
				tagList: "",
			}
		},
		computed: {
			change() {
				this.tagList = this.tag
				console.log(this.banner)
			}
		},
		onPageScroll(e) {
			console.log(e.scrollTop)
			this.scrollTop = e.scrollTop;
		}
	};
</script>

<style lang="scss" scoped>
	.wrap {
		height: 200vh;

		::-webkit-scrollbar {
			width: 1rpx;
			height: 1rpx;
		}

		.tagList {
			margin-left: 12rpx;
			margin-right: 12rpx;
			margin-top: 48rpx;
			display: flex;
			flex-direction: column;

			.nav {
				display: flex;
				justify-content: flex-start;
				white-space: nowrap; //不换行
				overflow-x: scroll; //允许横向滚动
				overflow-y: hidden;
				height: 72rpx;

				.name {
					margin-left: 24rpx;
					height: 24rpx;
					line-height: 24rpx;
				}

				.list {
					height: 24rpx;
					line-height: 24rpx;

					span {
						margin-left: 24rpx;
					}
				}
			}
		}
	}
</style>
