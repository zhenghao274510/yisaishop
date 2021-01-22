<template>
	<view class="">
		<view class="top-con">
			<text class="point-num">{{sy_point}}</text><text class="point-info">积分</text>
		</view>
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true" top="200">
			<view class="con-details">
				<block v-for="(v,k) in dataList" :key="k">
					<view class="shouyi-con pad">
						<view class="uni-flex d-items-center d-between">
							<view class="uni-flex uni-column uni-flex-item">
								<view class="xiaofei-name uni-ellipsis" >
									{{v.title}}
								</view>
								<view class="xiaofei-time">
									{{v.createDate}}
								</view>
							</view>
						</view>
						<view class="uni-flex d-items-center" v-if="v.flag==1">
							+{{v.point}}
						</view>
						<view class="uni-flex d-items-center" v-else>
							-{{v.point}}
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
				sy_point:'',
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
					cmd:'getPointDetailList',
					uid:uni.getStorageSync('uid'),
					nowPage: pullScroll.page
				}
				const curList = [];
				this._reqw.post(e).then(res => {
					res.result == 0 ?
						( this.sy_point=res.body.sy_point,
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
<style>
</style>

<style scoped lang="scss">
	.top-con{
		width: 750upx;
		height: 200upx;
		background: url(../../static/img/zhuanxiangjiabg.png);
		background-size: 100% 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.point-num{
		font-size: 90upx;
		font-weight: bold;
		color: #FFFFFF;
	}
	.point-info{
		font-size:40upx;
		color: #FFFFFF;
	}
	//  新增
	.shouyi-con {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin: 0 auto 2upx;
		overflow: hidden;
		padding: 20upx;
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
			color: #999999;
		}

		.xiaofei-name {
			font-size: 30upx;
			font-weight: bold;
			width: 560upx;
		}

	}
</style>
