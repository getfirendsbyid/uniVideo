<template>
	<view>
		<NavBar></NavBar>
	</view>
	<view>
		<videoList></videoList>
	</view>
	<view>
		<Footer></Footer>
	</view>
</template>

<script>
import NavBar from '@/components/common/navBar.vue'
import Footer from '@/components/common/footer.vue'
import videoList from '@/components/common/list/videoList.vue'
export default {
		data() {
			return {
				
			}
		},
	};
</script>

<style>
</style>
