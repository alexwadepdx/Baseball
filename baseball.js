var app = new Vue({
	el: '#app',
	data: {
		hidden_outs: 0,
		outs: 0,
		balls: 0,
		strikes: 0,
		innings: 1,
		home_score: 0,
		away_score: 0,
		first_base: 0,
		second_base: 0,
		third_base: 0,
		pitch: 0,
		hit: 0,
		hit_list: 0,
		pitchgridone: false,
		pitchgridtwo: false,
		pitchgridthree: false,

	},
	methods: {
		throwpitch: function () {
			this.pitchgridone = true
			console.log(this.pitchgridone)

			setTimeout(() => {
				this.pitchgridone = false
				this.pitchgridtwo = true
				setTimeout(() => {
					this.pitchgridtwo = false
					this.pitchgridthree = true
					setTimeout(() => {
						this.pitchgridthree = false
					}, 1000)
				}, 1000)
			}, 1000)





		},
		empty: function () {
			this.pitchgridone = false
			this.pitchgridtwo = false
			this.pitchgridthree = false
		}
	},
	// created: function () {
	// 	this.throwpitch()
	//
	// }

})