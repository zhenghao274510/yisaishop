<template>
	<view class="" style="padding-bottom:60px;">
		<uni-steps :options="[{title: '选择商品'}, {title: '参与拼团'}, {title: '人满成团'}]" :active="3" v-if="type==1"></uni-steps>
		<!-- // 1：自提2：外卖3：邮寄 -->
		<view class="" v-if="send_type==1">
			<!-- 地址 -->
			<view class="address-section">
				<view class="order-content">
					<view class="uni-flex d-items-center uni-flex-item ">
						<image src="/static/img/shouyedizhi.png" mode="" style="width: 27upx;height: 27upx;margin-right: 30upx;"></image>
						<view class="cen">
							<view class="top uni-flex">
								<view class="mobile">
									<text>{{shop.address}}</text>
								</view>
							</view>
							<text class="cell-tit">{{shop.distance}}</text>
						</view>
					</view>
					<view class="sub-user-btn">
						自提
					</view>
				</view>
			</view>
		</view>
		<block v-else>
			<view class="" v-if="addressData.id!=''">
				<!-- 地址 -->
				<view class="address-section" @click="choseAddress">
					<view class="tips-btn">
						{{send_type==1?"外送":"收件人信息"}}
					</view>
					<view class="order-content">
						<view class="uni-flex d-items-center uni-flex-item ">
							<image src="/static/img/shouyedizhi.png" mode="" style="width: 27upx;height: 27upx;margin-right: 30upx;"></image>
							<view class="cen">
								<view class="top uni-flex">
									<view class="mobile">
										<text>{{addressData.name}}</text><text>{{addressData.sex==0?'女士':'先生'}}</text> <text style="margin-left: 15px;">{{addressData.phone}}</text>
									</view>
								</view>
								<text class="cell-tit">{{addressData.province_city_town}}{{addressData.address}}</text>
							</view>
						</view>
						<view class="uni-icon uni-icon-arrowright"></view>
					</view>
				</view>
			</view>
			<view class="noAddress con-bg" @click="choseAddress" v-else>
				<view class="mobile address-tit">
					选择您的收货地址
				</view>
				<view class="uni-icon uni-icon-arrowright"></view>
			</view>
		</block>
		<view class="goods-section con-bg">
			<!-- 商品列表 -->
			<view v-for="(item,index) in allCartList" :key="index">
				<view class="g-con" v-for="(v,k) in item.dataList" :key="k">
					<view class="g-item">
						<view class="product-img lazyload lazypic" :class="{loaded: v.loaded}">
							<image :src="v.image" mode="aspectFill" lazy-load="true" @load="imageOnLoad(v)"></image>
						</view>
						<view class="right">
							<text class="title clamp">{{v.title}}</text>
							<view style="margin: 5px 0;">
								<text class="spec uni-ellipsis">{{v.name}}</text>
							</view>
							<view class="price-box">
								<view class="price">￥{{v.price | parsePrice}}</view>
								<view class="">
									× {{v.qty}}
								</view>
							</view>
						</view>
					</view>
					<view class="uni-flex d-items-center">
						<view class="youhui_item" v-if="v.acountPrice">
							{{v.acountPrice}}
						</view>
						<view class="youhui_item" v-if="v.mz_title">
							{{v.mz_title}}
						</view>
					</view>
				</view>
				<view class="uni-flex d-items-center">
					<view class="youhui_item" v-if="item.acountPrice">
						{{item.acountPrice}}
					</view>
					<view class="youhui_item" v-if="item.mz_title">
						{{item.mz_title}}
					</view>
				</view>
			</view>
		</view>
		<!-- 金额明细 -->
		<view class="uni-flex d-between d-items-center con-bg" @click="getCompline">
			<text class="cell-tip">优惠券</text>
			<view class="" style="display: flex;align-items: center;">
				<text v-if="compline.id==''&& !showNoCompline" style="font-size: 24rpx;color: #666666;">请选择</text>
				<text v-if="compline.id!=''&& !showNoCompline" style="font-size: 24rpx;color: #fe2c2c;">
					-￥{{compline.use_type==1?compline.amount:compline.money | parsePrice}}</text>
				<text v-if="showNoCompline" style="font-size: 24rpx;color: #666666;">暂无可用</text>
				<view class="uni-icon uni-icon-arrowright">
				</view>
			</view>
		</view>
		<view class="uni-flex d-between d-items-center con-bg">
			<text class="cell-tip">商品金额</text>
			<view class="cell-tit" style="color:#fe2c2c;font-size:26upx;">￥{{goodsoldPrice | parsePrice}}</view>
		</view>
		<view class="uni-flex d-between d-items-center con-bg" v-if="differencePrice!=0">
			<text class="cell-tip">优惠金额</text>
			<view class="cell-tit" style="color:#fe2c2c;font-size:26upx;">-￥{{differencePrice | parsePrice}}</view>
		</view>
		<view class="uni-flex d-between d-items-center con-bg" v-if="freight!=0">
			<text class="cell-tip">配送费</text>
			<view class="cell-tit" style="color:#fe2c2c;font-size:26upx;">￥{{freight | parsePrice}}</view>
		</view>
		<view class="uni-flex d-between d-items-center con-bg" v-if="showz_p">
			<text class="cell-tip">赠品</text>
			<view class="cell-tit" style="color:#fe2c2c;font-size:26upx;">{{title}}</view>
		</view>
		<view class="uni-flex d-between d-items-center con-bg" v-if="totalPrice!=0">
			<text class="cell-tip">合计</text>
			<view class="cell-tit" style="color:#fe2c2c;font-size:26upx;">
				￥{{totalPrice | parsePrice}}
			</view>
		</view>
		<view class="uni-flex d-items-center con-bg" v-if="send_type==2&& livePrice!=0">
			<text class="cell-tip" style="color:#fe2c2c;font-size:24upx;">起送价￥{{shopInfo.startmoney|parsePrice}},</text>
			<view class="cell-tit" style="color:#fe2c2c;font-size:24upx;">距配送还差￥{{livePrice | parsePrice}}</view>
		</view>
		<view class="remak-con">
			<textarea value="" v-model="remarks" maxlength='400' class="textarea" placeholder="备注特殊要求" placeholder-style="color:#666666" />
			</view>

		<!-- </view> -->

		<!-- 底部 -->
		<view class="footer">
			<view class="price-content" v-if="totalPrice!=0">
				<text class="price-tip" >￥</text>
				<text class="price">{{ totalPrice | parsePrice  }}</text>
			</view>
			<view class="price-content" v-else></view>
			<text class="submit" @click="submit" hover-class="btn-hover">提交订单</text>
		</view>
		<home-pounp type="5" ref="homePounp" :address="shop.address" @click="userConfirm"></home-pounp>
	</view>
