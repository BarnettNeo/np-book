<template>
	<pubpage title="粉丝">
		<view slot="contentSection" class="main-fans">
			<view v-if="fans">
				<view class="fansList" v-for="item in fans" :key="item._id" @click="openPage(item._id)">
					<image :src="item.avatarUrl" mode="widthFix"></image>
					<view class="User_text">
						<view>{{item.nickName}}</view>
					</view>
				</view>
			</view>
			<view v-if="fans.length<1" class="fans_err">暂无粉丝</view>
		</view>
	</pubpage>
</template>

<script>
	import cloudApi from "../../common/cloudApi.js"
	import pubpage from "../../components/pubpage.vue"
	export default {
		components:{
			pubpage
		},
		data() {
			return {
				fans:[],
				id:''
			}
		},
		computed:{
		},
		onLoad(option) {
			if(option)this.id = option.id
		},
		onShow() {
			cloudApi.call({
				name:"getOrderUesr",
				data:{
					action:'fansList',
					fans_id:this.id
				},
				success: (res) => {
					console.log(res)
					this.fans = res.result;
				}
			})
		},
		methods: {
			openPage(id){
				console.log(id)
				uni.navigateTo({
					url:"../../orderpage/index/index?id="+id
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.main-fans{
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		height: 100%;
		overflow-y: auto;
		position: relative;
		.fansList{
			background-color: #fff;
			position: relative;
			display: flex; 
			margin: 10rpx;
			border-radius: 50rpx;
			padding: 0 10rpx;
			border: 1px solid #ccc;
			&:first-child{
				margin-top: 20rpx;
			}
			image{
				width:150rpx;
				height:150rpx;
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
		.fans_err{
			position: absolute;
			left: 50%;
			transform: translate(-50%, -50%);
			top: 50%;
		}
	}
</style>
