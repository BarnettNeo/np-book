<template>
	<view class="home-page" style="padding: 10px;">
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, error, options}"
		  :options="options"
		  collection="bookshelfs"
		  orderby="createtime desc"
		  :field="field"
		  :getone="false"
		  :action="action"
		  page-size="8"
		  :where="where"
		  @load="onqueryload" @error="onqueryerror">
		  <view v-if="error" class="error">{{error.message}}</view>
		  <view v-else class="list">
			<view v-for="item in data" :key="item._id" style="margin-bottom: 10px;">
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
						<image :src="item.avatarUrl"></image>
						<text>{{item.nickName}}</text>
					</view>
				</view>
			</view>
		  </view>
		  <view v-if="loading" class="loading">加载中...</view>
		</unicloud-db>
		
		
	</view>



</template>

<script>
	import loginUser from "../../common/currentUser.js"	
	import cloudApi from "../../common/cloudApi.js"
	import { mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	
	
	export default {
		data() {
			return {
				dataList:[],
				
				options: {}, // 插槽不能访问外面的数据，通过此参数传递, 不支持传递函数
				action: '',
				where: {}, // 类型为对象或字符串
				field:'name,nickName,avatarUrl,totalbook,createtime,geopoint'
			}
		},
		computed:{
		   ...mapGetters(['token']),
		   ...mapState(['userInfo']),
		},
		async onLoad(options){
			// this.getBookshelfs();
			this.setUserInfo(await loginUser.login())			
			console.log('登录token返回',this.userInfo)
			// 检查是否通过分享进来
			if(options.scene){
				var scene = unescape(options.scene);
				var params = scene.split("=");
				var key = params[0];
				
				uni.navigateTo({
					url:"../bookshelf/bookshelf?id="+params[1]
				})
			}
		},
		methods: {
			...mapMutations(['setUserInfo','updateBgImg']),
			btnCreateBookShelf(){
				uni.navigateTo({
					url:"../createbookshelf/createbookshelf"
				})
			},
			getBookshelfs(){
				cloudApi.call({
					name:"bookshelfs",
					data:{
						action:"listall",
						lastId:0
					},
					success:(res)=>{
						console.log(res);
						this.dataList = res.result;
					}
				})
			},
			btnEnter(_id){
				uni.navigateTo({
					url:"../../pages/bookshelf/bookshelf?id="+_id
				})
			},
			
			onqueryload(data, ended) {
				// 可在此处预处理数据，然后再渲染界面
				console.log('onqueryload',data, ended)
		    },
		    onqueryerror(e) {
				// 加载数据失败
				console.log('onqueryerror',e)
		    }
		},
		 onPullDownRefresh() { //下拉刷新
		    this.$refs.udb.loadData({
				clear: true //可选参数，是否清空数据
		    }, () => {
				uni.stopPullDownRefresh()
		    })
		},
		onReachBottom() { //滚动到底翻页
			this.$refs.udb.loadMore()
		},
			
			
		// 下拉刷新
		// onPullDownRefresh() {
		// 	console.log('refresh');
		// 	setTimeout(function () {
		// 		uni.stopPullDownRefresh();
		// 	}, 1000);
		// }
	}
</script>

<style lang="less" scoped>
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
			align-items: center;
			margin: 10rpx 0;
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
	
</style>
