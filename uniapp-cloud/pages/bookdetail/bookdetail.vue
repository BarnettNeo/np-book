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
				<view>
					<view class="score">
						{{bookInfo.rating.value}}
					</view>
					<view>
						<text>星星：{{bookInfo.rating.star_count}}</text>
						<text>{{bookInfo.rating.rating_info}}</text>
					</view>
				</view>
			</view>
			<view>
				<view>更多图书详情：</view>
				<navigator :url="bookInfo.del_url" class="detail-line">{{bookInfo.del_url}}</navigator>
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
		margin: 20rpx 0;
		padding: 20rpx 0;
	}
	.detail-line{
		margin-top: 10rpx;
		text-overflow: ellipsis;
		white-space: nowrap;
		overflow: hidden;
		text-decoration: underline;
	}
</style>
