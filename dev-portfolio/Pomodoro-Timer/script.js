/*

  The Pomodoro Timer lets the user select a session length (in minutes) as well as a
  break length (in minutes). Once the session is over, the break will begin. Users
  can change the session or break after pausing the timer. If the timer is currently
  on break and the break length is changed, the break will restart with the new
  break length entered and vice versa for the session.

*/

$(document).ready(function() {

  let interval;

  let breakTimer = false; // set breakTimer to false as session timer will start first

  let animationDuration;

  let red;

  let green;

  let minute;

  let seconds;

  let sessionLength = $('#session-length').val();

  $('#time').html(sessionLength);

  function switchSession() {

    clearInterval(interval);

    $('#time').html('');

    if (breakTimer === true) { // if it is break time

      $('#session').html('Time to Relax!');

      $('#timer').css({'background-image':'url("images/break-time.jpg")'});

    }

    else { // if it is session time

      $('#session').html('Back to Work!');

      $('#timer').css({'background-image':'url("images/work-time.jpg")'});

    }

    setTimeout(function(){

      if (breakTimer === true) { // if it is break time

        $('#session').html('Break');

      }

      else { // if it is session time

        $('#session').html('Session');

      }

      $('#timer').css({'background-color':'rgb(0,200,0)','background-image':'none'})

      $('#time').html(minute);

      sessionTimer();

    },2000)

  }

  function sessionTimer() {

    let redIncrement; // notes how much to increment red value

    let greenIncrement; // notes how much to increment green value

    animationDuration  = sessionLength  * 60; // get total number of seconds animation will run

    redIncrement = 200/animationDuration; // get amount red value should increase by each second

    greenIncrement = 200/animationDuration; // get amount green value should increase by each second

    $('input').attr('disabled',true); // only allow session/break length to be changed when timer is paused

    $('#session-length').attr('title','Press pause to change session length');

    $('#break-length').attr('title','Press pause to change break length');

    interval = setInterval(function() {

      if (parseInt(seconds) === 1 && minute === 0) {

          let remainingAmountRed = 200 - red; // notes how far away red value is from 200 (which signals end of session/break)

          let remainingAmountGreen = 0 + green; // notes how far away green value is from 0 (which signals end of session/break)

          if (remainingAmountRed > 0) { // if red value has not reached 200, add remaining amount to reach 200

              red += remainingAmountRed;

          }

          if (remainingAmountGreen > 0) { // if green value has not reached 0, subtract remaining amount to reach 0

              green -= remainingAmountGreen;

          }

      } // end of if (parseInt(seconds) === 1 && minute === 0)

      else {

        red += redIncrement ;

        green -= greenIncrement;

      }

      if (red >= 1) {

        let redInteger = Math.floor(red); // round down to slow down animation (going from low to high)

        let greenInteger = Math.ceil(green); // round up to slow down animation (going from high to low)

        $('#timer').css('background-color','rgb('+redInteger+','+greenInteger+',0)');

      }

      if (minute === 0 && parseInt(seconds) === 0) {

        // reset rgb values to original values

        red = 0;

        green = 200;

        if (breakTimer === false) {

          sessionLength = $('#break-length').val();

          minute = sessionLength-1;

          breakTimer = true; // set breakTimer to true as session has ended

          switchSession();

        }

        else {

            sessionLength = $('#session-length').val()

            minute = $('#session-length').val();

            breakTimer = false; // set breakTimer to false as break has ended

            switchSession();

        }

        return false;

      }

      if (parseInt(seconds) === 0) {

        seconds = 60;

        minute--;

      } // end of if (parseInt(seconds) === 0)

      seconds--;

      if (seconds < 10) {

        $('#time').html(minute + ': 0' + seconds);

      }

      else {

        $('#time').html(minute + ': ' + seconds);

      }

    },1000);

  }

  $('.start-pause-play').click(function() {

    if ($('#break-length').val() == 0 || $('#session-length').val() == 0 || isNaN($('#session-length').val()) || isNaN($('#break-length').val())) { // if break/session length is changed to 0

        return false;

    }

    if ($(this).attr('id') === 'session-start') {

      // timer's background color starts off as rgb(0,200,0) so set red and green to respective values

      red = 0;

      green = 200;

      breakTimer = false; // set breakTimer to false as session timer will start first

      // start time here to start counting down

      minute = sessionLength -1;

      seconds = 60;

      sessionTimer();

      $(this).attr('id','session-pause').html('Pause');

    }

    else if ($(this).attr('id') === 'session-pause') {

      clearInterval(interval);

      $('input').attr('disabled',false); // only allow session/break length to be changed when timer is pause

      // clear title attribute as message explaining session needs to be paused before length can be changed is no longer needed

      $('inpu').attr('title','');

      $(this).attr('id','session-play').html('Play');

    }

    else { // if button's id is session-play

      sessionTimer();

      $(this).attr('id','session-pause').html('Pause');

    }

    $('input').each(function() {

        if ($(this).val() != 0 && !isNaN($(this).val())) { // if field doesn't have 0 or a character other than a number

            $(this).css({'border':'none'});

        }

    });

  });

  $('input').change(function(){

    if ($(this).val() == 0 || isNaN($(this).val())) { // if field has 0 or a character other than a number

        alert('Please enter a number greater than 0.');

        $(this).css({'border':'1px solid red'})

        return false;

    }

    if ($(this).val() != 0 && !isNaN($(this).val())) { // if field doesn't have 0 or a character other than a number

        $(this).css({'border':'none'});

    }

    if ($(this).attr('id') === 'break-length') {

      if (breakTimer === true) {

        clearInterval(interval);

        // reset timer to original color

        $('#timer').css({'background-color':'rgb(0,200,0)'});

        sessionLength = $('#break-length').val();

        // start time here to start counting down

        minute = sessionLength-1;

        seconds = 60;

        $('#time').html($(this).val());

        $('.start-pause-play').attr('id','session-start').html('Start');

      }

    } // end of if ($(this).attr('id') === 'break-length')

    else  { // if input field is session length

      if (breakTimer === false) {

        clearInterval(interval);

        // reset timer to original color

        $('#timer').css({'background-color':'rgb(0,200,0)'});

        sessionLength = $('#session-length').val();

        // start time here to start counting down

        minute = sessionLength-1;

        seconds = 60;

        $('#time').html($(this).val());

        $('.start-pause-play').attr('id','session-start').html('Start');

      }

    } // end of else

  });

});
