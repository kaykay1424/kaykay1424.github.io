/*  Explanation of program:

    The Tic Tac Toe game lets users choose whether to play alone with the computer
    or play with someone else and whether to play as X or O. After one player gets
    3 Xs or Os in a row one point will be added to the score of the player who won and the game
    will automatically restart. Players can also go back to the menu to change playing
    options and start over.
*/

let player1;

let player2;

let player1Letter;

let player2Letter;

let player1Score = 0;

let player2Score = 0;

let player1Turn = true; // set player1Turn to true as player1 will always go first

let arrX = [];

let arrO = [];

// each of these arrays store the number of the squares needed to win game in all possible ways

let columns = [[1,4,7],[2,5,8],[3,6,9]];

let rows = [[1,2,3],[4,5,6],[7,8,9]];

let diagonals = [[3,5,7],[1,5,9]];

let totalTicTacArr = []; // stores the numbers of the squares with Xs and Os on them

let ticTacToe = false; // notes someone has gotten 3 Xs or Os in a row

let ticTacToeArr = []; // stores the numbers of the 3 squares in a row

let gameWon = false; // set gameWon to false as game has not been won yet

$('#player1').addClass('player-turn '); // player1 will always go first so player1 will be highlighted signaling it is that player's turn

$('.num-players').click(function() {

  //  show second menu and hide first menu as option from menu 1 (# of players) has already been selected

  $('.menu-option-2').removeClass('hide').addClass('animated fadeIn');

  $('.menu-option-1').addClass('hide');

  if ($(this).attr('id') === 'num-players-2') { // if 2 players were selected

    $('.menu-option-2 .option-statement').html('Player 1: Choose letter');

    player2 = 'human';

  }

  else { // if 1 player was selected

    $('.menu-option-2 .option-statement').html('Choose letter you want to play as');

    player2 = 'computer';

  }

});

$('.letters').click(function() {

  //  show tic tac toe board and hide second menu as option from menu 2 (X or O) has already been selected

  $('#tic-tac-toe-board, #game-status').removeClass('hide').addClass('animated fadeIn');

  $('.menu-option-2').addClass('hide');

  if (player2 === 'computer') {

    $('#player2 .player').html('Computer:');

  }

  else {

    $('#player2 .player').html('Player 2:');

  }

  if ($(this).attr('id') === 'x') {

    player1Letter = 'X';

    player2Letter = 'O';

    $('#player1 .letter-choice').html('X');

    $('#player2 .letter-choice').html('O');

  } // end of if ($(this).attr('id') === 'X')

  else {

    player1Letter = 'O';

    player2Letter = 'X';

    $('#player1 .letter-choice').html('O');

    $('#player2 .letter-choice').html('X');

  } // end of else

});

$('.back').click(function() {

  $('.menu-option-1').removeClass('hide').addClass('animated fadeIn');

  $('.menu-option-2').addClass('hide');

});

$('.back-to-menu').click(function() {

  if (gameWon === true) { // do not allow navigation back to menu while processing winner

    return false;

  }

  // reset everything so player can start over

  $('#game-status,#tic-tac-toe-board').addClass('hide');

  $('.menu-option-1').removeClass('hide').addClass('animated fadeIn');

  totalTicTacArr = []

  player1Score = 0;

  player2Score = 0;

  player1 = '';

  player2 = '';

  player1Letter = '';

  player2Letter = '';

  player1Turn = true;

  arrX = [];

  arrO = [];

  $('#tic-tac-toe-board .row div').html('');

  $('#player1 .score,#player2 .score').html(0);

});

$('#tic-tac-toe-board .row div').mouseover(function() {

    if ($(this).html() === '') { // if there is no X or O in this square

      $(this).css({'cursor':'pointer'});

    }

    else { // if there is X or O in this square

      $(this).css({'cursor':'not-allowed'});

    }

});

