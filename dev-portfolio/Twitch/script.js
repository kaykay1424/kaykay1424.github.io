/*
	Explanation of program:
	
	Once the page loads, if there are no Twitch channels saved in the browser's local storage,
	the user will be prompted to add one by entering the name of the channel in the search box.
	If that channel does not exist, does not have a subscription program, or an error occurs,
	an alert message will be displayed informing the user of the issue so that the user can 
	try again to add a channel. If there is no error and the channel exists it will be added
	to the local storage and the home screen will be shown displaying the number of channels
	saved along with which ones are online and which are offline. The user can click on the channel
	name to go to that channel's page in a new window. When the user clicks on the online 
	button, only the online channels will be shown. If the user clicks on the program name currently
	being streamed by that channel, that video will appear on the tv screen. If a user 
	hovers over the channel row it will display more information about the current program 
	being streamed. 
	
	If a user wants to find a specific channel they can click on the search
	button and search by the channel name or number. If the number or channel they enter
	doesn't exist there will be an alert message telling them what went wrong.
	
	If the user hovers on the remote they can select channels by using the down and up arrow keys
	and can either watch the program's video (if on the online screen) by clicking on the watch
	button on the remote or go to that channel's page by clicking the enter button on the remote.
	
*/	

	$(document).ready(function() {
	
		fetchChannels();
	
	}); //end of document.ready()
	
	let counter1 = -1;
		
	let channelArray = '';

	$('[data-toggle="popover"]').popover(); 
	
	$('#online').click(fetchOnlineChannels);
		
	$('#home').click(fetchChannels);
	
	$('#twitch').click(function() {
		 
		showRegularTv();
		
		$('#channel-header').html('<th>Channel</th>' + '<th>Program</th>'+ '<th>Stream</th>' );	

		$('#current-channel-content').html(
		
		'<form id="twitch-form">' +
		
			'<label for="twitch-channel">Search for Twitch channels</label>'+
			
			'<input  class="form-control" id="twitch-channel" type="text">'+ '</br>'+
		
			'<button class="btn btn-info" type="submit">Submit</button>' +
		
		  '</form>');
		
		  $('#twitch-channel').focus();
		
		  $('#twitch-form').submit(saveChannel);
            
  	}); // end of $('#twitch').click()
	
	$('#search').click(searchFunction);
	
	$('#enter').click(function() {
	
		let thisNumber = channelArray[counter1];

		let thisName = $('#' + thisNumber).siblings('a').html();

		let link = $('#' + thisName).find('a').attr('href');

		$('#enter').parent().attr('href', link);

	}); // end of $('#enter').click()
		
	$('#watch').click(function() {
				
		let thisNumber = channelArray[counter1];
		
		let	thisName = $('#' + thisNumber).siblings('a').html();	
		
		let thisStream = $('#'+ thisName).find('.stream').html();
		
		if (thisStream === undefined) {
			
			thisStream = $('#'+ thisName).find('.schedule').html();
		
		}
		
		let match = thisStream.match(/Offline/);
	
		let counter = 0;
		
		if (match !== null) {
			
			counter++;
			
			if (counter > 0) {
			
				alert(thisName + ' is not currently streaming.');
			
			}
		
		}
		
		else {

			showProgram(thisName);

		}

	}); // end of $('#watch').click()
	
	$('#delete').click(function() {
	
		let thisNumber = channelArray[counter1];
		
		let thisName = $('#' + thisNumber).siblings('a').html();
		
		deleteChannel(thisName);
	
	}); // end of $('#delete').click()
	
	$('body').keyup(function(key) {
			
			if (counter1 === channelArray.length || counter1 < -1) {
		
				counter1 = -1;
			
			}
		
			if (key.which === 40) {
				
				counter1++;

				if ($('#remote').is(':hover') === false) {
					
					return false;
				
				}
				
				else {
				
					move_up();
					
					selectedChannel()
	
				} // end of else
				
			} // end of if (key.which === 40)
			
			else if (key.which === 38) {
				
				counter1--;
				
				if ($('#remote').is(':hover') === false) {
				
					return false;
				
				}
				
				else {
				
					move_down();
					
					selectedChannel();
	
				}
				
			} // end of else if (key.which === 38)

	}); // end of $('body').keyup()

	function move_up() {
	
		let trHeight = $('tr').height();
		
		document.getElementById('tv').scrollTop += trHeight * 2;

	}
  
	function move_down() {
		
		let trHeight = $('tr').height();
		
		document.getElementById('tv').scrollTop -= trHeight * 2;

	}

	function getLanguage(code) {
		
		let lang = '';
		
		switch(code) {
		
			case 'ab':
		
				lang = 'Abkhazian';
		
				break;
		
			case 'aa':
		
				lang = 'Afar';
		
				break;
		
			case 'af':
		
				lang = 'Afrikaans';
		
				break;	
		
			case 'ak':
		
				lang = 'Akan';
		
				break;
		
			case 'sq':
		
				lang = 'Albanian';
		
				break;
		
			case 'am':
		
				lang = 'Amharic';
		
				break;
		
			case 'ar':
		
				lang = 'Arabic';
		
				break;
		
			case 'an':
		
				lang = 'Aragonese';
		
				break;
		
			case 'hy':
		
				lang = 'Armenian';
		
				break;
		
			case 'as':
		
				lang = 'Assamese';
		
				break;
		
			case 'av':
		
				lang = 'Avaric';
		
				break;
		
			case 'ae':
		
				lang = 'Avestan';
		
				break;
		
			case 'ay':
		
				lang = 'Aymara';
		
				break;
		
			case 'az':
		
				lang = 'Azerbaijani';
		
				break;
		
			case 'bm':
		
				lang = 'Bambara';
		
				break;
		
			case 'ba':
		
				lang = 'Bashkir';
		
				break;
		
			case 'eu':
		
				lang = 'Basque';
		
				break;
		
			case 'be':
		
				lang = 'Belarusian';
		
				break;
		
			case 'bn':
		
				lang = 'Bengali (Bangla)n';
		
				break;
		
			case 'bh':
		
				lang = 'Bihari';
		
				break;
		
			case 'bi':
		
				lang = 'Bislama';
		
				break;
		
			case 'bs':
		
				lang = 'Bosnian';
		
				break;
		
			case 'bs':
		
				lang = 'Bosnian';
				
				break;
		
			case 'br':
			
				lang = 'Breton';
			
				break;
			
			case 'bg':
			
				lang = 'Bulgarian';
			
				break;
			
			case 'my':
			
				lang = 'Burmese';
			
				break;
			
			case 'ca':
			
				lang = 'Catalan';
			
				break;
			
			case 'ch':
			
				lang = 'Chamorro';
			
				break;
			
			case 'ce':
			
				lang = 'Chechen';
			
				break;
			
			case 'ny':
			
				lang = ['Chichewa', 'Chewa', 'Nyanja'];
			
				for (var i = 0; i < lang.length;i++) {
			
					lang = lang[i];
			
				}
			
				break;
			
			case 'zh':
			
				lang = 'Chinese';
			
				break;
			
			case 'zh-Hans':
			
				lang = 'Chinese (Simplified)';
			
				break;
			
			case 'zh-Hant':
			
				lang = 'Chinese (Traditional)';
			
				break;	
			
			case 'cv':
			
				lang = 'Chuvash';
			
				break;
			
			case 'kw':
			
				lang = 'Cornish';
			
				break;
			
			case 'co':
			
				lang = 'Corsican';
			
				break;
			
			case 'cr':
			
				lang = 'Cree';
			
				break;
			
			case 'hr':
			
				lang = 'Croatian';
			
				break;
			
			case 'cs':
			
				lang = 'Czech';
			
				break;		
			
			case 'da':
			
				lang = 'Danish';
			
				break;	
			
			case 'en':
			
				lang = 'English';
			
				break;
			
			case 'fi':
			
				lang = 'Finnish';
			
				break;
			
			case 'fr':
			
				lang = 'French';
			
				break;
			
			case 'de':
			
				lang = 'German';
			
				break;
			
			case 'el':
			
				lang = 'Greek';
			
				break;
			
			case 'hi':
			
				lang = 'Hindi';
			
				break;
			
			case 'it':
			
				lang = 'Italian';
			
				break;
			
			case 'ja':
			
				lang = 'Japanese';
			
				break;
			
			case 'ko':
			
				lang = 'Korean';
			
				break;
			
			case 'pt':
			
				lang = 'Portuguese';
			
				break;
			
			case 'ru':
			
				lang = 'Russian';
			
				break;
			
			case 'es':
			
				lang = 'Spanish';
			
				break;
			
			case 'sv':
				
				lang = 'Swedish';
			
				break;
				
			default: 
			
				lang = 'N/A';
			
				break;
		
		}
		
		return lang;
		
	} // end of getLanguage()
	
	function getTime(programTime) {
		
		let time = '';
		
		let d = new Date();
		
		let h = d.getHours();
		
		let s = d.getSeconds();
		
		let programMinutes = programTime.slice(14,16);
		
		programMinutes = parseInt(programMinutes);
		
		m = programMinutes;
		
		programTime = programTime.slice(11,13);
		
		programTime= parseInt(programTime);
		
		let timeZoneOffset = d.getTimezoneOffset();
		
		let differenceInHours = timeZoneOffset/60; // difference between local time and UTC time	
		
		// local time zone is behind  UTC time zone 
									
		if (differenceInHours > 0) { 
		
			if ( (programTime - differenceInHours ) < 0) {
		
				let timeDifference = Math.abs(0 - programTime); 
		
				let convertTime = differenceInHours - timeDifference;
		
				h = 24 - convertTime; 
		
			}
		
			else {
			
			h = programTime - differenceInHours;
			
			}
		
		} // end of if (differenceInHours > 0)
		
		// local time zone is same as UTC time zone
		
		else if (differenceInHours === 0) {
			
			h = h;
		
		}
		
		// local time zone is ahead of UTC time zone
		
		else if (differenceInHours < 0) { 
			
			h = programTime + differenceInHours; 
			
		}
		
		if ( h  < 10 && m < 10 ) {
		
			h = "0" + h;
		
			m = "0" + m;
		
			if (h < 12 && h >= 0 ) {

				if ( h === 0 ) {
					
					time = 12 + ":" + m + "am";
				
				}
				
				else {
			 
			 		time = h + ":" + m + "am";
			
				}
			
			} // if (h < 12 && h >= 0 )
			
		} // if ( h  < 10 && m < 10 )
		
		else if ( h  < 10 ) {
			
			if ( h < 10) {
			
				h = "0" + h;
			
			}
			
			if ( m < 10) {
			
				m = "0" + m;
			
			}
			
			if (h < 12 && h >= 0 ) {
		
			 time = h + ":" + m + "am";
		
			}
			
		} // end of else if ( h  < 10 )

		else if (h  >= 12 && h <= 24) {
			 
			 if ( m < 10) {
		
				m = "0" + m;
			}
			
			h -= 12;
			
			time  = h + ":" + m + "pm";
			
		}
	
		return time;
			
	} // end of getTime()
	
	function saveChannel(e) {
		
		e.preventDefault();
		
		let twitchChannel = $('#twitch-channel').val();
		
		twitchChannel = twitchChannel.replace(/\s+/g, '');
		
		$.getJSON('https://wind-bow.gomix.me/twitch-api/users/' +twitchChannel+ '?callback=?', function(data) {
		
			if (data.hasOwnProperty('status')) {
		
				$('#twitch-form')[0].reset();
		
				if (data.status === 404) {
		
					alert('That channel ('+twitchChannel+') could not be found');
		
					return false;
		
				}
		
				else if (data.status === 422) {
		
					alert('The specified channel ('+twitchChannel+') does not have a subscription program');
		
					return false;
		
				}
		
				else  {
		
					alert('An error has occurred. Please try again.');
		
					return false;
		
				}
		
			} // end of if (data.hasOwnProperty('status')) 
		
			else {
		
				let displayName = data.display_name;
		
				let channel = '';

				if ( localStorage.getItem('channels') === null) {
		
					let thisChannel = 0;
		
					channel = {
		
						name: displayName,
						number: thisChannel
					}
					
					let channels = [];	
					
					channels.push(channel);
					
					localStorage.setItem('channels', JSON.stringify(channels));
					
					$('#twitch-form')[0].reset();
					
					fetchChannels();

				}
				
				else {
					
					let channels = JSON.parse(localStorage.getItem('channels'));
					
					for (var j = 0; j < channels.length; j++ ) {
							
						if (channels[j].name.toLowerCase() === twitchChannel.toLowerCase()) {
							
							alert('This channel ('+twitchChannel+') has already been saved');
							
							return false;
				
						}
						
					} // end of loop

				if (channels.length === 0 ) {
					
					let thisChannel = 0;
					
					channel = {
					
						name: displayName,
					
						number: thisChannel
					
						}

					let channels = [];	
				 	
				 	channels.push(channel);
				 	
				 	localStorage.setItem('channels', JSON.stringify(channels));
				  	
				  	$('#twitch-form')[0].reset();
					
					fetchChannels();
					
				}
				
				else { 
			
					let lastNumber = channels[channels.length-1].number;
				
					channel = {
				
						name: displayName,
				
						number: lastNumber+1
				
					}
				
					channels.push(channel);
				
					localStorage.setItem('channels', JSON.stringify(channels));
				
					$('#twitch-form')[0].reset();
				
					fetchChannels();
				
					}
					
				}
	 
			} // end of else
	 
		}); // end of $.getJson()
		
	} // end of saveChannel()
	
	function deleteChannel(name) {
	
		let channels = JSON.parse(localStorage.getItem('channels'));
		
		for (var i = 0; i < channels.length; i++) {

			if (name.match(channels[i].name) !== null) {
				
				let confirmation = confirm('Are you sure you want to delete this channel?');
		
				if (confirmation === true) {
		
					channels.splice(i,1);
		
				}
		
			} // if (channels[i].name == name)
		
		} // for loop
		
		localStorage.setItem('channels', JSON.stringify(channels));
		
		fetchChannels();
		
	} // end of deleteChannel()
	
	function showRegularTv() {
		
		$('#tv').html('<div id="content">'+
		
								'<div id="current-channel" class="container">'+
								
									'<div class="row">' +
									
										'<div class="col-md-4" id="current-channel-img">'+
										
										'</div>'+
										
										'<div class="col-md-8" id="current-channel-content">'+
										
										'</div> '+
										
									'</div>'+
									
								'</div>' +
								
								'<div class="channel-rows">'+
								
								'<table>' +
								
									'<thead>' +
									
										'<tr id="channel-header">'+	
										
										'</tr>'+
										
									'</thead>'+
									
									'<tbody id="add-table-content">'+
								
									'</tbody>'+
									
								'</table>'+
								
								'</div>'+
								
							'</div>'
							
		);
		
		$('#tv').css('background-image','none').removeClass('padding-top');
		
		$('#tv').css('background', 'linear-gradient(white,#780AE8)');
		
		$('#current-channel-content').show();
		
		$('#channel-header').show();
		
		$('#current-channel-img').css({'background-size':'contain'}).show();
		
	} // end of showRegularTv()
	
	function fetchChannels() {
		
		showRegularTv();
		
			let tableContent = document.getElementById('add-table-content');

			if (localStorage.getItem('channels') === null) {
				
				tableContent.innerHTML = '';
				
				$('#current-channel-content').html('<h4 class="title">There are currently no Twitch Channels. Please search for one.</h4>'+
				
				'<form id="twitch-form" onsubmit="">' +
				
				'<input  class="form-control" id="twitch-channel" type="text">'+ '</br>'+
				
				'<button class="btn btn-info" type="submit">Submit</button>' +
				
				'</form>');
				
				$('#twitch-channel').focus();
				
				$('#twitch-form').submit(saveChannel);
					
			}
			
			else if (JSON.parse(localStorage.getItem('channels')).length === 0) {
				
				tableContent.innerHTML = '';
			
				$('#current-channel-content').html('<h4 class="title">There are currently no Twitch Channels. Please search for one.</h4>'+
			
				'<form id="twitch-form" onsubmit="">' +
			
				'<input  class="form-control" id="twitch-channel" type="text">'+ '</br>'+
			
				'<button class="btn btn-info" type="submit">Submit</button>' +
			
				'</form>');
			
				$('#twitch-channel').focus();
			
				$('#twitch-form').submit(saveChannel);

			}
			
			else {
		
				$('#current-channel-content').show();
				
				$('#channel-header').show();
				
				let channels = JSON.parse(localStorage.getItem('channels'));
	
				tableContent.innerHTML = ' ';
			
				let counter = 0;
			
				counter1 = -1;
				
				channelArray = [];
			
				let numberOfOnlineChannels = [];
			
				let numberOfOfflineChannels = [];
			
				let offlineNumberArray = [];
			
				let channelNumberArray = [];
			
				for (var i = 0; i < channels.length; i++ ) {

					let name = channels[i].name;
					
					let channelNumber = channels[i].number;
					
					let status = ' ';
					
					let program = ' ';
					
					let hrefString = 'https://www.twitch.tv/' + name;
					
					if ($('.tv-guide-channels').length < channels.length) {
					
						tableContent.innerHTML += '<tr class="tv-guide-channels" id="'+name+'">' +'<td >' +'<span id ="'+channelNumber+'" class="channel-number">'+channelNumber+'</span>'+ ' ' +'<a target="_blank" href="'+hrefString+'">' +name+' </a>' + ' ' + '<i class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+name+'\')"></i>'+ '</td>' + '<td class="program"> N/A </td>' + '<td class="stream"> Offline </td>' +'</tr>';
					
					} 
					
					let thisNumber = $('#' + name).find('.channel-number').html();
	
					channelArray.push(thisNumber);
		
					$('#channel-header').html('<th>Channel</th>' + '<th>Program</th>'+ '<th>Stream</th>' );
					
					$.getJSON('https://wind-bow.gomix.me/twitch-api/users/' +name+ '?callback=?', function(data) {
				
						if (data.hasOwnProperty('status')) {
					
							if (data.status === 404) {
						
								$('#' + name).find('.program').html('This channel('+name+') no longer exists');
								
								$('#' + name).find('.program').html('N/A');
						
							}
					
						}
						
					}); // end of $.getJSON()
					
					$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + name + '?callback=?', function(data,i) {
			
						if (data.stream === null) {
						
							if (numberOfOfflineChannels.includes(name) === false) {
						
								numberOfOfflineChannels.push(name);
				
							}
							
							if ($('.tv-guide-channels').length < channels.length) {
				
							}
							
						} // end of if (data.stream === null)
						
						else if (data.stream !== null) {
							
							if (numberOfOnlineChannels.includes(name) === false) {
							
								numberOfOnlineChannels.push(name);
							
							}
							
							let language = data.stream.channel.language; 
							
							let gameStatus = data.stream.channel.status;
							
							let viewers = data.stream.channel.viewers;
							
							let views = data.stream.channel.views;
							
							let url = data.stream.channel.url;
							
							let logo = data.stream.preview.medium;

							program = data.stream.channel.game;
							
							$('#' + name).find('.program').html('<a href="#">'+program+'</a>').click(function() {
								
								showProgram(name); 
							
							});
							
							$('#' + name).find('.stream').html('Online <img src="https://www.userlogos.org/files/logos/jumpordie/trakt_01.png" width="30"/>');
						
						}
						
						$('#current-channel-content').html('<h3 class="text-center">TV Guide</h3>'+ '</br>'+ '<ul>'+'<li><b>Channels: </b>' + channels.length + '</li>' + '<li><b> Online Channels: </b>' +'<span class="online-channels">'+ numberOfOnlineChannels.length+ '</span>'+ '</li>' + '<li><b> Offline Channels: </b>' + '<span class="offline-channels">'+numberOfOfflineChannels.length+ '</span>'+'</li>' + '</ul>' );
			 
					}); // end of $.getJSON()
					
				} // end of loop
	
			} // end of else
			
			channelsHover();
			
	} // end of fetchChannels()
	
	function fetchOnlineChannels() {
		
		showRegularTv();
	
		$('#current-channel-content').html('<h3 class="text-center">Online Channels</h3>' + '<p>Hover over the channel with your cursor to view more details about the program. Click on the program to view it on the tv screen or click the the channel name to go their twitch page.' );			
	
		let channels = JSON.parse(localStorage.getItem('channels'));
		
		let tableContent = document.getElementById('add-table-content');
		
		tableContent.innerHTML = ' ';
		
		let numberOfOnlineChannels = [];
		
		let numberOfOfflineChannels = [];
		
		let offlineNumberArray = [];
		
		let channelNumberArray = [];
		
		channelArray = [];
		
		counter1 = -1;
		
		for (var i = 0; i < channels.length; i++ ) {
		
			let name = channels[i].name;
			
			let channelNumber = channels[i].number;
			
			let status = ' ';
			
			let program = ' ';
			
			let hrefString = 'https://www.twitch.tv/' + name;
		
			tableContent.innerHTML += '<tr id="'+name+'" onmouseover="showProgramDetails(\''+name+'\')" >' +'<td >' +'<span class="channel-number" id="'+channelNumber+'">'+channelNumber+'</span>'+ ' ' +'<a target="_blank" href="'+hrefString+'">' + name + '</a>' + ' ' + '<i class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+name+'\')"></i>'+ '</td>' + '<td class="program" onclick="showProgram(\''+name+'\')"></td> <td class="schedule"></td>' +'</tr>';
		
			$('#channel-header').html('<th>Channel</th>' + '<th>Program</th>'+ '<th>Schedule</th>' );
			
			let thisNumber = $('#' + name).find('.channel-number').html();
		
			channelArray.push(thisNumber);
			
			$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + name + '?callback=?', function(data,i) {
			
				if (data.stream === null) {
					
					
					
					let thisNumber = $('#' + name).find('.channel-number').html();
					
					let arrayPosition = channelArray.indexOf(thisNumber);
					
					channelArray.splice(arrayPosition,1);
					
					$('#' + name).remove();
		
					if (numberOfOfflineChannels.includes(name) === false) {
					
						numberOfOfflineChannels.push(name);
	
					}
					
					if (numberOfOfflineChannels.length === channels.length) {
						
						$('#channel-header').html('<h3 class="no-signal">No live streams at this time</h3>');
						
						$('#current-channel-content').html('');
						
						$('#current-channel-img').hide();
						
						$('#tv').css({'z-index':1000,'background-image': 'url("https://i.ytimg.com/vi/mvM2eyk1frk/hqdefault.jpg")'}).addClass('padding-top');
			
					}
					
				} // if (data.stream === null)
				
				else if (data.stream !== null) {
					
					let language = data.stream.channel.language; 
					
					let gameStatus = data.stream.channel.status;
					
					let viewers = data.stream.channel.viewers;
					
					let views = data.stream.channel.views;
					
					let url = data.stream.channel.url;
					
					let logo = data.stream.preview.medium;
					
					let createdAt = data.stream.created_at;
					
					program = data.stream.channel.game;
					
					let schedule = getTime(createdAt);
					
					$('#' + name).addClass('tv-guide-online-channels');
					
					$('#' + name).find('.schedule').html(schedule);
					
					$('#' + name).find('.program').html('<a href="#">'+program+'</a>');
					
					if (numberOfOnlineChannels.includes(name) === false) {
						
						numberOfOnlineChannels.push(name);
						
						let thisNumber = $('#' + name).find('.channel-number').html();
						
						channelNumberArray.push(parseInt(thisNumber));
									
					}
				
				} // else if (data.stream != null) 
	
			}); // end of $.getJSON()
	
		} // end of loop
		
		channelsHover();
	
	} // end of fetchOnlineChannels()
	
	function searchFunction() {
	
		showRegularTv();
		
		if (localStorage.getItem('channels') === null) {
				
					$('#current-channel-content').html('<h4 class="title">There are currently no Twitch Channels. Please search for one.</h4>'+
					
					'<form id="twitch-form" onsubmit="">' +
					
					'<input  class="form-control" id="twitch-channel" type="text">'+ '</br>'+
					
					'<button class="btn btn-info" type="submit">Submit</button>' +
					
					'</form>');
					
					$('#twitch-channel').focus();
					
					$('#twitch-form').submit(saveChannel);
					
				} // end of if (localStorage.getItem('channels') === null)
					
				else if (JSON.parse(localStorage.getItem('channels')).length === 0) {
		
					$('#current-channel-content').html('<h4 class="title">There are currently no Twitch Channels. Please search for one.</h4>'+
					
					'<form id="twitch-form" onsubmit="">' +
					
					'<input  class="form-control" id="twitch-channel" type="text">'+ '</br>'+
					
					'<button class="btn btn-info" type="submit">Submit</button>' +
					
					'</form>');
					
					$('#twitch-channel').focus();
					
					$('#twitch-form').submit(saveChannel);
		
				} // end of else if (JSON.parse(localStorage.getItem('channels')).length === 0)
					
				else {
			
					$('#channel-header').html('<th>Channel</th>' + '<th>Program</th>'+ '<th>Schedule</th>' );
					
					$('#current-channel-content').html('<form id="channel-search">' + '<div class="form-group">' + '<label> Search by channel number </label>'+ '<input id="search-channel-number" class="form-control" type="number">' + '</div>'+ '<div class="form-group"><label> Search by channel name </label>'+ '<input id="search-channel-name" class="form-control" type="text">'+ '</div>' + '<button type="submit" class="btn btn-primary">Submit</button>'+ '</form>');
					
					$('#search-channel-number').focus();
					
					let tableContent = document.getElementById('add-table-content');
					
					tableContent.innerHTML = '';
					
					$('#channel-search').on('submit', function(e) {
						
						e.preventDefault();
						
						tableContent.innerHTML = '';
						
						let numberChannel = $('#search-channel-number').val();
						
						numberChannel = numberChannel.replace(/\s+/g, '');
						
						let nameChannel = $('#search-channel-name').val();
						
						nameChannel = nameChannel.replace(/\s+/g, '');
						
						let thisChannelNumber = '';
						
						let counter = 0;
						
						counter1 = -1;
						
						channelArray = [];
						
						let channels = JSON.parse(localStorage.getItem('channels'));
						
						if (numberChannel !== '' && nameChannel !== '' ) {
							
							alert('You can only search channels by number OR name');
							
							return false;
						
						} 
						
						else if (isNaN(numberChannel) === true) {
							
							alert('A character other than a number was used. Please only use numbers when searching by channel number.');
							
							return false;
						
						}
							
						else if (numberChannel !== '') {
							
							for (var j = 0; j < channels.length; j++ ) {
								
								if (channels[j].number == numberChannel) {
									
									thisChannelNumber = channels[j];									
					
								} 
								
								else {
								
									counter++;
									
									if (counter === channels.length) {
									
										alert('That channel does not exist');
									
										return false;
									
									} // end of if (channels[j].number == numberChannel)
									
								} // end of else
								
							} // end of for loop
								
							let thisChannelName = thisChannelNumber.name;
							
							channelArray.push(numberChannel);
							
							let hrefString = 'https://www.twitch.tv/' + thisChannelName;
			
							tableContent.innerHTML += '<tr id="'+thisChannelName+'" class="tv-guide-online-search-channels"  onmouseover="showProgramDetails(\''+thisChannelName+'\')" >' +'<td >' +'<span class="channel-number" id="'+numberChannel+'">'+numberChannel+ '</span>'+ ' ' +'<a target="_blank" href="'+hrefString+'">' + thisChannelName + '</a>' + ' ' + '<i class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+thisChannelName+'\')"></i>'+ '</td>' + '<td class="program"  onclick="showProgram(\''+thisChannelName+'\')"></td>' + '<td class="stream"> </td>' +'</tr>';
							
							$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + thisChannelName + '?callback=?', function(data,i) {
								
								if (data.stream === null) {
									
									$('#' + thisChannelName).find('.program').html('N/A');
									
									$('#' + thisChannelName).find('.stream').html('Offline');

			
								} // end of if (data.stream === null)
									
								else if (data.stream !== null) {

									let gameStatus = data.stream.channel.status;
									
									let viewers = data.stream.channel.viewers;
									
									let views = data.stream.channel.views;
									
									let url = data.stream.channel.url;
									
									let logo = data.stream.preview.medium;
									
									let createdAt = data.stream.created_at;
									
									let schedule = getTime(createdAt);
									
									program = data.stream.channel.game;
									
									$('#' + thisChannelName).mouseenter(function() {
										
										showProgramDetails(thisChannelName);
									
									}); 
									
									$('#' + thisChannelName).find('.program').html('<a href="#">'+program+'</a>');
									
									$('#' + thisChannelName).find('.stream').html(schedule);
			
								} // end of if (data.stream != null)
									
							}); // end of $.getJSON()
								
						} // end of else if (numberChannel !== '')
							
						else if (nameChannel !== '') {
				
							let thisChannelName = '';
					
							let thisChannelNumber = '';
					
							for (var k = 0; k < channels.length; k++ ) {
					
								if (channels[k].name.toLowerCase() == nameChannel.toLowerCase()) {
							
									thisChannelName = channels[k].name;
							
									thisChannelNumber = channels[k].number;
							
								} // end of if
						
								else {
						
									counter++;
							
									if (counter === channels.length) {
							
										alert('That channel does not exist');
								
										return false;
								
									} // end of if (counter === channels.length)
							
								} // end of else
						
							} // end of loop
						
							let hrefString = 'https://www.twitch.tv/' + thisChannelName;
							
							channelArray.push(thisChannelNumber);
					
							tableContent.innerHTML += '<tr id="'+thisChannelName+'" class="tv-guide-online-search-channels" >' +'<td >' +'<span class="channel-number" id="'+thisChannelNumber+'">'+thisChannelNumber+ '</span>'+ ' ' +'<a target="_blank" href="'+hrefString+'">' + thisChannelName + '</a>' + ' ' + '<i class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+thisChannelName+'\')"></i>'+ '</td>' + '<td class="program" onclick="showProgram(\''+thisChannelName+'\')"></td>' + '<td class="stream"> </td>' +'</tr>';
					
						$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + thisChannelName + '?callback=?', function(data,i) {
					
							if (data.stream === null) {
								
								$('#' + thisChannelName).find('.program').html('N/A');
								
								$('#' + thisChannelName).find('.stream').html('Offline');
	
							} 
								
							else if (data.stream !== null) {
							
								let language = data.stream.channel.language; 
							
								let gameStatus = data.stream.channel.status;
							
								let viewers = data.stream.channel.viewers;
							
								let views = data.stream.channel.views;
							
								let url = data.stream.channel.url;
							
								let logo = data.stream.preview.medium;
							
								let schedule = getTime(createdAt);
							
								program = data.stream.channel.game;
							
								$('#' + thisChannelName).mouseenter(showProgramLogo(thisChannelName));
							
								$('#' + thisChannelName).find('.program').html('<a href="#">'+program+'</a>');
							
								$('#' + thisChannelName).find('.stream').html(schedule);

							 } // end if (data.stream !== null)
								 
						}); // end of $.getJSON()
						
					} // end of else if (nameChannel !== '')
					
					channelsHover();

				}); // end of channel search submit function
				
			} // end of else
					
	} // end of searchFunction()
	
	function selectedChannel() {
					
		let thisNumber = channelArray[counter1];

		let thisName = $('#' + thisNumber).siblings('a').html();

		let thisClass = $('#' + thisName).attr('class');
					
		if (thisClass === 'tv-guide-online-channels' || thisClass === 'tv-guide-online-search-channels') {

			showProgramDetails(thisName);

		}
	
		$('#' + thisName).css({'background-color':'grey', 'color':'white'});;
	
		$('#' + thisName).find('a').css({'color':'white', 'text-decoration': 'underline'});
	
		$('#add-table-content tr').not('#' + thisName).css({'background-color':'white', 'color':'black'});
	
		$('#add-table-content tr').not('#' + thisName).find('a').css({'color': '#337ab7', 'text-decoration': 'none'});
				
	} // end of selectedChannel()
	
	function channelsHover() {
		
		$('#add-table-content tr').hover(function() {
					
			$(this).not('#channel-header').css({'background-color':'grey', 'color':'white'});
			
			$(this).not('#channel-header').find('a').css({'color':'white', 'text-decoration': 'underline'});
			
			$('#add-table-content tr').not(this, '#channel-header').css({'background-color':'white', 'color':'black'});
			
			$('#add-table-content tr').not(this, '#channel-header').find('a').css({'color': '#337ab7', 'text-decoration': 'none'});	
		
		}, function() {
			
			$(this).not('#channel-header').css({'background-color':'white', 'color':'black'});
			
			$(this).not('#channel-header').find('a').css({'color': '#337ab7', 'text-decoration': 'none'});	
		
		});
		
	}
		
	function showProgram(name) {
		
		$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + name + '?callback=?', function(data) {
		
			let tvHeight = $('#tv').outerHeight();
			
			let tvWidth = $('#tv').width();
			
			$('#tv').html('<iframe style="" src="https://player.twitch.tv/?channel='+name+'" height="'+tvHeight+'" width="'+tvWidth+'"  frameborder="2" allowfullscreen="yes"></iframe>');
			
			$('#current-channel-img').hide();
			
			$('#current-channel-content').hide();
			
			$('#channel-header').hide();
		
		}); // end of $.getJSON()
		
	} // end of showProgramLogo()
	
	function showProgramDetails(name) {
		
		$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + name + '?callback=?', function(data) {
			
			let language = data.stream.channel.language; 
			
			let programStatus = data.stream.channel.status;
			
			let viewers = data.stream.viewers;
			
			let views = data.stream.channel.views;
			
			let url = data.stream.channel.url;
			
			let logo = data.stream.preview.medium;
			
			let program = data.stream.channel.game;
			
			let createdAt = data.stream.created_at;
			
			let result = createdAt.slice(1,11);
			
			createdAt = createdAt.slice(11,16);
			
			language = getLanguage(language);
		
			$('#current-channel-img').css({'background-image': 'url("'+logo+'")', 'background-size':'100% 100%'});
			
			$('#current-channel-content').html('<h4 class="text-center">'+program+'</h4><ul><li><b>Program Status:</b> '+programStatus+
			
			'<b><li>Viewers:</b> '+viewers+'</li><li><b>Views:</b> '+views+
			
			'</li><li><b>Language:</b> '+language+ '</li></ul>');
			

		}); // end of $.getJSON()
		
	} // end of showProgramLogo()
	
		/* Responsive Design */
	
	function responsive() {
	
		let screenHeight = $(window).height();
	
		$('.baseboard-row').height(screenHeight * .05);
	
		let baseboardHeight = $('.baseboard-row').height();
	
		$('#plant').height(screenHeight/2);
	
		$('#painting').height(screenHeight/5);
	
		$('#tv-div').height((screenHeight * .60)-baseboardHeight);
	
		if ( (screenHeight * .60)-baseboardHeight <= 600) {
	
			$('#painting').css({'margin-top': '10px'});
	
			$('#tv-div').height((screenHeight * .60)-baseboardHeight-60).css({'margin-top':'20px', 'margin-bottom':'40px'});
	
		}
	
		if ($('#tv-div').height() < (screenHeight * .60)-baseboardHeight) {
		
			let tvAreaHeight = (screenHeight * .60)-baseboardHeight;
		
			let tvDifference = tvAreaHeight- $('#tv-div').height();
		
			$('#tv-div').css({'margin-bottom': tvDifference/2 +'px', 'margin-top': tvDifference/2 +'px'});
		
			$('#painting').css({'margin-top': tvDifference/4 + 'px'});
	
		}
	
		let tvRowHeight = $('.tv-row').height();

		let difference = screenHeight - (tvRowHeight + baseboardHeight);
	
		let paintingHeight = $('#painting').height();
	
		$('.carpet-row').height(difference);
	
		let carpetHeight = $('.carpet-row').height();
	
		$('#table').css({'height':difference/2 + 'px'});
	
		let tableHeight = $('#table').height();
	
		let tableWidth = $('#table').width();
	
		$('#remote').css({'height':tableHeight-20+ 'px','width': tableWidth/3, 'max-width':tableWidth/2 +'px'});
	
		let plantHeight = $('#plant').height();
	
		let remoteHeight = $('#remote').height();
	
		let paddingTop = carpetHeight-tableHeight;
	
		if (remoteHeight < tableHeight) {
		
			let tableDifference = $('#table').height() - $('#remote').height();

		}
	
		let plantDifference =(tvRowHeight + baseboardHeight) - (plantHeight );
	
		$('#plant').css({'top':plantDifference + baseboardHeight + 'px'});
	
	} // end of responsive()
	
	responsive();
	
	$(window).resize(responsive);

	