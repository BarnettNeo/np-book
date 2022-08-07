<template>
	<view>
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, error, options}"
		  :options="options"
		  collection="bookshelfs"
		  orderby="createtime desc"
		  :field="field"
		  :getone="false"
		  :action="action"
		  page-size="8"
		  :where="where"
		  manual="true"
		  @load="onqueryload" @error="onqueryerror">
		  <view v-if="error" class="error">{{error.message}}</view>
		  <view v-else class="list">
			<view v-for="item in dbData" :key="item._id" style="margin-bottom: 10px;">
				<view style="position: relative;">
					<view @click="btnEnter(item._id)" class="cont-item">
						<view class="tit">
							<view class="name">
								<text class="text-name">{{item.name}}</text>
								<text class="totalbook">({{item.totalbook}}本藏书)</text>
							</view>
						</view>
						<view>
							<image mode="aspectFill" :src="'http://api.map.baidu.com/staticimage/v2?ak=6ae2e0c384df712820d0a2fa4ddcffc6&zoom=17&coordtype=gcj02ll&center='+item.geopoint.coordinates[0]+','+item.geopoint.coordinates[1]" style="width:100%;height:80px;vertical-align: middle;"></image>
						</view>
						<view class="user_info">
							<view class="user">
								<image :src="item.avatarUrl"></image>
								<text>{{item.nickName}}</text>
							</view>
					
						</view>
					</view>
					<view class="star_info" @click="updateHeart(item.inverted,item._id)">
						<uni-icons :type="item.inverted?'heart-filled':'heart'" size="20" color="#00aaff"></uni-icons>
						<text>{{item.totalheart?item.totalheart:0}}</text>
					</view>
				</view>
		
			</view>
		  </view>
		  <!-- <view v-if="loading" class="loading">加载中...</view> -->
		</unicloud-db>
		<view class="tips" v-if="Tips">{{tipsText}}</view>
	</view>
</template>

<script>
	import loginUser from "../common/currentUser.js"	
	import cloudApi from "../common/cloudApi.js"
	import { mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	
	export default {
		name:"pubheart",
		props:{
			tipsText:{
				type:String,
				default:'暂无数据'
			}
		},
		data() {
			return {				
				options: {}, // 插槽不能访问外面的数据，通过此参数传递, 不支持传递函数
				action: '',
				where: {}, // 类型为对象或字符串
				field:'name,nickName,avatarUrl,totalbook,createtime,geopoint,totalheart,heart',
				heart:{
					loading:false,
				},
				Tips:false,
				dbData:[] // 存本地用来响应式喜欢状态
			}
		},
		watch:{
			'dbData':{
				handler: function(cur) {
					cur.length<1?this.Tips=true:this.Tips=false; 
				},
				immediate:true
			}
		},
		computed:{
		   ...mapGetters(['token']),
		   ...mapState(['userInfo']),
		},
		methods: {
			...mapMutations(['setUserInfo']),
			btnEnter(_id){
				// console.log(this.userInfo)
				if(!this.userInfo || !this.userInfo.avatarUrl){
					uni.getUserProfile({
						desc: '信息给哥交出来',
						success: async (res) => {
							let _obj = {...this.userInfo,...res.userInfo}
							loginUser.updateUserInfo(_obj).then((res)=>{
								this.setUserInfo(res.result);
								console.log(this.userInfo)
							});
							// this.setUserInfo(await loginUser.login())
							uni.navigateTo({
								url:"../../pages/bookshelf/bookshelf?id="+_id
							})
						}
					})
				}else{
					uni.navigateTo({
						url:"../../pages/bookshelf/bookshelf?id="+_id
					})
				}

			},
			
			onqueryload(data, ended) {
				// 可在此处预处理数据，然后再渲染界面
				data.forEach((item)=>{
					if(item.heart){
						item.heart.find((k)=>{
							if(this.userInfo){
								this.userInfo._id == k.user_id ? item.inverted = true : '';
							}
						})
					}
				})
				this.dbData = [...this.dbData,...data]
				// console.log('onqueryload',data, ended)
				console.log(this.dbData)
		    },
		    onqueryerror(e) {
				// 加载数据失败
				console.log('onqueryerror',e)
		    },	
			updateHeart(isTes,id){
				if (this.heart.loading) return
				
				uni.hideLoading();
				if (isTes) {
					// 取消喜欢
					this.heart.loading = true;
					uni.showModal({
						content: "确定取消喜欢吗?",
						success: (res) => {
							if (res.confirm) {
								this.heart.loading = true;
								cloudApi.call({
									name: "updateHeart",
									data: {
										action: "delete",
										token: this.token,
										_id: id,
									},
									loading:true,
									success: (res) => {
										console.log(res)
										this.heart.loading = false;
										this.updateHeartType(id,false,-1)
									}
								})
							}else{
								this.heart.loading = false;
							}
						},
					})
				}else{
					console.log('点赞喜欢')
					this.heart.loading = true;
					cloudApi.call({
						name: "updateHeart",
						data: {
							action: "add",
							token: this.token,
							_id: id
						},
						loading:true,
						success: (res) => {
							console.log(res)
							this.heart.loading = false;
							this.updateHeartType(id,true,1)
						},
					})
				}
			},
			
			// 点赞状态
			updateHeartType(_userId,type,num){
				console.log(_userId,type,num)
				this.dbData.find((item)=>{
					if(item._id == _userId){
						item.inverted = type;
						item.totalheart += num;
						return
					}
				})
				// console.log(this.dbData)
			}
			
			
		},

	}
</script>

<style lang="less">
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
	
	.cont-item{
		width: 100%;
		background-color: #fff;
		border-radius: 8px;
		border: 1px solid #ccc;
		overflow: hidden;
		position: relative;
		.tit{
			height:30px;
			line-height: 30px;
			font-size: 18px;
			padding:0px 20rpx;
			display: flex;
			justify-content: space-between;
			.name{
				flex:1;
				display: flex;
				.text-name{
					text-overflow: ellipsis;
					white-space: nowrap;
					overflow: hidden;
					position: relative;
					max-width: 500rpx;
					display: inline-block;
				}
				.totalbook{
					color:#999;
					font-size: 12px;
					margin-left: 5px;
					display: inline-block;
				}
			}
		}
		.user_info{
			display: flex;
			justify-content: space-between;
			margin: 10rpx 0;
			.user{
				display: flex;
				align-items: center;
				image{
					width:80rpx;
					height:80rpx;
					border-radius: 50%;
					margin: 0 10rpx;
				}
				text{
					margin-left: 20rpx;
				}
			}
		}
	}
	.star_info{
		position: absolute;
		bottom: 25rpx;
		right: 20rpx;
		display: flex;
		align-items: center;
		text{
			margin-left: 10rpx;
		}
	}
	.tips{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
</style>