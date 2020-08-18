<template>
	<div class="container">
		<div class="box">
			<el-form >
				<!-- 表单 -->
				<el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login_Form" label-width="0">
					<!-- 用户名 -->
					<el-form-item prop="username">
						<el-input v-model="loginForm.username" placeholder="用户名" ></el-input>
					</el-form-item>
					<!-- 密码 -->
					<el-form-item prop="password">
						<el-input v-model="loginForm.password" placeholder="密码" type="password"></el-input>
					</el-form-item>
					<!-- 按钮 -->
					<el-form-item class="login_btn">
						<el-button type="primary" @click="login()">登录</el-button>								
					</el-form-item>									
				</el-form>
			</el-form>
		</div>
	</div>
	
</template>

<script>
	export default{
		data(){
			return{
				//登录表单
				loginForm:{},
				//登录验证
				loginRules:{},				
			}
		},
		methods:{
			async login(){
				const {data:res} = await this.$http.post("/login",this.loginForm)
				if(res.code == 200){
					this.$message.success("登录成功");
					this.$router.push({path:"/home"});
				}else{
					this.$message.error("用户名或密码错误");
				}
			}
		}
	}
</script>

<style lang="less" scoped>	
	.container{
		height: 100%;
		background: yellow;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.box{
		width: 400px;
		height: 300px;
		background: saddlebrown;
		display: flex;
		justify-content: center;
		align-items: center;
		.el-input{
			width: 300px;
		}
		.login_btn{
			display: flex;
			justify-content: center;
		}
	}
</style>
