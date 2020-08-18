//导入模拟数据包
import Mock from 'mockjs'


//解析get请求url后面的参数转成JSON
function GetQueryJson (url) {
  let param = {}; // 存储最终JSON结果对象
  url.replace(/([^?&]+)=([^?&]+)/g, function(s, v, k) {
    param[v] = decodeURIComponent(k);//解析字符为中文
    return k + '=' +  v;
  });
  return param;
}
//解析json的数据数组长度(判断url的参数是几个)
function getJsonObjLength(jsonObj) {
        var Length = 0;
    for (var item in jsonObj) {
           Length++;
        }
       return Length;
}


//系统管理
let cfgList = []
for (let i = 1; i < 30; i++) {
	  cfgList.push(Mock.mock({
		'id': i,//编号
		'role':'@cword(4,15)',//角色名
		'roleName':'@cname()',//角色中文名
		'menuId': i,//菜单栏id
		'menu':'@cname()'//菜单栏名称
	  }))
}

//1.根据id获取数据 2.分页表格数据
Mock.mock(/\/system\/cfg/,'get',(params)=>{
	var info = GetQueryJson(params.url)
	var a = getJsonObjLength(info)
	if(a > 1){
		var [pageIndex, pageSize, total] = [info.current, info.size, cfgList.length]
		var len = total / pageSize
		//页码
		var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
		//每页数据
		var newDataList = cfgList.slice((pageIndex-1) * pageSize, pageIndex * pageSize)
		return{
			'code': '200',
			'message': 'success',
			'data': 
			{
			  'current': pageIndex,
			  'size': pageSize,
			  'rows': newDataList,
			  'total': total,
			  'totalPages': totalPages
			}
		}
	}else{
		return{
			'code':'200',
			'message': 'success',
			'data': {
				'rows': cfgList[info.id-1]
			}
		}
	}
})

//添加数据 
Mock.mock(/\/system\/cfg/,'post',(options)=>{
	var info = JSON.parse(options.body)
	var idInfo = cfgList.length+1
	cfgList.push({			
		'id': idInfo,
		'role':info.role,
		'roleName': info.roleName,
		'menuId':info.menuId,
		'menu':info.menu,
	})
	return{
		'code':'200'
	}	
})

//修改数据 
Mock.mock(/\/system\/cfg/,'put',(options)=>{
	var info = JSON.parse(options.body)
	cfgList[info.id-1].role = info.role
	cfgList[info.id-1].roleName = info.roleName
	cfgList[info.id-1].menuId = info.menuId
	cfgList[info.id-1].menu = info.menu
	return{
		'code':'200'
	}	
})
//删除数据
Mock.mock(/\/system\/cfg/,'delete', (configs)=>{
	var info = GetQueryJson(configs.url)
	for (let i = 0; i < cfgList.length;i++){
		if(cfgList[i].id  == info.id){
			cfgList.splice(i,1)
		}
	}
	return{
		'code':'200'
	}	
})
//系统管理end


//操作员管理
let hrList = []
for (let i = 1; i < 30; i++) {
	  hrList.push(Mock.mock({
		'id': i,//hrID
		'name':'@cname()',//姓名
		'phone': /^1(5|3|7|8)[0-9]{9}$/,//电话
		'telephone': /^1(5|3|7|8)[0-9]{9}$/,//住宅电话
		'address':'@city(true)',//联系地址
		'enabled|1':['是','否'],//是否可用
		'username|1':['admin','user01','user02','user03','user04','user05','test01','test02','test03','test04'],//用户名
		'password|1':['123456','admin','123456admin','admin123456','admin@123456'],//密码
		'userface':"@image('100x100','#ff83fa','#fcfcfc','png','people')",//照片
		'remark':'@csentence(10,20)'//备注
	  }))
}

//1.根据id获取数据 2.分页表格数据
Mock.mock(/\/system\/hr/,'get',(params)=>{
	var info = GetQueryJson(params.url)
	var a = getJsonObjLength(info)
	if(a > 1){
		var [pageIndex, pageSize, total] = [info.current, info.size, hrList.length]
		var len = total / pageSize
		//页码
		var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
		//每页数据
		var newDataList = hrList.slice((pageIndex-1) * pageSize, pageIndex * pageSize)
		return{
			'code': '200',
			'message': 'success',
			'data': 
			{
			  'current': pageIndex,
			  'size': pageSize,
			  'rows': newDataList,
			  'total': total,
			  'totalPages': totalPages
			}
		}
	}else{
		return{
			'code':'200',
			'message': 'success',
			'data': {
				'rows': hrList[info.id-1]
			}
		}
	}
})

//添加数据 
Mock.mock(/\/system\/hr/,'post',(options)=>{
	var info = JSON.parse(options.body)
	var idInfo = hrList.length+1
	hrList.push({				
		'id': idInfo,
		'name':info.name,
		'phone': info.phone,
		'telephone':info.telephone,
		'address':info.address,
		'enabled': info.enabled,
		'username':info.username,
		'password':info.password,
		'remark':info.remark,
	})
	return{
		'code':'200'
	}	
})

