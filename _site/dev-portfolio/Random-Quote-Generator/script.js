/*
	Explanation of program:
	
    When the page loads, a quote is displayed by making an ajax call to the forismatic api.
    Whenever a user clicks the new quote button, another ajax call will be made to display a new
    random quote; also, the animationsCounter is increased by 1 and an animation effect from
    animate.css library will be shown based on the element in the animationsArray that
    corresponds to the number the animationsCounter is currently equal to. Clicking on the source
    button will open up the page where the quote is from in a new browser window. Clicking on the
    twitter button will open up a page in a new browser window where one can post a tweet containing
    the quote and author with the hashtag 'inspirationalQuotes'. 
	
*/

$(document).ready(function() {
	
	let animationsArray = [
	
	    "animated zoomIn",
	    
	    "animated fadeIn",
	    
	    "animated flipInX",

	    "animated slideInUp"
	
	];
	
	let animationsCounter = -1; // set animationsCounter = -1 so when it is incremented in getQuote function, it will be at 0 (beginning of animationsArray)
    
    function getQuote() {
       
        animationsCounter++;

        $.ajax({type: "GET",
       
            url: "https://api.forismatic.com/api/1.0/",
       
            dataType: "jsonp",
       
            data: {format: "jsonp",lang: "en", method: "getQuote"},
       
            jsonp: "jsonp",

            success: function(data) {
            
                let quote = data.quoteText;
                
                let author = data.quoteAuthor;
                
                let link = data.quoteLink;
                
                if (author === "") {
                    
                    author = "Unknown";
                
                }
                
                let quoteAndAuthorString = quote + " -" + author;

                let twitterHref = 'https://twitter.com/intent/tweet?hashtags=inspirationalQuotes&text='+quoteAndAuthorString;
                
                $('#quote-content').html('<i class="fa fa-quote-left" aria-hidden="true"></i> '+quote+ ' <i class="fa fa-quote-right" aria-hidden="true"></i> <br> - ' + author).addClass(animationsArray[animationsCounter]); // add animation based on element in animationsArray that corresponds to number animationsCounter is currently equal to
               
                $('#quote-source').attr('href',link);
               
                $('#twitter').attr('href', twitterHref);
            
            }
        
        });
    
     }   
    
    getQuote();
    
    $('#new-quote').on('click', function(e) {
        
        e.preventDefault();
        
        $('#quote-content').removeClass(); // remove animated classes so that each animated class can be re-added to re-show that particular animation 
        
        // when animationsCounter reaches end of animationsArray set it to -1 so when it is incremented again in getQuote function, it will be at 0 (beginning of animationsArray)
    
        if (animationsCounter === animationsArray.length - 1) {
                
            animationsCounter = -1;
                
        }

        getQuote();
   
    });

}); // end of $(document).ready(function)