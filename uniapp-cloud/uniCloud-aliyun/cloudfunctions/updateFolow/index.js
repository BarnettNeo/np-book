'use strict';
// 关注
const {verifyToken} = require('wx-common')

exports.main = async (event, context) => {
	//event为客户端上传的参数
	const db = uniCloud.database();
	const dbCmd = db.command;
	
	const {token,user_id,action} = event;
	
	const payload = event.token?verifyToken(event.token):null;
		
	let dbRes;
	
	if(action=="add"){
		// 获取关注对象信息
		const sheInfo = await db.collection("users").where({
			_id:dbCmd.eq(user_id)
		}).get();
		
		console.log('sheInfo',sheInfo)
		
		const {_id,nickName,avatarUrl} = sheInfo.data[0];
		// console.log(openid,nickName,avatarUrl)
		const ownerinfo = await db.collection("users").where({
			openid:dbCmd.eq(payload.openid)
		}).limit(1).update({
			folow:dbCmd.push({
					"id":_id,
					"name":nickName,
					"url":avatarUrl,
				})
		})
		.then((res)=>{
			return{
				state:true,
				msg:'添加关注成功'
			}
		}).catch((err)=>{
			return{
				state:true,
				msg:'添加关注失败'
			}
		})
		return ownerinfo
		
	}else if (action=="get"){
		// 检查关注
		console.log('检查',payload.openid,user_id)
		const ownerinfo = await db.collection("users").where({
			openid:dbCmd.eq(payload.openid),
			"folow.id":dbCmd.eq(user_id)
		})
		.limit(1)
		.get()
		console.log('检查ownerinfo',ownerinfo)
		if(ownerinfo.data[0]){
			return{
				state:true,
				msg:'该用户已关注'
			}
		}else{
			return{
				state:false,
				msg:'该用户未关注'
			}
		}

	}else if (action=="delete"){
		// 取消关注
		
		const ownerinfo = await db.collection("users").where({
			openid:dbCmd.eq(payload.openid),
		}).update({
		  folow: dbCmd.pull({
			  "id":dbCmd.eq(user_id),
		  })
		})
		
		return{
			state:false,
			msg:'该用户取消关注成功'
		}
	}else if (action=="getList"){
		// 关注列表
		const ownerinfo = await db.collection("users").field({folow:true}).where({
			openid:dbCmd.eq(payload.openid),
		}).limit(1).get()
		return ownerinfo.data[0]
	}else if (action=="getFansList"){
		// 粉丝列表
		const ownerinfo = await db.collection("users").field({_id:true}).where({
			openid:dbCmd.eq(payload.openid),
		}).limit(1).get()
		let ownerId = ownerinfo.data[0]._id;
		const fans = await db.collection("users")
		.field({openid:false,folow:false,heart:false,star:false,})
		.where({
			"folow.id":dbCmd.eq(ownerId)
		}).get()
		return fans.data
	}
	
	//返回数据给客户端
	// return dbRes?dbRes.data:null;
};
