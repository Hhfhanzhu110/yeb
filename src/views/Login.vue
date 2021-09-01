<template>
  <div>
    <el-form ref="loginForm" :model="loginForm" :rules="rules" class="loginContainer"
             v-loading="loading"
             element-loading-text="正在登录..."
             element-loading-spinner="el-icon-loading"
             element-loading-background="rgba(0, 0, 0, 0.8)">
      <h3 class="login-title">系统登录</h3>
      <el-form-item prop="username">
        <el-input type="text" auto-complete="false" placeholder="请输入账号" v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" auto-complete="false" placeholder="请输入密码" v-model="loginForm.password"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="text" auto-complete="false" placeholder="点击图片更换验证码" v-model="loginForm.code"
                  style="width: 180px;margin-right: 5px"></el-input>
        <img :src="captchaUrl" @click="updateCaptcha"/>
      </el-form-item>
      <el-checkbox v-model="checked" class="loginRemember">记住我</el-checkbox>
      <el-form-item class="login-btn">
        <el-button type="primary" @click="submitLogin">登录</el-button>
        <el-button type="primary" @click="registerUser">注册</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Login',
  mounted() {
    window.sessionStorage.clear();
  },
  data() {
    return {
      captchaUrl: '/captcha?time='+new Date(),
      loginForm: {
        username: 'admin',
        password: '123456',
        code: ''
      },
      checked:true,
      loading:false,
      rules:{
        username:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ]
      }
    }
  },
  methods:{
    registerUser(){
      this.$router.replace("/registerUser");
    },
    submitLogin(formName){
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          this.postRequest("/login",this.loginForm).then(resp=>{
            this.loading = false;
            if (resp){
              const token = resp.data.token;
              const sysUser = resp.data.sysUser;
              window.sessionStorage.setItem("token",token);
              window.sessionStorage.setItem("sysUser",sysUser);
              let path = this.$route.query.redirect;
              this.$router.replace((path == undefined)?'/home':path);
            }
          })
        } else {
          this.$message({
            showClose: true,
            message: '请填写用户名和密码、验证码',
            type: 'warning'
          });
          return false;
        }
      });
    },
    updateCaptcha(){
      this.captchaUrl = '/captcha?time='+new Date()
    }
  }
}
</script>

<style>
.loginContainer {
  width: 350px;
  margin: 120px auto;
  border: 1px solid #DCDFE6;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 30px #DCDFE6;
}

.login-title {
  text-align: center;
}

.login-btn {
  text-align: center;
}

.loginRemember {
  text-align: left;
  margin: 0 0 15px 0;
}
</style>