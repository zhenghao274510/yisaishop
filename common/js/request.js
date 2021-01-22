/**
 * @Method Description
 * @Author: hao zheng@
 * @Description: 数据请求整合 处理
 * @bassUrl server 
 * @param {a===Object||file} 传给后台参数    m===Method 请求方法   t===url  所请求的接口路径
 * @iget  m==="GET"
 * @ipost m==="POST"
 * @iupfile  文件上传使用  
 * @return  Promise对象  所有数据信息
 * @createTime: 2020-7-7 15:05:06
 */
const bassUrl = require('./config.js').bass;
// const mid='/shouwanghuhui/api/'
const mid='/api/service'

function request(a, m) {
	return a || (a = {}), new Promise(function(e, n) {
		uni.request({
			url: encodeURI(bassUrl + mid +`?json=${JSON.stringify(a)}`),
			method: m,
			// #ifdef APP-PLUS
			sslVerify: false, //   不校验  ssl 证书   https  包含证书协议(如果校验,导致 获取不到证书)
			xhrFields: {
				withCredentials: true
			}, // 是否允许带cookie这些  true 允许
			// #endif
			success: function(res) {
				200 == res.statusCode ? e(res.data): uni.showToast({
					title: `错误码:${res.statusCode}`,
					icon: "none",
					duration: 1500
				});
			},
			fail: function(res) {
				"request:fail " === res.errMsg && uni.showToast({
					title: "请求数据失败！",
					icon: "none",
					duration: 1500
				}), n(res.data);
			}
		});
	});
}
 function iupfile(t={}) {
		uni.showLoading({
			title: "上传中..."
		});
		return new Promise((e, n) => {
			uni.uploadFile({
				url: encodeURI(bassUrl+'/api/addimg'),
				filePath: t.path,
				name: 'file',
				method: "POST",
				headers: {
					'Content-Type': 'application/json',
					'Content-Type': 'multipart/form-data;'
				},
				success: function(res) {
					uni.hideLoading();
					200 == res.statusCode?e(res.data):uni.showToast({
						title: `错误码:${res.statusCode}`,
						icon: "none",
						duration: 1500
					});
				},
				fail: function(res) {
					uni.hideLoading();
					"request:fail " === res.errMsg && uni.showToast({
						title: "请求数据失败！",
						icon: "none",
						duration: 1500
					}), n(res.data);
				}
			});
		});
	}

function ipost(a, t) {
	return request(a, "POST", t);
}
module.exports = {
	post: ipost,
	upflie:iupfile
};
