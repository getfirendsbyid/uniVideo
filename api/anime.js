import request from '@/common/request.js'
module.exports = {
    // 登录
    animeInfo(data){
        return request('anime/info','post',data);
    },
	
}