<template>
	<view>
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
	</view>
</template>

<script>
	import NavBar from '@/components/common/navBar.vue'
	import Footer from '@/components/common/footer.vue'
	export default {
		components: {
			NavBar,
			Footer,
		},
		data() {
			return {
				banner:"",
				videoData:"",
			}
		},
	
		methods: {
			_getBanner(){
			
			},
			_getVideo(){
				
			}
		},
		created:function() {
			this._getBanner();
			this._getVideo();
		},
	
	}
</script>

<style lang="scss">
	.anime{
		.animeInfo{
			position: absolute;
			    top: 0;
			    left: 0;
			    height: 100%;
			    width: 100%;
			    -webkit-filter: blur(30px);
			    -moz-filter: blur(30px);
			    -ms-filter: blur(30px);
			    filter: blur(30px);
			    background-size: cover;
			    background-position: center center;
			    opacity: .88;
				image{
					
				}
				.animeDetail{
					.name{
						
					}
					.area_type_author{
						
					}
					.trueName{
						
					}
				}
		}
	}
</style>
