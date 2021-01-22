<template>
	<view class="">
		<view class="content" style="background: #FFFFFF;">
			<view class="one-info d-border-bottom">
				<view class="one-info-top">
					<text class="tit">联系人：</text>
					<input class="input" type="text" v-model="addressData.name" placeholder="请输入收货人昵称" placeholder-class="placeholder" />
				</view>
			</view>
			<view class="one-info d-border-bottom">
				<view class="one-info-top">
					<text class="tit">性别：</text>
					<radio-group>
						<label v-for="(v,k) in sexList" :key='k' @click="changeSex(k)">
							<radio :value="v.value" color="#007030" style="transform: scale(.8);" :checked="sexTab==k" /><text>{{v.value}}</text>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="row b-b d-border-bottom">
				<text class="tit">手机号：</text>
				<input class="input" type="number" v-model="addressData.phone" placeholder="请输入收货人联系电话" placeholder-class="placeholder"
				 maxlength="11" />
			</view>
			<view class="row b-b d-border-bottom" @click="chooseLocation">
				<text class="tit">收货地址：</text>
				<input class="input" v-model="addressData.province_city_town" placeholder="请选择收货地址" disabled></input>
				<!-- <view class="address-pos" @click="getPosition">
					<image src="/static/img/dizhidingwei@2x.png" mode=""></image>
					<text class="address-pos-text">定位</text>
				</view> -->

			</view>
			<view class="row b-b">
				<text class="tit">详细地址：</text>
				<input class="input" type="text" v-model="addressData.address" placeholder="请输入详细地址，如门牌号" placeholder-class="placeholder" />
			</view>
		</view>
		<view class="content">
			<label class="radio">
				<radio value="" checked disabled style="transform: scale(.7);" /><text>设为默认地址</text>
			</label>
		</view>


		<view class="uni-flex d-items-center d-around  bottom-btn">
			<view class=" cal-btn" @click="onCancel">取 消</view>
			<view class=" add-btn" @click="confirm">确 定</view>
		</view>
		<!-- <semp-city @confirm="onCityClick" platform="jd" ref="picker"></semp-city> -->
	</view>
</template>

<script>
	// import sempCity from "@/components/semp-city/semp-city.vue"
	export default {
		data() {
			return {
				sexTab: 0,
				sexList: [{
						lable: 0,
						value: '女'
					},
					{
						lable: 1,
						value: '男'
					}
				],
				addressData: {
					phone: "",
					name: "",
					address: "",
					sex: "0",
					lon: "",
					lat: "",
					isdefault: "", // 是否默认 0否 1是
					province_city_town: ""
				}
			}
		},
		methods: {
			changeSex(ind) {
				this.sexTab = ind;
				this.addressData.sex = ind;
			},
			//选择地址
			chooseLocation() {
				this.$api.navTo(`/pages/mineoptions/position?type=0`)
			},
			onCancel() {
				this.$api.back();
			},
			choseDefault(e) {
				e.detail.value == false ? this.addressData.isdefault = 0 : this.addressData.isdefault = 1
			},
			//提交
			confirm() {
				let data = this.addressData;
				if (data.name == '') {
					this.$api.tip('请填写收货人姓名');
					return;
				}
				if (!this.$api.regPhone(data.phone)) {
					this.$api.tip('请输入正确的手机号码');
					return;
				}
				if (data.province_city_town == '') {
					this.$api.tip('请填写所在地址');
					return;
				}
				if (data.address == '') {
					this.$api.tip('请填写详细信息');
					return;
				} else {
					this.sub(data);
				}
			},
			sub(data) {
				this.throttle(() => {
					let parmas = {
						cmd: 'addAddress',
						uid: uni.getStorageSync('uid'),
						name: data.name,
						phone: data.phone,
						province_city_town: data.province_city_town,
						address: data.address,
						sex: data.sex,
						lon: data.lon,
						lat: data.lat
					};
					console.log(parmas)
					this._reqw.post(parmas).then(res => {
						res.result == 0 ? (this.$api.tip('添加成功!'), this.$api.back()) : this.$api.tip(res.resultNote)
					}).catch(err => {})
				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.bottom-btn {
		position: fixed;
		bottom: 60upx;
		left: 0;
		width: 100%;
		// height: 80upx;
	}

	.address-pos {
		width: 60upx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.address-pos image {
		width: 22upx;
		height: 30upx;
	}

	.address-pos-text {
		color: #FF4848;
		font-size: 22upx;
		margin-top: 10upx;
	}

	.content {
		padding: 20upx;
	}

	.row {
		padding: 30upx 0;
	}

	.one-info {
		// border-bottom: 1px solid #E7E7E7;
		padding: 10px 0;
	}

	.iconfont {
		font-size: 40upx;
		margin-left: 10px;
	}

	.row,
	.one-info-top {
		display: flex;
		align-items: center;
		position: relative;

		.tit {
			flex-shrink: 0;
			width: 152upx;
			font-size: 30upx;
		}

		.input {
			flex: 1;
			font-size: 30upx;
			color: #999999;
		}
	}

	.add-btn {
		width: 315upx;
		line-height: 79upx;
		border-radius: 40upx;
		text-align: center;
		font-size: 30upx;
		color: #fff;
		background-color: #007030;
	}

	.cal-btn {
		width: 315upx;
		line-height: 79upx;
		border-radius: 40upx;
		text-align: center;
		font-size: 30upx;
		color: #fff;
		background-color: #FFB600;
	}
</style>
