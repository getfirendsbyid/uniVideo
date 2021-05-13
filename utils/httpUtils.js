import config from "@/utils/config.js";
import Tools from "@/utils/tools.js";

function sendHttpRequest(command, argument, sucallback, failcallback) {
	let token = uni.getStorageSync('loginInfo').token || ''
	// let Access-Control-Allow-Origin = '*'
	let projectId = uni.getStorageSync('loginInfo').defaultPrjId || ''
	let jsonData = JSON.stringify(argument)
	let domainUrl = config.serveData.apiServerUrl
	
	switch (command) {
		case '1001':
			domainUrl += '/appLogin/captcha' // 获取验证码
			break
	}
	
	uni.request({
		url: domainUrl,
		method: "POST",
		header: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"token": token,
		},
		data: jsonData,
		success: function (res) {
			if (sucallback && sucallback !== null) {
				sucallback(res)
				if (res.data.code != 0) {
					Tools.showErrorToast(res.data.msg)
				}
			}
		},
		fail: function (res) {
			uni.hideToast()
			if (failcallback && failcallback !== null) {
				failcallback(res)
			}
		}
	})
}
module.exports = {
	sendHttpRequest: sendHttpRequest
}