function chooseRandomSquare() {

  if (totalTicTacArr.length < 9) { // computer can only take up 8 spaces as 9th space will be taken up by player1 (if there are not 3 Xs or Os in a row) as player1 goes last

    let randomNum = Math.floor((Math.random() * 9) + 1); // generate a number between 1 and 9

    $('#tic-tac-toe-board .row div').each(function() {

      if ($(this).attr('id').match(randomNum)) {

        if ($(this).html() !== '') { // if there is already an X or O in the square whose number matches the random number generated, generate another randomNumber

          chooseRandomSquare();

        }

        else { // if there is no X or O in the square whose number matches the random number generated, generate another randomNumber

          $(this).html(player2Letter);

          let id = $(this).attr('id');

          let search = id.search('square');

          let square = id.substr(search+6,id.length); // get number of square

          if (player2Letter === 'X') {

            arrX.push(parseInt(square));

            checkGame(arrX,'X');

          } // end of if (player2Letter === 'X')

          else {

            arrO.push(parseInt(square));

            checkGame(arrO,'O');

          } // end of else

        } // end of else

      } // end of if ($(this).html() !== '')

    });

    // it will now be player1's turn as computer has already gone

    $('#player1').addClass('player-turn ');

    $('#player2').removeClass('player-turn ');

  }

} // end of chooseRandomSquare()

function checkColumns(arr,num) {

  // loop through columns array until end and if no matches with arr are found execute checkRows()

  if (num < columns.length) {

    let columnMatches = 0;

    let column = columns[num];

    for (let i = 0; i < column.length;i++) {

        if (arr.includes(column[i])) {

            columnMatches++;
        }

      } // end of for loop

      if (columnMatches === 3) {

          ticTacToe = true;

          ticTacToeArr.push(column);

          return true;

      }

      else {

          checkColumns(arr,num+1)

      }

    } // end of if (num < columns.length)

    checkRows(arr,0);

}

function checkRows(arr,num) {

  // loop through rows array until end and if no matches with arr are found execute checkDiagonals()

  if (num < rows.length) {

    let rowMatches = 0;

    let row = rows[num];

    for (let i = 0; i < row.length;i++) {

      if (arr.includes(row[i])) {

          rowMatches++;

      }

    } // end of for loop

    if (rowMatches === 3) {

      ticTacToe = true;

      ticTacToeArr.push(row)

      return true;

    }

    else {

      checkRows(arr,num+1);

    }

  } // end of if (num < rows.length)

  checkDiagonals(arr,0);

}

function checkDiagonals(arr,num) {

  // loop through diagonals array until end

  if (num < diagonals.length) {

    let diagonalMatches = 0;

    let diagonal = diagonals[num];

    for (let i = 0; i < diagonal.length;i++) {

      if (arr.includes(diagonal[i])) {

        diagonalMatches++;

      }

    } // end of for loop

    if (diagonalMatches === 3) {

      ticTacToe = true;

      ticTacToeArr.push(diagonal)

      return true;

    }

    else {

      checkDiagonals(arr,num+1);

    }

  } // end of if (num < diagonals.length)

}

$('#tic-tac-toe-board .row div').click(function() {

  if ($(this).html() !== '') {

    alert('This square is already taken. Please choose another square.');

    return false;

  }

  if (gameWon === true) {

    return false;

  }

  let id = $(this).attr('id');

  let search = id.search('square');

  let square = id.substr(search+6,id.length);

  if (player2 === 'computer') {

    // it will now be computer's turn as player1 has already gone

    $('#player2').addClass('player-turn ');

    $('#player1').removeClass('player-turn ');

    $(this).html(player1Letter);

    if (player1Letter === 'X') {

      arrX.push(parseInt(square));

      checkGame(arrX,'X',true)

    }

    else {

      arrO.push(parseInt(square));

      checkGame(arrO,'O',true)

    } // end of else

  } // end of   if (player2 === 'computer')

  else {

      if (player1Turn === true) {

        $(this).html(player1Letter);

        player1Turn = false;

        // it will now be player2's turn as player1 has already gone

        $('#player2').addClass('player-turn ');

        $('#player1').removeClass('player-turn ');

        if (player1Letter === 'X') {

            arrX.push(parseInt(square));

            checkGame(arrX,'X',false);

        }

        else {

            arrO.push(parseInt(square));

            checkGame(arrO,'O',false);

        } // end of else

      }

      else {

        $(this).html(player2Letter);

        player1Turn = true;

        // it will now be player1's turn as player2 has already gone

        $('#player1').addClass('player-turn ');

        $('#player2').removeClass('player-turn ');

        if (player2Letter === 'X') {

          arrX.push(parseInt(square));

          checkGame(arrX,'X',false);

        }

        else {

          arrO.push(parseInt(square));

          checkGame(arrO,'O',false);

        } // end of else

      } // end of else

    } // end of else

});

