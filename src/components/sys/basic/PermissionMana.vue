<template>
  <div>
    <div>
      <el-input placeholder="请输入角色" v-model="role.name" size="small">
        <template slot="prepend">role_</template>
      </el-input>
    </div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "PermissionMana",
  data(){
    return{
      role:{
        name:'',
        nameZh:'',
      }
    }
  }
}
</script>

<style scoped>

</style>