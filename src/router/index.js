import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from "../views/Register";

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/loginPage'
  },
  {
    path: '/loginPage',
    name: 'Login',
    component: Login,
    hidden: true
  },
  {
    path: '/registerUser',
    name: 'Register',
    component: Register,
    hidden: true
  }
]

const router = new VueRouter({
  routes
})
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
