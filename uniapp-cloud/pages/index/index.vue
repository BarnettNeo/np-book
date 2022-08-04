<template>
	<pubpage :navigationHasBottomLine="false" title="主页">
		<view slot="contentSection" class="main">
			<view class="User">
				<image @click="updateUserProfile" :src="userInfo.avatarUrl?userInfo.avatarUrl:'/static/unlogin_avatarUrl.png'" mode="widthFix"></image>
				<view class="User_text">
					<view :style="{'color':bgImg?'#fff':'#000'}">{{userInfo.nickName?userInfo.nickName:'昵称'}}</view>
					<view v-if="!isLogin"><text class="np-tag">点击头像同步微信信息</text></view>
				</view>
				<view class="uni-file" :style="bgImg?'background:url('+bgImg+');background-size: cover;background-repeat: no-repeat;':''">
					<uni-tag text="设置背景" @click="chooseImage"
					:circle="true"
					custom-style="background-color: #00aaff; border-color: #00aaff; color: #fff;position: absolute;right: 10rpx;top: 50%;transform: translate(0, -50%);"></uni-tag>
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
		</view>
	</pubpage>
</template>

<script>
	import loginUser from "../../common/currentUser.js"	
	import pubpage from "../../components/pubpage.vue"
	import cloudApi from "../../common/cloudApi.js"
	import { mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	
	export default {
		components:{
			pubpage
		},
		data() {
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
						type:'staff',
						text:'我的关注'
					},
					{
						type:'heart',
						text:'我的喜欢'
					},
					{
						type:'gear',
						text:'设置'
					},
				],
			}
		},
		computed:{
		   ...mapState(['userInfo']),
		   ...mapState(['bgImg']),
		   ...mapGetters(['isLogin']),
		   ...mapGetters(['token']),
		},
		async onLoad(){
			this.setUserInfo(await loginUser.login())			
			console.log('登录token返回',this.userInfo)
			if(this.userInfo){
				this.updateBgImg(this.userInfo.bgImg)
			}
			
		},
		onShow() {
			// console.log(this.isLogin)
		},
		methods: {
			...mapMutations(['setUserInfo','updateBgImg']),
			// ...mapActions(['getUserInfo']),
			updateUserProfile(){
				if(!this.userInfo || !this.userInfo.avatarUrl){
					uni.getUserProfile({
						desc: '信息给哥交出来',
						success: async (res) => {
							let _obj = {...this.userInfo,...res.userInfo}
							this.setUserInfo(_obj);
							// 检测用户背景
							if(!this.userInfo.bgImg){
								cloudApi.call({
									name:"uploadImage",
									data:{
										action:'get',
										code:this.token,
									},
									success: (res) => {
										this.updateBgImg(res.result)
									}
								})
								
							}
							loginUser.updateUserInfo(_obj);
							// this.setUserInfo(await loginUser.login())
							console.log(this.userInfo)
						}
					})
				}

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
						uni.navigateTo({
							url:"../star/star"
						})
						break;
						case 'heart':
						uni.navigateTo({
							url:"../heart/heart"
						})
						break;
						case 'staff':
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
			},
			
			// 设置背景图片上传
			chooseImage(){
				if(!this.isLogin){
					this.updateUserProfile()
					return
				}{
					uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album','camera'], //从相册选择
					success: (res)=> {
						uni.showLoading();
						const filePath = res.tempFilePaths[0]
						console.log(res,filePath)
						var timestamp = (new Date()).valueOf();//新建日期对象并变成时间戳
						uniCloud.uploadFile({
						  cloudPath: timestamp+".jpg", // 上传至云端的路径
						  filePath: filePath, // 小程序临时文件路径
						  success: res => {
							console.log('[上传文件] 成功：', res)
							this.updateBgImg(res.fileID)
							cloudApi.call({
								name:"uploadImage",
								data:{
									action:'add',
									code:this.token,
									bgImg:res.fileID
								},
								success: (res) => {
									console.log(res)
								}
							})

						  },
						  fail: (err) => {
							console.error('[上传文件] 失败：', err)
							return uni.showToast({
								icon:"none",
								mask:true,
								title:"上传失败"
							})
						  },
						  complete: () => {
							uni.hideLoading();
						  }
						})
						
						
						
						
					}
				})
				}
			}
			
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
			image{
				width:200rpx;
				height:200rpx;
				border-radius: 50%;
				// background-color: #8F8F94;
				margin: 20rpx;
				z-index:2;
				border: 1px solid #fff;
			}
			.User_text{
				display: flex;
				flex-direction: column;
				justify-content: center;

				z-index:2;
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
			
			.uni-file{
				position: absolute;
				width: 100%;
				height: 100%;
				border-radius: 50rpx;
				.setUserBg{
					position: absolute;
					top: 50%;
					transform: translate(0,-50%);
					width:200rpx;
					height:100rpx;
					right: 0;
				}
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
