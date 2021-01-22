<template>
	<view class="">
		<view class="bord-title" v-if="type==2">
			我的团员({{group_number}})
		</view>
		<group-x-title :navArr="tabList" @navbarTap="tapNavClick" :tabCurrentIndex="tabIndex" v-else></group-x-title>
		<s-pull-scroll ref="pullScroll" :pullDown="pullDown" :pullUp="loadData" :back-top="true" top='100'>
			<view class="bord-con">
				<view class="bord-item-con uni-flex d-items-center d-between" v-for="(v,k) in dataList" :key="k">
					<view class="bord-tip" :class="[k%2==0?'one-bg':'two-bg']">
						{{k+1}}
					</view>
					<view class="uni-flex  d-items-center ">
						<image :src="v.icon" class="user-icon"></image>
						<view class="">
							<view class="" style="font-size: 28upx;font-weight:bold;color: #000000;">
								{{v.nickname}}
							</view>
							<view class="" style="font-size: 22upx;color: #999;">
							{{v.createDate}}
							</view>
						</view>
					</view>
					<view class="" v-if="type==3">
						<view class="" style="font-size: 24upx;color: #666666;" v-if="tabIndex==0">
							他的团员：{{v.member_number}}人
						</view>
						<view class="" style="font-size: 24upx;color: #666666;">
							产生佣金：{{v.money}}元
						</view>
					</view>
					<view class="" v-else>
						<view class="" style="font-size: 24upx;color: #666666;">
							产生佣金：{{v.money}}元
						</view>
					</view>
				</view>
			</view>

		</s-pull-scroll>
	</view>
</template>

<script>
	import sPullScroll from "@/components/s-pull-scroll/index.vue"
	import groupXTitle from "@/components/mycom/group-x-title.vue"
	export default {
		components: {
			sPullScroll,
			groupXTitle
		},
		data() {
			return {
				title: "超级团长",
				type: 2,   //   2 普通团长  3   超级团长
				merchant_id:'',
				group_number:0,
				tabIndex:0,
				tabList: [{
					name: '我的团长(0)'
				}, {
					name: '我的团员(0)'
				}],
				dataList:[]
			}
		},
		onLoad(options) {
			options.type==2?this.title='普通团长':this.title='超级团长';
			this.$api.setNav(this.title);
			this.type=options.type;
			this.merchant_id=options.id;
			console.log(this.type)
			this.refresh();
		},
		methods: {
			tapNavClick(e){
				this.tabIndex=e.ind;
				this.refresh()
			},
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
			formData(res){
				this.type==3?(this.tabList[0].name=`我的团长(${res.group_number})`,this.tabList[1].name=`我的团员(${res.member_number})`)
				:this.group_number=res.member_number;
			},
			loadData(pullScroll) {
				if (pullScroll.page == 1) {
					this.dataList = [];
				}
				let type;
				this.type==2?type=2:(this.tabIndex==0?type=1:type=2)
                
				let e = {
					cmd:'getChildDetailList',
					merchant_id:this.merchant_id,
					nowPage: pullScroll.page,
					type
				}
				console.log(e)
				const curList = [];
				this._reqw.post(e).then(res => {
					res.result == 0 ?
						(pullScroll.page==1?this.formData(res.body):'',
							(res.body.dataList.length == 0 ? (pullScroll.empty()) : res.body.dataList.forEach(item => {
									curList.push(item)
								}), this.dataList = this.dataList.concat(curList), pullScroll.page >= res.body.totalPage ? pullScroll.finish() :
								pullScroll.success())
						) :
						this.$api.tip(res.resultNote);
				})
			}
		}
	}
</script>

<style scoped>
	.bord-title {
		font-size: 28upx;
		font-weight: bold;
		color: #000000;
		text-align: center;
	}
	.bord-con{
		padding: 0 30upx;
	}
	.bord-item-con{
		width: 100%;
		height: 168upx;
		background: #FFFFFF;
		border:2upx solid rgba(139, 139, 139, 0.14);
		border-radius: 10upx;
		margin-bottom:20upx;
		position: relative;
		padding: 0 30upx 0 10upx;
		box-sizing: border-box;
	}
	.one-bg{
		background: url(../../static/img/xuhao.png);
		background-size: 100% 100%;
	}
	.two-bg{
		background: url(../../static/img/xuhao2.png);
		background-size: 100% 100%;
	}
	.bord-tip{
		position: absolute;
		top:-10upx;
		left: 0;
		width: 45upx;
		height: 36upx;
		line-height: 36upx;
		color: #FFFFFF;
		text-indent:10upx;
		font-size: 26upx;
		font-weight: bold;
		color: #FFFFFF;
	}
	.user-icon{
		width: 86upx;
		height: 86upx;
		border-radius: 50%;
		margin-right: 20upx;
	}
</style>
