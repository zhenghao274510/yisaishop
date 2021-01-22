/**
 * @Method Description
 * @Author: hao zheng@
 * @Description:In User Settings Edit
 * @LastEditors: 微信公众号  jsdk    分享  定位  获取签名等
 * @param {}
 * @return 
 * @createTime: 2020-9-9 14:14:17
 */
const jweixin = require('jweixin-module');
import api from './request.js'
export default {
	//判断是否在微信中
	isWechat: function() {
		var ua = window.navigator.userAgent.toLowerCase();
		if (ua.match(/micromessenger/i) == 'micromessenger') {
			return true;
		} else {
			return false;
		}
	},
	initJssdk: function(callback) {
		var url =location.href.split('#')[0]; //获取当前url然后传递给后台获取授权和签名信息
		api.post({
			cmd: 'auth',
			url
		}).then(res => {
			jweixin.config({
				debug: true,
				appId: res.body.appId,
				timestamp: res.body.timestamp,
				nonceStr: res.body.noncestr,
				signature: res.body.signature,
				url:url,
				jsApiList: ['onMenuShareAppMessage',
					'onMenuShareTimeline',
					'chooseWXPay',
					'showOptionMenu',
					"updateAppMessageShareData",
					"hideMenuItems",
					"showMenuItems",
					"onMenuShareTimeline",
					'onMenuShareAppMessage',
					'getLocation'
				]
			});
			if (callback) {
				callback(res.body);
			}
		})
	},
	//在需要定位页面调用
	getlocation: function(callback) {
		if (!this.isWechat()) {
			return;
		}
		this.initJssdk(function(res) {
			jweixin.ready(function() {
				jweixin.getLocation({
					type: 'gcj02', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
					success: function(res) {
						callback(res)
					},
					fail: function(res) {},
				});
			});
		});
	},
	share: function(data, callback) {
		if (!this.isWechat()) {
			return;
		}
		this.initJssdk(function(res) {
			jweixin.ready(function() {
				var shareData = {
					title: data.title,
					desc: data.desc,
					link: data.path || (window.location.href).replace(window.location.search, ''),
					imgUrl: data.imageUrl,
					success: function(res) {
						callback(res)
						// 分享后的一些操作,比如分享统计等等
					},
					cancel: function(res) {}
				};
				jweixin.onMenuShareAppMessage(shareData);
				//分享到朋友圈接口
				jweixin.onMenuShareTimeline(shareData);


			});
		});

	},
	openLocation: function(data, callback) { //打开位置
		if (!this.isWechat()) {
			return;
		}
		this.initJssdk(function(res) {
			jweixin.ready(function() {
				jweixin.openLocation({ //根据传入的坐标打开地图
					latitude: data.latitude,
					longitude: data.longitude
				});
			});
		});
	},
	scanQRCode: function(callback) { //打开位置
		if (!this.isWechat()) {
			return;
		}
		this.initJssdk(function(res) {
			jweixin.ready(function() {
				jweixin.scanQRCode({
					needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
					scanType: ["qrCode", "barCode"], // 可以指定扫二维码还是一维码，默认二者都有
					success: function(res) {
						callback(res)
						// 分享后的一些操作,比如分享统计等等
					},
				});
			});
		});
	},

}
