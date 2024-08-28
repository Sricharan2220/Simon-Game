var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red","blue","green","yellow"];

var level = 0;

var started = false;


$(document).keypress(function(){
   if(!started){
    $("#level-title").text("Level " + level);  
    nextSequence();
    started = true;
   }
 });

function nextSequence(){
   userClickedPattern = [];
   level = level + 1;
   $("h1").text("Level " + level);

    var randomnumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomnumber];
    gamePattern.push(randomChosenColour);
    
   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
   
}

$(".btn").click(function(){
   var userChosenColor = $(this).attr("id");
   userClickedPattern.push(userChosenColor);
   checkAnswer(userClickedPattern.length-1);
   playSound(userChosenColor);
   animatePress(userChosenColor);
});


function checkAnswer(curr_index){
   if(gamePattern[curr_index] == userClickedPattern[curr_index]){
      if(gamePattern.length == userClickedPattern.length){
         setTimeout(function(){
            nextSequence();
         },1000);
      }
   }else{
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
         $("body").removeClass("game-over");
      },200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
   }
}

function startOver(){
   level = 0;
   started = false;
   gamePattern = [];
}

function animatePress(currentColour){
   $("#" + currentColour).addClass("pressed");
   setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
   },100);
}

function playSound(name){
   var audio = new Audio("sounds/" + name + ".mp3");
   audio.play();
}


