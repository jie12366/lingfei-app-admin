import axios from 'axios'
import baseURL from './base-url'

// 创建axios实例
const instance = axios.create({
    baseURL: baseURL, // 域名路径
    timeout: 1000 * 12 // 请求超时时间
})

// 设置post的请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

export default instance
