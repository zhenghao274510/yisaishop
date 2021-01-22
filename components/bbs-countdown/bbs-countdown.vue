<template>
	<view class="">
		<view class="bbs-countdown" :style="{color: setColor}" v-if="type==0">
			<text v-if="days" class="card">{{days < 10 ? `0${days}` : days}}</text>
			<text class="middle" v-if="days">天</text>
			<text class="card">{{hours < 10 ? `0${hours}` : hours}}</text>
			<text class="middle">时</text>
			<text class="card">{{minutes < 10 ? `0${minutes}` : minutes}}</text>
			<text class="middle">分</text>
			<text class="card">{{seconds < 10 ? `0${seconds}` : seconds}}</text>
			<text class="middle">秒</text>
		</view>
		<view class="bbs-countdown" :style="{color: setColor}" v-if="type==1">
			<text style="font-size: 26upx;color: #666666;">剩余:</text>
			<text v-if="days" style="font-size: 26upx;color: #666666;">{{days < 10 ? `0${days}` : days}}</text>
			<text  v-if="days" style="font-size: 26upx;color: #666666;">天</text>
			<text style="font-size: 26upx;color: #666666;">{{hours < 10 ? `0${hours}` : hours}}</text>
			<text  style="font-size: 26upx;color: #666666;">:</text>
			<text style="font-size: 26upx;color: #666666;">{{minutes < 10 ? `0${minutes}` : minutes}}</text>
			<text  style="font-size: 26upx;color: #666666;">:</text>
			<text  style="font-size: 26upx;color: #666666;">{{seconds < 10 ? `0${seconds}` : seconds}}</text>
		</view>
		<view class="bbs-countdown" :style="{color: setColor}" v-if="type==2">
			<text style="font-size: 26upx;color: #F15721;">拼团剩余时间:</text>
			<text v-if="days" class="card">{{days < 10 ? `0${days}` : days}}</text>
			<text class="middle" v-if="days">天</text>
			<text style="font-size: 26upx;color: #F15721;;">{{hours < 10 ? `0${hours}` : hours}}</text>
			<text  style="font-size: 26upx;color:#F15721;;">:</text>
			<text style="font-size: 26upx;color:#F15721;">{{minutes < 10 ? `0${minutes}` : minutes}}</text>
			<text  style="font-size: 26upx;color:#F15721;">:</text>
			<text  style="font-size: 26upx;color:#F15721;">{{seconds < 10 ? `0${seconds}` : seconds}}</text>
		</view>
		<view class="bbs-countdown" :style="{color: setColor}" v-if="type==3">
			<text style="font-size: 22upx;color:#FF0000;">距结束:</text>
			<text style="font-size: 22upx;color:#FF0000;" v-if="days">{{days < 10 ? `0${days}` : days}}</text>
			<text style="font-size: 22upx;color:#FF0000;" v-if="days">天</text>
			<text style="font-size: 22upx;color: #FF0000;">{{hours < 10 ? `0${hours}` : hours}}</text>
			<text  style="font-size: 22upx;color:#FF0000;">:</text>
			<text style="font-size: 22upx;color:#FF0000;">{{minutes < 10 ? `0${minutes}` : minutes}}</text>
			<text  style="font-size: 22upx;color:#FF0000;">:</text>
			<text  style="font-size: 22upx;color:#FF0000;">{{seconds < 10 ? `0${seconds}` : seconds}}</text>
		</view>
	</view>
	
