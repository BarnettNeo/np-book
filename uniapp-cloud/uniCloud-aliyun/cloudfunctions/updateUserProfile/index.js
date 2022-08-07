'use strict';
const {verifyToken} = require('wx-common')

exports.main = async (event, context) => {
	const { userInfo,token } = event;
	
	const db = uniCloud.database();
	
	const payload = verifyToken(token);
	// console.log(payload.openid,userInfo,token)
	const dbRes = await db.collection("users").where({
		openid:payload.openid
	}).update({
		nickName:userInfo.nickName,
		avatarUrl:userInfo.avatarUrl,
		gender:userInfo.gender,
		country:userInfo.country,
		province:userInfo.province,
		city:userInfo.city ,
	});
	const ownerinfo = await db.collection("users").field({openid:false}).where({
		openid:payload.openid
	}).limit(1).get()
	console.log(dbRes,ownerinfo)
	return ownerinfo.data[0];
};
