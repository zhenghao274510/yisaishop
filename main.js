import Vue from 'vue'
import App from './App'
import reqw from "@/common/js/request.js"
import api from "@/common/js/api.js"
import mixin from './mixin/mixin'
Vue.mixin(mixin)

import uniLoadMore from "@/components/uni-load-more/uni-load-more.vue"
import empty from "@/components/xw-empty/xw-empty.vue"
import zhouWeiNavBar from "@/components/mycom/pages-header.vue";
Vue.component("nav-bar", zhouWeiNavBar);
Vue.component('uni-load-more', uniLoadMore)
Vue.component('empty', empty)
Vue.prototype._reqw = reqw;
Vue.prototype.$api = api;
Vue.filter('parsePrice', (money) => {
	if(money==0){
		return '0.00'
	}else{
		if(money){
			var n = 2;
			money = parseFloat((money + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
			var l = money.split(".")[0].split("");
			var r = money.split(".")[1];
			var t = "";
			for (let i = 0; i < l.length; i++) {
				t += l[i];
			}
			return t + "." + r;
		}
	}
	
	
})
// #ifdef MP-WEIXIN
const ald = require('./utils/ald-stat.js')
// #endif


//#ifdef H5
import wechat from '@/common/js/wxJsdk.js'
Vue.prototype.$wechat = wechat;
//#endif


App.mpType = 'app'
Vue.config.productionTip = false

const app = new Vue({
	...App
})
app.$mount()
