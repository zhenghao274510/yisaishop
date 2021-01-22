<template>
	<view class="">
		<group-x-title :navArr="tabList" @navbarTap="tapNavClick" :tabCurrentIndex="tabIndex"></group-x-title>
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true" :top="100">
			<view class="uni-second-list">
				<checkbox-group>
					<view class="uni-second" @click.stop="gotoDetails(v.id)" v-for="(v,k) in dataList" :key="k">
						<radio :value="v.id" :checked="v.checked" style="transform: scale(.7);" color="#007030" @click.stop="useroptions(0,v)"/>
						<view class="uni-flex d-items-center uni-flex-item">
							<view class="image-second lazyload lazypic" :class="{loaded: v.loaded}">
								<image  :src="v.icon" lazy-load="true" mode="aspectFill" @load="imageOnLoad(v)"></image>
							</view>
							<view class="uni-second-price">
								<view class="uni-second-title uni-ellipsis">{{v.title}}
								</view>
								<view class="uni-flex d-items-center d-between">
									<view class="sku-name uni-ellipsis">
										
									</view>
									<view class="small-btn" hover-class="btn-hover" @click.stop="downOrUpGoods(0,v)">
										{{tabIndex==0?'下架':'上架'}}
									</view>
								</view>
								<view class="uni-flex d-between d-items-center">
									<view class="uni-flex d-items-center">
										<view class="">
											<text class="price-symbol " style="color:#F22519;">￥</text><text class="price">{{v.price}}</text>
										</view>
									</view>
									<view class="store-num">
											库存：{{v.stocks}}
										</view>
								</view>
							</view>
						</view>
			
					</view>
				</checkbox-group>
			</view>
		</s-pull-scroll>
		
		<view class="cart-footer uni-flex d-between d-items-center" @click.stop v-if="dataList.length!=0">
			<view class="uni-flex d-items-center" >
				<radio :checked="allChecked" style="transform: scale(.8);" color="#007030" @click.stop="useroptions(1)" />
			</view>
			<view class="cart-btn" @click.stop="downOrUpGoods(1)">
				{{tabIndex==0?'一键下架':'一键上架'}}
			</view>
		</view>
	</view>
</template>

<script>
	import groupXTitle from "@/components/mycom/group-x-title.vue"
	import dishManageList from "@/components/mycom/firstList.vue"
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	export default {
		components: {
			dishManageList,
			groupXTitle,
			sPullScroll
		},
		data() {
			return {
				tabIndex: 0,
				allChecked:false,
				merchantId: '',
				tabList: [{
					name: '上架商品'
				}, {
					name: '下架商品'
				}],
				dataList: [],
				checkedList:[]
			}
		},
		onLoad(options) {
			this.merchantId = options.id;
			this.refresh();
		},
		methods: {
			refresh() {
				this.$nextTick(() => {
					this.$refs.pullScroll.refresh();
				});
			},
			pullDown(pullScroll) {
				setTimeout(() => {
					this.loadData(pullScroll);
				}, 200)
			},
			gotoDetails(id){
				
			},
			useroptions(type,v) {
				if (type ==0) {
					v.checked = !v.checked;
					this.checkedList = this.dataList.filter(item => {
						return item.checked
					});
					this.checkedList.length==this.dataList.length?this.allChecked=true:this.allChecked=false;
				} else {
					const checked = !this.allChecked
					this.dataList.forEach(item => {
						item.checked = checked;
					})
					checked?this.checkedList=this.dataList:this.checkedList=[];
					this.allChecked = checked;
				}
			},
			loadData(pullScroll) {
				if (pullScroll.page == 1) {
					this.dataList = [];
				}
				let e = {
					cmd:'getProductList',
					merchantId: this.merchantId,
					state: this.tabIndex,
					flag:1,
					nowPage: pullScroll.page
				}
				const curList = [];
				this._reqw.post(e).then(res => {
					res.result == 0 ?
						(
							(res.body.dataList.length == 0 ? pullScroll.empty() : res.body.dataList.forEach(item => {
								item.checked=false,curList.push(item)
								}), this.dataList = this.dataList.concat(curList), pullScroll.page >= res.body.totalPage ? pullScroll.finish() :
								pullScroll.success())
						) :
						this.$api.tip(res.resultNote);
				})
			},
			downOrUpGoods(type,e) {
				let txt = '',idArr=[];
				this.tabIndex == 0 ? txt = '下架' : txt = "上架";
				if(type==1){
					this.dataList.forEach(item=>{
						item.checked?idArr.push(item.id):''
					})
					if(idArr.length==0){
						this.$api.tip('请选择商品!');
						return 
					}
				}else{
					idArr.push(e.id)
				}
				
				let parmas = {
					cmd:'updateProductState',
					ids:idArr,
				}
				this._reqw.post(parmas).then(res => {
					res.result == 0 ?
						(this.$api.tip(`${txt}成功!`),this.refresh()) :
						this.$api.tip(res.resultNote);
				}).catch(err=>{})
			},
			tapNavClick(e) {
				this.tabIndex = e.ind;
				this.allChecked=false;
				this.refresh();
			}
		}
	}
</script>

<style scoped lang="scss">
	.cart-footer {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		padding: 20upx;
		box-sizing: border-box;
		background: #FFFFFF;
		z-index: 99;
	}
	
	.cart-btn {
		width: 260upx;
		line-height: 66upx;
		background: #006F2F;
		border-radius: 33upx;
		color: #F4F9F7;
		text-align: center;
	}
	.small-btn {
		width: 139upx;
		height: 45upx;
		border: 2upx solid #006F2F;
		border-radius: 10upx;
		text-align: center;
		line-height: 45upx;
		color: #006F2F;
		font-size: 26upx;
	}
	
	.old-price {
		font-size: 17upx;
		color: rgba(153, 153, 153, 1);
	}
	
	.price {
		color: #FF0000;
		font-size: 32upx;
		font-weight: bold;
		margin-right: 30upx;
	}
	
	.price-symbol {
		font-size: 20upx;
	}
	
	.sku-name {
		color: #666666;
		font-size: 22upx;
		width: 70%;
	}
	
	.uni-second-list {
		margin-bottom: 10px;
	}
	
	.uni-second {
		display: flex;
		padding:20upx;
		width: 100%;
		justify-content: space-between;
		align-items: center;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-radius: 4upx;
		margin-bottom: 20upx;
	}
	
	.image-second {
		width: 155upx;
		height: 155upx;
		display: flex;
		align-items: center;
		justify-content: center;
		box-sizing: border-box;
		image{
			width: 100%;
			height: 100%;
			border-radius: 10upx;
		}
	}
	.uni-second-title {
		font-size: 32upx;
		font-weight: bold;
	}
	
	.uni-second-price {
		width: 75%;
		font-size: 28upx;
		line-height: 1.5;
		padding-left: 15upx;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		position: relative;
	}
	
	.store-num {
		font-size: 22upx;
		color: rgba(102, 102, 102, 1);
	}
</style>