//修改数据 
Mock.mock(/\/system\/hr/,'put',(options)=>{
	var info = JSON.parse(options.body)
	hrList[info.id-1].name = info.name
	hrList[info.id-1].phone = info.phone
	hrList[info.id-1].telephone = info.telephone
	hrList[info.id-1].address = info.address
	hrList[info.id-1].enabled = info.enabled
	hrList[info.id-1].username = info.username
	hrList[info.id-1].password = info.password
	hrList[info.id-1].remark = info.remark
	return{
		'code':'200'
	}	
})
//删除数据
Mock.mock(/\/system\/hr/,'delete', (configs)=>{
	var info = GetQueryJson(configs.url)
	for (let i = 0; i < hrList.length;i++){
		if(hrList[i].id  == info.id){
			hrList.splice(i,1)
		}
	}
	return{
		'code':'200'
	}	
})
//操作员管理end


//操作日志管理
let oplogList = []
for (let i = 1; i < 30; i++) {
	  oplogList.push(Mock.mock({
		'id': i,//编号
		'addDate':'@date("yyyy-MM-dd")',//添加日期
		'operate':'@csentence(10,20)',//描述
		'hrid':'@increment(1)',//操作员ID
	  }))
}

//1.根据id获取数据 2.分页表格数据
Mock.mock(/\/system\/log/,'get',(params)=>{
	var info = GetQueryJson(params.url)
	var a = getJsonObjLength(info)
	if(a > 1){
		var [pageIndex, pageSize, total] = [info.current, info.size, oplogList.length]
		var len = total / pageSize
		//页码
		var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
		//每页数据
		var newDataList = oplogList.slice((pageIndex-1) * pageSize, pageIndex * pageSize)
		return{
			'code': '200',
			'message': 'success',
			'data': 
			{
			  'current': pageIndex,
			  'size': pageSize,
			  'rows': newDataList,
			  'total': total,
			  'totalPages': totalPages
			}
		}
	}else{
		return{
			'code':'200',
			'message': 'success',
			'data': {
				'rows': oplogList[info.id-1]
			}
		}
	}
})

//添加数据 
Mock.mock(/\/system\/log/,'post',(options)=>{
	var info = JSON.parse(options.body)
	var idInfo = oplogList.length+1
	oplogList.push({		
		'id': idInfo,
		'addDate':info.addDate,
		'operate': info.operate,
		'hrid':info.hrid,
	})
	return{
		'code':'200'
	}	
})

//修改数据 
Mock.mock(/\/system\/log/,'put',(options)=>{
	var info = JSON.parse(options.body)
	oplogList[info.id-1].addDate = info.addDate
	oplogList[info.id-1].operate = info.operate
	return{
		'code':'200'
	}	
})
//删除数据
Mock.mock(/\/system\/log/,'delete', (configs)=>{
	var info = GetQueryJson(configs.url)
	for (let i = 0; i < oplogList.length;i++){
		if(oplogList[i].id  == info.id){
			oplogList.splice(i,1)
		}
	}
	return{
		'code':'200'
	}	
})
//操作日志管理end


//基础信息设置
let basicList = []
for (let i = 1; i < 30; i++) {
	  basicList.push(Mock.mock({
		'id': i,//员工编号
		'name':'@cname()',//员工姓名
		'depart|1':['股东会','董事会','总办','财务部','财务部','市场部','技术部','运维部'],//部门
		'job|1':['教授','副教授','助教','讲师','初级工程师','高级工程师'],//职称
		'poistion|1':['技术总监','运营总监','研发工程师','运维工程师','Java研发经理'],//职位
		'permission|1':['1','2','3','4','5'],//权限组
		'rule':'@csentence(10,20)'//奖惩规则
	  }))
}

//1.根据id获取数据 2.分页表格数据
Mock.mock(/\/system\/basic/,'get',(params)=>{
	var info = GetQueryJson(params.url)
	var a = getJsonObjLength(info)
	if(a > 1){
		var [pageIndex, pageSize, total] = [info.current, info.size, basicList.length]
		var len = total / pageSize
		//页码
		var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
		//每页数据
		var newDataList = basicList.slice((pageIndex-1) * pageSize, pageIndex * pageSize)
		return{
			'code': '200',
			'message': 'success',
			'data': 
			{
			  'current': pageIndex,
			  'size': pageSize,
			  'rows': newDataList,
			  'total': total,
			  'totalPages': totalPages
			}
		}
	}else{
		return{
			'code':'200',
			'message': 'success',
			'data': {
				'rows': basicList[info.id-1]
			}
		}
	}
})

//添加数据 
Mock.mock(/\/system\/basic/,'post',(options)=>{
	var info = JSON.parse(options.body)
	var idInfo = basicList.length+1
	basicList.push({			
		'id': idInfo,
		'name':info.name,
		'depart': info.depart,
		'job':info.job,
		'poistion':info.poistion,
		'permission': info.permission,
		'rule':info.rule,
	})
	return{
		'code':'200'
	}	
})

//修改数据 
Mock.mock(/\/system\/basic/,'put',(options)=>{
	var info = JSON.parse(options.body)
	basicList[info.id-1].name = info.name
	basicList[info.id-1].depart = info.depart
	basicList[info.id-1].job = info.job
	basicList[info.id-1].poistion = info.poistion
	basicList[info.id-1].permission = info.permission
	basicList[info.id-1].rule = info.rule
	return{
		'code':'200'
	}	
})
//删除数据
Mock.mock(/\/system\/basic/,'delete', (configs)=>{
	var info = GetQueryJson(configs.url)
	for (let i = 0; i < basicList.length;i++){
		if(basicList[i].id  == info.id){
			basicList.splice(i,1)
		}
	}
	return{
		'code':'200'
	}	
})
//基础信息设置end