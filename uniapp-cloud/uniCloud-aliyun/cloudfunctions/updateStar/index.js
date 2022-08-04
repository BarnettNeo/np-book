'use strict';
const {verifyToken} = require('wx-common')
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const db = uniCloud.database();
	const dbCmd = db.command;
	
	const {token,_id,action} = event;
	
	const payload = event.token?verifyToken(event.token):null;
	
	let dbRes;
	
	if(action=="add"){

		await db.collection("users").where({
			openid:dbCmd.eq(payload.openid)
		}).limit(1).update({
			star:dbCmd.push({"id":_id})
		})
		
		const ownerinfo = await db.collection("users").where({
			openid:dbCmd.eq(payload.openid)
		}).limit(1).get()
		
		const user_id = ownerinfo.data[0]._id;
		console.log('加收藏',ownerinfo,user_id)
		
		// 添加收藏
		dbRes = await db.collection('bookshelfs').field({owner:false}).where({
			_id:dbCmd.eq(event._id)
		}).update({
			star:dbCmd.push({"user_id":user_id,}),
			totalstar: dbCmd.inc(1)
		})
		return{
			state:true,
			msg:'收藏成功',
			user_id:user_id
		}
		
	}else if (action=="delete"){
		
		const ownerinfo = await db.collection("users").where({
			openid:dbCmd.eq(payload.openid)
		}).limit(1).get()
		
		const user_id = ownerinfo.data[0]._id;
		console.log(user_id)
		
		// 取消收藏
		dbRes = await db.collection('bookshelfs').where({
			_id:dbCmd.eq(event._id)
		}).update({
		  star: dbCmd.pull({
			  "user_id":dbCmd.eq(user_id)
		  }),
		  totalstar: dbCmd.inc(-1)
		})
		console.log(dbRes)
		
		await db.collection("users").where({
			openid:dbCmd.eq(payload.openid),
		}).update({
		  star: dbCmd.pull({
			  "id":dbCmd.eq(event._id),
		  })
		})
		
		return{
			state:false,
			msg:'取消收藏成功',
			user_id:user_id
		}
	}
	
	//返回数据给客户端
	// return event
};
