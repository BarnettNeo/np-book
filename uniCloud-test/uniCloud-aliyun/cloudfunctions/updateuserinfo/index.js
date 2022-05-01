'use strict';
const {verifyToken} = require("wx-common")
exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	const {userInfo, token} = event;
	
	const db = uniCloud.database();
	const dbCmd = db.command;
	
	// 解密openid
	const payload = verifyToken(token)
	
	console.log(userInfo,payload)
	
	// 更新数据库
	const dbRes = await db.collection("user-info").where({
		openid:dbCmd.eq(payload.openid) // 查询判断openid
	}).update({
		avatarUrl:userInfo.avatarUrl,
		city:userInfo.city,
		country:userInfo.country,
		gender:userInfo.gender,
		nickName:userInfo.nickName,
		province:userInfo.province
	})
	
	
	//返回数据给客户端
	return dbRes
};
