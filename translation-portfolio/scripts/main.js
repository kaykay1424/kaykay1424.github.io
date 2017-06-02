$(document).ready(function() {
		// About Me page
		
	$('.header').load('loads/header.html', function() {
		
		let = pageTitle = $(document).find("title").text();
	
		if (pageTitle.match(/about/i) !== null) {
			$('#nav-about').addClass('active');
			
		}
		else if (pageTitle.match(/resume/i) !== null) {
			$('#nav-resume').addClass('active');
		}
		else if (pageTitle.match(/all topics/i) !== null) {
			$('#nav-all-topics').addClass('active');
			$('#nav-translations').addClass('active');
		}
		else if (pageTitle.match(/politics/i) !== null) {
			$('#nav-politics').addClass('active');
			$('#nav-translations').addClass('active');
		}
		else if (pageTitle.match(/government/i) !== null) {
			$('#nav-government').addClass('active');
			$('#nav-translations').addClass('active');
		}
		else if (pageTitle.match(/contact/i) !== null) {
			$('#nav-contact').addClass('active');
			
		}
	}); // .header.load()

	$('.footer').load('loads/footer.html');

	$('#portfolio-img').mouseenter(function() {
		$(this).html('<h3 class="span-greeting">Hola, me llamo Kayla</h3><h3 class="eng-greeting">Hi, I\'m Kayla</h3>').css({'position':'relative'});
		$('.eng-greeting').css({'position':'absolute', 'top':0,'background-color': 'rgba(255,255,255,.5)', 'color':'green', 'width':'100%','text-align':'center', 'text-shadow': '1px 1px 1px black'});
		$('.span-greeting').css({'position':'absolute', 'bottom':0,'background-color': 'rgba(255,255,255,.5)', 'color':'green', 'width':'100%','text-align':'center', 'text-shadow': '1px 1px 1px black'});

	});

	$('#portfolio-img').mouseleave(function() {
		$(this).find('h3').remove();

	});
	
		// Contact Me Page
	
	$('.contact-form').on('submit',function() {
		let mailTo = 'michaela.s.clements@gmail.com';
		let subject = $('#subject').val();
		let message = $('#message').val();
		$('.contact-button a').attr('href','mailto:'+mailTo+'?subject='+subject+'&body='+message+'');
		$('.contact-button a')[0].click();

	}); // end of .contact-form submit()
	
	
				// Translated Articles Pages
				
	$('.header-bubble').mouseenter(function() {
		$(this).addClass('animated swing');

	});
	
	$('table').addClass('table-bordered table');
	
	$('.header-bubble').mouseleave(function() {
		$(this).removeClass('animated swing');

	});
		// Government Articles Page
		
	$('#government-topic-form').on('submit', function(e) {
		e.preventDefault();
		let allValues = [];
		$('#government-topics-container .col-md-12').hide();
		let selectedDate = $('select option:selected').val();
		$('#government-topics-container .col-md-12').find('.article-dates:contains('+selectedDate+')').parents('#government-topics-container .col-md-12').show();
		let showArticleLength = $('#government-topics-container .col-md-12:visible').length;
		$('#government-topic-form .filter-results').html('Article match(es): '+ showArticleLength);;
		$('#government-topic-form')[0].reset();
	}); //end of #government-topic-form submit function
		
		// Politics Articles Page
	$('#politics-topic-form').on('submit', function(e) {
  		e.preventDefault();
  		let allValues = [];
  		$('.political-articles-container .col-md-12').hide();
  		let selectedDate = $('select option:selected').val();
  		$('.political-articles-container .col-md-12').find('.article-dates:contains('+selectedDate+')').parents('.political-articles-container .col-md-12').show();
  		let showArticleLength = $('.political-articles-container .col-md-12:visible').length;
  		$('.filter-results').html('Article match(es): '+ showArticleLength);
  		$('#politics-topic-form')[0].reset();
	}); //end of #politics-topic-form submit function
	
		// All Articles Page
	$('#all-topics-form').on('submit', function(e) {
		e.preventDefault();
		let allValues = [];
		$('.all-topics-container .col-md-12').hide();
		$("input[type='checkbox']:checked").each(function() {
			let checkboxValue = $(this).val();
			allValues.push(checkboxValue);
	
		}); // end of values each function

		for (var i = 0; i < allValues.length; i++) {

			let selectedDate = $('select option:selected').val();
			if (selectedDate !== 'select-year') {
				let showArticle = $('.all-topics-container .col-md-12 .label:contains('+allValues[i]+')').siblings('.all-topics-container .article-dates:contains('+selectedDate+')').parents('.all-topics-container .col-md-12');
				showArticle.show();
			}
	
			else {
			let showArticle = $('.col-md-12 .label:contains('+allValues[i]+')').parents('.all-topics-container .col-md-12');
			showArticle.show();
			}
	
		}
		let showArticleLength = $('.all-topics-container .col-md-12:visible').length;
		$('#all-topics-form .filter-results').html('Article match(es): '+ showArticleLength);
		$('#all-topics-form')[0].reset();
	}); //end of #all-topics-form submit function
			
}); // end of document.ready