<template>
	<view class="home-page" style="padding: 10px;">
		<view v-if="isTips" style="text-align: center;margin-bottom: 10rpx;color: #999;font-size: 12px;">上拉刷新获取最新信息</view>
		<pubheart ref="pubheart"></pubheart>
	</view>



</template>

<script>
	import loginUser from "../../common/currentUser.js"	
	import { mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	import pubheart from "../../components/pubheart.vue"
	
	export default {
		data() {
			return {				
				isTips:false
			}
		},
		components:{
			pubheart
		},
		computed:{
		   ...mapGetters(['token']),
		   ...mapState(['userInfo']),
		},
		// async onShow() {
		// 	if(!this.userInfo){
		// 		this.setUserInfo(await loginUser.login())
		// 	}
		// },
		async onLoad(options){			
			this.setUserInfo(await loginUser.login())			
			console.log('登录token返回',this.userInfo)
			if(this.userInfo.token){				
				this.$refs.pubheart.$refs.udb.loadData()
				this.isTips = true;
				// console.log(this.$refs.pubheart.$refs.udb)
			}
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
		methods:{
			...mapMutations(['setUserInfo']),
		},
		onPullDownRefresh() { //下拉刷新
		    this.$refs.pubheart.$refs.udb.loadData({
				clear: true //可选参数，是否清空数据
		    }, () => {
				this.$refs.pubheart.dbData = []
				uni.stopPullDownRefresh()
		    })
		},
		onReachBottom() { //滚动到底翻页
			this.$refs.pubheart.$refs.udb.loadMore()
		},

	}
</script>

<style lang="less" scoped>
	
	
</style>
