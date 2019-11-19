let baseURL

// 开发环境
if (process.env.NODE_ENV === 'development') {
    baseURL = 'http://jie12366.xyz:88'
} else if (process.env.NODE_ENV === 'production') {
    baseURL = 'http://jie12366.xyz:88'
}

export default baseURL
