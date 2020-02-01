// function to count the number of characters that have been typed into a tweet
$(document).ready(function() {
  const max = 140;
  $('#numChar').text(max);
  $('textarea').keyup(() => {
    let len = $('textarea').val().length;
    let numRemaining = max - len;
    $('#numChar').text(numRemaining);
    if (numRemaining < 0) {
      $('#numChar').css('color', 'red');
    } else {
      $('#numChar').css('color', 'black');
    }
  });
});