<template>
	<view>
		<!-- 热门城市 -->
		<view class="hot" v-if="hot">
			<view v-for="item in hotList" :key="item.id" @tap="bindCity(item)" :data-city="item.name">{{item.name}}</view>
		</view>
		<!-- 首字母检索 -->
		<view class="searchLetter touchClass">
			<!-- 右边字母数据数据 触摸事件-->
			<view v-for="item in searchLetter" :key="item.name" :data-letter="item.name" :style="{height:`${itemH}px`}"
			 @touchstart.stop="searchStart" @touchmove.stop="searchMove" @touchend.stop="searchEnd">{{item.name}}</view>
		</view>
		<!-- 左边字母跟右边字母true时 屏幕中心显示选中的首字母-->
		<!-- 居中首字母样式 -->
<!-- 		<view class="cont_Letter" v-if="isShowLetter">
			{{showLetter}}
		</view> -->
		<scroll-view scroll-y="true" :style="{height:`${winHeight}px`}" :scroll-top="scrollTop">
			<!-- 循环城市数据 -->
			<view v-for="(value,key) in cityList" :key="key">
				<!-- 循环首字母检索信息 -->
				<view class="list_letter">{{key}}</view>
				<!-- 城市ID城市名称 -->
				<view class="item_city" v-for="item in value" :key="item.id" :data-city="item.name" @tap="bindCity(item)">{{item.name}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import address from './citys.js'
	export default {
		name: "NynCityList",
		props: {
			hot: {
				type: Boolean,
				required: false,
				default: true
			}
		},
		data() {
			return {
				isShowLetter: false, //拖动时，是否显示中间字母
				showLetter: 'A', //中间字母
				searchLetter: [], //字母检索列表
				itemH: 0, //字母列表的高度
				startPageY: 0, //开始拖动字母时Y坐标
				bHeight: 0,
				tHeight: 0,
				scrollTop: 0, //城市列表容器滚动条的位置
				winHeight: 0, //城市列表窗口高度
				cityList: [], //城市列表
				hotList: [], //热门列表
				search: false, //是否搜索
			}
		},
		created() {
			this.initList()
		},
		methods: {
			/* 列表初始化 */
			initList() {
				let searchLetter = []
				for (let key in address.cities) {
					searchLetter.push(key)
				}
				let hotList = address.hotCities;
				let cityList = address.cities;
				let sysInfo = uni.getSystemInfoSync();
				let winHeight = sysInfo.windowHeight;
				//添加要匹配的字母范围值
				//更加屏幕高度设置子元素的高度
				let itemH = winHeight / searchLetter.length;
				let tempObj = [];
				for (let i = 0; i < searchLetter.length; i++) {
					let temp = {};
					temp.name = searchLetter[i];
					temp.tHeight = i * itemH;
					temp.bHeight = (i + 1) * itemH;
					tempObj.push(temp)
				}
				this.winHeight = winHeight
				this.itemH = itemH
				this.searchLetter = tempObj
				this.cityList = cityList
				this.hotList = hotList
			},
			/* 搜索城市时触发 */
			bindinputCitys(e) {
				let cities = this.cityList;
				let cyits = [];
				for (let key in cities) {
					for (let i = 0; i < cities[key].length; i++) {
						if (cities[key][i].name.search(e.detail.value) != -1 || cities[key][i].spell.search(e.detail.value) != -1) {
							cyits.push(cities[key][i])
						};
					}
				}
				this.search = e.detail.value
				this.cyits = cyits
			},
			/* 检索字母拖动开始 */
			searchStart(e) {
				let showLetter = e.currentTarget.dataset.letter;
				let pageY = e.touches[0].pageY;
				this.setScrollTop(showLetter);
				this.nowLetter(pageY);
				this.showLetter = showLetter
				this.startPageY = pageY
				this.isShowLetter = true
			},
			/* 检索字母拖动中 */
			searchMove(e) {
				let pageY = e.touches[0].pageY;
				let startPageY = this.startPageY;
				let tHeight = this.tHeight;
				let bHeight = this.bHeight;
				// let showLetter = 0;
				if (startPageY - pageY > 0) { //向上移动
					if (pageY < tHeight) {
						this.nowLetter(pageY);
					}
				} else { //向下移动
					if (pageY > bHeight) {
						this.nowLetter(pageY);
					}
				}
			},
			/* 检索字母拖动结束 */
			searchEnd() {
				setTimeout(() => {
					this.isShowLetter = false
				}, 1000)
			},
			/* 点击城市 */
			bindCity(item) {
				// 向外传递这个城市
				this.$emit('bindCity', item)
			},
			/* 设置scroll-view滚动距离 */
			setScrollTop(showLetter) {
				let scrollTop = 0;
				let cityList = this.cityList;
				let cityCount = 0;
				let initialCount = 0;
				for (let key in cityList) {
					if (showLetter == key) {
						scrollTop = initialCount * 30 + cityCount * 41;
						break;
					} else {
						initialCount++;
						cityCount += cityList[key].length;
					}
				}
				this.scrollTop = scrollTop
			},
			/*  */
			nowLetter(pageY) {
				let letterData = this.searchLetter;
				let bHeight = 0;
				let tHeight = 0;
				let showLetter = "";
				for (let i = 0; i < letterData.length; i++) {
					if (letterData[i].tHeight <= pageY && pageY <= letterData[i].bHeight) {
						bHeight = letterData[i].bHeight;
						tHeight = letterData[i].tHeight;
						showLetter = letterData[i].name;
						break;
					}
				}
				this.setScrollTop(showLetter);
				this.bHeight = bHeight;
				this.tHeight = tHeight;
				this.showLetter = showLetter;
				this.startPageY = pageY
			}
		}
	}
</script>

<style lang="scss" scoped>
	.search {
		background-color: #ffffff;
		border: 1px solid #cccccc;
		width: 686rpx;
		border-radius: 100rpx;
		margin: 20rpx auto;
		padding: 4rpx;

		input {
			line-height: 60rpx;
			text-align: left;
			padding-left: 20rpx;
		}
	}

	/* 首字母样式 */
	.searchLetter {
		position: fixed;
		right: 0;
		top: 20%;
		width: 30px;
		height: 80%;
		text-align: center;
		justify-content: center;
		display: flex;
		flex-direction: column;
		color: #666;
		background-color: transparent;
		z-index: 1;

		view {
			height: 50rpx;
		}
	}

	/* 右边首字母样式 */
	.touchClass {
		color: #666;
		font-size: 28rpx;
	}

	/* 居中显示的选中首字母 */
	.cont_Letter {
		background-color: #666;
		color: #fff;
		display: flex;
		justify-content: center;
		align-items: center;
		position: fixed;
		top: 50%;
		left: 50%;
		margin: -50px;
		width: 100px;
		height: 100px;
		border-radius: 10px;
		font-size: 26px;
		z-index: 1
	}

	/* 循环数据首字母检索 */
	.list_letter {
		display: flex;
		background-color: #f8f8f8;
		height: 30px;
		color: #2a2a2a;
		font-size: 26rpx;
		padding-left: 10px;
		align-items: center;
	}

	/* 城市样式 */
	.item_city {
		display: flex;
		background-color: #fff;
		height: 40px;
		padding-left: 10px;
		color: #2a2a2a;
		font-size: 30rpx;
		align-items: center;
		border-bottom: 1px solid #f8f8f8
	}

	.hot {
		background: #ffffff;
		display: flex;
		flex-flow: row wrap;
		padding: 10rpx 15rpx;

		view {
			font-size: 30rpx;
			padding: 10rpx 20rpx;
			border-radius: 50rpx;
			margin-bottom: 20rpx;
		}
	}

	.list {
		.eng {
			background: #ffffff;
			padding: 30rpx;
			color: #212121;
		}

		.text {
			color: #212121;
			font-size: 26rpx;
			margin: 30rpx 0 0 30rpx;
			padding-bottom: 30rpx;
			border-bottom: 1px solid #E6E6E6
		}
	}
</style>
