<template>
	<pubpage title="设置">
		<view slot="contentSection" >
			<view v-if="isLogin" @click="logOutUserProfile" class="np-blockbutton" style="margin: 30rpx 0;">退出登录</view>
		</view>
	</pubpage>
</template>

<script>
	import cloudApi from "../../common/cloudApi.js"
	import pubpage from "../../components/pubpage.vue"
	import {mapState, mapGetters,mapMutations} from 'vuex'
	
	export default {
		components:{
			pubpage
		},
		data() {
			return {
				latitude:"",
				longitude:"",
				markers:[]
			}
		},
		computed:{
			...mapState(['userInfo']),
			...mapGetters(['isLogin']),
		},
		onShow() {
		},
		methods: {
			...mapMutations(['setUserInfo','updateBgImg']),
			logOutUserProfile(){
				this.setUserInfo(null)
				this.updateBgImg(null)
				console.log('退出登录',this.isLogin,this.userInfo)
				uni.navigateBack()
			}
		}
	}
</script>

<style>

</style>
