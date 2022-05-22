<template>
	<pubpage :navigationHasBottomLine="false">
		<view slot="contentSection">
			<view  class="User">
				<image @click="updateUserProfile" :src="userInfo.avatarUrl" mode="widthFix"></image>
				<view>{{userInfo.nickName}}</view>
				<view><text class="np-tag">点击头像同步微信信息</text></view>
				<view v-if="!isLogin" @click="updateUserProfile" class="np-blockbutton">点击登录</view>
				<view v-if="isLogin" @click="loginUserProfile" class="np-blockbutton">个人中心</view>
			</view>
			<view class="tips">Welcome to here！</view>
		</view>
	</pubpage>
</template>

<script>
	import loginUser from "../../common/currentUser.js"	
	import pubpage from "../../components/pubpage.vue"
	
	export default {
		components:{
			pubpage
		},
		data() {
			return {
				userInfo:null,
				isLogin:false,
			}
		},
		async onLoad(options){
			this.userInfo = await loginUser.login();
			console.log('登录token返回',this.userInfo)
			if(this.userInfo){
				this.isLogin = true;
			}
			
			if(options.scene){
				var scene = unescape(options.scene);
				var params = scene.split("=");
				var key = params[0];
				
				uni.navigateTo({
					url:"../bookshelf/bookshelf?id="+params[1]
				})
			}
		},
		onShow() {

		},
		methods: {
			updateUserProfile(){
				uni.getUserProfile({
					desc: '信息给哥交出来',
					success: (res) => {
						this.userInfo = Object.assign(this.userInfo,res.userInfo);
						loginUser.updateUserInfo(this.userInfo);
						this.isLogin = true;
					}
				})
			},
			loginUserProfile(){
				uni.navigateTo({
					url:"../index/index"
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.User{
		text-align: center;
		background-color: #fff;
		image{
			width:100px;
			height:100px;
			border-radius: 50px;
			background-color: #8F8F94;
		}
		.np-tag{
			padding: 0 5px;
			border-radius: 5px;
			background-color: #00aaff;
		}
		.np-blockbutton{
			margin: 20px auto ;
			width: 90%;
		}
	}
	.tips{
		text-align: center;
		margin-top: 50px;
		font-size: 20px;
	}
</style>
