<template>
  <div class="register-wrap">
    <el-form class="register-form" label-position="top" ref="form" :model="userForm" label-width="80px">
      <h2 class="heading">用户注册</h2>
      <el-form-item label="手机号码">
        <el-input
          v-model="userForm.telephone"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input
          type="password"
          v-model="userForm.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  class="register-btn" type="primary" @click="register">立即注册</el-button>
      </el-form-item>
      <el-form-item>
        <a href="#" v-on:click="toLogin">已有账号？马上登陆</a>
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
    async register () {
      var telephone = this.userForm.telephone
      var password = this.userForm.password
      if (telephone === '' || password === '') {
        this.$message({
          message: '账号或密码为空！',
          type: 'error'
        })
        return
      }
      const res = await this.$http.post('/register', this.userForm)
      const data = res.data
      if (data.status === 200) {
        // 登陆成功，我们把服务器发给我们当前登陆的用户信息存储到本地存储
        saveUserInfo(data.data)
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
    toLogin () {
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style>
  .register-wrap {
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .register-form {
    background-color: #fff;
    width: 400px;
    padding: 30px;
    border-radius: 5px;
  }
  .register-form .register-btn {
    width: 100%;
  }
</style>
