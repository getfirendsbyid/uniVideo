<template>
	<view>
		<view>
			<NavBar :title="title"></NavBar>
		</view>
		<u-image width="100%" height="300rpx" :src="userCenterBG"></u-image>
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
