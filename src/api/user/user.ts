import http from "@/http/http";
import { LoginParm, LoginResult, UserInfo } from "./UserModel"
enum Api {
  getImg = '/api/sysUser/image',
  login = '/api/user/login',
  getInfo = '/api/sysUser/getInfo',
  loginOut = '/api/sysUser/loginOut',
}
//获取验证码
export async function getImagApi() {
  return await http.getImage(Api.getImg)
}
//登录
export async function loginApi(params: LoginParm) {
  return await http.login<LoginResult>(Api.login, params)
}
//获取用户信息
export const getInfoApi = async () => {
  return await http.get<UserInfo>(Api.getInfo)
}
//退出登录
export async function loginOutApi(parm) {
  return await http.post(Api.loginOut, parm)
}
