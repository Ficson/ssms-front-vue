<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <!--手动输入标签页-->
      <el-tab-pane label="添加模板" name="first">
        <el-alert
          title="仅用于添加一些固定发送内容的模板，审核通过的模板在发送短信页面可直接使用，不再进行审核。需要发送营销短信请前往 发送短信 页面"
          type="warning"
          show-icon>
        </el-alert>
        <el-form ref="form1" v-model="form1"
                 label-width="120px"
                 @submit.prevent="onSubmit1"
                 style="margin:20px;width:60%;min-width:600px;">
          <el-form-item
            label="设置签名">
            <el-select v-model="form1.signature" placeholder="请选择">
              <el-option label="短信猴" value="messageMonkey"></el-option>
              <el-option label="短信狗" value="messageDog"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="短信内容">
            <el-input type="textarea"
                      placeholder="示例：尊敬的{变量1}您好，618年中大促：本店全场满{变量2}元立减{变量3}，上不封顶，热销品限量秒杀19.9元起，http://t.cn/RCKjuZd"
                      rows="5"
                      v-model="form1.context"></el-input>
          </el-form-item>
          <el-form-item>
          <el-checkbox v-model="form1.remind">审核结果短信提醒</el-checkbox>
          <el-input
            v-if="form1.remind"
            v-model="form1.remind_telephone"
            placeholder="110"
            style="width:60%;">
          </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">提交审核</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <!--模板列表标签页-->
      <el-tab-pane label="模板列表" name="second">
        <el-alert
          title="9:00~21:00期间，审核会在5~10分钟内完成。如果您对审核状态存在疑义，请于右侧客服QQ交谈。"
          type="info"
          show-icon>
        </el-alert>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'first',
      form1: {
        signature: '',
        context: '',
        remind: true,
        remind_telephone: ''

      },
      form2: {}
    }
  },
  methods: {
    handleClick (tab, event) {
      console.log(tab, event)
    }
  }
}
</script>
<style></style>
