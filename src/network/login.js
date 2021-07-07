import axios from "axios"
function login(config) {
  const instance = axios.create({
    baseURL: "http://127.0.0.1:3721/api/v1",
    timeout: 5000,

  })
  instance.interceptors.request.use(config => {
    let token = localStorage.getItem("token");
    if (token) {
      // 假设下面这行代码是让“戴口罩”
      config.headers["Authorization"] = token;
    }
    return config
  })
  instance.interceptors.response.use(res => {
    let token = res.data.token
    token && localStorage.setItem("token", res.data.token)
    return res.data
  }, err => {
    console.log(err);
  })
  return instance(config)
}

// 登录模块
export function loginInfo(mobile, password) {
  return login({
    url: "/login",
    method: "post",
    data: {
      mobile,
      password
    },
  })
}
export function getUserInfo(token) {
  return login({
    url: "/getUserInfo",
    method: "get",
    params: {
      token
    },
  })
}