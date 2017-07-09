/*
	Explanation of program:
	
	The user can bookmark a site saving it in their browser's local storage by submitting the form
	on the page. The name of the website will be displayed in a list of bookmarks (also saved
	in the local storage) that the user can access by clicking on the bookmark in the upper right hand corner.
	He or she can then click on the website name to open that site up in a new window,
	 the red X button to delete that website from the list, or click the plus button to open the website up
	in a frame on the page (if there is no same origin policy preventing the website from being loaded). A user
	can delete the website frame, minimize it, or increase/decrease the width and height. Once a frame is minimized
	the user can show it again by clicking on the button in the right hand corner that appears after a frame is minimized
	 and clicking the website name. If there are no more minimized frames that box will disappear.  
	
	If there are no bookmark designs saved in the browser's local storage,
	the default design will be displayed. He or she can design their own bookmark by clicking on
	the edit button below the bookmark and submitting the form that is displayed after clicking the
	edit button. If the user has saved a bookmark design their latest design will be fetched from
	the local storage and displayed.
	

	 
	 
	
*/	
	$(document).ready(function() {
	
	$('#bookmark-form')[0].reset();
	$('#bookmark-icon-form')[0].reset();
	
	if (localStorage.getItem('bookmarkIcons') !== null && localStorage.getItem('bookmarkIcons')!== null) {

		fetchBookmarkIcons();
		deleteBookmarkIcons();
		fetchBookmarks();
		let screenWidth = $(window).width();
		$('.bookmark-icon').css({'max-width': screenWidth/4 + 'px'});
		
		
		}
		
	else if (localStorage.getItem('bookmarkIcons') === null && localStorage.getItem('bookmarkIcons')  === null) {
		let screenWidth = $(window).width();
		$('.bookmark-icon').css({'width': '60px',
		'max-width': screenWidth/4 + 'px',
		'height': '110px',
		'background-image': 'url("http://www.parisattitude.com/images/monuments.jpg")',
		'background-size': 'cover',
		'background-position': 'center center',
		'border': '5px solid purple',
		'box-shadow':'2px 2px 5px black'});
		
   		
	}
	
	else if (localStorage.getItem('bookmarkIcons')  === null && localStorage.getItem('bookmarkIcons')  !== null )  {
		let screenWidth = $(window).width();
		$('.bookmark-icon').css({'width': '60px',
		'max-width': screenWidth/4 + 'px',
		'height': '110px',
		'background-image': 'url("http://www.parisattitude.com/images/monuments.jpg")',
		'background-size': 'cover',
		'background-position': 'center center',
		'border': '5px solid purple',
		'box-shadow':'2px 2px 5px black'});
		
   		fetchBookmarks();
   		
   		
	}

	else if (localStorage.getItem('bookmarkIcons') === null && localStorage.getItem('bookmarkIcons')  !== null) {
		fetchBookmarkIcons();
		deleteBookmarkIcons();
		let screenWidth = $(window).width();
		$('.bookmark-icon').css({'max-width': screenWidth/4 + 'px'});
		
		
	}

	
	
	
	}); //end of document ready

	$('.bookmark-icon').click(function() {
		fetchBookmarks();
	
	});
	
	$('[data-toggle="popover"]').popover();
	
	
	
	$('#bookmark-icon-form').on('submit', changeBookmark);
	
	$('.background-options').mouseenter(function() {
		$('#background-options-hr').css({'border-color': 'blue'});
	});
	
	$('.background-options').mouseleave(function() {
		$('#background-options-hr').css({'border-color': 'grey'});
	});
	
	$('.bookmark-options').mouseenter(function() {
		$('#bookmark-options-hr').css({'border-color': 'blue'});
	});
	
	$('.bookmark-options').mouseleave(function() {
		$('#bookmark-options-hr').css({'border-color': 'grey'});
	});
	
	$('.border-options').mouseenter(function() {
		$('#border-options-hr').css({'border-color': 'blue'});
	});
	
	$('.border-options').mouseleave(function() {
		$('#border-options-hr').css({'border-color': 'grey'});
	});
	
	$('.bookmark-icon').click(function() {
		$('#button-design').toggle();

	});


	var backgroundImage = '';
	let bookmarkCounter = 0;
	
	$('#button-design').click(function() {
		$('.alert-danger').hide();
		$('#bookmark-icon-form input, #bookmark-icon-form select ').removeClass('error');
	
	});

	function changeBookmark(e) {
		e.preventDefault();
		 if (!validateBookmarkIconsForm()) {
				return false;
			 }
		let bgColor = $('#bg-color').val();
		let bgImage = $('#bg-image').val();
		let borderColor = $('#border-color').val();
		let borderStyle = $('#border-style').val();
		let borderWidth = $('#border-width').val();
		let bgSize = $('#bg-size').val();
		let bgSizeWidth = $('#bg-size-width').val();
		let bgSizeHeight = $('#bg-size-height').val();
		let bgRepeat = $('#bg-repeat').val();
		let bgPosition = $('#bg-position').val();
		let bookmarkSizeWidth = $('#bookmark-size-width').val();
		let bookmarkSizeHeight = $('#bookmark-size-height').val();
		
		let bookmarkIcon = {
				"background-color": bgColor,
				"background-image": bgImage,
				"border-color": borderColor,
				"border-style": borderStyle,
				"border-width": borderWidth,
				"background-size": bgSize,
				"background-size-width": bgSizeWidth,
				"background-size-height": bgSizeHeight,
				"background-repeat": bgRepeat,
				"background-position": bgPosition,
				"bookmark-size-width": bookmarkSizeWidth,
				"bookmark-size-height": bookmarkSizeHeight
			 }
		
		 if (localStorage.getItem('bookmarkIcons') === null) {
			let bookmarkIcons = [];
			bookmarkIcons.push(bookmarkIcon);
			console.log(bookmarkIcons);
			localStorage.setItem('bookmarkIcons', JSON.stringify(bookmarkIcons));
		 } else {
			let bookmarkIcons = JSON.parse(localStorage.getItem('bookmarkIcons'));
			bookmarkIcons.push(bookmarkIcon);
			localStorage.setItem('bookmarkIcons', JSON.stringify(bookmarkIcons));
		 }
		fetchBookmarkIcons();
		
	} // end of changeBookmark()
	
	function fetchBookmarkIcons() {

		let bookmarkIcons = JSON.parse(localStorage.getItem('bookmarkIcons'));
		let length = bookmarkIcons.length-1;
	
		for (i = 0; i < bookmarkIcons.length; i++) {

			let backgroundColor = bookmarkIcons[length]["background-color"];
			let borderColor = bookmarkIcons[length]["border-color"];
			let borderStyle = bookmarkIcons[length]["border-style"];
			let borderWidth = bookmarkIcons[length]["border-width"];
			let bgSize = bookmarkIcons[length]["background-size"];
			let bgSizeWidth = bookmarkIcons[length]["background-size-width"];
			let bgSizeHeight = bookmarkIcons[length]["background-size-height"];
			let bgRepeat = bookmarkIcons[length]["background-repeat"];
			let bgPosition = bookmarkIcons[length]["background-position"];
			let bookmarkWidth = bookmarkIcons[length]["bookmark-size-width"];
			let bookmarkHeight = bookmarkIcons[length]["bookmark-size-height"];
			backgroundImage = bookmarkIcons[length]["background-image"];
			
			if (bgSize === 'none') {
				$('.bookmark-icon').css({'background-size': bgSizeWidth + 'px' + ' ' + bgSizeHeight +'px' });
			}
			
			else if (bgSize === 'cover') {
				$('.bookmark-icon').css({'background-size': 'cover' });

			}
				
			else if (bgSize === 'contain') {
				$('.bookmark-icon').css({'background-size': 'contain' });
				}

			$('.bookmark-icon').css({'width': bookmarkWidth+'px', 'height':
			bookmarkHeight+'px','background-position': bgPosition, 'background-color':
			backgroundColor,'background-image':'url('+backgroundImage+')','background-repeat': bgRepeat,'border-color': borderColor,
			'border-style':borderStyle,'border-width': borderWidth+'px', 'box-shadow': '2px 2px 5px black'});

		}

	} // end of fetchBookmarkIcons()

	function validateBookmarkIconsForm() {
		let screenWidth = $(window).width();
		let bgSize = $('#bg-size').val();
		let bgSizeWidth = $('#bg-size-width').val();
		let bgSizeHeight = $('#bg-size-height').val();
		let borderColor = $('#border-color').val();
		let borderStyle = $('#border-style').val();
		let borderWidth = $('#border-width').val();
		let bgColor = $('#bg-color').val();
		let bgImage = $('#bg-image').val();
		let bookmarkSizeWidth = $('#bookmark-size-width').val();
		let bookmarkSizeHeight = $('#bookmark-size-height').val();
		let status = '';
		let backgroundStatus = '';
		let bookmarkStatus = '';
		let borderStatus = '';
		let sizeStatus = '';
		
		
		
		
		if (bgImage.length !== 0 && ((bgSizeWidth.length !== 0 && bgSizeHeight.length !== 0 && bgSize === 'none') || (bgSize !== 'none' && bgSizeWidth.length === 0 && bgSizeHeight.length === 0 ))) {
			backgroundStatus = true;
			$('#background-errors').hide();
			$('#bg-size, #bg-size-width,#bg-size-height, #bg-color, #bg-image').removeClass('error');
		}
		else if (bgColor !== 'transparent' && (bgSizeWidth.length === 0 && bgSizeHeight.length === 0 && bgSize === 'none')) {
			backgroundStatus = true;
			$('#background-errors').hide();
			$('#bg-size, #bg-size-width,#bg-size-height, #bg-color, #bg-image').removeClass('error');
		}
		else {
			backgroundStatus = false;
			
			$('#background-errors').show();
			$('#bg-size, #bg-size-width,#bg-size-height, #bg-color, #bg-image').addClass('error');
		}
		
		if (bookmarkSizeWidth.length !== 0 && bookmarkSizeHeight.length !== 0 ) {
			bookmarkStatus = true;
			$('#bookmark-errors').hide();
			$('#bookmark-size-height, #bookmark-size-width').removeClass('error');
		}
		
		else {
			bookmarkStatus = false;
			$('#bookmark-errors').show();
			$('#bookmark-size-height, #bookmark-size-width').addClass('error');
		}
		
		if (bgSizeWidth.length !== 0 || bgSizeHeight.length !== 0) {
			if (bgSizeWidth > bookmarkSizeWidth || bgSizeHeight > bookmarkSizeHeight ) {
				sizeStatus = false;
				$('#background-size-errors').html('The background size (width/height) of the image cannot be bigger than the bookmark size (width: '+bookmarkSizeWidth+'/height: '+bookmarkSizeHeight+'). Please decrease the width <strong>and/or</strong> height of the image background.').show();
				$('#bg-size-width,#bg-size-height, #bookmark-size-height, #bookmark-size-width').addClass('error');
			}
		
			else {
				sizeStatus = true;
				$('#background-size-errors').hide();
				$('#bg-size-width,#bg-size-height, #bookmark-size-height, #bookmark-size-width').removeClass('error');
			}
		}
		
		
		if (borderColor !== 'transparent' || borderStyle !== 'none' || borderWidth.length !== 0  ) {
				 
					
				if (borderColor !== 'transparent' &&  borderStyle !== 'none' && borderWidth.length !== 0) {
						borderStatus = true;
						$('#border-errors').hide();
						$('#border-color, #border-style,#border-width').removeClass('error');
					
					
						
					
						
				}
				else {
				borderStatus = false;
				$('#border-errors').show();
				$('#border-color, #border-style,#border-width').addClass('error');
				}
		
		}
		
		
		if (borderWidth.length !== 0) {
			if (borderWidth > (screenWidth/4) - bookmarkSizeWidth) {
				let goodBorderSize  = screenWidth/4 - bookmarkSizeWidth;
				$('#border-size-errors').html('The border width must be less than or equal to ' + goodBorderSize + '. Please decrease the size.').show();
				$('#border-width').addClass('error');
				sizeStatus = false;
			}
			else {
				sizeStatus = true;
				$('#border-size-errors').hide();
				$('#border-width').removeClass('error');
			}
		
		}
		
		if (backgroundStatus === true && bookmarkStatus === true ) {
			if (borderStatus !== '') {
				if ( borderStatus === true) {
					console.log(1);
					return true;
				}
				else {
					console.log(2);
				return false;
				}
			}
			if (sizeStatus !== '') {
				if ( sizeStatus === true) {
					return true;
				}
				else {
					return false;
				}
			
			}
			else {
				console.log(3);
		 		return true;
			}
		}
		else {
			console.log(4);
			return false;
		}
		
	//console.log(borderStatus);	
		
	} // end of validateBookmarkIconsForm()

	function deleteBookmarkIcons() {

		let bookmarkIconsNull = localStorage.getItem('bookmark-icons');
		let bookmarkIcons = '';
		if (bookmarkIconsNull != null) {
			let bookmarkIcons = JSON.parse(localStorage.getItem('bookmark-icons'));
			let fullLength = bookmarkIcons.length;
			let spliceLength = fullLength-10;
			
			for (let i = 0; i < bookmarkIcons.length; i++ ) {
			
				if (bookmarkIcons.length > 10) {

				bookmarkIcons.splice(i+1, spliceLength)
				}
			
			}
		
		}
		
		localStorage.setItem('bookmark-icons', JSON.stringify(bookmarkIcons));
		fetchBookmarkIcons();
		
	} // end of deleteBookmarkIcons()

	$("#bookmark-form").on('submit', saveBookmark);

    function saveBookmark(e) {
		e.preventDefault();
	  	websiteName = $("#siteName").val();
	 	websiteURL = $("#siteURL").val();

	 	/*if (!validateForm(websiteName, websiteURL)) {
			return false;
	 	}*/
	 	
		let bookmark = {
			name: websiteName,
			url: websiteURL
		 }

		 if (localStorage.getItem('bookmarks') === null) {
			let bookmarks = [];
			bookmarks.push(bookmark);
			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		 } 
		 
		 else {
			let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
			bookmarks.push(bookmark);
			localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		 }
	 
		fetchBookmarks();
		$('#bookmark-form')[0].reset();


    } // end of saveBookmark()
        
	function minimizeFrame(url,name) {
		let frame = $('iframe[src="'+url+'"]');
		bookmarkCounter++;
		//$('#minimized-bookmark-amount').html(bookmarkCounter);
		frame.parent().hide();
		let bookmarkStorage = document.getElementById('bookmark-storage');
		$('#minimize-bar').show();
		$('#bookmark-storage-ul').append('<li style="font-size: 16px">' +
		'<span class="bookmark-li" name="'+name+'" onclick="showFrame(\'' + url + '\',\'' + name + '\')">' +name+ '</span>' + '</li>');
		
	} // end of minimizeFrame()

	function showFrame(url,name) {
		bookmarkCounter--;
		//$('#minimized-bookmark-amount').html(bookmarkCounter);
		$('iframe[src="'+url+'"]').parent().show();
		let text = $('.bookmark-li').text();
		$('.bookmark-li[name="'+name+'"]').parent().remove();
		
		if (bookmarkCounter === 0) {
			$('#minimize-bar').hide();
		}
	} // end of showFrame()

	function decreaseWidth(url) {
		$('iframe[src="'+url+'"]').animate({width: "-=100px"});
	} 
	
	function increaseWidth(url) {
		let frameWidth = $('iframe[src="'+url+'"]').width();
		let widthNumber = parseInt(frameWidth);
		let screenWidth = $(window).width();
		if (frameWidth < screenWidth -100) {
			$('iframe[src="'+url+'"]').animate({width: "+=100px"});
		}
		/*if (widthNumber < 1300) {
			$('iframe[src="'+url+'"]').animate({width: "+=100px"});
		}*/
		
		else {
			return false;
		}

	} // end of increaseWidth()
	
	function decreaseHeight(url) {
		let frameHeight = $('iframe[src="'+url+'"]').css("height");
		let heightNumber = parseInt(frameHeight);
		
		if (heightNumber > 200) {
		$('iframe[src="'+url+'"]').animate({height: "-=100px"});
		
		}
	}
	
	function increaseHeight(url) {
		$('iframe[src="'+url+'"]').animate({height: "+=100px"});
	}
	
	function addFrame(url,name) {
		
		
		let bookmarksResults = $('#bookmarksResults');
		
		if ($('#bookmarksResults .frame-wrapper .frame-name:contains('+name+')').length !== 0) {
			alert('You have already opened up a frame from that website');
			return false;
		}
		let screenHeight = $(window).height();
		let iframeHeight = screenHeight/2 +'px';
		
		bookmarksResults.append('<div class="frame-wrapper col-md-12 ">' +
		'<div class="pull-left size-wrapper" style="" title="Size control. W is for width. H is for height. Or if your browser allows you can drag the frame to control size.">'+ '<span id="width-increase" class="size" onclick="increaseWidth(\''+url+'\')" onmouseover="hoverInWidthIncrease(\''+url+'\')" onmouseout="hoverOutWidthIncrease(\''+url+'\')"> W+ </span>'+ '</br>'+
		'<span id="width-decrease" class="size" onclick="decreaseWidth(\''+url+'\')" onmouseover="hoverInWidthDecrease(\''+url+'\')" onmouseout="hoverOutWidthDecrease(\''+url+'\')"> W- </span>'+ '</br>'+ '<span id="height-increase" class="size" onclick="increaseHeight(\''+url+'\')" onmouseover="hoverInHeightIncrease(\''+url+'\')" onmouseout="hoverOutHeightIncrease(\''+url+'\')"> H+ </span>' + '</br>'+
		'<span id="height-decrease" class="size" onclick="decreaseHeight(\''+url+'\')" onmouseover="hoverInHeightDecrease(\''+url+'\')" onmouseout="hoverOutHeightDecrease(\''+url+'\')"> H- </span>' + '</div>'+ '<div class="move-frame">'+ '<span id="span-remove" class="badge" onclick="deleteFrame(\''+url+'\')" onmouseover="hoverInRemove(\''+url+'\')" onmouseout="hoverOutRemove(\''+url+'\')" style="background-color:red;color:white;margin-right:2px;box-shadow:2px 2px 2px black;">&times; </span>' + '<span id="span-minimize" class="badge" style="background-color:orange;color:white;margin-right:2%;box-shadow:2px 2px 2px black;" onmouseover="hoverInMinimize(\''+url+'\')" onmouseout="hoverOutMinimize(\''+url+'\')" onclick="minimizeFrame(\'' + url + '\',\'' + name + '\')"> &#8722; </span>' +
		'<span class="frame-name" style="font-size:16px;font-weight:bold">' +' '+name+'</span>'+ '</div>' + '<iframe src="'+url+'"></iframe>' + '</div>');

		$('.alert').show();

		$('iframe').height(iframeHeight);
		
	} // end of addFrame()
	
	function hoverInRemove(url) {
		$('iframe[src="'+url+'"]').siblings('.move-frame').children('#span-remove').css({'background-color':'white', 'color':'red'});

	}
	function hoverOutRemove(url) {
		$('iframe[src="'+url+'"]').siblings('.move-frame').children('#span-remove').css({'background-color':'red', 'color':'white'});

	}
	function hoverInMinimize(url) {
		$('iframe[src="'+url+'"]').siblings('.move-frame').children('#span-minimize').css({'background-color':'white', 'color':'orange'});

	}
	function hoverOutMinimize(url) {
		$('iframe[src="'+url+'"]').siblings('.move-frame').children('#span-minimize').css({'background-color':'orange', 'color':'white'});

	}

	function hoverInWidthIncrease(url) {
		$('iframe[src="'+url+'"]').siblings('.size-wrapper').children('#width-increase').css({ 'color':'lightgrey'});

	}
	function hoverOutWidthIncrease(url) {
		$('iframe[src="'+url+'"]').siblings('.size-wrapper').children('#width-increase').css({'color':'white'});

	}
	function hoverInWidthDecrease(url) {
		$('iframe[src="'+url+'"]').siblings('.size-wrapper').children('#width-decrease').css({ 'color':'lightgrey'});

	}
	function hoverOutWidthDecrease(url) {
		$('iframe[src="'+url+'"]').siblings('.size-wrapper').children('#width-decrease').css({'color':'white'});

	}
	function hoverInHeightIncrease(url) {
		$('iframe[src="'+url+'"]').siblings('.size-wrapper').children('#height-increase').css({ 'color':'lightgrey'});

	}
	function hoverOutHeightIncrease(url) {
		$('iframe[src="'+url+'"]').siblings('.size-wrapper').children('#height-increase').css({'color':'white'});

	}
	function hoverInHeightDecrease(url) {
		$('iframe[src="'+url+'"]').siblings('.size-wrapper').children('#height-decrease').css({ 'color':'lightgrey'});

	}
	function hoverOutHeightDecrease(url) {
		$('iframe[src="'+url+'"]').siblings('.size-wrapper').children('#height-decrease').css({'color':'white'});

	}

	function deleteFrame(url) {
		$('iframe[src="'+url+'"]').parent().remove();

	}
	function deleteBookmark(url) {
		let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		
		for (let i = 0; i < bookmarks.length; i++) {
			if (bookmarks[i].url == url) {
			bookmarks.splice(i,1);
			
			}
		}

		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		fetchBookmarks();

	}

        function fetchBookmarks() {
        	let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
       

        	let bookmarkButton = document.getElementById('list-group');
        	bookmarkButton.innerHTML = '';
        	
        	for (let i = 0; i < bookmarks.length; i++) {
        		let name = bookmarks[i].name;
        		let url = bookmarks[i].url;



        		bookmarkButton.innerHTML +=

        		    '<li class="list-group-item">'+
        		  '<a target="_blank" href="'+url+'">'+name+'</a>' +
        		    '<a href="#" onclick="deleteBookmark(\''+url+'\')">' + ' <span class="glyphicon glyphicon-remove"></span>' + '</a>' +
        		   '<a  href="#">' + ' <span onclick="addFrame(\'' + url + '\',\'' + name + '\')" class="glyphicon glyphicon-plus"></span>' + '</a>' +
        		   '</li>' ;
        		  

        	}

        } // end of fetchBookmarks()

		let screenWidth = $(window).width();
	let screenHeight = $(window).height();
	let iframeHeight = screenHeight/2;
	
	let borderWidth = $('.bookmark-icon').css('border-width');
	let bookmarkSizeWidth = $('.bookmark-icon').width();
	$('#bookmark-size-width').attr({'max': screenWidth/4, 'value': (screenWidth/4)});
	$('#bookmark-size-height').attr({'max': screenHeight/2, 'value': (screenHeight/2)});
	$('.bookmark-icon').css({'max-width': screenWidth/4 + 'px'});
	if (borderWidth > (screenWidth/4) - bookmarkSizeWidth) {
	$('.bookmark-icon').css({'border-width': (screenWidth/4) - bookmarkSizeWidth + 'px'});
	
	}
	if (screenWidth < 200) {
			$('#bookmark-icon-form button[type="button"]').removeClass('pull-right').css({'margin-top':'5%'});;
	}
	else {
			$('#bookmark-icon-form button[type="button"]').addClass('pull-right').css({'margin-top':0});;
		}
	
	$(window).resize(function() {
		
		let screenWidth = $(window).width();
		let screenHeight = $(window).height();
		let borderWidth = $('.bookmark-icon').css('border-width');
		let bookmarkSizeWidth = $('.bookmark-icon').width();
		$('#bookmark-size-width').attr({'max': screenWidth/4, 'value': (screenWidth/4)});
		$('#bookmark-size-height').attr({'max': screenHeight/2, 'value': (screenHeight/2)});
		
		$('.bookmark-icon').css({'max-width':screenWidth/4 + 'px'});
		$('iframe').height(screenHeight/2);
		if (borderWidth > (screenWidth/4) - bookmarkSizeWidth) {
			$('.bookmark-icon').css({'border-width': (screenWidth/4) - bookmarkSizeWidth + 'px'});
	
			}
		if (screenWidth < 200) {
			$('#bookmark-icon-form button[type="button"]').removeClass('pull-right').css({'margin-top':'5%'});
		}
		else {
			$('#bookmark-icon-form button[type="button"]').addClass('pull-right').css({'margin-top':0});
		}
	});

