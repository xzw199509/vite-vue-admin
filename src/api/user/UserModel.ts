/**
 * 登录请求参数类型
 */
export interface LoginParm {
  username: string,
  password: string,
  code: string
}
/**
 *  登录成功返回值类型
 */
export interface LoginResult {
  id: number,
  token: string,
  code: number,
  expireTime: number //token 过期时间
}
/**
 * 用户信息
 */
export interface UserInfo {
  avatar: string;
  id: string;
  introduction: string;
  name: string;
  roles: Array<string>
}
