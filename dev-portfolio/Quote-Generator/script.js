/*
	Explanation of program:
	
	When a user chooses a topic and submits the form, a quote, author, and image
	of the author will be displayed. When a user clicks the next button, a new quote, author
	and image will appear and if the user clicks the previous button the previous quote,author,
	and image will show. The background color of the quote, the previous button, next button
	twitter button, and the body will change each time a user clicks the previous or next button
	or submits the form. When there are no more quotes to be displayed, because they've reached 
	the end or beginning, they will be prompted to go back through the quotes, choose the topic
	again to re-randomize the quotes ,or choose another topic. When a user clicks the twitter button
	they will be taken to a new page where they can post a tweet containing the quote and author
	with the hashtag 'quotes'.
	
	
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
	
	
	
	let colors = ['#2122FF', '#5CFF96','#20ACFF','#E8270C', '#FFF73E','#98270C', '#FF3142',
	
	 '#D93DEF','#EF39C1','#984A28', '#3EFF49','#FFBB49','#EF3D8D', '#000000'];
	 
	let randomQuotes = [{ "id": 0,
	
		"quote" : "My best friend is the one who brings out the best in me.",
		
		"author": "Henry Ford",
		
		"photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Henry_ford_1919.jpg/1200px-Henry_ford_1919.jpg"},
		
		 { "id": 1,
		 
		"quote" :"Friends and good manners will carry you where money won't go.",
		
		"author": "Margaret Walker",
		
		"photo":"https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Margaret_Walker.jpg/220px-Margaret_Walker.jpg" },
		
		{ "id": 2,
		
		"quote" :"The only way to have a friend is to be one.",
		
		"author": "Ralph Waldo Emerson",
		
		"photo": "https://www.poets.org/sites/default/files/styles/286x289/public/images/biographies/rwemerso.jpg?itok=dp_SDSKh"},
		
		
		{ "id": 3,
		"quote" :"Be slow in choosing a friend, slower in changing.",
		
		"author": "Benjamin Franklin",
		
		"photo": "https://www.biography.com/.image/c_fit,cs_srgb,dpr_1.0,q_80,w_620/MTE1ODA0OTcxNjMyNzg5MDA1/benjamin-franklin-9301234-2-402.jpg"},
		
		{ "id": 4,
		
		"quote" :"Lots of people want to ride with you in the limo, but what you want is someone who will take the bus with you when the limo breaks down.",
		
		"author": "Oprah Winfrey",
		
		"photo":"https://inspiritedliving.com/wp-content/uploads/2016/02/oprahwinfrey_2005.jpg"},
		
		{ "id": 5,
		
		"quote" : "Love is the only force capable of transforming an enemy into a friend.",
		
		"author": "Martin Luther King, Jr.",
		
		"photo": "https://www.biography.com/.image/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTE5NTU2MzE2MjgwNDg5NDgz/martin-luther-king-jr-9365086-2-402.jpg"},
		
		 { "id": 6,
		 
		"quote" :"Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
		
		"author": "Laozi",
		
		"photo":"https://manaretreat.com/wp-content/uploads/Lao-Tzu.jpg" },
		
		{ "id": 7,
		
		"quote" :"If you have only one smile in you give it to the people you love.",
		
		"author": "Maya Angelou",
		
		"photo": "https://www.biography.com/.image/t_share/MTQ3NjM5NTA5NjU4Mzc5NjUy/maya_angelou_photo_by_deborah_feingold_corbis_entertainment_getty_533084708.jpg"},
		
		{ "id": 8,
		
		"quote" :"Beauty is when you can appreciate yourself. When you love yourself, that's when you're most beautiful.",
		
		"author": "Zoe Kravitz",
		
		"photo": "https://pmcdeadline2.files.wordpress.com/2015/12/zoekravitz-copy.jpg"},
		
		{ "id": 9,
		
		"quote" :"Choose a job you love, and you will never have to work a day in your life.",
		
		"author": "Confucius",
		
		"photo": "https://www.biography.com/.image/t_share/MTE5NDg0MDU0OTMwNjg3NTAz/confucius-9254926-2-402.jpg"},
		
		{ "id": 10,
		
		"quote" : "Behind every great man is a woman rolling her eyes.",
		
		"author": "Jim Carrey",
		
		"photo": "https://pmcdeadline2.files.wordpress.com/2017/04/jim-carrey-headshot-credit-jason-laveris_filmmagic.jpg?w=605"},
		
		 { "id": 11,
		 
		"quote" :"Happiness is having a large, loving, caring, close-knit family in another city.",
		
		"author": "George Burns",
		
		"photo":"https://upload.wikimedia.org/wikipedia/commons/4/49/George_Burns_1961.JPG" },
		
		{ "id": 12,
		
		"quote" :"Laziness is nothing more than the habit of resting before you get tired.",
		
		"author": "Jules Renard",
		
		"photo": "https://upload.wikimedia.org/wikipedia/commons/2/21/Jules_Renard_circa_1900.jpg"},
		
		{ "id": 13,
		
		"quote" :"Always remember that you are absolutely unique. Just like everyone else.",
		
		"author": "Margaret Mead",
		
		"photo": "https://www.biography.com/.image/t_share/MTE1ODA0OTcxNzIxMzI4MTQx/margaret-mead-9404056-1-402.jpg"},
		
		{ "id": 14,
		
		"quote" :"I am not a member of any organized political party. I am a Democrat.",
		
		"author": "Will Rogers",
		
		"photo":"https://upload.wikimedia.org/wikipedia/commons/f/f6/Will_Rogers_1922.jpg"},
		
		{ "id": 15,
		
		"quote" : "Two roads diverged in a wood and I - I took the one less traveled by, and that has made all the difference.",
		
		"author": "Robert Frost",
		
		"photo": "https://www.amherst.edu/media/view/363037/standard/Frost%2BPortrait%2B1948%2BPH1_19.jpg"},
		
		 { "id": 16,
		 
		"quote" :" We must let go of the life we have planned, so as to accept the one that is waiting for us.",
		
		"author": "Joseph Campbell",
		
		"photo":"https://static.wixstatic.com/media/621db4_e24e37484b9c4ac8adbd1deb1af80111.jpg"},
		
		{ "id": 17,
		"quote" :" Let us remember: One book, one pen, one child, and one teacher can change the world.",
		
		"author": "Malala Yousafzai",
		
		"photo": "https://s-media-cache-ak0.pinimg.com/736x/f2/3f/79/f23f79f69ef4b1076dbd22a3bbaa1736.jpg"},
		
		{ "id": 18,
		
		"quote" :" Someone is sitting in the shade today because someone planted a tree a long time ago.",
		
		"author": "Warren Buffet",
		
		"photo": "https://www.biography.com/.image/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTE5NTU2MzE2MTY4Njg1MDY3/warren-buffett-9230729-1-402.jpg"},
		
		{ "id": 19,
		
		"quote" :" Try to be a rainbow in someone's cloud.",
		
		"author": "Maya Angelou",
		
		"photo":"https://www.poets.org/sites/default/files/styles/286x289/public/images/biographies/mangelou.jpg?itok=adbVzSfS"},
		
		{ "id": 20,
		
		"quote" :" We know what we are, but know not what we may be.",
		
		"author": "William Shakespeare",
		
		"photo": "https://simonclark3.files.wordpress.com/2013/02/shakespeare_william.jpg"},
		
		{ "id": 21,
		
		"quote" :" You must do the things you think you cannot do.",
		
		"author": "Eleanor Roosevelt",
		
		"photo": "https://upload.wikimedia.org/wikipedia/commons/2/22/Eleanor_Roosevelt_portrait_1933.jpg"},
		
		{ "id": 22,
		
		"quote" :"Memories of our lives, of our works and our deeds will continue in others.",
		
		"author": "Rosa Parks",
		
		"photo": "https://www.biography.com/.image/c_fill%2Ccs_srgb%2Cg_face%2Ch_170%2Cq_80%2Cw_300/MTQ1MTM5Nzk3MDg0NzQzMDY0/rosa-parks---legacy.jpg"},
		
		{ "id": 23,
		
		"quote" :"I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'",
		
		"author": "Muhammad Ali",
		
		"photo": "https://peopledotcom.files.wordpress.com/2016/08/muhammad-ali-z-600.jpg?w=600"},
		
		{ "id": 24,
		
		"quote" :"If I have seen further than others, it is by standing upon the shoulders of giants.",
		
		"author": "Isaac Newton",
		
		"photo": "https://upload.wikimedia.org/wikipedia/commons/3/39/GodfreyKneller-IsaacNewton-1689.jpg"}];
		
	let friendshipQuotes = [{ "id": 0,
	
		"quote" : "My best friend is the one who brings out the best in me.",
		
		"author": "Henry Ford",
		
		"photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Henry_ford_1919.jpg/1200px-Henry_ford_1919.jpg"},
		
		 { "id": 1,
		 
		"quote" :"Friends and good manners will carry you where money won't go.",
		
		"author": "Margaret Walker",
		
		"photo":"https://upload.wikimedia.org/wikipedia/en/thumb/0/03/Margaret_Walker.jpg/220px-Margaret_Walker.jpg" },
		
		{ "id": 2,
		"quote" :"The only way to have a friend is to be one.",
		
		"author": "Ralph Waldo Emerson",
		
		"photo": "https://www.poets.org/sites/default/files/styles/286x289/public/images/biographies/rwemerso.jpg?itok=dp_SDSKh"},
		
		{ "id": 3,
		
		"quote" :"Be slow in choosing a friend, slower in changing.",
		
		"author": "Benjamin Franklin",
		
		"photo": "https://www.biography.com/.image/c_fit,cs_srgb,dpr_1.0,q_80,w_620/MTE1ODA0OTcxNjMyNzg5MDA1/benjamin-franklin-9301234-2-402.jpg"},
		
		{ "id": 4,
		
		"quote" :"Lots of people want to ride with you in the limo, but what you want is someone who will take the bus with you when the limo breaks down.",
		
		"author": "Oprah Winfrey",
		
		"photo":"https://inspiritedliving.com/wp-content/uploads/2016/02/oprahwinfrey_2005.jpg"}];
		
	let loveQuotes = [{ "id": 0,
	
		"quote" : "Love is the only force capable of transforming an enemy into a friend.",
		
		"author": "Martin Luther King, Jr.",
		
		"photo": "https://www.biography.com/.image/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTE5NTU2MzE2MjgwNDg5NDgz/martin-luther-king-jr-9365086-2-402.jpg"},
		
		 { "id": 1,
		 
		"quote" :"Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.",
		
		"author": "Laozi",
		
		"photo":"https://manaretreat.com/wp-content/uploads/Lao-Tzu.jpg" },
		
		{ "id": 2,
		
		"quote" :"If you have only one smile in you give it to the people you love.",
		
		"author": "Maya Angelou",
		
		"photo": "https://www.poets.org/sites/default/files/styles/286x289/public/images/biographies/mangelou.jpg?itok=adbVzSfS"},
		
		{ "id": 3,
		
		"quote" :"Beauty is when you can appreciate yourself. When you love yourself, that's when you're most beautiful.",
		
		"author": "Zoe Kravitz",
		
		"photo": "https://pmcdeadline2.files.wordpress.com/2015/12/zoekravitz-copy.jpg"},
		
		{ "id": 4,
		
		"quote" : "Choose a job you love, and you will never have to work a day in your life.",
		
		"author": "Confucius",
		
		"photo": "https://www.biography.com/.image/t_share/MTE5NDg0MDU0OTMwNjg3NTAz/confucius-9254926-2-402.jpg"}];
		
	 let funnyQuotes = [
	 	
	 	{"id": 0,
	 
		"quote" : "Behind every great man is a woman rolling her eyes.",
		
		"author": "Jim Carrey",
		
		"photo": "https://pmcdeadline2.files.wordpress.com/2017/04/jim-carrey-headshot-credit-jason-laveris_filmmagic.jpg?w=605"},
		
		 { "id": 1,
		 
		"quote" :"Happiness is having a large, loving, caring, close-knit family in another city.",
		
		"author": "George Burns",
		
		"photo": "https://upload.wikimedia.org/wikipedia/commons/4/49/George_Burns_1961.JPG" },
		
		{ "id": 2,
		
		"quote" : "Laziness is nothing more than the habit of resting before you get tired.",
		
		"author": "Jules Renard",
		
		"photo": "https://upload.wikimedia.org/wikipedia/commons/2/21/Jules_Renard_circa_1900.jpg"},
		
		{ "id": 3,
		
		"quote" :"Always remember that you are absolutely unique. Just like everyone else.",
		
		"author": "Margaret Mead",
		
		"photo": "https://www.biography.com/.image/t_share/MTE1ODA0OTcxNzIxMzI4MTQx/margaret-mead-9404056-1-402.jpg"},
		
		{ "id": 4,
		
		"quote" :"I am not a member of any organized political party. I am a Democrat.",
		
		"author": "Will Rogers",
		
		"photo":"https://upload.wikimedia.org/wikipedia/commons/f/f6/Will_Rogers_1922.jpg"}];
		
	let inspirationQuotes = [{ "id": 0,
	
		"quote" : "Two roads diverged in a wood and I - I took the one less traveled by, and that has made all the difference.",
		
		"author": "Robert Frost",
		
		"photo": "https://www.amherst.edu/media/view/363037/standard/Frost%2BPortrait%2B1948%2BPH1_19.jpg"},
		
		 { "id": 1,
		"quote" :" We must let go of the life we have planned, so as to accept the one that is waiting for us.",
		
		"author": "Joseph Campbell",
		
		"photo": "https://static.wixstatic.com/media/621db4_e24e37484b9c4ac8adbd1deb1af80111.jpg"},
		
		{ "id": 2,
		
		"quote" :" Let us remember: One book, one pen, one child, and one teacher can change the world.",
		
		"author": "Malala Yousafzai",
		
		"photo": "https://s-media-cache-ak0.pinimg.com/736x/f2/3f/79/f23f79f69ef4b1076dbd22a3bbaa1736.jpg"},
		
		{ "id": 3,
		
		"quote" :" Someone is sitting in the shade today because someone planted a tree a long time ago.",
		
		"author": "Warren Buffet",
		
		"photo": "https://www.biography.com/.image/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTE5NTU2MzE2MTY4Njg1MDY3/warren-buffett-9230729-1-402.jpg"},
		
		{ "id": 4,
		
		"quote" :" Try to be a rainbow in someone's cloud.",
		
		"author": "Maya Angelou",
		
		"photo": "https://www.poets.org/sites/default/files/styles/286x289/public/images/biographies/mangelou.jpg?itok=adbVzSfS"},
		
		{ "id": 5,
		
		"quote" :" We know what we are, but know not what we may be.",
		
		"author": "William Shakespeare",
		
		"photo": "https://simonclark3.files.wordpress.com/2013/02/shakespeare_william.jpg"},
		
		{ "id": 6,
		
		"quote" :" You must do the things you think you cannot do.",
		
		"author": "Eleanor Roosevelt",
		
		"photo": "https://upload.wikimedia.org/wikipedia/commons/2/22/Eleanor_Roosevelt_portrait_1933.jpg"},
		
		{ "id": 7,
		"quote" :"Memories of our lives, of our works and our deeds will continue in others.",
		
		"author": "Rosa Parks",
		
		"photo":"https://www.biography.com/.image/c_fill%2Ccs_srgb%2Cg_face%2Ch_170%2Cq_80%2Cw_300/MTQ1MTM5Nzk3MDg0NzQzMDY0/rosa-parks---legacy.jpg"},
		
		{ "id": 8,
		
		"quote" :"I hated every minute of training, but I said, 'Don't quit. Suffer now and live the rest of your life as a champion.'",
		
		"author": "Muhammad Ali",
		
		"photo": "https://peopledotcom.files.wordpress.com/2016/08/muhammad-ali-z-600.jpg?w=600"},
		
		{ "id": 9,
		"quote" :"If I have seen further than others, it is by standing upon the shoulders of giants.",
		
		"author": "Isaac Newton",
		
		"photo": "https://upload.wikimedia.org/wikipedia/commons/3/39/GodfreyKneller-IsaacNewton-1689.jpg"}
		
		];
		

	function shuffleArrays() {	
		
		inspirationQuotesArray = [];

		inspirationAuthorsArray = [];

		inspirationPhotosArray = [];

		funnyQuotesArray = [];

		funnyAuthorsArray = [];

		funnyPhotosArray = [];

		loveQuotesArray = [];

		loveAuthorsArray = [];

		lovePhotosArray = [];

		colorsArray = [];

		friendshipQuotesArray = [];

		friendshipAuthorsArray = [];

		friendshipPhotosArray = [];

		randomQuotesArray = [];

		randomAuthorsArray = [];

		randomPhotosArray = [];
	
	function shuffle(quotesArray) {
	
		let currentIndex = quotesArray.length, temporaryValue, randomIndex;
		
		// While there remain elements to shuffle...
		
		while (0 !== currentIndex) {
		
			// Pick a remaining element...
			
			randomIndex = Math.floor(Math.random() * currentIndex);
			
			currentIndex -= 1;
			
			// And swap it with the current element.
			
			temporaryValue = quotesArray[currentIndex];
			
			quotesArray[currentIndex] = quotesArray[randomIndex];
			
			quotesArray[randomIndex] = temporaryValue;
		}
		
		return quotesArray;
		
	} // end of shuffle()

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
	
	} // end of shuffleArrays()
	
	shuffleArrays();
	
	function submitForm() {
	
		$('#quote-form').on('submit', function(e) {
		
			e.preventDefault();
			
			shuffleArrays();
			
			quotesCounter = 0;
				
			colorsCounter = 0;
			
			selecTopic = $('#select-topic').val();
				
			$('.quote-display-row, .controls-container-row,#quote-display,#controls-container').show();
			
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
				
				$('#twitter').attr('href', fullTwitterString).show();

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
			
			// responsive design 
			
			let screenHeight = $(window).height();
			
			let rowWellHeight = $('.row-well').height();
			
			let controlsRowHeight = $('.controls-container-row').height();
			
			let difference = screenHeight-(rowWellHeight + controlsRowHeight);
			
			$('.quote-display-row').height(difference-100);
			
			let quoteDisplayRowHeight = $('.quote-display-row').height();
			
			$('#quote-display').height(difference - 105);
			
			}); // end of #quote-form.submit()
			
	 } // end of submitForm()
	 
	submitForm();
	
	$('body').css('background-color',colorsArray[quotesCounter]);
		
	let modal = $('<div id="modal" class="col-md-6 col-md-offset-3" >'+
	
  					'<h3>Feeling down and need some inspiration, a laugh, some wisdom about love, or some friendly advice? Then check out some quotes!</h3>'+
  					
 				 '</div>').appendTo('body').addClass('animated bounceInDown');
  
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
					
					quotesCounter = randomQuotes.length;
				
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
					
					quotesCounter = funnyQuotes.length;
					
					colorsCounter = funnyQuotes.length;
				}
 
			}
			else if ($('#select-topic').val() === 'inspirational-quotes') {
			
				if (quotesCounter < inspirationQuotesArray.length) {
				
					let quoteString = inspirationQuotesArray[quotesCounter];
					
					let quoteAndAuthorString = quoteString + " -" + inspirationAuthorsArray[quotesCounter];
					
					let fullTwitterString = 'https://twitter.com/intent/tweet?hashtags=quotes&text='+quoteAndAuthorString;
					
					$('#twitter').attr('href', fullTwitterString).show();
					
					$('#quote-display').css({'background-image': 'url('+inspirationPhotosArray[quotesCounter]+')'}).hide().fadeIn(500);
					
					$('#quote').css({'background-color': 'rgba(255,255,255,.5)'}).html('<i class="fa fa-quote-left" aria-hidden="true"></i>' + ' ' + inspirationQuotesArray[quotesCounter]+ ' ' +'<i class="fa fa-quote-right" aria-hidden="true"></i>'+ "</br>" +" -" + inspirationAuthorsArray[quotesCounter]).hide().slideDown(1500);	
				
				}
				
				else  {
				
					$('body').css('background-color','#55aaee');
					
					$('#next-quote,#previous-quote').css({'background-color':'#55aaee', 'color': 'white'});
					
					$('#quote-display').css({'background-image':'none','background-color': '#55aaee'}).hide().fadeIn(1000);
					
					$('#quote').css({'background-color':'transparent', 'color':'white'}).html('No new quotes. Check out the previous quotes, choose another topic, or choose this topic again to re-randomize the quotes.').hide().fadeIn(1500);
					
					$('#twitter').hide();
					
					quotesCounter = inspirationQuotes.length;
					
					colorsCounter = inspirationQuotes.length;
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
					
					quotesCounter = loveQuotes.length;
					
					colorsCounter = loveQuotes.length;
				
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
					
					quotesCounter = friendshipQuotes.length;
					
					colorsCounter = friendshipQuotes.length;
					
				}
				
			}
			
		}); // end of #next-quote.click()
		
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
			if (quotesCounter > randomQuotes.length) {
			
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
					
					$('#quote').css({'background-color':'transparent', 'color':'white'}).html('No previous quotes. Check out the next quotes, choose another topic, or choose this topic again to re-randomize the quotes.').hide().fadeIn(1500);
					
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
			
		}); // end of #previous-quote.click()
		
	}; // end of previousQuote()
	
	previousQuote();
	
	$('#next-quote,#previous-quote,#twitter').on('mouseenter',function() {
	
		$(this).css('box-shadow','2px 2px 2px black');
		
	});
	
	$('#next-quote,#previous-quote,#twitter').on('mouseleave',function() {
	
		$(this).css('box-shadow','none');
		
	});
	
	// responsive design
	
	$(window).resize(function() {
		
		let screenHeight = $(window).height();
		
		let rowWellHeight = $('.well').height();
		
		let controlsRowHeight = $('.controls-container-row').height();
		
		let difference = screenHeight-(rowWellHeight +controlsRowHeight);
		
		$('.quote-display-row').height(difference-100);
		
		let quoteDisplayRowHeight = $('.quote-display-row').height();
		
		$('#quote-display').height(difference - 105);
		
		
	}); // end of window.resize()

}); // end of document.ready()