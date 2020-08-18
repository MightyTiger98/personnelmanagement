<template>
	<div>
		<el-button @click="addDialogVisible=true ">添加</el-button>
		<el-table :data="tableData" border  height="425">
			<!-- 表头，未修改绑定的 参数 -->
			<el-table-column type="selection" width="55" align="center"></el-table-column>
			<el-table-column fixed prop="id" label="部门编号" width="100" align="center"></el-table-column>
			<el-table-column prop="name" label="部门名称" width="120" align="center"></el-table-column>
			<el-table-column prop="telephone" label="电话" width="160" align="center"></el-table-column>
			<el-table-column prop="createDate" label="成立日期" width="250" align="center"></el-table-column>
			<el-table-column prop="description" label="描述" width="160" align="center"></el-table-column>
			<!-- <el-table-column prop="description" label="描述" width="160" align="center">
				<template slot-scope="scope">            
					<img :src="scope.row.description"  min-width="70" height="70" />
				 </template>   
			</el-table-column> -->
			<el-table-column  label="操作" width="180">
				<template slot-scope="scope">
					<el-tooltip class="item" effect="dark" content="查看" placement="top">
						<el-button type="primary" icon="el-icon-edit" size="mini"
						@click="showCheck(scope.row.id)"></el-button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="编辑" placement="top">
						<el-button type="warning" icon="el-icon-edit" size="mini"
						@click="showEdit(scope.row.id)"></el-button>
					</el-tooltip>
					<el-tooltip class="item" effect="dark" content="删除" placement="top">
						<el-button type="danger" icon="el-icon-delete" size="mini"
						@click="showRemove(scope.row.id)"></el-button>
					</el-tooltip>					
				</template>
			</el-table-column>
		</el-table>
		<!-- 分页 -->
		<div class="box_bottom">
			<el-pagination @size-change="handleSizeChange" 
			@current-change="handleCurrentChange" :current-page="page.current"
			 :page-sizes="[3, 5, 7, 10]" :page-size="page.size" 
			 layout="total, sizes, prev, pager, next, jumper" :total="total">
			</el-pagination>
		</div>
		
		<!-- 弹出框 添加数据表单 -->		
		<el-dialog title="提示" :visible.sync="addDialogVisible"  width="40%" >
			<el-form :model="addForm" ref="addRef" label-width="70px"  >
				<el-form-item label="部门名称" prop="name">
					<el-input v-model="addForm.name" ></el-input>
				</el-form-item>
				<el-form-item label="部门电话" prop="telephone">
					<el-input v-model="addForm.telephone" ></el-input>
				</el-form-item>
				<el-form-item label="创建日期" prop="createDate">
					<el-input v-model="addForm.createDate" ></el-input>
				</el-form-item>
				<el-form-item label="部门描述" prop="description">
					<el-input v-model="addForm.description" ></el-input>
				</el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="addDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="add">确 定</el-button>
		  </span>
		</el-dialog>
		
		<!-- 弹出框 修改数据表单 -->
		<el-dialog title="提示" :visible.sync="editDialogVisible"  width="40%" >
			<el-form :model="editForm" ref="editRef" label-width="70px"  >
				<el-form-item label="部门名称" prop="name">
					<el-input v-model="editForm.name" ></el-input>
				</el-form-item>
				<el-form-item label="部门电话" prop="telephone">
					<el-input v-model="editForm.telephone" ></el-input>
				</el-form-item>
				<el-form-item label="创建日期" prop="createDate">
					<el-input v-model="editForm.createDate" ></el-input>
				</el-form-item>
				<el-form-item label="部门描述" prop="description">
					<el-input v-model="editForm.description" ></el-input>
				</el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="editDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="edit">确 定</el-button>
		  </span>
		</el-dialog>
		
		<!-- 弹出框 查看数据表单 -->
		<el-dialog title="提示" :visible.sync="checkDialogVisible"  width="40%" >
			<el-form :model="checkForm" ref="checkRef" label-width="70px"  >
				<el-form-item label="字符串" prop="string">
					<el-input v-model="checkForm.string" ></el-input>
				</el-form-item>
			</el-form>
		  <span slot="footer" class="dialog-footer">
		    <el-button @click="checkDialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="checkDialogVisible = true">确 定</el-button>
		  </span>
		</el-dialog>
	</div>
</template>

<script>
export default{
	data(){
		return{
			tableData:[],
			page:{
				current: 1,				
				size: 5,
			},
			//数据总数
			total:0,
			//添加弹出框
			addDialogVisible:false,
			//添加数据表单
			addForm:{},
			//添加数据ref
			addFormRef:[],
			
			//修改弹出框
			editDialogVisible:false,
			//修改数据表单
			editForm:{},
			//修改数据ref
			editFormRef:[],
			
			//修改弹出框
			checkDialogVisible:false,
			//修改数据表单
			checkForm:{},
			//修改数据ref
			checkFormRef:[],
		}
	},
	created() {
		this.getTableList()
	},
	methods:{
		//获取分页数据
		async getTableList() {	
			 // const {data:res} = await this.$http.get('http://localhost:8080/test',{params:this.page})
			 const {data:res} = await this.$http.get('/department/manageDep',{params:this.page})
			 //将data数据赋值表格数组
			 this.tableData = res.data.rows
			 this.total = res.data.total
			 // console.log(res)	
		},
		//分页
		//监听页码值改变的事件
		handleSizeChange(newSize) {
			this.page.size = newSize
			this.getTableList()
		},
		// //监听页码值改变的事件
		handleCurrentChange(newPage) {
			this.page.current = newPage
			this.getTableList()
		},
		
		//添加数据
		async add(){
			const {data:res} = await this.$http.post('/department/manageDep', this.addForm);
			if(res.code == 200){				
				this.addDialogVisible = false
				this.$message.success("添加成功");
			}else{				
				this.$message.error("添加失败");
			}
		},
		
		//修改数据前获取之前的数据信息
		async showEdit(id){
			this.editDialogVisible = true
			const {data:res} = await this.$http.get('/department/manageDep?id='+id);
			this.editForm = res.data.rows
		},
		//修改数据
		async edit(){
			const {data:res} = await this.$http.put('/department/manageDep', this.editForm);
			if(res.code == 200){				
				this.editDialogVisible = false
				this.$message.success("修改成功");
			}else{				
				this.$message.error("修改失败");
			}
		},
		//删除数据
		async showRemove(id){
			const confirmResult = await this.$confirm('此操作将删除id为'+id+'的题目, 是否继续?', '提示',
			{confirmButtonText: '删除',cancelButtonText: '取消',type: 'warning'},
			).catch(err => err)			
			//点击取消 返回cancle字符串 console.log(confirmResult)
			if(confirmResult !== 'confirm'){
				return this.$message.info('取消删除')
			}else{
				const {data:res} = await this.$http.delete('/department/manageDep?id='+id);				
				return this.$message.success('删除成功')
				
			}
		},
		//查看高级数据
		async showCheck(id){
			this.checkDialogVisible = true
			const {data:res} = await this.$http.get('/department/senior?id='+id);	
			this.checkForm = res.data.rows
			console.log(id)
		}
		
	}
	
}
</script>

<style>
</style>
