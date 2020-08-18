//导入模拟数据包
import Mock from 'mockjs'

//通过Mock.mock

//解析get请求url后面的参数转成JSON
function GetQueryJson (url) {
  let param = {}; // 存储最终JSON结果对象
  url.replace(/([^?&]+)=([^?&]+)/g, function(s, v, k) {
    param[v] = decodeURIComponent(k);//解析字符为中文
    return k + '=' +  v;
  });
  return param;
}

//
let loginList = [
	{
		username:'123456',
		password:'123456'
	},
	{
		username:'admin',
		password:'admin'
	},
	{
		username:'user001',
		password:'user001'
	},
	{
		username:'test001',
		password:'test001'
	},
]
//登录数据
Mock.mock('/login','post',(loginData)=>{
	var info = JSON.parse(loginData.body)
	var flag = false
	for(let i = 0; i < loginList.length; i++ ){
		if(loginList[i].username == info.username && loginList[i].password == info.password){
			flag = true
		}
	}
	if(flag){
		return{
			'code': '200',
			'message': 'yes',
		}
	}else{
		return{
			'code': '100',
			'message': 'no',
		}
	}
	
})
