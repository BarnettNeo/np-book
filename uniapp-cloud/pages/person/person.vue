<template>
	<pubpage title="我的书房">
		<view slot="contentSection" style="padding: 10px;">
			<view v-for="item in bookshelfs" :key="item._id" style="margin-bottom: 10px;">
				<bookshelfcell :isHome="true" @removeHandler="onRemoveHandler" :data="item"></bookshelfcell>
			</view>
			<view @click="btnCreateBookShelf" class="np-blockbutton" style="margin-bottom: 10px;">新建书房</view>
		</view>
	</pubpage>
</template>

<script>
	import pubpage from "../../components/pubpage.vue"
	import cloudApi from "../../common/cloudApi.js"
	import bookshelfcell from "../../components/pub-ui/bookshelfcell.vue"
	import { mapState,mapGetters,mapMutations,mapActions} from 'vuex'
	
	export default {
		components:{
			pubpage,
			bookshelfcell
		},
		data() {
			return {
				bookshelfs:[]
			}
		},
		computed:{
		   ...mapGetters(['token']),
		},
		onShow() {
			this.getBookshelfs();
			// console.log(this.token)
		},
		methods: {
			btnCreateBookShelf(){
				uni.navigateTo({
					url:"../createbookshelf/createbookshelf"
				})
			},
			onRemoveHandler(){
				uni.showModal({
					content: '已删除成功，为你刷新页面',
					showCancel: false
				});
				this.getBookshelfs();
			},
			getBookshelfs(){
				cloudApi.call({
					name:"bookshelfs",
					data:{
						action:"listmy",
						lastId:0
					},
					success:(res)=>{
						console.log(res);
						this.bookshelfs = res.result;
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>
