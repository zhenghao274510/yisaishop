<template>
	<view class="">
		<view class="content">
			<view class="one-info">
				<view class="one-info-top">
					<text class="tit">联系人</text>
					<input class="input" type="text" v-model="addressData.name" placeholder="收货人姓名" placeholder-class="placeholder" />
				</view>
			</view>
			<view class="one-info">
				<view class="one-info-top">
					<text class="tit">性别：</text>
					<radio-group>
						<label v-for="(v,k) in sexList" :key='k' @click="changeSex(k)">
							<radio :value="v.value" color="#007030" style="transform: scale(.8);" :checked="sexTab==k" /><text>{{v.value}}</text>
						</label>
					</radio-group>
				</view>
			</view>
			<view class="row b-b">
				<text class="tit">手机号：</text>
				<input class="input" type="number" v-model="addressData.phone" placeholder="请输入联系电话" placeholder-class="placeholder"
				 maxlength="11" />
			</view>
			<view class="row b-b" @click="chooseLocation">
				<text class="tit">收货地址：</text>
				<text class="input">
					{{addressData.province_city_town}}
				</text>
				<!-- <view class="address-pos" @click="getPosition">
					<image src="/static/img/dizhidingwei@2x.png" mode=""></image>
					<text class="address-pos-text">定位</text>
				</view> -->

			</view>
			<view class="row b-b">
				<text class="tit">详细地址：</text>
				<input class="input" type="text" v-model="addressData.address" placeholder="请输入详细地址，如门牌号" placeholder-class="placeholder" />
			</view>
			<view class="row default-row d-between">
				<view class="tit">设为默认地址</view>
				<switch :checked="addressData.isdefault==1" @change="choseDefault" color="#006F2F" />
			</view>

		</view>
		<button class="add-btn" @click="confirm">确 定</button>
	</view>

</template>

<script>
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
					sex: "",
					lon: "",
					lat: "",
					isdefault: "1", // 是否默认 0否 1是
					province_city_town: ""
				},
				checked: false
			}
		},
		onLoad(options) {
			this.addressData = JSON.parse(options.id);
			this.sexTab = this.addressData.sex;
		},
		methods: {
			changeSex(ind) {
				this.sexTab = ind;
				this.addressData.sex = ind;
			},
			//选择地址
			chooseLocation() {
				console.log(11)
				this.$api.navTo(`/pages/mineoptions/position?type=0`)
			},
			//选择地址
			onCancel() {
				this.showPicker = false;
			},
			choseDefault(e) {
				e.detail.value == false ? this.addressData.ismoren = 0 : this.addressData.ismoren = 1
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
						cmd: 'editAddress',
						id: data.id,
						uid: uni.getStorageSync('uid'),
						name: data.name,
						phone: data.phone,
						province_city_town: data.province_city_town,
						address: data.address,
						sex: data.sex,
						lon: data.lon,
						lat: data.lat,
						isdefault: data.isdefault
					};
					console.log(parmas)
					this._reqw.post(parmas).then(res => {
						res.result == 0 ? (this.$api.tip('修改成功!'),this.$api.back()) : this.$api.tip(res.resultNote)
					}).catch(err => {})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
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
		height: 110upx;
		border-bottom: 2upx solid #E7E7E7;
	}

	.one-info {
		border-bottom: 2upx solid #E7E7E7;
		padding: 20upx 0;
	}

	.row,
	.one-info-top {
		display: flex;
		align-items: center;
		position: relative;

		.tit {
			flex-shrink: 0;
			font-size: 30upx;
			color: #666666;
		}

		.input {
			flex: 1;
			font-size: 26upx;
			color: #666666;
			text-align: right;
		}

	}

	.add-btn {
		width: 700upx;
		line-height: 79upx;
		text-align: center;
		background: #006F2F;
		color: #FFFFFF;
		font-size: 30upx;
		border-radius: 39upx;
		position: fixed;
		bottom: 25upx;
		left: 25upx;
	}
</style>
