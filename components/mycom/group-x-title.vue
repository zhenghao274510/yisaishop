<template>
	<view class="">
		<view class="ss-scroll-navbar" :class="[isFixed?'fixed':'']">
			<view
			v-for="(item, index) in navArr" 
			:key="index" 
			class="nav-item"
			@click="tabChange(item,index)"
			:style="{'width':parmentWidth}" 
			>
				<text class="title" :class="{current: index === tabCurrentIndex}">{{item.name}}</text>
			</view>
		</view>
		<view class="group_splace" v-if="isFixed">
			
		</view>
	</view>
	
</template>

<script>
	export default {
		name: 'ss-scroll-navbar2',
		props: {
			navArr: {
				type: Array,
				default () {
					return []
				}
			},
			tabCurrentIndex:{
				type:[Number,String],
				default:0
			}
		},
		data () {
			return {
				isFixed:true
			}
		},
		computed:{
			parmentWidth(){
				return `${100/this.navArr.length}%`
			}
		},
		methods: {
			/**
			 * 导航栏navbar
			 * 点击事件
			 */
			tabChange (item,index) {
				console.log(index)
				if(this.tabCurrentIndex!=index){
					this.$emit('navbarTap',{obj:item,ind:index});
				}
			},
		}
	}
</script>

<style lang="scss">
	.fixed{
		position: fixed;
		z-index: 9999;
	}
	.group_splace{
		height: 90upx;
	}
	.ss-scroll-navbar {
		width: 100%;
		// height: 90upx;
		background-color: #FFFFFF;
		white-space:nowrap;
		.nav-item {
			height: 90upx;
            flex: 1;
			text-align: center;
			color:#666666;
			display: inline-block;
			position: relative;
			font-size: 30upx;
			
			.title {
				line-height: 90upx;
			}
		}
		
		.current{
			color:#000000!important;
			&::after{
				content:'';
				position: absolute;
				bottom: 0;
				left: 50%;
				transform: translateX(-50%);
				width: 118upx;
				height:2upx;
				background:#007030;
				border-radius:4upx
			}
		}
	}
</style>
