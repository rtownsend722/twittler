$(document).ready(function(){
  //create var to store the body element
  
  //Change the content of all body elements to an empty string
  

  /*Add tweets to page in reverse chrono order*/
  var updateFeed = function(user) {
    //Create var to store html elements for tweets
    var $tweets = $('#tweets-container');
    $tweets.html('');

    //Define all other tweet variables
    var tweet;
    var $tweet;
    var $user;
    var $content;
    var $timeStamp;
    var base;
    var index;

    //Define conditions for user
    if (user === 'all') {
      //use streams.home to update all user tweets
      base = streams.home;
    } else if (user) {
      //if we want a specific user's tweets...
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
      $timeStamp.text(tweet.created_at);

      //Append elements to page
      $user.appendTo($tweet);
      $content.appendTo($tweet);
      $timeStamp.appendTo($tweet);
      $tweet.appendTo($tweets);
    }

  //Set up click handler for click on username
  $('.username').on('click', function() {
    var handle = $(this).data('handle');
    updateFeed($(this).data('handle'));
  });
}

  //Initial update when page loads
  updateFeed('all');

  //click handler for Update Feed button
  $('#update-button').on('click', function() {
    $('.tweet').remove();
    updateFeed('all');
  });

});