import { defineStore } from "pinia";
import { loginApi, getInfoApi } from "@/api/user/user"
import { LoginParm } from "@/api/user/UserModel"
import { Result } from "@/http/request"
// import { setUserId, setToken, setExpireTime } from "@/utils/auth"
// 定义state类型
export type UserState = {
  token: string,
  userId: string|number,
  permissions: string[]
}
export const userStore = defineStore('userState', {
  state: (): UserState => {
    return {
      token: '',
      userId: '',
      permissions: []
    }
  },
  actions: {
    // 获取用户信息
    getInfo( ) {
      return new Promise((resolve, reject) => {
        getInfoApi().then(res => {
          this.permissions = res.data.roles
          resolve(res.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录
    login( loginParm: LoginParm) {
      return new Promise<Result>((resolve, reject) => {
        loginApi(loginParm).then(res => {
          if (res.data.code === 200) {

            this.token= res.data.token
            this.userId= res.data.id
            // setUserId(res.data.id)
            // setToken(res.data.token)
            // setExpireTime(res.data.expireTime)
          }
          resolve(res)
        }).catch(error => {
          reject(error)
        })

      })
    }
  }
}
)