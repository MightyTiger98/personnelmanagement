//导入模拟数据包
import Mock from 'mockjs'

//人事管理
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

//员工奖惩
let rewardList = []
for (let i = 1; i < 30; i++) {
	  rewardList.push(Mock.mock({
		'id': i,//奖惩编号
		'name':'@cname()',//员工姓名 
		'eid': i,//员工编号  
		'ecDate':'@date("yyyy-MM-dd")',//奖惩日期
		'ecReason':'@csentence(10,20)'//奖惩原因
		'ecPoint':'@increment(1)'//奖罚分
		'ecType|1':['1','2']//奖罚类别
		'remark':'@csentence(10,20)'//备注		
	  }))
}

//1.根据id获取数据 2.分页表格数据
Mock.mock(/\/personnel\/ec/,'get',(params)=>{
	var info = GetQueryJson(params.url)
	var a = getJsonObjLength(info)
	if(a > 1){
		var [pageIndex, pageSize, total] = [info.current, info.size, rewardList.length]
		var len = total / pageSize
		//页码
		var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
		//每页数据
		var newDataList = rewardList.slice((pageIndex-1) * pageSize, pageIndex * pageSize)
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
				'rows': rewardList[info.id-1]
			}
		}
	}
})

//添加数据 
Mock.mock(/\/personnel\/ec/,'post',(options)=>{
	var info = JSON.parse(options.body)
	var idInfo = rewardList.length+1
	rewardList.push({	
		
		'id': idInfo,
		'name':info.name,
		'eid':info.eid
		'ecReason': info.ecReason,
		'ecDate':info.ecDate,
		'ecPoint':info.ecPoint
		'ecType':info.ecType,
		'remark':info.remark
	})
	return{
		'code':'200'
	}	
})

//修改数据 
Mock.mock(/\/personnel\/ec/,'put',(options)=>{
	var info = JSON.parse(options.body)
	rewardList[info.id-1].name = info.name
	rewardList[info.id-1].ecReason = info.ecReason
	rewardList[info.id-1].ecDate = info.ecDate
	rewardList[info.id-1].ecPoint = info.ecPoint
	rewardList[info.id-1].ecType = info.ecType
	rewardList[info.id-1].remark = info.remark
	return{
		'code':'200'
	}	
})
//删除数据
Mock.mock(/\/personnel\/ec/,'delete', (configs)=>{
	var info = GetQueryJson(configs.url)
	for (let i = 0; i < rewardList.length;i++){
		if(rewardList[i].id  == info.id){
			rewardList.splice(i,1)
		}
	}
	return{
		'code':'200'
	}	
})
//员工奖惩end



//员工考评
let appraisalList = []
for (let i = 1; i < 30; i++) {
	appraisalList.push(Mock.mock({
		'id': i,//考评编号  
		'name':'@cname()',//姓名
		'appDate':'@date("yyyy-MM-dd")',//创立时间
		'appResult':'@csentence(10,20)' ,//考评结果
		'appContent':'@csentence(10,20)'//考评内容
		'remark':'@csentence(10,20)'//备注
	  }))
}

//1.根据id获取数据 2.分页表格数据
Mock.mock(/\/personnel\/appraise/,'get',(params)=>{
	var info = GetQueryJson(params.url)
	var a = getJsonObjLength(info)
	if(a > 1){
		var [pageIndex, pageSize, total] = [info.current, info.size, appraisalList.length]
		var len = total / pageSize
		//页码
		var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
		//每页数据
		var newDataList = appraisalList.slice((pageIndex-1) * pageSize, pageIndex * pageSize)
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
				'rows': appraisalList[info.id-1]
			}
		}
	}
})

//添加数据 
Mock.mock(/\/personnel\/appraise/,'post',(options)=>{
	var info = JSON.parse(options.body)
	var idInfo = appraisalList.length+1
	appraisalList.push({		
		'id': idInfo,
		'name':info.name,
		'appDate': info.appDate,
		'appResult':info.appResult,
		'appContent':info.appContent,
		'remark':info.remark
	})
	return{
		'code':'200'
	}	
})

