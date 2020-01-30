// function to count the number of characters that have been typed into a tweet
$(document).ready(function() {
  const max = 140;
  $('#numChar').text(max);
  $('textarea').keyup(() => {
    console.log('got inside char input');
    let len = $('textarea').val().length;
    let numRemaining = max - len;
    $('#numChar').text(numRemaining);
    if (numRemaining < 0) {
      $('#numChar').css('color', 'red');
    }
  });
});