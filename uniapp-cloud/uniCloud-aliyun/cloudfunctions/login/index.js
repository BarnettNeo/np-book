'use strict';

const {appId,appSecret,getToken} = require('wx-common')

const db = uniCloud.database();
const dbCmd = db.command;

exports.main = async (event, context) => {
	const { code } = event;
	const $ = db.command.aggregate
	
	//GET https://api.weixin.qq.com/sns/jscode2session?appid=APPID&secret=SECRET&js_code=JSCODE&grant_type=authorization_code
	const res = await uniCloud.httpclient.request(
		"https://api.weixin.qq.com/sns/jscode2session?appid="+appId+"&secret="+appSecret+"&js_code="+code+"&grant_type=authorization_code",
		{
			dataType:"json"
		}
	)
	
	const openid = res.data.openid;
	
	let dbRes = await db.collection("users").where({
		openid:openid
	}).limit(1).get();
	
	// 获取点赞和收藏
	let shelfinfo = await db.collection('bookshelfs')
	  .aggregate()
	  .match({owner:openid})
	  .group({
		_id: null,
	    total: $.sum($.sum(['$totalheart', '$totalstar']))
	  })
	  .end()
	// console.log('shelfinfo',shelfinfo)
	
	// 查询粉丝数
	let ownerId = dbRes.data[0]._id;
	const fans = await db.collection("users")
	.where({
		"folow.id":dbCmd.eq(ownerId)
	}).count()
	await db.collection("users").where({
		openid:openid
	}).limit(1).update({
		fansLength:fans.total,
		total:shelfinfo.data[0].total,
	})
	dbRes.data[0]["fansLength"] = fans.total;
	dbRes.data[0]["total"] = shelfinfo.data[0].total;

	  
	
	let token = getToken(openid);
	
	let userData;
	if(dbRes.affectedDocs<=0){
		userData = {
			nickName:"微信用户",
			avatarUrl:"",
			gender:0,
			country:"",
			province:"",
			city:"",
			folow:[],
			heart:[],
			star:[],
			bgImg:''
			
		}
		//不要泄露用户的openid
		await db.collection("users").add({openid:openid,...userData});
		console.log('login',userData)
	}else{
		// 拿数据库信息
		userData = dbRes.data[0];
		
		if(dbRes.data[0].folow)
		userData["folow"].forEach((item)=>{
			delete item.id
		})
		//不要泄露用户的openid
		delete userData["openid"];
	}
	userData["token"]=token;
	
	return userData;
};
