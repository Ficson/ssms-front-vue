<template>

  <div>
    <h2 class="heading">营销短信测试</h2>
    <hr/>
    <el-form ref="form" :model="telForm" label-width="80px"  style="margin:20px;width:20%;min-width:600px;">
      <el-form-item label="手机号码" required>
        <el-input type="textarea" rows="2" cols="2" v-model="telForm.telephone" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">发送测试</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
      <el-form-item label="短信内容">
        <span>{{message}}</span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      telForm: {
        telephone: ''
      },
      message: '【叮咚云】您已成功注册叮咚云，请联系支持人员安排对接测试。退订回T'
    }
  },
  methods: {
    async submitForm () {
      const res = await this.$http.post('https://a5110ee0-141f-4b17-9810-1b3d4f0a33be.mock.pstmn.io/messageTest', this.telForm)
      const data = res.data
      console.log('方式执行了')
      if (data.status === 200) {
        this.$message({
          type: 'success',
          message: '发送成功，注意查收!'
        })
        this.telForm.telephone = ''
      }
    },
    resetForm () {
      // this.$refs[form].resetFields()
      console.log(this.telForm.telephone)
      this.telForm.telephone = ''
    }
  }
}
</script>
<style></style>