</template>

<script>
	import uniSteps from '@/components/uni-steps/uni-steps.vue'
	import homePounp from "@/components/mycom/homePoup.vue"
	export default {
		components: {
			uniSteps,
			homePounp
		},
		data() {
			return {
				showz_p:false, //  是否展示增品
				title:'', //  赠品
				send_type: 2,
				goodsoldPrice:0, //  商品初始价格
				goodsPrice:0,   //  商品活动后价格
				differencePrice:0, //  差价
				distance: 0, // 下单位置 居  店铺距离
				showNoCompline:false,
				isActive:0,   //   店铺 是否活动
				addressData: {
					id: "", //123
					phone: "", //手机号
					name: "", // 名字
					address: "", //地址
					sex: "", //性别（1：男0：女）
					lon: "", //经度
					lat: "", //纬度
					isdefault: "", //是否默认 0否 1是
					province_city_town: "", //省市区
				},
				shopInfo: {
					startmoney:'',  //   起送价
					merchanttype: 1,
					bydistance: "", //包邮距离merchanttype=1
					by_money: "", //超过*公里每公里多少钱merchanttype=1
					man_money: "", //满多少包邮merchanttype=4
					yuan: "", //类型 是否偏远地区1：是2：否 merchanttype=4
					fp_money: "", //非偏远地区运费merchanttype=4yuan=2
					p_money: "" //偏远地区运费merchanttype=4yuan=2
				},
				dataList: [],
				allCartList:[],   //  同类普通商品
				compline: {},
				freight: 0,
				type: '',
				remarks: '',
				groupId:""
			};
		},
		computed: {
			shop() {
				return uni.getStorageSync('shop')
			},
			livePrice(){
				let price=0;
				if(this.goodsPrice!=0){
					price=Number(this.shopInfo.startmoney) -Number(this.goodsPrice)
				}
				price<0?price=0:price;
				return price
			},
			totalPrice(){
				let price=0;
				if(this.goodsPrice!=0){
					price+=Number(this.goodsPrice)
				}
				if(this.freight!=0){
					price+=Number(this.freight)
				}
				if(this.compline.id){
					if(this.compline.use_type==1){
						price-=Number(this.compline.amount) 
					}else{
						price-=Number(this.compline.money)
					}
				}
				return price
			}
			
		},

		onLoad(options) {
			this.dataList = JSON.parse(decodeURIComponent(options.goods));
			this.type = options.type;
			this.getUserBuyType();
			this.filterItem();
		},
		onHide() {
			this.groupId='';
		},
		watch: {
			dataList:{
				handler(n) {
					let price=0;
					n.forEach(item => {
						price += (item.price * 100) * item.qty;
					})
					this.goodsoldPrice=price / 100;
				},
				deep: true
			},
			allCartList:{
				handler(n) {
					let price=0;
					n.forEach(item => {
						price +=Number(item.totalPrice);
					})
					this.goodsPrice=price;
				},
				deep: true
			},
			addressData: {
				handler(n) {
					if(this.send_type!=3){
						this.getdistance()
					}
				},
				deep: true
			},
			goodsPrice(n){
					this.getUserCompline();
					this.differencePrice=this.goodsoldPrice-n;
			}
		},
		methods: {
			 filterItem(){ 
					 var obj={},newArr=[];
					     this.dataList.forEach(function(item,suffix){
					         //根据对象的属性是唯一的，将值作为对象的属性名
					         if(!obj[item.categoryId]){
					             var arr=[];
					             arr.push(item);
					             newArr.push(arr);
					             obj[item.categoryId]=item;
					         }else{
					             newArr.forEach(function(value,index){
					                 //如果已经存在  就循环新组的值将值插入属性相同的数组里   为了防止重复添加   只要和第一个比较就可以了
					                 if(value[0].categoryId==item.categoryId){
					                     value.push(item)
					                 }
					             })
					         }
					     })
						 newArr.forEach(item=>{
							 console.log(item)
							 item.dataList=item;
							 item.goodsPrice=0;
							 item.totalPrice=0;
							 item.childTotalPrice=0;
							 item.forEach(e=>{
								 e.goodsprice=e.price*e.qty;
								 const priceobj=this.getgoodsPrice(e.goodsprice,e.merchantReductionList);
								 if(!priceobj){
								 	e.totalPrice=e.goodsprice;
								 	e.acountPrice=0;
									e.mz_title='';
								 }else{
								 	e.totalPrice=priceobj.price;
								 	e.acountPrice=priceobj.acountPrice;
									e.mz_title=priceobj.mz_title;
								 }
								 item.goodsPrice+=e.price*e.qty;
								  item.childTotalPrice+=Number(e.totalPrice);
							 })
							 
							 const obj=this.getClassPrice(item.goodsPrice,item);
							 if(!obj){
							 	item.totalPrice=item.goodsPrice;
							 	item.acountPrice=0;
							 	item.mz_title='';
							 }else{
							 	item.totalPrice=obj.price;
							 	item.acountPrice=obj.acountPrice;
							 	item.mz_title=obj.mz_title;
							 }
							 if(item.childTotalPrice<item.totalPrice){
								 item.totalPrice=item.childTotalPrice;
							 }
						 })
						 this.allCartList=newArr;
			},
			getUserBuyType() {
				// 1：自提2：外卖3：邮寄
				if (uni.getStorageSync('open') == 2) {
					this.send_type = 3;
					this.getDefault();
					this.getFirget();
					return
				}
				if (uni.getStorageSync('defaultValue')) {
					uni.getStorageSync('defaultValue')==0?this.send_type=1:this.send_type=2
				}
				if (this.send_type !=1) {
					this.getDefault();
					this.getFirget();
				}
			},
			//根据店铺 活动 计算  商品价格  
			getgoodsPrice(price,arr) {
				if(arr.length==0){
					return false 
				}else{
					let pricearray=[];
						arr.forEach(e=>{
							let  youhui_obj={
								price:price*100,
								acountPrice:0,
								mz_title:''
							};
							// "type"://类型（1：满*钱包邮2：满*钱减*钱3：第*件*几折4：满*钱增商品5：每满*钱减*钱）
								youhui_obj=this.filterPrice(youhui_obj,e)
								pricearray.push({
									price:youhui_obj.price/100,
									acountPrice:youhui_obj.acountPrice,
									mz_title:youhui_obj.mz_title
								})
						})	
					let endprice=pricearray.sort((c,d)=>{
							return c.price - d.price;
						});
						return  endprice[0] 
				}
				
			},
			filterPrice(youhui_obj,e){
				if(e.type==2){
					if(youhui_obj.price>=e.mj_price*100){
						youhui_obj.price-=e.mj_amount*100;
						youhui_obj.acountPrice=`满${e.mj_price}元减${e.mj_amount}元`;
					}
				}
				if(e.type==3){
					if(obj.qty>=e.dz_number){
						let n=Math.floor(obj.qty/e.dz_number);
						youhui_obj.price =Number(obj.price) * 100 * (obj.qty-n)+Number(n*(obj.price*100)*e.jz_amount/10) ;
						youhui_obj.acountPrice=`第${e.dz_number}件${e.jz_amount}折`;
					}
					
				}
				if(e.type==4){
					if(youhui_obj.price>=e.mz_price*100){
						this.title=e.zp_title;
						this.showz_p=true;
						youhui_obj.mz_title=`满${e.mz_price}元增${e.zp_title}`;
					}
				}
				if(e.type==5){
					if(youhui_obj.price>=e.mm_price*100){
						let n=Math.floor(youhui_obj.price/(e.mm_price*100))
						youhui_obj.price-=n*e.mm_amount*100
						youhui_obj.acountPrice=`每满${e.mm_price}元减${e.mm_amount}元`;
					}
				}
				return youhui_obj
			},
			//   同类型商品价格
			getClassPrice(price,arry){
				let pricearray=[],arr=arry.dataList[0].merchantReductionList;
				if(arr.lenght==0){
					return  false;
				}else{
					arr.forEach(e=>{
							let  youhui_obj={
								price:price*100,
								acountPrice:0,
								mz_title:''
							};
							if(e.use_type==2){
								// "type"://类型（1：满*钱包邮2：满*钱减*钱3：第*件*几折4：满*钱增商品5：每满*钱减*钱）
							youhui_obj=this.filterPrice(youhui_obj,e)
							}
								pricearray.push({
									price:youhui_obj.price/100,
									acountPrice:youhui_obj.acountPrice,
									mz_title:youhui_obj.mz_title
								})
						})	
					let endprice=pricearray.sort((c,d)=>{
							return c.price - d.price;
						});
						
						return  endprice[0] 
				}
			},
			//   计算运费
			fromFright() {
				let type = this.shopInfo.merchanttype;
				if (type == 1 || type==4) {
					if (this.distance<= this.shopInfo.bydistance*1000) {
						this.freight = 0
					} else {
						this.freight =(this.distance-(this.shopInfo.bydistance*1000)) * (100 * this.shopInfo.by_money) /100/1000
					}
				}
			},
			userConfirm() {
				this.throttle(() => {
				this.getOrderId()
				})
			},
			//    外送   邮递  获取  距离
			getdistance() {
				let e = {
					cmd: 'getDitance',
					id: this.addressData.id,
					merchantId: uni.getStorageSync('merchantId')
				}
				this._reqw.post(e).then(res => {
					res.result == 0 ? (this.distance = res.body.distance,this.fromFright()) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			//    获取店铺   邮费
			getFirget() {
				let e = {
					cmd: 'getSendRate',
					merchantId: uni.getStorageSync('merchantId'),
					province: uni.getStorageSync('province')
				}
				this._reqw.post(e).then(res => {
					res.result == 0 ? this.shopInfo = res.body: this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			submit() {
				if (this.send_type !=1) {
					this.addressData.id == '' ? this.$api.tip('请选择收货地址!') : this.getOrderId();
				} else {
					this.$refs.homePounp.open();
					// this.getOrderId()
				}
			},
			//   获取可用 优惠券
			getUserCompline() {
				// （1：拼团2：秒杀3：活动4：积分5：普通）
				let e = {
					cmd: 'getMemberCouponList',
					uid: uni.getStorageSync('uid'),
					merchant_id: uni.getStorageSync('merchantId'),
				}
				if(this.type!='cart'){
					e.product_id=this.dataList[0].product_id
				}
				this._reqw.post(e).then(res => {
					res.result == 0 ? this.fromCompline(res.body) : this.$api.tip(res.resultNote)
				}).catch(err => {})
			},
			fromCompline(res) {
				let  newArray=[];
				if(res.dataList.length==0){
					this.showNoCompline=true;
					return 
				}
				res.dataList.forEach(item => {
					// "use_type":"",// 使用类型（1：满减2：无门槛）
					if(item.use_type==1){
						if(Number(this.goodsPrice)>=Number(item.price)){
								newArray.push(item) 
						}
					}
                    if(item.use_type==2){
						   // "use_type":"",// 使用类型（1：满减2：无门槛）
						 if(Number(this.goodsPrice)>Number(item.money)){
							 item.amount=item.money;
							 newArray.push(item) 
						}
					 }
				})
				if(newArray.length!=0){
					let endprice=newArray.sort((c,d)=>{
						return d.amount-c.amount; 
						});
						if(endprice.length!=0){
							this.compline=endprice[0] 
						}
				}else{
					this.showNoCompline=true;
				}
				
			},
			getCompline() {
				let url='';
				if(this.type=='cart'){
					url=`/pages/mineoptions/canUserCompline?money=${this.goodsPrice}&type=${this.type}`;
				}else{
					url=`/pages/mineoptions/canUserCompline?money=${this.goodsPrice}&type=${this.type}&id=${this.dataList[0].product_id}`
				}
				this.$api.navTo(url);
			},
			//  默认地址
			getDefault() {
				let parmas = {
					cmd: 'getDefaultAddress',
					uid: uni.getStorageSync('uid')
				}
				this._reqw
					.post(parmas)
					.then(res => {
						console.log(res);
						res.result == 0 ? (res.body.id != '' ? this.addressData = res.body : '') : this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			},
			choseAddress() {
				if(this.send_type==2){
					return
				}
				this.$api.navTo(`/pages/mineoptions/myAddress?source=1`);
			},
			// payType  0-直接购买，1-购物车结算
			getOrderId() {
				let type=this.type;
				let cartId=[];
				this.dataList.forEach(item=>{
					cartId.push(item.id)
				})
				let parmas = {
					uid: uni.getStorageSync('uid'),
					message: this.remarks,
					merchant_id: uni.getStorageSync('merchantId'),
					ordersMoney:this.totalPrice,
					sendMoney:this.freight,
					send_type: this.send_type,
					merchant_reduction_money:this.differencePrice,
					cmd:"saveCartOrder",
					cartList: cartId
				};
				if(this.send_type==2){
					if(this.livePrice!=0){
						this.$api.tip(`还差${this.livePrice}元起送,在逛逛吧!`);
						return
					}
				}
				if(this.compline.coupon_type==2){
					parmas.member_point_coupon_id=this.compline.id;
					parmas.member_coupon_money=this.compline.amount;
				}else{
					parmas.member_coupon_id=this.compline.id;
					parmas.member_coupon_money=this.compline.amount;
				}
				if (this.send_type !=1) {
					parmas.addressId = this.addressData.id
				}
				this._reqw
					.post(parmas)
					.then(res => {
						res.result == 0 ? (this.type == 4 && this.totalPrice ==0 ? (this.$api.tip('兑换成功!'),this.$api.redirectTo('/pages/order/index')) : this.$api.redirectTo(
								`/pages/order/payOrder?id=${res.body.id}&money=${res.body.orderMoney}&type=finish`)) :
							this.$api.tip(res.resultNote);
					})
					.catch(err => {});
			}
		}
	};
</script>

<style lang="scss">
	.youhui_item{
		margin-right: 20upx;
		font-size: 24upx;
		color:#fe2c2c;
		font-weight: bold;
	}
	.remak-con{
		margin-top: 20upx;
		background: #FFFFFF;
	}
	.textarea{
		width: 100%;
		height: 288upx;
		background: #FFFFFF;
		border-radius: 15upx;
		padding: 20upx;
		box-sizing: border-box;
	}
	.sub-user-btn {
		width: 90upx;
		line-height: 40upx;
		text-align: center;
		color: #FFFFFF;
		font-size: 24upx;
		background: #007030;
		border-radius: 6upx;
	}

	.tips-btn {
		width: 196upx;
		line-height: 54upx;
		text-align: center;
		background: #E4FFF0;
		border-radius: 15upx 4upx 4upx 0px;
		font-size: 26upx;
		color: #007030;
	}

	.con-bg {
		padding:20upx;
		background: #FFFFFF;
	}

	.link-con {
		padding: 30upx 2.5%;
		margin-top: 10upx;
		background-color: #FFFFFF;
	}

	.link-tip {
		font-size: 30upx;
	}

	.noAddress {
		height: 150upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.input {
		height: 60upx;
	}

	.uni-icon {
		font-size: 26upx;
		color: #666666;
	}

	.cell-tit {
		color: #666666;
		font-size: 24upx;
	}

	.cell-tip {
		color: #333;
		font-size: 26upx;
	}

	.uni-list-cell {
		margin-top: 20upx;
	}

	.mobile {
		font-weight: bold;
		color: #333333;
	}

	.icon-swiper {
		display: flex;
		align-items: center;
	}

	.address-section {
		background: #FFFFFF;

		.order-content {
			display: flex;
			align-items: center;
			padding:20upx;
		}

		.cen {
			display: flex;
			flex-direction: column;
			flex: 1;
			font-size: 28upx;
		}

		.name {
			font-size: 34upx;
			margin-right: 24upx;
		}

		.address {
			margin-top: 16upx;
			margin-right: 20upx;
		}
	}

	.goods-section {
		margin-top: 16upx;

		.g-header {
			display: flex;
			align-items: center;
			height: 84upx;
			padding: 0 20upx;
			position: relative;
		}

		.name {
			font-size: 30upx;
			margin-left: 24upx;
		}
		.g-con{
			.g-item {
				display: flex;
				.product-img {
					display: block;
					width: 160upx;
					height: 160upx;
					image{
						width: 100%;
						height: 100%;
						border-radius: 6upx;
					}
				}
			
				.right {
					flex: 1;
					display: flex;
					flex-direction: column;
					padding-left: 24upx;
					overflow: hidden;
				}
			
				.title {
					font-size: 30upx;
					word-break: break-all;
					display: -webkit-box;
					overflow: hidden;
					line-height: 1.5;
					text-overflow: ellipsis;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					font-weight: bold;
					color: #333333;
				}
			
				.spec {
					font-size: 24upx;
					color: #999999;
				}
			
				.price-box {
					display: flex;
					justify-content: space-between;
					align-items: center;
					font-size: 32upx;
					margin-topl: 20upx;
			
					.price {
						font-size: 15px;
						font-weight: bold;
						color: #fe2c2c;
					}
			
					.number {
						font-size: 13px;
						color: #111111;
						margin-left: 20upx;
					}
				}
			
				.step-box {
					position: relative;
				}
			}
		}

		
	}

	.footer {
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 995;
		display: flex;
		align-items: center;
		width: 100%;
		height: 90upx;
		justify-content: space-between;
		font-size: 30upx;
		background-color: #fff;
		z-index: 998;
		box-shadow: 0 -1px 5px rgba(0, 0, 0, 0.1);
		box-sizing: border-box;

		.price-content {
			padding-left: 30upx;
			color: #F55555;
		}

		.price-tip {
			margin-left: 8upx;
		}

		.price {
			font-size: 36upx;
		}

		.submit {
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #F55555;
			color: #fff;
			height: 90upx;
			font-size: 28upx;
			width: 308upx;
		}
	}
</style>
