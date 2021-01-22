<template>
	<view class="">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true">
			<view class="vip-bottom">
				<view class="uni-flex d-items-center ">
					<view class="vip-bottom-right uni-flex d-column d-items-center d-content-center" @click="change(2)">
						<image src="/static/img/huiyuan.png" class="add-img" style="width: 96upx;height: 96upx;"></image>
						<view class="" style="font-size:24upx;color: #FFFFFF;margin-top:10upx;">
							会员专享价
						</view>
					</view>
					<view class="vip-bottom-right uni-flex d-column d-items-center d-content-center" @click="change(3)">
						<image src="/static/img/jifenduihapli.png" class="add-img"></image>
						<view class="" style="font-size:24upx;color: #FFFFFF;margin-top:30upx;">
							积分兑好礼
						</view>
					</view>
				</view>
			</view>
			<view class="goods_info_use">
				<view class="goods_title bor_title">
					获取条件
				</view>
				<view class="" style="padding-top:20upx;">
					伊赛全体会员均可享受
				</view>
			</view>
			<view class="goods_info_use">
				<view class="goods_title bor_title">
					权益说明
				</view>
				<view class="">
					<jyf-parser :html="content" ref="article"></jyf-parser>
				</view>
			</view>
		</s-pull-scroll>
	</view>

</template>

<script>
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	import jyfParser from "@/components/jyf-parser/jyf-parser";
	export default {
		components: {
			jyfParser,
			sPullScroll
		},
		data() {
			return {
				content: '',
				type:'2',
				top:0
			}
		},
		onLoad(options) {
			this.type=options.id;
			this.refresh();
		},
		methods: {
			change(ind){
				this.type=ind;
				this.refresh();
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
				let e = {
					cmd: 'getAgreementList'
				}
				this._reqw.post(e).then(res => {
					res.result == 0 ? (res.body.dataList.forEach(item => {
						item.type == this.type ? (this.content = this.$api.formText(item.content),pullScroll.finish()) : 0
					})) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			}
		}
	}
</script>
<style>
	page {
		background: #FFFFFF;
	}
</style>

<style scoped lang="scss">
	.vip-bottom {
		height: 200upx;
		padding: 20upx;
		background: url("/static/img/zhuanxiangjiabg.png");
		background-size: 100% 100%;
	}

	.vip-bottom-right {
		width: 374upx;
		height: 187upx;
		border-radius: 15upx;

		.add-img {
			width: 58upx;
			height: 58upx;
		}
	}

	.goods_info_use {
		padding: 20upx;

		.goods_title {
			font-size: 34upx;
			font-weight: bold;
			color: rgba(51, 51, 51, 1);
			position: relative;
			padding-bottom: 5upx;
		}
	}
</style>
