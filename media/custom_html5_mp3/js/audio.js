//This is a method that occurs when the DOM is ready
	window.onload = function () {

		//Setting a global variable to make references easier.
		var player = document.getElementById('player');
		var interval;

		//jQuery UI Slider for Progress and volume
		//Look up jQuery UI Slider for information on these!
		////////////////////////////////////////////////////
		var slider = $('#slider');
		var volume = $('#volume');

		slider.slider({
			range: 'min',
			min: 0,
		});

		volume.slider({
			range: 'min',
			value: 100,
			min: 0,
			max: 100,
		});

		//Set player volume to max as a default
		player.volume = 1;


		//When play, pause, or stop is clicked execute playMusic, pauseMusic, stopMusic
		document.getElementById('btnPlay').addEventListener('click', playMusic, false);
		document.getElementById('btnPause').addEventListener('click', pauseMusic, false);
		//document.getElementById('btnStop').addEventListener('click', stopMusic, false);


		//Play Controls
		//These methods are properties of the HTML audio which is why we're able to call them immediately.
		//////////////////////////////////////////////////////////////////////////////////////////////////
		function playMusic() {
			player.play();
			//We're updating this variable in intervals of 100ms for the update() function below.
			interval = setInterval(update, 100);

			//Sets the max time for the file being played
			slider.slider('option', 'max', player.duration);
		}

		function pauseMusic() {
			player.pause();
			//interval will keep running unless we clear it
			clearInterval(interval);
		}


		/*Not in use, but if you want to you can add it to your project.
		//Be sure to uncomment the stop button in the mp3player.html and the eventListener up at the top of the JS file!

		function stopMusic() {
			//Simulates stop, but the real magic is below.
			player.pause();
			//Sets the current time back to 0, for a true stop.
			player.currentTime = 0;
			//interval will keep running unless we clear it
			clearInterval(interval);
			//Set time ellapsed back to 0
			slider.slider('value', 0);
		}

		*/


		//Volume Controls
		/////////////////
		volume.on('slide', function () {
			//Since HTML audio volume is measure from 0.0 to 1, we need to divide by 100 to keep it in that range.
			player.volume = (volume.slider('value') / 100);

			if (volume.slider('value') === 0) {
				player.volume = 0;
			}
		});


		//Progress Slider
		//If the slider is clicked by the user, it should re-adjust its position
		////////////////////////////////////////////////////////////////////////
		slider.on('slide', function() {
			player.currentTime = slider.slider('value');
		});

		//Time Ellapsed
		//player.currentTime is measured in seconds
		///////////////////////////////////
		function update() {
			//We're going to convert this to min and seconds using the timeLeft function
			document.getElementById('timeEllapsed').innerHTML = timeLeft(player.currentTime);

			//Sets the currentTime as it is updateds
			slider.slider( "value", player.currentTime);
		}

		//Time Left
		///////////
		function timeLeft(seconds){
			var min = (seconds / 60);
			//We don't want this to go above 60 because there's only 60 seconds in a minute, right?
			seconds = seconds % 60;
 
			//Math.floor will round up to the neareast whole number and the if statements below take care of the rest.
			if(seconds <= 10){
				//This gives us our leading 0 if the digits are below 10
				return Math.floor(min) + ":0" + Math.floor(seconds);
			}
			else {
				return Math.floor(min) + ":" + Math.floor(seconds);

			}
		}
	};
