<template>
	<pubpage title="标题">
		<view slot="navigationSection">
			<view style="width: 100%;text-align: center;height:44px;line-height: 44px;background-color: #fff;">搜书</view>
			<view style="padding:10px;background-color: #fff;display: flex;align-items: center;">
				<view style="width: 86%;display:inline-block; 44px;line-height: 44px;display: flex;border-radius: 22px;border:1px solid #ccc;overflow: hidden;">
					<view style="width: 44px;text-align: center;">
						<text class="iconfont icon-search"></text>
					</view>
					<view style="flex:1;">
						<input @confirm="btnSearch" v-model="keyword" maxlength="15" style="width: 100%;height: 44px;line-height: 44px;" placeholder="输入书名搜索"></input>
					</view>
					<view @click="btnSearch" style="width: 80px;text-align: center;">
						搜索
					</view>
				</view>
				<navigator url="../map/map" class="map_icon">
					<image src="../../static/tabicons/map_1.png" mode=""></image>
				</navigator>
			</view>
		</view>
		<view slot="contentSection">
			<view style="justify-content: start;display: flex;flex-wrap: wrap;padding-top: 64px;">
				<view v-for="item in books" :key="item._id" style="width:33.3%;padding:10px;margin-bottom: 10px;">
					<bookcell :data="item"></bookcell>
				</view>
				<view v-if="isBooksLen" style="position: absolute;width: 100%;text-align: center;top: 25%;">暂无图书</view>
			</view>
		</view>

		
		<!-- <view slot="tabSection">
			
		</view> -->
	</pubpage>
</template>

<script>
	import cloudApi from "../../common/cloudApi.js"
	import pubpage from "../../components/pubpage.vue"
	import bookcell from "../../components/pub-ui/bookcell.vue"
	
	export default {
		components:{
			pubpage,
			bookcell
		},
		data() {
			return {
				books:[],
				keyword:"",
				canloadmore:true,
				isBooksLen:false
			}
		},
		onLoad() {
			this.getBooks();
		},
		onReachBottom() {
			this.getBooks(this.books[this.books.length-1]._id);
		},
		methods: {
			btnSearch(){
				this.canloadmore = true;
				this.getBooks();
			},
			getBooks(start=0){
				this.isBooksLen = false;
				if(!this.canloadmore)return;
				cloudApi.call({
					name:"books",
					data:{
						action:"listall",
						start:start,
						keyword:this.keyword
					},
					success:(res)=>{
						this.canloadmore = res.result.length>=9;
						
						if(start)this.books = this.books.concat(res.result);
						else this.books = res.result;
						this.books<1 ? this.isBooksLen = true : this.isBooksLen = false;
					}
				});
			}
		}
	}
</script>

<style scoped lang="less">
	page
	{
		background-color: #fff;
		.map_icon{
			display: inline-block;
			width: 64rpx;
			height: 64rpx;
			    margin-left: 30rpx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
