<template>
	<pubpage :navigationHasBottomLine="false">
		<view slot="contentSection" class="main">
			<view class="User">
				<image @click="updateUserProfile" :src="orderUser.avatarUrl?orderUser.avatarUrl:'/static/unlogin_avatarUrl.png'" mode="widthFix"></image>
				<view class="User_text">
					<view :style="{'color':orderUser.bgImg?'#fff':'#000'}">{{orderUser.nickName?orderUser.nickName:'昵称'}}</view>
				</view>
				<view 
				class="uni-file" 
				:style="orderUser.bgImg?'background:url('+orderUser.bgImg+');background-size: cover;background-repeat: no-repeat;':''">
				</view>
				<pubfolow ref="folow" :user_id="user_id" :orpage="false"></pubfolow>
			</view>
			<view class="user_info">
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
	import pubpage from "../../components/pubpage.vue"
	import cloudApi from "../../common/cloudApi.js"
	import { mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	import pubfolow from "../../components/pubfolow.vue"
	export default {
		components:{
			pubpage,
			pubfolow
		},
		data() {
			return {
				selectList:[
					{
						type:'person',
						text:'书房'
					},
					{
						type:'star',
						text:'收藏'
					}
				],
				user_id:'',
				orderUser:null
			}
		},
		computed:{
			
		},
		onLoad(option) {
			console.log('onLoad',option)
			if(option.id){
				this.user_id = option.id;
				this.getOrderUesr()
			}
		},
		onShow() {
			console.log('页面返回')
			if(this.user_id)this.$refs.folow.getFolow(this.user_id)
		},
		
		methods: {
			getOrderUesr(){
				cloudApi.call({
					name: "getOrderUesr",
					data: {
						action: "get",
						user_id: this.user_id
					},
					success: (res) => {
						// console.log('当前用户',res)
						this.orderUser = res.result;
					}
				})
			},
			loginUserProfile(id){
				console.log(id)
				switch(id){
					case 'person':
					uni.navigateTo({
						url:"../orperson/orperson?id=" + this.orderUser.openid
					})
					break;
					case 'star':
					uni.navigateTo({
						url:"../orstar/orstar?id=" + this.user_id
					})
					break;
				}
					
				
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
			padding: 50rpx 30rpx;
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
						margin: 0 30rpx 0 10rpx;
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
