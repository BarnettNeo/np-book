<template>
	<view class="person-page">
		<view @click="btnMore" class="btn-more">
			<view class="iconfont icon-more" style="#666"></view>
		</view>
		<view @click="btnEnter">
			<view class="tit">
				<view class="name">
					{{data.name}}
					<text>({{data.totalbook}}本藏书)</text>
				</view>
			</view>
			<view>
				<image mode="aspectFill" :src="'http://api.map.baidu.com/staticimage/v2?ak=6ae2e0c384df712820d0a2fa4ddcffc6&zoom=17&coordtype=gcj02ll&center='+data.geopoint.coordinates[0]+','+data.geopoint.coordinates[1]" style="width:100%;height:80px;vertical-align: middle;"></image>
			</view>
			<view class="np-address">
				{{data.address}}
			</view>
			<view class="np-textTitle" v-if="data.textTitle">
				{{data.textTitle}}
			</view>
		</view>
	</view>
</template>

<script>
	import cloudApi from "../../common/cloudApi.js"
	export default{
		props:{
			data:{
				type:Object
			}
		},
		mounted() {
			
		},
		methods:{
			btnEnter(){
				uni.navigateTo({
					url:"../../pages/bookshelf/bookshelf?id="+this.data._id
				})
			},
			btnMore(){
				uni.showActionSheet({
					itemList:["修改","删除"],
					success: (res) => {
						if(res.tapIndex==0){
							uni.navigateTo({
								url:"../../pages/createbookshelf/createbookshelf?id="+this.data._id
							})
						}else if(res.tapIndex==1){
							uni.showModal({
								content:"哥请慎重啊,确定删除吗?",
								success: (res) => {
									if(res.confirm){
										cloudApi.call({
											name:"bookshelfs",
											data:{
												action:"delete",
												_id:this.data._id
											},
											success:()=>{
												this.$emit("removeHandler")
											}
										})
									}
								}
							})
						}
					}
				})
			}
		}
	}
</script>

<style scoped lang="less">
	.person-page{
		width: 100%;
		background-color: #fff;
		border-radius: 8px;
		border: 1px solid #ccc;
		overflow: hidden;
		position: relative;
		.btn-more{
			position: absolute;
			top: 0;
			height: 30px;
			right: 0;
			width: 80rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.tit{
			height:30px;
			line-height: 30px;
			font-size: 18px;
			padding:0px 20rpx;
			display: flex;
			justify-content: space-between;
			.name{
				flex:1;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
				text{
					color:#999;
					font-size: 12px;
					margin-left: 5px;
				}
			}
		}
	}
</style>
