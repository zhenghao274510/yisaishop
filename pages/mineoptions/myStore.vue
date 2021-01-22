<template>
	<view class="">
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true">
			<uni-swipe-action class="uni-second-list">
					<uni-swipe-action-item :right-options="options" @click="onClick" @change="change($event,k)" v-for="(v,k) in dataList" :key="k">
						<view class="uni-second" @tap="gotoDetails(v.product_id)">
							<view class="image-second lazyload lazypic" :class="{loaded: v.loaded}">
								<image class="uni-second-image" :src="v.icon" mode="aspectFill" lazy-load="true" @load="imageOnLoad(v)"></image>
							</view>
							<view class="uni-second-price">
								<view class="uni-flex d-between d-items-center">
									<view class="uni-second-title uni-ellipsis">{{v.title}}
									</view>
									<view class="">
										x 1
									</view>
								</view>

								<view class="uni-flex d-items-center d-between">
									<!-- <view class="sku-name uni-ellipsis">
										{{v.spectionname}}
									</view> -->
									<view class="">
										<text class="price-symbol " style="color:#F22519;">￥</text><text class="price">{{v.price | parsePrice}}</text>
									</view>
								</view>
								<view class="uni-flex d-between d-items-center">
									<!-- <view class="uni-flex d-items-center">
										<view style="text-decoration: line-through;">
											<text class="old-price">￥</text><text class="old-price">{{v.old_price}}</text>
										</view>
									</view> -->
									<view class="store-num">

									</view>
								</view>
							</view>
						</view>
					</uni-swipe-action-item>
			</uni-swipe-action>
		</s-pull-scroll>
	</view>
</template>
<script>
	import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
	import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	export default {
		components: {
			uniSwipeAction,
			uniSwipeActionItem,
			sPullScroll
		},
		data() {
			return {
				options: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}],
				itemId: "",
				itemIndex: '',
				dataList: []
			}
		},
		onShow() {
			this.refresh()
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
			change(e,k) {
				console.log(e,k);
				let item=this.dataList[k];
				this.itemId =item.id;
				this.itemIndex = k;
			},
			onClick() {
				this.$api.showTip('确定删除吗?',r=>{
					if(r.confirm){
						let parmas = {
							cmd: 'delCollect',
							id: this.itemId
						}
						this._reqw.post(parmas).then(res => {
							res.result == 0 ? (this.$api.tip('删除成功!'),this.refresh()) : this.$api.tip(res.resultNote);
						}).catch(err => {})
					}
				})
				
			},
			gotoDetails(id) {
				this.$api.navTo(`/pages/details/goodsDetails?id=${id}&type=5`)
			},
			loadData(pullScroll) {
				if (pullScroll.page == 1) {
					this.dataList = [];
				}
				let parmas = {
					cmd: 'getCollectList',
					uid: uni.getStorageSync('uid'),
					merchant_id:uni.getStorageSync('merchantId'),
					nowPage: pullScroll.page,
				}
				const curList = [];
				this._reqw.post(parmas).then(res => {
					res.result == 0 ? (
						(res.body.dataList.length == 0 ? pullScroll.empty() : res.body.dataList.forEach(item => {
								curList.push(item)
							}), this.dataList = this.dataList.concat(curList), pullScroll.page >= res.body.totalPage ? pullScroll.finish() :
							pullScroll.success())) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
		}
	}
</script>
<style lang="scss" scoped>
	.small-btn {
		width: 120upx;
		height: 50upx;
		background: rgba(255, 73, 103, 1);
		border-radius: 25upx;
		text-align: center;
		line-height: 50upx;
		color: #FFFFFF;
		font-size: 26upx;
	}

	.old-price {
		font-size: 17upx;
		color: rgba(153, 153, 153, 1);
	}

	.price {
		color: #FF0000;
		font-size: 28upx;
		font-weight: bold;
	}

	.price-symbol {
		font-size: 20upx;
	}

	.sku-name {
		color: #666666;
		font-size: 22upx;
		margin-right: 20upx;
	}

	.uni-second-list {
		margin-bottom: 10px;
	}

	.uni-second {
		display: flex;
		padding:10upx;
		width: 100%;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 4upx;
		margin-bottom: 10upx;
	}

	.image-second {
		width: 155upx;
		height: 155upx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
	}

	.uni-second-image {
		width: 100%;
		height: 100%;
		border-radius: 10upx;
	}

	.uni-second-title {
		font-size: 32upx;
		font-weight: bold;
		width: 90%;
	}

	.uni-second-price {
		width: 75%;
		font-size:31upx;
		padding-left: 15upx;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
	}

	.store-num {
		font-size: 22upx;
		color: rgba(102, 102, 102, 1);
	}
</style>
