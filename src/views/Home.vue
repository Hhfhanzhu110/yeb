<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <div class="title">
          云E办
        </div>
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link">
            {{user.username}}<i><img :src="user.avatar"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="userInfo">个人中心</el-dropdown-item>
            <el-dropdown-item command="setting">设置</el-dropdown-item>
            <el-dropdown-item command="logout">注销登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu router unique-opened>
            <el-submenu :index="index+''" v-for="(item,index) in routes"
                        :key="index"
                        v-if="!item.hidden">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.name }}</span>
              </template>
              <el-menu-item :index="children.path" v-for="(children,i) in item.children">{{ children.name }}
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path!='/home'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="homeWelcome" v-if="this.$router.currentRoute.path =='/home'">欢迎来到云E办</div>
          <router-view class="homeRouteView" />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: "Home",
  data() {
    return {
      user: JSON.parse(window.sessionStorage.getItem("sysUser")),
    }
  },
  computed: {
    routes() {//计算属性
      return this.$store.state.routes;
    }
  },
  methods: {
    handleCommand(command) {
      if (command == 'logout'){
        this.$confirm('此操作将注销登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.postRequest("/logout");
          window.sessionStorage.clear();
          this.$router.replace('/');
          this.$store.commit("initRoutes",[]);//清空vuex
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消操作'
          });
        });
      } else {
        this.$message('click on item ' + command);
      }
    }
  }
}
</script>

<style scoped>
.homeHeader {
  background: #409eef;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-sizing: border-box;
}

.title {
  font-size: 30px;
  font-family: 华文楷体;
  color: navajowhite;
}

.el-dropdown-link img{
  width: 48px;
  height: 48px;
  border-radius: 24px;
  margin-left: 10px;;
}

.homeWelcome{
  text-align: center;
  font-size: 30px;
  font-family: 华文行楷;
  color: #409eef;
  padding-top: 50px;
}

.homeRouteView{
  margin-top: 10px;
}
</style>