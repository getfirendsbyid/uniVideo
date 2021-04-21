//#ifdef H5
import VConsole from 'vconsole'
new VConsole()
//#endif
export default (phone) => {
	// 获取设备平台
	let platform = uni.getSystemInfoSync().platform
	//#ifdef H5
	// h5环境--浏览器
	let ua = navigator.userAgent.toLowerCase()
	// 就要判断 是微信内置浏览器还是用户的普通浏览器
	if (ua.match(/MicroMessenger/i) == "micromessenger") {
		// 微信浏览器
		console.log('微信浏览器')
	} else {
		// 普通浏览器
	}
	//#endif
	//#ifdef APP-PLUS
	// app环境
	switch (platform) {
		case 'android':
			// 导入Activity、Intent类
			var Intent = plus.android.importClass("android.content.Intent");
			var Uri = plus.android.importClass("android.net.Uri");
			// 获取主Activity对象的实例 
			var main = plus.android.runtimeMainActivity();
			// 创建Intent 
			var uri = Uri.parse("tel:" + phone); // 这里可修改电话号码 
			var call = new Intent("android.intent.action.CALL", uri);
			// 调用startActivity方法拨打电话 
			main.startActivity(call);
			break;
		case 'ios':
			// 使用uni-app提供的借口
			uni.makePhoneCall({
				phoneNumber: phone
			})
			break;
		default:
			// 调试器工具
	}
	//#endif
}
