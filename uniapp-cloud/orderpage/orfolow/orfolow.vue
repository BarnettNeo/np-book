<template>
	<pubpage title="关注">
		<view slot="contentSection" class="main-folow">
			<view v-if="folow">
				<view class="folowList" v-for="item in folow" :key="item.id" @click="openPage(item.id)">
					<image :src="item.url" mode="widthFix"></image>
					<view class="User_text">
						<view>{{item.name}}</view>
					</view>
				</view>
			</view>
			<view v-if="folow.length<1" class="folow_err">暂无关注</view>
		</view>
	</pubpage>
</template>

<script>
	import cloudApi from "../../common/cloudApi.js"
	import pubpage from "../../components/pubpage.vue"
	import { mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	export default {
		components:{
			pubpage
		},
		data() {
			return {
				folow:[],
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
					action:'folowList',
					id:this.id
				},
				success: (res) => {
					console.log(res)
					this.folow = res.result.folow;
				}
			})
			return
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
	.main-folow{
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		height: 100%;
		overflow-y: auto;
		position: relative;
		.folowList{
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
		.folow_err{
			position: absolute;
			left: 50%;
			transform: translate(-50%, -50%);
			top: 50%;
		}
	}
</style>
