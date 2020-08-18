//导入模拟数据包
import Mock from 'mockjs'

//薪资管理
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


//工资表查询
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
Mock.mock(/\/salary\/serach/,'get',(params)=>{
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
Mock.mock(/\/salary\/serach/,'post',(options)=>{
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
Mock.mock(/\/salary\/serach/,'put',(options)=>{
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
Mock.mock(/\/salary\/serach/,'delete', (configs)=>{
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
//工资表查询end



//工资套账管理
let salaryManageList = []
for (let i = 1; i < 30; i++) {
	salaryManageList.push(Mock.mock({
		'id': i,//工资编号
		'name':'@cname()',//工资名称
		'ecName':'@cname()',//员工姓名
		'eid': i,//员工编号  
		'basicSalary|1':['3000','5000','7000','10000','15000','18000','25000','50000','100000'],//基本工资
		'bonus|1': ['100','500','1000','5000','10000','50000','100000'],//奖金
		'lunchSalary|1000-3000':1000,//午餐补助
		'trafficSalary|1000-3000':1000,//交通补助
		'allSalary|1'::['4000','6000','9000','12000','18000','21000','25000','50000','100000'],,//应发工资
		'pensionBase|1':['500','1000','2000','5000','10000'],//养老金基数
		'pensionPer|1':['0.5','0.8','1','1.2','1.5','2'],//养老金比率
		'createDate':'@date("yyyy-MM-dd")',//启用时间
		'medicalBase|1':['500','1000','2000','5000','10000'],//医疗基数
		'medicalPer|1':['0.5','0.8','1','1.2','1.5','2'],//医疗金比率
		'accumulationFundBase|1':['500','1000','2000','5000','10000'],//公积金基数
		'accumulationFundPer|1':['0.5','0.8','1','1.2','1.5','2'],//公积金比率
	  }))
}

//1.根据id获取数据 2.分页表格数据
Mock.mock(/\/salary\/sob/,'get',(params)=>{
	var info = GetQueryJson(params.url)
	var a = getJsonObjLength(info)
	if(a > 1){
		var [pageIndex, pageSize, total] = [info.current, info.size, salaryManageList.length]
		var len = total / pageSize
		//页码
		var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
		//每页数据
		var newDataList = salaryManageList.slice((pageIndex-1) * pageSize, pageIndex * pageSize)
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
				'rows': salaryManageList[info.id-1]
			}
		}
	}
})

//添加数据 
Mock.mock(/\/salary\/sob/,'post',(options)=>{
	var info = JSON.parse(options.body)
	var idInfo = salaryManageList.length+1
	salaryManageList.push({		
		'id': idInfo,
		'name':info.name,
		'ecName':info.ecName,
		'eid':info.eid,
		'basicSalary': info.basicSalary,
		'bonus':info.bonus,
		'lunchSalary':info.lunchSalary,
		'trafficSalary':info.trafficSalary,
		'allSalary':info.allSalary,
		'pensionBase':info.pensionBase,
		'pensionPer':info.pensionPer,
		'createDate':info.createDate,
		'medicalBase':info.medicalBase,
		'medicalPer':info.medicalPer,
		'accumulationFundBase':info.accumulationFundBase,
		'accumulationFundPer':info.accumulationFundPer,
	})
	return{
		'code':'200'
	}	
})

//修改数据 
Mock.mock(/\/salary\/sob/,'put',(options)=>{
	var info = JSON.parse(options.body)
	salaryManageList[info.id-1].name = info.name
	salaryManageList[info.id-1].ecName = info.ecName
	salaryManageList[info.id-1].basicSalary = info.basicSalary
	salaryManageList[info.id-1].bonus = info.bonus
	salaryManageList[info.id-1].lunchSalary = info.lunchSalary
	salaryManageList[info.id-1].trafficSalary = info.trafficSalary
	salaryManageList[info.id-1].allSalary = info.allSalary
	salaryManageList[info.id-1].pensionBase = info.pensionBase
	salaryManageList[info.id-1].pensionPer = info.pensionPer
	salaryManageList[info.id-1].createDate = info.createDate
	salaryManageList[info.id-1].medicalBase = info.medicalBase
	salaryManageList[info.id-1].medicalPer = info.medicalPer
	salaryManageList[info.id-1].accumulationFundBase = info.accumulationFundBase
	salaryManageList[info.id-1].accumulationFundPer = info.accumulationFundPer
	return{
		'code':'200'
	}	
})
//删除数据
Mock.mock(/\/salary\/sob/,'delete', (configs)=>{
	var info = GetQueryJson(configs.url)
	for (let i = 0; i < salaryManageList.length;i++){
		if(salaryManageList[i].id  == info.id){
			salaryManageList.splice(i,1)
		}
	}v
	return{
		'code':'200'
	}	
})
//工资套账管理end