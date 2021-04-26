<template>
	<view>
		<view>
			<Header></Header>
		</view>
		<view>
			<Footer></Footer>
		</view>
	</view>
</template>

<script>
	import Header from "@/components/common/header.vue"
	import Footer from "@/components/common/footer.vue"
	import TimeList from "@/components/common/list/timeList.vue"
	export default {
		components: {
			Header,
			TimeList,
			Footer,
		},
		data() {
			return {
				title: "分类"
			}
		},
		methods: {

		}
	}
</script>

<style>

</style>
