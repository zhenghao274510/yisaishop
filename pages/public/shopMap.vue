<template>
	<view>
		<view class="map-top">
			<view class="">
				{{dataobject.name}}
			</view>
			<view class="uni-flex">
				<view class="info">
					营业时间:
				</view>
				<view class="uni-flex-item uni-flex d-content-center  d-column" style="margin-left: 40upx;">
					<view class="uni-flex-item info">
						{{dataobject.yesj}}
					</view>
					<!-- <view class="uni-flex-item info">
							周六 08:00-20:30
						</view>
						<view class="uni-flex-item info">
							周日 08:00-20:30
						</view> -->
				</view>
				<view class="" @click="callphone">
					<image src="/static/img/kefuicon.png" class="icon-img"></image>
				</view>
			</view>
			<view class="uni-flex">
				<view class="info">
					门店地址:
				</view>
				<view class="uni-flex-item" style="margin-left: 40upx;">
					<view class="uni-flex-item info">
						{{dataobject.address}}
					</view>

				</view>
			</view>
		</view>
		<view class="item-title">
			附近地址
		</view>
		<map :latitude="dataobject.lat" :longitude="dataobject.lon" :markers="markers" scale='17' :show-location="true" class="myMap" id="myMap"
		 style="width: 100%; height:200px;" @markertap="markertap"></map>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataobject: {
					name: "", //店铺名字
					address: "", //地址
					yesj: "", //营业时间
					phone: "", //联系方式
					lon: "", //经度
					lat: "", //纬度
					distance: "" //距离
				},
				markers: []
			}
		},
		onLoad(options) {
			this.dataobject = JSON.parse(decodeURIComponent(options.id));
			this.fromData(this.dataobject)
		},
		methods: {
			callphone() {
				this.$api.callPhone(this.dataobject.phone)
			},
			markertap() {
				this.$api.loading('加载中...')
				uni.openLocation({
					latitude: this.dataobject.lat - 0,
					longitude: this.dataobject.lon - 0,
					name: this.dataobject.name,
					address: this.dataobject.address,
					success() {
						uni.hideLoading();
						console.log('success');
					}
				});
			},
			fromData(res) {
				let mapCtx = uni.createMapContext("myMap", this)
				this.markers = [{
					latitude: res.lat,
					longitude: res.lon,
					// iconPath: '/static/img/dingwei.png', //图标路径
					width: 25,
					height: 25,
					callout: {
						content: res.name,
						textAlign: "center",
						color: '#000',
						bgColor: "#FFFFFF",
						width: 250,
						display: 'ALWAYS',
						borderRadius: 10

					}
				}]
				// setTimeout(function() {
				// 	mapCtx.moveToLocation();
				// }, 1000)
			}
		}
	}
</script>

<style scoped lang="scss">
	.item-title {
		padding: 20upx;
	}

	.map-top {
		padding: 20upx;
		background-color: #FFFFFF;
	}

	.icon-img {
		width: 87upx;
		height: 87upx;
	}

	.info {
		font-size: 26upx;
		color: #666666;
	}

	.title {
		font-size: 30upx;
	}
</style>
