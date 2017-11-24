/* Explanation of program:

  The JavaScript Calculator can solve operations involving multiplication,division,subtraction,and addition.
  The value of the button pressed as well as the entire equation is displayed on the screen each time a number
  or operator button is pressed. Each entry can be cleared by clicking the CE button and the entire equation
  can be cleared by pressing the AC button.

*/

let equation = '';

let input = '';

let entryCleared = false;

$('#input-screen').val('');

$('.button:not(#equal):not(#ac):not(#ce)').click(function(){

    let buttonValue = $(this).html();

    let classArr = $(this).attr('class');

    if (classArr.includes('operator-button')) { // if operator (*+/-) button has been clicked

        if (!isNaN(equation[equation.length-1])) { // if last part of equation is number or equation is empty, add operator to input/equation

            input = buttonValue;
        }

        else { // if last part of equation is operator, do not add another operator to input/equation

            buttonValue = '';

        }

        if (entryCleared === true) {

            entryCleared = false; // mark entryCleared as false so it can be noted when EC button is clicked again

        }

    } // end of (classArr.includes('operator-button'))

    else { // if number button has been clicked

        if (entryCleared === true) {

            if (!isNaN(equation[equation.length-1])) { // if last part of equation is number

              equation = ''; // clear equation as new number being entered will not be the same as last number in equation

            }

            entryCleared = false; // mark entryCleared as false so it can be noted when EC button is clicked again

        }

        if (!isNaN(input)) { // if input on screen is a digit/are digits, continue to append digits so proper number can be added to equation

            input += buttonValue;

        }

        else { // if input on screen is not a number (if it is an operator), change input to number of button clicked

            input = buttonValue;

        }

    } // end of else

    equation += buttonValue;

    $('#input-screen').val(input + '\n'+ equation);

});

$('#equal').click(function(){

    if (equation.length === 0) { // if equation is empty, exit function

        return false;

    }

    let multiply = $('#multiply').html();

    let divide = $('#divide').html();

    let regexMultiply = new RegExp(multiply,"g");

    let regexDivide = new RegExp(divide,"g");

    let evalEquation = equation;

    evalEquation = evalEquation.replace(regexMultiply,'*').replace(regexDivide,'/'); // make sure equation includes proper JavaScript operators to divide,multiply,subtract,add

    // make sure equation has no errors in it

    try {

        eval(evalEquation);

        let result = eval(evalEquation);

        if (!Number.isInteger(result)) { // if result is float

            result = result.toFixed(2); // round result to 2 decimal places

        } // end of (!Number.isInteger(result))

        if (result === 'NaN') {

            result = 'Not a number';

        }

        $('#input-screen').val(result + '\n' + equation + '='+ result);

    }

    catch (error) {

        if (error ) {

            $('#input-screen').val('Error');

        }

    } // end of catch()

    // clear everything so another equation can be entered

    equation = '';

    input = '';

});

$('#ac').click(function() {

    // clear everything

    equation = '';

    input = '';

    $('#input-screen').val('');

});

$('#ce').click(function() {

    let multiply = $('#multiply').html();

    let divide = $('#divide').html();

    let add = $('#add').html();

    let subtract = $('#subtract').html();

    let indexArr = [];

    if (!isNaN(equation[equation.length-1])) { // if last part of equation is number

        // find last part of equation

        for (var i = equation.length; i > -1; i--) {

            if (equation[i] === multiply || equation[i] === divide || equation[i] === subtract || equation[i] === add) {

                indexArr.push(equation.lastIndexOf(equation[i]));

                break;

            }

        } // end of for loop

        if (indexArr.length === 0) { // if there are only numbers in equation (no operators), clear entire equation

          equation = '';

        }

        else {

            equation = equation.substr(0,indexArr[0]+1); // remove last number

        }

    } // end of if (!isNaN(equation[equation.length-1]))

    else { // if last part of equation is operator

        equation = equation.substr(0,equation.length-1); // remove last operator

    }

    $('#input-screen').val('\n'+ equation);

    input = ''; // clear input so user can continue to chain operations

    entryCleared = true; // mark entryCleared as true to note CE button has been pressed

});
