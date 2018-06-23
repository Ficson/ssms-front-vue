<template>
  <div>
    <h2 class="heading">身份验证</h2>
    <!-- 公司身份认证-->
    <el-tabs v-model="activeName" >
    <el-tab-pane label="企业" name="first" >
    <el-form ref="companyForm" :model="companyForm" label-width="100px" style="margin:20px;width:20%;min-width:600px;">
      <el-form-item label="公司名称" required placeholder="请输入域营业执照相符的公司名称">
          <el-input v-model="companyForm.name" ></el-input>
      </el-form-item>
      <el-form-item label="企业链接" required placeholder="请输入官网链接">
        <el-input v-model="companyForm.link"></el-input>
      </el-form-item>
      <el-form-item label="所属行业" required>
        <el-select v-model="companyForm.attribute" placeholder="请选择">
          <el-option
            v-for="item in attributeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="证件号码" required>
        <el-input v-model="companyForm.identity"></el-input>
      </el-form-item>
      <el-form-item label="联系电话" required>
        <el-input v-model="companyForm.telephone"></el-input>
      </el-form-item>
      <el-form-item label="证件照片" required>
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="companyForm.image"
               :src="companyForm.image"
               class="avatar">
          <i v-else class="el-icon-plus
          avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="companySubmit">提交</el-button>
      </el-form-item>
    </el-form>
    </el-tab-pane>
    <!-- 个人身份认证-->
      <el-tab-pane label="个人" >
        <el-form ref="companyForm" :model="individualForm" label-width="100px" style="margin:20px;width:20%;min-width:600px;">
          <el-form-item label="证件号码">
            <el-input v-model="individualForm.name" required></el-input>
          </el-form-item>
          <el-form-item label="联系电话">
            <el-input v-model="individualForm.telephone" required></el-input>
          </el-form-item>
          <el-form-item label="身份证正面" required >
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="individualForm.idCardFront"
                   :src="individualForm.idCardFront"
                   class="avatar">
              <i v-else class="el-icon-plus
          avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="身份证背面">
            <el-upload
              class="avatar-uploader"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="individualForm.idCardBack"
                   :src="individualForm.idCardBack"
                   class="avatar">
              <i v-else class="el-icon-plus
          avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="individualSubmit">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
 </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'first',
      attributeOptions: [{
        value: '互联网',
        label: '互联网'
      }, {
        value: '游戏',
        label: '游戏'
      }, {
        value: '移动应用',
        label: '移动应用'
      }, {
        value: '视频',
        label: '视频'
      }, {
        value: '教育',
        label: '教育'
      }, {
        value: 'IT/通信/电子服务',
        label: 'IT/通信/电子服务'
      }, {
        value: '电子商务',
        label: '电子商务'
      }, {
        value: '金融',
        label: '金融'
      }, {
        value: '网站',
        label: '网站'
      }, {
        value: '商业服务',
        label: '商业服务'
      }, {
        value: '房地产/建筑',
        label: '房地产/建筑'
      }, {
        value: '零售/租赁/贸易',
        label: '零售/租赁/贸易'
      }, {
        value: '房地产/建筑',
        label: '房地产/建筑'
      }, {
        value: '生产/加工/制造',
        label: '生产/加工/制造'
      }, {
        value: '文化传媒',
        label: '文化传媒'
      }, {
        value: '能源/电气',
        label: '能源/电气'
      }, {
        value: '政府/企业',
        label: '政府/企业'
      }, {
        value: '农业',
        label: '农业'
      }, {
        value: '物联网',
        label: '物联网'
      }, {
        value: '其他',
        label: '其他'
      }],
      companyForm: {
        type: '公司',
        name: '',
        link: '',
        attribute: '',
        identity: '',
        telephone: '',
        image: ''
      },
      individualForm: {
        name: '',
        telephone: '',
        idCardFront: '',
        idCardBack: ''
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.companyForm.identityImage = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    companySubmit () {

    },
    individualSubmit () {
    }
  }
}

</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
