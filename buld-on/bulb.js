class Bulb {

	constructor(num) {
		this.num = num
		this.arr = []
		this.res = []
	}
	c() {
		let list = []
	  	for (let i=0; i<this.num;i++) {
	    	list.push(Math.random()<0.5)
	  	}
	  	this.arr = list
	}
	*start(cb) { 
	  for (let i=0; i<this.num; i++) {
	    if (i == 0) {
	    	console.log(i, 'no change')
	     	this.res.push(0)
	    } else if (i == this.num-1) {
	    	console.log(i, 'no change')
	     	this.res.push(0)
	    } else if (this.arr[i-1]) {
	    	console.log(i, 'no change')
	     	this.res.push(0)
	    } else if (!this.arr[i-1]) {
	    	console.log(i, 'change')
	      	this.res.push(1)
	      	this.arr[i-1] = !this.arr[i-1]
	      	this.arr[i] = !this.arr[i]
	      	this.arr[i+1] = !this.arr[i+1]
	    }
	     	cb(i)
	     	yield
	  }
	}
}