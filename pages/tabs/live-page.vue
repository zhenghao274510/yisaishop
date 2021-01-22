<template>
	<view class="">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true">
			<view class="live-item-con" :class="[v.live_status==101?'liveOnBg':'liveUpBg']"  v-for="(v,k) in dataList"
			 :key="k" @click='userSeeLive(v)'>
				<view class="" style="font-size:34upx;color:#000000;font-weight: bold;">
					{{v.name}}
				</view>
				<view class="" style="font-size:24upx;color:#007030;">
					{{v.anchor_name}}
				</view>
				<view class="uni-flex d-between d-items-center" style="margin-top: 40upx;">
					<image :src="v.cover_img" class="live-icon"></image>
					<view class="live-right">
						<image :src="v.share_img" class="live-icon-right"></image>
						<!-- live_status 直播间状态。101：直播中，102：未开始，103已结束，104禁播，105：暂停，106：异常，107：已过期 -->
						<view class="live-btn">
							{{v.live_status==101?'进入直播间':v.live_status==102?'开播提醒':v.live_status==103?'观看回放':
							v.live_status==104?'禁播':'暂停中'}}
							<subscribe :room-id="v.roomid" style="position:absolute;top: 0;left: 0;width: 100%;height: 100%;">
							</subscribe>
						</view>
					</view>
				</view>
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
			}
		},
		onLoad() {
			this.refresh();
		},
		methods: {
			userSeeLive(v) {
				console.log(v)
				let roomId = [v.roomid] // 填写具体的房间号，可通过下面【获取直播房间列表】 API 获取
				// 开发者在直播间页面路径上携带自定义参数（如示例中的path和pid参数），后续可以在分享卡片链接和跳转至商详页时获取，详见【获取自定义参数】、【直播间到商详页面携带参数】章节（上限600个字符，超过部分会被截断）
				let customParams = encodeURIComponent(JSON.stringify({
					path: 'pages/sharepage/shareDetails'
				}))
				wx.navigateTo({
					url: `plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id=${roomId}&custom_params=${customParams}`
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
			async loadData(pullScroll) {
				if (pullScroll.page == 1) {
					this.dataList = [];
				}
				let e = {
					cmd: 'getliveinfo',
					start: pullScroll.page-1,
					limit: 50
				}
				const curList = [];
				const res = await this._reqw.post(e);
				console.log(res)
				if (res.result != 0) {
					this.$api.tip(res.resultNote);
					return
				}
				res.body.room_info.length == 0 ? (pullScroll.empty()) : res.body.room_info.forEach(item => {
						curList.push(item)
					}), this.dataList = this.dataList.concat(curList), pullScroll.page >= res.body.total / 10 ? pullScroll.finish() :
					pullScroll.success()
			}
		}
	}
</script>

<style scoped>
	.liveOnBg {
		background-color: #FFFFFF;
	}

	.liveUpBg {
		background-color: #FFFFFF;
	}

	.live-item-con {

		padding: 40upx 22upx;
		position: relative;
		margin-bottom: 20upx;
	}

	.live-icon {
		width: 436upx;
		height: 370upx;
		border-radius: 15upx;
	}

	.live-right {
		height: 370upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}

	.live-icon-right {
		width: 224upx;
		height: 273upx;
		border-radius: 15upx;
	}

	.live-btn {
		width: 200upx;
		line-height: 50upx;
		background: linear-gradient(90deg, #FFBB00, #FFA600);
		border-radius: 25upx;
		text-align: center;
		font-size: 26upx;
		color: #FFFFFF;
		position: relative;
	}
</style>
