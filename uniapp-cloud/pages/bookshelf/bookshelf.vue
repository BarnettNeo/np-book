<template>
	<pubpage :title="shelfInfo.name">
		<view slot="contentSection" style="position: relative;">
			<canvas v-show="isCanvas" id="myPoster" canvas-id="myPoster" type="2d"></canvas>
			<pubshare v-if="showShareMenu" @selected="onShareSelected" @dismiss="onShareDismiss"></pubshare>

			<view class="User_info">
				<view @click="openPage(shelfInfo.ownerinfo._id)" style="display: flex;position: relative;">
					<view class="User_avatarUrl">
						<image :src="shelfInfo.ownerinfo.avatarUrl"></image>
					</view>
					<view class="User_text">
						<text class="nickName">{{shelfInfo.ownerinfo.nickName}}</text>
					</view>
				</view>

				<view v-if="isExi">
					<pubfolow ref="pubfolow" :user_id="shelfInfo.ownerinfo._id"></pubfolow>
				</view>
			</view>
			<view class="np-address">
				<text>{{shelfInfo.address}}</text>
			</view>
			<view class="textTitle">
				<text>{{shelfInfo.textTitle}}</text>
			</view>
			<view class="desc">
				<text>{{shelfInfo.desc}}</text>
			</view>
			<view class="time">
				<text>{{shelfInfo.createtime}}</text>
			</view>
			<view class="np-divider"></view>

			<view style="justify-content: start;display: flex;flex-wrap: wrap;padding-bottom: 70px;position: relative;">
				<view v-if="books" style="width: 100%;display: flex;flex-wrap: wrap;">
					<view v-for="item in books" :key="item._id"
						style="width: 33.3%;float: left;padding:10px;margin-bottom: 10px;">
						<bookcell :data="item"></bookcell>
						<view v-if="isEditing" @click="btnDeleteBook" :data-id="item._id"
							style='font-size:10px;text-align:center;margin-top: 10px;'><text
								style="padding:5px 10px;background:#f3433e;color:#fff;border-radius:5px;">编辑</text>
						</view>
					</view>
				</view>

				<view v-if="isBooksLen" ref="BooksLen"
					style="position: absolute;width: 100%;text-align: center;top: 25%;">暂无图书</view>
			</view>
		</view>
		<!-- 管理员底部编辑 -->
		<view v-if="shelfInfo.isowner" slot="tabSection" style="padding:10px;">
			<view v-if="!isEditing"
				style="background-color: #00aaff;width: 100%;height: 50px;border-radius: 25px;display: flex;line-height: 50px;color:#fff;justify-content: space-between;">
				<view @click="showShareMenu= true" class="iconfont icon-share"
					style="width:50px;height: 50px;text-align: center;"></view>
				<view @click="btnScan" style="flex:1;text-align: center;">添加图书</view>
				<view @click="btnEnterEditing" class="iconfont icon-apps"
					style="width:50px;height: 50px;text-align: center;"></view>
			</view>
			<view v-else
				style="background-color: #00aaff;width: 100%;height: 50px;border-radius: 25px;display: flex;line-height: 50px;color:#fff;justify-content: space-between;">
				<view></view>
				<view @click="btnExitEditing" style="flex:1;text-align: center;">退出编辑模式</view>
				<view></view>
			</view>
		</view>
		
		<!-- 公共底部 -->
		<view slot="footerSection">
			<pubfooter 
			:shelfid="shelfid"
			:heart="shelfInfo.heart"
			:star="shelfInfo.star"
			:isheart="shelfInfo.isheart"
			:isstar="shelfInfo.isstar"
			:totalheart="shelfInfo.totalheart"
			:totalstar="shelfInfo.totalstar"
			></pubfooter>
		</view>
	</pubpage>
</template>

