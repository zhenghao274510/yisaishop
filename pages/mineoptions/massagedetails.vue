<template>
	<view class="goods_info_use" style="background: #FFFFFF;">
			<jyf-parser :html="content" ref="article"></jyf-parser>
	</view>
</template>

<script>
	import jyfParser from "@/components/jyf-parser/jyf-parser.vue"
	export default {
		data() {
			return {
				content: ''
			}
		},
		onLoad(options) {
			this.$api.setNav(options.title);
			this.content = decodeURIComponent(options.content);
		}

	}
</script>

<style scoped>
	.goods_info_use {
		padding: 20upx;
	}
</style>
