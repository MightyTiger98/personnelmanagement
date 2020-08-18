<template>
	<div class="home_container">		
		<el-container>
		  <el-header style='background: #00FF00;'>Header</el-header>
		  <el-container>
		    <el-aside width="200px" style='background: #F0C78A'>
				<template v-for="(item, index) in menuList">
					<el-menu router  @select="handleselect">
						<!-- 仅一级导航 -->
						<el-menu-item :index="item.url" v-if="item.List && !item.List.length>0" :key="item.id">
							<i :class="item.iconCls"></i>
							<span slot="title">{{item.name}}</span>
						</el-menu-item>
						<!-- 二级导航 -->
						<el-submenu :index="item.id+''" :key="item.id" v-else>
							<template slot="title">
								<i :class="item.iconCls"></i>
								<span>{{item.name}}</span>
							</template>
							<el-menu-item :index="it.url" v-for="it in item.List" :key="it.id">
								<template slot="title">
									<i :class="it.iconCls"></i>
									<span>{{it.name}}</span>
								</template>
							</el-menu-item>
						</el-submenu>
					</el-menu>
				</template>
			</el-aside>
		    <el-main style='background: #3A8EE6'>
				<router-view v-if="isShow"></router-view>
			</el-main>
		  </el-container>
		</el-container>
	</div>
	
	
</template>

<script>
	export default{
		provide(){
			return{
				reload:this.reload
			}
		},
		data(){
			return{
				menuList:[{	}],
				isShow:true
			}
		},	
		created(){
			//查询menueList
			this.getMenuList();
		},
		methods:{
			async getMenuList(){
				const {data:res} = await this.$http.get("/menuList")
				console.log(res)
				this.menuList = res.data
			},
			//页面刷新
			reload(){
				this.isShow=false
				this.$nextTick(function(){
					this.isShow = true
				})
			},
			handleselect(){
				this.reload()  // 点击侧边栏重新载入页面
			}
		},
		
	}
</script>

<style lang="less" scoped>
.home_container	{
	height: 100%;
}
.el-container{
	height: 100%;
}
.el-aside {
	height:100%;
	.el-menu{
		border: none;
	}
}
</style>
