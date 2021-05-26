import request from '@/common/request.js'
module.exports = {
    // 登录
    banner(){
        return request('home/banner','post',"");
    },
	videoList(){
	    return request('home/videoList','post',"");
	}
}