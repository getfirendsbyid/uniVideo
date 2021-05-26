<template>
	<u-tabbar :list="list"  active-color="#fb7299" inactive-color="#A8A8A8"  @change="topage"></u-tabbar>
</template>

<script>
	import q1 from "@/assets/img/icon/1-q.jpg";
	import h1 from "@/assets/img/icon/1-h.jpg";
	import q2 from "@/assets/img/icon/2-q.jpg";
	import h2 from "@/assets/img/icon/2-h.jpg";
	import q3 from "@/assets/img/icon/3-q.jpg";
	import h3 from "@/assets/img/icon/3-h.jpg";
	import q4 from "@/assets/img/icon/4-q.jpg";
	import h4 from "@/assets/img/icon/4-h.jpg";

	export default {
		data() {
			return {
				show: true,
				list: [{
						iconPath: q1,
						selectedIconPath: h1,
						text: '首页',
						customIcon: false,
						pagePath: "/pages/index/index",
					},
					{
						iconPath: q2,
						selectedIconPath: h2,
						text: '时刻表',
						customIcon: false,
						pagePath: "/pages/time/index",
					},
					{
						iconPath: q3,
						selectedIconPath: h3,
						text: '分类',
						customIcon: false,
						pagePath: "/pages/classify/index",
					},

					{
						iconPath: q4,
						selectedIconPath: h4,
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
