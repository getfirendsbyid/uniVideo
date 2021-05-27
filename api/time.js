import request from '@/common/request.js'
module.exports = {
    // 时刻表
    getTimeList(){
        return request('time/getTimeList','post',"");
    },
	
}