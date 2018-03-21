$(function() {
	console.log('document READY')

	// Generate Random Profile
	var profile = {
		color: randomColor(),
		name: String.fromCharCode(Math.floor(Math.random()*26)+65),
	}
	console.log('random profile', profile)

	// Submit New Message
	$('#new-message').submit(function(e) {
		console.log('new-message SUBMIT')
		e.preventDefault()

		// Store/Clear Message Value 
		var text = $('#message').val()
		$('#message').val('')
		
		// Publish Message
		shoutApp.publish({
			channel: 'everyone',
			message: {
				profile: profile,
				text: text,
			},
		}, function(status, response) {
			// console.log(status, response)
			console.log(status.error ? status : 'publish timetoken: '+response.timetoken)
		})
	})

	// Listen for Messages
	shoutApp.addListener({
		message: function(event) {
			console.log('listen event', event)

			// Built Message HTML
			var profileHtml = '<div class="profile" style="background-color:'+event.message.profile.color+'">'+event.message.profile.name+'</div>'
			var textHtml = '<div class="text">'+event.message.text+'</div>'
			var messageHtml = '<div class="message">'+profileHtml+textHtml+'</div>'
			console.log('message html', messageHtml)

			// Insert Message HTML
			$('div#messages').prepend(messageHtml)
		}
	})

})

// Init PubNub
var shoutApp = new PubNub({
	publishKey: 'pub-c-13130b60-72ed-449c-8285-e6199ec8378c',
	subscribeKey: 'sub-c-910a11ec-2ce1-11e8-86ee-1e8059ef76e6',
})

shoutApp.subscribe({
	channels:['everyone']
})