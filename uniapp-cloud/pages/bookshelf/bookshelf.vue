<template>
	<pubpage :title="shelfInfo.name">
		<view slot="contentSection" style="height: 100%;">
			<canvas id="myPoster" canvas-id="myPoster" type="2d" style="position: absolute;left:-350px;width:350px;height:750px;"></canvas>
			<pubshare v-if="showShareMenu" @selected="onShareSelected" @dismiss="onShareDismiss"></pubshare>
			<view style="justify-content: start;display: flex;flex-wrap: wrap;padding-bottom: 70px;">
				<view v-for="item in books" style="width:33.3%;padding:10px;margin-bottom: 10px;">
					<bookcell :data="item"></bookcell>
					<view v-if="isEditing" @click="btnDeleteBook" :data-id="item._id" style='font-size:10px;text-align:center;margin-top: 10px;'><text style="padding:5px 10px;background:#f3433e;color:#fff;border-radius:5px;">编辑</text></view>
				</view>
			</view>
		</view>
		<view v-if="shelfInfo.isowner" slot="tabSection" style="padding:10px;">
			<view v-if="!isEditing" style="background-color: #000;width: 100%;height: 50px;border-radius: 25px;display: flex;line-height: 50px;color:#fff;justify-content: space-between;">
				<view @click="showShareMenu= true" class="iconfont icon-share" style="width:50px;height: 50px;text-align: center;"></view>
				<view @click="btnScan" style="flex:1;text-align: center;">添加图书</view>
				<view @click="btnEnterEditing" class="iconfont icon-apps" style="width:50px;height: 50px;text-align: center;"></view>
			</view>
			<view v-else style="background-color: #000;width: 100%;height: 50px;border-radius: 25px;display: flex;line-height: 50px;color:#fff;justify-content: space-between;">
				<view></view>
				<view @click="btnExitEditing" style="flex:1;text-align: center;">退出编辑模式</view>
				<view></view>
			</view>
		</view>
	</pubpage>
</template>

