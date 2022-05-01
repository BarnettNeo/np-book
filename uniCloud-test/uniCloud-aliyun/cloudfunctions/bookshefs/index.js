'use strict';
const {verifyToken} = require("wx-common")

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	
	const db = uniCloud.database();
	const dbCmd = db.command;
	
	// 解密openid
	const payload = event.token?verifyToken(token):'';
	
	//返回数据给客户端
	return event
};
