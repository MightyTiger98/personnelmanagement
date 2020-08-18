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

//员工资料

//基本资料
let employeeList = []

for (let i = 1; i < 30; i++) {
	  employeeList.push(Mock.mock({
		'id': i,//编号
		'name':'@cname()',//员工姓名
		'workId':i,//员工工号
		'gender|1':['男','女'],//员工性别
		'birthday':'@date("yyyy-MM-dd")',//员工出生日期
		'idCard':'@id()',//身份证
		'wedlock|1':['已婚','未婚'],//婚姻状况
		'nationName|1':['汉族','维吾尔族'],//民族
		'nationPlace':'@city(true)',//籍贯
		'politic|1':['党员','预备党员','共青团员','民众'],//政治面貌
		'email':'@email',//邮箱
		'phone': /^1(5|3|7|8)[0-9]{9}$/,//电话
		'address':'@city(true)',//联系住址
		'List':{
			'departName|1':['股东会','董事会','总办','财务部','财务部','市场部','技术部','运维部'],//部门
			'jobName|1':['教授','副教授','助教','讲师','初级工程师','高级工程师'],//职称
			'pos|1':['技术总监','运营总监','研发工程师','运维工程师','Java研发经理'],//职位
			'engageForm|1':['劳务合同','劳动合同'],//聘用形式
			'tiptopDegree|1':['小学','初中','高中','本科','研究生','硕士','博士','博士后'],//学历
			'specialty|1':['信息管理与信息系统','市场营销','电子工程','室内装修设计','通信工程'],//专业
			'school|1':['深圳大学','武汉大学','哈尔滨理工大学','西北大学','西安电子科技学校','清华大学','华胥中学','海南侨中'],//毕业学校
			'beginDate':'@date("yyyy-MM-dd")',//入职日期
			'workState|1':['在职','离职'],//在职状态
			'contractTerm|1-10':1,//合同期限
			'beginContract':'@date("yyyy-MM-dd")',//合同起始时间
			'endContract':'@date("yyyy-MM-dd")',//合同结束时间
			'workAge|1-50':1//工龄
		}		
	  }))
}

//1.根据id获取数据 2.分页表格数据
Mock.mock(/\/employee\/basic/,'get',(params)=>{
	var info = GetQueryJson(params.url)
	var a = getJsonObjLength(info)
	if(a > 1){
		var [pageIndex, pageSize, total] = [info.current, info.size, employeeList.length]
		var len = total / pageSize
		//页码
		var totalPages = len - parseInt(len) > 0 ? parseInt(len) + 1 : len
		//每页数据
		var newDataList = employeeList.slice((pageIndex-1) * pageSize, pageIndex * pageSize)
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
				'rows': employeeList[info.id-1]
			}
		}
	}
})

//获取高级数据
Mock.mock(/\/employee\/senior/,'get',(params)=>{
	var info = GetQueryJson(params.url)
	return{
		'code':'200',
		'message': 'success',
		'data': {
			'rows': employeeList[info.id-1].List
		}
	}
})
//添加数据 
Mock.mock(/\/employee\/basic/,'post',(options)=>{
	var info = JSON.parse(options.body)
	var idInfo = employeeList.length+1
	employeeList.push({
		'id': idInfo,
		'name':info.name,
		'workId': info.workId,
		'gender':info.gender,
		'birthday':info.birthday,
		'idCard':info.idCard,
		'wedlock': info.wedlock,
		'nationName':info.nationName,
		'nationPlace':info.nationPlace,
		'politic': info.politic,
		'email':info.email,
		'phone':info.phone,
		'address':info.address,
		'departName':info.departName,
		'jobName':info.jobName,
		'pos':info.pos,
		'engageForm':info.engageForm,
		'tiptopDegree':info.tiptopDegree,
		'specialty':info.specialty,
		'school':info.school,
		'beginDate':info.beginDate,
		'workState':info.workState,
		'contractTerm':info.contractTerm,
		'beginContract':info.beginContract,
		'endContract':info.endContract,
		'workAge':info.workAge,
	})
	return{
		'code':'200'
	}	
})

//修改数据 
Mock.mock(/\/employee\/basic/,'put',(options)=>{
	var info = JSON.parse(options.body)	
	employeeList[info.id-1].name = info.name
	employeeList[info.id-1].gender = info.gender
	employeeList[info.id-1].birthday = info.birthday
	employeeList[info.id-1].idCard = info.idCard
	employeeList[info.id-1].wedlock = info.wedlock
	employeeList[info.id-1].nationName = info.nationName
	employeeList[info.id-1].nationPlace = info.nationPlace
	employeeList[info.id-1].politic = info.politic
	employeeList[info.id-1].email = info.email
	employeeList[info.id-1].phone = info.phone
	employeeList[info.id-1].address = info.address
	employeeList[info.id-1].departName = info.departName
	employeeList[info.id-1].jobName = info.jobName
	employeeList[info.id-1].pos = info.pos
	employeeList[info.id-1].engageForm = info.engageForm
	employeeList[info.id-1].tiptopDegree = info.tiptopDegree
	employeeList[info.id-1].specialty = info.specialty
	employeeList[info.id-1].school = info.school
	employeeList[info.id-1].beginDate = info.beginDate
	employeeList[info.id-1].workState = info.workState
	employeeList[info.id-1].contractTerm = info.contractTerm
	employeeList[info.id-1].beginContract = info.beginContract
	employeeList[info.id-1].endContract = info.endContract
	employeeList[info.id-1].workAge = info.workAge
	return{
		'code':'200'
	}	
})
//删除数据
Mock.mock(/\/employee\/basic/,'delete', (configs)=>{
	var info = GetQueryJson(configs.url)
	for (let i = 0; i < employeeList.length;i++){
		if(employeeList[i].id  == info.id){
			employeeList.splice(i,1)
		}
	}
	return{
		'code':'200'
	}	
})
//基本资料end