const buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = []
var userClickedPattern = []

var level = 0;

function nextSequence(level)
{
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    animatePress(randomChosenColour);
    playSound(randomChosenColour);
    $("#level-title").text("Level " + level);
    level++;
    return level;
}

$(".btn").click(function() {
    if (!started)
    {
        return;
    }
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    if(!checkAnswer(userClickedPattern.length - 1))
    {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }
        , 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
    }
    else if (userClickedPattern.length === gamePattern.length)
    {
        setTimeout(function() {
            level = nextSequence(level);
            userClickedPattern = [];
        }, 1000);
    }
});

function playSound(name)
{
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour)
{
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }
    , 100);
}

var started = false;
$(document).keypress(function() {
    if (started)
    {
        startOver();
        level = nextSequence(level);
    }
    else if (!started)
    {
        level = nextSequence(level);
        started = true;
    }
});

function checkAnswer(currentLevel)
{
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("success");
        return true;
    }
    else
    {
        console.log("wrong");
        return false;
    }
}

function startOver()
{
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}