<template>
  <div>
    <div>
      <el-input
          style="width: 300px"
          size="small"
          class="addJlInput"
          placeholder="请添加职称等级..."
          suffix-icon="el-icon-plus"
          v-model="jl.name">
      </el-input>
      <el-select v-model="jl.titleLevel" placeholder="请选择" size="small" style="margin-left: 10px">
        <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-plus" size="small" style="margin-left: 10px" @click="handAdd">添加
      </el-button>
      <el-button type="danger" size="small" style="margin-left: 10px" :disabled="this.multipleSelection.length==0"
                 @click="deleteMany">批量删除</el-button>
    </div>
    <div>
      <el-table
          @selection-change="handleSelectionChange"
          :data="tableData"
          border
          stripe
          style="width: 100%;margin-top: 10px">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="id"
            label="编号"
            width="100">
        </el-table-column>
        <el-table-column
            prop="name"
            label="职称名称"
            width="180">
        </el-table-column>
        <el-table-column
            prop="titleLevel"
            label="等级" width="100px">
        </el-table-column>
        <el-table-column
            prop="enable"
            label="是否启用" width="100px">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.enable">已启用</el-tag>
            <el-tag type="danger" v-else>未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="updateBy"
            label="修改人" width="100px">
        </el-table-column>
        <el-table-column
            prop="updateTime"
            label="修改时间">
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="创建时间">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
                size="mini"
                @click="showEditView(scope.$index, scope.row)">编辑
            </el-button>
            <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
        title="编辑职位"
        :visible.sync="dialogVisible"
        width="30%">
      <span>
        <el-tag style="width: 80px">职称名称</el-tag>
        <el-input v-model="updateJl.name" size="small" class="jlInput"></el-input>
        <el-tag style="width: 80px;margin-right: 10px">职称级别</el-tag>
        <el-select v-model="updateJl.titleLevel" placeholder="请选择" size="small" style="margin-top: 10px">
        <el-option
            v-for="item in options"
            :key="item"
            :label="item"
            :value="item">
        </el-option>
      </el-select>
      <el-switch
          style="display: block;margin-top: 10px"
          v-model="updateJl.enable"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-text="启用"
          inactive-text="禁用">
      </el-switch>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleEdit" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {deleteRequest} from "../../../utils/api";

export default {
  name: "JobLevelMana",
  mounted() {
    this.initData();
  },
  data() {
    return {
      multipleSelection:[],
      options: ['高级', '副高级', '中级', '初级', '员级'],
      value: '',
      jl: {
        name: '',
        titleLevel: '',
      },
      updateJl:{
        name: '',
        titleLevel: '',
        enable: ''
      },
      tableData: [],
      dialogVisible: false
    }
  },
  methods: {
    deleteMany(){
      this.$confirm('此操作将删除'+this.multipleSelection.length+'条职称', '是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = '';
        this.multipleSelection.forEach(item => {
          ids += item.id+',';
        })
        ids = ids.substring(0,ids.length-1);
        this.deleteRequest("/jobLevels/"+ids).then(resp => {
          if (resp) {
            this.initData();
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    initData() {
      this.getRequest("/jobLevels/getJobLevelList").then(resp => {
        this.tableData = resp.data;
      })
    },
    handleEdit() {
      this.postRequest('/jobLevels/put', this.updateJl).then(resp => {
        if (resp) {
          this.dialogVisible = false;
          this.initData();
        }
      })
    },
    showEditView(index, row) {
      this.dialogVisible = true;
      Object.assign(this.updateJl, row);//防止未提交列表进了修改
      this.updateJl.createTime = '';
      this.updateJl.updateTime = '';
    },
    handleDelete(index, row) {
      this.$confirm('此操作将删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/jobLevels/" + row.id).then(resp => {
          if (resp) {
            this.initData();
          }
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      })
    },
    handAdd() {
      if (this.jl.name && this.jl.titleLevel) {
        this.postRequest("/jobLevels/addJobLevel", this.jl).then(resp => {
          this.initData();
        })
      } else {
        this.$message.error("职位名称,等级不能为空！")
      }
    }
  }
}
</script>

<style scoped>

.jlInput {
  width: 300px;
  margin-left: 10px;
}

</style>