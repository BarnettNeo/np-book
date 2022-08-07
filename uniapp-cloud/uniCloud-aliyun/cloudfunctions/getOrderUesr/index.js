'use strict';
// 获取当前用户信息
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const db = uniCloud.database();
	const dbCmd = db.command;
	const $ = db.command.aggregate
	const {user_id,action,id,fans_id} = event;
	
	if (action=="get"){
		const ownerinfo = await db.collection("users").where({
			_id:dbCmd.eq(user_id),
		})
		.limit(1)
		.get()
		
		// 获取点赞和收藏
		let shelfinfo = await db.collection('bookshelfs')
		  .aggregate()
		  .match({owner:ownerinfo.data[0].openid})
		  .group({
			_id: null,
		    total: $.sum($.sum(['$totalheart', '$totalstar']))
		  })
		  .end()
		// 查询粉丝数
		const fans = await db.collection("users")
		.where({
			"folow.id":dbCmd.eq(user_id)
		}).count()
		
		await db.collection("users").where({
			openid:ownerinfo.data[0].openid
		}).limit(1).update({
			fansLength:fans.total,
			total:shelfinfo.data[0]?shelfinfo.data[0].total:'',
		})
		ownerinfo.data[0]["fansLength"] = fans.total;
		ownerinfo.data[0]["total"] = shelfinfo.data[0]?shelfinfo.data[0].total:'';
		console.log('ownerinfo',ownerinfo)
		return ownerinfo.data[0]
	
	}else if (action=="folowList"){
		// 关注列表
		const ownerinfo = await db.collection("users").field({folow:true}).where({
			openid:dbCmd.eq(id),
		}).limit(1).get()
		return ownerinfo.data[0]
	}else if (action=="fansList"){
		// 粉丝列表
		const fans = await db.collection("users")
		.field({openid:false,folow:false,heart:false,star:false,})
		.where({
			"folow.id":dbCmd.eq(fans_id)
		}).get()
		console.log('fans',fans)
		return fans.data
	}
	
	//返回数据给客户端
	// return event
};
