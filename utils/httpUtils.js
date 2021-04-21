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
		case '1002':
			domainUrl += '/appLogin/login' // app登录
			break
		case '1003':
			domainUrl += '/appUser/changePassword' // 修改密码
			break
		case '1004':
			domainUrl += '/appLogout' // 退出登录
			break
		case '1005':
			domainUrl += '/appUser/getUserInfo' // 获取个人信息
			break
		case '1006':
			domainUrl += '/appUser/updateUserInfo' // 修改个人信息
			break
		case '1007':
			domainUrl += '/appUser/getVisualList' // 获取视角列表
			break
		case '2001':
			domainUrl += '/appSaleView/toDeal/findFollowUpList' // 获取待办数据
			break
		case '2002':
			domainUrl += '/appSaleView/customer/getCustomerFollowUps' // 查询跟进列表-客户信息
			break
		case '2003':
			domainUrl += '/appSaleView/houseResource/findRoomList' // 查询房源列表
			break
		case '2004':
			domainUrl += '/appSaleView/houseResource/getBuildingByPrj' // 查询房源项目楼栋
			break
		case '2005':
			domainUrl += '/appSaleView/houseResource/getUnitsByBuilding' // 查询房源项目单元
			break
		case '2006':
			domainUrl += '/appSaleView/houseResource/findRoomDetailInfo' // 查询房源详情
			break
		case '2007':
			domainUrl += '/appSaleView/houseResource/lockRoomBySale' // 销控该房源
			break
		case '2008':
			domainUrl += '/appSaleView/houseResource/getDiscountList' // 获取折扣列表
			break
		case '2009':
			domainUrl += '/appSaleView/houseResource/getPayMethodList' // 获取付款方式列表
			break
		case '2010':
			domainUrl += '/appSaleView/houseResource/createBuyPlan' // 生成置业计划
			break
		case '2011':
			domainUrl += '/appSaleView/customer/conditionList' // 获取客户列表-筛选条件
			break
		case '2012':
			domainUrl += '/appSaleView/customer/getCustomerList' // 获取客户列表
			break
		case '2013':
			domainUrl += '/appSaleView/customer/listCustomerGroup' // 获取客户分组列表
			break
		case '2014':
			domainUrl += '/appSaleView/customer/addGroup' // 分组管理-添加分组
			break
		case '2015':
			domainUrl += '/appSaleView/customer/updateGroup' // 分组管理-修改分组
			break
		case '2016':
			domainUrl += '/appSaleView/customer/rmGroup' // 分组管理-删除分组
			break
		case '2017':
			domainUrl += '/appSaleView/customer/setGroupForCustomer' // 分组管理-为客户设置分组
			break
		case '2018':
			domainUrl += '/appSaleView/houseResource/calculateMonoAndTotalPrice' // 计算折后单价和折后总价
			break
		case '2019':
			domainUrl += '/appSaleView/houseResource/getAllLoanRateList' // 根据类型获取贷款利率
			break
		case '2020':
			domainUrl += '/appSaleView/customer/customerRegister' // 客户登记
			break
		case '2021':
			domainUrl += '/appSaleView/customer/getCusRegisterCondition' // 客户登记-获取下拉框列表
			break
		case '2022':
			domainUrl += '/appSaleView/customer/getCustomerDetail' // 客户详情
			break
		case '2023':
			domainUrl += '/appSaleView/customer/updateCustomerInfo' // 客户详情-保存
			break
		case '2024':
			domainUrl += '/appSaleView/customer/toAddFollowUpLog' // 获取新增跟进下拉框列表
			break
		case '2025':
			domainUrl += '/appSaleView/customer/addFollowUpLog' // 新增跟进-保存
			break
		case '2026':
			domainUrl += '/appSaleView/toDeal/followUpLogTag' // 待办-跟进主界面
			break
		case '2027':
			domainUrl += '/appSaleView/toDeal/overdueUrgingTag' // 待办-催办主界面
			break
		case '2028':
			domainUrl += '/appSaleView/toDeal/getToDealPage' // 获取跟进列表
			break
		case '2029':
			domainUrl += '/appSaleView/toDeal/getToDealPage' // 获取催办列表
			break
		case '2030':
			domainUrl += '/appSaleView/toDeal/pageSubOverdue' // 获取逾期未认购列表
			break
		case '2031':
			domainUrl += '/appSaleView/toDeal/pageSignOverdue' // 获取逾期未签约列表
			break
		case '2033':
			domainUrl += '/appSaleView/more/getPrivateAchievement' // 获取业绩
			break
		case '2034':
			domainUrl += '/appSaleView/customer/grabPublicCustomer' // 客户详情-抢客户
			break
		case '2035':
			domainUrl += '/appSaleView/toDeal/getSuperiorNode' // 申请延期-获取审核单位
			break
		case '2036':
			domainUrl += '/appSaleView/toDeal/getVisibleReviewer' // 申请延期-获取审核人
			break
		case '2037':
			domainUrl += '/appSaleView/toDeal/getDelayDate' // 申请延期-获取失效日期
			break
		case '2038':
			domainUrl += '/appSaleView/toDeal/application4Extension' // 申请延期-立即申请
			break
		case '2039':
			domainUrl += '/appSaleView/more/getProjectList' // 切换项目-获取列表
			break
		case '2040':
			domainUrl += '/appSaleView/more/switchProject' // 切换项目-确认切换
			break
		case '2041':
			domainUrl += '/appSaleView/houseResource/getLoanAmountMax' // 获取贷款最大限额
			break
		case '2042':
			domainUrl += '/appSaleView/houseResource/getLatestLprRate' // 获取lpr列表
			break
		case '2043':
			domainUrl += '/appSaleView/more/switchPrj' // 切换项目成功后-调用接口-将id传给后台
			break
		case '2044':
			domainUrl += '/appSaleView/customer/getQuestionCustomerList' // 获取问卷调查客户列表
			break
		case '2045':
			domainUrl += '/appSaleView/houseResource/getDetailByPaymentId' // 根据付款方式id获取预付款信息
			break
		case '2046':
			domainUrl += '/appSaleView/customer/invalidCustomer' // 置为无效客户
			break
		case '2047':
			domainUrl += '/appSaleView/customer/customerRegisterById' // 登记到访
			break
		case '2048':
			domainUrl += '/appSaleView/houseResource/applyLockRoom' // 房源-申请锁房
			break
		case '3001':
			domainUrl += '/SpecialApply/selectSpecialApply' // 获取审批列表
			break
		case '3002':
			domainUrl += '/SpecialApply/approval' // 提交审批
			break
		case '3003':
			domainUrl += '/appChiefView/newsFlash/getCompanyList' // 获取公司列表
			break
		case '3004':
			domainUrl += '/appChiefView/newsFlash/getProjectList' // 获取项目列表
			break
		case '3005':
			domainUrl += '/appChiefView/newsFlash/getNewsFlash' // 获取快报列表
			break
		case '3006':
			domainUrl += '/appChiefView/newsFlash/getTransactionStatistic' // 获取成交列表
			break
		case '3007':
			domainUrl += '/appChiefView/newsFlash/getRefundsStatistic' // 获取回款列表
			break
		case '3008':
			domainUrl += '/appChiefView/newsFlash/getRoomResourcesStatistic' // 获取房源列表
			break
		case '3009':
			domainUrl += '/appChiefView/newsFlash/getVisitedStatistic' // 获取来电来访列表
			break
		case '3010':
			domainUrl += '/appChiefView/newsFlash/getTransRateStatistic' // 获取转化率列表
			break
		case '3011':
			domainUrl += '/appChiefView/newsFlash/getOverdueStatistic' // 获取逾期情况列表
			break
		case '4001':
			domainUrl += '/appManageView/getCaseStatistics' // 获取案场统计-获取统计数据
			break
		case '4002':
			domainUrl += '/appSaleView/houseResource/findRoomListForManageView' // 销售经理-房源列表
			break
		case '4003':
			domainUrl += '/appManageView/getRoomStatistics' // 销售经理-房源统计
			break
		case '4004':
			domainUrl += '/appManageView/getCustomerStatistics' // 销售经理-客户分析
			break
		case '5001':
			domainUrl += '/questionnaire/template/getQuestionnaireBySalesMan' // 获取销售问卷列表
			break
		case '5002':
			domainUrl += '/questionnaire/template/getQuestionnaireInfoById' // 获取问卷调查列表
			break
		case '5003':
			domainUrl += '/questionnaire/template/addCustomerAnswer' // 生成客户问卷
			break
	}
	uni.request({
		url: domainUrl,
		method: "POST",
		header: {
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*",
			"token": token,
			"projectId": projectId
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
