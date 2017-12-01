/* Explanation of program:

  The Simon Game plays an order of colors chosen randomly until the order of colors reaches 20
  after which the player wins the game and the game restarts. If the player chooses the wrong color,
  either the game will restart (if Strict mode is turned on) or the current order of colors will be re-played.

*/

let colorsArr = ['blue-button', 'green-button', 'yellow-button','red-button'];

let currentColor = 0; // increases when color button is clicked on (used to see if color clicked matches element in colorsOrderArrArr)

let colorsOrderArr = [];

let playSimonInterval; // this interval is run to create an order of colors in game

let runSimonInterval; // marks whether playSimonInterval is running or not

let checkResponseInterval; // this interval is run to see if a color has been picked after 5 seconds

let pickedColor = '';

let gameOver = false;

let stepCounter = 1; // stepCounter increases each time player picks correct order of colors

let turnedOn = false; // marks whether game is turned on or not

let strictMode = false;

$('#counter-screen-text').html('');

function playSimon(stepCounter) {

  let counter = 0;

  runSimonInterval = true;

  clearInterval(checkResponseInterval); // clear checkResponseInterval as it is not time for player to pick order of colors

  $('.win-text').addClass('slideOutUp').removeClass('slideInDown');

  $('#counter-screen-text').html(stepCounter).removeClass('animated flash');

  $('.buttons').css({'cursor':'not-allowed'});

  playSimonInterval = setInterval(function() {

    if (counter === stepCounter) {

      currentColor = 0;

      runSimonInterval = false;

      $('.buttons').css({'cursor':'pointer'}); // show player it is now time to choose colors

      clearInterval(playSimonInterval);

      checkPlayerResponse();

      return false;

    }

    if (colorsOrderArr.length === stepCounter - 1 ) { // add another color to colorsOrderArr so that number of colors in colorsOrderArr matches stepCounter

      // choose random color from colorsArr

      let randomNum = Math.floor((Math.random() * colorsArr.length-1) + 1);

      colorsOrderArr.push(colorsArr[randomNum]);

    }

    // highlight and play sound of button that corresponds with current element in colorsOrderArr based on counter

    if (colorsOrderArr[counter] === 'blue-button') {

      $('#' +colorsOrderArr[counter]).addClass('hightlight-blue');

      $('#'+colorsOrderArr[counter]+'-audio')[0].play();

    }

    if (colorsOrderArr[counter] === 'green-button') {

      $('#' +colorsOrderArr[counter]).addClass('hightlight-green');

      $('#'+colorsOrderArr[counter]+'-audio')[0].play();

    }

    if (colorsOrderArr[counter] === 'red-button') {

      $('#' +colorsOrderArr[counter]).addClass('hightlight-red');

      $('#'+colorsOrderArr[counter]+'-audio')[0].play();

    }

    if (colorsOrderArr[counter] === 'yellow-button') {

      $('#' +colorsOrderArr[counter]).addClass('hightlight-yellow');

      $('#'+colorsOrderArr[counter]+'-audio')[0].play();

    }

    counter++;

    setTimeout(function() {

      $('.buttons').removeClass('hightlight-blue hightlight-green hightlight-red hightlight-yellow'); // remove highlight classes so they can be re-added each time interval runs

    },500)

  }, 1000)

};


if ($(window).width() < 1024) { // if device is smaller than laptop

  $('#turn-on-off').mouseenter(function(){

    $(this).attr('title','Click button to turn Simon Game on or off');

  });

  $('#off-on-button').click(function() {

    if ($(this).css('left') === '15px') { // if button is at off position, move button to on position

        $(this).animate({left:'-=30px'})

        turnedOn = true;

        $('#start-button').prev().html('Start');

        $('#counter-screen-text').html('--');

    }

    else { // if button is at on position, move button to off position

      $(this).animate({left:'+=30px'});

      // reset all variables;

      clearInterval(playSimonInterval);

      clearInterval(checkResponseInterval);

      currentColor = 0;

      colorsOrderArr = [];

      runSimonInterval = false;

      pickedColor = '';

      gameOver = false;

      strictMode = false;

      stepCounter = 1;

      turnedOn = false;

      $('#counter-screen-text').html('');

      $('#strict-button-on').removeClass('active');

    }

  });

}

