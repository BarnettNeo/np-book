<template>
	<view class="np-follow">
		<uni-tag :circle="true" :inverted="follow.inverted" :text="follow.text" @click="setFollow()" />
	</view>
</template>

<script>
	import cloudApi from "../common/cloudApi.js"
	import {mapGetters} from 'vuex'
	export default {
		name:"pubfolow",
		props:{
			user_id:{
				type:String,
				default:''
			},
			orpage:{
				type:Boolean,
				default:true
			},
		},
		data() {
			return {
				follow: {
					loading: true,
					inverted: false,
					text: '未关注',
				},
			};
		},
		watch:{
			'follow.inverted': {
				handler: function(cur) {
					cur ? this.follow.text = '已关注' : this.follow.text = '未关注';
				}
			},
			'user_id':{
				handler: function(cur) {
					if(cur && this.orpage)this.getFolow()
				},
				immediate:true
			}
		},
		computed: {
			...mapGetters(['token']),
		},
		
		created() {
			// this.getFolow()
		},
		
		methods:{
			// 非管理员检测关注
			getFolow(select){
				cloudApi.call({
					name: "updateFolow",
					data: {
						action: "get",
						token: this.token,
						user_id: this.user_id?this.user_id:select
					},
					success: (res) => {
						console.log(res)
						this.follow.loading = false;
						this.follow.inverted = res.result.state;
					}
				})
			},
			
			// 关注
			setFollow() {
				if (this.follow.loading) return
				// this.follow.inverted = !this.follow.inverted;
				if (!this.follow.inverted) {
					this.follow.loading = true;
					cloudApi.call({
						name: "updateFolow",
						data: {
							action: "add",
							token: this.token,
							user_id: this.user_id
						},
						success: (res) => {
							console.log(res)
							this.follow.loading = false;
							this.follow.inverted = res.result.state;
							uni.showModal({
								content: '关注成功',
								showCancel: false
							});
						},
					})
				} else {
					// 取消关注
					this.follow.loading = true;
					uni.showModal({
						content: "确定取消关注吗?",
						success: (res) => {
							if (res.confirm) {
								this.follow.loading = true;
								cloudApi.call({
									name: "updateFolow",
									data: {
										action: "delete",
										token: this.token,
										user_id: this.user_id
									},
									success: (res) => {
										console.log(res)
										this.follow.loading = false;
										this.follow.inverted = res.result.state;
										uni.showModal({
											content: '取消关注成功',
											showCancel: false
										});
									}
								})
							}
						},
						complete: () => {
							this.follow.loading = false;
						}
					})
				}
			},
		}
		

	}
</script>
