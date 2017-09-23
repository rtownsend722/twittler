$(document).ready(function(){

  /*Function Definitions*/
  var updateFeed = function(user) {

    var $tweets = $('#tweets-container');
    $tweets.html('');

    /*Tweet Building Variables*/
    var tweet;
    var $tweet;
    var $user;
    var $content;
    var $timeStamp;
    var base;
    var index;

    /*Function Definitions*/
    var showUserTweets = function() {
      var handle = $(this).data('handle');
      updateFeed($(this).data('handle'));
    };

    //User Conditions
    if (user === 'all') {
      //tweet base - all user tweets
      base = streams.home;
    } else if (user) {
      //tweet base - specific user
      base = streams.users[user];
    }

    for (index = base.length - 1; index >= 0; index -= 1) {
   
      //Set up html elements
      tweet = base[index];
      $tweet = $('<div class="tweet"></div>');
      $user = $('<a class="username"></a>');
      $user.data('handle', tweet.user);
      $content = $('<p class="content"></p>')
      $timeStamp = $('<div class="timestamp"></div>')

      //add text to elements
      $user.text('@' + tweet.user + ': ')
      $content.text(tweet.message);
      var $prettyTimeStamp = jQuery.timeago(tweet.created_at);
      $timeStamp.text($prettyTimeStamp);

      //Append elements to page
      $user.appendTo($tweet);
      $content.appendTo($tweet);
      $timeStamp.appendTo($tweet);
      $tweet.appendTo($tweets);
    }

    /*Internal Click Handlers*/
    $('.username').on('click', showUserTweets);
  }

  var clearFeed = function() {
    $('.tweet').remove();
  };

  var postGuestTweet = function() {
    var $guestTweet = ($('#guest-tweet').val());
    writeTweet($guestTweet);
    updateFeed('all');
  };

  /*Event Handlers*/
  $('#update-button').on('click', function() {
    clearFeed();
    updateFeed('all');
  });

  
  $('#guest-tweet').on('keypress', function(key) {
    if (key.which === 13) {
      postGuestTweet();
      $('#guest-tweet').val("What's on your mind?");

    }
  });

  /*Initial update when page loads*/
  updateFeed('all');

});