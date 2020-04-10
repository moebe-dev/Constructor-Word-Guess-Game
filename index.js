var Word = require("./word.js");
var inquirer = require("inquirer");
var letterArray = "abcdefghijklmnopqrstuvwxyz";
var texasCities = [
    // Top 50 Texas Cities By Population.
    // Wikipedia Population Census, 2010 - 2017.
    // 04/01/2020
    "houston",//1
    "san antonio",//2 
    "dallas",//3
    "austin",//4
    "fort worth",//5
    "el paso",//6
    "arlington",//7
    "corpus christi",//8
    "plano",//9
    "laredo",//10
    "lubbock",//11
    "garland",//12
    "irving",//13
    "amarillo",//14
    "grand prairie",//15
    "mckinney",//16
    "frisco",//17
    "brownsville",//18
    "pasadena",//19
    "killeen",//20
    "mcallen",//21
    "waco",//22
    "midland",//23
    "denton",//24
    "waco",//25
    "carrollton",//26
    "round rock",//27
    "abilene",//28
    "pearland",//29
    "richardson",//30
    "sugar land",//31
    "beaumont",//32
    "college station",//33
    "odessa",//34
    "lewisville",//35
    "league city",//36
    "tyler",//37
    "wichita falls",//38
    "allen",//39
    "san angelo",//40
    "edinburg",//41
    "conroe",//42
    "bryan",//43
    "mission",//44
    "new braunfels",//45
    "longview",//46
    "pharr",//47
    "flower mound",//48
    "baytown",//49
    "cedar park",//50
];

var randomIndex = Math.floor(Math.random() * texasCities.length);
var randomWord = texasCities[randomIndex];
var computerWord = new Word(randomWord);
var requireNewWord = false;
var incorrectLetters = [];
var correctLetters = [];
var guessesLeft = 10;

function theLogic() {
    if (requireNewWord) {
        var randomIndex = Math.floor(Math.random() * texasCities.length);
        var randomWord = texasCities[randomIndex];

        computerWord = new Word(randomWord);

        requireNewWord = false;
    }

    var wordComplete = [];
    computerWord.objArray.forEach(completeCheck);

    if (wordComplete.includes(false)) {
        inquirer
            .prompt([
                {
                    type: "input",
                    message: "Try To Guess A Texas City - Please Guess a Letter Between 'A-Z' To Start!",
                    name: "userinput"
                }
            ])
            .then(function (input) {
                if (
                    !letterArray.includes(input.userinput) ||
                    input.userinput.length > 1
                ) {
                    console.log("\nPlease Try Again!\n");
                    theLogic();
                } else {
                    if (
                        incorrectLetters.includes(input.userinput) ||
                        correctLetters.includes(input.userinput) ||
                        input.userinput === ""
                    ) {
                        console.log("\nAlready Guessed or Nothing Entered!\n");
                        theLogic();
                    } else {
                        var wordCheckArray = [];

                        computerWord.userGuess(input.userinput);

                        computerWord.objArray.forEach(wordCheck);
                        if (wordCheckArray.join("") === wordComplete.join("")) {
                            console.log("\nIncorrect!\n");

                            incorrectLetters.push(input.userinput);
                            guessesLeft--;
                        } else {
                            console.log("\nCorrect!\n");

                            correctLetters.push(input.userinput);
                        }

                        computerWord.log();

                        console.log("Guesses Left: " + guessesLeft + "\n");

                        console.log(
                            "Letters Guessed: " + incorrectLetters.join(" ") + "\n"
                        );

                        if (guessesLeft > 0) {
                            theLogic();
                        } else {
                            console.log("Sorry, You Lost!\n");

                            restartGame();
                        }

                        function wordCheck(key) {
                            wordCheckArray.push(key.guessed);
                        }
                    }
                }
            });
    } else {
        console.log("YOU WIN!\n");

        restartGame();
    }

    function completeCheck(key) {
        wordComplete.push(key.guessed);
    }
}

function restartGame() {
    inquirer
        .prompt([
            {
                type: "list",
                message: "Would You Like To:",
                choices: ["Play Again", "Exit"],
                name: "restart"
            }
        ])
        .then(function (input) {
            if (input.restart === "Play Again?") {
                requireNewWord = true;
                incorrectLetters = [];
                correctLetters = [];
                guessesLeft = 10;
                theLogic();
            } else {
                return;
            }
        });
}

theLogic();
