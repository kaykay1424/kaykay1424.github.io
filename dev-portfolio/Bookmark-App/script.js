/*
	Explanation of program:
	
    The user can bookmark a site saving it in their browser's local storage by submitting the
    form on the page. The name of the website will be displayed in a list of saved bookmarks that the
    user can access by clicking on the bookmark in the upper right hand corner. He or she can then
    click on the website name to open that site up in a new window or click the red X button to
    delete that website from the list.

    If there are no bookmark designs saved in the browser's local storage, the default design
    will be displayed. He or she can design their own bookmark by clicking on the edit button below
    the bookmark and submitting the form that is displayed after clicking the edit button. If the
    user has saved a bookmark design, their latest design will be fetched from the browser's local
    storage and displayed.
	
*/	

$(document).ready(function() {
	
	if (localStorage.getItem('bookmarkIcons') !== null && localStorage.getItem('bookmarks') !== null) {

		fetchBookmarkIcons();
		
		deleteBookmarkIcons();
		
		fetchBookmarks();
		
	}
	
	else if (localStorage.getItem('bookmarkIcons')  === null && localStorage.getItem('bookmarks')  !== null )  {

   		fetchBookmarks();
   		
	}

	else if (localStorage.getItem('bookmarks') === null && localStorage.getItem('bookmarkIcons')  !== null) {
		
		fetchBookmarkIcons();
		
		deleteBookmarkIcons();
		
	}
	
	$('[data-toggle="popover"]').popover();
	
	$('#bookmark-form')[0].reset();
	
	$('#bookmark-icon-form')[0].reset();
	
	$('a').click(function(e) {
	    
	    e.preventDefault();
	
	});
	
	$('#bookmark-icon-form').on('submit', changeBookmark);
	
	$("#bookmark-form").on('submit', saveBookmark);
	
	$('.bookmark-icon').click(function() {
	
	    if (localStorage.getItem('bookmarks') !== null) {
	    
	        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
	        
	        if (bookmarks.length === 0) {
	        
	            alert('There are no bookmarks saved.');
	        }
	        
	        else {
	
                fetchBookmarks();
            
                $('#button-design').toggle();
		    
		    }
		
		} // end of if (localStorage.getItem('bookmarks') !== null)
		
		else {
		    
		    alert('No bookmarks have been added.');
		
		}

	});
	
	$('.background-options').hover(function() {
	
		$('#background-options-hr').css({'border-color': '#1159D7'}); // #1159D7: blue color
		
	}, function() {
	
		$('#background-options-hr').css({'border-color': 'grey'});
		
	});
	
	$('.bookmark-options').hover(function() {
	
		$('#bookmark-options-hr').css({'border-color': '#1159D7'}); // #1159D7: blue color
		
	}, function() {
	
		$('#bookmark-options-hr').css({'border-color': 'grey'});
		
	});
	
	$('.border-options').hover(function() {
	
		$('#border-options-hr').css({'border-color': '#1159D7'}); // #1159D7: blue color
		
	}, function() {
	
		$('#border-options-hr').css({'border-color': 'grey'});
		
	});
	
	$('#button-design').click(function() {
		
		$('#bookmark-icon-form input, #bookmark-icon-form select ').removeClass('error');
		
		$('.alert').hide();
	
	});
	
}); //end of document ready

    let screenWidth;
    
    let screenHeight;
    
    let maxBookmarkIconWidth;

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
			
			localStorage.setItem('bookmarkIcons', JSON.stringify(bookmarkIcons));
			
		 } 
		 
		 else {
		 
			let bookmarkIcons = JSON.parse(localStorage.getItem('bookmarkIcons'));
			
			bookmarkIcons.push(bookmarkIcon);
			
			localStorage.setItem('bookmarkIcons', JSON.stringify(bookmarkIcons));
			
		 }
		 
		fetchBookmarkIcons();
		
	} // end of changeBookmark()
	
	function fetchBookmarkIcons() {

		let bookmarkIcons = JSON.parse(localStorage.getItem('bookmarkIcons'));
		
		let length = bookmarkIcons.length-1;

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
        
        let backgroundImage = bookmarkIcons[length]["background-image"];
        
        if (bgSize === 'none') {
        
            $('.bookmark-icon').css({'background-size': bgSizeWidth + 'px' + ' ' + bgSizeHeight +'px' });
            
        }
        
        else if (bgSize === 'cover') {
        
            $('.bookmark-icon').css({'background-size': 'cover' });

        }
            
        else if (bgSize === 'contain') {
        
            $('.bookmark-icon').css({'background-size': 'contain' });
            
        }

        $('.bookmark-icon').css({'width': bookmarkWidth+'px', 'height':bookmarkHeight+'px','background-position': bgPosition, 'background-color': backgroundColor,'background-image':'url('+backgroundImage+')','background-repeat': bgRepeat,'border-color': borderColor, 'border-style':borderStyle,'border-width': borderWidth+'px', 'box-shadow': '2px 2px 5px black'});

	} // end of fetchBookmarkIcons()

	function validateBookmarkIconsForm() {
		
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

		let backgroundStatus = '';
		
		let bookmarkStatus = '';
		
		let borderStatus = '';
		
		let sizeStatus = '';
		
		// if an image is chosen either height/width can be inputted or a keyword (cover or chosen) can be chosen 

		if (bgImage.length !== 0 && ((bgSizeWidth.length !== 0 && bgSizeHeight.length !== 0 && bgSize === 'none') || (bgSize !== 'none' && bgSizeWidth.length === 0 && bgSizeHeight.length === 0 ))) {
			
			backgroundStatus = true;
			
			$('#background-errors').hide();
			
			$('#bg-size, #bg-size-width,#bg-size-height, #bg-color, #bg-image').removeClass('error');
			
		}
		
		// if a color is chosen, size fields should be left blank or 'none' should be selected 
		
		else if (bgColor !== 'transparent' && (bgSizeWidth.length === 0 && bgSizeHeight.length === 0 && bgSize === 'none')) {
			
			backgroundStatus = true;
			
			$('#background-errors').hide();
			
			$('#bg-size, #bg-size-width,#bg-size-height, #bg-color, #bg-image').removeClass('error');
			
		}
		
		// if these conditions are not met, show error alert
		
		else {
		
			backgroundStatus = false;
			
			$('#background-errors').show();
			
			$('#bg-size, #bg-size-width,#bg-size-height, #bg-color, #bg-image').addClass('error');
			
		}
		
		// width and height should be inputted							
		
		if (bookmarkSizeWidth.length !== 0 && bookmarkSizeHeight.length !== 0 ) {
		
			bookmarkStatus = true;
			
			$('#bookmark-errors').hide();
			
			$('#bookmark-size-height, #bookmark-size-width').removeClass('error');
			
		}
		
		// if not, show error alert
		
		else {
		
			bookmarkStatus = false;
			
			$('#bookmark-errors').show();
			
			$('#bookmark-size-height, #bookmark-size-width').addClass('error');
			
		}
		
		// background size (width/height) of image cannot be bigger than bookmark size, if background size is bigger than bookmark size, show error alert 
		
		if (bgSizeWidth.length !== 0 || bgSizeHeight.length !== 0) {
		
			if (bgSizeWidth > bookmarkSizeWidth || bgSizeHeight > bookmarkSizeHeight ) {
			
				sizeStatus = false;
				
				console.log( bgSizeWidth);
				
				$('#background-size-errors').html('The background size (width/height) of the image cannot be bigger than the bookmark size (width: '+bookmarkSizeWidth+'/height: '+bookmarkSizeHeight+'). Please decrease the width <strong>and/or</strong> height of the image background.').show();
				
				$('#bg-size-width,#bg-size-height, #bookmark-size-height, #bookmark-size-width').addClass('error');
				
			}
		
			else if (bgSizeWidth <= bookmarkSizeWidth && bgSizeHeight <= bookmarkSizeHeight ) {
			
				sizeStatus = true;
				
				$('#background-size-errors').html('').hide();
				
				$('#bg-size-width,#bg-size-height, #bookmark-size-height, #bookmark-size-width').removeClass('error');
				
			}
			
		} // end of if (bgSizeWidth.length !== 0 || bgSizeHeight.length !== 0)
		
		// if a border style option is chosen, all other options must be chosen as well, if they are not all selected, show error alert
		
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
		
		} // end of if (borderColor !== 'transparent' || borderStyle !== 'none' || borderWidth.length !== 0  )
		
		// if border width is chosen
		
		if (borderWidth.length !== 0) {
		
		    // if remaining width between max bookmark icon width size and current size is less than 10 (max border width size)
		
			if (maxBookmarkIconWidth - bookmarkSizeWidth < 10) { 
			
			    let validBorderSize = maxBookmarkIconWidth - bookmarkSizeWidth; // remaining width between max bookmark icon width size and current size 

				if (borderWidth > validBorderSize ) {
				
				    if (validBorderSize === 0) {
				        
				        $('#border-size-errors').html('The bookmark size width is at its maximum size, therefore a border cannot be added. Please leave the border width field blank or decrease the size of the bookmark.').show();
				        
				    }
				    
				    else {

					    $('#border-size-errors').html('The border width must be less than or equal to ' + validBorderSize + '. Please decrease the size.').show();
					
					}
				
				    $('#border-width').addClass('error');
				    
				    sizeStatus = false;
				
				}
				
				else {
				
				    $('#border-size-errors').hide();
				
				    $('#border-width').removeClass('error');
				    
				     sizeStatus = true;
				
				}
				
			} // end of if (maxBookmarkIconWidth - bookmarkSizeWidth < 10) 
		
		} 
		
		// if no border option is chosen
		
		if (borderWidth.length === 0 && borderColor === 'transparent' &&  borderStyle === 'none') {
		    
            $('#border-size-errors,#border-errors').hide();

            $('#border-width,#border-color, #border-style').removeClass('error');

            sizeStatus = true;
            
            borderStatus = true;
		
		}
		
		// background and bookmark conditions must be met, if optional fields are filled out conditions for those fields must be met in order to submit form successfully
		
		if (backgroundStatus === true && bookmarkStatus === true ) {
		
			if (borderStatus !== '') {
			
				if ( borderStatus === true) {
					
					if (sizeStatus !== '') {
						
						if ( sizeStatus === true) {
				
							return true;
					
						}
						
						else {
						
							return false;
						
						}
					
					} // end of if (sizeStatus !== '')
					
					else {
						
						return true;
					
					}
					
				} // end of if (borderStatus === true)
				
				else {
					
					return false;
					
				}
				
			} // end of if (borderStatus !== '') 
			
			if (sizeStatus !== '') {
			
				if ( sizeStatus === true) {
					
					if ( borderStatus !== '') {
						
						if ( borderStatus === true) {
						
							return true;
						}
						
						else {
							
							return false;
						
						}
					
					} // end of if ( borderStatus !== '')
					
					else {
					
						return true;
					
					}
					
				} // end of if (sizeStatus === true)
				
				else {
					
					return false;
					
				}
			
			} // end of (sizeStatus !== '')
			
			else {
			
		 		return true;
		 		
			}
			
		} // end of if (backgroundStatus === true && bookmarkStatus === true )
		
		else {
		
			return false;
			
		}
		
	} // end of validateBookmarkIconsForm()

	function deleteBookmarkIcons() {

		let bookmarkIconsNull = localStorage.getItem('bookmarkIcons');
		
		let bookmarkIcons;
		
		if (bookmarkIconsNull !== null) {
		
			bookmarkIcons = JSON.parse(localStorage.getItem('bookmarkIcons'));
			
			if (bookmarkIcons.length > 1) {
			
			    bookmarkIcons.splice(0, bookmarkIcons.length-1); // delete previous bookmark icon designs since only most recent design is displayed
			
			}

		} // end of if (bookmarkIconsNull != null)
		
		console.log(bookmarkIcons);
		
		localStorage.setItem('bookmark-icons', JSON.stringify(bookmarkIcons));
		
		fetchBookmarkIcons();
		
	} // end of deleteBookmarkIcons()

    function saveBookmark(e) {
    
		e.preventDefault();
		
	  	websiteName = $("#siteName").val();
	  	
	 	websiteURL = $("#siteURL").val();
	 	
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
	
	function deleteBookmark(url) {
	
		let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		
		for (let i = 0; i < bookmarks.length; i++) {
			
			if (bookmarks[i].url == url) {
			
			bookmarks.splice(i,1);
			
			}
		
		} // end of for loop

		localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
		
		fetchBookmarks();

	} // end of deleteBookmark(url)
	 
	function fetchBookmarks() {
	
	    if (localStorage.getItem('bookmarks') === null) {
	        
	        alert
	    
	    }
	
		let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

		let bookmarkButton = document.getElementById('list-group');
		
		bookmarkButton.innerHTML = '';
		
		for (let i = 0; i < bookmarks.length; i++) {
		
			let name = bookmarks[i].name;
			
			let url = bookmarks[i].url;

			bookmarkButton.innerHTML += '<li class="list-group-item"><a target="_blank" href="'+url+'">'+name+'</a><a href="#" onclick="deleteBookmark(\''+url+'\')"> <span class="glyphicon glyphicon-remove"></span></a></li>';
	
		} // end of for loop

	} // end of fetchBookmarks()
	
	// Responsive Design 

	function responsiveDesign() {
    
        screenHeight = $(window).height();
        
        screenWidth = $(window).width();
        
        let bookmarkIcons;
        
        let bookmarkWidth;
        
        let bookmarkHeight;
        
        if (localStorage.getItem('bookmarkIcons') !== null) {
        
            bookmarkIcons = JSON.parse(localStorage.getItem('bookmarkIcons'));
        
            let bookmarkIconsLength = bookmarkIcons.length-1;
        
            bookmarkWidth = bookmarkIcons[bookmarkIconsLength]["bookmark-size-width"];
        
            bookmarkHeight = bookmarkIcons[bookmarkIconsLength]["bookmark-size-height"];
        
        }
        
        else {
            
            bookmarkWidth = 60;
        
            bookmarkHeight = 110;
        
        }
        
        let bookmarkFormWidth = $('#bookmark-form').outerWidth();
    
        maxBookmarkIconWidth = Math.round(((screenWidth - bookmarkFormWidth)/2)-10); // make bookmark fit between the bookmarkForm and the right side of window screen (if window screen is wide enough)
        
        maxBookmarkIconHeight = Math.round(screenHeight/2);
    
        $('#bookmark-size-width').attr({'max': maxBookmarkIconWidth, 'value': maxBookmarkIconWidth});
    
        $('#bookmark-size-height').attr({'max': maxBookmarkIconHeight, 'value':  maxBookmarkIconHeight});
    
        $('.bookmark-icon').css({'height':bookmarkHeight + 'px', 'width': bookmarkWidth + 'px','max-width': maxBookmarkIconWidth + 'px', 'max-height':maxBookmarkIconHeight + 'px' });
    
	} // end of responsiveDesign()
	
	responsiveDesign();
	
	$(window).resize(responsiveDesign);