//修改数据 
Mock.mock(/\/personnel\/appraise/,'put',(options)=>{
	var info = JSON.parse(options.body)
	appraisalList[info.id-1].name = info.name
	appraisalList[info.id-1].appDate = info.appDate
	appraisalList[info.id-1].appResult = info.appResult
	appraisalList[info.id-1].appContent = info.appContent
	appraisalList[info.id-1].remark = info.remark
	return{
		'code':'200'
	}	
})
//删除数据
Mock.mock(/\/personnel\/appraise/,'delete', (configs)=>{
	var info = GetQueryJson(configs.url)
	for (let i = 0; i < appraisalList.length;i++){
		if(appraisalList[i].id  == info.id){
			appraisalList.splice(i,1)
		}
	}v
	return{
		'code':'200'
	}	
})
//员工考评end





//员工培训
let trainList = []
for (let i = 1; i < 30; i++) {
	trainList.push(Mock.mock({
		'id': i,//考评编号  
		'name':'@cname()',//姓名
		'eid': i,//员工编号  
		'trainDate':'@date("yyyy-MM-dd")',//培训日期
		'trainContent':'@csentence(10,20)'//培训内容
		'remark':'@csentence(10,20)'//备注
	  }))
}

//1.根据id获取数据 2.分页表格数据
Mock.mock(/\/personnel\/train/,'get',(params)=>{
	var info = GetQueryJson(params.url)
	var a = getJsonObjLength(info)
	if(a > 1){
		var [pageIndex, pageSize, total] = [info.current, info.size, trainList.length]
		var len = total / pageSize
		//页码
		var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
		//每页数据
		var newDataList = trainList.slice((pageIndex-1) * pageSize, pageIndex * pageSize)
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
				'rows': trainList[info.id-1]
			}
		}
	}
})

//添加数据 
Mock.mock(/\/personnel\/train/,'post',(options)=>{
	var info = JSON.parse(options.body)
	var idInfo = trainList.length+1
	trainList.push({			
		'id': idInfo,
		'name':info.name,
		'eid':info.eid,
		'trainDate': info.trainDate,
		'trainContent':info.trainContent,
		'remark':info.remark
	})
	return{
		'code':'200'
	}	
})

//修改数据 
Mock.mock(/\/personnel\/train/,'put',(options)=>{
	var info = JSON.parse(options.body)
	trainList[info.id-1].name = info.name
	trainList[info.id-1].appDate = info.appDate
	trainList[info.id-1].appResult = info.appResult
	trainList[info.id-1].remark = info.remark
	return{
		'code':'200'
	}	
})
//删除数据
Mock.mock(/\/personnel\/train/,'delete', (configs)=>{
	var info = GetQueryJson(configs.url)
	for (let i = 0; i < trainList.length;i++){
		if(trainList[i].id  == info.id){
			trainList.splice(i,1)
		}
	}v
	return{
		'code':'200'
	}	
})
//员工培训end




//员工调动
let moveList = []
for (let i = 1; i < 30; i++) {
	moveList.push(Mock.mock({
		'id': i,//调动编号  
		'name':'@cname()',//姓名
		'eid': i,//员工编号  
		'asDate':'@date("yyyy-MM-dd")',//调薪日期
		'afterDep|1':['股东会','董事会','总办','财务部','财务部','市场部','技术部','运维部'],//调动后部门
		'afterJob|1':['技术总监','运营总监','研发工程师','运维工程师','Java研发经理'],//调动后职位
		'reason':'@csentence(10,20)',//调动原因
		'remark':'@csentence(10,20)',//备注
	  }))
}

//1.根据id获取数据 2.分页表格数据
Mock.mock(/\/personnel\/remove/,'get',(params)=>{
	var info = GetQueryJson(params.url)
	var a = getJsonObjLength(info)
	if(a > 1){
		var [pageIndex, pageSize, total] = [info.current, info.size, moveList.length]
		var len = total / pageSize
		//页码
		var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
		//每页数据
		var newDataList = moveList.slice((pageIndex-1) * pageSize, pageIndex * pageSize)
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
				'rows': moveList[info.id-1]
			}
		}
	}
})

