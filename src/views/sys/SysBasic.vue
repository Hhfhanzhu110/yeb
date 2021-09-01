<template>
  <div>
    <el-tabs v-model="activeName" type="card">
      <el-tab-pane label="部门管理" name="DepMana"><dep-mana></dep-mana></el-tab-pane>
    <el-tab-pane label="职位管理" name="PosMana"><pos-mana></pos-mana></el-tab-pane>
      <el-tab-pane label="职称管理" name="JobLevelMana"><job-level-mana></job-level-mana></el-tab-pane>
      <el-tab-pane label="奖惩规则" name="EcMana"><ec-mana></ec-mana></el-tab-pane>
    <el-tab-pane label="权限组" name="PermissionMana"><permission-mana></permission-mana></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import DepMana from "../../components/sys/basic/DepMana";
import EcMana from "../../components/sys/basic/EcMana";
import JobLevelMana from "../../components/sys/basic/JobLevelMana";
import PosMana from "../../components/sys/basic/PosMana";
import PermissionMana from "../../components/sys/basic/PermissionMana";

export default {
  name: "SysBasic",
  data(){
    return{
      activeName:'PermissionMana',
    }
  },
  components:{
    PermissionMana,
    DepMana,
    EcMana,
    JobLevelMana,
    PosMana
  }
}
</script>

<style scoped>

</style>