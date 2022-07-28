'use strict';
// 上传图片
const {verifyToken} = require('wx-common')
// const UniSecCheck = require('uni-sec-check')

exports.main = async (event, context) => {
	//event为客户端上传的参数
	console.log('event : ', event)
	const db = uniCloud.database();
	const dbCmd = db.command;
	
	const {token,action,bgImg} = event;
	const payload = event.token?verifyToken(event.token):null;
	
	let dbRes;
	
	if(action=="add"){
		const ownerinfo = await db.collection("users").where({
			openid:dbCmd.eq(payload.openid)
		}).limit(1).update({
			bgImg:bgImg
		})
		.then((res)=>{
			return{
				state:true,
				msg:'上传成功'
			}
		}).catch((err)=>{
			return{
				state:true,
				msg:'上传失败'
			}
		})
		return ownerinfo
	}else if(action=="get"){
		const ownerinfo = await db.collection("users").where({
			openid:dbCmd.eq(payload.openid)
		}).limit(1).get()
		// console.log(ownerinfo,ownerinfo.data[0].bgImg)
		return ownerinfo.data[0].bgImg
	}
	
	//返回数据给客户端
	// return event
};
