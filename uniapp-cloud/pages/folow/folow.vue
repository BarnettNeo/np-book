<template>
	<pubpage title="我的关注">
		<view slot="contentSection" class="main-folow" v-if="folow">
			<view class="folowList" v-for="item in folow" :key="item._id">
				<image :src="item.url" mode="widthFix"></image>
				<view class="User_text">
					<view>{{item.name}}</view>
				</view>
			</view>
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
				
			}
		},
		computed:{
		   ...mapState(['folow']),
		   ...mapState(['token']),
		},
		onShow() {
			uni.showLoading();
			cloudApi.call({
				name:"updataFolow",
				data:{
					action:'getList',
					code:this.token
				},
				success: (res) => {
					// console.log(res)
					this.updataFolow(res.result.folow)
				},
				complete:()=>{
					uni.hideLoading();
				}
			})
			
		},
		methods: {
			...mapMutations(['updataFolow']),
		}
	}
</script>

<style lang="less" scoped>
	.main-folow{
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		height: 100%;
		.folowList{
			background-color: #fff;
			position: relative;
			display: flex; 
			margin: 20rpx;
			border-radius: 50rpx;
			padding: 0 10rpx;
			border: 1px solid #ccc;
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
	}
</style>
