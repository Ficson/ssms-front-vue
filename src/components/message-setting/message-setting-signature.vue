<template>

  <div>
    <el-tabs v-model="activeName" >
      <!--手动输入标签页-->
      <el-tab-pane label="新增签名" name="first">
        <el-alert
          title="签名2-15字（包括15），建议使用汉字，不能包括网址或者特殊字符"
          type="info"
          show-icon>
        </el-alert>
        <el-form ref="newSignature" v-model="newSignature"
                 label-width="120px"
                 style="margin:20px;width:60%;min-width:600px;">
          <el-form-item label="短信签名">
            <el-input v-model="newSignature" placeholder="签名为您的公司简称，网站名、品牌名" style="width:300px;"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" v-on:click="signatureSubmit">提交审核</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="签名管理">
        <!-- 表格数据-->
        <el-table :data="signatures" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;">
          <el-table-column type="selection" width="55">
          </el-table-column>
          <el-table-column type="index" width="60">
          </el-table-column>
          <el-table-column prop="signatureName" label="签名" width="120" >
          </el-table-column>
          <el-table-column prop="status" label="状态" :formatter="signatureStatus" width="120">
          </el-table-column>
          <el-table-column prop="notPassReason" label="不通过原因" width="300" >
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
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  data () {
    return {
      activeName: 'first',
      newSignature: '',
      listLoading: false,
      signatures: [],
      sels: [], // 列表选中列
      total: 0,
      page: 1
    }
  },
  methods: {
    // 选中
    selsChange: function (sels) {
      this.sels = sels
    },
    // 状态显示转换
    signatureStatus: function (row, column) {
      console.log('row是' + row.content)
      return row.status === 1 ? '审核通过' : row.status === 0 ? '正在审核' : '审核不通过'
    },
    async signatureSubmit () {
      const res = await this.$http.post('https://a5110ee0-141f-4b17-9810-1b3d4f0a33be.mock.pstmn.io/sendMessage', this.newSignature)
      const data = res.data
      if (data.status === 200) {
        // 给出发送验证码成功的提示
        this.$message({
          type: 'success',
          message: '短信发送成功!'
        })
      }
    },
    // 批量删除
    batchRemove: function () {
      this.$confirm('确认删除选中记录吗？', '提示', {
        type: 'warning'
      }).then(() => {
      }).catch(() => {
      })
    },
    handleCurrentChange (val) {
      this.page = val
      this.getTemplates()
    }

  }
}
</script>
<style></style>
