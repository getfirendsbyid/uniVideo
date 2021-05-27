<template>
	<view>
		<NavBar></NavBar>
	</view>
	<view class="anime">
		<view class="animeInfo">
			<image></image>
			<view class="animeDetail">
				<view class="name"></view>
				<view class="area_type_author"></view>
				<view class="trueName"></view>
				<view class="playTime"></view>
				<view class="tag"></view>
			</view>
		</view>
		<view class="animeStarAndComment">
			<view class="star"></view>
			<view class="comment"></view>
		</view>
		<view class="animeDetail"></view>
		<view class="animePlayTab"></view>
		<view class="animeCloudDisk">
			<view class="diskName">网盘资源</view>
			<view class="diskInfo">
				<view class="diskName"></view>
				<view class="diskCode"></view>
			</view>
		</view>
		<view class="animeLike">
			<VideoList></VideoList>
		</view>
		
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
	components:{
		VideoList
	}
		data() {
			return {
				
			}
		},
	};
</script>

<style>
</style>
