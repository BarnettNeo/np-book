<template>
	<view class="pubfooter">
		<view style="display: flex;align-items: center;">
			<view class="heart" @click="updateHeart()">
				<uni-icons :type="dbHeart.inverted?'heart-filled':'heart'" size="20" color="#00aaff"></uni-icons>
				<text>{{dbHeart.count}}</text>
			</view>
			<view class="star" style="margin: 0 30rpx 0 40rpx;" @click="updateStar()">
				<uni-icons :type="dbStar.inverted?'star-filled':'star'" size="20" color="#00aaff"></uni-icons>
				<text>{{dbStar.count}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import cloudApi from "../common/cloudApi.js"
	import { mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	export default {
		name:"pubfooter",
		data() {
			return {
				dbHeart:{
					loading:false,
					inverted:false,
					count:0
				},
				dbStar:{
					loading:false,
					inverted:false,
					count:0
				},
			};
		},
		computed:{
			...mapGetters(['token']),
		},
		watch:{
			isheart(cur){
				this.dbHeart.inverted = cur;
			},
			totalheart(cur){
				this.dbHeart.count = cur;
			},
			isstar(cur){
				this.dbStar.inverted = cur;
			},
			totalstar(cur){
				this.dbStar.count = cur;
			}
		},
		props:{
			heart:{
				type:Array,
				default:[]
			},
			star:{
				type:Array,
				default:[]
			},
			totalheart:{
				type:Number,
				default:0
			},
			totalstar:{
				type:Number,
				default:0
			},
			isheart:{
				type:Boolean,
				default:false
			},
			isstar:{
				type:Boolean,
				default:false
			},
			shelfid:{
				type:String,
				default:''
			},
		},
		methods:{
			// 更新点赞
			updateHeart(){
				if (this.dbHeart.loading) return
				
				uni.hideLoading();
				if (this.dbHeart.inverted) {
					// 取消喜欢
					this.dbHeart.loading = true;
					uni.showModal({
						content: "确定取消喜欢吗?",
						success: (res) => {
							if (res.confirm) {
								this.dbHeart.loading = true;
								cloudApi.call({
									name: "updateHeart",
									data: {
										action: "delete",
										token: this.token,
										_id: this.shelfid,
									},
									loading:false,
									success: (res) => {
										console.log(res)
										this.dbHeart.loading = false;
										this.updateHeartType('dbHeart',false,-1)
									}
								})
							}else{
								this.dbHeart.loading = false;
							}
						},
					})
				}else{
					console.log('喜欢')
					this.dbHeart.loading = true;
					cloudApi.call({
						name: "updateHeart",
						data: {
							action: "add",
							token: this.token,
							_id: this.shelfid
						},
						loading:false,
						success: (res) => {
							console.log(res)
							this.dbHeart.loading = false;
							this.updateHeartType('dbHeart',true,1)
						},
					})
				}
			},
			
			// 状态变化
			updateHeartType(select,type,num){
				console.log(select,type,num)
				if(select == 'dbHeart'){
					this.dbHeart.inverted = type;
					this.dbHeart.count += num;
					return
				}
				if(select == 'dbStar'){
					this.dbStar.inverted = type;
					this.dbStar.count += num;
					return
				}
			},
			
			// 更新收藏
			updateStar(){
				if (this.dbStar.loading) return
				
				uni.hideLoading();
				if (this.dbStar.inverted) {
					// 取消收藏
					this.dbStar.loading = true;
					uni.showModal({
						content: "确定取消收藏吗?",
						success: (res) => {
							if (res.confirm) {
								this.dbStar.loading = true;
								cloudApi.call({
									name: "updateStar",
									data: {
										action: "delete",
										token: this.token,
										_id: this.shelfid,
									},
									loading:false,
									success: (res) => {
										console.log(res)
										this.dbStar.loading = false;
										this.updateHeartType('dbStar',false,-1)
										uni.showModal({
											content: '取消收藏成功',
											showCancel: false
										});
									}
								})
							}else{
								this.dbStar.loading = false;
							}
						},
					})
				}else{
					console.log('收藏')
					this.dbStar.loading = true;
					cloudApi.call({
						name: "updateStar",
						data: {
							action: "add",
							token: this.token,
							_id: this.shelfid
						},
						loading:false,
						success: (res) => {
							console.log(res)
							this.dbStar.loading = false;
							this.updateHeartType('dbStar',true,1)
							uni.showModal({
								content: '收藏成功',
								showCancel: false
							});
						},
					})
				}
			},
		}
	}
</script>

<style lang="less">
	.pubfooter{
		position: relative;
		background-color: #fff;
		width: 100%;
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		border-top: 1px solid #00aaff;
		.heart,.star{
			display: flex;
			align-items: center;
			text{
				margin-left: 10rpx;
			}
		}
	}
</style>