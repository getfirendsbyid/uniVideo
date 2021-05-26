<script>
	export default {
		globalData: {
			is_flag:true  //跳转开关
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang="scss">
	/* 注意要写在第一行，同时给style标签加入lang="scss"属性 */
	@import "uview-ui/index.scss";
	backgroundColor{
		background-color: $uni-theme;
	}
	// uview图标大小更改
	.u-icon__icon{
		// color: #999!important;
	}
	// 搜索icon
	.uicon-search::before{
		font-size: 28rpx!important;
	}
	.uicon-close-circle-fill::before{
		font-size: 28rpx!important;
		color: #999!important;
	}
	// 修改密码icon
	.uicon-eye::before{
		font-size: 28rpx!important;
	}
	.uicon-eye-fill::before{
		font-size: 28rpx!important;
	}
	input{
		font-size: 28rpx;
	}
	// tab页公共样式
	.expressGray_box{
		background-color: #e7e7e7!important;
		margin-top: 0!important;
	}
	.express_box {
		.echartsTop {
			display: flex;
			align-items: center;
			justify-content: space-between;
			margin-bottom: 10rpx;
			.dropWrap {
				width: 80rpx;

				.u-dropdown__content__mask {
					background: none !important;
				}

				.u-cell {
					padding: 2px 16px;
				}
			}
		}
		.echarts_wrap{
			display: flex;
			align-items: center;
			position: relative;
			.arrow{
				position: absolute;
				z-index: 1;
			}
			.left{
				left: -20rpx;
			}
			.right{
				right: -20rpx;
			}
			.barEcharts{
				width: 700rpx;
			}
		}
	}

	

	// 底部两个按钮
	.footer_flex {
		width: 100%;
		height: 90rpx;
		line-height: 90rpx;
		font-size: 32rpx;
		text-align: center;
		position: fixed;
		z-index: 99;
		bottom: 40rpx;
		color: #e7e7e7;
		// background: linear-gradient(90deg, #e7e7e7, #e7e7e7);
		display: flex;

		text {
			flex: 1;
			margin: 0 20rpx;
			border-radius: 44rpx;
			background: linear-gradient(90deg, #03958C, #00AE66);
		}

		text:first-child {
			color: #666;
			background: #E6E6E6;
		}
	}
	// 底部三个按钮
	.footer_three{
		width: 100%;
		height: 76rpx;
		line-height: 76rpx;
		font-size: 30rpx;
		text-align: center;
		position: fixed;
		z-index: 99;
		bottom: 40rpx;
		color: #fff;
		display: flex;
		justify-content: space-between;
		.setIn {
			background: #E6E6E6;
			color: #666;
			margin: 0 20rpx;
			border-radius: 38rpx;
			font-size: 24rpx;
			width: 200rpx;
		}
		.footerRight{
			width: 480rpx;
			border-radius: 36rpx;
			display: flex;
			background-color: #F5B00C;
			margin: 0 20rpx;
			text{
				flex: 1;
			}
			.green{
				background-color: #03958C;
				border-radius: 0rpx 36rpx 36rpx 0rpx;
			}
		}
	}

	.paddingBottom {
		padding-bottom: 100rpx;
	}
	.padiingTop90{
		padding-top: 90rpx;
	}
	.padiingTop60{
		padding-top: 60rpx;
		background-color: #fff;
	}
	.padding30 {
		padding: 30rpx;
	}

	.u-icon__icon {
		font-size: 8px !important;
	}
	
	// 无数据图片大小
	.noData{
		width: 440rpx;
		height: 455rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
	}
	// 暂无数据 不需要定位
	.noDataImg {
		width: 375rpx;
		height: 389rpx;
		display: flex;
		align-content: center;
		justify-content: center;
		margin: 160rpx auto 0;
		background-size: cover;
	}
	// u-tabel样式修改
	.u-table{
		border: none!important;
	}
	.u-th{
		height: 80rpx;
		line-height: 80rpx;
		border-right: none!important;
		border-bottom: none!important
	}
	.u-td{
		height: 80rpx;
		line-height: 80rpx;
		border-right: none!important;
		border-bottom: none!important;
	}
	// ld-select样式更改start
	.input {
		width: 100%;
		border: none !important;
		padding: 0!important;
		font-size: 28rpx !important;
	
		input {
			color: #666;
		}
	}
	.select-modal .select-dialog{
		position: fixed!important;
		bottom: 0;
		left: 0;
	}
	.select-modal .select-dialog .select-content .select-item {
		height: 40px;
		line-height: 40px;
		padding: 0 !important;
	}
	
	.text-green {
		color: #03958C!important;
	}
	
	.text-blue {
		color: #333!important;
	}
	
	.selectIcon {
		display: none;
	}
	
	.select-bar {
		border-bottom: 1rpx solid #eee;
	}
	
	// ld-select样式更改end
	picker{
		width: 100%;
	}
	.flexBet{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		ld-select{
			width: 100%;
			.main{
				width: 100%;
			}
		}
		input{
			width: 100%;
			text-align: right;
			margin-right: 12rpx;
		}
	}
	
	// uviwer自带边框
	.u-border-bottom:after {
	  border-bottom-width: 1px;
	}
	.u-border-bottom:after, .u-border-left:after, .u-border-right:after, .u-border-top-bottom:after, .u-border-top:after, .u-border:after{
		border-bottom: 1px solid #eee!important;
	}
	// tabs顶部定位
	.fixedTop{
		position: fixed;
		width: 100%;
		background: #fff;
		top: 0;
		z-index: 2;
		// border-bottom: 20rpx solid #f6f6f6;
		.u-tab-bar{
			background-color: #F5B00C!important;
		}
	}
	// h5持有样式
	/* #ifdef H5 */
	.fixedTop{
		top: 44px;
	}
	.uni-textarea-textarea{
		font-size: 11px;
	}
	/* #endif */
	// uniapp复选框样式修改
	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		color: #fff!important;
		background: #03958C;
	}
	// u-tabbar文字样式修改
	.u-tabbar__content__item__text{
		font-size: 20rpx!important;
	}
</style>
