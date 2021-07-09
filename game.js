var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).keydown(function(){
  if(!started){
    $("h3").fadeOut();
    $("p").fadeOut();
    setTimeout(function () {
      nextSequence();
    }, 500);
    started=true;
  }
})

$(".btn").on("click",function(){
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnaswer(userClickedPattern.length-1);
});

function nextSequence(){
    level++;
    $("h1").text("level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomchosenColour=buttonColours[randomNumber];
    gamePattern.push(randomchosenColour);
    $("#"+randomchosenColour).fadeOut(100).fadeIn(100);
    playSound(randomchosenColour);

}



function playSound(name){
  var sound= new Audio("sounds/"+name+".mp3");
  sound.play();
}

function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  },100);
}

function checkAnaswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if(currentLevel===level-1){
      userClickedPattern=[];
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    var sound= new Audio("sounds/wrong.mp3");
    sound.play();
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
    $("h1").text("Game Over, Press Any Key to Restart");
  }
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
  userClickedPattern=[];
}
