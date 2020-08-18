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

//部门信息
let departList = []
const Random = require('mockjs').Random;
for (let i = 0; i < 30; i++) {
	  departList.push(Mock.mock({
		  
		  //'afterDep|1':['股东会','董事会','总办','财务部','财务部','市场部','技术部','运维部'],//调动后部门
		  //'afterSalary|1000-1000000':1000,//调后薪资
		'id': i+1,//部门编号
		'name':'@cname()',//部门名称
		'telephone': /^1(5|3|7|8)[0-9]{9}$/,//电话
		'createDate':'@date("yyyy-MM-dd")',//创立时间
		// 'description|1':['股东会','董事会','总办','财务部','财务部','市场部','技术部','运维部'],//描述
		// 'description|1000-10000':1000,//描述
		// 'description': "@image('100x100','#ff83fa','#fcfcfc','png','人')",//图片
		// 'description':'@city(true)',//地址
		// 'description':'@cword()',//地址
		'description':'@csentence(10,20)',//描述
		'List':{
			'string': '@cword'
		}
	  }))
}

//1.根据id获取数据 2.分页表格数据
Mock.mock(/\/department\/manageDep/,'get',(params)=>{
	var info = GetQueryJson(params.url)
	var a = getJsonObjLength(info)
	console.log(departList)
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
//1.根据id获取数据 2.分页表格数据
Mock.mock(/\/department\/senior/,'get',(params)=>{
	var info = GetQueryJson(params.url)
	return{
		'code':'200',
		'message': 'success',
		'data': {
			'rows':  departList[info.id-1].List
		}
	}
})
//添加数据 'http://localhost:8080/test'
Mock.mock(/\/department\/manageDep/,'post',(options)=>{
	var info = JSON.parse(options.body)
	var idInfo = departList.length+1
	// var newData = [idInfo,info.name,info.telephone,info.createDate,info.description]
	// console.log(newData)
	departList.push({
		'id': idInfo,//部门编号
		'name':info.name,//部门名称
		'telephone': info.telephone,//电话
		'createDate':info.createDate,//创立时间
		'description':info.description//描述
	})
	return{
		'code':'200'
	}	
})

//修改数据 'http://localhost:8080/test'
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

Mock.mock(/\/department\/manageDep/,'delete', (configs)=>{
	var info = GetQueryJson(configs.url)
	for (let i = 0; i < departList.length;i++){
		if(departList[i].id  == info.id){
			departList.splice(i,1)
		}
	}
	console.log(departList)
	return{
		'code':'200'
	}	
})