<template>
  <div class="login-wrap">
    <!--
      el-form 会生成 form 标签
      我们自己增加的 class 会和它生成的结果 class 合并到一起
     -->
    <br/>
    <el-form class="login-form" label-position="top" ref="form" :model="userForm" label-width="80px">
      <h2 class="title">用户登陆</h2>
      <el-form-item>
        <el-input
          v-model="userForm.telephone"
          placeholder="手机号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          type="password"
          v-model="userForm.password"
          placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" @click="login">立即登陆</el-button>
      </el-form-item>
      <el-form-item>
        <a href="#" v-on:click="toRegister">没有账号？马上注册 </a>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {saveUserInfo} from '@/assets/js/auth'
export default {
  data () {
    return {
      userForm: {
        telephone: '',
        password: ''
      }
    }
  },
  methods: {
    async login () {
      // 1. 采集表单数据
      // 2. 表单验证
      // 3. 发请求执行登陆操作
      // 4. 根据响应做交互
      var telephone = this.userForm.telephone
      var password = this.userForm.password
      if (telephone === '' || password === '') {
        this.$message({
          message: '账号或密码为空！',
          type: 'error'
        })
        return
      }
      console.log('按下登录按钮')
      const res = await this.$http.post('https://57c1c3b4-697a-49a8-8e5a-50b666795676.mock.pstmn.io/login', this.userForm)
      const data = res.data
      if (data.status === 200) {
        // 登陆成功，我们把服务器发给我们当前登陆的用户信息存储到本地存储
        saveUserInfo(data.results)
        // 导航到 home 组件
        this.$router.push({
          name: 'home'
        })
        // 给出登陆成功的提示消息
        this.$message({
          type: 'success',
          message: '登陆成功!'
        })
      }
    },
    toRegister () {
      this.$router.push({
        name: 'register'
      })
    }
  }
}
</script>

<style>
  .login-wrap {
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .title {
    margin: 0px auto 40px auto;
    text-align: center;
  }
  .login-form {
    background-color: #fff;
    width: 400px;
    height: 300px;
    padding: 30px;
    border-radius: 5px;
  }
  .login-form .login-btn {
    width: 100%;
  }
</style>
