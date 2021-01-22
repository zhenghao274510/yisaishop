<template>
	<view class="mask" v-if="showPicker" @click.stop="close">
		<view class="mask">

		</view>
		<view class="content">
			<view class="poster-box y-f" v-if="poster.finalPath">
				<image :src="poster.finalPath" mode="widthFix" class="posterImage"></image>
				<view class="share-box">
					<view class="share-list-box uni-flex d-items-center d-content-center d-column">
						<view class="share-item uni-flex d-items-center d-content-center d-column" @tap="share">
							<image class="share-img" src="/static/img/baocun.png"></image>
						</view>
						<!-- #ifdef MP-WEIXIN -->
						<view class="share-title">保存图片</view>
						<!-- #endif -->
						<!-- #ifdef H5 -->
						<view class="share-title">长按保存到相册</view>
						<!-- #endif -->
					</view>
				</view>
			</view>
			<view class="hideCanvasView">
				<canvas class="hideCanvas" canvas-id="goods_poster" :style="{ width: (poster.width || 1) + 'px', height: (poster.height || 1) + 'px' }"></canvas>
			</view>
		</view>

	</view>

</template>

<script>
	const bassUrl = require('@/common/js/config.js').bass;
	import {
		getSharePoster
	} from '@/components/poster/QS-SharePoster/QS-SharePoster.js';
	export default {
		props: {
			dataobject: {
				type: Object,
				default () {
					return {}
				}
			},
			type: {
				type: [String, Number],
				default: 0
			}
		},
		data() {
			return {
				showPicker: false,
				poster: {},
				canvasId: 'goods_poster',
				shareInfo: {
					path: ''
				}
			};
		},
		methods: {
			open() {
				this.showPicker = true;
				this.shareFc();
			},
			close() {
				this.showPicker = false;
			},
			async shareFc() {
				let that = this;
				console.log( encodeURI(`${bassUrl}/details/share?id=${that.dataobject.id}&type=${this.type}`) )
				try {
					console.log('准备生成:' + new Date());
					const d = await getSharePoster({
						_this: this, //若在组件中使用 必传
						type: 'goodsPoster',
						backgroundImage: '/static/img/invite_poster.png', //接口返回的背景图
						formData: {
							//访问接口获取背景图携带自定义数据
						},
						posterCanvasId: this.canvasId, //canvasId
						delayTimeScale: 20, //延时系数
						drawDelayTime: 500, //draw延时时间
						bgScale: 1,
						background: {
							width: uni.getSystemInfoSync().screenWidth,
							height: uni.getSystemInfoSync().screenHeight * 0.7,
							backgroundColor: '#fff'
						},
						drawArray: ({
							bgObj,
							type,
							bgScale
						}) => {
							const dx = bgObj.width * 0.3;
							const fontSize = bgObj.width * 0.05;
							const lineHeight = bgObj.height * 0.04;
							console.log(bgObj)
							//可直接return数组，也可以return一个promise对象, 但最终resolve一个数组, 这样就可以方便实现后台可控绘制海报
							return new Promise((rs, rj) => {
								rs([{
										type: 'text', //标题
										text: '伊赛用心做好每一件商品！',
										size: fontSize * 0.8,
										color: '#343434',
										backgroundColor: "#CCC",
										alpha: 1,
										textAlign: 'left',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											console.log('index页面的text的infocallback ，textlength:' + textLength);
											return {
												dx: bgObj.width * 0.5 - textLength / 2,
												dy: bgObj.height * 0.07
											};
										},
										serialNum: 0
									},
									{
										type: 'image', //头像
										url: that.dataobject.icon,
										alpha: 1,
										dx: bgObj.width * 0.15,
										dy: bgObj.width * 0.15,
										infoCallBack(imageInfo) {
											console.log('index页面的imageInfo的infocallback ，imageInfo:' + JSON.stringify(imageInfo))
											that.imageHeight = imageInfo.height;
											return {
												dWidth: bgObj.width * 0.7,
												dHeight: bgObj.height * 0.55,
												// roundRectSet: { // 圆角矩形
												// 	r: imageInfo.width * .1
												// }
											};
										}
									},
									{
										type: 'text', //昵称
										text: that.dataobject.title,
										size: fontSize*.9,
										color: '#343434',
										fontWeight: 'bold',
										alpha: 1,
										textAlign: 'middle',
										textBaseline: 'middle',
										lineFeed: {
											//换行
											maxWidth: bgObj.width * 0.5,
											lineNum:2,
											dx: -1
										},
										infoCallBack(textLength) {
											console.log('index页面的text的infocallback ，textlength:' + textLength);
											return {
												dx: bgObj.width * 0.05,
												dy: bgObj.height * 0.76,
											};
										},
										serialNum: 0,
										id: 'tag1' //自定义标识
									},
									{
										type: 'text', //昵称
										text: that.dataobject.skuList[0].title,
										size: fontSize * 0.6,
										color: '#9A9A9A',
										fontWeight: 'bold',
										alpha: 1,
										textAlign: 'middle',
										textBaseline: 'middle',
										lineFeed: {
											//换行
											maxWidth: bgObj.width * 0.8,
											lineNum: 1,
											dx: -1
										},
										infoCallBack(textLength) {
											console.log('index页面的text的infocallback ，textlength:' + textLength);
											return {
												dx: bgObj.width * 0.05,
												dy: bgObj.height * 0.9,
											};
										},
										serialNum: 0,
										id: 'tag1' //自定义标识
									},
									{
										type: 'text', //昵称
										// fontStyle: 'italic',//倾斜
										text: `已销:${that.dataobject.sales}`,
										size: fontSize * 0.6,
										color: '#666',
										alpha: 1,
										textAlign: 'middle',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											console.log('index页面的text的infocallback ，textlength:' + textLength);
											return {
												dx: bgObj.width * 0.35,
												dy: bgObj.height * 0.9,
											};
										},
										serialNum: 0,
										id: 'tag1' //自定义标识
									},
									{
										type: 'text', //昵称
										// fontStyle: 'italic', //倾斜
										text: `现价:￥${that.$api.parsePrice(that.dataobject.price) }`,
										size: fontSize * 0.8,
										color: '#FF0000',
										alpha: 1,
										textAlign: 'middle',
										textBaseline: 'middle',
										lineFeed: {
											//换行
											maxWidth: bgObj.width * 0.8,
											lineNum: 1,
											dx: -1
										},
										infoCallBack(textLength) {
											console.log('index页面的text的infocallback ，textlength:' + textLength);
											return {
												dx: bgObj.width * 0.05,
												dy: bgObj.height * 0.95
											};
										},
										serialNum: 0,
										id: 'tag1' //自定义标识
									},
									{
										type: 'text', //昵称
										// fontStyle: 'italic', //倾斜
										text: `原价:￥${that.$api.parsePrice(that.dataobject.old_price)}`,
										size: fontSize * 0.6,
										color: '#9A9A9A',
										alpha: 1,
										textAlign: 'middle',
										textBaseline: 'middle',
										lineFeed: {
											//换行
											maxWidth: bgObj.width * 0.8,
											lineNum: 1,
											dx: -1
										},
										infoCallBack(textLength) {
											console.log('index页面的text的infocallback ，textlength:' + textLength);
											return {
												dx: bgObj.width * 0.35,
												dy: bgObj.height * 0.95
											};
										},
										serialNum: 0,
										id: 'tag1' //自定义标识
									},
									{
										type: 'qrcode', //头像
										// url: that.dataobject.icon,
										text:`${bassUrl}/details/share?id=${that.dataobject.id}&type=${this.type}`,
										size:100,
										alpha: 1,
										dx: bgObj.width * 0.65,
										dy: bgObj.height * 0.7
									},
									{
										type: 'text', //标题
										// fontStyle: 'italic', //倾斜
										//#ifdef MP-WEIXIN
										text: '扫描二维码去购买',
										//#endif
										//#ifdef H5
										text: '长按保存到相册',
										//#endif
										size: fontSize * 0.6,
										color: '#343434',
										alpha: 1,
										textAlign: 'middle',
										textBaseline: 'middle',
										infoCallBack(textLength) {
											console.log('index页面的text的infocallback ，textlength:' + textLength);
											return {
												dx: bgObj.width * 0.66,
												dy: bgObj.height * 0.95
											};
										},
										serialNum: 0
									}
								]);
							});
						},
						setCanvasWH: ({
							bgObj,
							type,
							bgScale
						}) => {
							// 为动态设置画布宽高的方法，
							this.poster = bgObj;
						}
					});
					// console.log('海报生成成功, 时间:' + new Date() + '， 临时路径: ' + d.poster.tempFilePath);
					// this.poster.finalPath = d.poster.tempFilePath;
					this.$set(this.poster, 'finalPath', d.poster.tempFilePath);
				} catch (e) {
					uni.hideLoading();
					this.$api.tip(JSON.stringify(e));
					console.log(JSON.stringify(e));
				}
			},
			// 分享
			share() {
				let that = this;
				// #ifdef H5
				wxsdk.share({
						title: that.shareInfo.title,
						path: that.shareInfo.path,
						imageUrl: that.shareInfo.imageUrl
					},
					res => {
						that.$tools.toast('分享成功');
					}
				);
				// #endif
				// #ifdef MP-WEIXIN
				uni.saveImageToPhotosAlbum({
					filePath: that.poster.finalPath,
					success: res => {
						that.$api.tip('保存成功');
					},
					fail: err => {
						that.$api.tip('保存失败');
					}
				});
				// #endif
				that.close();
			},
			copyLink() {
				let that = this;
				uni.setClipboardData({
					data: that.shareInfo.copyLink,
					success: () => {
						//#ifdef H5
						that.$tools.toast('已复制到剪切板');
						//#endif
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
		background: rgba(0, 0, 0, .3);
	}

	.share-box {
		background: #FFFFFF;
		padding: 20upx 0;
		color: #666666;
		font-size: 26upx;
	}

	.content {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		z-index: 9999;
		display: flex;
		justify-content: center;
		align-items: center;

		.bg_img {
			width: 100%;
			height: 100%;
		}

		.poster-box {
			.posterImage {
				width: 700upx;
				overflow: hidden;
			}
		}
	}

	.hideCanvasView {
		position: relative;
	}

	.hideCanvas {
		position: fixed;
		top: -99999upx;
		left: -99999upx;
		z-index: -99999;
	}

	.share-img {
		width: 97upx;
		height: 97upx;
	}
</style>
