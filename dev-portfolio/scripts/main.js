$(document).ready(function() {
					// All Pages
	$('.Navbar').load('loads/navbar.html', function() {
		
		let = pageTitle = $(document).find("title").text();
	
		if (pageTitle.match(/courses/i) !== null) {
			$('#nav-courses').addClass('active');
		}
		
		else if (pageTitle.match(/backend/i) !== null) {
			$('#nav-frontend-backend-projects').addClass('active');
			$('#nav-projects').addClass('active');
		}
		
		else if (pageTitle.match(/frontend /i) !== null) {
			$('#nav-frontend-projects').addClass('active');
			$('#nav-projects').addClass('active');
		}
		
		else if (pageTitle.match(/contact/i) !== null) {
			$('#nav-contact').addClass('active');
			
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
  	
  	$('.nav-pills li a ').smoothScroll({ afterScroll: function()
  	
  		
  	 { 
  	 
  		let element = $(this).attr('href'); 
  		$(this).blur();
  	 	//alert('yo');
  	 
  	  }
  	 
  	 
  	 
  	 
  	 });
  	 
  	
  	
  	
		// Frontend Projects Page
  		
  	$('.projects-container .col-md-6').mouseenter(function() {
		$(this).addClass('animated swing');
	
	});
	$('.projects-container .col-md-6').mouseleave(function() {
		$(this).removeClass('animated swing');
	
	});
	
	$('#frontend-form').on('submit', function(e) {
			e.preventDefault();
			let allValues = [];
			
			$('#frontend-projects-container .col-md-6').hide();
			
			$("#frontend-form input[type='checkbox']:checked").each(function() {
				let checkboxValue = $(this).val();
				allValues.push(checkboxValue);
			
			}); // end of values each function
			
			for (var i = 0; i < allValues.length; i++) {
				showProject = $('#frontend-projects-container .col-md-6 .label:contains('+allValues[i]+')').parents('#frontend-projects-container .col-md-6');
			
				showProject.show();
			}
			
			let showProjectLength = $('#frontend-projects-container  .col-md-6:visible').length;
			
			$('#frontend-form .filter-results').html('Project match(es): '+ showProjectLength);
			$('#frontend-form')[0].reset();
	}); //end of #frontend-form.submit()
		
		
		
		
		
		// Frontend/Backend Projects Page
		
	$('#frontend-backend-form').on('submit', function(e) {
	e.preventDefault();
	let allValues = [];
	$('#frontend-backend-projects-container .col-md-6').hide();
	$("#frontend-backend-form input[type='checkbox']:checked").each(function() {
		let checkboxValue = $(this).val();
		allValues.push(checkboxValue);
		
	}); // end of values each function
	
	for (var i = 0; i < allValues.length; i++) {
		let showProject = $('#frontend-backend-projects-container .col-md-6 .label:contains('+allValues[i]+')').parents('#frontend-backend-projects-container .col-md-6');
		showProject.show();
				
	}
	
	let showProjectLength = $('#frontend-backend-projects-container  .col-md-6:visible').length;
	$('#frontend-backend-form .filter-results').html('Project match(es): '+ showProjectLength);
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