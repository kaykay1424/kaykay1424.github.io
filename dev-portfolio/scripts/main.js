$(document).ready(function() {

	// All Pages
	
	let pageTitle = $(document).find("title").text();					

	$('[data-toggle="popover"]').click(function(e) {
	    
	    e.preventDefault();
	
	}).popover();
	
	function addPaddingTop() {
			    
        let navbarHeight = $('.navbar').height();
    
        $('body').css({'padding-top': navbarHeight + 'px'}); // add padding-top (amount of space navbar is taking up vertically) to body so that the top of page is shown (#regular-navbar is fixed to top of screen)
    
	}
	
	// change which navbar is displayed based on window width
	
	function changeNavbar() {
		
        let navbarHeight = $('.navbar').height();

        if ($(window).width()  <  1440) {

            $('#home-navbar').hide();

            $('#mobile-nav-scroll').hide();

            $('#mobile-navbar').show(function() {

                $('body').css({'padding-top': navbarHeight + 'px'}); // add padding-top (amount of space navbar is taking up vertically) to body so that the top of page is shown (#mobile-navbar is fixed to top of screen)

            });

        }

        else  {

            $('#mobile-navbar').hide(function() {

                $('body').css({'padding-top': 0}); // remove padding to body as navbar shown (#home-navbar) is not fixed to top of screen so top of page can clearly be seen

            });

            $('#home-navbar').show();

            $('#mobile-nav-scroll').show();

        }

    
    } // end of changeNavbar()

	if (pageTitle.match(/about/i) !== null) {

		$('.nav-about').addClass('active'); // make about link on navbar active when about page is shown
		
		changeNavbar();

		$(window).resize(changeNavbar);

	} // end of if (pageTitle.match(/about/i) !== null)

	$('.Navbar').load('loads/navbar.html', function() {
		
		if (pageTitle.match(/courses/i) !== null) {

			$('.nav-courses').addClass('active'); // make courses link on navbar active when about courses is shown

			addPaddingTop();
			
			$(window).resize(addPaddingTop);
		
		} 
		
		else if (pageTitle.match(/projects/i) !== null) {
		
		    // make frontend projects link and projects link on navbar active when projects page is shown
			
			$('.nav-projects').addClass('active');
			
			addPaddingTop();
			
			$(window).resize(addPaddingTop);
		
		}
	
	}); // $('.Navbar').load()

	$('.footer').load('loads/footer.html');

	
	// About Page
	
  	$('.my-photo-container').hover(function() {
  
  		$('.greeting').removeClass('animated flipOutX');
  
  		$('.greeting').css({'visibility':'visible'}).addClass('animated flipInX');
  		
  	
  	}, function() {
  
  		$('.greeting').removeClass('animated flipInX');
  
  		$('.greeting').addClass('animated flipOutX');
  		
  	});
  	
  	$('.nav-pills li a').click(function() {
  
  		$(this).removeClass('focus');
  
  	}); 
  	
  	// if jquery smooth scroll script is included in html, have smooth scroll when clicking on links that link to sections on page
  	
  	if ($('script[src="https://cdnjs.cloudflare.com/ajax/libs/jquery-smooth-scroll/2.2.0/jquery.smooth-scroll.min.js"]').length === 1) {
  	
  		$('.nav-pills li a ').smoothScroll({ afterScroll: function() {
		
			    $(this).blur();
	 
		    }

		 });
		 
		 $('.navbar .dropdown-menu li a').smoothScroll();
  	 
  	} // end of if ($('script[src="https://cdnjs.cloudflare.com/ajax/libs/jquery-smooth-scroll/2.2.0/jquery.smooth-scroll.min.js"]').length === 1)
  	
  	
  	// Project Pages
  	
  	let frontendSkillsArray = [ "HTML", "CSS", "Bootstrap", "JavaScript", "jQuery"];
  	
  	let backendSkillsArray = [ "API"];
  	
  	let projectsArray = [
  	
  	   {    
  	   
  	        project: "Bookmark App",
  	   
  	        image: "images/bookmark-app.jpg",
  	        
  	        summary: "The Bookmark App lets users save their favorite websites, which can be viewed in a new window, and design their own bookmark.",
  	        
  	        projectLink: "Bookmark-App/index.html",
  	        
  	        codeLink: "https://github.com/kaykay1424/kaykay1424.github.io/tree/master/dev-portfolio/Bookmark-App",
  	        
  	        skills: [ "HTML", "CSS", "Bootstrap", "JavaScript", "jQuery"]
  	   
  	   
  	    },
  	    
  	    {    
  	   
  	        project: "Local Weather App",
  	   
  	        image: "images/weather-app.jpg",
  	        
  	        summary: " The Weather App shows users the current forecast and a 5-day forecast in the user's location (if he or she allows their location to be accessed). Details regarding the weather, such as the temperature, can be changed from imperial measurements to metric measurements.",
  	        
  	        projectLink: "Local-Weather-App/index.html",
  	        
  	        codeLink: "https://github.com/kaykay1424/kaykay1424.github.io/tree/master/dev-portfolio/Local-Weather-App",
  	        
  	        skills: [ "HTML", "CSS", "Bootstrap", "JavaScript", "jQuery", "API" ]
  	   
  	   
  	    },
  	    
  	    {    
  	   
  	        project: "Wikipedia Viewer",
  	   
  	        image: "images/wikipedia-viewer.jpg",
  	        
  	        summary: "The Wikipedia Viewer allows users to search for a Wikipedia article and choose the amount of articles to be returned. Users can bookmark an article to read later or favorite an article, which will then be stored in the browser's local storage.",
  	        
  	        projectLink: "Wikipedia-Viewer/index.html",
  	        
  	        codeLink: "https://github.com/kaykay1424/kaykay1424.github.io/tree/master/dev-portfolio/Wikipedia-Viewer",
  	        
  	        skills: [ "HTML", "CSS", "Bootstrap", "JavaScript", "jQuery", "API" ]
  	   
  	   
  	    },
  	    
  	    {    
  	   
  	        project: "Quote Generator",
  	   
  	        image: "images/quote-generator.jpg",
  	        
  	        summary: "The Random Quote Generator lets users view random inspirational quotes, view the source of the quote as well as tweet the current quote along with the author on a new page.",
  	        
  	        projectLink: "Random-Quote-Generator/index.html",
  	        
  	        codeLink: "https://github.com/kaykay1424/kaykay1424.github.io/tree/master/dev-portfolio/Random-Quote-Generator",
  	        
  	        skills: [ "HTML", "CSS", "Bootstrap", "JavaScript", "jQuery", "API" ]
  	   
  	    },
  	    
  	    {    
  	   
  	        project: "Twitch App",
  	   
  	        image: "images/twitch-app.jpg",
  	        
  	        summary: " The Twitch App allows a user to search for Twitch channels and save them to the browser's local storage. Once saved, he or she can search for them, view details about their streaming status, delete them, and go to their Twitch page in a new browser window.",
                         
  	        projectLink: "Twitch-App/index.html",
  	        
  	        codeLink: "https://github.com/kaykay1424/kaykay1424.github.io/tree/master/dev-portfolio/Twitch-App",
  	        
  	        skills: [ "HTML", "CSS", "Bootstrap", "JavaScript", "jQuery", "API" ]
  	   
  	    }
  	    
  	
  	];
	
	$('.show-projects').click(function() {
	
	    // clear results from search, show all projects, and reset form

		$('.filter-results').html(''); 

		$('#projects-container').html('');
        
		let projectsContainer = document.getElementById('projects-container');
	            
	    let rows = '<div class="row">';
		
		let numColumns = 0;
		
		for (let i = 0; i < projectsArray.length; i++) {
	        
            numColumns++;
        
            let name = projectsArray[i].project;
            
            let image = projectsArray[i].image;
            
            let summary = projectsArray[i].summary;
            
            let projectLink = projectsArray[i].projectLink;
            
            let codeLink = projectsArray[i].codeLink;

            rows += '<div class="col-md-6 ">'+
            
                '<div class="panel" >'+
                
                    '<div class="panel-heading" >'+
                    
                        '<h3>'+name+' </h3>'+
                        
                    '</div>'+
                    
                    '<div class="panel-body" ><img src="'+image+'" alt="image of '+ name+'" /> </div>'+
                    
                    '<div class="panel-footer">'+
                            
                        '<div class="project-summary">'+
                        
                            '<p>'+summary+'</p>'+
                        
                                '<a href="'+projectLink+'" target="_blank">View project</a> |'+
                        
                                ' <a href="'+codeLink+'" target="_blank">View code</a> '+
                        
                            '</p>'+
                            
                        '</div>'+
                        
                        '<div class="project-skills">';
                        
                        for (let j = 0; j < projectsArray[i].skills.length;j++) {
                          
                            if (frontendSkillsArray.includes(projectsArray[i].skills[j]) === true) {
                        
                                rows += '<div class="label frontend-label  ">'+projectsArray[i].skills[j]+'</div>';
                       
                           }
                       
                           else if (backendSkillsArray.includes(projectsArray[i].skills[j]) === true) {
                       
                                rows += '<div class="label backend-label  ">'+projectsArray[i].skills[j]+'</div>';
                       
                           }
                           
                        } // end of for loop
                    
                        rows +=  
                    
                        '</div>'+
                        
                    '</div>'+

                '</div>'+

            '</div>';
            
            if (numColumns % 2 === 0) { // if 2 columns have been added
                
                rows += '</div><hr/>';
                
                open = false; // row is closed
                
                if ( projectsArray.length > numColumns) { // if there are more projects to be added
                    
                    rows += '<div class="row">';
                    
                    open = true; // row is open

                }
            
            }  // end of if (counter % 2 === 0)                   
	    
	    } // end of for loop
	    
	    if (open === true) { // if row hasn't been closed
		    
			rows += "</div>";
	
		}
	    
	    projectsContainer.innerHTML += rows;
	    
	    $('#projects-container *').not('h2').hide().fadeIn(1000);	
	    
	    $('#projects-container .row').last().next('hr').remove();

		$('form')[0].reset();
			
	});
	
	$('.select-all-languages').click(function() {
	
	    // if all checkboxes are checked, uncheck them
		
		if ($("input[type='checkbox']:checked").length === $("input[type='checkbox']").length) {
			
			$("input[type='checkbox']").prop('checked', false);
		
		}
		
		// if not all checkboxes are checked, check them all
		
		else {
		
			$("input[type='checkbox']").prop('checked', true);
			
		}
		
	}); // end of $('.select-all-languages').click()
	    
	function projectMatches(allValues) {
	
	    $('#projects-container').html('');

	    let numColumns = 0;
	    
	    let projectsContainer = document.getElementById('projects-container');
	            
	    let rows = '<div class="row">';
	    
	    let open = true; // row is open
	    
	    let numProjects = numMatchingProjects();
	    
	    function checkIfSkillExists(skills) {
	    
	        let exists = false;
	        
	         for (let i = 0; i < skills.length; i++) {
	         
	            if (allValues.includes(skills[i]) === true) {
	                
	                exists = true;
	            
	            }
	         
	         } // end of for loop
	         
	         return exists;
	    
	    }
	    
	    function numMatchingProjects() {
	    
	        let numProjects = 0;
	        
	         for (let i = 0; i < projectsArray.length; i++) {
	        
	            if (checkIfSkillExists(projectsArray[i].skills) === true ) {
	            
	                numProjects++;
	                
	            }
	            
	        } // end of for loop
	        
	        return numProjects;
	    
	    }
	    
	    for (let i = 0; i < projectsArray.length; i++) {
	        
	        if (checkIfSkillExists(projectsArray[i].skills) === true ) {
	        
	            numColumns++;
	        
	            let name = projectsArray[i].project;
	            
	            let image = projectsArray[i].image;
	            
	            let summary = projectsArray[i].summary;
	            
	            let projectLink = projectsArray[i].projectLink;
	            
	            let codeLink = projectsArray[i].codeLink;
	
	            rows += '<div class="col-md-6 ">'+
	            
	                '<div class="panel" >'+
	                
	                    '<div class="panel-heading" >'+
	                    
	                        '<h3>'+projectsArray[i].project+' </h3>'+
	                        
	                    '</div>'+
	                    
	                    '<div class="panel-body" ><img src="'+image+'" alt="image of '+ name+'" /> </div>'+
	                    
	                    '<div class="panel-footer">'+
								
							'<div class="project-summary">'+
							
                                '<p>'+summary+'</p>'+
                            
                                    '<a href="'+projectLink+'" target="_blank">View project</a> |'+
                            
                                    ' <a href="'+codeLink+'" target="_blank">View code</a> '+
                            
                                '</p>'+
                                
                            '</div>'+
                            
                            '<div class="project-skills">';
                            
                            for (let j = 0; j < projectsArray[i].skills.length;j++) {
                                  
                                if (frontendSkillsArray.includes(projectsArray[i].skills[j]) === true) {
                                
                                    rows += '<div class="label frontend-label  ">'+projectsArray[i].skills[j]+'</div>';
                               
                                }
                               
                                else if (backendSkillsArray.includes(projectsArray[i].skills[j]) === true) {
                               
                                    rows += '<div class="label backend-label  ">'+projectsArray[i].skills[j]+'</div>';
                               
                                }   
                            
                            } // end of for loop
                        
                             rows +=  
                        
                            '</div>'+
                            
                        '</div>'+

					'</div>'+

				'</div>';
                
                if (numColumns % 2 === 0) { // if 2 columns have been added
                    
                    rows += '</div><hr/>';
                    
                    open = false; // row is closed
                    
                    if ( numProjects > numColumns) { // if there are more projects to be added
                        
                        rows += '<div class="row">';
                        
                        open = true; // row is open

                    }
                
                }  // end of if (counter % 2 === 0)                   
	        
	        } // end of if (checkIfSkillExists(projectsArray[i].skills) === true )
	    
	    } // end of for loop
	    
	    if (open === true) { // if row hasn't been closed
		    
			rows += "</div>";
	
		}
	    
	    projectsContainer.innerHTML += rows;
	    
	    $('#projects-container *').hide().fadeIn(1000);	
	    
	    $('#projects-container .row').last().next('hr').remove();
	
	} 
	
	$('form').on('submit', function(e) {
	
		e.preventDefault();
		
		// clear previous results before showing results from new search

		let allValues = [];

		$('#projects-container').html('');

		$("form input[type='checkbox']:checked").each(function() {

			let checkboxValue = $(this).val();

			allValues.push(checkboxValue);

		}); // end of values each function
		
		// if no option was checked 

		if (allValues.length === 0) {

			$('form .filter-results').html('Please choose a skill to search for a project').addClass('text-warning');

			return false;
		
		}

        // find projects that match skills selected
		
		for (let l = 0; l < allValues.length;l++) {
		
		    projectMatches(allValues);
		
		}
		
		let visibleProjectsLength = $('#projects-container  .col-md-6:visible').length;
		
		$('form .filter-results').removeClass('text-warning').html('Project match(es): '+ visibleProjectsLength);
		
		// if no project uses (any) skill selected
		
		if (visibleProjectsLength === 0) {
			
			$('#projects-container h2').html('<div class="no-results text-danger text-center">No projects match that search criteria. Please try another search or click on the "Show All Projects" button to see all the projects again.</div>').removeClass('personal-projects-border');

		}

		$('form')[0].reset();
			
	}); // end of $('form').submit()
	
	
	// Responsive Design
	
	function responsiveDesign() {
    
        let screenHeight = $(window).height();
    
        $('.full-container').css({'min-height': screenHeight +'px'}); // make .full-container at least as tall as window height
    
        let fullContainerHeight = $('.full-container').outerHeight();
    
        $('body').css({'min-height': screenHeight +'px', 'max-height': fullContainerHeight + 'px'}); // make body at least as tall as window height and no taller than .full-container's height

    } // end of responsiveDesign()

    responsiveDesign();

    $(window).resize(responsiveDesign);
	
}); // end of document.ready()