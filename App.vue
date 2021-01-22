<script>
	export default {
		globalData: {
			leftCid:'',    //  分类id
			tabIndex:0,     //   导航所在位置
			inviteCode:'',
			merchantId:''
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	@import "./common/css/uni.css";
	@import "./common/css/ani.css";
/* 首页  地址显示 */
	.public-con{
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.city-con{
		width: 96%;
		height: 100upx;
		background: #FFFFFF;
		border-radius: 10upx;
		z-index: 99;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30upx;
		box-sizing: border-box;
		margin-bottom: 30upx;
	}
	.img-icon-home{
		width: 27upx;
		height: 27upx;
		margin-right: 10upx;
	}
	.image-icon-home{
		width:56upx;
		height: 56upx;
		z-index: 99;
	}
	.allHeight{
		/* #ifdef MP-WEIXIN */
		height: 270upx !important;
		/* #endif */
		/* #ifdef H5 */
		height: 176upx !important;
		/* #endif */
	}
	page {
		background-color: #F6F6F6;
	}
	.indexBg {
		width:750upx;
		height:196upx;
		position: absolute;
		top: 0;
		background: url(static/img/bg.png);
		background-size: 100% 100%;
		z-index:-1;
		border-radius: 0 0 10upx 10upx;
	}

	.d-content-center {
		justify-content: center;
	}

	.d-items-center {
		align-items: center;
	}
	.d-around{
		justify-content: space-around;
	}
	.d-column{
		flex-direction: column;
	}

	.d-between {
		justify-content: space-between;
	}

	/* scroll-view   去滚动条 */
	::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
	}

	.btn-hover {
		opacity: .7;
	}
	.d-border-bottom {
		border-bottom: 2upx solid #F2F2F2;
	}

	.uni-two-cut {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.lazyload{
		position: relative;
		
		&.lazypic{
			&:after{
				content: '';
				position: absolute;
				left: 0;
				top: 0;
				width: 100%;
				height: 100%;
				background-image: url(./static/0.jpg);
				background-size: 100% 100%;
				opacity: 0.3;
			}
		}
		image{
			position: relative;
			z-index: 1;
			opacity:0;
		}
		&.loaded{
			image{
				transition: .7s;
				opacity:1 !important;
			}
		} 
	}

</style>
