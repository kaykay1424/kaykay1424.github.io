/*
	Explanation of program:
	
    Once the page loads, the home screen is shown where any saved Twitch channels along with the
    Free Code Camp channel can be seen; on this screen the user can see which/how many channels are
    currently streaming. By clicking on the online button on the remote, the online screen will be
    shown where additional details about programs currently being streamed can be seen by hovering
    over the channel with the cursor or selecting the channel with the remote (pressing the up/down
    arrow keys while hovering on the remote with the cursor) to select the channel. Clicking on the
    search button will take the user to the search screen allow where he or she can search for a
    saved Twitch channel by number or name. Clicking on the Twitch button will take the user to the
    Twitch screen where he or she can search for a Twitch channel to save to their browser's local
    storage. Clicking on the go back up button will scroll the tv screen up to the top.On any screen,
    clicking on the channel name or clicking the enter button after selecting the channel with the
    remote will open up the channel's page in a new browser window and clicking the red x icon next
    to the channel name or clicking the delete button after selecting the channel with the remote
    will delete any saved channel.
	
*/	
	
	let selectChannelCounter = -1; // counter increments/decrements based on pressing up/down keys 
		
	let channelNumberArray = []; 
	
	let numberOfOnlineChannels = [];
			
	let numberOfOfflineChannels = [];
	
	let allChannels = []; // stores channels from local storage along with Free Code Camp channel

	getChannelInfo();
	
	$('[data-toggle="popover"]').popover(); 
	
	$('#online').click(getOnlineChannels);
		
	$('#home').click(getChannels);
	
	$('#back-up').click(function() {
	    
	    $('#tv').scrollTop(0); // scroll back to top of tv screen
	
	});
	
	$('#twitch').click(function() {
		 
		showRegularScreen();
		
		let tableContent = document.getElementById('add-table-content');
    
        tableContent.innerHTML = ''; // clear table content so only channel rows added are related to screen shown (Twitch screen)
		
		$('#current-channel-img').attr({"src":"images/twitch-icon.png", "alt":"image of Twitch icon"});
		
		$('#channel-header').html('<th>Channel</th><th>Program</th><th>Stream</th>' );	

		$('#current-channel-content').html('<form id="twitch-form"><label for="twitch-channel">Search for Twitch channels</label><input class="form-control" id="twitch-channel" type="text" /><br/><button class="btn" type="submit">Submit</button></form>');
		
        $('#twitch-channel').focus();

        $('#twitch-form').submit(saveChannel);
            
  	}); // end of $('#twitch').click()
	
	$('#search').click(searchFunction);
	
	$('#enter').click(function(e) {
	    
		let channelNumber = channelNumberArray[selectChannelCounter]; 

		let channelName = $('#' + channelNumber).siblings('a').html(); 
		
		channelName = channelName.replace(/\s+/g, ''); // remove spaces

		let channelLink = $('#' + channelName).find('a').attr('href');
		
	    let selected = $('#' + channelName).css('background-color'); // background color of table row (channel) indicates if channel has been selected
	    
	    // if channel's background color is not grey (color indicating channel has been selected)
	    
		if (selected !== 'rgb(128, 128, 128)') {

            alert("Please select a channel in order to go to that channel's page by using the up/down arrow keys while hovering on the remote.");
		    
		    return false;
		
		}
		
		// open up channel's page in new window 
		
		$('#enter').parent().attr('href', channelLink);
		
	}); // end of $('#enter').click()
	
	$('#delete').click(function() {
	
		let channelNumber = channelNumberArray[selectChannelCounter];
		
		let channelName = $('#' + channelNumber).parents('tr').attr('id');
		
		channelName = channelName.replace(/\s+/g, ''); // remove spaces
		
		let selected = $('#' + channelName).css('background-color'); // background color of table row (channel) indicates if channel has been selected
	    
	    // if channel's background color is grey (color indicating channel has been selected)
		
		if (selected === 'rgb(128, 128, 128)') {
		
		    // Free Code Camp is main channel and cannot be deleted 
		
		    if (channelName !== "FreeCodeCamp") { 
		
		        deleteChannel(channelName);
		
            }
        
            else {
            
                alert('This channel (FreeCodeCamp) cannot be deleted.');
            
            }
		
		} // end of if (selected === 'rgb(128, 128, 128)')
		
		// if channel's background color is not grey (color indicating channel has been selected)
		
		else {
		    
		    alert("Please select a channel to delete by using the up/down arrow keys while hovering on the remote.");
		    
		}

	}); // end of $('#delete').click()
	
	$('body').keyup(function(key) {

	    // if selectChannelCounter has reached end or beginning of channelNumberArray set selectChannelCounter to -1 so when down key is pressed it will select first channel (beginning of channelNumberArray)
			
        if (selectChannelCounter === channelNumberArray.length || selectChannelCounter < 0) {
    
            selectChannelCounter = -1;
        
        }
    
        if (key.which === 40) { // down arrow

            if ($('#remote').is(':hover') === false) {
                
                return false;
            
            }
            
            else {
                
                selectChannelCounter++;
                
                selectNextChannel();
                
                highlightChannel();

            } // end of else
            
        } // end of if (key.which === 40)
        
        else if (key.which === 38) { // up arrow
            
            if ($('#remote').is(':hover') === false) {
            
                return false;
            
            }
            
            else {
            
                selectChannelCounter--;
            
                selectPreviousChannel();
                
                highlightChannel();

            }
            
        } // end of else if (key.which === 38)

	}); // end of $('body').keyup()

	function selectPreviousChannel() {
	
	    let channelNumber = channelNumberArray[selectChannelCounter];

		let channelName = $('#' + channelNumber).siblings('a').html();
		
		channelName = channelName.replace(/\s+/g, ''); // remove spaces
        
        let topInputId = 'top-input-'+ channelName;
        
	    $("#top-input-" + channelName).focus(); // focus on top input so that all of channel can be seen (as opposed to just seeing bottom portion of channel)
	    
	    
	
	} // end of selectChannel()
	
	function selectNextChannel() {
	
	    let channelNumber = channelNumberArray[selectChannelCounter];

		let channelName = $('#' + channelNumber).siblings('a').html();
		
		channelName = channelName.replace(/\s+/g, ''); // remove spaces
		
		$('#bottom-input-'+channelName).focus(); // focus on bottom input so that all of channel can be seen (as opposed to just seeing top portion of channel)
		
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
		
				lang = 'Aletic';
		
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
		
		let time;
		
		let d = new Date();
		
		let h = d.getHours();
		
		let s = d.getSeconds();
		
		let programMinutes = programTime.slice(14,16);
		
		programMinutes = parseInt(programMinutes);
		
		m = programMinutes;
		
		programTime = programTime.slice(11,13);
		
		programTime = parseInt(programTime);
		
		let timeZoneOffset = d.getTimezoneOffset();
		
		let differenceInHours = timeZoneOffset/60; // difference between local time and UTC time	
		
		// if local time zone is behind  UTC time zone 
									
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
		
		// if local time zone is same as UTC time zone
		
		else if (differenceInHours === 0) {
			
			h = h;
		
		}
		
		// if local time zone is ahead of UTC time zone
		
		else if (differenceInHours < 0) { 
			
			h = programTime + differenceInHours; 
			
		}
		
		if (h < 12 && h >= 0 ) {
		
			if ( m < 10) {
			
			    m = "0" + m;
			
			}

            if ( h === 0 ) {
                
                time = 12 + ":" + m + "am";
            
            }
            
            else {
         
                time = h + ":" + m + "am";
        
            }
	
		} // if (h < 12 && h >= 0 )

		else if (h  >= 12 && h < 24) {
			 
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
		
		twitchChannel = twitchChannel.replace(/\s+/g, ''); // remove any spaces
		
		$.getJSON('https://wind-bow.gomix.me/twitch-api/users/' +twitchChannel+ '?callback=?', function(data) {
		
			if (data.hasOwnProperty('status')) {
		
				if (data.status === 404) {  // user can't be found
		
					alert('This channel ('+twitchChannel+') could not be found.');
		
					return false;
		
				}
		
				else if (data.status === 422) { // unprocessable entity
		
					alert('This channel ('+twitchChannel+') may have been deactivated or deleted.');
		
					return false;
		
				}
		
				else  {
		
					alert('An error has occurred. Please try again.');
		
					return false;
		
				}
		
			} // end of if (data.hasOwnProperty('status')) 
		
			else {
		
				let displayName = data.display_name;
				
				let channel;
				
				let channels;
				
				let channelNumber;

				if ( localStorage.getItem('channels') === null) {
		
					channelNumber = 2; // start at 2 since first channel is Free Code Camp (1)
		
					channel = {
		
						name: displayName,
						
						number: channelNumber
					
					}
					
					channels = [];	
	
				}
				
                else {
                    
                    channels = JSON.parse(localStorage.getItem('channels'));
    
                    if (channels.length === 0 ) {
                
                        channelNumber = 2; // start at 2 since first channel is Free Code Camp (1)
                
                        channel = {
                
                            name: displayName,
                
                            number: channelNumber
                
                        }

                        channels = [];	

                    }
            
                    else if (channels.length > 0) {
                
                        for (let j = 0; j < channels.length; j++ ) {
                    
                            if (channels[j].name.toLowerCase() === twitchChannel.toLowerCase()) { // if channel has already been saved
                    
                                alert('This channel ('+twitchChannel+') has already been saved.');
                    
                                return false;
        
                            }
                            
                            else if (twitchChannel.toLowerCase() === "freecodecamp") {
                            
                                alert('This channel ('+twitchChannel+') already exists.'); // Free Code Camp is first channel
                    
                                return false;
                                
                            }
                
                        } // end of loop

                        let lastNumber = channels[channels.length-1].number;
                
                        channelNumber = lastNumber + 1; // make this channel's number be one more than last channel's number
            
                        channel = {
            
                            name: displayName,
            
                            number: channelNumber
            
                        }
                
                    } // end of if (channels.length > 0)
            
                    
            
                
                } // end of else
                
                channels.push(channel);
                
                localStorage.setItem('channels', JSON.stringify(channels));
    
                $('#twitch-form')[0].reset();

                // gather this channel's streaming info and add it to allChannels array

                $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + displayName + '?callback=?', function(data) {
    
                    checkStreamingStatus(displayName, data, channelNumber,true,1);

                }); // end of $.getJSON()
	 
			} // end of else
	 
		}); // end of $.getJson()
		
	} // end of saveChannel()
	
	function deleteChannel(name) {
	
	    let channels = JSON.parse(localStorage.getItem('channels'));
		
		for (let i = 0; i < channels.length; i++) {

			if (name === channels[i].name) {
				
				let confirmation = confirm('Are you sure you want to delete  this channel (' + name + ')?');
		
				if (confirmation === true) {
		
					channels.splice(i,1);
					
					allChannels.splice(i+1, 1); // allChannels array always has 1 more channel than channels array because allChannels array includes Free Code Camp
		
				}
		
			} // end of if (channels[i].name == name)
		
		} // end of for loop
		
		localStorage.setItem('channels', JSON.stringify(channels));
		
		getChannels();

	} // end of deleteChannel()
	
	function checkIfChannelExists(name, data, arrayPos,collectChannelCounter,numChannels ) {
	
	    if (data.hasOwnProperty('status')) {
	    
            if (data.status === 422) {
            
                allChannels[arrayPos].streamingStatus = 'deleted';
        
            }
        
            else {
            
                allChannels[arrayPos].streamingStatus = 'error';
        
            }
        
        } // end of if (data.hasOwnProperty('status'))
        
        if (numChannels > 1) {  // if multiple channels are being added at once
        
            if (collectChannelCounter === allChannels.length+1) {
                    
                getChannels();
                        
            }
        
        } // end of if (numChannels > 1)
        
        else { // if only 1 channel is being added (when Twitch channel is saved by user)
            
            getChannels();
        
        }
	
	} // end of checkIfChannelExists
	   
    let collectChannelCounter = 0; // increments when checkStreamingStatus is called to keep track of how many channels have been added to allChannels array (only used when gathering data on all channels once page loads)
	
	function checkStreamingStatus(name, data, channelNumber, userStatus, numChannels) {
	  
	    channelLink = 'https://www.twitch.tv/' + name;
	    
	    if (data.stream === null) {
        
            let channel = {
        
                channelName: name,
        
                streamingStatus: 'offline',
        
                url: channelLink,
        
                number: channelNumber
        
            }
     
            allChannels.push(channel);

        } 
                
        else if (data.stream !== null) {

            let channel = {
        
                channelName: name,
                
                streamingStatus: 'online',
        
                language: data.stream.channel.language,
    
                gameStatus: data.stream.channel.status,
    
                viewers: data.stream.viewers,
    
                views : data.stream.channel.views,
    
                url: data.stream.channel.url,
    
                preview : data.stream.preview.medium,

                program : data.stream.channel.game,

                createdAt: data.stream.created_at,
        
                number: channelNumber
    
            }
    
            allChannels.push(channel);
    
        }

        collectChannelCounter++;
        
        let arrayPos = allChannels.length-1;
    
        if (userStatus === true) { // user status has already been checked
    
            getChannels(); 
            
        }
        
        else {
            
             $.getJSON('https://wind-bow.gomix.me/twitch-api/users/' + name + '?callback=?', function(data) { // gather user data for each channel

                checkIfChannelExists(name, data, arrayPos,collectChannelCounter,numChannels );
                    
            });
        
        }
	
	} // end of checkStreamingStatus()
	
	function getChannelInfo() {
				
        let storedChannels = localStorage.getItem('channels');
        
        let channels;
        
        if (storedChannels !== null) {
        
            channels = JSON.parse(localStorage.getItem('channels'));
        
        }
        
        // gather streaming info for Free Code Camp separately as it is not a stored channel (in local storage)
        
        let name = "FreeCodeCamp";
        
        let channelNumber = 1;
        
         $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + name + '?callback=?', function(data) {
         
            if (storedChannels !== null) {
                
                checkStreamingStatus(name, data, channelNumber, false, channels.length +1);
            
            }
            
            else {
            
                checkStreamingStatus(name, data, channelNumber, false, 1);
            
            }

        }); // end of $.getJSON()
        
        if (storedChannels !== null) {
        
            for (let i = 0; i < channels.length; i++ ) {

                let name = channels[i].name;
            
                let channelNumber = channels[i].number;
            
                // gather streaming info for each stored channel (in local storage)
            
                $.getJSON('https://wind-bow.gomix.me/twitch-api/streams/' + name + '?callback=?', function(data) {

                    checkStreamingStatus(name, data, channelNumber, channels.length +1);

                }); // end of $.getJSON()
            
            } // end of loop
        
        }

	} // end of getChannelInfo()
	
	function showRegularScreen() {
	
	    // this returns screen back to normal if online screen is shown with no online channels

		$('#tv').css('background-image','none').removeClass('padding-top');
		
		$('#current-channel').show();
		
	} // end of showRegularScreen()
	
    function sortChannels(channel1,channel2) {
    
        // order channels by smallest to biggest
        
        return channel1.number - channel2.number;
        
    }
	
	function getChannels() {
		
		showRegularScreen();
		
		let storedChannels = localStorage.getItem('channels');
		
        let channels;
		
		if (storedChannels !== null) {
		
		    channels = JSON.parse(localStorage.getItem('channels'));
		
		}
		
		$('#current-channel-img').attr({"src":"images/home-icon.png", "alt":"image of home icon"});
		
        let tableContent = document.getElementById('add-table-content');

        $('#channel-header').html('<th>Channel</th><th>Program</th><th>Stream</th>' );
        
        tableContent.innerHTML = ' '; // clear table content so only channel rows added are related to screen shown (home screen)
    
        selectChannelCounter= -1; // set selectChannelCounter to -1 so when down key is pressed it will select first channel (beginning of channelNumberArray)
        
        channelNumberArray = []; // empty channelNumberArray so channels stored are only ones shown on this screen (home screen)
        
        numberOfOnlineChannels = [];
			
	    numberOfOfflineChannels = [];
	    
	    let allChannelsLength;

        allChannels.sort(sortChannels);
        
        for (let i = 0; i < allChannels.length; i++ ) {

            let name = allChannels[i].channelName;
            
            let channelNumber = allChannels[i].number;
            
            let url = allChannels[i].url;
            
            // add an input to top and bottom of td field (whichever one will likely have longest amount of content) of channel row so so channel can be focused on (by focusing on input in channel row) when using up/down keys to select a channel
            
            let topInputId = "top-input-" + name; 

            let bottomInputId = "bottom-input-" + name;
            
             if (allChannels[i].streamingStatus === 'offline') {
            
                tableContent.innerHTML += '<tr class="tv-guide-channels" id="'+name+'"><td ><input id="'+topInputId +'" class="focus-channel" type="text" /><span id ="'+channelNumber+'" class="channel-number">'+channelNumber+'</span><a target="_blank" href="'+url+'"> ' +name+ ' </a><i class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+name+'\')"></i><input id="'+bottomInputId+'" class="focus-channel" type="text" /></td><td class="program"> N/A </td><td class="stream"> Offline </td></tr>';
                
                if (name === "FreeCodeCamp") {
                    
                    $('#'+name).find('.glyphicon-remove-circle').remove(); // remove delete icon as Free Code Camp is main channel and cannot be deleted 
                
                }
                
                numberOfOfflineChannels.push(name);
                
            }
            
            else if (allChannels[i].hasOwnProperty('program')) {
            
                let program = allChannels[i].gameStatus;
                
                numberOfOnlineChannels.push(name);
            
                tableContent.innerHTML += '<tr class="tv-guide-channels" id="'+name+'"><td ><span id ="'+channelNumber+'" class="channel-number">'+channelNumber+'</span> <a target="_blank" href="'+url+'"> ' +name+' </a> <i class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+name+'\')"></i></td><td class="program"><input id="'+topInputId+'" class="focus-channel" type="text" />'+ program+ '<input id="'+bottomInputId+'" class="focus-channel" type="text" /></td><td class="stream"> Online <img src="images/tv-icon.png" width="20" alt="image of TV"/> </td></tr>';
            
                if (name === "FreeCodeCamp") {
                    
                    $('#'+name).find('.glyphicon-remove-circle').remove(); // remove delete icon as Free Code Camp is main channel and cannot be deleted 
                
                }
            
            } // end of else if (allChannels[i].hasOwnProperty('program'))
            
            else if (allChannels[i].streamingStatus == 'deleted') {
            
                tableContent.innerHTML += '<tr class="tv-guide-channels" id="'+name+'"><td ><input id="'+topInputId+'" class="focus-channel" type="text" /><span id ="'+channelNumber+'" class="channel-number">'+channelNumber+'</span> '+ name + ' <i class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+name+'\')"></i>'+ '<input id="'+bottomInputId+'" class="focus-channel" type="text" /></td></td><td class="program"> N/A </td><td class="stream"> This channel ('+name+') may have been deactivated or deleted. </td></tr>';
                
                numberOfOfflineChannels.push(name);
                
                 if (name === "FreeCodeCamp") {
                    
                    $('#'+name).find('.glyphicon-remove-circle').remove(); // remove delete icon as Free Code Camp is main channel and cannot be deleted 
                
                }
            
            } // end of if (allChannels[i].streamingStatus == 'deleted')
            
            else if (allChannels[i].streamingStatus === 'error') {
            
                tableContent.innerHTML += '<tr class="tv-guide-channels" id="'+name+'"><td ><input id="'+topInputId+'" class="focus-channel" type="text" /><span id ="'+channelNumber+'" class="channel-number">'+channelNumber+'</span> '+ name + ' <i class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+name+'\')"></i>'+ '<input id="'+bottomInputId+'" class="focus-channel" type="text" /></td></td><td class="program"> N/A </td><td class="stream"> There was an error while gathering information on this channel ('+name+').</td></tr>';
                
                numberOfOfflineChannels.push(name);
                
                 if (name === "FreeCodeCamp") {
                    
                    $('#'+name).find('.glyphicon-remove-circle').remove(); // remove delete icon as Free Code Camp is main channel and cannot be deleted 
                
                }
            
            } // end of if (allChannels[i].streamingStatus === 'error') 

            channelNumberArray.push(channelNumber);
            
        } // end of loop
 
        highlightChannelsOnHover();
        
        if (storedChannels !== null) {
        
            allChannelsLength = channels.length + 1; // number of all channels will be number of channels stored in local storage (channels array) plus 1 for Free Code Camp which is not stored 
        
        }
        
        else {
        
            allChannelsLength = 1; // if there are no stored channels in local storage, number of all channels will be 1 as only 1 channel (Free Code Camp) is already added (not in local storage)
        
        }
        
        $('#current-channel-content').html('<h1 class="text-center">All Channels</h1></br><ul><li><b>Channels: </b>' + allChannelsLength + '</li><li><b> Online Channels: </b><span class="online-channels">'+ numberOfOnlineChannels.length+ '</span></li><li><b> Offline Channels: </b><span class="offline-channels">'+numberOfOfflineChannels.length+ '</span></li></ul>' );
			
	} // end of getChannels()
	
	function getOnlineChannels() {
		
		showRegularScreen();
		
		$('#current-channel-img').attr({"src":"images/online-icon.png", "alt":"image of online icon"});
	
		$('#current-channel-content').html('<h1 class="text-center">Online Channels</h1><p>Hover over a channel to view more details about the program currently being streamed.' );			
	
		$('#channel-header').html('<th>Channel</th><th>Program</th><th>Schedule</th>' );
		
		let tableContent = document.getElementById('add-table-content');
		
		tableContent.innerHTML = ' '; // clear table content so only channel rows added are related to screen shown (online screen)
		
		let numberOfOnlineChannels = [];
		
		let numberOfOfflineChannels = [];
		
		channelNumberArray = []; // empty channelNumberArray so channels stored are only ones shown on this screen (online screen)
		
		selectChannelCounter= -1; // set selectChannelCounter to -1 so when down key is pressed it will select first channel (beginning of channelNumberArray)
		
		allChannels.sort(sortChannels);

        for (let i = 0; i < allChannels.length; i++ ) {

            let name = allChannels[i].channelName;
            
            let channelNumber = allChannels[i].number;
            
            let url = allChannels[i].url;
            
             // add an input to top and bottom of td field (whichever one will likely have longest amount of content) of channel row so so channel can be focused on (by focusing on input in channel row) when using up/down keys to select a channel
            
            let topInputId = "top-input-" + name; 

            let bottomInputId = "bottom-input-" + name;
           
            if (allChannels[i].streamingStatus === 'offline' || allChannels[i].streamingStatus === 'deleted' || allChannels[i].streamingStatus === 'error') {

                numberOfOfflineChannels.push(name);

            }
            
            else if (allChannels[i].hasOwnProperty('program')) {
            
                let program = allChannels[i].gameStatus;
                
                let schedule = getTime(allChannels[i].createdAt);
                
                numberOfOnlineChannels.push(name);
            
                tableContent.innerHTML += '<tr id="'+name+'" class="tv-guide-online-channels" onmouseover="showProgramDetails(\''+name+'\')" ><td ><span class="channel-number" id="'+channelNumber+'">'+channelNumber+'</span> <a target="_blank" href="'+url+'"> ' + name + ' </a> <i class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+name+'\')"></i></td><td class="program"><input id="'+topInputId+'" class="focus-channel" type="text" />'+program+'<input id="'+bottomInputId+'" class="focus-channel" type="text" /></td> <td class="schedule">'+schedule+'</td></tr>';
		        
		         if (name === "FreeCodeCamp") {
                    
                    $('#'+name).find('.glyphicon-remove-circle').remove(); // remove delete icon as Free Code Camp is main channel and cannot be deleted 
                
                }
		        
		        let thisNumber = $('#' + name).find('.channel-number').html();

                channelNumberArray.push(thisNumber); // only add channel numbers from channels that are currently streaming to channelNumberArray as these channels are shown on online screen
            
            }
            
            // if there are no channels currently streaming
            
            if (numberOfOfflineChannels.length === allChannels.length) {
                
                $('#current-channel').hide();
                
                $('#channel-header').html('<h1 class="no-signal text-center">No live streams at this time</h1>');
                
                $('#tv').css({'background-image': 'url("https://upload.wikimedia.org/wikipedia/commons/4/4e/Hanoverbars.png")', 'background-size':'100% 100%'}).addClass('padding-top');
    
            }
            
        } // end of loop
		
		highlightChannelsOnHover();
	
	} // end of getOnlineChannels()
	
	function searchFunction() {
	
		showRegularScreen();
		
		$('#current-channel-img').attr({"src":"images/search-icon.png", "alt":"image of search icon"});
	
        $('#current-channel-content').html('<form id="channel-search-form"><div class="form-group"><label> Search by channel number </label><input id="search-channel-number" class="form-control" type="number"></div><div class="form-group"><label> Search by channel name </label><input id="search-channel-name" class="form-control" type="text"></div><button type="submit" class="btn">Submit</button></form>');
        
        $('#channel-header').html('<th>Channel</th>' + '<th>Program</th>'+ '<th>Stream</th>' );
        
        $('#search-channel-number').focus();
        
        let tableContent = document.getElementById('add-table-content');
    
        tableContent.innerHTML = ''; // clear table content so only channel rows added are related to screen shown (search screen)
					
        $('#channel-search-form').on('submit', function(e) {
            
            e.preventDefault();
            
            let tableContent = document.getElementById('add-table-content');
        
            tableContent.innerHTML = ''; // clear table content so only channel row added is searched channel
            
            let channelNumber = $('#search-channel-number').val();
            
            let channelName = $('#search-channel-name').val();
            
            channelName = channelName.replace(/\s+/g, ''); // remove spaces
            
            let thisChannel; // channel that matches search 
            
            let counter = 0; // counts number of channels that don't match search 
            
            channelNumberArray = []; // empty channelNumberArray so channels stored are only ones shown on this screen (search screen)
            
            selectChannelCounter= -1; // set selectChannelCounter to -1 so when down key is pressed it will select first channel (beginning of channelNumberArray)
            
            // if number and name was used to search for channel
            
            if (channelNumber !== '' && channelName !== '' ) {
                
                alert('You can only search channels by number OR name.');
                
                return false;
            
            } 
            
            // if number was used to search for channel
							
            else if (channelNumber !== '') {
                
                for (let j = 0; j < allChannels.length; j++ ) {
                    
                    if (allChannels[j].number == channelNumber) {
                        
                        thisChannel = allChannels[j];									
        
                    } 
                    
                    // this channel number doesn't match number searched
                    
                    else {
                    
                        counter++;
                        
                        if (counter === allChannels.length) {
                        
                            alert('That channel does not exist.');
                        
                            return false;
                        
                        } // end of if (allChannels[j].number == channelNumber)
                        
                    } // end of else
                    
                } // end of for loop
								
                let thisChannelName = thisChannel.channelName;
                
                channelNumberArray.push(channelNumber);
                
                channelLink = 'https://www.twitch.tv/' + thisChannelName;
                
                 // add an input to top and bottom of td field (whichever one will likely have longest amount of content) of channel row so so channel can be focused on (by focusing on input in channel row) when using up/down keys to select a channel
            
                let topInputId = "top-input-" + thisChannelName; 

                let bottomInputId = "bottom-input-" + thisChannelName;
                
                $('#channel-header').html('<th>Channel</th>' + '<th>Program</th>'+ '<th>Stream</th>' );
                
                if (thisChannel.hasOwnProperty('program')) {
                
                    let schedule = getTime(thisChannel.createdAt); // show (local) time channel started streaming
                    
                    let program = thisChannel.gameStatus;
                    
                    $('#channel-header').html('<th>Channel</th><th>Program</th><th>Schedule</th>' );
                    
                    tableContent.innerHTML += '<tr id="'+thisChannelName+'" class="tv-guide-online-search-channels"  onmouseover="showProgramDetails(\''+thisChannelName+'\')" >' +'<td >' +'<span class="channel-number" id="'+channelNumber+'">'+channelNumber+ '</span> '+ ' <a target="_blank" href="'+channelLink+'"> ' + thisChannelName + ' </a> <i class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+thisChannelName+'\')"></i></td><td class="program" ><input id="'+topInputId+'" class="focus-channel" type="text" />'+program+'<input id="'+bottomInputId+'" class="focus-channel" type="text" /></td><td class="schedule">'+schedule+' </td></tr>';
    
                    if (thisChannelName === "FreeCodeCamp") {
        
                        $('#'+thisChannelName).find('.glyphicon-remove-circle').remove(); // remove delete icon as Free Code Camp is main channel and cannot be deleted 
    
                    }
                
                } // end of if (thisChannel.hasOwnProperty('program'))
                
                else if (thisChannel.streamingStatus === 'offline') {
        
                    tableContent.innerHTML += '<tr class="tv-guide-search-channels" id="'+thisChannelName+'"><td ><input id="'+topInputId+'" class="focus-channel" type="text" /><span id ="'+channelNumber+'" class="channel-number">'+channelNumber+'</span> <a target="_blank" href="'+channelLink+'"> ' +thisChannelName+' </a> <i class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+thisChannelName+'\')"></i> <input id="'+bottomInputId+'" class="focus-channel" type="text" /></td><td class="program"> N/A </td><td class="stream"> Offline </td></tr>';

                    if (thisChannelName === "FreeCodeCamp") {
        
                        $('#'+thisChannelName).find('.glyphicon-remove-circle').remove(); // remove delete icon as Free Code Camp is main channel and cannot be deleted 
    
                    }
                
                } // end of if (thisChannel.streamingStatus === 'offline')
                
                else if (thisChannel.streamingStatus === 'deleted') {

                    tableContent.innerHTML += '<tr class="tv-guide-search-channels" id="'+thisChannelName+'"><td ><input id="'+topInputId+'" class="focus-channel" type="text" /><span id ="'+channelNumber+'" class="channel-number">'+channelNumber+'</span> ' + thisChannelName +  ' <i class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+thisChannelName+'\')"></i><input id="'+bottomInputId+'" class="focus-channel" type="text" /></td><td class="program"> N/A </td><td class="stream"> This channel('+name+') may have been deactivated or deleted. </td></tr>';
                    
                    if (thisChannelName === "FreeCodeCamp") {
        
                        $('#'+thisChannelName).find('.glyphicon-remove-circle').remove(); // remove delete icon as Free Code Camp is main channel and cannot be deleted 
    
                    }
                
                } // end of if (thisChannel.streamingStatus === 'deleted')
                
                else if (thisChannel.streamingStatus === 'error') {
            
                    tableContent.innerHTML += '<tr class="tv-guide-search-channels" id="'+thisChannelName+'"><td ><input id="'+topInputId+'" class="focus-channel" type="text" /><span id ="'+channelNumber+'" class="channel-number">'+channelNumber+'</span> ' +thisChannelName+ ' <i class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+thisChannelName+'\')"></i><input id="'+bottomInputId+'" class="focus-channel" type="text" /></td><td class="program"> N/A </td><td class="stream"> There was an error while gathering information on this channel ('+thisChannelName+').</td></tr>';
                    
                    if (thisChannelName === "FreeCodeCamp") {
        
                        $('#'+thisChannelName).find('.glyphicon-remove-circle').remove(); // remove delete icon as Free Code Camp is main channel and cannot be deleted 
    
                    }
                
                } // end of if (thisChannel.streamingStatus === 'error')
            
            } // end of else if (channelNumber !== '') 
            
            // if name was used to search for channel
							
            else if (channelName !== '') {
        
                for (let k = 0; k < allChannels.length; k++ ) {
        
                    if (allChannels[k].channelName.toLowerCase() == channelName.toLowerCase()) {
                
                        thisChannel = allChannels[k];
                
                    } // end of if
                    
                    // this channel name doesn't match name searched
            
                    else {
            
                        counter++;
                
                        if (counter === allChannels.length) {
                
                            alert('That channel does not exist.');
                    
                            return false;
                    
                        } // end of if (counter === allChannels.length)
                
                    } // end of else
            
                } // end of loop
                
                let thisChannelNumber = thisChannel.number;
                
                let thisChannelName = thisChannel.channelName;
						
                channelLink = 'https://www.twitch.tv/' + channelName;
                
                // add an input to top and bottom of td field (whichever one will likely have longest amount of content) of channel row so so channel can be focused on (by focusing on input in channel row) when using up/down keys to select a channel
            
                let topInputId = "top-input-" + thisChannelName; 

                let bottomInputId = "bottom-input-" + thisChannelName;
                
                channelNumberArray.push(thisChannelNumber);
                
                $('#channel-header').html('<th>Channel</th>' + '<th>Program</th>'+ '<th>Stream</th>' );
        
                if (thisChannel.hasOwnProperty('program')) {
                
                    let schedule = getTime(thisChannel.createdAt); // show (local) time channel started streaming
                    
                    let program = thisChannel.gameStatus; 
                    
                    $('#channel-header').html('<th>Channel</th>' + '<th>Program</th>'+ '<th>Schedule</th>' );
                    
                    tableContent.innerHTML += '<tr id="'+thisChannelName+'" class="tv-guide-online-search-channels"  onmouseover="showProgramDetails(\''+thisChannelName+'\')" ><td ><span class="channel-number" id="'+thisChannelNumber+'">'+thisChannelNumber+ '</span> <a target="_blank" href="'+channelLink+'"> ' + thisChannelName + ' </a> <i class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+thisChannelName+'\')"></i></td><td class="program" ><input id="'+topInputId+'" class="focus-channel" type="text" />'+program+'<input id="'+bottomInputId+'" class="focus-channel" type="text" /></td><td class="schedule">'+schedule+' </td></tr>';
                    
                     if (thisChannelName === "FreeCodeCamp") {
        
                        $('#'+channelName).find('.glyphicon-remove-circle').remove(); // remove delete icon as Free Code Camp is main channel and cannot be deleted
    
                    }
                
                } // end of if (thisChannel.hasOwnProperty('program'))
							
                else if (thisChannel.streamingStatus === 'offline') {

                    tableContent.innerHTML += '<tr class="tv-guide-search-channels" id="'+thisChannelName+'"><td ><input id="'+topInputId+'" class="focus-channel" type="text" /><span id ="'+thisChannelNumber+'" class="channel-number">'+thisChannelNumber+'</span> <a target="_blank" href="'+channelLink+'"> ' +thisChannelName+' </a> <i class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+thisChannelName+'\')"></i><input id="'+bottomInputId+'" class="focus-channel" type="text" /></td><td class="program"> N/A </td><td class="stream"> Offline </td></tr>';

                    if (thisChannelName === "FreeCodeCamp") {
        
                        $('#'+thisChannelName).find('.glyphicon-remove-circle').remove(); // remove delete icon as Free Code Camp is main channel and cannot be deleted
    
                    }
                
                } // end of if (thisChannel.streamingStatus === 'offline')
                
                else if (thisChannel.streamingStatus === 'deleted') {

                    tableContent.innerHTML += '<tr class="tv-guide-search-channels" id="'+thisChannelName+'"><td ><input id="'+topInputId+'" class="focus-channel" type="text" /><span id ="'+thisChannelNumber+'" class="channel-number">'+thisChannelNumber+'</span> ' + thisChannelName + ' <i class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+thisChannelName+'\')"></i><input id="'+bottomInputId+'" class="focus-channel" type="text" /></td><td class="program"> N/A </td><td class="stream"> This channel('+thisChannelName+') may have been deactivated or deleted. </td></tr>';
                    
                    if (thisChannelName === "FreeCodeCamp") {
        
                        $('#'+thisChannelName).find('.glyphicon-remove-circle').remove(); // remove delete icon as Free Code Camp is main channel and cannot be deleted
    
                    }
                
                
                } // end of if (thisChannelName === "FreeCodeCamp")
                    
                else if (thisChannel.streamingStatus === 'error') {
            
                    tableContent.innerHTML += '<tr class="tv-guide-search-channels" id="'+thisChannelName+'"><td ><input id="'+topInputId+'" class="focus-channel" type="text" /><span id ="'+thisChannelNumber+'" class="channel-number">'+thisChannelNumber+'</span> ' +thisChannelName+ + ' <i class="glyphicon glyphicon-remove-circle" onclick="deleteChannel(\''+thisChannelName+'\')"></i>'+ '<input id="'+bottomInputId+'" class="focus-channel" type="text" /></td><td class="program"> N/A </td><td class="stream"> There was an error while gathering information on this channel ('+thisChannelName+').</td></tr>';
                    
                    if (thisChannelName === "FreeCodeCamp") {
        
                        $('#'+thisChannelName).find('.glyphicon-remove-circle').remove(); // remove delete icon as Free Code Camp is main channel and cannot be deleted
    
                    }
                    
                } // end of if (thisChannel.streamingStatus === 'error')
            
            } // end of else if (channelName !== '')
					
			highlightChannelsOnHover();

		}); // end of channel search submit function
					
	} // end of searchFunction()
	
	function highlightChannel() {
					
		let channelNumber = channelNumberArray[selectChannelCounter];

		let channelName = $('#' + channelNumber).siblings('a').html();
		
		channelName = channelName.replace(/\s+/g, ''); // remove spaces

		let thisClass = $('#' + channelName).attr('class');
					
		if (thisClass === 'tv-guide-online-channels' || thisClass === 'tv-guide-online-search-channels') {

			showProgramDetails(channelName);

		}

		$('#' + channelName).css({'background-color':'grey', 'color':'white'});
	
		$('#' + channelName).find('a').css({'color':'white', 'text-decoration': 'underline'});
	
		$('#add-table-content tr').not('#' + channelName).css({'background-color':'white', 'color':'black'});
	
		$('#add-table-content tr').not('#' + channelName).find('a').css({'color': '#337ab7', 'text-decoration': 'none'});	
				
	} // end of highlightChannel()
	
	function highlightChannelsOnHover() {
		
		$('#add-table-content tr').hover(function() { 
		
		    let number = $(this).find('.channel-number').html();
		    
		    number = parseInt(number);
		    
		    let index = channelNumberArray.indexOf(number); 
		    
		    selectChannelCounter = index;  // set selectChannelCounter to number that corresponds to channel's position in channelNumberArray so if channel is selected using keys (instead of mouse cursor), channels will be selected starting from last channel that was hovered on 
					
			$(this).not('#channel-header').css({'background-color':'grey', 'color':'white'});
			
			$(this).not('#channel-header').find('a').css({'color':'white', 'text-decoration': 'underline'});
			
			$('#add-table-content tr').not(this, '#channel-header').css({'background-color':'white', 'color':'black'});
			
			$('#add-table-content tr').not(this, '#channel-header').find('a').css({'color': '#337ab7', 'text-decoration': 'none'});	
		
		}, function() {
			
			$(this).not('#channel-header').css({'background-color':'white', 'color':'black'});
			
			$(this).not('#channel-header').find('a').css({'color': '#337ab7', 'text-decoration': 'none'});	
		
		});
		
	}
	
	function showProgramDetails(name) {

	    for (let i = 0; i < allChannels.length; i++) {
	    
	        if (allChannels[i].channelName === name) {
	            
	            let language = allChannels[i].language;
	            
	            language = getLanguage(language);
	            
	            let program = allChannels[i].gameStatus;
			
                let viewers = allChannels[i].viewers;
        
                let views = allChannels[i].views;
        
                let preview = allChannels[i].preview;

                $('#current-channel-img').attr({"src":preview, "alt": "image of program: "+program});
            
                $('#current-channel-content').html('<h1 class="text-center">'+name+'</h1><ul><li><b>Program:</b> '+program+
            
                '<b><li>Viewers:</b> '+viewers+'</li><li><b>Views:</b> '+views+
            
                '</li><li><b>Language:</b> '+language+ '</li></ul>');
	        
	        }
	    
	    } // end of for loop

	} // end of showProgramDetails()
	
	
	/* Responsive Design */

	function responsive() {
	
	    // make all elements fit within height (if screenHeight is big enough) of window so all content (except for content on tv screen) can be seen without scrolling down

		let screenHeight = $(window).height();
		
		$('.carpet-row').height(screenHeight * .40); 
		
		let carpetRowHeight = $('.carpet-row').height();
		
		$('.tv-row').height(screenHeight * .55);
		
		let tvRowHeight = $('.tv-row').height();
		
		$('#tv-div').height(tvRowHeight *.80).css({'margin-top':tvRowHeight * .05 + 'px', 'margin-bottom':tvRowHeight * .05 + 'px'});
        
        $('#painting').height(tvRowHeight * .30).css({'margin-top':tvRowHeight * .05 + 'px'});
		
		$('.baseboard-row').height(screenHeight * .05);
		
		$('#table').height(carpetRowHeight/2);
	
		let tableHeight = $('#table').height();
	
		let tableWidth = $('#table').width();
	
		$('#remote').css({'max-height':tableHeight-20+ 'px','width': tableWidth/3});
		
		$('.controls').css({'height':tableHeight/7+ 'px','width': tableWidth/7});

	} // end of responsive()
	
	responsive();
	
	$(window).resize(responsive);
