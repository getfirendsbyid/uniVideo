<template>
	<u-tabbar :list="list" active-color="#03958C" inactive-color="#A8A8A8"  @change="topage"></u-tabbar>
</template>

<script>
	export default {
		data() {
			return {
				show: true,
				list: [{
						iconPath: "home",
						selectedIconPath: "home-fill",
						text: '首页',
						isDot: true,
						customIcon: false,
						pagePath: "/pages/index/index",
					},
					{
						iconPath: "photo",
						selectedIconPath: "photo-fill",
						text: '时刻表',
						customIcon: false,
						pagePath: "/pages/time/index",
					},
					{
						iconPath: "https://cdn.uviewui.com/uview/common/min_button.png",
						selectedIconPath: "https://cdn.uviewui.com/uview/common/min_button_select.png",
						text: '排行榜',
						customIcon: false,
						pagePath: "/pages/rank/index",
					},

					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我',
						customIcon: false,
						pagePath: "/pages/user/index",
					},
				],
				current: 0
			}
		},
		methods: {
			topage(index) {
				console.log(this.list[index].pagePath)
				uni.reLaunch({
				  url: this.list[index].pagePath,
				});      
			}
		}
	}
</script>