else {

  $('#turn-on-off').mouseenter(function(){

    $(this).attr('title','Slide (drag) button left or right to turn Simon Game on or off')

  });

  $('#off-on-button').draggable({

    axis: "x",

    snap: '#turn-on-off',

    snapMode: 'inner',

    containment: "parent",

    drag: function(event, ui) {

      if (ui.position.left === -15) { // if button is at on position

        turnedOn = true;

        $('#start-button').prev().html('Start');

        $('#counter-screen-text').html('--');

      }

      else if (ui.position.left === 15) { // if button is at off position

        // reset variables

        clearInterval(playSimonInterval);

        clearInterval(checkResponseInterval);

        currentColor = 0;

        colorsOrderArr = [];

        runSimonInterval = false;

        pickedColor = '';

        gameOver = false;

        strictMode = false;

        stepCounter = 1;

        turnedOn = false;

        $('#counter-screen-text').html('');

        $('#strict-button-on').removeClass('active');

      } // end of else if (ui.position.left === 15)

    } // end of drag: function(event, ui)

  });

}

$('#start-button').click(function() {

  if (turnedOn === true) {

    if ($(this).prev().html().match(/start/i)) {

      $(this).prev().html('Reset');

      playSimon(stepCounter);

    }

    else if ($(this).prev().html().match(/reset/i)) {

      // reset all variables

      clearInterval(playSimonInterval);

      clearInterval(checkResponseInterval);

      currentColor = 0;

      colorsOrderArr = [];

      runSimonInterval = false;

      pickedColor = '';

      gameOver = false;

      strictMode = false;

      stepCounter = 1;

      $('#counter-screen-text').html('--');

      setTimeout(function(){

        playSimon(stepCounter);

      },2000)

    } // end of else if ($(this).prev().html().match(/reset/i))

  } // end of if (turnedOn === true)

});

$('#srict-button').click(function() {

  if (turnedOn === true) {

    if (strictMode === false) {

      strictMode  = true;

      $('#strict-button-on').addClass('active');

    }

    else if (strictMode === true) {

      strictMode  = false;

      $('#strict-button-on').removeClass('active');

    }

  } // end of if (turnedOn === true)

})

function checkPlayerResponse() {

  clearInterval(checkResponseInterval);

  checkResponseInterval = setInterval(function() {

    if (runSimonInterval === true) {

      clearInterval(checkResponseInterval);

      return false;

    }

    else {

      gameOver = true;

      $('#counter-screen-text').html('X').addClass('animated flash');

      setTimeout(function() {

        // start game over if strict mode is turned on

        if (strictMode === true) {

          stepCounter = 1;

          colorsOrderArr = [];

          pickedColor = '';

        }

        playSimon(stepCounter);

      },1000)

    }

  },5000)

}

$('.buttons').click(function() {

  if (runSimonInterval === true || turnedOn === false)  {

    return false;

  }

  pickedColor = $(this).attr('id');

  if (pickedColor === colorsOrderArr[currentColor]) {

    $('#'+pickedColor+'-audio')[0].play();

    if (currentColor === 19) { // game is won after order of 20 colors is correctly picked

      $('.win-text').removeClass('hidden slideOutUp').addClass('animated slideInDown');

      // reset all variables

      clearInterval(checkResponseInterval);

      currentColor = 0;

      colorsOrderArr = [];

      runSimonInterval = false;

      pickedColor = '';

      gameOver = false;

      stepCounter = 1;

      setTimeout(function() {

        playSimon(stepCounter);

      },3000);

      return false;

    }

    checkPlayerResponse();

    // if currentColor equals last color in colorsOrderArr (if all colors in current colorsOrderArr have been picked correctly), increase stepCounter

    if (currentColor === colorsOrderArr.length -1) {

      stepCounter++;

      playSimon(stepCounter);

    } // if there are still more colors in colorsOrderArr to pick

    else {

      currentColor++;

    }

  } // end of if (pickedColor === colorsOrderArr[currentColor])

  else if (pickedColor !== colorsOrderArr[currentColor]) { // if the wrong color in colors order is chosen, game is over

    clearInterval(playSimonInterval);

    gameOver = true;

    $('#counter-screen-text').html('X').addClass('animated flash');

    setTimeout(function() {

      if (strictMode === true) { // start game over if strict mode is turned on

        stepCounter = 1;

        colorsOrderArr = [];

        pickedColor = '';

      }

      playSimon(stepCounter);

    }, 1000);

  }

});
