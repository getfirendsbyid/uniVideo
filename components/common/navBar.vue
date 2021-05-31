<template>
	<u-navbar class="navBar" :is-back="isBack" :is-fixed="isFixed" :border-bottom="false"
		:back-icon-color="backIconColor" title-size="titleSize" :title-color="titleColor" :titleBold="titleBold"
		:title="title" :background="background">
	</u-navbar>
</template>
<script>
	export default {
		props: {
			title: String,
		},
		data() {
			return {
				titleBold: true,
				background: {
					backgroundColor: '#fb7299',
				},
				isBack: true,
				titleColor: "#fff",
				isFixed: true,
				titleSize: 30,
				backIconColor: "#fff",
				prevPage: "",

			};
		},
		methods: {
			goBack: function() {
				var pages = getCurrentPages();
				this.prevPage = pages[pages.length - 2];
				console.log(pages)
				uni.navigateTo({
					url: this.prevPage,
				});
			}
		}
	};
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