<script>
	import cloudApi from "../../common/cloudApi.js"
	import pubpage from "../../components/pubpage.vue"
	import pubshare from "../../components/pubshare.vue"
	
	import bookcell from "../../components/pub-ui/bookcell.vue"
	
	export default {
		components:{
			pubpage,
			bookcell,
			pubshare
		},
		data() {
			return {
				title:"",
				isEditing:false,
				shelfInfo:null,
				shelfid:null,
				canloadmore:true,
				showShareMenu:false,
				books:[]
			}
		},
		onLoad(options) {
			this.shelfid = options.id;
			if(!this.shelfid)uni.navigateBack();
			
			this.getShelfInfo();
			this.requestBookList();
		},
		onReachBottom() {
			this.requestBookList(this.books[this.books.length-1]._id);
		},
		onShareAppMessage() {
			return {
				title: this.title,
				path: '/pages/me/index?scene=sid='+this.shelfInfo._id
			}
		},
		methods: {
			drawPoster(){
				uni.showLoading({
					title:"生成中",
					mask:true
				});
				const query = wx.createSelectorQuery()
				query.select('#myPoster')
					 .fields({ node: true, size: true })
					 .exec(async (res) => {
						var canvas = res[0].node
						var ctx = canvas.getContext('2d')
				
						const dpr = uni.getSystemInfoSync().pixelRatio
						canvas.width = res[0].width * dpr
						canvas.height = res[0].height * dpr
						ctx.scale(dpr, dpr)
				
						ctx.fillStyle = "#ffffff";
						ctx.fillRect(0,30,350,750);
						
						//ownerInfo
						ctx.fillStyle='black';
						ctx.fontSize=20;
						// console.log(this.shelfInfo.name)
						ctx.fillText("用户名：" + this.shelfInfo.ownerinfo.nickName, 70, 50);
						
						ctx.fontSize=20
						ctx.fillText("书房名：" + this.shelfInfo.name, 70, 65);
						
						ctx.fontSize=20
						ctx.fillText("地址：" + this.shelfInfo.address, 70, 80);
						
						var image=canvas.createImage();
						image.onload=(res)=>{
						  ctx.drawImage(image, 10, 35,50,50);
						}
						image.src=this.shelfInfo.ownerinfo.avatarUrl;
						
						
						//books
						var bookLength = Math.min(this.books.length,9);
						var bookIndex = 0;
						var loadNextBookCover=()=>{
							var bookItem = this.books[bookIndex];
							console.log(this.books)
							if(this.books.length<1){
								uni.showModal({
									content: '无图书分享',
									showCancel: false
								});
							}
							
							uni.getImageInfo({
								src:bookItem.cover_url,
								success: (res) => {
									var image = canvas.createImage();
									
									image.onload=()=>{
										var dx = Math.floor(bookIndex % 3) * (100+15)+10;
										var dy = Math.floor(bookIndex / 3) * (150+15)+100;
										ctx.drawImage(image, dx, dy,100,150);
										// 书名
										ctx.fontSize=16
										ctx.fillText(bookItem.title, dx+5, dy+165);
										
										if(bookIndex<bookLength-1){
										  bookIndex++;
										  loadNextBookCover();
										}else{
										  console.log("全部封面加载结束");
										  uni.hideLoading();
										  
										  uni.canvasToTempFilePath({
											  canvas:canvas,
											  success: (res) => {
											  	uni.previewImage({
											  		current:res.tempFilePath,
													urls:[res.tempFilePath]
											  	})
											  },
											  fail: (err) => {
											  	console.log(err);
											  }
										  })
										}
									}
									image.src=res.path;
								}
							})
						}
						
						//wxacode
						const wxacodeRes = await cloudApi.call({
							name:"getwxacode",
							data:{
								scene:"sid="+this.shelfInfo._id
							}
						});
						console.log(wxacodeRes)
						
						wx.getFileSystemManager().writeFileSync(
							`${wx.env.USER_DATA_PATH}/mpcode.jpg`,
							uni.arrayBufferToBase64(wxacodeRes.result.data),
							"base64"
						);
						uni.getImageInfo({
							src:`${wx.env.USER_DATA_PATH}/mpcode.jpg`,
							success: (res) => {
								var image=canvas.createImage();
								image.onload=(res)=>{			
								  ctx.drawImage(image, 350-170, 750-170,160,160);
								  loadNextBookCover();
								}
								image.src=res.path;
							}
						})
						
						
									
					})
			},
			onShareSelected(index){
				if(index==1){
					this.drawPoster();
				}
			},
			onShareDismiss(){
				this.showShareMenu= false;
			},
			getShelfInfo() {
				cloudApi.call({
					name:"bookshelfs",
					data:{
						action:"get",
						_id:this.shelfid
					},
					success:(res)=>{
						console.log(res.result);
						this.shelfInfo = res.result;
					}
				})
			},
			requestBookList(start=0){
				if(start&&!this.canloadmore)return;
				cloudApi.call({
					name:"books",
					data:{
						action:"listbyshelf",
						shelfid:this.shelfid,
						start:start
					},
					success:(res)=>{
						this.canloadmore = res.result.length>=9;
						
						if(!start)this.books = res.result;
						else this.books = this.books.concat(res.result);
					}
				})
			},
			btnDeleteBook(e){
				console.log(e.currentTarget.dataset.id);
				uni.showActionSheet({
					itemList:["置顶","删除"],
					success: (res) => {
						if(res.tapIndex==0){
							cloudApi.call({
								name:"books",
								data:{
									action:"movetop",
									bookid:e.currentTarget.dataset.id
								},
								success:(res)=>{
									this.requestBookList();
								}
							})
						}else if(res.tapIndex==1){
							cloudApi.call({
								name:"books",
								data:{
									action:"delete",
									shelfid:this.shelfid,
									bookid:e.currentTarget.dataset.id
								},
								success:(res)=>{
									this.requestBookList();
								}
							})
						}
					}
				})
			},
			btnExitEditing(){
				this.isEditing = false;
			},
			btnEnterEditing(){
				this.isEditing = true;
			},
			btnScan(){
				uni.scanCode({
					success: async (res) => {
						const isbnres = await cloudApi.call({
							name:"ISBNQuery",
							data:{
								isbn:res.result
							}
						})
						await cloudApi.call({
							name:"books",
							data:{
								action:"add",
								shelfid:this.shelfid,
								isbnid:isbnres.result._id,
							}
						})
						
						this.requestBookList();
					}
				})
			}
		}
	}
</script>

<style>
	page
	{
		background-color: #fff;
	}
</style>
