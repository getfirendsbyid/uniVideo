<template>
	<u-swiper  @click="goPage" :list="banner" :circular="circular" :effect3d="true" :interval="interval" :current="current" :mode="mode" :title="title" ></u-swiper>
</template>

<script>
	export default {
		props:['banner'],
		data() {
			return {
				circular:true,
				autoplay:true,
				interval:2000,
				title:true,
				mode:"rect",
				current:0,
				listData:[],
			}
		},
		created(){
			    this.listData = this.banner
		},
		methods: {
			// goPage: function(index) {
			// 	console.log("点击了"+index)
			// 	uni.navigateTo({
			// 		url: "/pages/detail?animeId"+index,
			// 	});
			// },
			
			async goPage(e) {
							console.log(e)
							let index = e;
							
							console.log(this.banner[index])
								uni.navigateTo({
									url: "/pages/detail?animeId="+this.banner[index].id,
								});
						},
		
		},
		onLoad() {
			console.log(123123)
		},
		
	}
</script>

<style lang="scss" scoped>
	
	
</style>