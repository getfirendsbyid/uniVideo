import request from '@/common/request.js'
import { formatGetUri } from '../common/util.js'

const api = {}
// POST请求方式
api.login = params =>request.globalRequest('/auth/login','POST', params)
api.register = params =>request.globalRequest('/auth/register','POST', params)
api.getCaptcha = params => request.globalRequest('captcha', 'GET')

export default api;