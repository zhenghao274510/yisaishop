<template>
	<view class="box">
		<view class="uni-flex d-items-center d-between" style="padding: 0 20rpx;">
			<navigator class="uni-ellipsis"  url="/pages/public/city-list" style="width:120upx;">
				{{city}}
			</navigator>
			  <uni-search-bar style="width:100%;" placeholder="输入地址搜索" type="0" fontColor="#333333" @confirm='onConfirm' cancelButton='false' bgColor="#f6f6f6"></uni-search-bar>
		</view>
		<view class="mapcontent">
			<map class="map" :longitude="longitude" :latitude="latitude" scale="17" show-location></map>
		</view>

		<scroll-view class="searchList" scroll-y="true">
			<view class="addres-item" v-for="(item,index) in searchList" :key="index" @click="setAddress(item)">
				<!--根据需求渲染相应数据-->
				<!--渲染地址title-->
				<view>
					<view class="item-name" style="text-align:left;font-size:14px;">{{item.title}}</view>
					<view class="item-address" style="font-size:12px;color:#666;text-align:left;margin-top:5px;">{{item.address}}</view>
				</view>
			</view>
			<uni-load-more :status="status"></uni-load-more>
		</scroll-view>
	</view>
</template>

<script>
	//import 《组件名称》 from '《组件路径》';
	import QQMapWX from "@/common/js/qqmap-wx-jssdk";
	import uniSearchBar from "@/components/uni-search-bar/uni-search-bar.vue"
	export default {
		components: {
			uniSearchBar
		},
		data() {
			return {
				qqMapSdk: "",
				longitude: "",
				latitude: "",
				searchList: [],
				page: 1,
				status: 'loading',
				keywords: '',
				type:0,
				city:uni.getStorageSync('city')
			}
		},
		onLoad(options) {
			this.type=options.type;
			this.qqMapSdk = new QQMapWX({
				key: "GQZBZ-3CECD-BP443-PBQEY-4R3M6-QMFBO"
			});
			this.getCurPositions();
		},
		//方法集合
		methods: {
			onConfirm(e) {
				console.log(e)
				this.keywords = e.value;
				this.initData()
			},
			getCurPositions() {
				let self = this;
				wx.getLocation({
					type: "gcj02", //返回可以用于wx.openLocation的经纬度
					success(res) {
						self.latitude = res.latitude;
						self.longitude = res.longitude;
						self.getNeary()
					}
				});
			},
			getNeary() {
				let self = this;
				self.qqMapSdk.reverseGeocoder({
					location: `${self.latitude},${self.longitude}`,
					get_poi: 1,
					page_size: 10,
					page_index: self.page,
					success: function(res) {
						console.log(res);
						res.result.pois.forEach(item => {
							self.searchList.push(item);
						})
						self.status = 'noMore';
					}
				});
			},
			getSearch() {
				let self = this;
				self.qqMapSdk.search({
					keyword:self.keywords,
					region:self.city,
					page_size: 10,
					page_index: self.page,
					success: function(res) {
						console.log(res);
						self.latitude = res.data[0].location.lat;
						self.longitude = res.data[0].location.lng;
						self.searchList=res.data;
						self.status = 'noMore';
					}
				});
			},
			initData() {
				this.page = 1;
				this.status = 'loading';
				this.searchList = [];
				this.keywords == '' ? this.getNeary() : this.getSearch();
			},
			setAddress(item) {
				console.log(item)
				let province_city_town='',address=item.address+item.title;
				item.ad_info.province==item.ad_info.city?province_city_town=item.ad_info.city+item.ad_info.district:province_city_town =item.ad_info.province+item.ad_info.city+item.ad_info.district
				if(this.type==0){
					this.$api.prePage().addressData.province_city_town =province_city_town;
					this.$api.prePage().addressData.address =address.replace(province_city_town,'');
					this.$api.prePage().addressData.lat = item.location.lat;
					this.$api.prePage().addressData.lon = item.location.lng;
				}else{
					this.$api.prePage().userInfo.province =province_city_town;
					this.$api.prePage().userInfo.city=item.ad_info.city;
					this.$api.prePage().userInfo.town =item.ad_info.district;
					this.$api.prePage().userInfo.lat = item.location.lat;
					this.$api.prePage().userInfo.lon = item.location.lng;
					this.$api.prePage().userInfo.address =address.replace(province_city_town,'');
				}
				setTimeout(() => {
					this.$api.back()
				}, 30)

			}
		}
	};
</script>
<style>
	page{
		background: #FFFFFF;
	}
</style>
<style scoped>
	.uni-icon{
		font-size: 30upx;
	}
	.top-city{
		width: 100upx;
	}
	.map {
		width: 100%;
		height:500upx;
		z-index: 0;
	}

	.searchList {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		height: calc(100% - 560upx);
		background: #fff;
		z-index:99;
	}

	.searchList .addres-item {
		padding: 10upx 20upx;
		height: 80upx;
		display: flex;
		font-size: 24upx;
		justify-content: space-between;
		align-items: center;
		position: relative;
		border-bottom: 1px solid #ccc;
	}

	.item-name,
	.item-address {
		width: 600upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
