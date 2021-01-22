<template>
	<view class="s-switch-container uni-flex">
		<view class="s-switch-item" :class="{
                's-switch-selected': item.selected
              }" @click="selectItem(item)"
		 v-for="item in switchArr" :key="item.key">
			{{item.value}}
		</view>
	</view>
</template>

<script>
	export default {
		name: 'SSwitch',
		props: {
			defaultValue: {
				type: Number,
				default: 0
			},
			switchList: {
				type: Array,
				default () {
					return [{
							key: 0,
							value: '自提'
						},
						{
							key: 1,
							value: '外送'
						}
					]
				}
			},
			type: {
				type: String,
				default: 0
			}
		},
		data() {
			return {
				switchArr: []
			}
		},
		methods: {
			selectItem(info) {
				if (this.type == 0) {
					return
				}
				if (info.selected === false) {
					for (const item of this.switchArr) {
						if (info.key === item.key) {
							item.selected = true
							this.$emit('switchValue', item)
						} else {
							item.selected = false
						}
					}
				}
			}
		},
		created() {
			for (let i = 0; i < 2; i++) {
				const arrItem = {
					key: this.switchList[i].key,
					value: this.switchList[i].value,
					selected: this.defaultValue === this.switchList[i].key ? true : false
				}
				if (this.switchList[i].key === this.defaultValue) {
					this.$emit('switchValue', arrItem)
				}
				this.switchArr.push(arrItem)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.s-switch-container {
		padding: 2upx;
		width: 165upx;
		height: 57upx;
		border-radius: 100upx;
		border: 4upx solid #007030;
		box-sizing: border-box;
		background-color: #007030;

	}

	.s-switch-item {
		color: #FFFFFF;
		font-size: 26upx;
		width: 80upx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.s-switch-selected {
		color: #007030;
		border-radius: 40upx;
		background: #FFFFFF;
		font-size: 26upx;
	}
</style>
