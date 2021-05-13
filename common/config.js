let url_config = ""

if(process.env.NODE_ENV === 'development'){
    // 开发环境
    url_config = 'https://localhost:8080/'
}else{
    // 生产环境
    url_config = 'https://localhost:8080/'
}

export default url_config