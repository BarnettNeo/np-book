<template>
	<pubpage :title="title">
		<view slot="contentSection" style="padding:10px;">
			<view class='np-card'>
				<input v-model="name" placeholder="请输入书房名称" maxlength="20" style="color: #333;width:100%;height:44px;line-height: 44px;"></input>
				<view class="np-divider"></view>
				<view class="np-cell" @click="btnChooseLocation">
					<view>{{address}}</view>
					<view class="iconfont icon-right"></view>
				</view>
				<view class="np-divider"></view>
				<view class="np-desc" style="height: auto; min-height: 44px; margin: 0;display: block;position: relative;">
					<textarea v-model="textTitle" maxlength="50" placeholder="请输入书房文案标题" style="height: 90rpx;color: #333;width:100%;line-height: 40rpx;padding: 20rpx 0;"></textarea>
				</view>
				<view class="np-divider"></view>
				<view class="np-desc">
					<textarea v-model="desc" maxlength="1000" placeholder="请输入书房文案详情" style="height: auto;color: #333;width:100%;line-height: 40rpx;"></textarea>
				</view>
			</view>
			<view @click="btnSaveBookshelf" class="np-blockbutton">保存</view>
		</view>
	</pubpage>
</template>

<script>
	import cloudApi from "../../common/cloudApi.js"
	import pubpage from "../../components/pubpage.vue"
	export default {
		components:{
			pubpage
		},
		data() {
			return {
				title:"新建书房",
				_id:null,
				name:"",
				address:"选取书房所在地址",
				longitude:"",
				latitude:"",
				textTitle:"",
				desc:""
			}
		},
		onLoad(options) {
			if(options.id){
				this.title = "修改书房";
				this._id = options.id;
				cloudApi.call({
					name:"bookshelfs",
					data:{
						action:"get",
						_id:this._id
					},
					success:(res)=>{
						this.name = res.result.name;
						this.textTitle = res.result.textTitle;
						this.desc = res.result.desc;
						this.address = res.result.address;
						this.longitude = res.result.geopoint.coordinates[0];
						this.latitude = res.result.geopoint.coordinates[1];
					}
				})
			}
		},
		methods: {
			btnChooseLocation(){
				uni.getLocation({
					success: (res) => {
						uni.chooseLocation({
							latitude:res.latitude,
							longitude:res.longitude,
							success: (res) => {
								this.address= res.address+res.name;
								this.longitude=res.longitude;
								this.latitude=res.latitude;
							}
						})
					}
				})
			},
			btnSaveBookshelf(){
				if(this.name.length<3){
					return uni.showToast({
						icon:"none",
						mask:true,
						title:"书房名称至少需要3个字符"
					})
				}
				else if(this.latitude==""||this.longitude==""||this.address==""){
					return uni.showToast({
						icon:"none",
						mask:true,
						title:"请选择正确的书房所在地址"
					})
				}
				
				else if(!this.textTitle){
					return uni.showToast({
						icon:"none",
						mask:true,
						title:"书房标题不能为空"
					})
				}

				else if(!this.desc){
					return uni.showToast({
						icon:"none",
						mask:true,
						title:"书房文案不能为空"
					})
				}
				cloudApi.call({
					name:"bookshelfs",
					data:{
						action:this._id?"update":"create",
						_id:this._id,
						name:this.name,
						textTitle:this.textTitle,
						desc:this.desc,
						address:this.address,
						longitude:this.longitude,
						latitude:this.latitude,
					},
					success: (res) => {
						if(res.result.err==1){
							uni.showModal({
								content:"书房名称未通过内容安全审查",
								showCancel:false
							})
						}else if(res.result.err==2){
							uni.showModal({
								content:"书房文案标题未通过内容安全审查",
								showCancel:false
							})
						}else if(res.result.err==3){
							uni.showModal({
								content:"书房文案未通过内容安全审查",
								showCancel:false
							})
						}else{
							uni.navigateBack()
						}
						
					}
				})
			}
		}
	}
</script>

<style>

</style>
