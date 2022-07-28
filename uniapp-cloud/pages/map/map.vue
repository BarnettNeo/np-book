<template>
	<pubpage title="附近">
		<view slot="contentSection" style="height: 100%;">
			<map :markers="markers" :latitude="latitude" :longitude="longitude" :show-location="true" 
			@markertap="btnMarkerTap"
			@regionchange="onRegionChanged"
			style="width: 100%;height: 100%;">
			</map>
			<!-- @regionchange="onRegionChanged" -->
		</view>
	</pubpage>
</template>

<script>
	import cloudApi from "../../common/cloudApi.js"
	import pubpage from "../../components/pubpage.vue"
	import { mapState,mapMutations,mapActions} from 'vuex'
	
	var shelfs;
	export default {
		components:{
			pubpage
		},
		data() {
			return {
				latitude:"",
				longitude:"",
				markers:[]
			}
		},
		computed:{
		   ...mapState(['userInfo']),
		},
		onLoad() {
			uni.getLocation({
				success: (res) => {
					this.latitude=res.latitude;
					this.longitude=res.longitude;
				}
			})
			console.log('当前用户',this.userInfo)
		},
		methods: {
			btnMarkerTap(e){
				var markerId = e.markerId;
				var shelfInfo = shelfs[markerId];
				console.log(shelfInfo);
				
				uni.navigateTo({
					url:"../bookshelf/bookshelf?id="+shelfInfo._id
				})
				
			},
			onRegionChanged(e){
				if(e.type=="end"){
					var latitude = e.detail.centerLocation.latitude;
					var longitude = e.detail.centerLocation.longitude;
					// console.log(latitude,longitude)
					this.getBookShelfs(latitude,longitude)

				}
			},
			
			getBookShelfs(latitude,longitude){
				console.log(latitude,longitude)
				cloudApi.call({
					name:"bookshelfs",
					data:{
						action:"listbygeo",
						token:this.userInfo.token,
						longitude:longitude,
						latitude:latitude
					},
					success:(res)=>{
						console.log(res);
						
						shelfs = res.result;
						var markers = [];
						shelfs.forEach((item,index)=>{
							markers.push({
								id:index,
								width:55,
								height:60,
								iconPath:item.isowner ? "/static/mapmarker_library.png":"/static/mapmarker_shelf.png",
								latitude:item.geopoint.coordinates[1],
								longitude:item.geopoint.coordinates[0],
							});
						})
						this.markers = markers;
					}
				})
			}
			
		}
	}
</script>

<style>

</style>
