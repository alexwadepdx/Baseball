function random_number() {
	return Math.floor((Math.random() * 20) +1)
}

var app = new Vue({
	el: '#app',
	data: {
		hidden_outs: 0,
		outs: 0,
		balls: 0,
		strikes: 0,
		umpire: ' ',
		random: 0,
		innings: 1,
		homescore: 0,
		awayscore: 0,
		firstbase: false,
		secondbase: false,
		thirdbase: false,
		pitch: 0,
		hit: 0,
		awayatbat: true,
		playscore: 0,
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
						this.call_pitch()
					}, 1000)
				}, 1000)
			}, 1000)

			

		},
		empty: function () {
			this.pitchgridone = false
			this.pitchgridtwo = false
			this.pitchgridthree = false
		},

		call_pitch: function() {
			this.random = random_number()
			if (this.random < 6) {
				this.balls += 1
				this.umpire = 'ball!'
				if (this.balls == 4) {
					this.umpire = 'ball 4 take your base'
					this.balls = 0
					this.strikes = 0
				}
			}
			else if (this.random < 14) {
				this.strikes += 1
				this.umpire = 'strike!'
				if(this.strikes == 3) {
					this.umpire = 'Strike 3, Batters out'
					this.outs += 1
					this.balls = 0
					this.strikes = 0
				}

			} 
			else if (this.random < 17) {
				this.umpire = 'foul ball!'
				if (this.strikes < 2){
					this.strikes += 1
				}
			}
			else if (this.random < 20) {
				this.umpire = 'Hit!'
				this.balls = 0
				this.strikes = 0
				if(this.awayatbat){
					this.awayscore += this.baserunners()
				}
				else {
					this.homescore += this.baserunners()
				}
			} 
			else {
				this.umpire = "homerun"
				if(this.awayatbat){
					this.awayscore += this.baserunners()
				}
				else{
					this.homescore += this.baserunners()
				}
				this.balls = 0
				this.strikes = 0
			}
		},
		baserunners: function(call) {
			if (this.umpire == "homerun") {
				let playscore = 1
				if (this.firstbase){
					playscore += 1
				}
				if (this.secondbase) {
					playscore += 1
				}
				if (this.thirdbase){
					playscore += 1
				}
				this.firstbase = false
				this.secondbase = false
				this.thirdbase = false
				return playscore
			}
			else {
				let playscore = 0
				
				if (this.thirdbase){
					playscore += 1
					this.thirdbase = false
				}
				if (this.secondbase) {
					this.thirdbase = true
					this.secondbase = false
				}
				if (this.firstbase) {
					this.secondbase = true
					
				}
				this.firstbase = true
				return playscore			
			}
		},

		game: function () {
			if (this.outs == 3) {
				this.awayatbat = !this.awayatbat 
				this.outs = 0
				this.firstbase = false
				this.secondbase = false
				this.thirdbase = false
				this.balls = 0
				this.strikes = 0
			}
			this.throwpitch()
		}
				
	},

	
	// created: function () {
	// 	this.throwpitch()
	//
	// }

})