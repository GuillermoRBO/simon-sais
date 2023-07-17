


   
   var gamePattern = [];
    var userClickedPattern = [];
    var buttonColours= ["red", "blue", "green", "yellow"];
    var level = 0  ; 
    var started = false;


// press button to start

//jQuery(document).keypress(function() {}


   $("button.start").click(function(){
    if (!started){

       
     $("p").text("Level " + level);
     started = true;
     nextSequence();

    }
});


 // when the user  clicks
 $(".button.simon").click(function(){

    var  userChosenColour = $(this).attr("id");
  
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1); // the last index = the nr of items -1 cuz the index starts at 0


  });



// game logic
function checkAnswer(currentLevel){

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");
        console.log(userClickedPattern.length);
        if(gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
else{
    console.log("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
    $("body").removeClass("game-over");
    }, 200);


    var audio = new Audio("sounds/mixkit-fairytale-game-over-1945.wav");
    audio.play();
    $(".start").css("width","35rem"); 
    document.querySelector(".start").innerHTML="YOU HAVE LOST";
    $("div.config").fadeOut(3000) 
   
   $("p").addClass("disappear");

   setTimeout(function() {
    $("div.config").fadeIn(3000)
        $(".start").css("width","auto")
        document.querySelector("p.first").innerHTML="Press";
        document.querySelector("p.second").innerHTML="to begin the game";
        document.querySelector(".start").innerHTML="START";
        $("p").removeClass("disappear");

  ;}, 3000);
   

   


    startOver();

    }
}




function nextSequence(){

    
    userClickedPattern=[];
    level++;
    $("p").text("Level " + level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);
    console.log(gamePattern);
    console.log(randomNumber) ;

    //to repeatr the whole pattern at each level

        var i = 0;                  //  set your counter to 0

        function myLoop() {         //  create a loop function
          setTimeout(function() {   //  call a 3s setTimeout when the loop is called
            $("."+ gamePattern[i]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(gamePattern[i]);                                                          //  your code here
            i++;                    //  increment the counter
            if (i < gamePattern.length) {           //  if the counter < 10, call the loop function
              myLoop();             //  ..  again which will trigger another 
            }                       //  ..  setTimeout()
          }, 500)
        }
        
        myLoop();  


}

// for the sound
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

// gives shadow
function animatePress(currentColor) {
    var shadow = $("button"+"."+currentColor).addClass("pressed");
    setTimeout(function() {
        shadow.removeClass("pressed");
    }, 100);
}

 
//reset parameters
function startOver(){
    level  = 0 ;
    gamePattern = [];
    started = false;
}


