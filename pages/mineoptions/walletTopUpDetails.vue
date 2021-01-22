<template>
	<view class="">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true">
			<view class="con-details">
				<block v-for="(v,k) in dataList" :key="k">
					<view class="shouyi-con pad">
						<view class="uni-flex d-items-center d-between">
							<view class="uni-flex uni-column uni-flex-item">
								<view class="xiaofei-name uni-ellipsis">
									{{v.title}}
								</view>
								<view class="xiaofei-time">
									{{v.createDate}}
								</view>
							</view>
						</view>
						<view class="uni-flex d-items-center" v-if="v.type==0">
							- <text style="font-size: 24upx;">￥</text> {{v.amount}}
						</view>
						<view class="uni-flex d-items-center" v-else>
							+<text style="font-size: 24upx;">￥</text>{{v.amount}}
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
				dataList: [],
				showEmpty: false
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
					cmd:'getBalanceDetailList',
					uid:getApp().globalData.uid||uni.getStorageSync('uid'),
					nowPage: pullScroll.page
				}
				const curList = [];
				this._reqw.post(e).then(res => {
					res.result == 0 ?
						(
							(res.body.dataList.length == 0 ? (pullScroll.empty()) : res.body.dataList.forEach(item => {
									curList.push(item)
								}), this.dataList = this.dataList.concat(curList), pullScroll.page>=res.body.totalPage ? pullScroll.finish() :
								pullScroll.success())
						) :
						this.$api.tip(res.resultNote);
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	//  新增
	.shouyi-con {
		width: 96%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin:20upx auto 0;
		overflow:hidden;
		padding:20upx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	
		.right {
			color: #45C46C;
		}
	
		.add {
			color: #ff0000;
		}
	
		.xiaofei-time {
			font-size: 22upx;
			color:#999999;
		}
	
		.xiaofei-name {
			font-size: 30upx;
			font-weight: bold;
			width: 560upx;
		}
	
	}
</style>