function checkGame(arr,arrType,computer) {

  totalTicTacArr = arrO.concat(arrX);

  checkColumns(arr,0);

  if (totalTicTacArr.length === 9 && ticTacToe !== true) { // this means all 9 spaces have been taken up and there has is no row of 3 Xs or Os so nobody won

    showWinner('nobody');

  }

  else if (ticTacToe === true ) {

    gameWon = true;

    if (arrType == 'O') {

      if (player1Letter === 'O') {

        player1Score++;

        showWinner('player1',player1Score, 'Player 1')

      }

      else {

        player2Score++;

        showWinner('player2',player2Score, 'Player 2')

      }

    } // end of if (arrType == 'O')

    else {

      if (player1Letter === 'X') {

        player1Score++;

        showWinner('player1',player1Score,'Player 1')

      }

      else {

        player2Score++;

        showWinner('player2',player2Score, 'Player 2')

      }

    } // end of else

  } // end of else if (ticTacToe === true )

  else {

    if (computer === true) { // if player2 is computer

      setTimeout(chooseRandomSquare,1000); // if player1 has not won yet (does not have 3 Xs or Os in a row) let computer choose a square

    }

  } // end of else

} // end of checkGame()

function showWinner(player,score,announcePlayer) {

  setTimeout(function() {

    $('#player2,#player1').removeClass('player-turn '); // game has been won so it is no one's turn at this point

    let winningPhrase = '';

    $('#'+player).find('.score').html(score);

    if (player === 'nobody') {

      winningPhrase = "It's a tie ";

    }

    else if (player === 'player2') {

      if (player2 === 'computer') {

        winningPhrase = 'Computer wins!';

      }

      else {

        winningPhrase = announcePlayer + ' wins!';

      }

    } // end of else if (player === 'player2')

    else {

      winningPhrase = announcePlayer + ' wins!';

    }

    if ($(window).width() < 768) {

      $('.mobile-winner-div').removeClass('not-visible').addClass('animated zoomIn').find('p').html(winningPhrase);

    }

    else {

      $('.winner-div').addClass('animated zoomIn').removeClass('hide').find('.winner').html(winningPhrase);

    }

    $('#tic-tac-toe-board .row div').each(function() {

      let id = $(this).attr('id');

      let search = id.search('square');

      let square = parseInt(id.substr(search+6,id.length)); // get number of square

      if (ticTacToeArr[0].indexOf(square) > -1) {

        $(this).addClass('winning-group'); // if number of this square is one of numbers in ticTacToeArr (it is 1 in row of 3 Xs or Os) highlight it

      }

    });

  },1000);

  setTimeout(function() {

    // reset game

    ticTacToe = false;

    player1Turn = true;

    arrX = [];

    arrO = [];

    totalTicTacArr = [];

    ticTacToeArr = [];

    $('#tic-tac-toe-board .row div, .mobile-winner-div p,.winner').html('');

    $('.winner-div, .mobile-winner-div').removeClass('animated zoomIn')

    $('#player1').addClass('player-turn ');

    $('#player2').removeClass('player-turn ');

    $('.winner-div').addClass('hide')

    $('.mobile-winner-div').addClass('not-visible');

    $('#tic-tac-toe-board .row div').removeClass('winning-group');

    player1Turn = true;

    gameWon = false;

  },5000);

}
