'use strict';
// 获取当前用户信息
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const db = uniCloud.database();
	const dbCmd = db.command;
	const {user_id,action} = event;
	
	if (action=="get"){
		const ownerinfo = await db.collection("users").where({
			_id:dbCmd.eq(user_id),
		})
		.limit(1)
		.get()
		console.log('ownerinfo',ownerinfo)
		return ownerinfo.data[0]
	
	}
	
	//返回数据给客户端
	// return event
};
