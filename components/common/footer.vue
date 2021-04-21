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
						text: '下载',
						customIcon: false,
						pagePath: "/pages/login",
					},

					{
						iconPath: "account",
						selectedIconPath: "account-fill",
						text: '我的',
						count: 23,
						isDot: false,
						customIcon: false,
						pagePath: "",
					},
				],
				current: 0
			}
		},
		methods: {
			beforeSwitch(index) {
				// 只能切换偶数项
				if (index % 2 == 0) return true;
				else return false;
			},
			topage(index) {
				console.log(this.list[index].pagePath)
				uni.reLaunch({
				  url: this.list[index].pagePath,
				});      
			}
		}
	}
</script>
