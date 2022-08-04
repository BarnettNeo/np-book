'use strict';
const {
	verifyToken
} = require('wx-common')
let doubanbook = require("doubanbook");
exports.main = async (event, context) => {

	const db = uniCloud.database();
	const dbCmd = db.command;

	const {
		isbn,
		shelfid
	} = event;
	const payload = event.token ? verifyToken(event.token) : null;
	const now = new Date().getTime();

	// 查询数据库中是否有该图书
	const bookInfo = await db.collection('isbnlib').where({
		isbn: isbn
	}).get()
	console.log('数据库查询', bookInfo.data[0])
	if (bookInfo.data[0]) {
		const dbBook = await db.collection("books").where({
			isbn: isbn,
			owner: payload.openid,
			shelfid: shelfid,
		}).get()

		console.log('查看个人书房', dbBook)
		if (dbBook.affectedDocs > 0) {
			return {
				state: false,
				msg: '当前书房已存在该书刊'
			}
		} else {
			await db.collection("books").add({
				owner: payload.openid,
				shelfid: shelfid,
				title: bookInfo.data[0].title,
				cover_url: bookInfo.data[0].cover_url,
				isbn: bookInfo.data[0].isbn,
				isbnid: event.isbnid,
				createtime: now,
				updatetime: now,
			});

			const dd = await db.collection("bookshelfs").where({
				_id: shelfid,
				owner: payload.openid,
			}).update({
				totalbook: dbCmd.inc(+1)
			})
			console.log('个人书房',payload.openid,shelfid,dd)
			
			return {
				state: false,
				msg: '已从书库中为您获取到书刊'
			}

		}


	}
	

	let res = await uniCloud.httpclient.request("https://search.douban.com/book/subject_search?search_text=" +
		isbn + "&cat=1001");
	
	console.log('isbn返回',res.data)

	let reg = /window\.__DATA__ = "(.*)"/;
	if (reg.test(res.data)) {
		let bookdata = RegExp.$1;
		let data = doubanbook(bookdata)[0];
		console.log("res.data", data)
		
		// let resDetail = await uniCloud.httpclient.request("https://book.douban.com/subject/" + data.id + "/");
		// console.log('书刊详情',resDetail,resDetail.data)
		// console.log(reg.test(resDetail.data))
		
		// if(reg.test(resDetail.data)){
		// 	let _bookdata = RegExp.$1;
		// 	let _data = doubanbook(_bookdata)[0];
		// 	console.log("书刊详情信息", _data)
		// }
		
		let dbResult = await db.collection("isbnlib").limit(1).where({
			isbn: isbn
		}).get();

		if (dbResult.affectedDocs > 0) {
			return dbResult.data[0];
		}

		// 豆瓣图片上传到云存储
		let coverImage = await uniCloud.httpclient.request(data.cover_url);

		let uploadResult = await uniCloud.uploadFile({
			cloudPath: isbn + ".jpg",
			fileContent: coverImage.data
		})
		let resData = {
			isbn: isbn,
			title: data.title,
			cover_url: uploadResult.fileID,
			abstract: data.abstract,
			rating:data.rating,
			del_id: data.id,
			del_url: data.url,
		}
		// console.log('详情',resData)

		dbResult = await db.collection("isbnlib").add(resData);

		resData["_id"] = dbResult["id"];

		return {
			state:true,
			resData
		};
	}

	返回数据给客户端
	return {
		state:true,
		res
	};
};
