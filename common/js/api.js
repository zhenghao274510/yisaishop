const bassUrl = require('@/common/js/config.js').bass;
// #ifdef MP-WEIXIN
import QQMapWX from "@/common/js/qqmap-wx-jssdk.js"
// #endif
const api = {
	tip(a) {
		typeof(a) === 'string' ?
		uni.showToast({
			title: a,
			icon: "none",
			duration: 1500
		}): console.log(a)
	},
	reLaunch(url) {
		typeof(url) === 'string' ?
		uni.reLaunch({
			url: url
		}): console.log(a)
	},
	switchTab(url) {
		typeof(url) === 'string' ?
		uni.switchTab({
			url: url
		}): console.log(url)
	},
	redirectTo(url) {
		typeof(url) === 'string' ?
		uni.redirectTo({
			url: url
		}): console.log(url)
	},
	navTo(url) {
		typeof(url) === 'string' ?
		uni.navigateTo({
			url: url
		}): console.log(url)
	},
	back() {
		setTimeout(() => {
			uni.navigateBack()
		}, 500)

	},
	setNav(e) {
		typeof(e) === 'string' ?
		uni.setNavigationBarTitle({
			title: e
		}): console.log(url)
	},
	prePage() {
		let pages = getCurrentPages();
		let prePage = pages[pages.length - 2];
		return prePage.$vm;
	},
	loading(e) {
		uni.showLoading({
			mask: false,
			title: e
		})
	},
	showTip(t, c) {
		uni.showModal({
			content: t,
			confirmColor: "#006F2F",
			cancelText: '取消',
			confirmText: '确定',
			success(res) {
				c(res)
			}
		})
	},
	regPhone(v) {
		var re = new RegExp(/^[1][3456789]\d{9}$/)
		if (re.test(v)) {
			return true;
		} else {
			return false;
		}
		
	},

	//#ifdef H5
	getCode() { // 非静默授权，第一次有弹框
		var local = window.location.href // 获取页面url
		var options = {
			appid: 'wx653bab609809f204',
			redirect_uri: encodeURIComponent(`${bassUrl}/h5/#/pages/index/bindPhone`),
		};
		window.location.href =
			'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' +options.appid+'&redirect_uri='+options.redirect_uri+'&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
	},
	//  公众号支付
	onBridgeReady(data, callback) {
		WeixinJSBridge.invoke(
			"getBrandWCPayRequest", {
				appId: data.appId, //公众号名称，由商户传入
				timeStamp: data.timeStamp, //时间戳，自1970年以来的秒数
				nonceStr: data.nonceStr, //随机串
				package: data.package,
				signType: data.signType, //微信签名方式：
				paySign: data.paySign //微信签名
			},
			function(res) {
				if (res.err_msg == "get_brand_wcpay_request:ok") {
					// 使用以上方式判断前端返回,微信团队郑重提示：
					//res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
					callback(res)
				} else {

				}
			}
		);
	},
	//#endif

	//#ifdef MP-WEIXIN
	PayBywx(data, callback) {
		console.log(data)
		uni.requestPayment({
			timeStamp: data.timeStamp,
			nonceStr: data.nonceStr,
			package: data.package,
			signType: data.signType,
			paySign: data.paySign,
			success(res) {
				callback(res)
			},
			fail(res) {

			}
		});
	},
	getLocation(c) {
		uni.getLocation({
			type: 'gcj02',
			success(res) {
				c(res)
			}
		})
	},
	// 逆地址解析(坐标位置描述)  经纬度转地址
	localEncal(p, c) {
		let qqmapsdk = new QQMapWX({
			key: 'GQZBZ-3CECD-BP443-PBQEY-4R3M6-QMFBO'
		});
		qqmapsdk.reverseGeocoder({
			location: {
				latitude: p.latitude,
				longitude: p.longitude
			},
			success: function(res) {
				c(res.result)
			}
		});
	},
	// 地址解析(地址转坐标)  地址转经纬度
	addressToLocation(l, c) {
		let qqmapsdk = new QQMapWX({
			key: 'GQZBZ-3CECD-BP443-PBQEY-4R3M6-QMFBO'
		});
		qqmapsdk.geocoder({
			address: l,
			success: function(res) {
				c(res.result)
			}
		});
	},
	//#endif
	callPhone(num) {
		uni.makePhoneCall({
			phoneNumber: num
		})
	},
	formText(str) {
		var s = "";
		let width = uni.getSystemInfoSync().screenWidth;
		s = str.replace(/&amp;/g, "&");
		s = s.replace(/&lt;/g, "<");
		s = s.replace(/&gt;/g, ">");
		s = s.replace(/&nbsp;/g, " ");
		s = s.replace(/&#39;/g, "'");
		s = s.replace(/&quot;/g, '"');
		s = s.replace(/<br\/>/g, "\n");
		s = s.replace(/style="[^"]+"/gi, '');
		s = s.replace(/width="[^"]+"/gi, '');
		s = s.replace(/height="[^"]+"/gi, '');
		s = s.replace(/\<img/gi, '<img style=width:' + width + "px;height:auto;display:block;");
		return s;
	},
	formatTime(unixtime) {
		if (typeof unixtime == undefined) {
			return;
		} else {
			var date = new Date(unixtime);
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			m = m < 10 ? "0" + m : m;
			var d = date.getDate();
			d = d < 10 ? "0" + d : d;
			var h = date.getHours();
			h = h < 10 ? "0" + h : h;
			var minute = date.getMinutes();
			var second = date.getSeconds();
			minute = minute < 10 ? "0" + minute : minute;
			second = second < 10 ? "0" + second : second;
			return y + "-" + m + "-" + d;
		}
	},
	parsePrice(money) {
		var n = 2;
		money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
		var l = money.split(".")[0].split("");
		var r = money.split(".")[1];
		var t = "";
		for (let i = 0; i < l.length; i++) {
			t += l[i];
		}
		return t + "." + r;
	},
	formCard(val) {
		var isIdCard2 = /^[1-9]\d{5}(19\d{2}|[2-9]\d{3})((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}X)$/i;
		if (isIdCard2.test(val)) {
			return true
		} else {
			return false
		}
	},
	//   日期   间距
	datedifference(sDate1, sDate2) { //sDate1和sDate2是2006-12-18格式 
		var dateSpan,
			tempDate,
			iDays;
		sDate1 = Date.parse(sDate1);
		sDate2 = Date.parse(sDate2);
		dateSpan = sDate2 - sDate1;
		dateSpan = Math.abs(dateSpan);
		iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
		return iDays
	},
	uniUpimg(n, c) {
		uni.chooseImage({
			count: n,
			sizeType: ["original", "compressed"],
			sourceType: ["album", "camera"],
			success(result) {
				// tempFilePath可以作为img标签的src属性显示图片
				console.log(result);
				c(result)
			}
		});
	}
}
export default api;
