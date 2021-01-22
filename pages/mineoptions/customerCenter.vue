<template>
	<view class="">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true">
			<view class="list-con">
				<uni-collapse accordion="true" class="list-item-con" v-for="(v,k) in dataobject.dataList" :key="k">
					<uni-collapse-item :title="v.question" :open="k==0" style="font-weight: bold;" :showAnimation="true">
						<view class="list-item">
							{{v.answer}}
						</view>
					</uni-collapse-item>
				</uni-collapse>
			</view>
		</s-pull-scroll>
		<!-- #ifdef MP-WEIXIN -->
		<view class="footer">
			<view class="submit uni-flex d-items-center d-content-center" @click="contactPhone" hover-class="btn-hover">
				<image src="/static/img/zaixiankefu.png" class="customerIcon"></image> 客服热线
			</view>
			<view class="submit uni-flex d-items-center d-content-center" hover-class="btn-hover">
				<button class="contact" open-type="contact"></button>
				<image src="/static/img/zaixiankefu.png" class="customerIcon"></image> 在线客服
			</view>
		</view>
		<!-- #endif -->
		<!-- #ifdef H5 -->
		<view class="footer">
			<view class="submit uni-flex d-items-center d-content-center" @click="contactPhone" hover-class="btn-hover">
				<image src="/static/img/zaixiankefu.png" class="customerIcon"></image> 客服热线
			</view>
		</view>
		<!-- #endif -->

	</view>
</template>

<script>
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	import uniCollapse from '@/components/uni-collapse/uni-collapse.vue'
	import uniCollapseItem from '@/components/uni-collapse-item/uni-collapse-item.vue'
	export default {
		components: {
			uniCollapse,
			sPullScroll,
			uniCollapseItem
		},
		data() {
			return {
				dataobject: {
					merchantphone: "", //门店电话
					cutomerphone: "", //客服电话
					dataList: []
				}
			}
		},
		onLoad() {
			this.refresh(); 
		},
		methods: {
			contactPhone() {
				let array = new Array(),
					_this = this;
				array[0] = _this.dataobject.merchantphone;
				array[1] = _this.dataobject.cutomerphone;
				uni.showActionSheet({
					itemList: array,
					success(res) {
						_this.$api.callPhone(array[res.tapIndex])
					}
				})
			},
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
					cmd: 'getQuestionList',
					merchant_id: uni.getStorageSync("merchantId")
				}
				const curList = [];
				this._reqw.post(e).then(res => {
					res.result == 0 ?
						(pullScroll.finish(), this.dataobject = res.body) :
						this.$api.tip(res.resultNote);
				}).catch(err => {})
			}
		}
	}
</script>

<style scoped lang="scss">
	.customerIcon {
		width: 32upx;
		height: 32upx;
		margin-right: 10upx;
	}

	.list-con {
		width: 698upx;
		margin: 30upx auto;
	}

	.list-item {
		padding: 30upx;
		font-size: 24upx;
		color: #999999;
	}

	.contact {
		position: absolute;
		top: 0;
		left: 0;
		width: 280upx;
		height: 60upx;
		opacity: 0;
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 100upx;
		justify-content: space-around;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		box-shadow: 0 -1upx 5upx rgba(0, 0, 0, 0.1);
		box-sizing: border-box;

		.submit {
			width: 280upx;
			height: 60upx;
			border: 2upx solid #007030;
			border-radius: 8upx;
			position: relative;
			box-sizing: border-box;
		}

		.useroptions {
			width: 702upx;
			line-height: 79upx;
			border-radius: 40upx;
			text-align: center;
			color: #fff;
		}
	}
</style>
