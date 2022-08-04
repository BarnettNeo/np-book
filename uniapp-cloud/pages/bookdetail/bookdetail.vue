<template>
	<pubpage title="图书详情">
		<view slot="contentSection" style="height: 100%;background-color: #fff;">
			<view style="width: 100%;text-align: center;background-color: #fff;padding:10px;">
				<image :src="bookInfo.cover_url" mode="widthFix" style="width:150px;"></image>
				<view style="font-size: 16px;text-align: center;padding:5px 0px;width:100%;text-overflow: ellipsis;white-space: nowrap;">{{bookInfo.title}}</view>
				<text style="font-size: 14px;text-align: center;color:#666;width:100%;">{{bookInfo.abstract}}</text>
			</view>
			<view class="detail-score">
				<view class="">豆瓣评分</view>
				<view style="display: flex;align-self: center;">
					<view class="score">
						{{bookInfo.rating.value?bookInfo.rating.value:'无'}}
					</view>
					<view style="margin-left: 20rpx;">
						<uni-rate color="#bbb" :readonly="true" allow-half :value="bookInfo.rating.star_count" />
						<text>{{bookInfo.rating.count?bookInfo.rating.count:'无'}}人评价</text>
					</view>
				</view>
			</view>
			<view style="padding-left: 20rpx;">
				<view>更多图书详情：</view>
				<uni-link :href="bookInfo.del_url" :text="bookInfo.del_url" fontSize="16" class="detail-line"
				color="#00aaff">点击跳转</uni-link>
			</view>
		</view>
	</pubpage>
</template>

<script>
	import pubpage from "../../components/pubpage.vue"
	import cloudApi from "../../common/cloudApi.js"
	
	export default {
		components:{
			pubpage
		},
		data() {
			return {
				bookInfo:null
			}
		},
		onLoad(options) {
			this.requestBookDetail(options.isbn);
		},
		methods: {
			requestBookDetail(isbn){
				cloudApi.call({
					name:"books",
					data:{
						action:"get",
						isbn:isbn
					},
					success:(res)=>{
						this.bookInfo=res.result;
						console.log(this.bookInfo)
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.detail-score{
		border-top: 1px solid #ccc;
		border-bottom: 1px solid #ccc;
		margin: 0 0 20rpx;
		padding: 20rpx 0;
		padding-left: 20rpx;
	}
	.detail-line{
		margin-top:10rpx;
		display: block;
	}
	.score{
		font-size: 55rpx;
		line-height: 50rpx;
		margin: 0 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
