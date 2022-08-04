<template>
	<view class="orperson-page" style="padding: 10px;">
		<pubheart ref="pubheart"></pubheart>
		
	</view>



</template>

<script>
	import loginUser from "../../common/currentUser.js"	
	import pubheart from "../../components/pubheart.vue"
	
	export default {
		data() {
			return {				

			}
		},

		components:{
			pubheart
		},
		async onLoad(option){			
			if(option){
				// 客态页进来
				this.$refs.pubheart.where = "owner=='" + option.id + "'"
				this.$nextTick(() => {
				  this.$refs.pubheart.$refs.udb.loadData()
				})
				return
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
		
		// 页面卸载
		// onUnload(event){
		// 	console.log('返回')
		// }

	}
</script>

<style lang="less" scoped>
	
	
</style>
