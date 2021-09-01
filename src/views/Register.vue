<template>
  <div>
    <el-form ref="form" :model="form" class="registerContainer">
      <el-form-item>
        <el-input v-model="form.username" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.name" placeholder="姓名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="form.deptId" placeholder="请选择部门">
          <el-option
              v-for="item in departs"
              :key="item.deptId"
              :label="item.deptName"
              :value="item.deptId"
          ></el-option>
        </el-select>

      </el-form-item>
      <el-form-item style="text-align: center">
        <el-button type="primary" @click="onSubmit">注册</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: "Register",
  mounted() {
    this.getRequest('/departs').then(resp => {
      if (resp) {
        resp.forEach(item=>{
          this.departs.push(item);
        })
      }
    })
  },
  methods: {
    cancel(){
      this.$router.replace("/")
    },
    onSubmit() {
      this.postRequest("/user/register",this.form).then(resp=>{
        if (resp){
          this.$router.replace('/');
        }
      }).catch(()=>{
        this.$message({
          type: 'info',
          message: '已取消操作'
        });
      })

    },
  },
  data() {
    return {
      departs: [],
      form: {
        name: '',
        region: '',
        password: '',
        deptId: '',
      },
      deptName:''
    }
  }
}
</script>

<style scoped>
.registerContainer {
  width: 50%;
  margin: 120px auto;
  border: 1px solid #DCDFE6;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 30px #DCDFE6;
}

</style>