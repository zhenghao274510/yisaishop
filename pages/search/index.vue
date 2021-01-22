<template>
	<view class="s-page-wrapper">
		<view class="search-pop">
			<view class="top-input">
				<view class="uni-icon uni-icon-search"></view>
				<input type="text" value="" confirm-type="search" placeholder-style="color:#74738e;font-size:26upx;" placeholder="请输入关键字"
				 v-model="keywords" @confirm="submitSearch" />
			</view>
		</view>
		<view class="search-cat">
			<view class="search-cat-tit"><text class="up-menu">热搜</text></view>
			<view class="src-content">
				<view class="src-item uni-ellipsis" v-for="(v, k) in hotList" :key="k" @click="hostSearch(v)">
					{{v}}
				</view>
			</view>
		</view>
		<view class="search-cat">
			<view class="search-cat-tit"><text class="up-menu">历史搜索</text>
				<image src="/static/img/delele.png" class="del-img" @click="clear"></image>
			</view>
			<view class="src-content">
				<view class="src-item uni-ellipsis" v-for="(v, k) in searchList" :key="k" @click="hostSearch(v)">
					{{v}}
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				keywords: '',
				searchList: [],
				hotList: []
			};
		},
		onShow() {
			this.loadData();
			uni.getStorageSync('historySearch') ? this.searchList = uni.getStorageSync("historySearch") : this.searchList = [];
		},
		methods: {
			//  热门搜索
			loadData() {
				let parmas={
					cmd:'getKeyWordList',
				}
				this._reqw.post(parmas).then(res => {
					res.result == 0 ? this.hotList = res.body.dataList : this.$api.tip(res.resultNote)
				})
			},
			submitSearch() {
				for (let i in this.searchList) {
					if (this.searchList[i] == this.keywords) {
						this.searchList.splice(i, 1)
					}
				}
				this.keywords == "" ? this.$api.tip("请输入要搜索的内容!") : (this.searchList.length < 5 ? (this.searchList
					.unshift(this.keywords), uni.setStorageSync(
						"historySearch", this.searchList)) : (this.searchList.pop(), this.searchList.unshift(this.keywords), uni.setStorageSync(
					"historySearch", this.searchList)), this.$api.navTo(
					`/pages/search/search_list?id=${this.keywords}`))
			},
			clear() {
				this.searchList = [];
				uni.removeStorageSync("historySearch");
				this.$api.tip('删除成功!')
			},
			hostSearch(v) {
				this.keywords = v;
				this.submitSearch();
			}
		},
		onHide() {
			this.keywords = ''
		}
	};
</script>
<style>
	page {
		background-color: #FFFFFF;
	}
</style>

<style lang="scss">
	.del-img {
		width: 30upx;
		height: 30upx;
	}

	.red {
		color: #FF0000;
	}

	.search-img {
		width: 38upx;
		height: 38upx;
	}

	.uni-icon-search {
		font-size: 30upx;
	}

	.help-tips {
		font-size: 26upx;
		color: #999;
		line-height: 26upx;
		padding: 0 0 0 30upx;
		margin: 0;
		width: 80%;
		text-align: left;
	}

	.help-tips.color999 {
		color: #999999;
	}

	.search-cat-tit::before {
		content: '';
		position: absolute;
		top: 50%;
		left: 0;
		transform: translateY(-50%);
		width: 6upx;
		height: 24upx;
		background: #037333;
		border-radius: 3upx;
	}

	.search-pop {
		padding: 14px 20px;
		display: flex;
		justify-content: space-between;
		align-items: center;

	}

	.top-input {
		flex: 1;
		margin-right: 40upx;
		height: 70upx;
		line-height: 70upx;
		display: flex;
		padding-left: 40upx;
		box-sizing: border-box;
		background-color: #F6F6F6;
		border-radius: 50upx;
		color: #74718c;
		align-items: center;
	}

	.top-inptu input {
		height: 100%;
	}

	.search-btn {
		height: 100%;
		color: #333333;
		font-size: 27upx;
	}

	.search-cat {
		padding: 40upx;
		background: #FFFFFF;
	}

	.search-cat .search-cat-tit {
		position: relative;
		display: flex;
		align-items: center;
		font-weight: bold;
		justify-content: space-between;
		padding-left: 30upx;
	}

	.search-cat .search-cat-tit .up-menu {
		display: block;
		height: 20px;
		line-height: 20px;
		font-size: 0.9em;
		color: #333333;
	}

	.src-content {
		margin: 10px auto;
		display: flex;
		flex-wrap: wrap;
	}

	.src-item {
		width: 23%;
		border-radius: 27upx;
		padding: 7upx 20upx;
		height: 46upx;
		line-height: 46upx;
		background: rgba(245, 245, 245, 1);
		margin: 20upx 10upx;
		position: relative;
		font-size: 26upx;
		color: #666666;
		text-align: center;
	}

	.clear-search {
		padding: 10px 0;
		text-align: center;
		font-size: 30upx;
		color: #333;
	}
</style>
