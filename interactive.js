$(document).ready(function(){


  //Add tweets to page in reverse chrono order
  var updateFeed = function(user) {

    var $tweets = $('#tweets-container');
    $tweets.html('');

    //Tweet Building Variables
    var tweet;
    var $tweet;
    var $user;
    var $content;
    var $timeStamp;
    var base;
    var index;

    //User Conditions
    if (user === 'all') {
      //source from all user tweets
      base = streams.home;
    } else if (user) {
      //source from specific user
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
      friendlyTimeStamp = jQuery.timeago(tweet.created_at);
      $timeStamp.text(friendlyTimeStamp);

      //Append elements to page
      $user.appendTo($tweet);
      $content.appendTo($tweet);
      $timeStamp.appendTo($tweet);
      $tweet.appendTo($tweets);
    }

    //Username Click Handler
    $('.username').on('click', function() {
      var handle = $(this).data('handle');
      updateFeed($(this).data('handle'));
    });
  }

  //Initial update when page loads
  updateFeed('all');

  //Update Feed Button Click Handler
  $('#update-button').on('click', function() {
    $('.tweet').remove();
    updateFeed('all');
  });

  
  //Guest Tweet Event Handler
  $('input').on('keypress', function(key) {
      if (key.which === 13) {
        var $guestTweet = ($(this).val());
        writeTweet($guestTweet);
        updateFeed('all');
      }
  });

});