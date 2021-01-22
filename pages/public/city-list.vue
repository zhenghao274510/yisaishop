<template>
	<view class="">
		<nyn-city-list @getCity="getCity"></nyn-city-list>
	</view>
</template>

<script>
	import nynCityList from "@/components/bazaar-city_list/index.vue"
	export default {
		components: {
			nynCityList
		},
		data() {
			return {

			}
		},
		methods: {
			getCity(city) {
               this.$api.prePage().city=city;
			   this.$api.back();
			}
		}
	}
</script>

<style>
</style>
