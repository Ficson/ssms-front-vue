<template>

  <div>
    <h2 class="heading">营销短信测试</h2>
    <hr/>
    <el-form ref="form" :model="form" label-width="80px"  style="margin:20px;width:20%;min-width:600px;">
      <el-form-item label="手机号码" required>
        <el-input type="textarea" rows="2" cols="2"> v-model="form.telephone" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">提交</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  data () {
    return {
      form: {
        telephone: ''
      }
    }
  },
  methods: {

    onSubmit () {
      console.log('submit!')
    },
    submitForm (form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (form) {
      this.$refs[form].resetFields()
      console.log('清空!!')
    }
  }
}
</script>
<style></style>
