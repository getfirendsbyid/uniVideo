import urlConfig from './config.js'
import Utils from './util.js'

const request = {}
const headers = {}
    
request.globalRequest = (url, method, data , auth) => {

if(auth==1){
	const token = uni.getStorageSync('token');
	if(token == null){
		console.log("token 不存在")
		return ;
	}
	headers['Authorization'] = token;
}

   
return uni.request({
        url: urlConfig + url,
        method,
        data: data,
        dataType: 'json',
        header: headers
    }).then(res => {
		if(res.code=401){
			
		}
		return res;
    }).catch(res => {
　　　　　　console.log(res)
	}).final(res=>{
		　console.log(res)
		//异步操作完成
	})
 } 
 
 export default request