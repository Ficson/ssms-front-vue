<template>
  <div>
    <el-tabs v-model="activeName" >
      <!--手动输入标签页-->
      <el-tab-pane label="添加模板" name="first">
        <el-alert
          title="仅用于添加一些固定发送内容的模板，审核通过的模板在发送短信页面可直接使用，不再进行审核。需要发送营销短信请前往 发送短信 页面"
          type="warning"
          show-icon>
        </el-alert>
        <el-form ref="templateForm" v-model="templateForm"
                 label-width="120px"
                 style="margin:20px;width:60%;min-width:600px;">
          <el-form-item
            label="设置签名">
            <el-select v-model="templateForm.signature" placeholder="请选择">
              <el-option label="短信猴" value="messageMonkey"></el-option>
              <el-option label="短信狗" value="messageDog"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="短信内容">
            <el-input type="textarea"
                      placeholder="示例：尊敬的{变量1}您好，618年中大促：本店全场满{变量2}元立减{变量3}，上不封顶，热销品限量秒杀19.9元起，http://t.cn/RCKjuZd"
                      rows="5"
                      v-model="templateForm.context"></el-input>
          </el-form-item>
          <el-form-item>
          <el-checkbox v-model="templateForm.remind">审核结果短信提醒</el-checkbox>
          <el-input
            v-if="templateForm.remind"
            v-model="templateForm.remind_telephone"
            placeholder="17875511784"
            style="width:60%;">
          </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="addTemplate">提交审核</el-button>
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
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters">
            <el-form-item label="关键字">
              <el-input v-model="filters.keyword" ></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="filters.scope" placeholder="全部">
                <el-option label="全部" value="all" selected></el-option>
                <el-option label="待审核" value="toCheck"></el-option>
                <el-option label="已审核" value="checked"></el-option>
                <el-option label="审核不通过" value="rejected"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" v-on:click="getTemplates">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>

        <!-- 表格数据-->
        <el-table :data="templatesFilter" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="index" width="60">
          </el-table-column>
          <el-table-column prop="id" label="模板ID" width="120" >
          </el-table-column>
          <el-table-column prop="updateTime" label="提交时间" width="120">
          </el-table-column>
          <el-table-column prop="content" label="模板内容" width="300" >
          </el-table-column>
          <el-table-column prop="status" label="审核状态" :formatter="formatStatus" width="120" >
          </el-table-column>
          <el-table-column label="操作" width="150">
            <template slot-scope="scope">
              <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button  size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--工具条-->
        <el-col :span="24" class="toolbar">
          <el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
          <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
          </el-pagination>
        </el-col>

        <!--编辑界面-->
        <el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
          <el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
            <el-form-item label="模板id" prop="content">
              <el-input v-model="editForm.id" auto-complete="off" disabled="disabled"></el-input>
            </el-form-item>
            <el-form-item label="模板内容" prop="content">
              <el-input v-model="editForm.content" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click.native="editFormVisible = false">取消</el-button>
            <el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
          </div>
        </el-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'first',

      // 添加模板表单
      templateForm: {
        signature: '',
        context: '',
        remind: true,
        remind_telephone: ''
      },
      filters: {
        keyword: '',
        scope: ''
      },
      total: 0,
      page: 1,
      listLoading: false, // 是否渲染加载动画
      sels: [], // 列表选中列
      ScopeSelect: 'all', // 筛选模板信息
      // ----------编辑相关的数据------------
      editFormVisible: false, // 编辑界面是否显示
      editLoading: false,
      editFormRules: {
        content: [
          { required: true, message: '请输入模板', trigger: 'blur' }
        ]
      },
      // 编辑界面数据
      editForm: {
        id: '',
        content: ''
      },
      // -----------增加相关的数据--------
      addFormVisible: false, // 新增界面是否显示
      addLoading: false,
      addFormRules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ]
      },
      // 模拟的模板数据
      templates: [
        {
          id: 14131,
          user_id: 3434,
          type: 1,
          content: '我就是模板1啊',
          audit_status: 1,
          status: 1,
          verified_msg: '无',
          verified_ts: '',
          createTime: '2018-7-18',
          updateTime: '2018-7-18'
        },
        {
          id: 35345,
          user_id: 322434,
          type: 1,
          content: '我是模板2啊',
          audit_status: 1,
          status: 1,
          verified_msg: '无',
          verified_ts: '',
          createTime: '2018-7-18',
          updateTime: '2018-7-18'
        },
        {
          id: 35345,
          user_id: 322434,
          type: 1,
          content: '我是模板3啊',
          audit_status: 1,
          status: 0,
          verified_msg: '无',
          verified_ts: '',
          createTime: '2018-7-18',
          updateTime: '2018-7-18'
        },
        {
          id: 35345,
          user_id: 322434,
          type: 1,
          content: '我是模板4啊',
          audit_status: 1,
          status: -1,
          verified_msg: '无',
          verified_ts: '',
          createTime: '2018-7-18',
          updateTime: '2018-7-18'
        }
      ]
    }
  },
  methods: {
    // 状态显示转换
    formatStatus: function (row, column) {
      console.log('row是' + row.content)
      return row.status === 1 ? '审核通过' : row.status === 0 ? '正在审核' : '审核不通过'
    },
    handleCurrentChange (val) {
      this.page = val
      this.getTemplates()
    },
    async addTemplate () {
      const res = await this.$http.post('https://57c1c3b4-697a-49a8-8e5a-50b666795676.mock.pstmn.io/sendMessage', this.templateForm)
      const data = res.data
      if (data.status === 200) {
        // 给出发送验证码成功的提示
        this.$message({
          type: 'success',
          message: '模板提交成功，等待审核!'
        })
      }
    },
    selsChange: function (sels) {
      this.sels = sels
    },
    getTemplates () {
    },
    handleEdit: function (index, row) {
      this.editFormVisible = true
      this.editForm = Object.assign({}, row)
    },
    handleDel: function (index, row) {
    },
    batchRemove: function () {
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
      }).catch(() => {
      })
    }
  },
  mounted () {
    this.getTemplates()
  },
  computed: {
    /* templatesFilter: function () {
       switch (this.filters.scope) {
        case 'toCheck':
          return this.templates.filter(item => item.status === 1)
          break
        case 'checked':
          return this.templates.filter(item => item.status === 1)
          break
        case 'rejected':
          return this.templates.filter(item => item.status === -1)
          break
        default:
          return this.templates
          break
      }
    } */
  }
}
</script>
<style scoped></style>
