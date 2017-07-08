/*
	Explanation of program:
	
	Once the page loads, if there are no Twitch channels saved in the browser's local storage,
	the user will be prompted to add one by entering the name of the channel in the search box.
	If that channel does not exist, does not have a subscription program, or an error occurs
	an alert message will be displayed informing the user of the issue so that the user can 
	try again to add a channel. If there is no error and the channel exists it will be added
	to the local storage and the home screen will be shown displaying the number of channels
	saved and which ones are online and which are offline. The user can click on the channel
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
	
	let screenHeight = $(window).height();
	$('.baseboard-row').height(screenHeight * .05);
	let baseboardHeight = $('.baseboard-row').height();
	
	$('#plant').height(screenHeight/2);
	$('#painting').height(screenHeight/5);
	$('#tv-div').height((screenHeight * .60)-baseboardHeight);
	//$('.tv-row').height(screenHeight * .65);
	let bodyHeight = $('body').height();
	let tvRowHeight = $('.tv-row').height();
	
	let difference = screenHeight - (tvRowHeight + baseboardHeight);
	let containerFluidHeight = tvRowHeight + baseboardHeight;
	let paintingHeight = $('#painting').height();
	$('.carpet-row').height(difference);
	let carpetHeight = $('.carpet-row').height();
	$('#table').css({'height':difference/2 + 'px', 'max-height':'300px'});
	let tableHeight = $('#table').height();
	let tableWidth = $('#table').width();
	$('#remote').css({'height':tableHeight+ 'px', 'max-height':'200px' ,'width': tableWidth/3, 'max-width':tableWidth/2 +'px'});
	let remoteContainerWidth = $('#remote-controls-container').width();
	let plantHeight = $('#plant').height();
	let remoteHeight = $('#remote').height();
	let paddingTop = carpetHeight-tableHeight;
	
	let paintingDifference = (tvRowHeight + baseboardHeight)-(plantHeight);
	console.log(tvRowHeight);
	console.log('painting' + paintingHeight);
	
	//$('#plant').css({'top':paintingDifference  + 'px'});
	//$('.carpet-row').css({'padding-top':paddingTop + 'px'});
	
	//$('#plant').css({'top': containerFluidHeight- plantHeight + 'px'});
	//$('.controls').css({'width':remoteContainerWidth/3 +'%'});
	console.log('body:' +bodyHeight);
	console.log('TV:' +tvRowHeight);
	console.log('baseboard:' +baseboardHeight);
	console.log('difference:' +difference);
	console.log('containerFluid:' + containerFluidHeight);
	
	
	$(window).resize(function() {
	
	let screenHeight = $(window).height();
	$('.baseboard-row').height(screenHeight * .05);
	let baseboardHeight = $('.baseboard-row').height();
	
	$('#plant').height(screenHeight/2);
	$('#painting').height(screenHeight/5);
	$('#tv-div').height((screenHeight * .60)-baseboardHeight);
	//$('.tv-row').height(screenHeight * .65);
	let bodyHeight = $('body').height();
	let tvRowHeight = $('.tv-row').height();
	
	let difference = screenHeight - (tvRowHeight + baseboardHeight);
	let containerFluidHeight = tvRowHeight + baseboardHeight;
	let paintingHeight = $('#painting').height();
	$('.carpet-row').height(difference);
	let carpetHeight = $('.carpet-row').height();
	$('#table').css({'height':difference/2 + 'px', 'max-height':'300px'});
	let tableHeight = $('#table').height();
	let tableWidth = $('#table').width();
	$('#remote').css({'height':tableHeight+ 'px', 'max-height':'200px' ,'width': tableWidth/3, 'max-width':tableWidth/2 +'px'});
	let remoteContainerWidth = $('#remote-controls-container').width();
	let plantHeight = $('#plant').height();
	let remoteHeight = $('#remote').height();
	let paddingTop = carpetHeight-tableHeight;
	
	let paintingDifference = (tvRowHeight + baseboardHeight)-(plantHeight);
	console.log(tvRowHeight);
	console.log('painting' + paintingHeight);
	
	//$('#plant').css({'top':paintingDifference  + 'px'});
	$('.carpet-row').css({'padding-top':paddingTop + 'px'});
	//$('#plant').css({'position':'absolute','bottom':0, 'left':0});
	//$('#plant').css({'top': containerFluidHeight- plantHeight + 'px'});
	//$('.controls').css({'width':remoteContainerWidth/3 +'%'});
	console.log('body:' +bodyHeight);
	console.log('TV:' +tvRowHeight);
	console.log('baseboard:' +baseboardHeight);
	console.log('difference:' +difference);
	console.log('containerFluid:' + containerFluidHeight);
	});
	
	fetchChannels();
	$('[data-toggle="popover"]').popover(); 
	
	$('#online').click(function() {
		
		$('#tv').html('<div id="content" style="text-align:center;">'+
								'<div id="current-channel" >'+
									'<div class="row">' +
										'<div class="col-md-4" id="current-channel-img" style="">'+
										'</div>'+
										'<div class="col-md-6" id="current-channel-content">'+
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
		).css({'overflow-x':'hidden', 'overflow-y':'auto'});
		$('#current-channel-content').show();
		$('#channel-header').show();
		$('#current-channel-img').show();
		$('#current-channel-img').css({'height':'200px','background-image':'url("https://www.filepicker.io/api/file/vL2cljiRdefa2gBxqsSV")', 'background-size':'contain','background-repeat':'no-repeat','background-color':'white','background-position':'center center'});
		 $('#current-channel-content').html('<h3>Online Channels</h3>' + '<p>Hover over the channel with your cursor to view more details about the program. Click on the program to view it on the tv screen or click the the channel name to go their twitch page' );		
		$('#tv').css('background-image','none').removeClass('padding-top');
		$('#tv').css('background', 'linear-gradient(#FAFFFE,#780AE8)');	
	
		let channels = JSON.parse(localStorage.getItem('channels'));
		let tableContent = document.getElementById('add-table-content');
		tableContent.innerHTML = ' ';
		let counter = 0;
		let counter1 = 0;
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
		
			tableContent.innerHTML += '<tr class="tv-guide-online-channels" id="'+name+'" onmouseover="showProgramDetails(\''+name+'\')" >' +'<td >' +'<span class="channel-number" id="'+channelNumber+'">'+channelNumber+'</span>'+ ' ' +'<a target="_blank" href="'+hrefString+'">' + name + '</a>' + ' ' + '<i style="color:red" class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+name+'\')"></i>'+ '</td>' + '<td class="program" onclick="showProgram(\''+name+'\')"></td> <td class="schedule"></td>' +'</tr>';
		
			$('#channel-header').css({'background-color':'black', 'color': 'white'}).html('<th>Channel</th>' + '<th>Program</th>'+ '<th>Schedule</th>' );
			
					$('.tv-guide-online-channels').css({'background-color': 'white', 'color': 'black'});
					
					$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + name + '?callback=?', function(data,i) {
					
						if (data.stream === null) {
							$('#' + name).remove();
				
							if (numberOfOfflineChannels.includes(name) === false) {
							numberOfOfflineChannels.push(name);
				
				
							}
							if (numberOfOfflineChannels.length === channels.length) {
								counter++;
								$('#channel-header').html('<h3 class="no-signal">No live streams at this time</h3>');
								$('#current-channel-content').html('');
								$('#current-channel-img').hide();
								$('#tv').css({'z-index':1000,'background-image': 'url("https://i.ytimg.com/vi/mvM2eyk1frk/hqdefault.jpg")'}).addClass('padding-top');
					
							}
						}
						else if (data.stream != null) {
			
							let followers = data.stream.channel.followers;
							let language = data.stream.channel.language; 
							let gameStatus = data.stream.channel.status;
							let viewers = data.stream.channel.viewers;
							let views = data.stream.channel.views;
							let url = data.stream.channel.url;
							let logo = data.stream.preview.medium;
							let  createdAt = data.stream.created_at;
							program = data.stream.channel.game;
							let schedule = getTime(createdAt);
							$('#' + name).find('.schedule').html(schedule);
							$('#' + name).find('.program').html('<a href="#">'+program+'</a>');
							$('#' + name).find('a').css({'color': '#337ab7', 'text-decoration': 'none' });
							$('.tv-guide-online-channels').css({'background-color': 'white', 'color': 'black'});
							
							if (numberOfOnlineChannels.includes(name) === false) {
								numberOfOnlineChannels.push(name);
								let thisNumber = $('#' + name).find('.channel-number').html();
								channelNumberArray.push(parseInt(thisNumber));
							}
						
						}
			
		
					}); // end of getJSON
				} // end of loop
				
				$('#search').click(function() {
					$('#tv').html(
								'<div id="content" style="text-align:center;">'+
									'<div id="current-channel" >'+
										'<div class="row">' +
											'<div class="col-md-4" id="current-channel-img" style="">'+
											'</div>'+
											'<div class="col-md-6" id="current-channel-content">'+
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
							).css({'overflow-x':'hidden', 'overflow-y':'auto'});
					$('#tv').css('background-image','none').removeClass('padding-top');
					$('#tv').css('background', 'linear-gradient(#FAFFFE,#780AE8)');
					$('#current-channel-img').css({'height':'200px','background-image':'url("https://www.filepicker.io/api/file/vL2cljiRdefa2gBxqsSV")', 'background-size':'contain','background-repeat':'no-repeat','background-color':'white','background-position':'center center'});
		
					$('#current-channel-img').show();
					if (localStorage.getItem('channels') === null) {
						$('#current-channel-content').html('<h4 class="title">There are currently no Twitch Channels. Please search for one.</h4>'+
						'<form id="twitch-form" onsubmit="">' +
						'<input  class="form-control" id="twitch-channel" type="text">'+ '</br>'+
						'<button class="btn btn-info" type="submit">Submit</button>' +
						'</form>');
						$('#twitch-channel').focus();
						$('#twitch-form').submit(saveChannel);
						
					} // end of if
					else if (JSON.parse(localStorage.getItem('channels')).length === 0) {
			
			
						$('#current-channel-content').html('<h4 class="title">There are currently no Twitch Channels. Please search for one.</h4>'+
						'<form id="twitch-form" onsubmit="">' +
						'<input  class="form-control" id="twitch-channel" type="text">'+ '</br>'+
						'<button class="btn btn-info" type="submit">Submit</button>' +
						'</form>');
						$('#twitch-channel').focus();
						$('#twitch-form').submit(saveChannel);
			
					} // end of else if
					else {
				
						
						$('#channel-header').css({'background-color':'black', 'color': 'white'}).html('<th>Channel</th>' + '<th>Program</th>'+ '<th>Schedule</th>' );
						$('#current-channel-content').html('<form id="channel-search">' + '<div class="form-group">' + '<label> Search by channel number </label>'+ '<input id="search-channel-number" class="form-control" type="number">' + '<label> Search by channel name </label>'+ '<input id="search-channel-name" class="form-control" type="text">'+ '</div>' + '<button type="submit" class="btn btn-primary">Submit</button>'+ '</form>');
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
							console.log(numberChannel);
							let thisChannelNumber = '';
							let counter = 0;
							let channels = JSON.parse(localStorage.getItem('channels'));
							if (numberChannel !== '' && nameChannel !== '' ) {
								alert('You can only search channels by number OR name');
								return false;
							} // end of if
							else if (isNaN(numberChannel) === true) {
								alert('A character other than a number was used. Please only use numbers when searching by channel number.');
								return false;
							}
							else if (numberChannel !== '') {
								for (var j = 0; j < channels.length; j++ ) {
									console.log(channels[j].number);
									if (channels[j].number == numberChannel) {
										thisChannelNumber = channels[j];
						
									} // end of if
									else {
										counter++;
										if (counter === channels.length) {
										alert('That channel does not exist');
										return false;
										} // end of if
									} // end of else
								} // end of for loop
								let thisChannelName = thisChannelNumber.name;
								let hrefString = 'https://www.twitch.tv/' + thisChannelName;
				
								tableContent.innerHTML += '<tr id="'+thisChannelName+'" class="tv-guide-online-search-channels"  onmouseover="showProgramDetails(\''+thisChannelName+'\')" >' +'<td >' +'<span class="channel-number" id="'+numberChannel+'">'+numberChannel+ '</span>'+ ' ' +'<a target="_blank" href="'+hrefString+'">' + thisChannelName + '</a>' + ' ' + '<i style="color:red" class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+thisChannelName+'\')"></i>'+ '</td>' + '<td class="program"  onclick="showProgram(\''+thisChannelName+'\')"></td>' + '<td class="stream"> </td>' +'</tr>';
								$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + thisChannelName + '?callback=?', function(data,i) {
									if (data.stream === null) {
										$('#' + thisChannelName).find('.program').html('N/A');
										$('#' + thisChannelName).find('.stream').html('Offline');
										$('#' +thisChannelName).css({'background-color': 'white', 'color': 'black'});
				
									} // end of if data stream is null
									else if (data.stream != null) {
										let followers = data.stream.channel.followers;
										let language = data.stream.channel.language; 
										let gameStatus = data.stream.channel.status;
										let viewers = data.stream.channel.viewers;
										let views = data.stream.channel.views;
										let url = data.stream.channel.url;
										let logo = data.stream.preview.medium;
										let createdAt = data.stream.created_at;
										let schedule = getTime(createdAt);
										program = data.stream.channel.game;
										$('#' + thisChannelName).mouseenter(showProgramDetails(thisChannelName));
										$('#' + thisChannelName).find('.program').html('<a href="#">'+program+'</a>');
										$('#' +thisChannelName).find('a').css({'color':'#337ab7','text-decoration': 'none'});
										$('#' + thisChannelName).find('.stream').html(schedule);
										$('#' +thisChannelName).css({'background-color': 'white', 'color': 'black'});
				
								
									} // end of if data stream isn't null
								}); // end of getJSON
							} // end of else if numberChannel !== ''
							else if (nameChannel !== '') {
									let thisChannelName = '';
									let thisChannelNumber = '';
									for (var k = 0; k < channels.length; k++ ) {
									console.log(channels[k].number);
										if (channels[k].name.toLowerCase() == nameChannel.toLowerCase()) {
											thisChannelName = channels[k].name;
											thisChannelNumber = channels[k].number;
										} // end of if
										else {
											counter++;
											if (counter === channels.length) {
											alert('That channel does not exist');
											return false;
											} // end of if
										} // end of else
									} // end of loop
								let hrefString = 'https://www.twitch.tv/' + thisChannelName;
								
								tableContent.innerHTML += '<tr id="'+thisChannelName+'" class="tv-guide-online-search-channels" >' +'<td >' +'<span class="channel-number" id="'+thisChannelNumber+'">'+thisChannelNumber+ '</span>'+ ' ' +'<a target="_blank" href="'+hrefString+'">' + thisChannelName + '</a>' + ' ' + '<i style="color:red" class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+thisChannelName+'\')"></i>'+ '</td>' + '<td class="program" onclick="showProgram(\''+thisChannelName+'\')"></td>' + '<td class="stream"> </td>' +'</tr>';
								$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + thisChannelName + '?callback=?', function(data,i) {
								
										if (data.stream === null) {
											$('#' + thisChannelName).find('.program').html('N/A');
											$('#' + thisChannelName).find('.stream').html('Offline');
											$('#' +thisChannelName).css({'background-color': 'white', 'color': 'black', 'border-bottom-color': 'white'});
				
										} // end if data stream is null
										 if (data.stream != null) {
										
											let followers = data.stream.channel.followers;
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
											$('#' +thisChannelName).find('a').css({'color':'#337ab7','text-decoration': 'none'});
											$('#' + thisChannelName).find('.stream').html(schedule);
										
											$('#' +thisChannelName).css({'background-color': 'white', 'color': 'black'});
				
										 } // end if data stream isn't null
								}); // end of getJSON
							} // end of else if nameChannel !== ''
						}); // end of channel search submit function
					} // end of else
					$('#add-table-content tr').mouseenter(function() {
						$(this).not('#channel-header').css({'background-color': 'grey', 'color': 'white'});
						$(this).not('#channel-header').find('a').css({'color': 'white', 'text-decoration':'underline'});
					});
					$('#add-table-content tr').mouseleave(function() {
						$(this).not('#channel-header').css({'background-color': 'white', 'color': 'black'});
						$(this).not('#channel-header').find('a').css({'color': '#337ab7', 'text-decoration':'none'});
	
					});
				}); // end of search function
				$('#add-table-content tr').mouseenter(function() {
				$(this).not('#channel-header').css({'background-color': 'grey', 'color': 'white'});
				$(this).not('#channel-header').find('a').css({'color': 'white', 'text-decoration':'underline'});
	
				});
				$('#add-table-content tr').mouseleave(function() {
					$(this).not('#channel-header').css({'background-color': 'white', 'color': 'black'});
					$(this).not('#channel-header').find('a').css({'color': '#337ab7', 'text-decoration':'none'});
	
				});
	}); // end of online click function
	$('#home').click(function() {
	
		$('#tv').html('<div id="content" style="text-align:center;">'+
								'<div id="current-channel" >'+
									'<div class="row">' +
										'<div class="col-md-4" id="current-channel-img" style="">'+
										'</div>'+
										'<div class="col-md-6" id="current-channel-content">'+
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
						).css({'overflow-x':'hidden', 'overflow-y':'auto'});
						
		$('#current-channel-content').show();
		$('#channel-header').show();
		$('#current-channel-img').show();
		$('#current-channel-img').css({'height':'200px','background-image':'url("https://www.filepicker.io/api/file/vL2cljiRdefa2gBxqsSV")', 'background-size':'contain','background-repeat':'no-repeat','background-color':'white','background-position':'center center'});
		$('#current-channel-content').html('<h3>Online Channels</h3>' + '<p>Hover over the channel(s) to view more details on the program</p>' );
		$('#tv').css('background-image','none').removeClass('padding-top');
		$('#tv').css('background', 'linear-gradient(#FAFFFE,#780AE8)');	
	
		let channels = JSON.parse(localStorage.getItem('channels'));
		let tableContent = document.getElementById('add-table-content');
		tableContent.innerHTML = ' ';
		let counter = 0;
		let counter1 = 0;
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
		
			tableContent.innerHTML += '<tr class="tv-guide-channels" id="'+name+'" >' +'<td >' +'<span class="channel-number" id="'+channelNumber+'">'+channelNumber+'</span>'+ ' ' +'<a target="_blank" href="'+hrefString+'">' + name + '</a>' + ' ' + '<i style="color:red" class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+name+'\')"></i>'+ '</td>' + '<td class="program" ></td> <td class="stream"></td>' +'</tr>';
			$('.tv-guide-channels').css({'background-color':'white'});
			
			$('#channel-header').css({'background-color':'black', 'color': 'white'}).html('<th>Channel</th>' + '<th>Program</th>'+ '<th>Stream</th>' );
			
			$('.tv-guide-online-channels').css({'background-color': 'white', 'color': 'black'});
			$.getJSON('https://wind-bow.gomix.me/twitch-api/users/' +name+ '?callback=?', function(data) {
				
				if (data.hasOwnProperty('status')) {
					
					if (data.status === 404) {
						
							$('#' + name).find('.program').html('This channel('+name+') no longer exists');
							$('#' + name).find('.program').html('N/A');
						
							}
					
					}
				else {
					
				}
			}); // end of getJSON
			$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + name + '?callback=?', function(data,i) {
				let thisNumber = $('#' + name).find('.channel-number').html();
				channelNumberArray.push(parseInt(thisNumber));
				if (data.stream === null) {
					
						$('#' + name).find('.program').html('N/A');
						$('#' + name).find('.stream').html('Offline')
						if (numberOfOfflineChannels.includes(name) === false) {
						numberOfOfflineChannels.push(name);
				
				
						}
					
				}
				else if (data.stream != null) {
	
					let followers = data.stream.channel.followers;
					let language = data.stream.channel.language; 
					let gameStatus = data.stream.channel.status;
					let viewers = data.stream.channel.viewers;
					let views = data.stream.channel.views;
					let url = data.stream.channel.url;
					let logo = data.stream.preview.medium;
					let  createdAt = data.stream.created_at;
					program = data.stream.channel.game;
					let schedule = getTime(createdAt);
					$('#' + name).find('.stream').html('Online <img src="http://www.userlogos.org/files/logos/jumpordie/trakt_01.png" width="30"/>');
						
					$('#' + name).find('.program').html(program);
	
						if (numberOfOnlineChannels.includes(name) === false) {
							numberOfOnlineChannels.push(name);
			
						}

					}
			
					$('#current-channel-content').html('<h3>TV Guide</h3>'+ '</br>'+ '<ul>'+'<li><strong>Channels: </strong>' + channels.length + '</li>' + '<li><strong> Online Channels: </strong>' +'<span class="online-channels">'+ numberOfOnlineChannels.length+ '</span>'+ '</li>' + '<li><strong> Offline Channels: </strong>' + '<span class="offline-channels">'+numberOfOfflineChannels.length+ '</span>'+'</li>' + '</ul>' );
			 
				}); // end of getJSON
			} // end of loop
				
			$('#search').click(function() {
				
				$('#tv').html('<div id="content" style="text-align:center;">'+
							'<div id="current-channel" >'+
								'<div class="row">' +
									'<div class="col-md-4" id="current-channel-img" style="">'+
									'</div>'+
									'<div class="col-md-6" id="current-channel-content">'+
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
				).css({'overflow-x':'hidden', 'overflow-y':'auto'});;
				$('#tv').css('background-image','none').removeClass('padding-top');
				$('#tv').css('background', 'linear-gradient(#FAFFFE,#780AE8)');
				$('#current-channel-img').css({'height':'200px','background-image':'url("https://www.filepicker.io/api/file/vL2cljiRdefa2gBxqsSV")', 'background-size':'contain','background-repeat':'no-repeat','background-color':'white','background-position':'center center'});
		
				$('#current-channel-img').show();
				if (localStorage.getItem('channels') === null) {
					$('#current-channel-content').html('<h4 class="title">There are currently no Twitch Channels. Please search for one.</h4>'+
					'<form id="twitch-form" onsubmit="">' +
					'<input  class="form-control" id="twitch-channel" type="text">'+ '</br>'+
					'<button class="btn btn-info" type="submit">Submit</button>' +
					'</form>');
					$('#twitch-channel').focus();
					$('#twitch-form').submit(saveChannel);
					console.log('no channels');
				} // end of if
				else if (JSON.parse(localStorage.getItem('channels')).length === 0) {
			
			
					$('#current-channel-content').html('<h4 class="title">There are currently no Twitch Channels. Please search for one.</h4>'+
				'<form id="twitch-form" onsubmit="">' +
				'<input  class="form-control" id="twitch-channel" type="text">'+ '</br>'+
				'<button class="btn btn-info" type="submit">Submit</button>' +
				'</form>');
				$('#twitch-channel').focus();
				$('#twitch-form').submit(saveChannel);
					console.log('no channels but channels array exists');
			
				} // end of else if
				else {
					$('#channel-header').css({'background-color':'black', 'color': 'white'}).html('<th>Channel</th>' + '<th>Program</th>'+ '<th>Schedule</th>' );
					 $('#current-channel-content').html('<form id="channel-search">' + '<div class="form-group">' + '<label> Search by channel number </label>'+ '<input id="search-channel-number" class="form-control" type="number">' + '<label> Search by channel name </label>'+ '<input id="search-channel-name" class="form-control" type="text">'+ '</div>' + '<button type="submit" class="btn btn-primary">Submit</button>'+ '</form>');
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
						console.log(numberChannel);
						let thisChannelNumber = '';
						let counter = 0;
						let channels = JSON.parse(localStorage.getItem('channels'));
						if (numberChannel !== '' && nameChannel !== '' ) {
							alert('You can only search channels by number OR name');
							return false;
						} // end of if
						else if (isNaN(numberChannel) === true) {
							alert('A character other than a number was used. Please only use numbers when searching by channel number.');
							return false;
						} // end of else if
						else if (numberChannel !== '') {
						for (var j = 0; j < channels.length; j++ ) {
								console.log(channels[j].number);
								if (channels[j].number == numberChannel) {
									thisChannelNumber = channels[j];
						
								} // end of if
								else {
									counter++;
									if (counter === channels.length) {
									alert('That channel does not exist');
									return false;
									} // end of if
								} // end of else
							} // end of for loop
							let thisChannelName = thisChannelNumber.name;
							let hrefString = 'https://www.twitch.tv/' + thisChannelName;
				
							tableContent.innerHTML += '<tr id="'+thisChannelName+'" class="tv-guide-search-channels" >' +'<td >' +'<span class="channel-number" id="'+numberChannel+'">'+numberChannel+ '</span>'+ ' ' +'<a target="_blank" href="'+hrefString+'">' + thisChannelName + '</a>' + ' ' + '<i style="color:red" class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+thisChannelName+'\')"></i>'+ '</td>' + '<td class="program"></td>' + '<td class="stream"> </td>' +'</tr>';
							$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + thisChannelName + '?callback=?', function(data,i) {
			 					if (data.stream === null) {
									$('#' + thisChannelName).find('.program').html('N/A');
									$('#' + thisChannelName).find('.stream').html('Offline');
									$('#' +thisChannelName).css({'background-color': 'white', 'color': 'black'});
				
							  	} // end of if data stream is null
			 					if (data.stream != null) {
			 						let followers = data.stream.channel.followers;
									let language = data.stream.channel.language; 
									let gameStatus = data.stream.channel.status;
									let viewers = data.stream.channel.viewers;
									let views = data.stream.channel.views;
									let url = data.stream.channel.url;
									let logo = data.stream.preview.medium;
		
									program = data.stream.channel.game;
									$('#' + thisChannelName).mouseenter(showProgramDetails(thisChannelName));
									$('#' + thisChannelName).find('.program').html(program);
									$('#' + thisChannelName).find('a').css({'color': '#337ab7', 'text-decoration':'none'});
									$('#' + thisChannelName).find('.stream').html('Online <img src="http://www.userlogos.org/files/logos/jumpordie/trakt_01.png" width="30"/>');
									$('#' +thisChannelName).css({'background-color': 'white', 'color': 'black'});
				
			 					
			 					} // end of if data stream isn't null
			 				}); // end of getJSON
						} // end of else if numberChannel !== ''
						else if (nameChannel !== '') {
								let thisChannelName = '';
								let thisChannelNumber = '';
								for (var k = 0; k < channels.length; k++ ) {
								console.log(channels[k].number);
									if (channels[k].name.toLowerCase() == nameChannel.toLowerCase()) {
										thisChannelName = channels[k].name;
										thisChannelNumber = channels[k].number;
									} // end of if
									else {
										counter++;
										if (counter === channels.length) {
										alert('That channel does not exist');
										return false;
										} // end of if
									} // end of else
								} // end of loop
							let hrefString = 'https://www.twitch.tv/' + thisChannelName;
							
							tableContent.innerHTML += '<tr id="'+thisChannelName+'" class="tv-guide-search-channels" >' +'<td >' +'<span class="channel-number" id="'+thisChannelNumber+'">'+thisChannelNumber+ '</span>'+ ' ' +'<a target="_blank" href="'+hrefString+'">' + thisChannelName + '</a>' + ' ' + '<i style="color:red" class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+thisChannelName+'\')"></i>'+ '</td>' + '<td class="program"></td>' + '<td class="stream"> </td>' +'</tr>';
							$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + thisChannelName + '?callback=?', function(data,i) {
			 					
								if (data.stream === null) {
									$('#' + thisChannelName).find('.program').html('N/A');
									$('#' + thisChannelName).find('.stream').html('Offline');
									$('#' +thisChannelName).css({'background-color': 'white', 'color': 'black', 'border-bottom-color': 'white'});
			
								} // end if data stream is null
								 if (data.stream != null) {
									
									let followers = data.stream.channel.followers;
									let language = data.stream.channel.language; 
									let gameStatus = data.stream.channel.status;
									let viewers = data.stream.channel.viewers;
									let views = data.stream.channel.views;
									let url = data.stream.channel.url;
									let logo = data.stream.preview.medium;
	
									program = data.stream.channel.game;
									
									$('#' + thisChannelName).find('.program').html(program);
									$('#' + thisChannelName).find('.stream').html('Online <img src="http://www.userlogos.org/files/logos/jumpordie/trakt_01.png" width="30"/>');
									$('#' + thisChannelName).find('a').css({'color': '#337ab7', 'text-decoration':'none'});
									$('#' +thisChannelName).css({'background-color': 'white', 'color': 'black'});
			
								 } // end if data stream isn't null
			 				}); // end of getJSON
						} // end of else if nameChannel !== ''
					}); // end of channel search submit function
				} // end of else
				$('#add-table-content tr').hover(function() {
					$(this).not('#channel-header').css({'background-color': 'grey', 'color': 'white'});
					$(this).not('#channel-header').find('a').css({'color': 'white', 'text-decoration':'underline'});
				}, function() {
					$(this).not('#channel-header').css({'background-color': 'white', 'color': 'black'});
					$(this).not('#channel-header').find('a').css({'color': '#337ab7', 'text-decoration':'none'});
				});
				/*$('#add-table-content tr').mouseenter(function() {
					$(this).not('#channel-header').css({'background-color': 'grey', 'color': 'white'});
					$(this).not('#channel-header').find('a').css({'color': 'white', 'text-decoration':'underline'});
					//$(this).css({'color':'purple'});
	
				});
				$('#add-table-content tr').mouseleave(function() {
					$(this).not('#channel-header').css({'background-color': 'white', 'color': 'black'});
					$(this).not('#channel-header').find('a').css({'color': '#337ab7', 'text-decoration':'none'});
	
				});*/
			}); // end of search function
				$('#add-table-content tr').hover(function() {
					$(this).not('#channel-header').css({'background-color': 'grey', 'color': 'white'});
					$(this).not('#channel-header').find('a').css({'color': 'white', 'text-decoration':'underline'});
				}, function() {
					$(this).not('#channel-header').css({'background-color': 'white', 'color': 'black'});
					$(this).not('#channel-header').find('a').css({'color': '#337ab7', 'text-decoration':'none'});
				});
				/*$('#add-table-content tr').mouseenter(function() {
					$(this).not('#channel-header').css({'background-color': 'grey', 'color': 'white'});
					$(this).not('#channel-header').find('a').css({'color': 'white', 'text-decoration':'underline'});
					//$(this).css({'color':'purple'});
	
				});
				$('#add-table-content tr').mouseleave(function() {
					$(this).not('#channel-header').css({'background-color': 'white', 'color': 'black'});
					$(this).not('#channel-header').find('a').css({'color': '#337ab7', 'text-decoration':'none'});
	
				});*/
	}); // end of home click function
	$('#remote').mouseenter(function() {
		let counter1 = -1;
		let channelArray = [];
		$('#add-table-content tr').each(function() {
			let id = $(this).find('.channel-number').attr('id');
		
			channelArray.push(parseInt(id));
		});
		let selectedChannelArray = [];
		$('body').keyup(function(key) {

			/*if (counter1 > channelArray.length-1) {
				counter1 = -1;
			}	
			else if (counter1 < 0) {
				counter1 = -1;
			}	*/

			if (key.which === 40) {
				counter1++;

				if ($('#remote').is(':hover') === false) {
					return false;
				}
				else {
					move_up();
					let thisNumber = channelArray[counter1];
					let thisName = $('#' + thisNumber).siblings('a').html();
					let thisClass = $('#' + thisName).attr('class');
					$('#'+ thisName).addClass('selected');
					if (channelArray.includes(thisNumber)) {
					 selectedChannelArray.push(thisNumber);
					 }
					$('#add-table-content tr').not('#' + thisName).removeClass('selected');
					$('#add-table-content tr').not('#' + thisNumber).removeClass('selected');
					if (  thisClass === 'tv-guide-online-channels' || thisClass === 'tv-guide-online-search-channels') {
							console.log('this is an online class');
							showProgramDetails(thisName);
					}
					$('#' + thisName).css({'background-color':'grey', 'color': 'white'});
					$('#' + thisName).find('a').css({ 'color': 'white', 'text-decoration':'underline'});
					$('#add-table-content tr').not('#' + thisName).css({'background-color':'white', 'color': 'black'});
					$('#add-table-content tr').not('#' + thisName).find('a').css({'color': '#337ab7', 'text-decoration': 'none'});
				} // end of else
			} // end of if key === 40
			else if (key.which === 38) {
				counter1--;
				if ($('#remote').is(':hover') === false) {
					return false;
				}
				else {
					move_down();
					let thisNumber = channelArray[counter1];
					let thisName = $('#' + thisNumber).siblings('a').html();
					let thisClass = $('#' + thisName).attr('class');
					if (channelArray.includes(thisNumber)) {
					selectedChannelArray.push(thisNumber);
					}
					$('#'+ thisName).addClass('selected');
					$('#add-table-content tr').not('#' + thisName).removeClass('selected');
					
					if (  thisClass === 'tv-guide-online-channels' || thisClass === 'tv-guide-online-search-channels') {
							showProgramDetails(thisName);
					}
					$('#' + thisName).css({'background-color':'grey', 'color': 'white'});
					$('#' + thisName).find('a').css({ 'color': 'white', 'text-decoration':'underline'});
					$('#add-table-content tr').not('#' + thisName).css({'background-color':'white', 'color': 'black'});
					$('#add-table-content tr').not('#' + thisName).find('a').css({'color': '#337ab7', 'text-decoration': 'none'});	
	
				}
			} // end of else if key === 38
			
				//console.log(counter1);
			}); // end of body keyup function
			$('#enter').click(function() {
		 		let thisNumber = channelArray[counter1];
		
				let thisName = $('#' + thisNumber).siblings('a').html();
				let link = $('#' + thisName).find('a').attr('href');
				$('#enter').parent().attr('href', link);
			}); // end of enter click function
			$('#watch').click(function() {
				
				
				let thisNumber = channelArray[counter1];
				
				let	thisName = $('#' + thisNumber).siblings('a').html();
				
					showProgram(thisName);
				
				
				/*let thisStream = $('#'+ thisName).find('.stream').html();
				console.log(thisNumber);
				let match = thisStream.match(/Offline/);
			
				let counter = 0;
				if (match !== null) {
					counter++;
					if (counter <= 1) {
					alert('This channel is not currently streaming.');
					
					if (counter > 1) {
						self.close;
					}
					
					
					}
				
				}
				else {
				
				
						
							showProgram(thisName);
					
				
				
			
			
				}*/
				
				
		
				}); // end of watch click function
			}); // end of remote mouseenter function
	
		

	

}); //end of document.ready

 function move_up() {
    document.getElementById('tv').scrollTop += 10;
  }
  function move_down() {
    document.getElementById('tv').scrollTop -= 10;
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
	} // getLanguage()
	function getTime(programTime) {
		let time = '';
		let d = new Date();
		let h = d.getHours();
		let m = d.getMinutes();
		let s = d.getSeconds();
		let programMinutes = programTime.slice(14,16);
		programMinutes = parseInt(programMinutes);
		m = programMinutes;
		programTime = programTime.slice(11,13);
		programTime= parseInt(programTime);
		let utc = d.getUTCHours();
		let timeZoneChange = utc - h;
		let timeZoneOffset = d.getTimezoneOffset();
		let differenceInHours = timeZoneOffset/60;
		if (differenceInHours > 0) {
			if ( (programTime - differenceInHours ) < 0) {
				let timeDifference = Math.abs(0 - programTime);
				let convertTime = differenceInHours - timeDifference;
				h = 24 - convertTime;
				
			}
			else {
			h = programTime - differenceInHours;
			}
		}
		else if (differenceInHours === 0) {
			h = h;
		
		}
		else if (differenceInHours < 0) {
			h = programTime + differenceInHours;
			
		}
		if ( h  < 10 && m < 10 ) {
			h = "0" + h;
			m = "0" + m;
			if (h <= 12 && h >= 0 ) {
			
				if ( h === 0 ) {
					time = 12 + ":" + m + "am";
				}
				else {
			 time = h + ":" + m + "am";
			
				}
			
			}
		}
		else if ( h  < 10 ) {
			if ( h < 10) {
			h = "0" + h;
			}
			 if ( m < 10) {
			
			m = "0" + m;
			}
			
			if (h <= 12 && h >= 0 ) {
		
			 time = h + ":" + m + "am";
		
			}
		}
		
		
		else if (h  >= 12 && h <= 24) {
			 if ( m < 10) {
			
			m = "0" + m;
			}
			h -= 12;
			time  = h + ":" + m + "pm";
			
		}
			return time;

	}
	$('#twitch').click(function() {
		 
		$('#tv').html('<div id="content" style="text-align:center;">'+
							'<div id="current-channel" >'+
								'<div class="row">' +
									'<div class="col-md-4" id="current-channel-img" style="">'+
									'</div>'+
									'<div class="col-md-6" id="current-channel-content">'+
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
		).css({'overflow-x':'hidden'});
		 $('#tv').css('background-image','none').removeClass('padding-top');
		$('#tv').css('background', 'linear-gradient(#FAFFFE,#780AE8)');
		$('#current-channel-img').show();
		$('#current-channel-content').show();
		$('#channel-header').show();
		$('#current-channel-img').show();
		$('#channel-header').css({'background-color':'black', 'color': 'white'}).html('<th>Channel</th>' + '<th>Program</th>'+ '<th>Stream</th>' );	

		$('#current-channel-img').css({'height':'200px','background-image':'url("https://www.filepicker.io/api/file/vL2cljiRdefa2gBxqsSV")', 'background-size':'contain','background-repeat':'no-repeat','background-color':'white','background-position':'center center'});

		$('#current-channel-content').html('<h4 class="modal-title">Search for Twitch channels</h4>'+
		'<form id="twitch-form" onsubmit="">' +
			'<input  class="form-control" id="twitch-channel" type="text">'+ '</br>'+
			'<button class="btn btn-info" type="submit">Submit</button>' +
		  '</form>');
		  $('#twitch-channel').focus();
		  $('#twitch-form').submit(saveChannel);
          
	
          
  	}); // end of twitch click function
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
			}
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
	 
			} //end of else
	 
			}); //end of getJson
	} // end of saveChannel()
	function fetchChannels() {
		$('#tv').html('<div id="content" style="text-align:center;">'+
							'<div id="current-channel" >'+
								'<div class="row">' +
									'<div class="col-md-4" id="current-channel-img" style="">'+
									'</div>'+
									'<div class="col-md-6" id="current-channel-content">'+
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
			).css({'overflow-x':'hidden', 'overflow-y':'auto'});
			$('#current-channel-content').show();
			$('#channel-header').show();
			$('#current-channel-img').show();
			let tableContent = document.getElementById('add-table-content');
		
			$('#current-channel-img').css({'height':'200px','background-image':'url("https://www.filepicker.io/api/file/vL2cljiRdefa2gBxqsSV")', 'background-size':'contain','background-repeat':'no-repeat','background-color':'white','background-position':'center center'});
		
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
				let counter1 = 0;
				let numberOfOnlineChannels = [];
				let numberOfOfflineChannels = [];
				let offlineNumberArray = [];
				let channelNumberArray = [];
				for (var i = 0; i < channels.length; i++ ) {
		
		
					let name = channels[i].name;
					let channelNumber = channels[i].number;
					counter1++
					let status = ' ';
					let program = ' ';
					let hrefString = 'https://www.twitch.tv/' + name;
					if ($('.tv-guide-channels').length < channels.length) {
						tableContent.innerHTML += '<tr class="tv-guide-channels" id="'+name+'">' +'<td >' +'<span id ="'+channelNumber+'" class="channel-number">'+channelNumber+'</span>'+ ' ' +'<a target="_blank" href="'+hrefString+'">' +name+' </a>' + ' ' + '<i style="color:red" class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+name+'\')"></i>'+ '</td>' + '<td class="program"> N/A </td>' + '<td class="stream"> Offline </td>' +'</tr>';
					} // end of if
		
					$('#channel-header').css({'background-color':'black', 'color': 'white'}).html('<th>Channel</th>' + '<th>Program</th>'+ '<th>Stream</th>' );
					$.getJSON('https://wind-bow.gomix.me/twitch-api/users/' +name+ '?callback=?', function(data) {
				
						if (data.hasOwnProperty('status')) {
					
							if (data.status === 404) {
						
								$('#' + name).find('.program').html('This channel('+name+') no longer exists');
								$('#' + name).find('.program').html('N/A');
						
							}
					
						}
						else {
					
						}
					}); // end of getJSON
					$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + name + '?callback=?', function(data,i) {
			
						if (data.stream === null) {
						$('#' + name).css({'background-color':'white'});
						counter1++;
							if (numberOfOfflineChannels.includes(name) === false) {
							numberOfOfflineChannels.push(name);
				
							}
							if ($('.tv-guide-channels').length < channels.length) {
				
							}
						}
						else if (data.stream != null) {
							if (numberOfOnlineChannels.includes(name) === false) {
								numberOfOnlineChannels.push(name);
							}
							let followers = data.stream.channel.followers;
							let language = data.stream.channel.language; 
							let gameStatus = data.stream.channel.status;
							let viewers = data.stream.channel.viewers;
							let views = data.stream.channel.views;
							let url = data.stream.channel.url;
							let logo = data.stream.preview.medium;
		
							program = data.stream.channel.game;
							$('#' + name).find('.program').html(program);
							$('#' + name).find('.stream').html('Online <img src="http://www.userlogos.org/files/logos/jumpordie/trakt_01.png" width="30"/>');
							$('#' + name).find('a').css({'color': '#337ab7', 'text-decoration': 'none' });
							$('#' +name).css({'background-color': 'white', 'color': 'black'});
						
						}
						$('#current-channel-content').html('<h3>TV Guide</h3>'+ '</br>'+ '<ul>'+'<li><strong>Channels: </strong>' + channels.length + '</li>' + '<li><strong> Online Channels: </strong>' +'<span class="online-channels">'+ numberOfOnlineChannels.length+ '</span>'+ '</li>' + '<li><strong> Offline Channels: </strong>' + '<span class="offline-channels">'+numberOfOfflineChannels.length+ '</span>'+'</li>' + '</ul>' );
			 
					}); // end of getJSON
				} // end of loop
	
			} // end of else
			$('#search').click(function() {
				
				$('#tv').html('<div id="content" style="text-align:center;">'+
							'<div id="current-channel" >'+
								'<div class="row">' +
									'<div class="col-md-4" id="current-channel-img" style="">'+
									'</div>'+
									'<div class="col-md-6" id="current-channel-content">'+
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
				).css({'overflow-x':'hidden', 'overflow-y':'auto'});;
				$('#tv').css('background-image','none').removeClass('padding-top');
				$('#tv').css('background', 'linear-gradient(#FAFFFE,#780AE8)');
				$('#current-channel-img').css({'height':'200px','background-image':'url("https://www.filepicker.io/api/file/vL2cljiRdefa2gBxqsSV")', 'background-size':'contain','background-repeat':'no-repeat','background-color':'white','background-position':'center center'});
		
				$('#current-channel-img').show();
				if (localStorage.getItem('channels') === null) {
					$('#current-channel-content').html('<h4 class="title">There are currently no Twitch Channels. Please search for one.</h4>'+
					'<form id="twitch-form" onsubmit="">' +
					'<input  class="form-control" id="twitch-channel" type="text">'+ '</br>'+
					'<button class="btn btn-info" type="submit">Submit</button>' +
					'</form>');
					$('#twitch-channel').focus();
					$('#twitch-form').submit(saveChannel);
					console.log('no channels');
				} // end of if
				else if (JSON.parse(localStorage.getItem('channels')).length === 0) {
			
			
					$('#current-channel-content').html('<h4 class="title">There are currently no Twitch Channels. Please search for one.</h4>'+
				'<form id="twitch-form" onsubmit="">' +
				'<input  class="form-control" id="twitch-channel" type="text">'+ '</br>'+
				'<button class="btn btn-info" type="submit">Submit</button>' +
				'</form>');
				$('#twitch-channel').focus();
				$('#twitch-form').submit(saveChannel);
					console.log('no channels but channels array exists');
			
				} // end of else if
				else {
					$('#channel-header').css({'background-color':'black', 'color': 'white'}).html('<th>Channel</th>' + '<th>Program</th>'+ '<th>Schedule</th>' );
					 $('#current-channel-content').html('<form id="channel-search">' + '<div class="form-group">' + '<label> Search by channel number </label>'+ '<input id="search-channel-number" class="form-control" type="number">' + '<label> Search by channel name </label>'+ '<input id="search-channel-name" class="form-control" type="text">'+ '</div>' + '<button type="submit" class="btn btn-primary">Submit</button>'+ '</form>');
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
						console.log(numberChannel);
						let thisChannelNumber = '';
						let counter = 0;
						let channels = JSON.parse(localStorage.getItem('channels'));
						if (numberChannel !== '' && nameChannel !== '' ) {
							alert('You can only search channels by number OR name');
							return false;
						} // end of if
						else if (isNaN(numberChannel) === true) {
							alert('A character other than a number was used. Please only use numbers when searching by channel number.');
							return false;
						} // end of else if
						else if (numberChannel !== '') {
						for (var j = 0; j < channels.length; j++ ) {
								console.log(channels[j].number);
								if (channels[j].number == numberChannel) {
									thisChannelNumber = channels[j];
						
								} // end of if
								else {
									counter++;
									if (counter === channels.length) {
									alert('That channel does not exist');
									return false;
									} // end of if
								} // end of else
							} // end of for loop
							let thisChannelName = thisChannelNumber.name;
							let hrefString = 'https://www.twitch.tv/' + thisChannelName;
				
							tableContent.innerHTML += '<tr id="'+thisChannelName+'" class="tv-guide-search-channels" >' +'<td >' +'<span class="channel-number" id="'+numberChannel+'">'+numberChannel+ '</span>'+ ' ' +'<a target="_blank" href="'+hrefString+'">' + thisChannelName + '</a>' + ' ' + '<i style="color:red" class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+thisChannelName+'\')"></i>'+ '</td>' + '<td class="program"></td>' + '<td class="stream"> </td>' +'</tr>';
							$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + thisChannelName + '?callback=?', function(data,i) {
			 					if (data.stream === null) {
									$('#' + thisChannelName).find('.program').html('N/A');
									$('#' + thisChannelName).find('.stream').html('Offline');
									$('#' +thisChannelName).css({'background-color': 'white', 'color': 'black'});
				
							  	} // end of if data stream is null
			 					if (data.stream != null) {
			 						let followers = data.stream.channel.followers;
									let language = data.stream.channel.language; 
									let gameStatus = data.stream.channel.status;
									let viewers = data.stream.channel.viewers;
									let views = data.stream.channel.views;
									let url = data.stream.channel.url;
									let logo = data.stream.preview.medium;
		
									program = data.stream.channel.game;
									$('#' + thisChannelName).mouseenter(showProgramDetails(thisChannelName));
									$('#' + thisChannelName).find('.program').html(program);
									$('#' + thisChannelName).find('a').css({'color': '#337ab7', 'text-decoration':'none'});
									$('#' + thisChannelName).find('.stream').html('Online <img src="http://www.userlogos.org/files/logos/jumpordie/trakt_01.png" width="30"/>');
									$('#' +thisChannelName).css({'background-color': 'white', 'color': 'black'});
				
			 					
			 					} // end of if data stream isn't null
			 				}); // end of getJSON
						} // end of else if numberChannel !== ''
						else if (nameChannel !== '') {
								let thisChannelName = '';
								let thisChannelNumber = '';
								for (var k = 0; k < channels.length; k++ ) {
								console.log(channels[k].number);
									if (channels[k].name.toLowerCase() == nameChannel.toLowerCase()) {
										thisChannelName = channels[k].name;
										thisChannelNumber = channels[k].number;
									} // end of if
									else {
										counter++;
										if (counter === channels.length) {
										alert('That channel does not exist');
										return false;
										} // end of if
									} // end of else
								} // end of loop
							let hrefString = 'https://www.twitch.tv/' + thisChannelName;
							
							tableContent.innerHTML += '<tr id="'+thisChannelName+'" class="tv-guide-search-channels" >' +'<td >' +'<span class="channel-number" id="'+thisChannelNumber+'">'+thisChannelNumber+ '</span>'+ ' ' +'<a target="_blank" href="'+hrefString+'">' + thisChannelName + '</a>' + ' ' + '<i style="color:red" class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+thisChannelName+'\')"></i>'+ '</td>' + '<td class="program"></td>' + '<td class="stream"> </td>' +'</tr>';
							$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + thisChannelName + '?callback=?', function(data,i) {
			 					
								if (data.stream === null) {
									$('#' + thisChannelName).find('.program').html('N/A');
									$('#' + thisChannelName).find('.stream').html('Offline');
									$('#' +thisChannelName).css({'background-color': 'white', 'color': 'black', 'border-bottom-color': 'white'});
			
								} // end if data stream is null
								 if (data.stream != null) {
									
									let followers = data.stream.channel.followers;
									let language = data.stream.channel.language; 
									let gameStatus = data.stream.channel.status;
									let viewers = data.stream.channel.viewers;
									let views = data.stream.channel.views;
									let url = data.stream.channel.url;
									let logo = data.stream.preview.medium;
	
									program = data.stream.channel.game;
									$('#' + thisChannelName).mouseenter(showProgramDetails(thisChannelName));
									$('#' + thisChannelName).find('.program').html(program);
									$('#' + thisChannelName).find('.stream').html('Online <img src="http://www.userlogos.org/files/logos/jumpordie/trakt_01.png" width="30"/>');
									$('#' + thisChannelName).find('a').css({'color': '#337ab7', 'text-decoration':'none'});
									$('#' +thisChannelName).css({'background-color': 'white', 'color': 'black'});
			
								 } // end if data stream isn't null
			 				}); // end of getJSON
						} // end of else if nameChannel !== ''
					}); // end of channel search submit function
				} // end of else
				$('#add-table-content tr').mouseenter(function() {
					$(this).not('#channel-header').css({'background-color': 'grey', 'color': 'white'});
					$(this).not('#channel-header').find('a').css({'color': 'white', 'text-decoration':'underline'});
					//$(this).css({'color':'purple'});
	
				});
				$('#add-table-content tr').mouseleave(function() {
					$(this).not('#channel-header').css({'background-color': 'white', 'color': 'black'});
					$(this).not('#channel-header').find('a').css({'color': '#337ab7', 'text-decoration':'none'});
	
				});
			}); // end of search function
			$('#add-table-content tr').mouseenter(function() {
				$(this).not('#channel-header').css({'background-color': 'grey', 'color': 'white'});
					$(this).not('#channel-header').find('a').css({'color': 'white', 'text-decoration':'underline'});
	
				});
				$('#add-table-content tr').mouseleave(function() {
					$(this).not('#channel-header').css({'background-color': 'white', 'color': 'black'});
					$(this).not('#channel-header').find('a').css({'color': '#337ab7', 'text-decoration':'none'});
	
				});
	} // end of fetchChannels()
	function deleteChannel(name) {

		let channels = JSON.parse(localStorage.getItem('channels'));
		for (var i = 0; i < channels.length; i++) {
			if (channels[i].name == name) {
				let confirmation = confirm('Are you sure you want to delete this channel?');
				if (confirmation === true) {
				channels.splice(i,1);
				}
			}
		}
		localStorage.setItem('channels', JSON.stringify(channels));
		fetchChannels();
	} // end of deleteChannel()
		
	function showProgram(name) {
		$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + name + '?callback=?', function(data) {
		
			let tvHeight = $('#tv').height();
			let tvWidth = $('#tv').width();
			$('#tv').html('<iframe src="http://player.twitch.tv/?channel='+name+'" height="'+tvHeight+'" frameborder="" width="'+tvWidth+'"  allowfullscreen="yes"></iframe>').css({'overflow':'hidden'});
			$('#current-channel-img').hide();
			$('#current-channel-content').hide();
			$('#channel-header').hide();
		
		}); // end of getJSON
		
	} // end of showProgramLogo(name)
	function showProgramDetails(name) {
		$.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + name + '?callback=?', function(data) {
		
			let followers = data.stream.channel.followers;
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
		
			$('#current-channel-img').css({'background-size': 'cover','background-image': 'url("'+logo+'")'});
			$('#current-channel-content').html('<h3>' + program + '</h3>' + '<ul>' + '<li><strong> Program Status:</strong> ' + programStatus + '</li>' + '<li><strong>  Language: </strong> ' + language + '</li>'  + '<li><strong>  Views:</strong>  ' + views + '</li>' + '<li><strong>  Viewers:</strong>  ' + viewers + '</li>' + '</ul>');
		
		
		}); // end of getJSON
		
	} // end of showProgramLogo(name)
	
	
	