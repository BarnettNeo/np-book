<template>
	<view class="heart-page" style="padding: 10px;">
		<pubheart ref="pubheart" :tipsText="'暂无喜欢哦'"></pubheart>
		
	</view>



</template>

<script>
	import loginUser from "../../common/currentUser.js"	
	import { mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	import pubheart from "../../components/pubheart.vue"
	
	export default {
		data() {
			return {				

			}
		},

		components:{
			pubheart
		},
		computed:{
		   ...mapGetters(['token']),
		   ...mapState(['userInfo']),
		},
		async onLoad(){			
			console.log('我的喜欢',this.userInfo._id)
			if(this.userInfo.token){		
				this.$refs.pubheart.where = "heart.user_id=='" + this.userInfo._id + "'"
				this.$nextTick(() => {
				  this.$refs.pubheart.$refs.udb.loadData()
				})
			}
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
