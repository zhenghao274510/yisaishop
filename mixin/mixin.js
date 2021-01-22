// #ifdef MP-WEIXIN
import QQMapWX from "@/common/js/qqmap-wx-jssdk.js"
// #endif
import {
	request
} from '@/common/js/request.js'
let  _throttleRunning = false
export default {
	data() {
		return {
			city: ''
		}
	},
	methods: {
		/**
		 * 节流
		 * @param {Function} 执行函数
		 * @param {Number} delay 延时ms  
		 */
		throttle(fn, delay=500){
			if(_throttleRunning){
				return;
			}
			_throttleRunning = true;
			fn();
			setTimeout(() => {
			    _throttleRunning = false;
			}, delay);
		},
		log(data) {
			console.log(JSON.parse(JSON.stringify(data)))
		},
		imageOnLoad(data, key) {
			setTimeout(() => {
				this.$set(data, 'loaded', true);
			}, 80)
		},
		async getCartNum() {
			let type = 0;
			if (uni.getStorageSync('uid')) {
				if (uni.getStorageSync('open') == 2) {
					type = 3
				} else {
					if (uni.getStorageSync('defaultValue')) {
						uni.getStorageSync('defaultValue') == 0 ? type = 2 : type = 1
					}
				}
				// 1：自提2：外卖3：邮寄
				let e = {
					cmd: 'getCartNumber',
					uid: uni.getStorageSync('uid'),
					merchant_id: uni.getStorageSync('merchantId'),
					type: type
				}
				console.log(e)
				const res = await this._reqw.post(e);
				if(res.body.number!=0){
					uni.setTabBarBadge({
						index:2,
						text:res.body.number+''
					})
				}else{
					uni.removeTabBarBadge({
						index:2
					})
				}
			}
		},
		getUserLocation() {
			let point = {};
			return new Promise((resolve, reject) => {
				// #ifdef MP-WEIXIN
				uni.getLocation({
					type: 'gcj02',
					success(res) {
						point = res;
						let qqmapsdk = new QQMapWX({
							key: 'GQZBZ-3CECD-BP443-PBQEY-4R3M6-QMFBO'
						});
						qqmapsdk.reverseGeocoder({
							location: {
								latitude: res.latitude,
								longitude: res.longitude
							},
							success: function(options) {
								this.city = options.result.address_component.city;
								uni.setStorageSync('city', this.city);
								uni.setStorageSync('province', options.result.address_component.province);
								uni.setStorageSync('point', point);
								resolve(point)
							}
						});
					},
					fail() {
						resolve()
					}
				})
				// #endif
				// #ifdef H5
				uni.request({
					url: `https://restapi.amap.com/v3/ip?output=JSON&key=c6f76c6dc10ff6fce5724d27adaa00fe`,
					method: "GET",
					success: options => {
						console.log(options)
						uni.hideLoading();
						this.city = options.data.city;
						uni.setStorageSync('city', this.city);
						uni.setStorageSync('province', options.data.province);
						const str1 = options.data.rectangle.split(';')[0];
						const str2 = options.data.rectangle.split(';')[1];
						point.longitude = (Number(str1.split(',')[0]) + Number(str2.split(',')[0])) / 2;
						point.latitude = (Number(str1.split(',')[1]) + Number(str2.split(',')[1])) / 2;
						uni.setStorageSync('point', point);
						resolve(point)
					}
				})
				//   #endif
			})

		}
	},
}
