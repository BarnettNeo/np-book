import cloudApi from "./cloudApi.js"

var userInfo;

function login(){
	return new Promise((resolve,reject)=>{
		if(isLogin()){
			resolve(userInfo);
		}else{
			uni.login({
				provider:"weixin",
				success: (res) => {
					cloudApi.call({
						name:"login",
						data:{
							code:res.code
						},
						success: (res) => {
							userInfo = res.result;
							resolve(res.result);
						},
						fail: (err) => {
							reject();
						}
					})
				}
			})
		}
	})
}

function logout(){
	return userInfo = null;
}

function isLogin(){
	return userInfo!=null;
}

function getUserInfo(){
	return userInfo;
}

function updateUserInfo(userInfo){
	return cloudApi.call({
		name:"updateUserProfile",
		data:{
			userInfo:userInfo
		},
		success: (res) => {
			return res.result
		}
	})
}

module.exports = {
	isLogin:isLogin,
	getUserInfo:getUserInfo,
	updateUserInfo:updateUserInfo,
	login:login,
	logout:logout
}