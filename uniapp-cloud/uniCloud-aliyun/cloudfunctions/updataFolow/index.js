'use strict';
// 关注
const {verifyToken} = require('wx-common')

exports.main = async (event, context) => {
	//event为客户端上传的参数
	const db = uniCloud.database();
	const dbCmd = db.command;
	
	const {token,_id,action} = event;
	
	const payload = event.token?verifyToken(event.token):null;
	
	let dbRes;
	
	if(action=="add"){
		// 添加关注
		dbRes = await db.collection('bookshelfs').where({
			_id:dbCmd.eq(event._id)
		})
		.limit(1)
		.get()
		
		const owner = dbRes.data[0]["owner"];
		
		// 获取关注对象信息
		const sheInfo = await db.collection("users").field({_id:false}).where({
			openid:dbCmd.eq(owner)
		}).get();
		
		const {openid,nickName,avatarUrl} = sheInfo.data[0];
		// console.log(openid,nickName,avatarUrl)
		const ownerinfo = await db.collection("users").where({
			openid:dbCmd.eq(payload.openid)
		}).limit(1).update({
			folow:dbCmd.push({
					"id":openid,
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
		dbRes = await db.collection('bookshelfs').where({
			_id:dbCmd.eq(event._id)
		})
		.limit(1)
		.get()
		
		const owner = dbRes.data[0]["owner"];
		console.log(owner,payload.openid)
		
		const ownerinfo = await db.collection("users").where({
			openid:dbCmd.eq(payload.openid),
			"folow.id":dbCmd.eq(owner)
		})
		.limit(1)
		.get()
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
		dbRes = await db.collection('bookshelfs').where({
			_id:dbCmd.eq(event._id)
		})
		.limit(1)
		.get()
		
		const owner = dbRes.data[0]["owner"];
		
		const ownerinfo = await db.collection("users").where({
			openid:dbCmd.eq(payload.openid),
		}).update({
		  folow: dbCmd.pull({
			  "id":dbCmd.eq(owner),
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
		ownerinfo.data[0]["folow"].forEach((item)=>{
			delete item.id
		})
		return ownerinfo.data[0]
	}
	
	//返回数据给客户端
	// return dbRes?dbRes.data:null;
};
