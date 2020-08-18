import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import Depart from '../views/Depart.vue'
import Test from '../views/Test.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

  const routes = [
	{
		path:"/login",
		component:Login,
	},
	{
	 path:"/home",
	 component:Home,
	 children:[
		{
			path:"/department/manageDep",
			component:Depart,
		},
		{
			path:"/test",
			component:Test,
		}
	 ]
	},
	{
	path:"/test",
	component:Test
	},
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

export default router
