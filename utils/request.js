// axios 公共配置
// 基地址
axios.defaults.baseURL = "http://geek.itheima.net";

// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem("token");
    //     if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    token && (config.headers.Authorization = `Bearer ${token}`);
    //config 参数：包含当前请求的所有配置（如 URL、method、headers、data 等），必须返回处理后的 config，否则请求会失败。
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);
