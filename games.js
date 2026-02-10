var buttoncolours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

$(document).on("keypress touchstart", function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



$(".btn").click(function () {
  var userchosenColour = $(this).attr("id");

  userClickedPattern.push(userchosenColour);

  playsound(userchosenColour);

  animatepress(userchosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentlevel){
      if (gamePattern[currentlevel]===userClickedPattern[currentlevel]) {

        console.log("success");

            if (userClickedPattern.length===gamePattern.length) {
              setTimeout(function(){
                nextsequence();
                userClickedPattern=[];
              },1000);
            }
      }
      else{
        console.log("wrong");

        playsound("wrong");

        $("body").addClass("game-over");

        setTimeout(function(){

          $("body").removeClass("game-over")

        },200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startover();
      }

}


function nextsequence() {
  level++;

  $("#level-title").text("level " + level);

  var randomnumber = Math.floor(Math.random() * 4);

  var randomchosenColour = buttoncolours[randomnumber];

  gamePattern.push(randomchosenColour);

  $("#" + randomchosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playsound(randomchosenColour);
}
function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");

  audio.play();
}

function animatepress(currentcolour) {
  $("#" + currentcolour).addClass("pressed");

  setTimeout(function () {
    $("#" + currentcolour).removeClass("pressed");
  }, 100);
}

function startover() {
    level=0;
    gamePattern=[];
    started = false;
    userClickedPattern=[];
}