</template>
<script>
	const MILLISECONDS_SECOND = 1000;
	const MILLISECONDS_MINUTE = 60 * MILLISECONDS_SECOND;
	const MILLISECONDS_HOUR = 60 * MILLISECONDS_MINUTE;
	const MILLISECONDS_DAY = 24 * MILLISECONDS_HOUR;

	export default {
		name: 'bbs-countdown',
		props: {
			/**
			 * Starts the countdown automatically when initialized.
			 */
			autoStart: {
				type: Boolean,
				default: true,
			},
			/**
			 * 类型
			 */
			type: {
				type: [String,Number],
				default: 0,
			},

			/**
			 * Emits the countdown events.
			 */
			emitEvents: {
				type: Boolean,
				default: true,
			},

			/**
			 * The interval time (in milliseconds) of the countdown progress.
			 */
			interval: {
				type: Number,
				default: 1000,
				validator: value => value >= 0,
			},

			/**
			 * The time (in milliseconds) to count down from.
			 */
			time: {
				type: Number,
				default: 0,
				validator: value => value >= 0,
			},
			setColor: {
				type: String,
				default: "#ffffff"
			}
		},
		computed: {
			/**
			 * Remaining days.
			 * @returns {number} The computed value.
			 */
			days() {
				return Math.floor(this.totalMilliseconds / MILLISECONDS_DAY);
			},

			/**
			 * Remaining hours.
			 * @returns {number} The computed value.
			 */
			hours() {
				return Math.floor((this.totalMilliseconds % MILLISECONDS_DAY) / MILLISECONDS_HOUR);
			},

			/**
			 * Remaining minutes.
			 * @returns {number} The computed value.
			 */
			minutes() {
				return Math.floor((this.totalMilliseconds % MILLISECONDS_HOUR) / MILLISECONDS_MINUTE);
			},

			/**
			 * Remaining seconds.
			 * @returns {number} The computed value.
			 */
			seconds() {
				return Math.floor((this.totalMilliseconds % MILLISECONDS_MINUTE) / MILLISECONDS_SECOND);
			},

			/**
			 * Remaining milliseconds.
			 * @returns {number} The computed value.
			 */
			milliseconds() {
				return Math.floor(this.totalMilliseconds % MILLISECONDS_SECOND);
			},

			/**
			 * Total remaining days.
			 * @returns {number} The computed value.
			 */
			totalDays() {
				return this.days;
			},

			/**
			 * Total remaining hours.
			 * @returns {number} The computed value.
			 */
			totalHours() {
				return Math.floor(this.totalMilliseconds / MILLISECONDS_HOUR);
			},

			/**
			 * Total remaining minutes.
			 * @returns {number} The computed value.
			 */
			totalMinutes() {
				return Math.floor(this.totalMilliseconds / MILLISECONDS_MINUTE);
			},

			/**
			 * Total remaining seconds.
			 * @returns {number} The computed value.
			 */
			totalSeconds() {
				return Math.floor(this.totalMilliseconds / MILLISECONDS_SECOND);
			},
		},
		data() {
			return {
				/**
				 * It is counting down.
				 * @type {boolean}
				 */
				counting: false,
				// timeoutId: '',
				/**
				 * The absolute end time.
				 * @type {number}
				 */
				endTime: 0, //   倒计时结束时间

				/**
				 * The remaining milliseconds.
				 * @type {number}
				 */
				totalMilliseconds: 0, // 剩余倒计时时间
			}
		},
		watch: {
			$props: {
				deep: true,
				immediate: true,

				/**
				 * Update the countdown when props changed.
				 */
				// new Date().getTime()
				handler() {
					this.totalMilliseconds = this.time - new Date().getTime();
					this.endTime =this.time;
					console.log(this.totalMilliseconds)
					 // 1607763022000-1601110225000
                     // console.log(this.$api.formatTime(1607763022000),this.$api.formatTime(1601110225000))
					if (this.autoStart) {
						this.start();
					}
				},
			},
		},
		methods: {
			/**
			 * Starts to countdown.
			 * @public
			 * @emits Countdown#start
			 */
			start() {
				if (this.counting) {
					return;
				}

				this.counting = true;

				if (this.emitEvents) {
					/**
					 * Countdown start event.
					 * @event Countdown#start
					 */
					this.$emit('start');
				}

				this.continue();
			},

			/**
			 * Continues the countdown.
			 * @private
			 */
			continue () {
				if (!this.counting) {
					return;
				}
				const delay = Math.min(this.totalMilliseconds, this.interval);

				if (delay > 0) {

					this.timeoutId = setTimeout(() => {
						this.progress();
					}, delay);
				} else {
					this.end();
				}
			},

			/**
			 * Pauses the countdown.
			 * @private
			 */
			pause() {
				clearTimeout(this.timeoutId);
			},

			/**
			 * Progresses to countdown.
			 * @private
			 * @emits Countdown#progress
			 */
			progress() {
				if (!this.counting) {
					return;
				}

				this.totalMilliseconds -= this.interval;

				if (this.emitEvents && this.totalMilliseconds > 0) {
					/**
					 * Countdown progress event.
					 * @event Countdown#progress
					 */
					this.$emit('progress', {
						days: this.days,
						hours: this.hours,
						minutes: this.minutes,
						seconds: this.seconds,
						milliseconds: this.milliseconds,
						totalDays: this.totalDays,
						totalHours: this.totalHours,
						totalMinutes: this.totalMinutes,
						totalSeconds: this.totalSeconds,
						totalMilliseconds: this.totalMilliseconds,
					});
				}

				this.continue();
			},

			/**
			 * Aborts the countdown.
			 * @public
			 * @emits Countdown#abort
			 */
			abort() {
				if (!this.counting) {
					return;
				}

				this.pause();
				this.counting = false;

				if (this.emitEvents) {
					/**
					 * Countdown abort event.
					 * @event Countdown#abort
					 */
					this.$emit('abort');
				}
			},

			/**
			 * Ends the countdown.
			 * @public
			 * @emits Countdown#end
			 */
			end() {
				if (!this.counting) {
					return;
				}

				this.pause();
				this.totalMilliseconds = 0;
				this.counting = false;

				if (this.emitEvents) {
					/**
					 * Countdown end event.
					 * @event Countdown#end
					 */
					this.$emit('end');
				}
			},

			/**
			 * Updates the count.
			 * @private
			 */
			update() {
				if (this.counting) {
					this.totalMilliseconds = Math.max(0, this.endTime - this.now());
				}
			},
		},
		beforeDestroy() {
			this.pause();
		}
	}
</script>
<style lang="scss">
	.bbs-countdown {
		color: #000 !important;
	}

	.card {
		background: #FE1741;
		border-radius: 4px;
		color: #FFFFFF;
		font-size: 24upx;
		padding: 1px 4px;
	}

	.middle {
		margin: 0 8upx;
	}
</style>
