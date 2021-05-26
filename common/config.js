let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    url_config = 'http://localhost:9999/'
}else{
    // 生产环境
    url_config = 'http://localhost:9999/'
}

export default url_config