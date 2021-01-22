<template>
	<view class="content b-t">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true">
			<view class="list b-b" @click.stop="checkAddress(v)" v-for="(v,k) in dataList" :key="k">
				<view class="wrapper">
					<view class="u-box-first">
						<text class="name">{{v.name}}</text> <text class="name">{{v.sex==0?'女士':'先生'}}</text>
						<text class="mobile">{{v.phone}} </text>
					</view>
					<view class="address-box uni-flex">
						<text class="default" v-if="k==0">【默认】</text>
						<text class="address">{{v.province_city_town}}{{v.address}}</text>
					</view>
				</view>
				<view class="u-box line">
					<view class="row ">
					</view>
					<view class="u-bottom" @click.stop>
						<text class="yticon edmit" @click.stop="addAddress('edit',v)">编辑</text>
						<text class="yticon del" @click.stop="delAddress(v.id, k)">删除</text>
					</view>
				</view>
			</view>
		</s-pull-scroll>
		<view class="add-btn" @click.stop="addAddress('add')" hover-class="btn-hover">新增地址</view>
	</view>
</template>

<script>
	import noAddress from "@/components/mycom/noAddress.vue"
	import sPullScroll from '@/components/s-pull-scroll/index.vue'
	export default {
		components: {
			noAddress,
			sPullScroll
		},
		data() {
			return {
				top: 0,
				source: 0,
				dataList: []
			};
		},
		onLoad(options) {
			console.log(options.source);
			this.source = options.source;
		},
		onShow() {
			this.refresh();
		},
		methods: {
			refresh() {
				this.$nextTick(() => {
					this.$refs.pullScroll.refresh();
				});
			},
			pullDown(pullScroll) {
				setTimeout(() => {
					this.loadData(pullScroll);
				}, 200)
			},
			loadData(pullScroll) {
				if (pullScroll.page == 1) {
					this.dataList = [];
				}
				let e = {
					cmd: 'getAddressList',
					uid:uni.getStorageSync('uid')
				};
				this._reqw.post(e).then(res => {
					res.result == 0 ?
						(res.body.dataList.length == 0 ? pullScroll.empty() : (this.dataList = res.body.dataList, pullScroll.finish())) :
						this.$api.tip(res.resultNote);
				})
			},
			//选择地址
			checkAddress(item) {
				if (this.source == 1) {
					//  上一页实例
					console.log(item);
					this.$api.prePage().addressData = item;
					this.$api.back();
				}
			},
			addAddress(type, e) {
				let url;
				if (type == 'edit') {
					url = `/pages/mineoptions/addressManage?id=${JSON.stringify(e)}`
				} else {
					url = `/pages/mineoptions/newAddAdress`
				}

				this.$api.navTo(url);
			},
			perData(id) {
				if (this.source == 1) {
					(id == this.$api.prePage().addressData.id) ? this.$api.prePage().addressData = {
						id: "", //123
						phone: "", //手机号
						name: "", // 名字
						address: "", //地址
						sex: "", //性别（1：男0：女）
						lon: "", //经度
						lat: "", //纬度
						isdefault: "", //是否默认 0否 1是
						province_city_town: "", //省市区
					}: ''
				}
			},
			delAddress(id, k) {
				let _this = this;
				uni.showModal({
					confirmText: '确定',
					cancelText: '取消',
					confirmColor: "#006F2F",
					content: '确定删除吗？',
					success(res) {
						if (res.confirm) {
							let parmas = {
								cmd: 'deleteAddress',
								id: id
							}
							_this._reqw
								.post(parmas, 'shouhuoDelete')
								.then(res => {
									res.result == 0 ? (_this.$api.tip('删除成功'), _this.perData(id), _this.refresh()) : _this.$api.tip(
										res.resultNote);
								})
								.catch(err => {});
						} else if (res.cancel) {
							console.log('取消')
						}
					}
				});
			},
			initData() {
				this.page = 1;
				this.totalPage = 1;
				this.showLoading = true,
					this.showEmpty = false,
					this.addressList = [];
				this.loadData();
			}
		}
	};
</script>

<style lang="scss" scoped>
	@import "@/common/css/address.css";
</style>
