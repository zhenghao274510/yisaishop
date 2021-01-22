<template>
	<view class="">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true">
			<view class="con-details">
				<block v-for="(v,k) in dataList" :key="k">
					<view class="shouyi-con">
						<view class="uni-flex uni-flex-item uni-column d-items-center d-content-center" style="padding:20upx 10upx;">
							<view class="uni-flex uni-flex-item  d-items-center d-between" style="width: 100%;">
								<view class="">
									<view class="xiaofei-name uni-ellipsis">
										{{v.title}}
									</view>
									<view class="number-item">
										结算订单号{{v.id}}
									</view>
								</view>
								<view class="uni-flex d-items-center">
									{{v.amount}}
								</view>
							</view>
							<view class="uni-flex d-items-center d-between uni-flex-item" style="width: 100%;">
								<view class="xiaofei-time">创建时间：{{v.createDate}} </view>
								<view class="xiaofei-time">结算时间：{{v.recive_order_time}} </view>
								<view class="xiaofei-time">订单金额￥{{v.order_money}}</view>
							</view>


						</view>
					</view>
				</block>
			</view>
		</s-pull-scroll>
	</view>
</template>

<script>
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	export default {
		components: {
			sPullScroll
		},
		data() {
			return {
				dataList: []
			}
		},
		onLoad() {
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
					cmd:'getAmountDetailList',
					uid:uni.getStorageSync('uid'),
					nowPage: pullScroll.page
				}
				const curList = [];
				this._reqw.post(e).then(res => {
					res.result == 0 ?
						(
							(res.body.dataList.length == 0 ? (pullScroll.empty()) : res.body.dataList.forEach(item => {
									curList.push(item)
								}), this.dataList = this.dataList.concat(curList), pullScroll.page >= res.body.totalPage ? pullScroll.finish() :
								pullScroll.success())
						) :
						this.$api.tip(res.resultNote);
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.number-item {
		font-size: 24upx;
		color: #007030;
	}
	//  新增
	.shouyi-con {
		width: 100%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top:10upx;
		overflow: hidden;
		box-sizing: border-box;
		background-color: #FFFFFF;

		.right {
			color: #45C46C;
		}

		.add {
			color: #ff0000;
		}

		.xiaofei-time {
			font-size: 20upx;
			color: #999999;
		}

		.xiaofei-name {
			font-size: 30upx;
			font-weight: bold;
			width: 560upx;
		}

	}
</style>
