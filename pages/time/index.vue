<template>
  <view>
    <view>
      <Header></Header>
    </view>
    <view>
      <TimeList :videoData="timeListData"></TimeList>
    </view>
    <view>
      <Footer></Footer>
    </view>
  </view>
</template>

<script>
import Header from "@/components/common/header.vue";
import Footer from "@/components/common/footer.vue";
import TimeList from "@/components/common/list/timeList.vue";
import api from '@/api/time.js'
export default {
	
  components: {
    Header,
    TimeList,
    Footer,
  },

  data() {
    return {
	  timeListData:"",
      isScroll: true,
      title: "时刻表",
      list: [
        {
          name: "十年",
        },
        {
          name: "青春",
        },
        {
          name: "之约",
        },
      ],
      // 因为内部的滑动机制限制，请将tabs组件和swiper组件的current用不同变量赋值
      current: 0, // tabs组件的current值，表示当前活动的tab选项
      swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
    };
  },
  methods: {
    // tabs通知swiper切换
    tabsChange(index) {
      this.swiperCurrent = index;
    },
    // swiper-item左右移动，通知tabs的滑块跟随移动
    transition(e) {
      let dx = e.detail.dx;
      this.$refs.uTabs.setDx(dx);
    },
    // 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
    // swiper滑动结束，分别设置tabs和swiper的状态
    animationfinish(e) {
      let current = e.detail.current;
      this.$refs.uTabs.setFinishCurrent(current);
      this.swiperCurrent = current;
      this.current = current;
    },
    // scroll-view到底部加载更多
    onreachBottom() {},
	_getBanner(){
		api.banner().then(res => {
			this.banner = res.data
		});
	},
	_getTimeList(){
		api.getTimeList().then(res => {
			this.timeListData = res.data
			console.log(res.data)
		});
	}
  },
 
  created:function() {
  	this._getTimeList();
  },
};
</script>
