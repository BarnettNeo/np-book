'use strict';
const {appId,appSecret,getToken} = require("wx-common")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	// jscode2session
	
	const {code} = event;
	const db = uniCloud.database();
	
	const res  = await uniCloud.httpclient.request(
		"https://api.weixin.qq.com/sns/jscode2session?appid="+appId+"&secret="+appSecret+"&js_code="+code+"&grant_type=authorization_code",
		{
			dataType:"json"
		}
	)
	
	
	const openid = res.data.openid;
	
	// 根据openid查询用户信息
	let dbRes = await db.collection('user-info').where({
	  openid:openid,
	}).get();
	
	// 加密openid
	const token = getToken(openid);
	let userData;
	
	// 不存在openid
	if(dbRes.affectedDocs<=0){
		userData = {
			openid:openid,
			nickName:'微信用户',
			avatarUrl:''
		}
		
		await db.collection('user-info').add(userData)
	}else{
		// console.log('dbRes',dbRes)
		userData = dbRes.data[0];
		
	}
	
	delete userData['openid']
	
	userData['token'] = token;
	
	console.log(openid)
	
	//返回数据给客户端
	return userData
};
