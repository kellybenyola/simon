
var buttonColors = ["red", "blue", "yellow", "green"];

var gamePattern = [];

var userClickPattern=[];

var keyPressed = false;

var level = 0;

$(document).keypress(function(){
  if (!keyPressed){
    $('#level-title').text('Level ' + level);
    nextSequence();
    keyPressed = true;
  }
});


$('.btn').click(function(){
  var userChosenColor = $(this).attr('id');
  userClickPattern.push(userChosenColor);

  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickPattern.length-1);
});



function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickPattern[currentLevel]){
    if (userClickPattern.length === gamePattern.length){
      setTimeout (function(){
        nextSequence();
      }, 1000);
    }

  }else {
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout (function(){
        $("body").removeClass("game-over")
      }, 200);
    var name= "wrong";
    playSound(name);
    startOver();
}
}




function nextSequence(){
  userClickPattern = [];

  level++;
  $('#level-title').text('Level ' + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
  $.each(gamePattern);



}

function startOver(){
  level = 0;
  gamePattern =[];
  keyPressed = false;

}



function playSound(name){
  var audio = new Audio('sounds/' + name + '.mp3');
  audio.play();

}

function animatePress(currentColor){
  $('#' + currentColor).addClass('pressed');
  setTimeout(function(){
    $('#' + currentColor).removeClass('pressed');
  }, 100);
}
