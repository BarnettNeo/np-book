<template>
	<view class="content">
		<image class="logo" :src="userInfo.avatarUrl"></image>
		<view class="text-area">
			<text class="title">{{userInfo.nickName}}</text>
		</view>
		<button @click="getUserInfo()">获取用户信息</button>
	</view>
</template>

<script>
	
	import cloudApi from "../../common/cloudApi.js"
	
	export default {
		data() {
			return {
				title: 'Hello',
				userName:'用户名',
				avatarUrl:'',
				userInfo:null
			}
			
		},
		onLoad() {
			let _this = this;
			uni.login({
				provider: 'weixin',
				success (res) {
					if (res.code) {
					  //发起网络请求
					  var code = res.code;
					  
					 //  uniCloud.callFunction({
						// name:"login",
						// data:{
						// 	code:code
						// },
						// success:(res)=> {
						// 	console.log(res)
						// 	// _this.userName = res.result;
						// },
											
					 //  })
					 
					 // console.log(code)
					 
					 cloudApi.call({
						name:"login",
						data:{
							code:code
						},
						success:(res)=> {
							console.log(res)
							_this.userInfo = res.result;
						},
					 })
					  
					} else {
					  console.log('登录失败！' + res.errMsg)
					}
				}
			})
		},
		methods: {
			getUserInfo(){
				uni.getUserProfile({
					desc:'我来获取信息了',
					success:(res)=> {
						console.log(res)
						// this.userName = res.userInfo.nickName;
						// this.avatarUrl = res.userInfo.avatarUrl;
						
						this.userInfo = Object.assign(this.userInfo,res.userInfo)
						console.log(this.userInfo)
						cloudApi.call({
							name:"updateuserinfo",
							data:{
								userInfo:this.userInfo
							},
							success:(res)=>{
								console.log(res)
								
								
							}
								
						})
						
					}
				})
				
				
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
