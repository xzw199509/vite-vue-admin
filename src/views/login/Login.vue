<template>
  <div class="loginContainer">
    <el-form class="loginForm" :model="loginModel" ref="loginFormRef" :rules="rules" :inline="false">
      <el-form-item label="">
        <div class="loginTitle">系统登录</div>
      </el-form-item>
      <el-form-item label="">
        <el-input placeholder="请输入账户" v-model="loginModel.username"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-input placeholder="请输入密码" v-model="loginModel.password"></el-input>
      </el-form-item>
      <!-- <el-form-item label="">
        <el-row :gutter="20">
          <el-col :span="16">
            <el-input placeholder="请输入验证码" v-model="loginModel.code"></el-input>
          </el-col>
          <el-col :span="8">
            <img :src="imgSrc" @click="getImage" />
          </el-col>
        </el-row>
      </el-form-item> -->
      <el-form-item label="">
        <el-row :gutter="20" style="margin-top: 10px">
          <el-col :span="12">
            <el-button class="mybtn" @click="login" type="primary">登录</el-button>
          </el-col>
          <el-col :span="12">
            <el-button class="mybtn">取消</el-button>
            <!-- <el-input  class="mybtn" placeholder="请输入验证码" v-model="loginModel.code" ></el-input> -->
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>
<script setup lang="ts">
// import { ref, reactive } from 'vue'
// import useImage from '@/composables/login/useImage'
import useBaseLogin from '@/composables/login/useBaseLogin'
import { useRouter } from "vue-router";
// import useLogin from '@/composables/login/useLogin'
// 基础数据
const { loginFormRef, loginModel, rules } = useBaseLogin()
// const loginModel = {
//   username:'',
//   password:''
// }
// 验证码
// const { imgSrc, getImage } = useImage()
// 登录
// const { login } = useLogin(loginModel)
// const route = useRoute();
const router = useRouter();
const login = ()=>{
  console.log('登录');
  router.push({ path: '/' });
}
</script>
<style scoped lang="scss">
.loginContainer {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .loginForm {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    height: 320px;
    width: 400px;
    border-radius: 10px;
    padding: 20px 35px;
    box-shadow: 0 0 25px #cac6c6;
    
    .loginTitle {
      width: 100%;
      font-size: 24px;
      font-weight: 600;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .mybtn {
      width: 100%;
    }
  }
}
:deep(.el-row) {
  width: 100% !important;
}
</style>
