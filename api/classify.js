import request from '@/common/request.js'
module.exports = {
    // 登录
    getTag(){
        return request('classify/getTag','post',"");
    },
	
}