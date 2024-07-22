var colors = ["blue", "yellow", "red", "green"];

var gamePattern = [];

var userPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function () {
  var a = $(this).attr("id");
  userPattern.push(a);

  playSound(a);
  animatePress(a);

  checkAnswer(userPattern.length - 1);
});

function nextSequence() {
  userPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var element = colors[randomNumber];
  gamePattern.push(element);

  $("#" + element)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(element);
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    console.log("success");

    if (userPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    console.log("fail");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");

    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}
function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
