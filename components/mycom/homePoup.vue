<template>
	<view class="mask" v-show="pickerShow" @click.stop.prevent="hidden">
		<view class="mask">

		</view>
		<view class="yaoqing-content animated" :class="animation"  @click.stop v-if="type==0">
			<view class="d-items-center j-center cart-del-con ">
				<view class="title">
					输入密码
				</view>
				<view class="uni-icon uni-icon-close" @click.stop="hidden">
		
				</view>
			</view>
			<view class="">
				<input type="password" value="" maxlength="6" v-model="payPwd" class="home-input" />
			</view>
			<view class="yaoqing-bottom uni-flex d-items-center d-content-center padding-con">
				<view class="search-btn-con payCanle" hover-class="btn-hover" @click.stop="hidden">
					取消
				</view>
				<view class="search-btn-con payConfirm" hover-class="btn-hover" @click.stop="close">
					确认
				</view>
			</view>
		</view>
		<view class="con-bg animated" :class="animation"  @click.stop v-if="type==1">
			
			<view class="user-get-con">
				<image src="/static/img/qiandaochenggong.png" mode="" class="user-get-con"></image>
				<view class="user-get" @click.stop="close">
					收下奖励
				</view>
			</view>
		</view>
		<view class="yaoqing-content animated" :class="animation"  @click.stop v-if="type==2">
			<view class="d-items-center j-center cart-del-con ">
				<view class="title">
					请输入自提码
				</view>
				<view class="uni-icon uni-icon-close" @click.stop="hidden">
		
				</view>
			</view>
			<view class="">
				<input type="text" value="" maxlength="6" v-model="toCode" class="home-input" />
			</view>
			<view class="yaoqing-bottom uni-flex d-items-center d-content-center padding-con">
				<view class="search-btn-con payCanle" hover-class="btn-hover" @click.stop="hidden">
					取消
				</view>
				<view class="search-btn-con payConfirm" hover-class="btn-hover" @click.stop="close">
					确认
				</view>
			</view>
		</view>
		<view class="yaoqing-content animated" :class="animation"  @click.stop.prevent v-if="type==3">
			<view class="d-items-center j-center cart-del-con ">
				<view class="title">
					转赠给好友
				</view>
				<view class="uni-icon uni-icon-close" @click.stop="hidden">
		
				</view>
			</view>
			<view class="" @click.stop.prevent>
				<input type="number" value="" placeholder="请输入手机号" maxlength="11" v-model="phone" class="home-input"  />
			</view>
			<view class="" style="font-size: 24upx;color: #999999;padding-left: 10%;">
				注:一旦转增无法取消
			</view>
			<view class="yaoqing-bottom uni-flex d-items-center d-content-center padding-con">
				<view class="search-btn-con payCanle" hover-class="btn-hover" @click.stop="hidden">
					取消
				</view>
				<view class="search-btn-con payConfirm" hover-class="btn-hover" @click.stop="close">
					确认
				</view>
			</view>
		</view>
		<view class="yaoqing-content animated" :class="animation"  @click.stop v-if="type==4">
			<view class="d-items-center j-center cart-del-con " style="padding: 30upx;">
				<image :src="images" mode=""></image>
			</view>
			<view class="" style="font-size: 40upx;font-weight: bold;color: #333333;text-align: center;">
				{{title}}
			</view>
			<view class="" style="font-size:30upx;color:#006F2F;text-align: center;">
				是否消耗{{point}}积分进行兑换
			</view>
			<view class="yaoqing-bottom uni-flex d-items-center d-content-center padding-con">
				<view class="search-btn-con payCanle" hover-class="btn-hover" @click.stop="hidden">
					取消
				</view>
				<view class="search-btn-con payConfirm" hover-class="btn-hover" @click.stop="close">
					确认
				</view>
			</view>
		</view>
		<view class="yaoqing-content animated" :class="animation"  @click.stop v-if="type==5">
			<view class="btn-title">
				是否确定地址为:
			</view>
			<view class="btn-title">
				【{{address}}】?
			</view>
			<view class="btn-content">
				订单确认后将无法更改！
			</view>
			<view class="yaoqing-bottom uni-flex d-items-center d-content-center padding-con">
				<view class="search-btn-con payCanle" hover-class="btn-hover" @click.stop="hidden">
					取消
				</view>
				<view class="search-btn-con payConfirm" hover-class="btn-hover" @click.stop="close">
					确认
				</view>
			</view>
		</view>
	</view>
