<template>
  <div>
    <div>
      <el-input
          size="small"
          class="addPostInput"
          placeholder="请添加职位..."
          suffix-icon="el-icon-plus"
          v-model="pos.name">
      </el-input>
      <el-button type="primary" icon="el-icon-plus" size="small" style="margin-left: 10px" @click="handAdd">添加
      </el-button>
      <el-button type="danger" size="small" style="margin-left: 10px" :disabled="this.multipleSelection.length==0"
      @click="deleteMany">批量删除</el-button>
    </div>
    <div class="posTable">
      <el-table
          border
          size="small"
          stripe
          :data="tableData"
          @selection-change="handleSelectionChange"
          style="width: 100%">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column
            prop="id"
            label="编号"
            width="180">
        </el-table-column>
        <el-table-column
            prop="name"
            label="职位"
            width="300">
        </el-table-column>
        <!--        <el-table-column
            prop="enabled"
            label="是否启用"
        width="180">-->
        <el-table-column
            prop="createTime"
            label="创建时间" width="180">
        </el-table-column>
        <el-table-column
            prop="updateTime"

            label="修改时间" width="180">
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
        <el-tag style="width: 80px">职位名称</el-tag>
        <el-input v-model="updatePos.name" size="small" class="posInput"></el-input>
      </span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleEdit" size="small">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "PosMana",
  data() {
    return {
      pos: {
        name: ''
      },
      tableData: [],
      dialogVisible: false,
      updatePos: {
        name: ''
      },
      multipleSelection: []
    }
  },
  methods: {
    deleteMany(){
      this.$confirm('此操作将删除'+this.multipleSelection.length+'条职位', '是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let ids = '';
        this.multipleSelection.forEach(item => {
          ids += item.id+',';
        })
        ids = ids.substring(0,ids.length-1);
        this.deleteRequest("/position/delete/"+ids).then(resp => {
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
    initData() {
      this.getRequest("/position/getPositionList").then(resp => {
        this.tableData = resp.data;
      })
    },
    handleEdit() {
      this.postRequest('/position/put', this.updatePos).then(resp => {
        if (resp) {
          this.dialogVisible = false;
          this.initData();
        }
      })
    },
    showEditView(index, row) {
      this.dialogVisible = true;
      Object.assign(this.updatePos, row);//防止未提交列表进了修改
      this.updatePos.createTime = '';
      this.updatePos.updateTime = '';
    },
    handleDelete(index, row) {
      this.$confirm('此操作将删除记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteRequest("/position/delete/" + row.id).then(resp => {
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
      if (this.pos.name) {
        this.postRequest("/position/addPosition", this.pos).then(resp => {
          this.initData();
        })
      } else {
        this.$message.error("职位名称不能为空！")
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  },
  mounted() {
    this.initData();
  }
}
</script>

<style scoped>
.addPostInput {
  width: 300px;
}

.posTable {
  margin-top: 10px;
}

.posInput {
  width: 300px;
  margin-left: 10px;
}
</style>