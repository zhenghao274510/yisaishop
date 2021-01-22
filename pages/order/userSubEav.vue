<template>
	<view class="content">
		<block v-for="(item,index) in dataList" :key="index">
			<view class="cart-item">
				<view class="cart-item-left">
					<image :src="item.image" mode="aspectFill" lazy-load class="product-img"></image>
				</view>
				<view class="item-right">
					<view class="item-right-top">
						<view class="clamp title uni-ellipsis">{{item.title}}</view>
					</view>
					<view class="item-right-top">
						<view class="skuname">{{item.skuname}}</view>
					</view>
					<view class="item-right-top">
						<view class="price">￥{{item.price}}</view>
						<view class="step">
							x {{item.number}}
						</view>
					</view>
				</view>
			</view>
			<view class="" style="padding: 20upx;background: #F6F6F6;">
				<textarea value="" maxlength="400" placeholder="请输入您对商品的评价" class="textarea" v-model="item.content" />
				</view>
			<view class="eva-content">
				<view class="img-list">
					<view class="img" v-for="(v, k) in item.images" :key="k" @click="seeDetails(index,k)">
						<image :src="v" mode="scaleToFill"></image>
					</view>
					<view class="img" @click="uploads(index)" v-if="item.images.length<3">
						<image src="/static/img/tianjiatupian.png" mode="scaleToFill"></image>
					</view>
					
				</view>
			</view>
		</block>
		
		<view class="footer-btn" hover-class="btn-hover" @click.stop="sub">提 交</view>
	</view>
</template>

<script>
	import bassUrl from "@/common/js/config.js"
	export default {
		data() {
			return {
				orderId: '',
				dataList: []
			};
		},
		onLoad(options) {
			this.orderId = options.id;
			this.loadData();
		},
		methods: {
			uploads(k){
					let that = this;
					uni.chooseImage({
						count: 3-that.dataList[k].images.length, //默认9
						sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
						sourceType: ['album'], //从相册选择
						success: function(res) {
							console.log(res);
							res.tempFiles.forEach(item=>{
								that.formImg(item,k)
							})
					}
				})
			},
			formImg(res,k){
					console.log(res);
					let data=
					this._reqw
						.upflie(res)
						.then(res => {
							console.log(res);
							let r = JSON.parse(res);
							r.result == 0 ?this.dataList[k].images.push(r.object) : this.$api.tip(r.resultNote);
						})
						.catch(err => {});
				},
				sub(){
					console.log(this.dataList)
					this.throttle(() => {
					let items = [];
					this.dataList.forEach((item,index)=>{
						items.push({
							id:item.productId,	
							skuid:item.skuid,
							skuname:item.skuname,
							content:item.content,
							images:item.images.join('|')
						})
					})
					let parmas = {
						cmd:'commentOrder',
						uid: uni.getStorageSync('uid'),
						orderId: this.orderId,
						productList: items
					};
					console.log(parmas);
					this._reqw
						.post(parmas,'')
						.then(res => {
							res.result==0?
								(this.$api.tip('提交成功!'),
									setTimeout(() => {
										this.$api.back();
									}, 300)) :
								this.$api.tip(res.resultNote);
						})
						.catch(err => {});
					})
				},
				loadData() {
					this.$api.loading('加载中...')
					let parmas = {
						cmd: 'getOrderById',
						orderId: this.orderId
					};
					 // this.dataobject = 
					console.log(parmas);
					this._reqw
						.post(parmas)
						.then(res => {
							uni.hideLoading();
							res.result == 0 ?(res.body.dataList.forEach(item=>{
								item.images=[],
								item.content=""
							}),this.dataList=res.body.dataList) : this.$api.tip(res.resultNote);
						})
						.catch(err => {});
				},
			}
			

	}
</script>
<style>
	page{
		height: 100%;
		background: #FFFFFF;
	}
</style>

<style scoped lang="scss">
	.cart-item {
		display: flex;
		position: relative;
		// background: #ffffff;
		padding: 10upx;
		box-sizing: border-box;
	
	}
	
	.price {
		color: #FF0000;
		font-size: 30upx;
	}
	
	.uni-icon {
		font-size: 36upx;
	}
	
	.item-right-top {
		display: flex;
		flex: 1;
		justify-content: space-between;
		align-items: center;
	}
	
	.skuname {
		font-size: 20upx;
		color: #999999;
	}
	
	.bottom-width {
		width: 100%;
		justify-content: space-between;
		align-items: center;
		color: #FFFFFF;
	}
	
	.cart-item-left {
		position: relative;
		display: flex;
		align-items: center;
	}
	
	.product-img {
		width: 160upx;
		height: 160upx;
		border-radius: 5px;
		margin-left: 5upx;
	}
	
	.item-right {
		display: flex;
		flex-direction: column;
		flex: 1;
		padding-left: 10upx;
		overflow: hidden;
		position: relative;
	}
	.title{
		font-weight: bold;
	}
	
	.title,
	.price {
		height: 40upx;
		line-height: 40upx;
		flex: 1;
	}
	button {
		background-color: none;
		border: none;
	}

	.eva-content {
		width: 100%;
		margin: 20px 0;
	}
	.textarea {
		padding:20upx;
		width: 100%;
		height: 80px;
		box-sizing: border-box;
		font-size: 26upx;
		border-radius: 2px;
		// color: #a4a4a5;
	}

	.server-val {
		display: flex;
		align-items: center;
		padding: 10px 0;
	}

	.footer-btn {
		width: 90%;
		background: #007030;
		border-radius: 39px;
		box-shadow: 0px 1upx 4upx 0px #F2F2F2;
		border-radius:40upx;
		margin-left: 5%;
		font-size: 34upx;
		color: #ffffff;
		font-weight: bold;
		text-align: center;
		line-height:88upx;
	}

	

	.img-list {
		display: flex;
		width: 100%;
		flex-wrap: wrap;
		padding:20upx 0;
		// height: ;

		.img {
			width: 160upx;
			padding: 0 20upx;
			height: 160upx;

			image {
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
