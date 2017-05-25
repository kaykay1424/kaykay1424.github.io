/*
	Explanation of program:
	When a user chooses a topic and submits the form, a quote, author, and image
	of the author will be displayed. When a user clicks the next button a new quote, author
	and image will appear and if the user clicks the previous button the previous quote,author,
	and image will show. The background color of the quote, the previous button, next button
	twitter button, and the body will change each time a user clicks the previous or next button
	or submits the form. When there are no more quotes to be displayed, because they've reached 
	the end or beginning, they will be prompted to go back through the quotes, choose the topic
	again to re-randomize the quotes,or choose another topic. When a user clicks the twitter button
	they will be taken to a new page where they can post a tweet containing the quote and author
	with the hashtag 'quotes'.
	
	Explanation of javaScript:
	The div the quote is contained in as well as the next and previous buttons and twitter
	button are hidden when the page is loaded. The colors are stored in the variable colorsArray. Each quote
	topic is stored in an array of objects with each object containing a quote,
	author, and photo of the author. These arrays are then passed into the shuffle 
	function which randomizes them. To store the values of the quote,author, and image of each 
	object, variables are initialized as empty arrays. When looping through each quote array,
	the values of the quote,author, and image of each object in the array are pushed to the previously 
	initialized empty arrays. 
	
	2 counter variables are initialized to discern what element in each quote array and the color array
	should be shown. A selecTopic variable is also initialized to keep track of what topic the user chooses.
	When a user chooses a topic, the topic is stored in the selecTopic variable. When a user then
	submits the form, the quote, author, and photo from the quote topic stored in the selecTopic variable
	and the background color of the quote, next and previous buttons, and twitter button will be shown based on
	the place the arrays are in, which is specified by the number quotesCounter and colorsCounter are equal to, i.e.
	if quotesCounter = 1 then it will show quotesArray[1]. Both counter variables
	will be set to 0 every time the form is submitted because of the onchange event that sets the quotesCounter
	equal to 0.
	
	When a user clicks the next button both counters will increase and will be set to different numbers
	when the beginning or end of an array is reached so that the appropriate quote, author(or no author)
	,image(or no image) and background color in each array will be shown. Each time the next button is 
	clicked the quote and/or quote display div the quote is contained in will be shown with an animation effect.
	
	When a user clicks the previous button both counters will decrease and will be set to different numbers
	when the beginning or end of an array is reached so that the appropriate quote, author(or no author)
	,image(or no image) and background color in each array will be shown.
	
	Each time a quote is displayed the href attribute of the twitter button will be set to the twitter page
	to post a tweet along with the quote and author displayed.
	
	
*/
$(document).ready(function() {
	
	let inspirationQuotesArray = [];
	let inspirationAuthorsArray = [];
	let inspirationPhotosArray = [];
	let funnyQuotesArray = [];
	let funnyAuthorsArray = [];
	let funnyPhotosArray = [];
	let loveQuotesArray = [];
	let loveAuthorsArray = [];
	let lovePhotosArray = [];
	let colorsArray = [];
	let friendshipQuotesArray = [];
	let friendshipAuthorsArray = [];
	let friendshipPhotosArray = [];
	let randomQuotesArray = [];
	let randomAuthorsArray = [];
	let randomPhotosArray = [];
	let quotesCounter = 0;
	let colorsCounter = 0;
	let selecTopic = '';
	
	$('#quote-display,.pager').parent().hide();
	
	let colors = ['#2122FF', '#5CFF96','#20ACFF','#E8270C', '#FFF73E','#98270C', '#FF3142',
	 '#D93DEF','#EF39C1','#984A28', '#3EFF49','#FFBB49','#EF3D8D', '#000000'];
	 
	let randomQuotes = [{"id": 0,
		"quote" : "My best friend is the one who brings out the best in me.",
		"author": "Henry Ford",
		"photo": "http://info.thors.com/hubfs/Blog/Henry-Ford-1930.jpg"},
		 {"id": 1,
		"quote" :"Friends and good manners will carry you where money won't go.",
		"author": "Margaret Walker",
		"photo":"http://www.ugapress.org/images/ugapress/authors/walker.margaret.jpg" },
		{"id": 2,
		"quote" :"The only way to have a friend is to be one.",
		"author": "Ralph Waldo Emerson",
		"photo": "http://0.tqn.com/d/history1800s/1/S/S/K/-/-/Ralph-Waldo-Emerson-2600-3x2.jpg"},
		{"id": 3,
		"quote" :"Be slow in choosing a friend, slower in changing.",
		"author": "Benjamin Franklin",
		"photo": "https://www.biography.com/.image/c_fit,cs_srgb,dpr_1.0,q_80,w_620/MTE1ODA0OTcxNjMyNzg5MDA1/benjamin-franklin-9301234-2-402.jpg"},
		{"id": 4,
		"quote" :"Lots of people want to ride with you in the limo, but what you want is someone who will take the bus with you when the limo breaks down.",
		"author": "Oprah Winfrey",
		"photo":"http://i.dailymail.co.uk/i/pix/2014/09/04/article-0-210DCF4400000578-230_634x477.jpg"},
		{"id": 5,
		"quote" : "Love is the only force capable of transforming an enemy into a friend.",
		"author": "Martin Luther King, Jr.",
		"photo": "https://www.biography.com/.image/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTE5NTU2MzE2MjgwNDg5NDgz/martin-luther-king-jr-9365086-2-402.jpg"},
		 {"id": 6,
		"quote" :"Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
		"author": "Lao Tzu",
		"photo":"http://www.zen-mama.com/wp-content/uploads/2015/02/upanga.jpg" },
		{"id": 7,
		"quote" :"If you have only one smile in you give it to the people you love.",
		"author": "Maya Angelou",
		"photo": "http://hellopoetry.s3.amazonaws.com/static/cache/49/d8/49d88b296835f6f1d715de7c02f902b5.jpg"},
		{"id": 8,
		"quote" :"Beauty is when you can appreciate yourself. When you love yourself, that's when you're most beautiful.",
		"author": "Zoe Kravitz",
		"photo": "https://pmcdeadline2.files.wordpress.com/2015/12/zoekravitz-copy.jpg"},
		{"id": 9,
		"quote" :"Choose a job you love, and you will never have to work a day in your life.",
		"author": "Confucius",
		"photo":"http://vcvoices.org/wp-content/uploads/2015/04/c8129f9ce.jpg"},
		{"id": 10,
		"quote" : "Behind every great man is a woman rolling her eyes.",
		"author": "Jim Carrey",
		"photo": "http://media.ellentv.com/2014/11/06/jim-carrey-episode-480x360.jpg"},
		 {"id": 11,
		"quote" :"Happiness is having a large, loving, caring, close-knit family in another city.",
		"author": "George Burns",
		"photo":"http://vignette3.wikia.nocookie.net/muppet/images/5/5d/George_Burns01.jpg/revision/latest?cb=20131120092151" },
		{"id": 12,
		"quote" :"Laziness is nothing more than the habit of resting before you get tired.",
		"author": "Jules Renard",
		"photo": "http://4.bp.blogspot.com/-lWwka1yMoRs/VjQlNq7HpNI/AAAAAAAAG6c/NFXN6R2eC_M/s1600/jules-renard.jpg"},
		{"id": 13,
		"quote" :"Always remember that you are absolutely unique. Just like everyone else.",
		"author": "Margaret Meed",
		"photo": "https://www.biography.com/.image/t_share/MTE1ODA0OTcxNzIxMzI4MTQx/margaret-mead-9404056-1-402.jpg"},
		{"id": 14,
		"quote" :"I am not a member of any organized political party. I am a Democrat.",
		"author": "Will Rogers",
		"photo":"https://upload.wikimedia.org/wikipedia/commons/f/f6/Will_Rogers_1922.jpg"},
		{"id": 15,
		"quote" : "Two roads diverged in a wood and I - I took the one less traveled by, and that has made all the difference.",
		"author": "Robert Frost",
		"photo": "http://www.scenacriminis.com/wp-content/uploads/2015/02/robert-frost.jpg"},
		 {"id": 16,
		"quote" :" We must let go of the life we have planned, so as to accept the one that is waiting for us.",
		"author": "Joseph Campbell",
		"photo":"http://www.huffenglish.com/webquests/josephcampbell.jpg"},
		{"id": 17,
		"quote" :" Let us remember: One book, one pen, one child, and one teacher can change the world.",
		"author": "Malala Yousafzai",
		"photo": "https://s-media-cache-ak0.pinimg.com/736x/f2/3f/79/f23f79f69ef4b1076dbd22a3bbaa1736.jpg"},
		{"id": 18,
		"quote" :" Someone is sitting in the shade today because someone planted a tree a long time ago.",
		"author": "Warren Buffet",
		"photo": "https://www.biography.com/.image/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTE5NTU2MzE2MTY4Njg1MDY3/warren-buffett-9230729-1-402.jpg"},
		{"id": 19,
		"quote" :" Try to be a rainbow in someone's cloud.",
		"author": "Maya Angelou",
		"photo":"http://media.independent.com/img/croppedphotos/2011/08/31/main-maya-angelou_t479.jpg?ad14627618f647f3902aa65ed5ac8237c798b1ef"},
		{"id": 20,
		"quote" :" We know what we are, but know not what we may be.",
		"author": "William Shakespeare",
		"photo": "https://simonclark3.files.wordpress.com/2013/02/shakespeare_william.jpg"},
		{"id": 21,
		"quote" :" You must do the things you think you cannot do.",
		"author": "Eleanor Roosevelt",
		"photo": "http://firstladies.c-span.org/Images/VideoStillImgs/EleanorRoosevelt_640x400.jpg"},
		{"id": 22,
		"quote" :"Memories of our lives, of our works and our deeds will continue in others.",
		"author": "Rosa Parks",
		"photo":"http://50thanniversarymarchonwashington.com/wp-content/uploads/2013/02/Rosa-Parks-an-introvert-w-007.jpg"},
		{"id": 23,
		"quote" :"I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'",
		"author": "Muhammad Ali",
		"photo": "http://cdn.history.com/sites/2/2016/02/GettyImages-479933880-E.jpeg"},
		{"id": 24,
		"quote" :"If I have seen further than others, it is by standing upon the shoulders of giants.",
		"author": "Isaac Newton",
		"photo": "http://cdn8.openculture.com/wp-content/uploads/2015/03/30193908/isaac-newton-list-of-sins.jpg"}];
		
	let friendshipQuotes = [{"id": 0,
		"quote" : "My best friend is the one who brings out the best in me.",
		"author": "Henry Ford",
		"photo": "http://info.thors.com/hubfs/Blog/Henry-Ford-1930.jpg"},
		 {"id": 1,
		"quote" :"Friends and good manners will carry you where money won't go.",
		"author": "Margaret Walker",
		"photo":"http://www.ugapress.org/images/ugapress/authors/walker.margaret.jpg" },
		{"id": 2,
		"quote" :"The only way to have a friend is to be one.",
		"author": "Ralph Waldo Emerson",
		"photo": "http://0.tqn.com/d/history1800s/1/S/S/K/-/-/Ralph-Waldo-Emerson-2600-3x2.jpg"},
		{"id": 3,
		"quote" :"Be slow in choosing a friend, slower in changing.",
		"author": "Benjamin Franklin",
		"photo": "https://www.biography.com/.image/c_fit,cs_srgb,dpr_1.0,q_80,w_620/MTE1ODA0OTcxNjMyNzg5MDA1/benjamin-franklin-9301234-2-402.jpg"},
		{"id": 4,
		"quote" :"Lots of people want to ride with you in the limo, but what you want is someone who will take the bus with you when the limo breaks down.",
		"author": "Oprah Winfrey",
		"photo":"http://i.dailymail.co.uk/i/pix/2014/09/04/article-0-210DCF4400000578-230_634x477.jpg"}];
		
	let loveQuotes = [{"id": 0,
		"quote" : "Love is the only force capable of transforming an enemy into a friend.",
		"author": "Martin Luther King, Jr.",
		"photo": "https://www.biography.com/.image/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTE5NTU2MzE2MjgwNDg5NDgz/martin-luther-king-jr-9365086-2-402.jpg"},
		 {"id": 1,
		"quote" :"Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
		"author": "Lao Tzu",
		"photo":"http://www.zen-mama.com/wp-content/uploads/2015/02/upanga.jpg" },
		{"id": 2,
		"quote" :"If you have only one smile in you give it to the people you love.",
		"author": "Maya Angelou",
		"photo": "http://hellopoetry.s3.amazonaws.com/static/cache/49/d8/49d88b296835f6f1d715de7c02f902b5.jpg"},
		{"id": 3,
		"quote" :"Beauty is when you can appreciate yourself. When you love yourself, that's when you're most beautiful.",
		"author": "Zoe Kravitz",
		"photo": "https://pmcdeadline2.files.wordpress.com/2015/12/zoekravitz-copy.jpg"},
		{"id": 4,
		"quote" :"Choose a job you love, and you will never have to work a day in your life.",
		"author": "Confucius",
		"photo":"http://vcvoices.org/wp-content/uploads/2015/04/c8129f9ce.jpg"}];
		
	 let funnyQuotes = [{"id": 0,
		"quote" : "Behind every great man is a woman rolling her eyes.",
		"author": "Jim Carrey",
		"photo": "http://media.ellentv.com/2014/11/06/jim-carrey-episode-480x360.jpg"},
		 {"id": 1,
		"quote" :"Happiness is having a large, loving, caring, close-knit family in another city.",
		"author": "George Burns",
		"photo":"http://vignette3.wikia.nocookie.net/muppet/images/5/5d/George_Burns01.jpg/revision/latest?cb=20131120092151" },
		{"id": 2,
		"quote" :"Laziness is nothing more than the habit of resting before you get tired.",
		"author": "Jules Renard",
		"photo": "http://4.bp.blogspot.com/-lWwka1yMoRs/VjQlNq7HpNI/AAAAAAAAG6c/NFXN6R2eC_M/s1600/jules-renard.jpg"},
		{"id": 3,
		"quote" :"Always remember that you are absolutely unique. Just like everyone else.",
		"author": "Margaret Meed",
		"photo": "https://www.biography.com/.image/t_share/MTE1ODA0OTcxNzIxMzI4MTQx/margaret-mead-9404056-1-402.jpg"},
		{"id": 4,
		"quote" :"I am not a member of any organized political party. I am a Democrat.",
		"author": "Will Rogers",
		"photo":"https://upload.wikimedia.org/wikipedia/commons/f/f6/Will_Rogers_1922.jpg"}];
		
	let inspirationQuotes = [{"id": 0,
		"quote" : "Two roads diverged in a wood and I - I took the one less traveled by, and that has made all the difference.",
		"author": "Robert Frost",
		"photo": "http://www.scenacriminis.com/wp-content/uploads/2015/02/robert-frost.jpg"},
		 {"id": 1,
		"quote" :" We must let go of the life we have planned, so as to accept the one that is waiting for us.",
		"author": "Joseph Campbell",
		"photo":"http://www.huffenglish.com/webquests/josephcampbell.jpg"},
		{"id": 2,
		"quote" :" Let us remember: One book, one pen, one child, and one teacher can change the world.",
		"author": "Malala Yousafzai",
		"photo": "https://s-media-cache-ak0.pinimg.com/736x/f2/3f/79/f23f79f69ef4b1076dbd22a3bbaa1736.jpg"},
		{"id": 3,
		"quote" :" Someone is sitting in the shade today because someone planted a tree a long time ago.",
		"author": "Warren Buffet",
		"photo": "https://www.biography.com/.image/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTE5NTU2MzE2MTY4Njg1MDY3/warren-buffett-9230729-1-402.jpg"},
		{"id": 4,
		"quote" :" Try to be a rainbow in someone's cloud.",
		"author": "Maya Angelou",
		"photo":"http://media.independent.com/img/croppedphotos/2011/08/31/main-maya-angelou_t479.jpg?ad14627618f647f3902aa65ed5ac8237c798b1ef"},
		{"id": 5,
		"quote" :" We know what we are, but know not what we may be.",
		"author": "William Shakespeare",
		"photo": "https://simonclark3.files.wordpress.com/2013/02/shakespeare_william.jpg"},
		{"id": 6,
		"quote" :" You must do the things you think you cannot do.",
		"author": "Eleanor Roosevelt",
		"photo": "http://firstladies.c-span.org/Images/VideoStillImgs/EleanorRoosevelt_640x400.jpg"},
		{"id": 7,
		"quote" :"Memories of our lives, of our works and our deeds will continue in others.",
		"author": "Rosa Parks",
		"photo":"http://50thanniversarymarchonwashington.com/wp-content/uploads/2013/02/Rosa-Parks-an-introvert-w-007.jpg"},
		{"id": 8,
		"quote" :"I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'",
		"author": "Muhammad Ali",
		"photo": "http://cdn.history.com/sites/2/2016/02/GettyImages-479933880-E.jpeg"},
		{"id": 9,
		"quote" :"If I have seen further than others, it is by standing upon the shoulders of giants.",
		"author": "Isaac Newton",
		"photo": "http://cdn8.openculture.com/wp-content/uploads/2015/03/30193908/isaac-newton-list-of-sins.jpg"}
		];
		
	function shuffle(inspirationQuotesArray) {
		let currentIndex = inspirationQuotesArray.length, temporaryValue, randomIndex;
		// While there remain elements to shuffle...
		while (0 !== currentIndex) {
			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;
			// And swap it with the current element.
			temporaryValue = inspirationQuotesArray[currentIndex];
			inspirationQuotesArray[currentIndex] = inspirationQuotesArray[randomIndex];
			inspirationQuotesArray[randomIndex] = temporaryValue;
		}
		return inspirationQuotesArray;
	}

	inspirationQuotes = shuffle(inspirationQuotes);
	loveQuotes = shuffle(loveQuotes);
	funnyQuotes = shuffle(funnyQuotes);
	friendshipQuotes = shuffle(friendshipQuotes);
	randomQuotes = shuffle(randomQuotes);
	colors = shuffle(colors);

	
	for (let i = 0; i < inspirationQuotes.length; i++) {
		inspirationQuotesArray.push(inspirationQuotes[i]["quote"]);
		inspirationAuthorsArray.push(inspirationQuotes[i]["author"]);
		inspirationPhotosArray.push(inspirationQuotes[i]["photo"]);
		}
	
	for (let j = 0; j < funnyQuotes.length; j++) {
		funnyQuotesArray.push(funnyQuotes[j]["quote"]);
		funnyAuthorsArray.push(funnyQuotes[j]["author"]);
		funnyPhotosArray.push(funnyQuotes[j]["photo"]);
		}
	
	for (let k = 0; k < loveQuotes.length; k++) {
		loveQuotesArray.push(loveQuotes[k]["quote"]);
		loveAuthorsArray.push(loveQuotes[k]["author"]);
		lovePhotosArray.push(loveQuotes[k]["photo"]);
		}
	
	for (let l = 0; l < friendshipQuotes.length; l++) {
		friendshipQuotesArray.push(friendshipQuotes[l]["quote"]);
		friendshipAuthorsArray.push(friendshipQuotes[l]["author"]);
		friendshipPhotosArray.push(friendshipQuotes[l]["photo"]);
		}
	
	for (let m = 0; m < colors.length; m++) {
		colorsArray.push(colors[m]);
		}
	
	for (let n = 0; n < randomQuotes.length; n++) {
		randomQuotesArray.push(randomQuotes[n]["quote"]);
		randomAuthorsArray.push(randomQuotes[n]["author"]);
		randomPhotosArray.push(randomQuotes[n]["photo"]);

		}	
	
	function submitForm() {
		$('#quote-form').on('submit', function(e) {
			e.preventDefault();
			selecTopic = $('#select-topic').val();
			$('#quote-display,.pager').parent().show();
			$('#next-quote,#previous-quote,#twitter,body').css({'background-color':colorsArray[colorsCounter]});
			$('#quote').css({'color':colorsArray[colorsCounter], 'background-color':'rgba(255,255,255,.5)'});
			
			if ($('#select-topic').val() === 'random-quotes') {
				let quoteString = randomQuotesArray[quotesCounter];
				let quoteAndAuthorString = quoteString + " -" + randomAuthorsArray[quotesCounter];
				let fullTwitterString = 'https://twitter.com/intent/tweet?hashtags=quotes&text='+quoteAndAuthorString;
				$('#twitter').attr('href', fullTwitterString).show();
				$('#quote-display').css({'background-image': 'url('+randomPhotosArray[quotesCounter]+')'}).hide().slideDown(1000);;
				$('#quote').html('<i class="fa fa-quote-left" aria-hidden="true"></i> ' + ' ' + randomQuotesArray[quotesCounter]+ ' ' + '<i class="fa fa-quote-right" aria-hidden="true"></i>'+ "</br>" +" -" + randomAuthorsArray[quotesCounter]).hide().fadeIn(1500);
			}
		
			else if ($('#select-topic').val() === 'funny-quotes') {
				let quoteString = funnyQuotesArray[quotesCounter];
				let quoteAndAuthorString = quoteString + " -" + funnyAuthorsArray[quotesCounter];
				let fullTwitterString = 'https://twitter.com/intent/tweet?hashtags=quotes&text='+quoteAndAuthorString;
				$('#twitter').attr('href', fullTwitterString).show()
				$('#quote-display').css({'background-image': 'url('+funnyPhotosArray[quotesCounter]+')'}).hide().fadeIn(1500);
				$('#quote').html('<i class="fa fa-quote-left" aria-hidden="true"></i>' + ' ' + funnyQuotesArray[quotesCounter]+ ' ' + '<i class="fa fa-quote-right" aria-hidden="true"></i>'+ "</br>" +" -" + funnyAuthorsArray[quotesCounter]).fadeIn(1500);
			}
			
			else if ($('#select-topic').val() === 'inspirational-quotes') {
				let quoteString = inspirationQuotesArray[quotesCounter];
				let quoteAndAuthorString = quoteString + " -" + inspirationAuthorsArray[quotesCounter];
				let fullTwitterString = 'https://twitter.com/intent/tweet?hashtags=quotes&text='+quoteAndAuthorString;
				$('#twitter').attr('href', fullTwitterString).show();
				$('#quote-display').css({'background-image': 'url('+inspirationPhotosArray[quotesCounter]+')'}).hide().fadeIn(1000);
				$('#quote').html('<i class="fa fa-quote-left" aria-hidden="true"></i>' + ' ' + inspirationQuotesArray[quotesCounter]+ ' ' + '<i class="fa fa-quote-right" aria-hidden="true"></i>'+ "</br>" +" -" + inspirationAuthorsArray[quotesCounter]).fadeIn(1500);	
			}
			
			else if ($('#select-topic').val() === 'love-quotes') {
				let quoteString = loveQuotesArray[quotesCounter];
				let quoteAndAuthorString = quoteString + " -" +loveAuthorsArray[quotesCounter];
				let fullTwitterString = 'https://twitter.com/intent/tweet?hashtags=quotes&text='+quoteAndAuthorString;
				$('#twitter').attr('href', fullTwitterString).show();
				$('#quote-display').css({'background-image': 'url('+lovePhotosArray[quotesCounter]+')'}).hide().slideDown(1000);
				$('#quote').html('<i class="fa fa-quote-left" aria-hidden="true"></i>' + ' ' + loveQuotesArray[quotesCounter]+ ' ' + '<i class="fa fa-quote-right" aria-hidden="true"></i>'+ "</br>" +" -" + loveAuthorsArray[quotesCounter]).hide().fadeIn(1500);
			}
			
				else if ($('#select-topic').val() === 'friendship-quotes') {
					
					let quoteString = friendshipQuotesArray[quotesCounter];
					let quoteAndAuthorString = quoteString + " -" +friendshipAuthorsArray[quotesCounter];
					let fullTwitterString = 'https://twitter.com/intent/tweet?hashtags=quotes&text='+quoteAndAuthorString;
					$('#twitter').attr('href', fullTwitterString).show();
					$('#quote-display').css({'background-image': 'url('+friendshipPhotosArray[quotesCounter]+')'}).hide().fadeIn(1000);
					$('#quote').html('<i class="fa fa-quote-left" aria-hidden="true"></i>' +' ' + friendshipQuotesArray[quotesCounter]+ ' ' + '<i class="fa fa-quote-right" aria-hidden="true"></i>'+ "</br>" +" -" + friendshipAuthorsArray[quotesCounter]).hide().fadeIn(1500);
				}
			
			$('#quote-form').change(function() {
				quotesCounter = 0;
				colorsCounter = 0;
			});
			
			}); // end of #quote-form submit function
			
	 } // end of submitForm()
	submitForm();
	
	$('body').css('background-color',colorsArray[quotesCounter]);	
	let modal = $('<div id="modal" class="col-md-6 col-md-offset-3" >'+
  					'<h3>Feeling down and need some inspiration, a laugh, some wisdom about love, or some friendly advice? Then check out some quotes!</h3>'+
 				 '</div>').css({'background-color':'white','color':'black','position':'absolute','top':'20%','border':'2px dashed black'}).appendTo('body').addClass('animated bounceInDown');
  
	$('body').find('#modal').delay(5000).fadeOut(1000, function() {
		$('.well').show().addClass('animated slideInDown');
	});
	
	function nextQuote() {
		$('#next-quote').on('click', function() {
		quotesCounter++;
		colorsCounter++;
		
		
		if (colorsCounter <= -1) {
			colorsCounter = 0;
			
		}
		
		if (colorsCounter > colorsArray.length-1) {
			colorsCounter = 0;
			
		}
		
		if (quotesCounter <= -1) {
			quotesCounter = 0;
			colorsCounter = 0;
		}
			
		if (quotesCounter > randomQuotes.length) {
			quotesCounter = randomQuotes.length;
			colorsCounter = colorsArray.length;
		}
		
		$('#next-quote,#previous-quote,#twitter,body').css({'background-color':colorsArray[colorsCounter]});
		$('#quote').css({ 'color':colorsArray[colorsCounter]});
		
		
		if (selecTopic === 'random-quotes') {
			if (quotesCounter < randomQuotesArray.length) {
				let quoteString = randomQuotesArray[quotesCounter];
				let quoteAndAuthorString = quoteString + " -" + randomAuthorsArray[quotesCounter];
				let fullTwitterString = 'https://twitter.com/intent/tweet?hashtags=quotes&text='+quoteAndAuthorString;
				$('#twitter').attr('href', fullTwitterString).show();
				$('#quote-display').css({'background-image': 'url('+randomPhotosArray[quotesCounter]+')'}).hide().slideDown(1000);
				$('#quote').css({'background-color': 'rgba(255,255,255,.5)'}).html('<i class="fa fa-quote-left" aria-hidden="true"></i>' + ' ' + randomQuotesArray[quotesCounter]+ ' ' + '<i class="fa fa-quote-right" aria-hidden="true"></i>'+ "</br>" +" -" + randomAuthorsArray[quotesCounter]).hide().fadeIn(1500);
			}
			else  {
				$('body,#next-quote,#previous-quote,#quote-display,#twitter').css('background-color','#55aaee');
				$('#quote-display').css({'background-image':'none'}).hide().fadeIn(1000);
				$('#quote').css({'background-color':'transparent', 'color':'white'}).html('No new quotes. Check out the previous quotes, choose another topic, or choose this topic again to re-randomize the quotes.').hide().fadeIn(1500);
				$('#twitter').hide();
				quotesCounter = 25;
			}
		}
		else if ($('#select-topic').val() === 'funny-quotes') {
			if (quotesCounter < funnyQuotesArray.length) {
				let quoteString = funnyQuotesArray[quotesCounter];
				let quoteAndAuthorString = quoteString + " -" + funnyAuthorsArray[quotesCounter];
				let fullTwitterString = 'https://twitter.com/intent/tweet?hashtags=quotes&text='+quoteAndAuthorString;
				$('#twitter').attr('href', fullTwitterString).show();
				$('#quote-display').css({'background-image': 'url('+funnyPhotosArray[quotesCounter]+')'}).hide().fadeIn(1000);
				$('#quote').css({'background-color': 'rgba(255,255,255,.5)'}).html('<i class="fa fa-quote-left" aria-hidden="true"></i>' + ' ' + funnyQuotesArray[quotesCounter]+ ' ' + '<i class="fa fa-quote-right" aria-hidden="true"></i>'+ "</br>" +" -" + funnyAuthorsArray[quotesCounter]).hide().fadeIn(1500);

			}
			else  {
				$('body').css('background-color','#55aaee');
				$('#next-quote,#previous-quote').css({'background-color':'#55aaee', 'color': 'white'});
				$('#quote-display').css({'background-image':'none','background-color': '#55aaee'}).hide().fadeIn(1000);
				$('#quote').css({'background-color':'transparent', 'color':'white'}).html('No new quotes. Check out the previous quotes, choose another topic, or choose this topic again to re-randomize the quotes.').hide().fadeIn(1500);
				$('#twitter').hide();
				quotesCounter = 5;
				colorsCounter = 5
			}
 
		}
		else if ($('#select-topic').val() === 'inspirational-quotes') {
			if (quotesCounter < inspirationQuotesArray.length) {
				let quoteString = inspirationQuotesArray[quotesCounter];
				let quoteAndAuthorString = quoteString + " -" + inspirationAuthorsArray[quotesCounter];
				let fullTwitterString = 'https://twitter.com/intent/tweet?hashtags=quotes&text='+quoteAndAuthorString;
				$('#twitter').attr('href', fullTwitterString).show();
				$('#quote-display').css({'background-image': 'url('+inspirationPhotosArray[quotesCounter]+')'}).hide().fadeIn(0500);
				$('#quote').css({'background-color': 'rgba(255,255,255,.5)'}).html('<i class="fa fa-quote-left" aria-hidden="true"></i>' + ' ' + inspirationQuotesArray[quotesCounter]+ ' ' +'<i class="fa fa-quote-right" aria-hidden="true"></i>'+ "</br>" +" -" + inspirationAuthorsArray[quotesCounter]).hide().slideDown(1500);	
			}
			else  {
				$('body').css('background-color','#55aaee');
				$('#next-quote,#previous-quote').css({'background-color':'#55aaee', 'color': 'white'});
				$('#quote-display').css({'background-image':'none','background-color': '#55aaee'}).hide().fadeIn(1000);
				$('#quote').css({'background-color':'transparent', 'color':'white'}).html('No new quotes. Check out the previous quotes, choose another topic, or choose this topic again to re-randomize the quotes.').hide().fadeIn(1500);
				$('#twitter').hide();
				quotesCounter = 10;
				colorsCounter = 10;
			}
	
		}
		else if ($('#select-topic').val() === 'love-quotes') {
			if (quotesCounter < loveQuotesArray.length) {
				let quoteString = loveQuotesArray[quotesCounter];
				let quoteAndAuthorString = quoteString + " -" + loveAuthorsArray[quotesCounter];
				let fullTwitterString = 'https://twitter.com/intent/tweet?hashtags=quotes&text='+quoteAndAuthorString;
				$('#twitter').attr('href', fullTwitterString).show();
				$('#quote-display').css({'background-image': 'url('+lovePhotosArray[quotesCounter]+')'}).hide().fadeIn(1000);
				$('#quote').css({'background-color': 'rgba(255,255,255,.5)'}).html('<i class="fa fa-quote-left" aria-hidden="true"></i>' + ' ' + loveQuotesArray[quotesCounter]+ ' ' + '<i class="fa fa-quote-right" aria-hidden="true"></i>'+ "</br>" +" -" + loveAuthorsArray[quotesCounter]).hide().fadeIn(1500);
			}
			else  {
				$('body').css('background-color','#55aaee');
				$('#next-quote,#previous-quote').css({'background-color':'#55aaee', 'color': 'white'});
				$('#quote-display').css({'background-image':'none','background-color': '#55aaee','height':'400px'}).hide().fadeIn(1000);
				$('#quote').css({'background-color':'transparent', 'color':'white'}).html('No new quotes. Check out the previous quotes, choose another topic, or choose this topic again to re-randomize the quotes.').hide().fadeIn(1500);
				$('#twitter').hide();
				quotesCounter = 5;
				colorsCounter = 5;
			}
		}
		else if ($('#select-topic').val() === 'friendship-quotes') {
			if (quotesCounter < friendshipQuotesArray.length) {
				let quoteString = friendshipQuotesArray[quotesCounter];
				let quoteAndAuthorString = quoteString + " -" +friendshipAuthorsArray[quotesCounter];
				let fullTwitterString = 'https://twitter.com/intent/tweet?hashtags=quotes&text='+quoteAndAuthorString;
				$('#twitter').attr('href', fullTwitterString).show();
				$('#quote-display').css({'background-image': 'url('+friendshipPhotosArray[quotesCounter]+')'});
				$('#quote').css({'background-color': 'rgba(255,255,255,.5)'}).html('<i class="fa fa-quote-left" aria-hidden="true"></i>' + ' ' + friendshipQuotesArray[quotesCounter]+ ' ' + '<i class="fa fa-quote-right" aria-hidden="true"></i>'+ "</br>" +" -" + friendshipAuthorsArray[quotesCounter]).fadeIn(1000);
			}
			else  {
				$('body').css('background-color','#55aaee');
				$('#next-quote,#previous-quote').css({'background-color':'#55aaee', 'color': 'white'});
				$('#quote-display').css({'background-image':'none','background-color': '#55aaee'}).hide().fadeIn(1000);
				$('#quote').css({'background-color':'transparent', 'color':'white'}).html('No new quotes. Check out the previous quotes, choose another topic, or choose this topic again to re-randomize the quotes.').hide().fadeIn(1500);
				$('#twitter').hide();
				quotesCounter = 5;
				colorsCounter = 5;
			}
		}
		}); // end of #next-quote click function
	}; // end of nextQuote()
	nextQuote();
	function previousQuote() {
		$('#previous-quote').on('click',function() {
			quotesCounter--;
			colorsCounter--;
			
			
			if (colorsCounter < 0) {
			colorsCounter = colorsArray.length-1;
			}
				
			
			if (colorsCounter > colorsArray.length-1) {
			colorsCounter = colorsArray.length-1;
			
			}
			
			
				
			if (quotesCounter < 0) {
				quotesCounter = -1;
				colorsCounter = -1;
			}
			if (quotesCounter > 25) {
				quotesCounter = randomQuotes.length;	
				colorsCounter = colorsArray.length;
			}
			
			$('#next-quote,#previous-quote,#twitter,body').css({'background-color':colorsArray[colorsCounter]});
			$('#quote').css({'color':colorsArray[colorsCounter]});
			
			
			
			if ($('#select-topic').val() === 'random-quotes') {
				if (quotesCounter > -1) {
					let quoteString = randomQuotesArray[quotesCounter];
					let quoteAndAuthorString = quoteString + " -" + randomAuthorsArray[quotesCounter];
					let fullTwitterString = 'https://twitter.com/intent/tweet?hashtags=quotes&text='+quoteAndAuthorString;
					$('#twitter').attr('href', fullTwitterString).show();
					$('#quote-display').css({'background-image': 'url('+randomPhotosArray[quotesCounter]+')'}).hide().slideDown(1000);
					$('#quote').css({'background-color': 'rgba(255,255,255,.5)'}).html('<i class="fa fa-quote-left" aria-hidden="true"></i>' + ' ' + randomQuotesArray[quotesCounter]+ ' ' + '<i class="fa fa-quote-right" aria-hidden="true"></i>'+ "</br>" +" -" + randomAuthorsArray[quotesCounter]).hide().fadeIn(1500);
				}	
				else  {
					$('body').css('background-color','#55aaee');
					$('#next-quote,#previous-quote').css({'background-color':'#55aaee', 'color': 'white'});
					$('#quote-display').css({'background-image':'none','background-color': '#55aaee'}).hide().fadeIn(1000);
					$('#quote').css({'background-color':'transparent', 'color':'white'}).html('No previous quotesCounter. Check out the next quotes, choose another topic, or choose this topic again to re-randomize the quotes.').hide().fadeIn(1500);
					$('#twitter').hide();
					quotesCounter = -1;
				}
			}
			else if ($('#select-topic').val() === 'funny-quotes') {
				if (quotesCounter > -1) {
					let quoteString = funnyQuotesArray[quotesCounter];
						let quoteAndAuthorString = quoteString + " -" + funnyAuthorsArray[quotesCounter];
						let fullTwitterString = 'https://twitter.com/intent/tweet?hashtags=quotes&text='+quoteAndAuthorString;
						$('#twitter').attr('href', fullTwitterString).show();
						$('#quote-display').css({'background-image': 'url('+funnyPhotosArray[quotesCounter]+')'}).hide().fadeIn(1000);
						$('#quote').css({'background-color': 'rgba(255,255,255,.5)'}).html('<i class="fa fa-quote-left" aria-hidden="true"></i>' + ' ' + funnyQuotesArray[quotesCounter]+ ' ' +'<i class="fa fa-quote-right" aria-hidden="true"></i>'+ "</br>" +" -" + funnyAuthorsArray[quotesCounter]).hide().fadeIn(1500);
				}
				else  {
					$('body').css('background-color','#55aaee');
					$('#next-quote,#previous-quote').css({'background-color':'#55aaee', 'color': 'white'});
					$('#quote-display').css({'background-image':'none','background-color': '#55aaee'}).hide().fadeIn(1000);
					$('#quote').css({'background-color':'transparent', 'color':'white'}).html('No previous quotes. Check out the next quotes, choose another topic, or choose this topic again to re-randomize the quotes.').hide().fadeIn(1500);
					$('#twitter').hide();
					quotesCounter = -1;
				}
			}
			else if ($('#select-topic').val() === 'inspirational-quotes') {
				if (quotesCounter > -1) {
					let quoteString = inspirationQuotesArray[quotesCounter];
					let quoteAndAuthorString = quoteString + " -" + inspirationAuthorsArray[quotesCounter];
					let fullTwitterString = 'https://twitter.com/intent/tweet?hashtags=quotes&text='+quoteAndAuthorString;
					$('#twitter').attr('href', fullTwitterString).show();
					$('#quote-display').css({'background-image': 'url('+inspirationPhotosArray[quotesCounter]+')'}).hide().slideDown(1000);
					$('#quote').css({'background-color': 'rgba(255,255,255,.5)'}).html('<i class="fa fa-quote-left" aria-hidden="true"></i>'+ ' ' + inspirationQuotesArray[quotesCounter]+ ' ' +'<i class="fa fa-quote-right" aria-hidden="true"></i>'+ "</br>" +" -" + inspirationAuthorsArray[quotesCounter]).hide().fadeIn(1500);	
				}
				else  {
					$('body').css('background-color','#55aaee');
					$('#next-quote,#previous-quote').css({'background-color':'#55aaee', 'color': 'white'});
					$('#quote-display').css({'background-image':'none','background-color': '#55aaee'}).hide().fadeIn(1000);
					$('#quote').css({'background-color':'transparent', 'color':'white'}).html('No previous quotes. Check out the next quotes, choose another topic, or choose this topic again to re-randomize the quotes.').hide().fadeIn(1500);
					$('#twitter').hide();
					quotesCounter = -1;
				}
			}
			else if ($('#select-topic').val() === 'love-quotes') {
				if (quotesCounter > -1) {
					let quoteString = loveQuotesArray[quotesCounter];
					let quoteAndAuthorString = quoteString + " -" +loveAuthorsArray[quotesCounter];
					let fullTwitterString = 'https://twitter.com/intent/tweet?hashtags=quotes&text='+quoteAndAuthorString;
					$('#twitter').attr('href', fullTwitterString).show();
					$('#quote-display').css({'background-image': 'url('+lovePhotosArray[quotesCounter]+')'}).hide().slideDown(1000);
					$('#quote').css({'background-color': 'rgba(255,255,255,.5)'}).html('<i class="fa fa-quote-left" aria-hidden="true"></i>' + ' '  + loveQuotesArray[quotesCounter]+ ' ' +'<i class="fa fa-quote-right" aria-hidden="true"></i>'+ "</br>" +" -" + loveAuthorsArray[quotesCounter]).hide().fadeIn(1500);
				}
				else  {
					$('body').css('background-color','#55aaee');
					$('#next-quote,#previous-quote').css({'background-color':'#55aaee', 'color': 'white'});
					$('#quote-display').css({'background-image':'none','background-color': '#55aaee'}).hide().fadeIn(1000);
					$('#quote').css({'background-color':'transparent', 'color':'white'}).html('No previous quotes. Check out the next quotes, choose another topic, or choose this topic again to re-randomize the quotes.').hide().fadeIn(1500);
					$('#twitter').hide();
					quotesCounter = -1;
				}
			}
			else if ($('#select-topic').val() === 'friendship-quotes') {
				if (quotesCounter > -1) {
					let quoteString = friendshipQuotesArray[quotesCounter];
					let quoteAndAuthorString = quoteString + " -" +friendshipAuthorsArray[quotesCounter];
					let fullTwitterString = 'https://twitter.com/intent/tweet?hashtags=quotes&text='+quoteAndAuthorString;
					$('#twitter').attr('href', fullTwitterString).show();
					$('#quote-display').css({'background-image': 'url('+friendshipPhotosArray[quotesCounter]+')'}).hide().slideDown(1500);
					$('#quote').css({'background-color': 'rgba(255,255,255,.5)'}).html('<i class="fa fa-quote-left" aria-hidden="true"></i>' + ' ' + friendshipQuotesArray[quotesCounter]+ ' ' +'<i class="fa fa-quote-right" aria-hidden="true"></i>'+ "</br>" +" -" + friendshipAuthorsArray[quotesCounter]).fadeIn(1000);
				}
				else  {
					$('body').css('background-color','#55aaee');
					$('#next-quote,#previous-quote').css({'background-color':'#55aaee', 'color': 'white'});
					$('#quote-display').css({'background-image':'none','background-color': '#55aaee'}).hide().fadeIn(1000);
					$('#quote').css({'background-color':'transparent', 'color':'white'}).html('No previous quotes. Check out the next quotes, choose another topic, or choose this topic again to re-randomize the quotes.').hide().fadeIn(1500);
					$('#twitter').hide();
					quotesCounter = -1;
				}
			
			}
		}); // end of #previous-quote click function
	}; // end of previousQuote()
	previousQuote();
	$('#next-quote,#previous-quote,#twitter').on('mouseenter',function() {
		$(this).css('box-shadow','2px 2px 2px black');
	});
	$('#next-quote,#previous-quote,#twitter').on('mouseleave',function() {
		$(this).css('box-shadow','none');
	});
	


}); // end of document ready()