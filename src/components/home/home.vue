<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="logo">
            <img src="./logo1.png" alt="">
          </div>
        </el-col>
        <el-col :span="4" class="userinfo">
          <el-dropdown  @command="handleCommand"  trigger="hover">
            <span class="el-dropdown-link userinfo-inner">
              <img class="personal_avatar"
                   src="../../assets/images/personal_avatar.png"
                   alt="" /></span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="personalInfo">个人信息</el-dropdown-item>
              <el-dropdown-item command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-container class="container">
      <el-aside class="aside" width="200px">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo aside-menu"
          @open="handleOpen"
          @close="handleClose"
          :unique-opened="false"
          :router="true">

          <el-menu-item index="/">首页</el-menu-item>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>会员营销</span>
            </template>
            <el-menu-item index="/marking-test">短信测试</el-menu-item>
            <el-menu-item index="/marking-send">发送短信</el-menu-item>
            <el-menu-item index="/marking-manage">模板管理</el-menu-item>
            <el-menu-item index="2-4">通讯录管理</el-menu-item>
            <el-menu-item index="2-5">短信回复</el-menu-item>
            <el-menu-item index="2-6">发送记录</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>验证码短信</span>
            </template>
            <el-menu-item index="3-1">短信测试</el-menu-item>
            <el-menu-item index="3-2">模板管理</el-menu-item>
            <el-menu-item index="3-3">发送记录</el-menu-item>
            <el-menu-item index="3-4">注册率统计</el-menu-item>
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>通知短信</span>
            </template>
            <el-menu-item index="4-1">短信测试</el-menu-item>
            <el-menu-item index="4-2">模板管理</el-menu-item>
            <el-menu-item index="4-3">短信回复</el-menu-item>
            <el-menu-item index="4-4">发送记录</el-menu-item>
          </el-submenu>

          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>我要充值</span>
            </template>
            <el-menu-item index="5-1">线上充值</el-menu-item>
            <el-menu-item index="5-2">线下充值</el-menu-item>
            <el-menu-item index="5-3">充值记录</el-menu-item>
            <el-menu-item index="5-4">短信账单</el-menu-item>
          </el-submenu>

          <el-submenu index="6">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>账户设置</span>
            </template>
            <el-menu-item index="6-1">身份验证</el-menu-item>
            <el-menu-item index="6-2">多账号管理</el-menu-item>
            <el-menu-item index="6-3">IP白名单管理</el-menu-item>
            <el-menu-item index="6-4">余额提醒</el-menu-item>
            <el-menu-item index="6-5">修改密码</el-menu-item>
          </el-submenu>

          <el-submenu index="7">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>短信设置</span>
            </template>
            <el-menu-item index="7-1">签名管理</el-menu-item>
            <el-menu-item index="7-2">防轰炸设置</el-menu-item>
            <el-menu-item index="7-3">黑名单管理</el-menu-item>
            <el-menu-item index="7-4">数据推送设置</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import {removeUserInfo} from '@/assets/js/auth'
import {getUserInfo} from '@/assets/js/auth.js'
export default {
  data () {
    return {
      currentTelephone: ''
    }
  },
  mounted () {
    this.currentTelephone = getUserInfo()
    console.log(this.currentTelephone.telephone)
  },
  methods: {
    handleCommand (command) {
      switch (command) {
        // 如果是退出
        case 'logout':
          this.$confirm('确认退出吗?', '退出提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => { // 点击确认执行 resolve 函数
            // 1. 删除本地存储中的用户登陆信息
            removeUserInfo()
            // 2. 跳转到登陆视图
            this.$router.push({
              name: 'login'
            })
            // 提示用户退出成功
            this.$message({
              type: 'success',
              message: '退出成功!'
            })
          }).catch(() => {
            // 点击取消的处理
          })
          break
        // 如果是查看用户信息
        case 'personalInfo':
        // this.$refs.personalInfo.$emit('openPersonalInfoDialog')
      }
    }
  },
  handleOpen (key, keyPath) {
    console.log(key, keyPath)
  },
  handleClose (key, keyPath) {
    console.log(key, keyPath)
  }
}

</script>

<style>

  .container, .aside .aside-menu {
    height: 100%;
  }

  .header {
    background-color: #B3C0D1;
    line-height: 60px;
  }
  .userinfo {
    text-align: right;
    padding-right: 35px;
    float: right;
  }
  .userinfo-inner {
    cursor: pointer;
    color: #fff;
  }
  .personal_avatar {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    margin: 10px 0px 10px 10px;
    float: right;
  }
  .aside {
    background-color: #D3DCE6;
  }

  .main {
    background-color: #E9EEF3;
    height: 100%;
  }

</style>