<script>
	import cloudApi from "../../common/cloudApi.js"
	import timeApi from "../../common/timeApi.js"
	import pubpage from "../../components/pubpage.vue"
	import pubshare from "../../components/pubshare.vue"
	import pubfooter from "../../components/pubfooter.vue"
	import pubfolow from "../../components/pubfolow.vue"
	
	import bookcell from "../../components/pub-ui/bookcell.vue"
	import {
		mapState,
		mapGetters,
		mapMutations,
		mapActions
	} from 'vuex'

	export default {
		components: {
			pubpage,
			bookcell,
			pubshare,
			pubfooter,
			pubfolow
		},
		data() {
			return {
				title: "",
				isEditing: false,
				shelfInfo: null,
				shelfid: null,
				canloadmore: true,
				showShareMenu: false,
				isBooksLen: false,
				isCanvas: false,
				books: [],
				isExi:false,
				
			}
		},

		watch: {
			books(cur) {
				cur < 1 ? this.isBooksLen = true : this.isBooksLen = false;
			},
			'shelfInfo.isowner': {
				handler: function(cur) {
					// console.log('权限',cur)
					cur ? this.isExi = false : this.isExi = true;		
				}
			}

		},
		onLoad(options) {
			this.shelfid = options.id;
			// console.log(options.id)
			if (!this.shelfid) uni.navigateBack();

			this.getShelfInfo();
			this.requestBookList();
		},
		// onReachBottom() {
		// 	this.requestBookList(this.books[this.books.length - 1]._id);
		// },
		onShareAppMessage() {
			return {
				title: this.title,
				path: '/pages/me/index?scene=sid=' + this.shelfInfo._id
			}
		},
		methods: {
			// 进入客态页
			openPage(id){
				// console.log(id,this.isowner)
				if(!this.shelfInfo.isowner){
					uni.navigateTo({
						url:"../../orderpage/index/index?id="+id
					})
				}

			},
			// 生成海报
			drawPoster() {
				this.isCanvas = true;
				uni.showLoading({
					title: "生成中",
					mask: true
				});
				const query = wx.createSelectorQuery()
				console.log(query.select('#myPoster'))
				query.select('#myPoster')
					.fields({
						node: true,
						size: true
					})
					.exec(async (res) => {
						var canvas = res[0].node
						var ctx = canvas.getContext('2d')

						const dpr = uni.getSystemInfoSync().pixelRatio
						canvas.width = res[0].width * dpr
						canvas.height = res[0].height * dpr
						ctx.scale(dpr, dpr)

						ctx.fillStyle = "#ffffff";
						ctx.fillRect(0, 30, 350, 750);

						//ownerInfo
						ctx.fillStyle = 'black';
						ctx.fontSize = 20;
						// console.log(this.shelfInfo.name)
						ctx.fillText("用户名：" + this.shelfInfo.ownerinfo.nickName, 70, 50);

						ctx.fontSize = 20
						ctx.fillText("书房名：" + this.shelfInfo.name, 70, 65);

						ctx.fontSize = 20
						ctx.fillText("地址：" + this.shelfInfo.address, 70, 80);

						var image = canvas.createImage();
						image.onload = (res) => {
							ctx.drawImage(image, 10, 35, 50, 50);
						}
						image.src = this.shelfInfo.ownerinfo.avatarUrl;


						//books
						var bookLength = Math.min(this.books.length, 9);
						var bookIndex = 0;
						var loadNextBookCover = () => {
							var bookItem = this.books[bookIndex];
							// console.log(this.books)
							if (this.books.length < 1) {
								uni.showModal({
									content: '无图书分享',
									showCancel: false
								});
								return
							}

							uni.getImageInfo({
								src: bookItem.cover_url,
								success: (res) => {
									var image = canvas.createImage();

									image.onload = () => {
										var dx = Math.floor(bookIndex % 3) * (100 + 15) + 10;
										var dy = Math.floor(bookIndex / 3) * (150 + 15) + 100;
										ctx.drawImage(image, dx, dy, 100, 150);
										// 书名
										ctx.fontSize = 16
										ctx.fillText(bookItem.title, dx, dy + 165, 100);

										if (bookIndex < bookLength - 1) {
											bookIndex++;
											loadNextBookCover();
										} else {
											console.log("全部封面加载结束");
											uni.hideLoading();

											uni.canvasToTempFilePath({
												canvas: canvas,
												success: (res) => {
													uni.previewImage({
														current: res
															.tempFilePath,
														urls: [res
															.tempFilePath
														]
													})
												},
												fail: (err) => {
													console.log(err);
												}
										 })
										}
									}
									image.src = res.path;
								}
							})
						}

						//wxacode
						const wxacodeRes = await cloudApi.call({
							name: "getwxacode",
							data: {
								scene: "sid=" + this.shelfInfo._id
							}
						});
						console.log(wxacodeRes)

						// 本地缓存文件
						const fs = wx.getFileSystemManager()
						const wr = fs.writeFileSync(
							`${wx.env.USER_DATA_PATH}/mpcode.jpg`,
							uni.arrayBufferToBase64(wxacodeRes.result.data),
							"base64"
						);
						uni.getImageInfo({
							src: `${wx.env.USER_DATA_PATH}/mpcode.jpg`,
							success: (res) => {
								console.log('二维码', res)
								var image = canvas.createImage();
								image.onload = (res) => {
									ctx.drawImage(image, 350 - 170, 750 - 170, 160, 160);
									loadNextBookCover();
								}
								image.src = res.path;
							}
						})



					})
			},
			// 底部分享
			onShareSelected(index) {
				console.log('分享点击',index)
				if (index == 1) {
					this.drawPoster();
				}
			},
			onShareDismiss() {
				console.log('取消')
				this.showShareMenu = false;
			},
			// 请求当前书房信息
			getShelfInfo() {
				cloudApi.call({
					name: "bookshelfs",
					data: {
						action: "get",
						_id: this.shelfid
					},
					success: (res) => {
						console.log(res.result);
						this.shelfInfo = res.result;
						this.shelfInfo.createtime ?
						this.shelfInfo.createtime = timeApi.timestampToTime(this.shelfInfo.createtime) :
						this.shelfInfo.createtime = '';
						// console.log('时间戳',this.shelfInfo.createtime)
					}
				})
			},
			// 请求书籍列表
			requestBookList(start = 0) {
				if (start && !this.canloadmore) return;
				cloudApi.call({
					name: "books",
					data: {
						action: "listbyshelf",
						shelfid: this.shelfid,
						start: start
					},
					success: (res) => {
						this.canloadmore = res.result.length >= 9;
						if (!start) this.books = res.result;
						else this.books = this.books.concat(res.result);

						// console.log('图书',this.books)
					}
				})
			},
			btnDeleteBook(e) {
				console.log(e.currentTarget.dataset.id);
				uni.showActionSheet({
					itemList: ["置顶", "删除"],
					success: (res) => {
						if (res.tapIndex == 0) {
							cloudApi.call({
								name: "books",
								data: {
									action: "movetop",
									bookid: e.currentTarget.dataset.id
								},
								success: (res) => {
									this.requestBookList();
								}
							})
						} else if (res.tapIndex == 1) {
							cloudApi.call({
								name: "books",
								data: {
									action: "delete",
									shelfid: this.shelfid,
									bookid: e.currentTarget.dataset.id
								},
								success: (res) => {
									this.requestBookList();
								}
							})
						}
					}
				})
			},
			btnExitEditing() {
				this.isEditing = false;
			},
			btnEnterEditing() {
				this.isEditing = true;
			},

			// 扫码添加图书
			btnScan() {
				uni.showModal({
					content: "请您通过书籍后面的条形码进行扫码添加书籍哦",
					success: (res) => {
						if (res.confirm) {
							uni.scanCode({
								success: async (res) => {
									console.log('扫码结果', res)
									const isbnres = await cloudApi.call({
										name: "ISBNQuery",
										data: {
											isbn: res.result,
											shelfid: this.shelfid,
										},
										success: async (res) => {
											console.log('doubanbook', res)
							
											// 检查数据库是否已存在
											if (res.result.state) {
												await cloudApi.call({
													name: "books",
													data: {
														action: "add",
														shelfid: this.shelfid,
														isbnid: res.result.resData._id,
													}
												})
											}else{
												uni.showModal({
													content: res.result.msg,
													showCancel: false
												});
											}
											this.requestBookList();
										}
									})
							
							
								},
							
								fail: (err) => {
									console.log('扫码失败', err);
									uni.showModal({
										content: '扫码失败,请重新尝试',
										showCancel: false
									});
								}
							})
						}
					},
				})
				
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	#myPoster {
		position: absolute;
		display: block;
		left: -350px;
		width: 350px;
		height: 750px;
		// width: 98%;
		// height: 99%;
		// left: 50%;
		// top: 50%;
		// transform: translate(-50%,-50%);
	}

	.User_info {
		width: auto;
		margin: 30rpx 0;
		padding-left: 30rpx;
		position: relative;

		.User_avatarUrl {
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;

			image {
				width: 100%;
				height: 100%;
				border-radius: 50%;
			}
		}

		.User_text {
			display: flex;
			align-items: center;
			margin-left: 20rpx;

			.nickName {
				margin: 10rpx 0;
			}
		}


	}

	.textTitle {
		padding: 0 20rpx;
		font-size: 40rpx;
		display: block;
		margin: 20rpx 0;
	}

	.desc {
		padding: 0 20rpx;
		font-size: 35rpx;
		display: block;
		margin: 20rpx 0;
	}

	.time {
		padding: 0 20rpx;
		font-size: 22rpx;
		display: block;
		margin: 20rpx 0;
		color: #666;
		text-align: right;
	}

</style>
