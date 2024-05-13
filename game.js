var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0; 
var clickTimes = 0;

// Show the Sequence to the User with Animations and Sounds

$(document).on("keypress", function(){
    if (started == false){
        //$("h1").text("Level " + level);
        gamePattern = [];
        userClickedPattern = [];
        level = 0;
        clickTimes = 0;
        nextSequence();
        started = true;


    }
});



// Check which button is pressed
$(".btn").on("click", handler);

function handler(){
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    clickTimes++;
    checkAnswer(level, clickTimes);

    // Test
    // console.log("click button");
    // console.log(gamePattern);
    // console.log(userClickedPattern);
    // console.log(level);
    // console.log(clickTimes);

}
function nextSequence(){
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour); 

    // Flash
    setTimeout(function(){
        $("#"+randomChosenColour).fadeOut();       
        $("#"+randomChosenColour).fadeIn();
    }, 500);
    
    // play sound;        
    playSound(randomChosenColour);  

    // Increase level
    level++;
    clickTimes = 0;
    $("h1").text("Level " + level);
    userClickedPattern = [];

    // Test
    // console.log("new level");
    // console.log(gamePattern);
    // console.log(userClickedPattern);
    // console.log(level);
    // console.log(clickTimes);
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3"); 
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel, clickTimes){
    // console.log("currentLevel:" + currentLevel);
    // console.log("clickTimes:" + clickTimes);
    if (userClickedPattern[clickTimes-1] == gamePattern[clickTimes-1]){
        if (clickTimes == currentLevel){
            nextSequence();
            // Test
            // console.log("increase one level");
        }
        // Test
        // console.log("Press another button within the same level");
    } else{
        playSound("wrong");
        $("h1").text("Game Over, Press Any Key to Restart")
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);
        started = false;
        // Test
        // console.log("Failed")

        
    }
}



