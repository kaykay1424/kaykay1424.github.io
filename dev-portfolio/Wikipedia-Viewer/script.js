/*
	Explanation of program:
	
	When a user enters an article keyword(s) and chooses the number of articles they wish to see
	displayed that number of Wikipedia articles pertaining to the article keyword(s) will be
	displayed below the form (if they choose no number of articles the default number of 10 will be
	used. If the lucky button is clicked only 1 article pertaining to the article keyword(s) will be
	displayed. If the random button is clicked, one random article will be displayed regardless of
	article keyword(s). Each article box will show the title and have a max of 3 sentences (or 'N/A'
	if no introductory sentences are available) shown giving a brief overview of the article along
	with a star button to favorite the article and save it to the browser's local storage and a
	bookmark button to bookmark it and read later (it will not be saved to local storage and
	therefore will not be available after refreshing the page). As articles are added to either
	category of stored articles, the number of articles in that category will automatically
	increment. Clicking on the article title in the article box or in the 'Favorites 'or 'Read Later'
	bars at the bottom of the screen will open that article up in a new page. The user can delete the
	articles that are favorited or bookmarked and favorite the ones added to the 'Read Later' bar.   
	
	
*/	

$(document).ready(function() {
	
	$('form')[0].reset();
	
	let popoverOptions = {
	
		placement: function () {
		
			let screenWidth = $(window).width();
			
			if (screenWidth < 800) {
			
				return "top";
				
			} 
			
			else {
			
				return "right";
				
			}
			
		} // end of function()
		
	};
	
	$('#searchbox [data-toggle="popover"]').popover(popoverOptions);
	
	$(window).resize(function() {
	
		$('#searchbox [data-toggle="popover"]').popover(popoverOptions);
		
	}); 
	
	$('[data-toggle="popover"]').popover();
	
	let favorites = JSON.parse(localStorage.getItem('favorites'));
	
	if (favorites !== null) {
		
		fetchFavorites();
	
	}
	
	$('#favorites-button').mouseenter(function() {
	
		$('#favorites-button .badge').hide();
		
		$('#favorites-button').append('<span class="caret"></span>');
		
	});
	
	$('#favorites-button').mouseleave(function() {
	
		$('#favorites-button .badge').show();
		
		$('#favorites-button .caret').remove();
		
	});
	
	$('#bookmarks-button').mouseenter(function() {
	
		$('#bookmarks-button .badge').hide();
		
		$('#bookmarks-button').append('<span class="caret"></span>');
		
	});
	
	$('#bookmarks-button').mouseleave(function() {
	
		$('#bookmarks-button .badge').show();
		
		$('#bookmarks-button .caret').remove();
		
	});
	
	$('form').on('submit', function(e) {
	
		e.preventDefault();
		
	});
	
	$('#search-button').click(defaultSearch);
	
	$('#lucky').click(luckySearch);
	
	$('#random').click(randomSearch);
	
	let favoriteArticleCounter = 0;
	
	let bookmarkArticleCounter = 0;
	
	function randomSearch() {
	
		$('.title-div').hide();
		
		$('#alert-warning').hide();
		
		$('#search').removeClass('border-red');
		
		$.ajax({
		
			url: "https://en.wikipedia.org/w/api.php?action=query&list=random&rnlimit=1&utf8=&format=json",
			
			dataType: "jsonp",
			
			success: function(responses) {
			
				let searchTitle = responses.query.random.title;
				
				// get info from 1 random article 
				
				extractInfo(searchTitle);
					
				} // end of success()
				
			}); // end of $.ajax()
			
		} // end of randomSearch()
		
	function luckySearch() {
	
		$('.title-div').hide();
		
		let keyword = $('#search').val();
		
		let searchLimit = $('#search-limit').val();
		
		if (keyword.length !== 0) {
		
			$('#alert-warning').hide();
			
			$('#search').removeClass('border-red');
			
		}
		
		else if (keyword.length === 0) {
		
			$('.title-div').hide();
			
			$('#alert-warning').show().addClass('animated flash');
			
			$('#search').addClass('border-red');
			
			return false;
		}
		
		let titleOfArticle = '';
		
		$.ajax({
		
			url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + keyword + "&utf8=&format=json",
			
			dataType: "jsonp",
			
			success: function(info) {
			
				let searchArray = info.query.search;
				
				let storeTitlesArray = [];
				
				for (let i = 0; i < searchArray.length; i++) {
				
					storeTitlesArray.push(searchArray[i].title);
					
				}
				
				let random = Math.floor((Math.random() * storeTitlesArray.length) + 1);
				
				// get info from 1 random article based on keyword
				
				extractInfo(storeTitlesArray[random]);	

			} // end of success()
			
		}); // end of $.ajax()
		
		$('form')[0].reset();

	} // end of luckySearch()
	
	function defaultSearch() {
	
		$('.title-div').hide();
		
		let keyword = $('#search').val();
		
		let searchLimit = $('#search-limit').val();
		
		if (searchLimit.length === 0) {
		
			searchLimit = 10;
			
		}
		
		if (keyword === '') {
		
			$('.title-div').hide();
			
			$('#alert-warning').show().addClass('animated flash');
			
			$('#search').addClass('border-red');
			
			return false;
			
		}
		
		else if (keyword !== '') {
			
			$('#alert-warning').hide();
			
			$('#search').removeClass('border-red');
			
		}
		
		let titleOfArticle = '';

		$.ajax({
		
			url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srlimit=" + searchLimit + "&srsearch=" + keyword + "&utf8=&format=json",
			
			dataType: "jsonp",
			
			success: function(info) {
			
				let searchArray = info.query.search;
				
				let storeTitlesArray = [];
				
				for (let i = 0; i < searchArray.length; i++) {
				
				storeTitlesArray.push(searchArray[i].title);
				
				}
				
				for (let j = 0; j < storeTitlesArray.length; j++) {
				
					// get info from each article based on keyword
					
					extractInfo(storeTitlesArray[j]);	
					
				}
				
			} // end of success()
			
		}); // end of $.ajax()
		
		$('form')[0].reset();
		
	} // end of defaultSearch()
	
		/* To gather the title, excerpt, and url of each article, 2 separate functions are used to
		facilitate querying during the ajax calls so that all details can be gathered. */

	function extractInfo(word) {
		
		$.ajax({
		
			url: "https://en.wikipedia.org/w/api.php?action=query&prop=extracts&exintro=&explaintext=&exsentences=3&titles=" + word + "&utf8=&format=json",
			
			dataType: "jsonp",
			
			success: function(data,url) {
			
				let queried1 = data.query.pages;
				
				
				let key = Object.keys(queried1);
				
				
				let title = $('.title').html();
				
				extractURL(word, queried1, key);
				
			} // end of success()
			
		}); // end of $.ajax
		
	} // end of extractInfo()
	
	function extractURL(title, query, key) {
	
		$.ajax({
		
			url: "https://en.wikipedia.org/w/api.php?action=query&prop=info&inprop=url&titles=" + title +"&utf8=&format=json" ,
			
			dataType: "jsonp",
			
			success: function(response) {
			
				let queried2 = response.query.pages;
				
				let key2 = Object.keys(queried2);
				
				let fullURL = queried2[key2[0]].fullurl;
				
				let title = query[key[0]].title;
				
				let intro = query[key[0]].extract;

				listArticle(title, intro, fullURL);
		
			} // end of success()
			
		}); // end of $.ajax()
		
	} // end of extractURL() 
	
	function listArticle(title, intro, URL) {
		
		if ( intro.length === 0 ) {
			
			let intro = 'N/A';
			
		}
		
		$("<div class='title-div'>" +"<strong>Title: </strong>" + '<a href="'+URL+'" target="_blank">' + title + '</a>'+ "</br>" + "<strong>Brief Intro:</strong>"+ "<p>"+ intro + "</p> " +"</div>").append('<i>Favorite article:</i> <span class="glyphicon glyphicon-star" onclick="saveFavorites(\'' + title + '\',\'' + URL + '\')" ></span> ' + '<i>Read article later:</i> <span class="glyphicon glyphicon-bookmark"></span>').on('mouseenter',function() {
			
			$(this).addClass('animated pulse');
		
		}).on('mouseleave',function() {
		
			$(this).removeClass('animated pulse');
	
		}).on('click', '.glyphicon-bookmark',function() {
		
			let matchingArticlesLength = $('.bookmarks-li:contains('+title+')').length;
			
			if ( matchingArticlesLength !== 0 ) {
			
				alert('This article has already been bookmarked.');
				
				return false;
				
			}
			
			let bookmarksLi = $('<li class="bookmarks-li" >'
			
			+ '<span>' + '<a href="'+URL+'" target="_blank">' + title + '</a>' + ' ' + '<span class="glyphicon glyphicon-star" onclick="saveFavorites(\'' + title + '\',\'' + URL + '\')"></span>'+ ' ' + '<span class="delete glyphicon glyphicon-remove"> </span>' +'</li>');
			
			bookmarksLi.on('click', '.delete', function() {
			
			bookmarksLi.remove();
			
			bookmarkArticleCounter--;
			
			$('#bookmarks-amount').html(bookmarkArticleCounter);
			
			if (bookmarkArticleCounter < 1) {
			
				$('#bookmarks-bar').hide();
				
			}
			
		}).appendTo('#bookmarks-storage-ul');

		bookmarkArticleCounter++;
		
		$('#bookmarks-amount').html(bookmarkArticleCounter);
		
		$('#bookmarks-bar').show();
		
		}).appendTo('#article-list');
	
	} // end of listArticle()

	
	
	}); // end of document ready 
	
	function saveFavorites(title1, URL) {
	
		if (localStorage.getItem('favorites') !== null) {
		
			let favorites = JSON.parse(localStorage.getItem('favorites'));
			
			for (let i = 0; i < favorites.length; i++) {
			
				let name = favorites[i].title;
				
				let url = favorites[i].url;

				if (title1 === name || URL === url) {
				
					alert('This article has already been favorited.');
					
					return false;
					
				}
	
			} // end of for loop
			
		} // end of if localStorage.getItem('favorites') !== null
		
		let favorite = {
		
			title: title1,
			
			url: URL
			
		}
		
		if (localStorage.getItem('favorites') === null) {
		
			let favorites = [];
			
			favorites.push(favorite);
			
			localStorage.setItem('favorites', JSON.stringify(favorites));
			
		} 
		
		else {
		
			let favorites = JSON.parse(localStorage.getItem('favorites'));
			
			favorites.push(favorite);
			
			localStorage.setItem('favorites', JSON.stringify(favorites));
			
		}
		
		fetchFavorites();

	} // end of saveFavorites()
	
	function deleteFavorites(url) {
	
		let favorites = JSON.parse(localStorage.getItem('favorites'));
		
		for (let i = 0; i < favorites.length; i++) {
		
			if (favorites[i].url == url) {
			
			favorites.splice(i,1);
			
			}
			
		} // end of for loop

		localStorage.setItem('favorites', JSON.stringify(favorites));
		
		fetchFavorites();

	} // end of deleteFavorites()
	
	function fetchFavorites() {
	
		let favoritesStorage = document.getElementById('favorites-storage-ul');
		
		favoritesStorage.innerHTML = '';
		
		let favorites = JSON.parse(localStorage.getItem('favorites'));
		
		if (favorites.length < 1) {
		
			$('#favorites-bar').hide();
			
		}
		
		else {
		
			$('#favorites-bar').show();
			
		}
		
		for (let i = 0; i < favorites.length; i++) {
		
			let name = favorites[i].title;
			
			let url = favorites[i].url;

			$('#favorites-amount').html(favorites.length);
			
			favoritesStorage.innerHTML += '<li class="favorites-li" >' +
			
		 	'<a href="'+url+'" target="_blank">' + name + '</a>' + ' ' +'<span  class="delete-favorites glyphicon glyphicon-remove" onclick="deleteFavorites(\'' + url + '\')" > </span>'   + '</li>';
			
			let deleteFavorites = document.getElementsByClassName('delete-favorites');
	
		} // end of for loop
		
	} // end of deleteFavorites()
	
	
