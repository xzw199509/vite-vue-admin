import { getCurrentInstance } from "vue";
import { LoginParm } from "@/api/user/UserModel";
import { userStore } from "@/store/user";
import { useRouter } from "vue-router";
export default function useLogin(loginModel:LoginParm ) {
  const ustore = userStore()
  const router = useRouter()
  const { proxy } = getCurrentInstance() as any // 获取当前组件的上下文
  // 登录的提交
  const login = async () => {
    // 表单验证
    proxy.$refs.loginFormRef.validate(async(valid: boolean) => {
      if (valid) {
        ustore.login(loginModel).then(res=>{
          if(res.data.code ===200){
            router.push({path:'/'})
          }
        })
      }
    })
  }
  return {
    login
  }
}