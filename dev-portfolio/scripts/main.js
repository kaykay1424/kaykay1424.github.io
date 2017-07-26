$(document).ready(function() {
let = pageTitle = $(document).find("title").text();					// All Pages
if (pageTitle.match(/about/i) !== null) {
	
			$('.nav-about').addClass('active');
			let navbarHeight = $('.navbar').height();
			if ($(window).width()  <  1440) {
					
					$('#home-navbar').hide();
					$('#mobile-nav-scroll').hide();
					$('#mobile-navbar').show(function() {
						$('body').css({'padding-top': navbarHeight + 'px'});
					
					});
					
				}
				else  {
					$('#mobile-navbar').hide(function() {
						$('body').css({'padding-top': 0});
					
					
					});
					$('#home-navbar').show();
					$('#mobile-nav-scroll').show();
					
				}
			$(window).resize(function() {
			let navbarHeight = $('.navbar').height();
				if ($(window).width()  <  1440) {
					$('#home-navbar').hide();
					$('#mobile-nav-scroll').hide();
					$('#mobile-navbar').show(function() {
						$('body').css({'padding-top': navbarHeight + 'px'});
					
					});
					
				}
				else  {
					$('#mobile-navbar').hide(function() {
						$('body').css({'padding-top': 0});
					
					
					});
					$('#home-navbar').show();
					$('#mobile-nav-scroll').show();
					
				}
				
			
			});
			//$('nav').removeClass('navbar-fixed-top');
		}
		
		if (pageTitle.match(/courses/i) !== null) {
			$('.nav-courses').addClass('active');
			let navbarHeight = $('.navbar').height();

				
			$('body').css({'padding-top': navbarHeight + 'px'});
			$(window).resize(function() {
				let navbarHeight = $('.navbar').height();

				
			$('body').css({'padding-top': navbarHeight + 'px'});
			
			});
		}
		
		else if (pageTitle.match(/backend/i) !== null) {
			$('.nav-frontend-backend-projects').addClass('active');
			$('.nav-projects').addClass('active');
			let navbarHeight = $('.navbar').height();

				
			$('body').css({'padding-top': navbarHeight + 'px'});
			$(window).resize(function() {
				let navbarHeight = $('.navbar').height();

				
			$('body').css({'padding-top': navbarHeight + 'px'});
			
			});		
					
		}
		
		else if (pageTitle.match(/frontend/i) !== null) {
			$('.nav-frontend-projects').addClass('active');
			$('.nav-projects').addClass('active');
			
					
					
				
		}
		
		else if (pageTitle.match(/contact/i) !== null) {
			$('.nav-contact').addClass('active');
			
		}
	
	$('.Navbar').load('loads/navbar.html', function() {
		
		let = pageTitle = $(document).find("title").text();
	
		
		
		if (pageTitle.match(/about/i) !== null) {
			//$('.nav-about').addClass('active');
			console.log($(window).height());
			//alert('yo');
			if ($(window).height() >= '1440px') {
				
				//$('body').css({'background-color':'red'});
			}
			//$('nav').removeClass('navbar-fixed-top');
		}
		
		if (pageTitle.match(/courses/i) !== null) {
			$('.nav-courses').addClass('active');
			let navbarHeight = $('.navbar').height();
			alert(navbarHeight);
			$('body').css({'padding-top': navbarHeight + 'px'});
			
			$(window).resize(function() {
				let navbarHeight = $('.navbar').height();

				
			$('body').css({'padding-top': navbarHeight + 'px'});
			
			});	
		}
		
		else if (pageTitle.match(/backend/i) !== null) {
			$('.nav-frontend-backend-projects').addClass('active');
			$('.nav-projects').addClass('active');
			let navbarHeight = $('.navbar').height();
			
			$('body').css({'padding-top': navbarHeight + 'px'});
			
			$(window).resize(function() {
				let navbarHeight = $('.navbar').height();

				
			$('body').css({'padding-top': navbarHeight + 'px'});
			
			});	
		}
		
		else if (pageTitle.match(/frontend /i) !== null) {
			$('.nav-frontend-projects').addClass('active');
			$('.nav-projects').addClass('active');
			let navbarHeight = $('.navbar').height();
			
			$('body').css({'padding-top': navbarHeight + 'px'});
			
			$(window).resize(function() {
				let navbarHeight = $('.navbar').height();

				
			$('body').css({'padding-top': navbarHeight + 'px'});
			
			});		
		}
		
		else if (pageTitle.match(/contact/i) !== null) {
			$('.nav-contact').addClass('active');
			
		}
	}); // .header.load()
	
	$('.footer').load('loads/footer.html');
	
	
	
	
	
		
		// About Page
  	
  	
  	
  	$('.my-photo-container').mouseenter(function() {
  		$('.greeting').removeClass('animated flipOutX');
  		$('.greeting').show().addClass('animated flipInX');
  		
  	
  	});
  	$('.my-photo-container').mouseleave(function() {
  	$('.greeting').removeClass('animated flipInX');
  		$('.greeting').addClass('animated flipOutX');
  		
  	});
  	
  	
  	$('.nav-pills li a').click(function() {
  		$(this).removeClass('focus');
  	}); 
  	
  	if ($('script[src="https://cdnjs.cloudflare.com/ajax/libs/jquery-smooth-scroll/2.2.0/jquery.smooth-scroll.min.js"]').length === 1) {
  	
  
  		$('.nav-pills li a ').smoothScroll({ afterScroll: function()
  	
  		
		 { 
	 
			let element = $(this).attr('href'); 
			$(this).blur();
			//alert('yo');
	 
		  }
	 
	 
	 
	 
		 });
  	 
  	}
  	
  	
		// Frontend Projects Page
  		
  	$('.projects-container .col-md-6').mouseenter(function() {
		$(this).addClass('animated swing');
	
	});
	$('.projects-container .col-md-6').mouseleave(function() {
		$(this).removeClass('animated swing');
	
	});
	
	$('.show-projects').click(function() {
			
			
			$('.filter-results').html('');
			$('.projects-container').show().find('.col-md-6').show();
			
			$('.projects-container h2').html('Personal Projects').css({'border-bottom':'2px dotted #2027D7'});;
			$('#frontend-form, #frontend-backend-form')[0].reset();
			
	});
	
	$('.select-all-languages').click(function() {
		
		if ($("input[type='checkbox']:checked").length === $("input[type='checkbox']").length) {
			
			$("input[type='checkbox']").prop('checked', false);
		}
		
		
		else {
			$("input[type='checkbox']").prop('checked', true);
			
		}
		
		
	});
	
	
	$('#frontend-form').on('submit', function(e) {
			e.preventDefault();
			let allValues = [];
			$('#frontend-projects-container').show();
			$('#frontend-projects-container .col-md-6').hide();
			$('#frontend-projects-container h2').html('Personal Projects').css({'border-bottom':'2px dotted #2027D7'});
			$("#frontend-form input[type='checkbox']:checked").each(function() {
				let checkboxValue = $(this).val();
				allValues.push(checkboxValue);
			
			}); // end of values each function
			if (allValues.length === 0) {
				$('#frontend-form .filter-results').html('Please choose a language/library/framework to search for a project').addClass('text-warning');
				$('#frontend-projects-container ').show().find('.col-md-6').show();
				return false;
			
			}
			for (var i = 0; i < allValues.length; i++) {
				showProject = $('#frontend-projects-container .col-md-6 .label:contains('+allValues[i]+')').parents('#frontend-projects-container .col-md-6');
			
				showProject.show();
			}
			
			let showProjectLength = $('#frontend-projects-container  .col-md-6:visible').length;
			
			$('#frontend-form .filter-results').removeClass('text-warning').html('Project match(es): '+ showProjectLength);
			
			
			if (showProjectLength === 0) {
				
				$('#frontend-projects-container h2').html('<div class="no-results text-danger text-center">No projects match that search criteria. Please try another search or click on the "Show All Projects" button to see all the projects again.</div>').css({'border':'none'});
				$('#frontend-projects-container *:not(h2) ').hide();
			}
			$('#frontend-form')[0].reset();
  		
  		
			
	}); //end of #frontend-form.submit()
		
		
		
		
		
		// Frontend/Backend Projects Page
		
	$('#frontend-backend-form').on('submit', function(e) {
	e.preventDefault();
	let allValues = [];
	$('#frontend-backend-projects-container').show();
	$('#frontend-backend-projects-container .col-md-6').hide();
	$('#frontend-backend-projects-container h2').html('Personal Projects').css({'border-bottom':'2px dotted #2027D7'});
	$("#frontend-backend-form input[type='checkbox']:checked").each(function() {
		let checkboxValue = $(this).val();
		allValues.push(checkboxValue);
		
	}); // end of values each function
		if (allValues.length === 0) {
				$('#frontend-backend-form .filter-results').html('Please choose a language/library/framework to search for a project').addClass('text-warning');
				$('#frontend-backend-projects-container').show().find('.col-md-6').show();
				return false;
			
			}
	for (var i = 0; i < allValues.length; i++) {
		let showProject = $('#frontend-backend-projects-container .col-md-6 .label:contains('+allValues[i]+')').parents('#frontend-backend-projects-container .col-md-6');
		showProject.show();
				
	}
	
	let showProjectLength = $('#frontend-backend-projects-container  .col-md-6:visible').length;
	$('#frontend-backend-form .filter-results').html('Project match(es): '+ showProjectLength);
	
	
	if (showProjectLength === 0) {
				
				$('#frontend-backend-projects-container h2').html('<div class="no-results text-danger text-center">No projects match that search criteria. Please try another search or click on the "Show All Projects" button to see all the projects again.</div>').css({'border':'none'});
				
			}
	$('#frontend-backend-form')[0].reset();		
	}); //end of #frontend-backend-form.submit()
		
		
		
		
  		
  	
  		

    // Contact Page 
    
    $('#contact-form1').on('submit',function() {
  		let mailTo = 'michaela.s.clements@gmail.com';
  		let subject = $('#contact-form1 .subject').val();
  		let message = $('#contact-form1 .message').val();
  		$('#contact-form1 .contact-button a').attr('href','mailto:'+mailTo+'?subject='+subject+'&body='+message+'');
  		$('#contact-form1 .contact-button a')[0].click();
  	
  	});
    
}); // end of document.ready()