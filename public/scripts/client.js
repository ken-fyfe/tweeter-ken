/*
 * Client-side JS
 */

// display error message - press any key or mouse click to clear
const displayError = function(errorMessage) {
  $('main').prepend(`<div class="error-message"><strong>Error:</strong> ${errorMessage}</div>`);
  // detect keyboard or mouse events
  $('body').on('click keypress', function() {
    $('.error-message').hide();
  });
};

// AJAX post function to put tweets into the database
$(function() {
  $('#form-submit').on('click', function() {
    // the following is to 'escape' strings to prevent XSS attacks
    const escape =  function(str) {
      let div = document.createElement('div');
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
    };
    event.preventDefault();
    const maxLengthTweet = 140;
    const postedTweet = $('textarea').val();
    const safeText =  `<p>${escape(postedTweet)}</p>`;
    const tweetLength = safeText.length;
    if ((safeText.length === 0) || (safeText === null)) {
      displayError('Can not post a tweet of zero length');
    } else if (tweetLength > maxLengthTweet) {
      displayError(`Tweet can not be over ${maxLengthTweet} characters in length`);
    } else {
      $.ajax({
        url: '/tweets',
        method: 'post',
        data: $('form').serialize(),
        success: (res) => {
          $('#tweet-section').prepend(createTweetElement(res));
          $('form').trigger('reset'); // clears the tweet field
        },
        error: () => displayError('Unsuccessful POST of tweet')
      });
    }
  });
});

// read in UTC time, determines current time and returns how long ago it took (days, hours, minutes, seconds)
const howLongAgo = function(timeRecorded) {
  const currentTime = Date.now();
  const timeDiff = (currentTime - timeRecorded) / 1000;
  if (timeDiff < 60) {
    return String(Math.round(timeDiff)) + ' seconds ago';
  } else if (timeDiff < 3600) {
    return String(Math.round(timeDiff / 60)) + ' minutes ago';
  } else if (timeDiff < (24 * 3600)) {
    return String(Math.round(timeDiff / 3600)) + ' hours ago';
  } else {
    return String(Math.round(timeDiff / (24 * 3600))) + ' days ago';
  }
};

// formats the tweet to get injected into the body
const createTweetElement = function(userInfo) {
  const imgAvatar = userInfo.user.avatars;
  const name = userInfo.user.name;
  const handle = userInfo.user.handle;
  const tweet = userInfo.content.text;
  const rawTime = userInfo.created_at;

  const elementHTML = `
    <article id="tweet">
      <header>
        <span class="name"><img src="${imgAvatar}">${name}</span>
        <span class="handle">${handle}</span>
      </header>
      <section>
        ${tweet}
      </section>
      <footer>
        <div>${howLongAgo(rawTime)}</div>
        <div>&#9873 &nbsp &#9853; &nbsp &hearts;</div>
      </footer>
    </article>`;
  return elementHTML;
};

// loops through the tweets to get injected
const renderTweets = function(tweets) {
  for (const tweet in tweets) {
    const formattedTweet = createTweetElement(tweets[tweet]);
    $('#tweet-section').append(formattedTweet);
  }
};

// use AJAX to get tweets from the server
const loadtweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    contentType: 'json',
    success: (res) => {
      renderTweets(res);
    },
    error: () => displayError('Unsuccessful POST of tweet')
  });
};

// open the tweeter entry region and toggle the double arrows up/down
const openTweetRegion =  function(arrow) {
  // swap up arrow and down arrow images
  let swapImage;
  ($(arrow).attr('src') === $(arrow).attr('up-arrows')) ? swapImage = 'down-arrows' : swapImage = 'up-arrows';
  $(arrow).attr('src', $(arrow).attr(swapImage));
  // toggle the tweet input form
  $('form').toggle();
};

// loads the current stored tweets and hides the tweet input region
$('document').ready(function() {
  $('form').hide();
  loadtweets();
});