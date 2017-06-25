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
			$('form')[0].reset();
		}
		else if (pageTitle.match(/politics/i) !== null) {
			$('#nav-politics').addClass('active');
			$('#nav-translations').addClass('active');
			$('form')[0].reset();
		}
		else if (pageTitle.match(/government/i) !== null) {
			$('#nav-government').addClass('active');
			$('#nav-translations').addClass('active');
			$('form')[0].reset();
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
  		$('#government-topics-container').find('.no-results').remove();
  		$('#government-topics-container .col-md-12').hide();
  		let selectedDate = $('select option:selected').val();
  		if (selectedDate !== 'select-year') {
  		
			$('#government-topics-container .col-md-12').find('.article-dates:contains('+selectedDate+')').parents('#government-topics-container .col-md-12').show();
			let showArticleLength = $('#government-topics-container .col-md-12:visible').length;
			$('.filter-results').html('Article match(es): '+ showArticleLength).removeClass('form-error').parent().removeClass('text-warning col-md-12 col-md-6 col-md-offset-2').addClass('col-md-6 col-md-offset-2 color-white');
			if (showArticleLength === 0) {
				$('#government-topics-container').append('<div class="no-results alert alert-danger text-center"><h3>No articles match that search criteria. Please try another search or click on the "Show All Articles" button to see all the articles again.</h3></div>');
			}
  		}
  		else {
  			$('#government-topic-form .filter-results').html('Please choose a topic and/or select a year to search for an article').addClass('form-error').parent().removeClass('col-md-6 col-md-offset-2 col-md-12 color-white').addClass('col-md-12 text-warning');
			$('#government-topics-container .col-md-12').show();
			return false;
  		}
  		
  		$('#government-topic-form')[0].reset();
	}); //end of #government-topic-form submit function
		// Politics Articles Page
	$('#politics-topic-form').on('submit', function(e) {
  		e.preventDefault();
  		let allValues = [];
  		$('.political-articles-container').find('.no-results').remove();
  		$('.political-articles-container .col-md-12').hide();
  		let selectedDate = $('select option:selected').val();
  		if (selectedDate !== 'select-year') {
  			
			$('.political-articles-container .col-md-12').find('.article-dates:contains('+selectedDate+')').parents('.political-articles-container .col-md-12').show();
			let showArticleLength = $('.political-articles-container .col-md-12:visible').length;
			$('.filter-results').html('Article match(es): '+ showArticleLength).removeClass('form-error').parent().removeClass('text-warning ').addClass('color-white');
			if (showArticleLength === 0) {
				$('.political-articles-container').append('<div class="no-results alert alert-danger text-center"><h3>No articles match that search criteria. Please try another search or click on the "Show All Articles" button to see all the articles again.</h3></div>');
			}
  		}
  		else {
  			$('#politics-topic-form .filter-results').html('Please choose a topic and/or select a year to search for an article').addClass('form-error').parent().removeClass(' color-white').addClass('text-warning')
			$('.political-articles-container .col-md-12').show();
			return false;
  		}
  		
  		$('#politics-topic-form')[0].reset();
	}); //end of #politics-topic-form submit function
	
		// All Articles Page
	$('.show-articles').click(function() {
			
			
			$('.no-results').remove();
			$('.all-topics-container .col-md-12, .political-articles-container .col-md-12, #government-topics-container .col-md-12').show();
			$('.filter-results').html('').removeClass('form-error');
			$('#all-topics-form, #politics-topic-form')[0].reset();
			
		});
	$('.select-all-topics').click(function() {
	
		if ($("input[type='checkbox']:checked").length === $("input[type='checkbox']").length) {
			
			$("input[type='checkbox']").prop('checked', false);
		}
		
		
		else {
			$("input[type='checkbox']").prop('checked', true);
			
		}
		
		
	});

	
	$('#all-topics-form').on('submit', function(e) {
		e.preventDefault();
		let allValues = [];
		$('.all-topics-container').find('.no-results').remove();
		
		$('.all-topics-container .col-md-12').hide();
		
			
		
		if ($("input[type='checkbox']:checked").length !== 0 || $('select option:selected').val() !== 'select-year') {
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
				let showArticle = $('.all-topics-container .col-md-12 .label:contains('+allValues[i]+')').parents('.all-topics-container .col-md-12');
				showArticle.show();
				}
	
			}
			if ($("input[type='checkbox']:checked").length === 0 && $('select option:selected').val() !== 'select-year') {
			let selectedDate = $('select option:selected').val();
			let showArticle = $('.all-topics-container .article-dates:contains('+selectedDate+')').parents('.all-topics-container .col-md-12');
				showArticle.show();
		
			}
		}
		 
		else  {
			$('#all-topics-form .filter-results').html('Please choose a topic and/or select a year to search for an article').parent().removeClass('col-md-6 col-md-offset-3 col-md-10 col-md-offset-2').addClass(' text-warning');
			$('.all-topics-container .col-md-12').show();
			return false;
		}
		let showArticleLength = $('.all-topics-container .col-md-12:visible').length;
		$('#all-topics-form .filter-results').html('Article match(es): '+ showArticleLength).parent().removeClass('text-warning ');
		if (showArticleLength === 0) {
			$('.all-topics-container').append('<div class="no-results alert alert-danger text-center"><h3>No articles match that search criteria. Please try another search or click on the "Show All Articles" button to see all the articles again.</h3></div>');
		}
		$('#all-topics-form')[0].reset();
	}); //end of #all-topics-form submit function
			
}); // end of document.ready