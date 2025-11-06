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

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 在
    const result = response.data.data;
    return result;
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    /* ?. 是可选链操作符，它会在访问嵌套属性时自动检查前面的属性是否存在（不为 null 或 undefined）。如果中间任何一个属性不存在，整个表达式会返回 undefined，    
    console.log(error);
    {
      config: {...},        // 请求配置
      response: {           // 服务器响应（仅当有响应时存在）
        status: 401,
        statusText: "Unauthorized",
        data: {...},        // 后端返回的错误数据
        headers: {...},
        config: {...}
      },
      request: XMLHttpRequest实例,
      message: "Request failed with status code 401",
      stack: "Error: Request failed with status code 401 at ..."
    }
    */
    // if (error !== undefined && error !== null && error.response !== undefined && error.response !== null && error.response.status === 401)

    if (error?.response?.status === 401) {
      alert("身份验证失败");
      localStorage.clear();
      location.href = "../login/index.html";
    }

    return Promise.reject(error);
  }
);
