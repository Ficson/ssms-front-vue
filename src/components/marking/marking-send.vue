<template>
  <div>
    <el-tabs v-model="activeName"><el-tab-pane label="手动输入" name="first">
      <!--手动输入标签页-->

        <el-alert
          title="用于给会员，批量发送营销、通知、提醒信息，简单便捷"
          type="info"
          show-icon>
        </el-alert>

        <el-form ref="form1" v-model="form1"
                 label-width="120px"
                 style="margin:20px;width:60%;min-width:600px;">
          <el-form-item label="输入手机号">
            <el-input type="textarea"
                      placeholder="可填写多个手机号码（逗号或者换行分割)"
                      rows="3"
                      v-model="form1.telephone"></el-input>
            <p class="mobileResults" style="display: block;">
              已输入:
              <span>0</span>个<i></i> 无效号码:
              <span>0</span>个<i></i> 去重:
              <span>0</span>个<i></i> 有效添加:
              <span>0</span>个<i></i> <br/>
              <b>无效号码:空号或者手机号位数不对</b></p>
          </el-form-item>
          <el-form-item
            label="设置签名">
            <el-select v-model="form1.signature" placeholder="请选择活动区域">
            <el-option label="短信猴" value="messageMonkey"></el-option>
            <el-option label="短信狗" value="messageDog"></el-option>
            </el-select>
            <el-button type="primary" v-on:click="addTemplate">添加模板</el-button>
          </el-form-item >
          <el-form-item
            label="编辑内容">
            <el-input type="textarea"
                      placeholder="示例：也不知道你爱吃什么，就把一大堆商品都第二件半价了！再送你「4折券」啊，别辜负了我的心意呀 http://t.cn/RCKjuZd "
                      rows="5"
                      v-model="form1.context"></el-input>
          </el-form-item>
          <el-form-item>
           <el-button type="primary" v-on:click="manuFormSubmit">提交</el-button>
          </el-form-item>
         </el-form>
      </el-tab-pane>
      <!--文件上传标签页-->
      <el-tab-pane label="文件上传" name="second">
      <el-alert
        title="用于给会员，批量发送营销、通知、提醒信息，简单便捷"
        type="info"
        show-icon>
      </el-alert>
      <el-form ref="form2" v-model="form2"
               label-width="120px"
               style="margin:20px;width:60%;min-width:600px;">
        <el-form-item>
        <el-upload
          class="upload-demo"
          drag
          action="https://jsonplaceholder.typicode.com/posts/"
          multiple>
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
          <div class="el-upload__tip" slot="tip">只能上传文件，且不超过500kb</div>
        </el-upload>
        </el-form-item>
        <el-form-item
          label="设置签名">
          <el-select v-model="form2.signature" placeholder="短信猴">
            <el-option label="短信猴" value="messageMonkey"></el-option>
            <el-option label="短信狗" value="messageDog"></el-option>
          </el-select>
          <el-button type="primary" v-on:click="addTemplate">添加模板</el-button>
        </el-form-item >
        <el-form-item
          label="编辑内容">
          <el-input type="textarea"
                    placeholder="示例：也不知道你爱吃什么，就把一大堆商品都第二件半价了！再送你「4折券」啊，别辜负了我的心意呀 http://t.cn/RCKjuZd "
                    rows="5"
                    v-model="form2.context"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" v-on:click="fileFormSubmit">提交</el-button>
        </el-form-item>
      </el-form>
      </el-tab-pane>
      <!--通讯录标签页-->
      <el-tab-pane label="通讯录" name="third">
        <el-alert
          title="用于给会员，批量发送营销、通知、提醒信息，简单便捷"
          type="info"
          show-icon>
        </el-alert>

        <el-form ref="form3" v-model="form3"
                 label-width="120px"
                 style="margin:20px;width:60%;min-width:600px;">
            <el-form-item label="选择分组">
              <el-select v-model="form3.currentGroup" placeholder="请选择分组" >
                <el-option
                  v-for="group in contactgroups"
                  :key="group.id"
                  :label="group.groupName"
                  :value="group.groupName">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="设置签名" ><el-select v-model="form3.signature" placeholder="短信猴">
            <el-option label="短信猴" value="defaultGroup"></el-option>
          </el-select>

            <el-button color="blue">添加签名</el-button>
          </el-form-item>
          <el-form-item
            label="编辑内容">
            <el-input type="textarea"
                      placeholder="示例：也不知道你爱吃什么，就把一大堆商品都第二件半价了！再送你「4折券」啊，别辜负了我的心意呀 http://t.cn/RCKjuZd "
                      rows="5"
                      v-model="form3.context"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
// import {getUserInfo} from '@/assets/js/auth.js'
export default {
  data () {
    return {
      activeName: 'first',
      form1: {
        telephone: '',
        signature: '短信猴',
        context: ''
      },
      form2: {
        telephone: [],
        signature: '短信猴',
        context: ''
      },
      form3: {
        groups: ['分组1, 分组2'],
        currentGroup: '',
        telephone: [],
        signature: '短信猴',
        context: ''
      },
      contactgroups: [{
        addTs: 1520909351000,
        updateTs: 1529240381000,
        id: 36971,
        userId: 38265,
        groupName: '分组1',
        mobileNum: 2,
        isDefault: 1,
        isDele: 0,
        type: 1
      }, {
        addTs: 1529243516000,
        updateTs: 1529243516000,
        id: 39862,
        userId: 38265,
        groupName: '分组2',
        mobileNum: 0,
        isDefault: 0,
        isDele: 0,
        type: 1
      }]
    }
  },
  mounted () {
    /* const userInfo = JSON.parse(getUserInfo())
    const currentTelephone = userInfo.telephone
    const res = this.$http.post('https://a5110ee0-141f-4b17-9810-1b3d4f0a33be.mock.pstmn.io/getContactGroup', currentTelephone)
    this.results = res */
  },
  methods: {
    addTemplate () {
    },
    async manuFormSubmit () {
      const res = await this.$http.post('https://57c1c3b4-697a-49a8-8e5a-50b666795676.mock.pstmn.io/sendMessage', this.userForm.telephone)
      const data = res.data
      if (data.status === 200) {
        // 给出发送验证码成功的提示
        this.$message({
          type: 'success',
          message: '短信发送成功!'
        })
      }
    },
    async fileFormSubmit () {
      const res = await this.$http.post('https://57c1c3b4-697a-49a8-8e5a-50b666795676.mock.pstmn.io/sendMessage', this.userForm.telephone)
      const data = res.data
      if (data.status === 200) {
        // 给出发送验证码成功的提示
        this.$message({
          type: 'success',
          message: '短信发送成功!'
        })
      }
    }
  }
}
</script>
<style></style>
