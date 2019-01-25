/*
	Explanation of program:
	
    Once the page loads the user will be asked to allow their location to be accessed. If the
    user allows this, their geographic location will be determined and weather data from that
    location will be gathered by making a get request to apixu api and displayed in the form of the
    current forecast and a 5-day forecast . Depending on the weather condition and the current time
    of their location, a background image will be displayed to describe that weather condition at
    that time of day. The user can change the measurements of degrees, precipitation, and wind from
    metric to imperial and vice versa by clicking the appropriate button. The user can also click on
    the days of the 5-day forecast to see more weather information for that particular day and change
    the measurements as well. If the user does not allow their location to be accessed or if an error
    occurs, they will be prompted to refresh the page to try again.
	
*/	

$(document).ready(function() {
	
	$('.location-access').show(); // ask user to allow their location to be accessed
	
	getPosition();
	
	$('[data-toggle="popover"]').popover();

}); // end of $(document).ready()

	function chooseWeatherBackground(weather, time) {
		
		// get current local time in hours
		
		console.log(time);
		
		time = time.slice(11,13); // get portion of date string that includes time (only the part that includes the hour)
		
		
		
		if (time.match(/:/)) { // if hour is only 1 digit (hour is in morning)
			
			time = time.slice(0,1);
		
		}

		weather.toLowerCase();
		
		let weatherConditions = ['Clear', 'Sunny', 'Cloudy', 'Overcast', 'Mist', 'Rain', 'Snow'];

		for (var i = 0; i < weatherConditions.length;i++) {
		
			let regex = new RegExp(weatherConditions[i].toLowerCase());
		
			if (weather.match(regex) !== null) {
			
				weather = weatherConditions[i];
				
			}
		
		} // end of for loop
		
		// add a background image based on weather condition and time of day
		
		switch(weather) {
		
			case 'Clear':
				
				$('body').css({'background-image': 'url("images/clear_night_sky.jpg")'});
				
			break;
			
			case 'Sunny':
			
				$('body').css({'background-image': 'url("images/sunny_day.jpg")'});
			
			break;
			
			case 'Cloudy':
				
				if (time > 19 || time < 7) {
					
					$('body').css({'background-image': 'url("images/cloudy_night_sky.jpg")'});
			
				}
				
				else {
					
					$('body').css({'background-image': 'url("images/cloudy_sky.jpg")'});
				
				}
			
			break;
			
			case 'Overcast':
				
				if (time > 19 || time < 7) {
					
					$('body').css({'background-image': 'url("images/overcast_night_sky.jpg")'});
			
				}
				
				else {
				
					$('body').css({'background-image': 'url("images/overcast_sky.jpg")'});
				}
				
			break;
			
			case 'Mist':
			
			case 'Fog':
				
				if (time > 19 || time < 7) {
					
					$('body').css({'background-image': 'url("images/misty_night_sky.jpg")'});
				
				}
				
				else {
					
					$('body').css({'background-image': 'url("images/misty_sky.jpg")'});
				
				}
				
			break;
			
			case'Rain':
			
				if (time > 19 || time < 7) {
					
					$('body').css({'background-image': 'url("images/rainy_night.jpg")'});
				
				}
				
				else {
					
					$('body').css({'background-image': 'url("images/rainy_day.jpg")'});
				}
				
			break;
			
			case 'Snow':
				
				if (time > 19 || time < 7) {
					
					$('body').css({'background-image': 'url("images/snowy_night.jpg")'});
				} 
				
				else {
					
					$('body').css({'background-image': 'url("images/snowy_day.jpg")'});
				
				}
				
			break;
			
			case 'Thunder':
			
				$('body').css({'background-image': 'url("images/thunder.jpg")'});
			
			break;
			
			case 'Sleet':
			
				if (time > 19 || time < 7) {
					
					$('body').css({'background-image': 'url("images/icy_night.jpg")'});
				}
				
				else {
					
					
					$('body').css({'background-image': 'url("images/day_sleet.jpg")'});
				}
			
			break;
			
			case 'Ice':
			
				if (time > 19 || time < 7) {
					
					$('body').css({'background-image': 'url("images/icy_night.jpg")'});
				}
				
				else {
					
					$('body').css({'background-image': 'url("images/icy_day.jpg")'});
				}
				
			break;
		
		} // end of switch()
	
	} // end of chooseWeatherBackground(weather)

	function getDay(day) {
		
		let thisDay = new Date(day).getDay();
		
		let dayOfWeek;
		
		switch(thisDay) {
		
			case 0:
			
				dayOfWeek = 'Monday';
			
			break;
			
			case 1:
				
				dayOfWeek = 'Tuesday';
			
			break;
			
			case 2:
				
				dayOfWeek = 'Wednesday';
			
			break;
			
			case 3:
				
				dayOfWeek = 'Thursday';
			
			break;
			
			case 4:
				
				dayOfWeek = 'Friday';
			
			break;
			
			case 5:
				
				dayOfWeek = 'Saturday';
			
			break;
			
			case 6:
			
				dayOfWeek = 'Sunday';
			
			break;
	
		} // end of switch()
		
		return dayOfWeek;
		
	} // end of getDay()

	function getStringDate(month, day) {
		
		switch(month) {
			
			case '01':
				
				month = 'Jan.';
			break;
			
			case '02':
			
				month = 'Feb.';
				
			break;
			
			case '03':
			
				month = 'March';
				
			break;
			
			case '04':
			
				month = 'April';
				
			break;
			
			case '05':
			
				month = 'May';
				
			break;
			
			case '06':
				
				month = 'June';
				
			break;
			
			case '07':
			
				month = 'July';
				
			break;
			
			case '08':
			
				month = 'Aug.';
				
			break;
			
			case '09':
			
				month = 'Sep.';
				
			break;
			
			case '10':
			
				month = 'Oct.';
				
			break;
			
			case '11':
			
				month = 'Nov.';
				
			break;
			
			case '12':
			
				month = 'Dec.';
				
			break;
			
		} // end of switch()
		
		return month + ' ' + day;
		
	} // getStringDate()

	function getPosition() {
	
	 	navigator.geolocation.getCurrentPosition(function(position) {
	 	
		$('.loading').show();
		
		$('.location-access').hide();
		
		latitude = position.coords.latitude;
		
		longitude = position.coords.longitude;
		
		getWeatherData(latitude, longitude);
	
		}, 
		
		function (error) { 
		
	  		if (error.code == error.PERMISSION_DENIED) {
				
				$('.location-access, .loading').hide(); 
				
				$('.refresh-page').show();
			}
			
		  else	if (error.code == error.POSITION_UNAVAILABLE || error.code == error. TIMEOUT ) {
				
				$('.error').show();
				
				$('.loading, .location-access').hide();
			}
		
		}); // end of navigator.geolocation.getCurrentPosition(function(position)
		
	} // end of getPosition()

	function getWeatherData(latitude, longitude) {
			
		$.getJSON('https://api.apixu.com/v1/forecast.json?key=10f7e01ace7a4be298a185347172404&q='+latitude+','+ longitude+ '&days=6', function(data) { // get forecast data for current day and next 5 days
			
			$('#current-forecast-container, #week-forecast-container').show();
			
			$('#loading-div').hide(); 
			
			// get current forecast data (day0)
			
			let city = data.location.name;
			
			let region = data.location.region;
			
			let time = data.location.localtime;
			
			$('#location').html(city + ', ' + region );
			
			let fahrenheit = data.current.temp_f;
			
			let celsius = data.current.temp_c;
			
			let weather = data.current.condition.text;
			
			chooseWeatherBackground(weather, time);
			
			let currentDate = data.forecast.forecastday[0].date;
			
			let currentMonth = currentDate.slice(5,7);
			
			let currentDayOfMonth = currentDate.slice(8,currentDate.length);
			
			let currentMonthAndDay = getStringDate(currentMonth,currentDayOfMonth);
			
			let currentDay = getDay(currentDate);
			
			let high = data.forecast.forecastday[0].day.maxtemp_f;
			
			let highC = data.forecast.forecastday[0].day.maxtemp_c;
			
			let low = data.forecast.forecastday[0].day.mintemp_f;
			
			let lowC = data.forecast.forecastday[0].day.mintemp_c;
			
			let precip = data.forecast.forecastday[0].day.totalprecip_in;
			
			let precipMM = data.forecast.forecastday[0].day.totalprecip_mm;
			
			let wind = data.forecast.forecastday[0].day.maxwind_mph;
			
			let windKPH = data.forecast.forecastday[0].day.maxwind_kph;
			
			let humidity = data.forecast.forecastday[0].day.avghumidity;
			
			let temp = data.forecast.forecastday[0].day.avgtemp_f;
			
			$('#degrees').html('<b>Current:</b> <span class="temp">'+fahrenheit + '</span>' + '<span class="temp-symbol"> °F </span>' + ' ' + '<button class="btn btn-xs btn-danger"> °C </button>').on('click', '.btn-danger', function() {
				
				let degrees = $('.high .temp-symbol').html();
				
				degreesF = degrees.match(/F/);
				
				degreesC = degrees.match(/C/);
				
				// if degrees are in Fahrenheit (measurement to convert to on button is Celsius), set degrees to Celsius for every day of forecast
				
				if (degreesF !== null) {
				
					$('.low .temp-symbol').html(' °C');
					
					$('.high .temp-symbol').html(' °C/  ');
					
					$('#degrees .temp-symbol').html(' °C  ');
		
					$('#degrees .temp').html(celsius);
					
					$('#current-forecast .high .temp-high').html(highC);
					
					$('#current-forecast .low .temp-low').html(lowC);
		
					$('#day1 .high .temp-high').html(day1HighC);
					
					$('#day1 .low .temp-low').html(day1LowC);
		
					$('#day2 .high .temp-high').html(day2HighC);
					
					$('#day2 .low .temp-low').html(day2LowC);

					$('#day3 .high .temp-high').html(day3HighC);
					
					$('#day3 .low .temp-low').html(day3LowC);
		
					$('#day4 .high .temp-high').html(day4HighC);
					
					$('#day4 .low .temp-low').html(day4LowC);
		
					$('#day5 .high .temp-high').html(day5HighC);
					
					$('#day5 .low .temp-low').html(day5LowC);
		
					$('.btn-danger').html(' °F');
					
				}
				
				// if degrees are in Celsius (measurement to convert to on button is Fahrenheit), set degrees to Fahrenheit for every day of forecast
				
				else if (degreesC !== null) {
				
					$('#degrees .temp-symbol').html(' °F  ');
					
					$('.low .temp-symbol').html(' °F');
					
					$('.high .temp-symbol').html('°F/ ');
		
					$('#degrees .temp').html(fahrenheit);
		
					$('#current-forecast .temp-high').html(high);
					
					$('#current-forecast .temp-low').html(low);
		
					$('#day1 .high .temp-high').html(day1High);
					
					$('#day1 .low .temp-low').html(day1Low);
		
					$('#day2 .high .temp-high').html(day2High);
					
					$('#day2 .low .temp-low').html(day2Low);
		
					$('#day3 .high .temp-high').html(day3High);
					
					$('#day3 .low .temp-low').html(day3Low);
		
					$('#day4 .high .temp-high').html(day4High);
					
					$('#day4 .low .temp-low').html(day4Low);
		
					$('#day5 .high .temp-high').html(day5High);
					
					$('#day5 .low .temp-low').html(day5Low);
		
					$('.btn-danger').html(' °C');
				
				}
				
			}); // end of $('#degrees').on('click', '.btn-danger', function()
			
			$('#weather').html('<b>Weather condition:</b> ' + weather);
			
			$('#current-forecast .current-day').html(currentDay + ', ' + currentMonthAndDay) ;
			
			$('#current-forecast .high').html('<b>High:</b> ' + '<span class="temp-high">' +high + '</span>' + '<span class="temp-symbol">  °F / </span>');
			
			$('#current-forecast .low').html('<b>Low:</b> ' + '<span class="temp-low">' + low + '</span>' + '<span class="temp-symbol"> °F </span>');
			
			$('#current-forecast .precip').html('<b>Total precip.:</b>  <span class="precipitation"> ' + precip +'</span> <span class="precip-symbol"> in. </span> <button class="btn btn-xs btn-success">Mm</button>').on('click', '.btn-success', function() {
				
				let precipitation = $('#current-forecast .precip .precip-symbol').html();
				
				let inches = precipitation.match(/n/);
				
				let mm = precipitation.match(/m/);
				
				// if precipitation is in inches (measurement to convert to on button is millimeters), set precipitation to millimeters for current forecast
				
				if (inches !== null) {
				
					 $('#current-forecast .precip .precipitation ').html(precipMM);
					 
					$('#current-forecast .precip .precip-symbol').html('mm.');
					
					 $('#current-forecast .precip .btn-success ').html('In.');
		
					
				}
				
				// if precipitation is in millimeters (measurement to convert to on button is inches), set precipitation to inches for current forecast

				else if (mm !== null) {
			
					$('#current-forecast .precip .precipitation ').html(precip);
					
					  $('#current-forecast .precip .precip-symbol').html('in.');
					  
					 $('#current-forecast .precip .btn-success ').html('Mm.');
				}
				
			});
			
			$('#current-forecast .wind').html('<b>Max. wind:</b> <span class="speed-of-wind">' + wind +'</span> <span class="wind-symbol"> mph </span> <button class="btn btn-xs btn-warning">KPH</button>').on('click', '.btn-warning', function() {
				
				let speed = $('#current-forecast .wind .wind-symbol').html();
	
				let mph = speed.match(/M/i);
				
				let kph = speed.match(/K/i);
				
			// if speed of wind is in miles per hour (measurement to convert to on button is kilometers per hour), set speed to kilometers per hour for current forecast
	
			if (mph !== null) {
				
				 $('#current-forecast .wind .speed-of-wind ').html(windKPH);
				 
				  $('#current-forecast .wind .wind-symbol').html('kph');
				  
				 $('#current-forecast .wind .btn-warning ').html('MPH');
		
			}
			
			// if speed of wind is in kilometers per hour (measurement to convert to on button is miles per hour), set speed to miles per hour for current forecast
			
			else if (kph !== null) {
				
				$('#current-forecast .wind .speed-of-wind ').html(wind);
				
		 		 $('#current-forecast .wind .wind-symbol').html('mph');
		 		 
		 		$('#current-forecast .wind .btn-warning ').html('KPH');
			}
					
		});
		
		$('#current-forecast .humidity').html('<b>Avg. humidity:</b> ' + humidity +'%');

		// select week forecast data (day1)

		let date = data.forecast.forecastday[1].date;
		
		let day1 = getDay(date);
		
		let month1 = date.slice(5,7);
		
		let dayOfMonth1 = date.slice(8, date.length);
		
		let monthAndDay1 = getStringDate(month1,dayOfMonth1);
		
		let day1Weather = data.forecast.forecastday[1].day.condition.text;
		
		let day1High = data.forecast.forecastday[1].day.maxtemp_f;
		
		let day1HighC =  data.forecast.forecastday[1].day.maxtemp_c;
		
		let day1Low = data.forecast.forecastday[1].day.mintemp_f;
		
		let day1LowC =  data.forecast.forecastday[1].day.mintemp_c;
		
		let day1Precip = data.forecast.forecastday[1].day.totalprecip_in;
		
		let day1PrecipMM = data.forecast.forecastday[1].day.totalprecip_mm;
		
		let day1Wind = data.forecast.forecastday[1].day.maxwind_mph;
		
		let day1WindKPH = data.forecast.forecastday[1].day.maxwind_kph;
		
		let day1Humidity = data.forecast.forecastday[1].day.avghumidity;
		
		let day1Temp = data.forecast.forecastday[1].day.avgtemp_f;
		
		let day1Icon = "https:" + data.forecast.forecastday[1].day.condition.icon;

		$('#day1 .current-day').html('<a href="#" data-toggle="popover" data-placement="top" data-trigger="click" title="'+ day1+ ',  ' + monthAndDay1 +'" data-html="true" data-content="<div style=\'color:black; \'> <p> <b> Weather condition: </b>'+day1Weather+  '</p><p> <span><b> High:</b> <span class=\'temp-high\'>' + day1High+  '</span>' + ' <span class=\'temp-symbol\'> °F  </span>' +'</span> <span> <b>Low:</b> '+ '<span class=\'temp-low \'>'+day1Low+ ' </span>' + '<span class=\'temp-symbol\'> °F </span>' + '</p>' + ' <p> <b>Total precip. :</b> <span class=\'precipitation\'>'+day1Precip+'</span> <span class=\'precip-symbol\'> in. </span></p> <p> <b>Max. wind: </b> <span class=\'speed-of-wind\'>'+day1Wind+'</span> <span class=\'wind-symbol \'> mph </span> </p> <p> <b>Avg. humidity:</b> '+day1Humidity+'% </p> <button class=\'btn btn-sm btn-danger\' > °C </button> <button class=\'btn btn-sm btn-success\' > Mm </button> <button class=\' btn btn-sm btn-warning \'> KPH </button> </div> ">' + day1 + ', '+ monthAndDay1 + '</a>' ).on('click', '.btn-danger', function() {
			
			let degrees = $('#day1 .current-day .temp-symbol').html();

			degreesF = degrees.match(/F/);
			
			degreesC = degrees.match(/C/);
			
			// if degrees are in Fahrenheit (measurement to convert to on button is Celsius), set degrees to Celsius for forecast of day 1
			
			if (degreesF !== null) {
			
				$('#day1 .current-day .temp-high').html(day1HighC);
				
				$('#day1 .current-day .temp-low').html(day1LowC);
				
				$('#day1 .current-day .temp-symbol').html(' °C ');
				
				$('#day1 .current-day .btn-danger').html(' °F');
		
		
			}
			
			// if degrees are in Celsius (measurement to convert to on button is Fahrenheit), set degrees to Fahrenheit for forecast of day 1
			
			else if (degreesC !== null) {
			
				$('#day1 .current-day .temp-high').html(day1High);
				
				$('#day1 .current-day .temp-low').html(day1Low);
				
				$('#day1 .current-day .temp-symbol').html(' °F');
				
				$('#day1 .current-day .btn-danger').html(' °C');
		
			}
			
		}).on('click', '.btn-success', function() {
			
			let precipitation = $('#day1 .current-day .precip-symbol').html();
	
			let inches = precipitation.match(/n/);
			
			let mm = precipitation.match(/m/);
			
			// if precipitation is in inches (measurement to convert to on button is millimeters), set precipitation to millimeters for forecast of day 1
	
			if (inches !== null) {
			
				 $('#day1 .current-day .precipitation ').html(day1PrecipMM);
				 
				  $('#day1 .current-day .precip-symbol').html('mm.');
				  
				 $('#day1 .current-day .btn-success ').html('In.');
		
			}
			
			// if precipitation is in millimeters (measurement to convert to on button is inches), set precipitation to inches for forecast of day 1
			
			else if (mm !== null) {
				
				$('#day1 .current-day .precipitation ').html(day1Precip);
				
				$('#day1 .current-day .precip-symbol').html('in.');
				
				$('#day1 .current-day .btn-success ').html('Mm.');
			}
			
		}).on('click', '.btn-warning', function() {
			
			let speed = $('#day1 .current-day .wind-symbol').html();
	
			let mph = speed.match(/M/i);
			
			let kph = speed.match(/K/i);
			
			// if speed of wind is in miles per hour (measurement to convert to on button is kilometers per hour), set speed to kilometers per hour for forecast of day 1
	
			if (mph !== null) {
		
				 $('#day1 .current-day .speed-of-wind ').html(day1WindKPH);
				 
				$('#day1 .current-day .wind-symbol').html('kph');
				
				 $('#day1 .current-day .btn-warning ').html('MPH');
			}
			
			// if speed of wind is in kilometers per hour (measurement to convert to on button is miles per hour), set speed to miles per hour for forecast of day 1
			
			else if (kph !== null) {
				
				$('#day1 .current-day .speed-of-wind ').html(day1Wind);
				
				$('#day1 .current-day .wind-symbol').html('mph');
				
				$('#day1 .current-day .btn-warning ').html('KPH');
			}
			
		}).find('[data-toggle="popover"]').popover();
 
		$('#day1 .condition-description ').html('<img src="'+day1Icon+'" width="25" alt="'+day1Weather+'" /></span>');
		
		$('#day1 .high').html('<span class="temp-high">'+day1High + '</span>' + '<span class="temp-symbol"> °F / </span>');
		
		$('#day1 .low').html('<span class="temp-low">'+day1Low + '</span>' + '<span class="temp-symbol"> °F </span>');
		
		$('#day1 .precip').html('Total precip.: ' + day1Precip + ' in. ');
		
		$('#day1 .wind').html('Max. wind: ' + day1Wind +'mph');
		
		$('#day1 .humidity').html('Avg. humidity: ' + day1Humidity +'%');

		// select week forecast data (day2)

		let date2 = data.forecast.forecastday[2].date
		
		let day2 = getDay(date2);
		
		let month2 = date2.slice(5,7);
		
		let dayOfMonth2 = date2.slice(8, date2.length);
		
		let monthAndDay2 = getStringDate(month2,dayOfMonth2);
		
		let day2Weather = data.forecast.forecastday[2].day.condition.text;
		
		let day2High = data.forecast.forecastday[2].day.maxtemp_f;
		
		let day2HighC = data.forecast.forecastday[2].day.maxtemp_c;
		
		let day2Low = data.forecast.forecastday[2].day.mintemp_f;
		
		let day2LowC = data.forecast.forecastday[2].day.mintemp_c;
		
		let day2Precip = data.forecast.forecastday[2].day.totalprecip_in;
		
		let day2PrecipMM = data.forecast.forecastday[2].day.totalprecip_mm;
		
		let day2Wind = data.forecast.forecastday[2].day.maxwind_mph;
		
		let day2WindKPH = data.forecast.forecastday[2].day.maxwind_kph;
		
		let day2Humidity = data.forecast.forecastday[2].day.avghumidity;
		
		let day2Temp = data.forecast.forecastday[2].day.avgtemp_f;
		
		let day2Icon = "https:" + data.forecast.forecastday[2].day.condition.icon;
		
		$('#day2 .current-day').html('<a href="#" data-toggle="popover" data-placement="top" data-trigger="click" title="'+ day2+ ',  ' + monthAndDay2 +'" data-html="true" data-content="<div style=\'color:black; \'> <p> <b> Weather condition: </b>'+day2Weather+  '</p><p> <span><b> High:</b> <span class=\'temp-high\'>' + day2High+ '</span>' + ' <span class=\'temp-symbol\'>°F  </span>' +'</span> <span> <b>Low:</b> '+ '<span class=\'temp-low \'>'+day2Low+' </span>' + ' <span class=\'temp-symbol\'> °F </span>' + '</p>' + ' <p> <b>Total precip. :</b> <span class=\'precipitation\'>'+day2Precip+'</span> <span class=\'precip-symbol\'> in. </span></p> <p> <b>Max. wind: </b> <span class=\'speed-of-wind\'>'+day2Wind+'</span> <span class=\'wind-symbol \'> mph </span> </p> <p> <b>Avg. humidity:</b> '+day2Humidity+'% </p> <button class=\'btn btn-sm btn-danger\' > °C </button> <button class=\'btn btn-sm btn-success\' > Mm </button> <button class=\' btn btn-sm btn-warning \'> KPH </button> </div> ">' + day2 + ', '+ monthAndDay2 + '</a>').on('click', '.btn-danger', function() {
	
			let degrees = $('#day2 .current-day .temp-symbol').html();
			
			degreesF = degrees.match(/F/);
			
			degreesC = degrees.match(/C/);
			
			// if degrees are in Fahrenheit (measurement to convert to on button is Celsius), set degrees to Celsius for forecast of day 2
			
			if (degreesF !== null) {
				
				$('#day2 .current-day .temp-high').html(day2HighC);
				
				$('#day2 .current-day .temp-low').html(day2LowC);
				
				$('#day2 .current-day .temp-symbol').html(' °C ');
				
				$('#day2 .current-day .btn-danger').html(' °F');
			
			}
			
			// if degrees are in Celsius (measurement to convert to on button is Fahrenheit), set degrees to Fahrenheit for forecast of day 2
			
			else if (degreesC !== null) {
				
				$('#day2 .current-day .temp-high').html(day2High);
				
				$('#day2 .current-day .temp-low').html(day2Low);
				
				$('#day2 .current-day .temp-symbol').html(' °F');
				
				$('#day2 .current-day .btn-danger').html(' °C');
				
			}
			
		}).on('click', '.btn-success', function() {
			
			let precipitation = $('#day2 .current-day .precip-symbol').html();
	
			let inches = precipitation.match(/n/);
			
			let mm = precipitation.match(/m/);
			
			// if precipitation is in inches (measurement to convert to on button is millimeters), set precipitation to millimeters for forecast of day 2
	
			if (inches !== null) {
		
				 $('#day2 .current-day .precipitation ').html(day2PrecipMM);
				 
				  $('#day2 .current-day .precip-symbol').html('mm.');
				  
				 $('#day2 .current-day .btn-success ').html('In.');
		
			}
			
			// if precipitation is in millimeters (measurement to convert to on button is inches), set precipitation to inches for forecast of day 2
			
			else if (mm !== null) {
				
				$('#day2 .current-day .precipitation ').html(day2Precip);
				
				  $('#day2 .current-day .precip-symbol').html('in.');
				  
				 $('#day2 .current-day .btn-success ').html('Mm.');
			}
			
		}).on('click', '.btn-warning', function() {
			
			let speed = $('#day2 .current-day .wind-symbol').html();
			
			let mph = speed.match(/M/i);
			
			let kph = speed.match(/K/i);
			
			// if speed of wind is in miles per hour (measurement to convert to on button is kilometers per hour), set speed to kilometers per hour for forecast of day 2
	
			if (mph !== null) {
				
				 $('#day2 .current-day .speed-of-wind ').html(day2WindKPH);
				 
				  $('#day2 .current-day .wind-symbol').html('kph');
				  
				 $('#day2 .current-day .btn-warning ').html('MPH');
		
			}
			
			// if speed of wind is in kilometers per hour (measurement to convert to on button is miles per hour), set speed to miles per hour for forecast of day 2
			
			else if (kph !== null) {
			
				$('#day2 .current-day .speed-of-wind ').html(day2Wind);
				
				  $('#day2 .current-day .wind-symbol').html('mph');
				  
				 $('#day2 .current-day .btn-warning ').html('KPH');
				 
			}
			
		}).find('[data-toggle="popover"]').popover();
		
		$('#day2 .condition-description').html('<img src="'+day2Icon+'" width="25" alt="'+day2Weather+'" />');
		
		$('#day2 .high').html('<span class="temp-high">'+day2High + '</span>' + ' <span class="temp-symbol"> °F /</span>');
		
		$('#day2 .low').html('<span class="temp-low">'+day2Low + '</span>' + ' <span class="temp-symbol"> °F</span>');
		
		$('#day2 .precip').html('Total precip.: ' + day2Precip + ' in. ');
		
		$('#day2 .wind').html('Max. wind: ' + day2Wind +'mph');
		
		$('#day2 .humidity').html('Avg. humidity: ' + day2Humidity +'%');

		// select week forecast data (day3)
		
		let date3 = data.forecast.forecastday[3].date;
		
		let day3 = getDay(date3);
		
		let month3 = date3.slice(5,7);
		
		let dayOfMonth3 = date3.slice(8, date3.length);
		
		let monthAndDay3 = getStringDate(month3,dayOfMonth3);
		
		let day3Weather = data.forecast.forecastday[3].day.condition.text;
		
		let day3High = data.forecast.forecastday[3].day.maxtemp_f;
		
		let day3HighC = data.forecast.forecastday[3].day.maxtemp_c;
		
		let day3Low = data.forecast.forecastday[3].day.mintemp_f;
		
		let day3LowC = data.forecast.forecastday[3].day.mintemp_c;
		
		let day3Precip = data.forecast.forecastday[3].day.totalprecip_in;
		
		let day3PrecipMM = data.forecast.forecastday[3].day.totalprecip_mm;
		
		let day3Wind = data.forecast.forecastday[3].day.maxwind_mph;
		
		let day3WindKPH = data.forecast.forecastday[3].day.maxwind_kph;
		
		let day3Humidity = data.forecast.forecastday[3].day.avghumidity;
		
		let day3Temp = data.forecast.forecastday[3].day.avgtemp_f;
		
		let day3Icon = "https:" + data.forecast.forecastday[3].day.condition.icon;
		
		$('#day3 .current-day').html('<a href="#" data-toggle="popover" data-placement="top" data-trigger="click" title="'+ day3+ ',  ' + monthAndDay3 +'" data-html="true" data-content="<div style=\'color:black; \'> <p> <b> Weather condition: </b>'+day3Weather+  '</p><p> <span><b> High:</b> <span class=\'temp-high\'>' + day3High+ '</span>' + ' <span class=\'temp-symbol\'>°F  </span>' +'</span> <span> <b>Low:</b> '+ '<span class=\'temp-low \'>'+day3Low+' </span>' + ' <span class=\'temp-symbol\'> °F </span>' + '</p>' + ' <p> <b>Total precip. :</b> <span class=\'precipitation\'>'+day3Precip+'</span> <span class=\'precip-symbol\'> in. </span></p> <p> <b>Max. wind: </b> <span class=\'speed-of-wind\'>'+day3Wind+'</span> <span class=\'wind-symbol \'> mph </span> </p> <p> <b>Avg. humidity:</b> '+day3Humidity+'% </p> <button class=\'btn btn-sm btn-danger\' > °C </button> <button class=\'btn btn-sm btn-success\' > Mm </button> <button class=\' btn btn-sm btn-warning \'> KPH </button> </div> ">' + day3 + ', '+ monthAndDay3 + '</a>').on('click', '.btn-danger', function() {
	
			 let degrees = $('#day3 .current-day .temp-symbol').html();

			degreesF = degrees.match(/F/);
			
			degreesC = degrees.match(/C/);
			
			// if degrees are in Fahrenheit (measurement to convert to on button is Celsius), set degrees to Celsius for forecast of day 3
			
			if (degreesF !== null) {
		
				$('#day3 .current-day .temp-high').html(day3HighC);
				
				$('#day3 .current-day .temp-low').html(day3LowC);
				
				$('#day3 .current-day .temp-symbol').html(' °C ');
				
				$('#day3 .current-day .btn-danger').html(' °F');
		
		
			}
			
			// if degrees are in Celsius (measurement to convert to on button is Fahrenheit), set degrees to Fahrenheit for forecast of day 3
			
			else if (degreesC !== null) {
			
				$('#day3 .current-day .temp-high').html(day3High);
				
				$('#day3 .current-day .temp-low').html(day3Low);
				
				$('#day3 .current-day .temp-symbol').html(' °F');
				
				$('#day3 .current-day .btn-danger').html(' °C');
		
			}
			
		}).on('click', '.btn-success', function() {
		
			let precipitation = $('#day3 .current-day .precip-symbol').html();
	
			let inches = precipitation.match(/n/);
			
			let mm = precipitation.match(/m/);
			
			// if precipitation is in inches (measurement to convert to on button is millimeters), set precipitation to millimeters for forecast of day 3

			if (inches !== null) {
				 
				 $('#day3 .current-day .precipitation ').html(day3PrecipMM);
				 
				  $('#day3 .current-day .precip-symbol').html('mm.');
				  
				 $('#day3 .current-day .btn-success ').html('In.');

			}
			
			// if precipitation is in millimeters (measurement to convert to on button is inches), set precipitation to inches for forecast of day 3
			
			else if (mm !== null) {
				
				$('#day3 .current-day .precipitation ').html(day3Precip);
				
				  $('#day3 .current-day .precip-symbol').html('in.');
				  
				 $('#day3 .current-day .btn-success ').html('Mm.');
				 
			}
			
		}).on('click', '.btn-warning', function() {
		
			let speed = $('#day3 .current-day .wind-symbol').html();
			
			let mph = speed.match(/M/i);
			
			let kph = speed.match(/K/i);
			
			// if speed of wind is in miles per hour (measurement to convert to on button is kilometers per hour), set speed to kilometers per hour for forecast of day 3
	
			if (mph !== null) {
				
				 $('#day3 .current-day .speed-of-wind ').html(day3WindKPH);
				 
				  $('#day3 .current-day .wind-symbol').html('kph');
				  
				 $('#day3 .current-day .btn-warning ').html('MPH');
		
			}
			
			// if speed of wind is in kilometers per hour (measurement to convert to on button is miles per hour), set speed to miles per hour for forecast of day 3
			
			else if (kph !== null) {
				
				$('#day3 .current-day .speed-of-wind ').html(day3Wind);
				
				  $('#day3 .current-day .wind-symbol').html('mph');
				  
				 $('#day3 .current-day .btn-warning ').html('KPH');
			}
			
		}).find('[data-toggle="popover"]').popover();

		$('#day3 .condition-description').html('<img src="'+day3Icon+'" width="25" alt="'+day3Weather+'" />');
		
		$('#day3 .high').html('<span class="temp-high">'+day3High +'</span> <span class="temp-symbol"> °F / </span>');
		
		$('#day3 .low').html('<span class="temp-low">'+day3Low + '</span>  <span class="temp-symbol"> °F </span>');
		
		$('#day3 .precip').html('Total precip.: ' + day3Precip + ' in. ');
		
		$('#day3 .wind').html('Max. wind: ' + day3Wind +'mph');
		
		$('#day3 .humidity').html('Avg. humidity: ' + day3Humidity +'%');

		// select week forecast data (day4)
		
		let date4 = data.forecast.forecastday[4].date;
		
		let day4 = getDay(date4);
		
		let month4 = date4.slice(5,7);
		
		let dayOfMonth4 = date4.slice(8, date4.length);
		
		let monthAndDay4 = getStringDate(month4,dayOfMonth4);
		
		let day4Weather = data.forecast.forecastday[4].day.condition.text;
		
		let day4High = data.forecast.forecastday[4].day.maxtemp_f;
		
		let day4HighC = data.forecast.forecastday[4].day.maxtemp_c;
		
		let day4Low = data.forecast.forecastday[4].day.mintemp_f;
		
		let day4LowC = data.forecast.forecastday[4].day.mintemp_c;
		
		let day4Precip = data.forecast.forecastday[4].day.totalprecip_in;
		
		let day4PrecipMM = data.forecast.forecastday[4].day.totalprecip_mm;
		
		let day4Wind = data.forecast.forecastday[4].day.maxwind_mph;
		
		let day4WindKPH = data.forecast.forecastday[4].day.maxwind_kph;
		
		let day4Humidity = data.forecast.forecastday[4].day.avghumidity;
		
		let day4Temp = data.forecast.forecastday[4].day.avgtemp_f;
		
		let day4Icon = "https:" + data.forecast.forecastday[4].day.condition.icon;
		
		$('#day4 .current-day').html('<a href="#" data-toggle="popover" data-placement="top" data-trigger="click" title="'+ day4+ ',  ' + monthAndDay4 +'" data-html="true" data-content="<div style=\'color:black; \'> <p> <b> Weather condition: </b>'+day4Weather+  '</p><p> <span><b> High:</b> <span class=\'temp-high\'>' + day4High+ '</span>' + ' <span class=\'temp-symbol\'>°F </span>' +'</span> <span> <b>Low:</b> '+ '<span class=\'temp-low \'>'+day4Low+' </span>' + ' <span class=\'temp-symbol\'> °F </span>' + '</p>' + ' <p> <b>Total precip. :</b> <span class=\'precipitation\'>'+day4Precip+'</span> <span class=\'precip-symbol\'> in. </span></p> <p> <b>Max. wind: </b> <span class=\'speed-of-wind\'>'+day4Wind+'</span> <span class=\'wind-symbol \'> mph </span> </p> <p> <b>Avg. humidity:</b> '+day4Humidity+'% </p> <button class=\'btn btn-sm btn-danger\' > °C </button> <button class=\'btn btn-sm btn-success\' > Mm </button> <button class=\' btn btn-sm btn-warning \'> KPH </button> </div> ">' + day4 + ', '+ monthAndDay4 + '</a>').on('click', '.btn-danger', function() {
			
			let degrees = $('#day4 .current-day .temp-symbol').html();
			
			degreesF = degrees.match(/F/);
			
			degreesC = degrees.match(/C/);
			
			// if degrees are in Fahrenheit (measurement to convert to on button is Celsius), set degrees to Celsius for forecast of day 4
			
			if (degreesF !== null) {
			
				$('#day4 .current-day .temp-high').html(day4HighC);
				
				$('#day4 .current-day .temp-low').html(day4LowC);
				
				$('#day4 .current-day .temp-symbol').html(' °C ');
				
				$('#day4 .current-day .btn-danger').html(' °F');
			}
			
			// if degrees are in Celsius (measurement to convert to on button is Fahrenheit), set degrees to Fahrenheit for forecast of day 4
			
			else if (degreesC !== null) {
			
				$('#day4 .current-day .temp-high').html(day4High);
				
				$('#day4 .current-day .temp-low').html(day4Low);
				
				$('#day4 .current-day .temp-symbol').html(' °F');
				
				$('#day4 .current-day .btn-danger').html(' °C');
			}
			
		}).on('click', '.btn-success', function() {
		
				let precipitation = $('#day4 .current-day .precip-symbol').html();
				
				let inches = precipitation.match(/n/);
				
				let mm = precipitation.match(/m/);
				
				// if precipitation is in inches (measurement to convert to on button is millimeters), set precipitation to millimeters for forecast of day 4
	
				if (inches !== null) {
		
					 $('#day4 .current-day .precipitation ').html(day4PrecipMM);
					 
					  $('#day4 .current-day .precip-symbol').html('mm.');
					  
					 $('#day4 .current-day .btn-success ').html('In.');
		
				}
				
				// if precipitation is in millimeters (measurement to convert to on button is inches), set precipitation to inches for forecast of day 4
				
				else if (mm !== null) {
					
					$('#day4 .current-day .precipitation ').html(day4Precip);
					
					$('#day4 .current-day .precip-symbol').html('in.');
					
					 $('#day4 .current-day .btn-success ').html('Mm.');
				}
				
			}).on('click', '.btn-warning', function() {
			
				let speed = $('#day4 .current-day .wind-symbol').html();
				
				let mph = speed.match(/M/i);
				
				let kph = speed.match(/K/i);
				
				// if speed of wind is in miles per hour (measurement to convert to on button is kilometers per hour), set speed to kilometers per hour for forecast of day 4
	
				if (mph !== null) {
				
					 $('#day4 .current-day .speed-of-wind ').html(day4WindKPH);
					 
					  $('#day4 .current-day .wind-symbol').html('kph');
					  
					 $('#day4 .current-day .btn-warning ').html('MPH');
		
				}
				
				// if speed of wind is in kilometers per hour (measurement to convert to on button is miles per hour), set speed to miles per hour for forecast of day 4
				
				else if (kph !== null) {
					
					$('#day4 .current-day .speed-of-wind ').html(day4Wind);
					
					$('#day4 .current-day .wind-symbol').html('mph');
					
					$('#day4 .current-day .btn-warning ').html('KPH');
				}
				
			}).find('[data-toggle="popover"]').popover();

			$('#day4 .condition-description').html( '<img src="'+day4Icon+'" width="25" alt="'+day4Weather+'" />');
			
			$('#day4 .high').html('<span class="temp-high">'+day4High + ' </span> <span class="temp-symbol"> °F / </span>');
			
			$('#day4 .low').html('<span class="temp-low">'+day4Low + ' </span> <span class="temp-symbol"> °F </span>');
			
			$('#day4 .precip').html('Total precip.: ' + day4Precip + ' in. ');
			
			$('#day4 .wind').html('Max. wind: ' + day4Wind +'mph');
			
			$('#day4 .humidity').html('Avg. humidity: ' + day4Humidity +'%');

			// select week forecast data (day5)

			let date5 = data.forecast.forecastday[5].date;
			
			let day5 = getDay(date5);
			
			let month5 = date5.slice(5,7);
			
			let dayOfMonth5 = date5.slice(8, date5.length);
			
			let monthAndDay5 = getStringDate(month5,dayOfMonth5);
			
			let day5Weather = data.forecast.forecastday[5].day.condition.text;
			
			let day5High = data.forecast.forecastday[5].day.maxtemp_f;
			
			let day5HighC = data.forecast.forecastday[5].day.maxtemp_c;
			
			let day5Low = data.forecast.forecastday[5].day.mintemp_f;
			
			let day5LowC = data.forecast.forecastday[5].day.mintemp_c;
			
			let day5Precip = data.forecast.forecastday[5].day.totalprecip_in;
			
			let day5PrecipMM = data.forecast.forecastday[5].day.totalprecip_mm;
			
			let day5Wind = data.forecast.forecastday[5].day.maxwind_mph;
			
			let day5WindKPH = data.forecast.forecastday[5].day.maxwind_kph;
			
			let day5Humidity = data.forecast.forecastday[5].day.avghumidity;
			
			let day5Temp = data.forecast.forecastday[5].day.avgtemp_f;
			
			let day5Icon =  "https:" + data.forecast.forecastday[5].day.condition.icon;
			
			$('#day5 .current-day').html('<a href="#" data-toggle="popover" data-placement="top" data-trigger="click" title="'+ day5+ ',  ' + monthAndDay5 +'" data-html="true" data-content="<div style=\'color:black; \'> <p> <b> Weather condition: </b>'+day5Weather+  '</p><p> <span><b> High:</b> <span class=\'temp-high\'>' + day5High+ '</span>' + ' <span class=\'temp-symbol\'> °F  </span>' +'</span> <span> <b>Low:</b> '+ '<span class=\'temp-low \'>'+day5Low+' </span>' + ' <span class=\'temp-symbol\'> °F </span>' + '</p>' + ' <p> <b>Total precip. :</b> <span class=\'precipitation\'>'+day5Precip+'</span> <span class=\'precip-symbol\'> in. </span></p> <p> <b>Max. wind: </b> <span class=\'speed-of-wind\'>'+day5Wind+'</span> <span class=\'wind-symbol \'> mph </span> </p> <p> <b>Avg. humidity:</b> '+day5Humidity+'% </p> <button class=\'btn btn-sm btn-danger\' > °C </button> <button class=\'btn btn-sm btn-success\' > Mm </button> <button class=\' btn btn-sm btn-warning \'> KPH </button> </div> ">' + day5 + ', '+ monthAndDay5 + '</a>').on('click', '.btn-danger', function() {
	
				let degrees = $('#day5 .current-day .temp-symbol').html();
				
				degreesF = degrees.match(/F/);
				
				degreesC = degrees.match(/C/);
				
				// if degrees are in Fahrenheit (measurement to convert to on button is Celsius), set degrees to Celsius for forecast of day 5
				
				if (degreesF !== null) {
				
					$('#day5 .current-day .temp-high').html(day5HighC);
					
					$('#day5 .current-day .temp-low').html(day5LowC);
					
					$('#day5 .current-day .temp-symbol').html(' °C ');
					
					$('#day5 .current-day .btn-danger').html(' °F');
		
				}
				
				// if degrees are in Celsius (measurement to convert to on button is Fahrenheit), set degrees to Fahrenheit for forecast of day 5
				
				else if (degreesC !== null) {
				
					$('#day5 .current-day .temp-high').html(day5High);
					
					$('#day5 .current-day .temp-low').html(day5Low);
					
					$('#day5 .current-day .temp-symbol').html(' °F');
					
					$('#day5 .current-day .btn-danger').html(' °C');
	
				}
				
			}).on('click', '.btn-success', function() {
			
				let precipitation = $('#day5 .current-day .precip-symbol').html();
	
				let inches = precipitation.match(/n/);
				
				let mm = precipitation.match(/m/);
				
				// if precipitation is in inches (measurement to convert to on button is millimeters), set precipitation to millimeters for forecast of day 5
	
				if (inches !== null) {

					 $('#day5 .current-day .precipitation ').html(day5PrecipMM);
					 
					  $('#day5 .current-day .precip-symbol').html('mm.');
					  
					 $('#day5 .current-day .btn-success ').html('In.');

				}
				
				// if precipitation is in millimeters (measurement to convert to on button is inches), set precipitation to inches for forecast of day 5
				
				else if (mm !== null) {
				
					$('#day5 .current-day .precipitation ').html(day5Precip);
					
					$('#day5 .current-day .precip-symbol').html('in.');
					
					 $('#day5 .current-day .btn-success ').html('Mm.');
				}
				
			}).on('click', '.btn-warning', function() {
			
				let speed = $('#day5 .current-day .wind-symbol').html();
				
				let mph = speed.match(/M/i);
				
				let kph = speed.match(/K/i);
				
				// if speed of wind is in miles per hour (measurement to convert to on button is kilometers per hour), set speed to kilometers per hour for forecast of day 5
	
				if (mph !== null) {
					
					 $('#day5 .current-day .speed-of-wind ').html(day5WindKPH);
					 
					  $('#day5 .current-day .wind-symbol').html('kph');
					  
					 $('#day5 .current-day .btn-warning ').html('MPH');

				}
				
				// if speed of wind is in kilometers per hour (measurement to convert to on button is miles per hour), set speed to miles per hour for forecast of day 5
				
				else if (kph !== null) {
					
					$('#day5 .current-day .speed-of-wind ').html(day5Wind);
					
					$('#day5 .current-day .wind-symbol').html('mph');
					
					$('#day5 .current-day .btn-warning ').html('KPH');
				
				}
				
			}).find('[data-toggle="popover"]').popover();

			$('#day5 .condition-description').html('<img src="'+day5Icon+'" width="25" alt="'+day5Weather+'" />');
			
			$('#day5 .high').html('<span class="temp-high">'+day5High +'</span> <span class="temp-symbol"> °F / </span>');
			
			$('#day5 .low').html('<span class="temp-low">'+day5Low + '</span> <span class="temp-symbol"> °F </span>');
			
			$('#day5 .precip').html('Total precip.: ' + day5Precip + ' in. ');
			
			$('#day5 .wind').html('Max. wind: ' + day5Wind +'mph');
			
			$('#day5 .humidity').html('Avg. humidity: ' + day5Humidity +'%');
			
			$('.current-day a').click(function(e) {
	
				e.preventDefault();
				
			});

		}); // end of $.getJSON()

	} // end of getWeatherData()