//添加数据 
Mock.mock(/\/personnel\/remove/,'post',(options)=>{
	var info = JSON.parse(options.body)
	var idInfo = moveList.length+1
	moveList.push({			
		'id': idInfo,
		'name':info.name,
		'eid':info.eid,
		'asDate': info.asDate,
		'afterDep':info.afterDep,
		'afterJob':info.afterJob,
		'reason':info.reason,
		'remark':info.remark,
	})
	return{
		'code':'200'
	}	
})

//修改数据 
Mock.mock(/\/personnel\/remove/,'put',(options)=>{
	var info = JSON.parse(options.body)
	moveList[info.id-1].name = info.name
	moveList[info.id-1].asDate = info.asDate
	moveList[info.id-1].afterDep = info.afterDep
	moveList[info.id-1].afterJob = info.afterJob
	moveList[info.id-1].reason = info.reason
	moveList[info.id-1].remark = info.remark
	return{
		'code':'200'
	}	
})
//删除数据
Mock.mock(/\/personnel\/remove/,'delete', (configs)=>{
	var info = GetQueryJson(configs.url)
	for (let i = 0; i < moveList.length;i++){
		if(moveList[i].id  == info.id){
			moveList.splice(i,1)
		}
	}v
	return{
		'code':'200'
	}	
})
//员工调动end







//员工调薪
let salaryList = []
for (let i = 1; i < 30; i++) {
	salaryList.push(Mock.mock({
		'id': i,//调薪编号  
		'name':'@cname()',//姓名
		'eid': i,//员工编号  
		'asDate':'@date("yyyy-MM-dd")',//调薪日期
		'beforeSalary|1000-1000000':1000,//调前薪资
		'afterSalary|1000-1000000':1000,//调后薪资
		'reason':'@csentence(10,20)',//调薪原因
		'remark':'@csentence(10,20)',//备注
	  }))
}

//1.根据id获取数据 2.分页表格数据
Mock.mock(/\/personnel\/salary/,'get',(params)=>{
	var info = GetQueryJson(params.url)
	var a = getJsonObjLength(info)
	if(a > 1){
		var [pageIndex, pageSize, total] = [info.current, info.size, salaryList.length]
		var len = total / pageSize
		//页码
		var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
		//每页数据
		var newDataList = salaryList.slice((pageIndex-1) * pageSize, pageIndex * pageSize)
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
				'rows': salaryList[info.id-1]
			}
		}
	}
})

//添加数据 
Mock.mock(/\/personnel\/salary/,'post',(options)=>{
	var info = JSON.parse(options.body)
	var idInfo = salaryList.length+1
	salaryList.push({			
		'id': idInfo,
		'name':info.name,
		'eid':info.eid,
		'asDate': info.asDate,
		'beforeSalary':info.beforeSalary,
		'afterSalary':info.afterSalary,
		'reason':info.reason,
		'remark':info.remark,
	})
	return{
		'code':'200'
	}	
})

//修改数据 
Mock.mock(/\/personnel\/salary/,'put',(options)=>{
	var info = JSON.parse(options.body)
	salaryList[info.id-1].name = info.name
	salaryList[info.id-1].asDate = info.asDate
	salaryList[info.id-1].beforeSalary = info.beforeSalary
	salaryList[info.id-1].afterSalary = info.afterSalary
	salaryList[info.id-1].reason = info.reason
	salaryList[info.id-1].remark = info.remark
	return{
		'code':'200'
	}	
})
//删除数据
Mock.mock(/\/personnel\/salary/,'delete', (configs)=>{
	var info = GetQueryJson(configs.url)
	for (let i = 0; i < salaryList.length;i++){
		if(salaryList[i].id  == info.id){
			salaryList.splice(i,1)
		}
	}v
	return{
		'code':'200'
	}	
})
//员工调薪end