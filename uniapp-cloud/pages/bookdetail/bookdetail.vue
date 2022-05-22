<template>
	<pubpage title="图书详情">
		<view slot="contentSection">
			<view style="width: 100%;text-align: center;background-color: #fff;padding:10px;">
				<image :src="bookInfo.cover_url" mode="widthFix" style="width:150px;"></image>
				<view style="font-size: 16px;text-align: center;padding:5px 0px;width:100%;text-overflow: ellipsis;white-space: nowrap;">{{bookInfo.title}}</view>
				<text style="font-size: 14px;text-align: center;color:#666;width:100%;">{{bookInfo.abstract}}</text>
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
					}
				})
			}
		}
	}
</script>

<style>

</style>
