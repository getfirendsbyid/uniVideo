<template>
	<view class="app">
		<NavBar :title="animeInfo.name"></NavBar>

		<view class="anime">
			<image class="coverbg" :src="animeInfo.coverSmallImg"></image>
			<view class="animeInfo">
				<image class="animeCover" :src="animeInfo.coverSmallImg"></image>

				<view class="animeDetail">
					<view class="name u-line-2">{{animeInfo.name}}</view>
					<view class="area_type_author">
						{{animeInfo.area}}<span>{{animeInfo.type}}</span><span>{{animeInfo.author}}</span>
					</view>
					<view class="trueName">原版名称:<span>{{animeInfo.trueName}}</span></view>
					<view class="playTime">首播时间:<span>{{animeInfo.playTime}}</span></view>
					<view class="tag">
						标签:<span v-for="(tag,index) in animeInfo.tag">{{tag.tag}}</span>
					</view>
				</view>
			</view>

			<u-read-more text-indent="0" color="#fb7299" open-text="展开" close-text="收起" :toggle="toggle"
				show-height="200">
				<rich-text class="animeDetailText" :nodes="animeInfo.descText"></rich-text>
			</u-read-more>

			<u-tabs :list="animeInfo.chapter" :is-scroll="false" :current="current" @change="change"></u-tabs>
			<view class="chapter">
				<u-row class="chapterTab" v-for="(chapterItem,index) in animeInfo.chapter[this.current].data"
					 >
					<u-col class="chapterItem" span="3">
					
						<view class="chaperName">{{chapterItem.title}}</view>
					</u-col>

				</u-row>
			</view>

			<view class="animePlayTab"></view>
			<view class="animeCloudDisk">
				<view class="diskName">网盘资源</view>
				<view class="diskInfo">
					<view class="diskName">{{animeInfo.diskCloud.title}}</view>
					<view class="diskCode">{{animeInfo.diskCloud.code}}</view>
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
	import VideoList from '@/components/common/list/videoList.vue'
	import api from '@/api/anime.js'
	export default {
		components: {
			NavBar,
			Footer,
			VideoList
		},
		data() {
			return {
				form: {
					id: "",
				},
				toggle: true,
				animeInfo: "",
				videoLikeList: "",
				current: 0,

			}
		},

		methods: {
			change(index) {
				this.current = index;
			},

			_getAnimeInfo() {

				api.animeInfo(this.form).then(res => {
					this.animeInfo = res.data
					if(this.animeInfo[0]!=null){
						this.current = 0
					}
				});
			},

		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			let pages = getCurrentPages()
			let len = pages.length
			let curParam = pages[len - 1].options //获取当前页面参数
			this.form.id = curParam.animeId
			console.log(curParam.animeId); //打印出上个页面传递的参数。
		},
		created: function() {
			this._getAnimeInfo();
		},

	}
</script>

<style lang="scss">
	.anime {
		margin: 24rpx;

		.coverbg {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			-webkit-filter: blur(30px);
			-moz-filter: blur(30px);
			-ms-filter: blur(30px);
			filter: blur(30px);
			background-position: center;
			background-repeat: no-repeat;
			opacity: .88;
		}

		.animeInfo {
			display: flex;
			justify-content: flex-start;

			.animeCover {
				width: 300rpx;
				height: 416rpx;
			}

			.animeDetail {
				position: relative;
				margin-left: 36rpx;

				view {
					font-size: 30rpx;
					padding-bottom: 24rpx;

					span {
						padding-left: 12rpx;
					}
				}

				.name {
					font-size: 42rpx;
					font-weight: 900;

					span {
						padding-left: 12rpx;
					}
				}
			}
		}

		.animeDetailText {
			font-size: 30rpx;
		}

		.chapter {
			display: flex;
			justify-content: flex-start;
			width: 30%;

			.chapterItem {
				margin: 12rpx;

			}
		}

	}
</style>
