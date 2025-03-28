var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var flag = false;
var level = 0;


// jQuery("h1").css("color", "red");


/* detect a keypress to start the game */
$(document).ready(function() {
    $(document).keydown(function() {
        if (!flag) {
            $("#level-title").text("Level " + level);
            nextSequence();
            flag = true;
          }
    });
});



/* push the color of the user clicked-button in the list and play the sound */
$(".btn").click(function(){
    var user_chosen_color = $(this).attr("id");

    userClickedPattern.push(user_chosen_color);

    playSound(user_chosen_color);
    animatePress(user_chosen_color);

    checkAnswer(userClickedPattern.length-1);
  });



/* the sequence of the next played sounds */
function nextSequence(){
    userClickedPattern = [];
    level = level + 1;
    $("#level-title").text("Level " + level);
    var random_num =  Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[random_num];
    gamePattern.push(randomChosenColor);
    
    fade(randomChosenColor);
    /*
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    */
    
    playSound(randomChosenColor);  
    // debug
    console.log("Level: " + level);
    console.log("Game Pattern: " + gamePattern);
}


/* Check if the user gave the correct answer */
function checkAnswer(currentIndex){
    //console.log("checkAnswer called");
    //console.log("User Clicked Pattern: " + userClickedPattern);
    //console.log("Game Pattern: " + gamePattern);
    if (userClickedPattern[currentIndex] === gamePattern[currentIndex]){
        console.log("Correct answer at index " + currentIndex);
        //console.log("checkAnswer called");

        if (userClickedPattern.length === gamePattern.length){
            
            //console.log("Correct answer");

            setTimeout(function(){
                nextSequence();
            }, 2000);
        }
    }
    else {
        
        //console.log("Wrong answer");
        console.log("Wrong answer at index " + currentIndex);
        itIsWrong();
        restart();
    }
}


/* animate the pressed button */
function animatePress(color_now){
    $("#" + color_now).addClass("pressed");
    setTimeout(function(){
        $("#" + color_now).removeClass("pressed");
    }, 100);
}


/* animate the sequence of the played buttons */
function fade(button_name){
    $("#"+ button_name).stop().css("background-color", button_name).animate({opacity: 0 }, 300).animate({opacity:1}, 300);
}


/* play the sound of the buttons */
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play(); 
}


/* animate background */
function itIsWrong(){
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    }, 200);
    var name = "wrong";
    $('h1').text("Wrong. Press any key to start");
    playSound(name);
}

// Restart the game
 function restart(){
    gamePattern = [];
    level = 0;
    flag = false;
 }



