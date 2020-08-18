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

//部门管理

//部门信息
let departList = []

for (let i = 1; i < 30; i++) {
	  departList.push(Mock.mock({
		'id': i,//部门编号
		'name':'@cname()',//部门名称
		'telephone': /^1(5|3|7|8)[0-9]{9}$/,//电话
		'createDate':'@date("yyyy-MM-dd")',//创立时间
		'description':'@csentence(10,20)',//描述
		
	  }))
}

//1.根据id获取数据 2.分页表格数据
Mock.mock(/\/department\/manageDep/,'get',(params)=>{
	var info = GetQueryJson(params.url)
	var a = getJsonObjLength(info)
	if(a > 1){
		var [pageIndex, pageSize, total] = [info.current, info.size, departList.length]
		var len = total / pageSize
		//页码
		var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
		//每页数据
		var newDataList = departList.slice((pageIndex-1) * pageSize, pageIndex * pageSize)
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
				'rows': departList[info.id-1]
			}
		}
	}
})

//添加数据 
Mock.mock(/\/department\/manageDep/,'post',(options)=>{
	var info = JSON.parse(options.body)
	var idInfo = departList.length+1
	departList.push({
		'id': idInfo,
		'name':info.name,
		'telephone': info.telephone,
		'createDate':info.createDate,
		'description':info.description
	})
	return{
		'code':'200'
	}	
})

//修改数据 
Mock.mock(/\/department\/manageDep/,'put',(options)=>{
	var info = JSON.parse(options.body)
	departList[info.id-1].name = info.name
	departList[info.id-1].telephone = info.telephone
	departList[info.id-1].createDate = info.createDate
	departList[info.id-1].description = info.description
	return{
		'code':'200'
	}	
})
//删除数据
Mock.mock(/\/department\/manageDep/,'delete', (configs)=>{
	var info = GetQueryJson(configs.url)
	for (let i = 0; i < departList.length;i++){
		if(departList[i].id  == info.id){
			departList.splice(i,1)
		}
	}
	return{
		'code':'200'
	}	
})
//部门信息end


//岗位信息
let postionList = []
for (let i = 1; i < 30; i++) {
	  postionList.push(Mock.mock({
		'id': i,//岗位编号
		'name':'@cname()',//岗位名称
		'createDate':'@date("yyyy-MM-dd")',//创立时间
		'description':'@csentence(10,20)'//描述
	  }))
}
//1.根据id获取数据 2.分页表格数据
Mock.mock(/\/department\/managePos/,'get',(params)=>{
	var info = GetQueryJson(params.url)
	var a = getJsonObjLength(info)
	if(a > 1){
		var [pageIndex, pageSize, total] = [info.current, info.size, postionList.length]
		var len = total / pageSize
		//页码
		var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
		//每页数据
		var newDataList = postionList.slice((pageIndex-1) * pageSize, pageIndex * pageSize)
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
				'rows': postionList[info.id-1]
			}
		}
	}
})
//添加数据 
Mock.mock(/\/department\/managePos/,'post',(options)=>{
	var info = JSON.parse(options.body)
	var idInfo = postionList.length+1
	postionList.push({
		'id': idInfo,
		'name':info.name,
		'createDate':info.createDate,
		'description':info.description
	})
	return{
		'code':'200'
	}	
})

//修改数据 
Mock.mock(/\/department\/managePos/,'put',(options)=>{
	var info = JSON.parse(options.body)
	postionList[info.id-1].name = info.name
	postionList[info.id-1].createDate = info.createDate
	postionList[info.id-1].description = info.description
	return{
		'code':'200'
	}	
})
//删除数据
Mock.mock(/\/department\/managePos/,'delete', (configs)=>{
	var info = GetQueryJson(configs.url)
	for (let i = 0; i < postionList.length;i++){
		if(postionList[i].id  == info.id){
			postionList.splice(i,1)
		}
	}
	return{
		'code':'200'
	}	
})
//岗位信息end

//工作等级
let jobList = []
for (let i = 1; i < 30; i++) {
	  jobList.push(Mock.mock({
		'id': i,//职称编号
		'name|1': ['正式员工','实习生'],//职称名称
		'titleLevel|1':['1','2','3','4'],//职位等级
		'createDate':'@date("yyyy-MM-dd")',//创立时间
		'description':'@csentence(10,20)'//备注
	  }))
}

//1.根据id获取数据 2.分页表格数据
Mock.mock(/\/department\/manageJob/,'get',(params)=>{
	var info = GetQueryJson(params.url)
	var a = getJsonObjLength(info)
	if(a > 1){
		var [pageIndex, pageSize, total] = [info.current, info.size, jobList.length]
		var len = total / pageSize
		//页码
		var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
		//每页数据
		var newDataList = jobList.slice((pageIndex-1) * pageSize, pageIndex * pageSize)
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
				'rows': jobList[info.id-1]
			}
		}
	}
})
//添加数据 
Mock.mock(/\/department\/manageJob/,'post',(options)=>{
	var info = JSON.parse(options.body)
	var idInfo = jobList.length+1
	jobList.push({
		'id': idInfo,
		'name':info.name,
		'titleLevel': info.titleLevel,
		'createDate':info.createDate,
		'description':info.description
	})
	return{
		'code':'200'
	}	
})

//修改数据 
Mock.mock(/\/department\/manageJob/,'put',(options)=>{
	var info = JSON.parse(options.body)
	jobList[info.id-1].name = info.name
	jobList[info.id-1].titleLevel = info.titleLevel
	jobList[info.id-1].createDate = info.createDate
	jobList[info.id-1].description = info.description
	return{
		'code':'200'
	}	
})
//删除数据
Mock.mock(/\/department\/manageJob/,'delete', (configs)=>{
	var info = GetQueryJson(configs.url)
	for (let i = 0; i < jobList.length;i++){
		if(jobList[i].id  == info.id){
			jobList.splice(i,1)
		}
	}
	return{
		'code':'200'
	}	
})
//工作等级end