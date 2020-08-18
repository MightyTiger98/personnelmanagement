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


//统计管理
//综合信息统计
let synthesisList = []
for (let i = 1; i < 30; i++) {
	synthesisList.push(Mock.mock({	
		'id': i,//员工编号  
		'name':'@cname()',//姓名
		'sex|1':['男','女'],//性别
		'birthday':'@date("yyyy-MM-dd")',//出生日期
		'workState|1':['在职','离职','实习'],//状态	
	  }))
}

//1.根据id获取数据 2.分页表格数据
Mock.mock(/\/statistics\/all/,'get',(params)=>{
	var info = GetQueryJson(params.url)
	var a = getJsonObjLength(info)
	if(a > 1){
		var [pageIndex, pageSize, total] = [info.current, info.size, synthesisList.length]
		var len = total / pageSize
		//页码
		var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
		//每页数据
		var newDataList = synthesisList.slice((pageIndex-1) * pageSize, pageIndex * pageSize)
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
				'rows': synthesisList[info.id-1]
			}
		}
	}
})

//添加数据 
Mock.mock(/\/statistics\/all/,'post',(options)=>{
	var info = JSON.parse(options.body)
	var idInfo = synthesisList.length+1
	synthesisList.push({					
		'id': idInfo,
		'name':info.name,
		'sex':info.sex,
		'birthday':info.birthday,
		'workState':info.workState,
	})
	return{
		'code':'200'
	}	
})

//修改数据 
Mock.mock(/\/statistics\/all/,'put',(options)=>{
	var info = JSON.parse(options.body)
	synthesisList[info.id-1].name = info.name
	synthesisList[info.id-1].sex = info.sex
	synthesisList[info.id-1].birthday = info.birthday
	synthesisList[info.id-1].workState = info.workState
	return{
		'code':'200'
	}	
})
//删除数据
Mock.mock(/\/statistics\/all/,'delete', (configs)=>{
	var info = GetQueryJson(configs.url)
	for (let i = 0; i < synthesisList.length;i++){
		if(synthesisList[i].id  == info.id){
			synthesisList.splice(i,1)
		}
	}v
	return{
		'code':'200'
	}	
})
//综合信息统计end


//人事信息管理
let informationList = []
for (let i = 1; i < 30; i++) {
	informationList.push(Mock.mock({
		'id': i,//员工编号 
		'name':'@cname()',//姓名 
		'sex|1':['男','女'],//性别
		'jobName|1':['教授','副教授','助教','讲师','初级工程师','高级工程师'],//职称
		'salary|1':['3000','5000','7000','10000','15000','18000','25000','50000','100000'],//工资
	  }))
}

//1.根据id获取数据 2.分页表格数据
Mock.mock(/\/statistics\/pers/,'get',(params)=>{
	var info = GetQueryJson(params.url)
	var a = getJsonObjLength(info)
	if(a > 1){
		var [pageIndex, pageSize, total] = [info.current, info.size, informationList.length]
		var len = total / pageSize
		//页码
		var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
		//每页数据
		var newDataList = informationList.slice((pageIndex-1) * pageSize, pageIndex * pageSize)
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
				'rows': informationList[info.id-1]
			}
		}
	}
})

//添加数据 
Mock.mock(/\/statistics\/pers/,'post',(options)=>{
	var info = JSON.parse(options.body)
	var idInfo = informationList.length+1
	informationList.push({		
		'id': idInfo,
		'name':info.name,
		'sex':info.sex,
		'jobName': info.jobName,
		'salary':info.salary,
	})
	return{
		'code':'200'
	}	
})

//修改数据 
Mock.mock(/\/statistics\/pers/,'put',(options)=>{
	var info = JSON.parse(options.body)
	informationList[info.id-1].name = info.name
	informationList[info.id-1].sex = info.sex
	informationList[info.id-1].jobName = info.jobName
	informationList[info.id-1].salary = info.salary
	return{
		'code':'200'
	}	
})
//删除数据
Mock.mock(/\/statistics\/pers/,'delete', (configs)=>{
	var info = GetQueryJson(configs.url)
	for (let i = 0; i < informationList.length;i++){
		if(informationList[i].id  == info.id){
			informationList.splice(i,1)
		}
	}v
	return{
		'code':'200'
	}	
})
//人事信息管理end

//人事记录统计
let recordList = []
for (let i = 1; i < 30; i++) {
	recordList.push(Mock.mock({
		'id': i,//员工编号  
		'name':'@cname()',//姓名
		'depart':['股东会','董事会','总办','财务部','财务部','市场部','技术部','运维部'],//部门
		'ecPoint':'@increment(1)'//奖罚分
	  }))
}

//1.根据id获取数据 2.分页表格数据
Mock.mock(/\/statistics\/record/,'get',(params)=>{
	var info = GetQueryJson(params.url)
	var a = getJsonObjLength(info)
	if(a > 1){
		var [pageIndex, pageSize, total] = [info.current, info.size, recordList.length]
		var len = total / pageSize
		//页码
		var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
		//每页数据
		var newDataList = recordList.slice((pageIndex-1) * pageSize, pageIndex * pageSize)
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
				'rows': recordList[info.id-1]
			}
		}
	}
})

//添加数据 
Mock.mock(/\/statistics\/record/,'post',(options)=>{
	var info = JSON.parse(options.body)
	var idInfo = recordList.length+1
	recordList.push({			
		'id': idInfo,
		'name':info.name,
		'depart':info.depart,
		'ecPoint': info.ecPoint,
	})
	return{
		'code':'200'
	}	
})

//修改数据 
Mock.mock(/\/statistics\/record/,'put',(options)=>{
	var info = JSON.parse(options.body)
	recordList[info.id-1].name = info.name
	recordList[info.id-1].depart = info.depart
	recordList[info.id-1].ecPoint = info.ecPoint
	return{
		'code':'200'
	}	
})
//删除数据
Mock.mock(/\/statistics\/record/,'delete', (configs)=>{
	var info = GetQueryJson(configs.url)
	for (let i = 0; i < recordList.length;i++){
		if(recordList[i].id  == info.id){
			recordList.splice(i,1)
		}
	}v
	return{
		'code':'200'
	}	
})
//人事记录统计end