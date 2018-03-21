$(function() {
	console.log('document READY')

	// Generate Random Profile
	var profile = {
		color: randomColor(),
		name: String.fromCharCode(Math.floor(Math.random()*26)+65),
	}
	console.log('random profile', profile)
	
})