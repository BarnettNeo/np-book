<template>
	<pubpage :navigationHasBottomLine="false" title="主页">
		<view slot="contentSection" class="main">
			<view class="User">
				<image @click="updateUserProfile" :src="userInfo.avatarUrl?userInfo.avatarUrl:'/static/unlogin_avatarUrl.png'" mode="widthFix"></image>
				<view class="User_text">
					<view>{{userInfo.nickName?userInfo.nickName:'昵称'}}</view>
					<view v-if="!isLogin"><text class="np-tag">点击头像同步微信信息</text></view>
				</view>
			</view>
			<view class="user_info">
				<view class="tit">我的信息</view>
				<view class="pub_button"
				@click="loginUserProfile(k.type)"
				v-for="(k,v) of selectList"
				:key="k.type">
					<view class="text">
						<uni-icons :type="k.type" size="20" color="#00aaff"></uni-icons>
						<text>{{k.text}}</text>
					</view>
					<uni-icons type="right" size="20"></uni-icons>
				</view>
			</view>

			
			<!-- <view v-if="!isLogin" @click="updateUserProfile" class="np-blockbutton">授权登录</view>
			<view v-if="isLogin" @click="loginUserProfile" class="np-blockbutton">个人中心</view>
			<view v-if="isLogin" @click="logOutUserProfile" class="np-blockbutton">退出登录</view> -->
			
			<!-- <view class="tips">Welcome to here！</view> -->
		</view>
	</pubpage>
</template>

<script>
	import loginUser from "../../common/currentUser.js"	
	import pubpage from "../../components/pubpage.vue"
	import { mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	
	export default {
		components:{
			pubpage
		},
		data() {
			// unlogin_avatarUrl = require('/static/unlogin_avatarUrl.png')
			return {
				// userInfo:null,
				// isLogin:false,
				selectList:[
					{
						type:'person',
						text:'我的书房'
					},
					{
						type:'star',
						text:'我的收藏'
					},
					{
						type:'heart',
						text:'我的关注'
					},
					{
						type:'gear',
						text:'设置'
					},
				]
			}
		},
		computed:{
		   ...mapState(['userInfo']),
		   ...mapGetters(['isLogin']),
		},
		async onLoad(options){
			this.setUserInfo(await loginUser.login())			
			console.log('登录token返回',this.userInfo)
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
			// console.log(this.isLogin)
		},
		methods: {
			...mapMutations(['setUserInfo']),
			// ...mapActions(['getUserInfo']),
			updateUserProfile(){
				uni.getUserProfile({
					desc: '信息给哥交出来',
					success: (res) => {
						let _obj = {...this.userInfo,...res.userInfo}
						this.setUserInfo(_obj);
						loginUser.updateUserInfo(_obj);
					}
				})
			},
			loginUserProfile(id){
				if(!this.isLogin){
					this.updateUserProfile()
					return
				}{
					console.log(id)
					switch(id){
						case 'person':
						uni.navigateTo({
							url:"../person/person"
						})
						break;
						case 'star':
						
						break;
						case 'heart':
						uni.navigateTo({
							url:"../folow/folow"
						})
						break;
						case 'gear':
						uni.navigateTo({
							url:"../gear/gear"
						})
						break;
					}
					
				}
				// uni.navigateTo({
				// 	url:"../person/person"
				// })
			},
			
		}
	}
</script>

<style lang="less" scoped>
	.main{
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		height: 100%;
		.User{
			background-color: #fff;
			position: relative;
			display: flex; 
			margin: 10rpx;
			border-radius: 50rpx;
			padding: 0 10rpx;
			image{
				width:200rpx;
				height:200rpx;
				border-radius: 50%;
				// background-color: #8F8F94;
				margin: 20rpx;
			}
			.User_text{
				display: flex;
				flex-direction: column;
				justify-content: center;
				margin-left: 10rpx;
				view{
					margin: 10rpx 0;
				}
				.np-tag{
					padding: 0 5px;
					border-radius: 5px;
					background-color: #00aaff;
				}
			}
		
			.np-blockbutton{
				margin: 20px auto ;
				width: 90%;
			}
		}
		
		.user_info{
			position: relative;
			flex: 1;
			border-radius: 50rpx;
			background-color: #fff;
			margin: 10rpx;
			padding: 0 30rpx;
			.tit{
				font-size: 55rpx;
				display: block;
				margin: 40rpx 0;
			}
			.pub_button{
				display: flex;
				justify-content: space-between;
				padding-bottom: 30rpx;
				border-bottom: 5rpx solid #e5e5e5;
				margin-bottom: 30rpx;
				.text{
					display: flex;
					align-items: center;
					uni-icons{
						margin: 0 10rpx;
					}
				}
			}
		}
	}

	
	.tips{
		text-align: center;
		margin-top: 50px;
		font-size: 20px;
	}
</style>
