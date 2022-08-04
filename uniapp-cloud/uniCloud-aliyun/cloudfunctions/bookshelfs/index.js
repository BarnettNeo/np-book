'use strict';
// 书架
const {verifyToken,msgSecCheck} = require('wx-common')

exports.main = async (event, context) => {
	//event为客户端上传的参数
	const db = uniCloud.database();
	const dbCmd = db.command;
	
	const payload = event.token?verifyToken(event.token):null;
	const action = event.action;
	
	const now = new Date().getTime();
	
	let dbRes;
	if(action=="create"){
		
		const resName = await msgSecCheck(payload.openid,event.name);
		const resTitle = await msgSecCheck(payload.openid,event.textTitle);
		const resDesc = await msgSecCheck(payload.openid,event.desc);
		if(resName.result.suggest!="pass"){
			return {err:1,msg:"书房名称内容不安全"};
		}
		if(resDesc.result.suggest!="pass"){
			return {err:2,msg:"书房描述标题不安全"};
		}
		if(resDesc.result.suggest!="pass"){
			return {err:3,msg:"书房描述内容不安全"};
		}
		
		const ownerinfo = await db.collection("users").where({
			openid:dbCmd.eq(payload.openid),
		})
		.limit(1)
		.get()
		
		
		dbRes = await db.collection("bookshelfs").add({
			owner:payload.openid,
			nickName:ownerinfo.data[0].nickName,
			avatarUrl:ownerinfo.data[0].avatarUrl,
			name:event.name,
			textTitle:event.textTitle,
			desc:event.desc,
			address:event.address,
			geopoint:new db.Geo.Point(event.longitude, event.latitude),
			totalbook:0,
			totalstar:0,
			totalheart:0,
			createtime:now,
			updatetime:now,
		})
		
		return dbRes;
	}else if(action=="update"){
		const resName = await msgSecCheck(payload.openid,event.name);
		const resTitle = await msgSecCheck(payload.openid,event.textTitle);
		const resDesc = await msgSecCheck(payload.openid,event.desc);
		if(resName.result.suggest!="pass"){
			return {err:1,msg:"书房名称内容不安全"};
		}
		if(resDesc.result.suggest!="pass"){
			return {err:2,msg:"书房描述标题不安全"};
		}
		if(resDesc.result.suggest!="pass"){
			return {err:3,msg:"书房描述内容不安全"};
		}
		
		dbRes = await db.collection("bookshelfs").where({
			"_id":dbCmd.eq(event._id),
			"owner":dbCmd.eq(payload.openid)
		}).limit(1).update({
			name:event.name,
			textTitle:event.textTitle,
			desc:event.desc,
			address:event.address,
			geopoint:new db.Geo.Point(event.longitude, event.latitude),
			updatetime:now,
		})
		
		return dbRes;
	}else if(action=="delete"){
		dbRes = await db.collection("bookshelfs").where({
			"_id":dbCmd.eq(event._id),
			"owner":dbCmd.eq(payload.openid)
		}).remove();
	}else if(action=="listmy"){
		dbRes = await db.collection('bookshelfs').where({
			owner:dbCmd.eq(payload.openid)
		})
		.orderBy("_id","desc")
		.limit(10)
		.get()
	}else if(action=="listall"){
		dbRes = await db.collection('bookshelfs')
		.orderBy("_id","desc")
		.limit(10)
		.get()
		
		//判断处理是否管理员
		if(dbRes.data){
			dbRes.data.forEach((item,index)=>{
				item.owner == payload.openid ? dbRes.data[index]["isowner"] = true : dbRes.data[index]["isowner"] = false;
				delete item.owner;
			})
		}
		
		
	}else if(action=="listbygeo"){
		// console.log(event.longitude, event.latitude,payload.openid)
	
		dbRes = await db.collection('bookshelfs').where({
			geopoint:dbCmd.geoNear({
				geometry: new db.Geo.Point(event.longitude, event.latitude),
				maxDistance: 1000,
				minDistance: 0
			}
			)
		})
		.limit(10)
		.get()
		
		//判断处理是否管理员 
		if(dbRes.data){
			dbRes.data.forEach((item,index)=>{
				item.owner == payload.openid ? dbRes.data[index]["isowner"] = true : dbRes.data[index]["isowner"] = false;
				delete item.owner;
			})
		}
		
	}else if(action=="get"){
		dbRes = await db.collection('bookshelfs').where({
			_id:dbCmd.eq(event._id)
		})
		.limit(1)
		.get()
		
		const owner = dbRes.data[0]["owner"];
		delete dbRes.data[0]["owner"];
		
		dbRes.data[0]["isowner"] = payload?owner==payload.openid:false;
			
		let checkInfo;
		// 访问当前书房用户
		const ownerinfo = await db.collection("users").field({openid:false}).where({
			openid:dbCmd.eq(owner)
		}).get();
		checkInfo = ownerinfo;
		
		// 当前书房并非管理员
		if(!dbRes.data[0].isowner){
			const myinfo = await db.collection("users").field({openid:false}).where({
				openid:dbCmd.eq(payload.openid)
			}).get();
			checkInfo = myinfo;
		}
		console.log('checkInfo',checkInfo.data[0])
		if(checkInfo.data[0].heart){
			checkInfo.data[0].heart.find((item)=>{
				return dbRes.data[0]["isheart"] = item.id == event._id;
			})
		}
		if(checkInfo.data[0].star){
			checkInfo.data[0].star.find((item)=>{
				return dbRes.data[0]["isstar"] = item.id == event._id;
			})
		}

		
		dbRes.data[0]['ownerinfo'] = ownerinfo.data[0];
		
		return dbRes.data[0];
	}
	
	return dbRes?dbRes.data:null;
};