</template>

<script>

	export default {
		props:{
			type:{
				type:[String,Number],
				default:0
			},
			images:'',
			title:'',
			point:0,
			address:""
		},
		data() {
			return {
				pickerShow: false,
				payPwd:'',
				toCode:'',
				phone:'',
				animation: ''
			}
		},
		methods: {
			open() {
				this.animation = 'fadeIn';
				this.pickerShow = true;
			},
			hidden() {
				this.animation = 'fadeOut';
				setTimeout(() => {
					this.pickerShow = false;
				}, 500)
			},
			bindCancel() {
				this.isShow = false;
			},
			choseTime() {
				this.isShow = true;
			},
			close() {
				if(this.type==0){
					this.payPwd==''?this.$api.tip('请输入支付密码!'):this.payPwd.length<6?this.$api.tip('密码为6位数字!'):this.$emit('pay',this.payPwd);
				}else if(this.type==2) {
					this.toCode==''?this.$api.tip('请输入自提码!'):this.$emit('click',this.toCode);
				}else if(this.type==3)  {
					this.phone==''?this.$api.tip('请输入手机号!'):!this.$api.regPhone(this.phone)?this.$api.tip('手机号格式不正确!'):this.$emit('click',this.phone);
				}else if(this.type==4 || this.type==5){
					this.$emit('click')
				}else{
					this.hidden()
				}
				
			},
			confirm() {
				this.$emit('onConfirm', 1);
				this.pickerShow = false
			}
		}
	}
</script>

<style scoped lang="scss">
	.btn-title{
		font-size: 34upx;
		font-weight: bold;
		color: #343434;
		text-align: center;
		padding:20upx 0;
		width: 80%;
		margin: 0 auto;
	}
	.btn-content{
		width: 100%;
		line-height: 64upx;
		background: #EEFFF5;
		text-align: center;
	}
	.con-bg{
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 528upx;
		height: 516upx;
		background-size: 100% 100%;
		z-index: 99999;
	}
	.user-get-con{
		width: 582upx;
		height: 516upx;
		position: relative;
	}
	.user-get{
		position: absolute;
		left: 50%;
		bottom: 43upx;
		transform: translateX(-50%);
		width: 441upx;
		line-height: 66upx;
		text-align: center;
		background: #007030;
		border-radius: 33upx;
		font-size: 30upx;
		color: #FFFFFF;
	}
	.payCanle{
		background:#F15721 !important;
	}
	.payConfirm{
		margin-left: 50upx;
	}
	.uni-icon-arrowright {
		color: #999999;
		font-size: 28upx;
	}
	.search-time-con {
		justify-content: center;
	}
	.uni-icon-close {
		position: absolute;
		top: 0;
		right: 30upx;
	}

	.home-input {
		width: 500upx;
		height: 80upx;
		margin: 30upx auto;
		background: rgba(247, 248, 250, 1);
		border: 2upx solid rgba(232, 237, 241, 1);
		border-radius: 40upx;
		padding-left: 40upx;
	}

	.padding-con {
		padding: 30upx 0;
	}

	.cart-del-con {
		position: relative;
		image{
			width: 100%;
		}
	}

	.around {
		justify-content: space-around;
		padding-top: 30upx;
	}

	.j-center {
		justify-content: center;
		padding-bottom: 30upx;
	}

	.title {
		font-size: 36upx;
		font-weight: bold;
		color: #000000;
		text-align: center;
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9999;
		background: rgba(0, 0, 0, .3);
	}

	.yaoqing-content {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		background-color: #FFFFFF;
		width: 90%;
		background: rgba(255, 255, 255, 1);
		border-radius: 20upx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding: 40upx 0;
		box-sizing: border-box;
		z-index: 99999;
	}

	.search-btn-con {
		width: 213upx;
		line-height: 75upx;
		background:#007030;
		border-radius: 40upx;
		color: #FFFFFF;
		font-size: 34upx;
		font-weight: bold;
		text-align: center;
	}

	.yaoqing-btn-con {
		height: 75upx;
		width: 366upx;
		text-align: center;
		line-height: 75upx;
		color: #FFFFFF;
		border-radius: 10upx;
		font-size: 34upx;
		font-weight: bold;
	}

	.one {
		background: #FFBF00;
	}
</style>
