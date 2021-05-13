<template>
	<view class="container">
		<view>
			<NavBar :title="title"></NavBar>
		</view>
		<view class="app_wrap">
			<view class="loginBox">
				<view class="login_item">
					<text>账号</text>
					<input type="text" v-model="form.loginAccount" placeholder="请输入您的账号" placeholder-style="color:#999"
						maxlength="20" />
				</view>
				<view class="login_item">
					<text>密码</text>
					<input type="text" v-model="form.password" placeholder="请输入您的密码" password="true"
						placeholder-style="color:123s" maxlength="12" />
				</view>
				<view class="login_item">
					<text>验证码</text>
					<input type="text" v-model="form.code" placeholder="请输入验证码" 
						placeholder-style="color:123s" maxlength="4" />
						<image src=""></image>
				</view>
				
				<view class="login_item login_btn" @click="login">登录</view>
				<text @click="toRegister">没有账号? 立即注册</text>
			</view>
		</view>
	</view>
</template>

<script>
	import NavBar from "@/components/common/navBar.vue";
	export default {
		components: {
			NavBar,
		},
		data() {
			return {
				title: "登录",
				form: {
					username: "", // 账号
					password: "", // 密码
					code: "",
					cToken: ""
				},
				captchaImg:"",
			};
		},
		methods: {
			// 登录成功跳转至页面
			login() {
				if (!this.form.loginAccount) {
					Tools.showErrorToast("账号不能为空");
					return;
				}
				if (!this.form.password) {
					Tools.showErrorToast("密码不能为空");
					return;
				}
				Tools.showLoading("登录中");
				this.$api.login(this.form)
					.then(res => {
						Tools.hideLoading()
						if (res.code && res.code == 0) {
							uni.reLaunch({
								url: "/page/user/index",
							});
						} else {
							Tools.showErrorToast(res.msg);
						}
					}).catch(res => {
						// 失败进行的操作
						console.log(res.msg)
					})
			},
			toRegister() {
				uni.reLaunch({
					url: "/pages/register",
				});
			},
			getCaptcha(){
				this.$api.getCaptcha().then(res=>{
					Tools.hideLoading()
					if (res.code && res.code == 0) {
						this.captchaImg = res.data.img
						this.cToken = res.data.cToken
					} else {
						Tools.showErrorToast(res.msg);
					}
				}).catch(res=>{
					Tools.showErrorToast(res.msg);
				})
			}
		},
		mounted() {
			this.getCaptcha();//获取验证码
		}
	};
</script>

<style lang="scss">
	page {
		height: 100%;
		overflow: hidden;
	}

	.container {
		.app_wrap {
			margin-top: 96rpx;
			.loginBox {
				width: 600rpx;
				margin: 0rpx auto 0;
				position: absolute;
				left: 75rpx;
				image {
					width: 100rpx;
					height: 100rpx;
					margin: 0 auto 200rpx;
					display: flex;
				}
				.loginText {
					font-size: 64rpx;
					font-weight: bold;
					margin: 0 auto 96rpx;
					display: flex;
				}

				.login_item {
					width: 550rpx;
					display: flex;
					flex-direction: row;
					margin-bottom: 44rpx;
					text {
						width: 200rpx;
						font-size: 30rpx;
						margin-bottom: 30rpx;
					}
					input {
						width: 100%;
						font-size: 30rpx;
						height: 86rpx;
						border: 2rpx solid #e6e6e6;
						border-radius: 16rpx;
						padding: 0 20rpx;
					}
				}

				.login_btn {
					background: linear-gradient(90deg, #fb7299, #fb7299);
					width: 100%;
					height: 86rpx;
					border-radius: 16rpx;
					line-height: 86rpx;
					text-align: center;
					font-size: 30rpx;
					color: #fff;
					margin-top: 82rpx;
					justify-content: center;
					font-size: 36rpx;
				}
			}
		}

		.login_bg {
			padding: 0;
			margin: 0;
			background-repeat: no-repeat;
			background-position: center right;
			background-size: cover;
			height: 100vh;
			background-blend-mode: multiply;
			background-color: rgba(0, 0, 0, 0.3);

			.loginBox {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);

				image {
					width: 100rpx;
					height: 100rpx;
					margin: 0 auto 200rpx;
					display: flex;
				}

				.loginText {
					font-size: 80rpx;
					color: #fff;
					margin: 0 auto 200rpx;
					display: flex;
					justify-content: center;
				}

				.login_item {
					width: 580rpx;
					height: 100rpx;
					line-height: 100rpx;
					background-color: rgba(255, 255, 255, 0.2);
					border-radius: 50rpx;
					display: flex;
					align-items: center;
					padding: 0 30rpx;
					margin-bottom: 60rpx;

					.icon {
						padding-right: 20rpx;
					}

					input {
						width: 100%;
						font-size: 30rpx;
						color: #fff;
					}
				}

				.login_btn {
					background-color: rgba(122, 159, 252, 0.8);
					color: #fff;
					margin-top: 120rpx;
					justify-content: center;
					font-size: 36rpx;
				}
			}
		}
	}
</style>
