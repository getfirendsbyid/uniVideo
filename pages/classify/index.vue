<template>
	<view class="app">
		<Header></Header>
		
		<view >
			<Tag :tag="tagData"></Tag>
		</view>
		<view>
			<videoList></videoList>
		</view>
		<view>
			<Footer></Footer>
		</view>
	</view>
</template>

<script>
	import Header from "@/components/common/header.vue"
	import Footer from "@/components/common/footer.vue"
	import videoList from "@/components/common/list/videoList.vue"
	import Tag from "@/components/common/tag.vue"
	import api from '@/api/classify.js'
	export default {
		components: {
			Header,
			videoList,
			Footer,
			Tag
		},
		data() {
			return {
				tagData:"",
				title: "分类"
				
			}
		},
		methods: {
			_getTag(){
				api.getTag().then(res => {
					this.tagData = res.data
				});
			}
		},
		created:function() {
			this._getTag();
		},
	}
</script>

<style lang="scss">
	

</style>
