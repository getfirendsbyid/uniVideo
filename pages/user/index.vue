<template>
	<view>
		<view>
			<NavBar :title="title"></NavBar>
		</view>
		<view>
			<u-image width="100%" height="300rpx" :src="userCenterBG"></u-image>
		</view>
		<view>
			<u-grid :col="3">
					<u-grid-item>
						<u-icon name="photo" :size="46"></u-icon>
						<view class="grid-text">缓存</view>
					</u-grid-item>
					<u-grid-item>
						<u-icon name="lock" :size="46"></u-icon>
						<view class="grid-text">浏览记录</view>
					</u-grid-item>
					<u-grid-item>
						<u-icon name="hourglass" :size="46"></u-icon>
						<view class="grid-text">沙漏</view>
					</u-grid-item>
				</u-grid>
		</view>
		
		<view>
			<Footer></Footer>
		</view>
	</view>
</template>

<script>
	import NavBar from "@/components/common/navBar.vue"
	import Footer from "@/components/common/footer.vue"
	import TimeList from "@/components/common/list/timeList.vue"
	export default {
		components: {
			NavBar,
			TimeList,
			Footer,
		},
		data() {
			return {
				title: "用户中心",
				userCenterBG:"../assets/img/avatar.jpg",
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
