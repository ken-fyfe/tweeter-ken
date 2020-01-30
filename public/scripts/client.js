/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense, donc je suis"
    },
    "created_at": 1461113959088
  }
];

const daysAgo = function(timeRecorded) {
  const currentTime = Date.now();
  const timeDiff = currentTime - timeRecorded;
  const numDays = timeDiff / (1000 * 24 * 3600);
  return String(Math.round(numDays)) + ' days ago';
};

const createTweetElement = function(userInfo) {
  const imgAvatar = userInfo.user.avatars;
  const name = userInfo.user.name;
  const handle = userInfo.user.handle;
  const tweet = userInfo.content.text;
  const rawTime = userInfo.created_at;

  const elementHTML = `
    <article id="tweet">
      <header style="display: flex; clear: both">
        <div><img src="${imgAvatar}" & ${name}</div>
        <div style="align-content: right;">${handle}</div>
      </header>
      <section>
        ${tweet}
      </section>
      <footer style="display: flex; clear: both">
        <div>${daysAgo(rawTime)}</div>
        <div>@ $ &</div>
      </footer>
    </article>`;
  return elementHTML;
};

const renderTweets = function(tweets) {
  for (const tweet in tweets) {
    const formattedTweet = createTweetElement(tweets[tweet]);
    $('#tweet-section').append(formattedTweet);
  }
};

$("document").ready(function() {
  renderTweets(data);
});