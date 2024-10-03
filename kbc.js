
const questions = [
    "What is the capital of Australia?",
    "Which planet is closest to the sun?",
    "What is the chemical symbol for gold?",
    "Who wrote '1984'?",
    "What is the largest ocean on Earth?",
    "Who painted the ceiling of the Sistine Chapel?",
    "What is the smallest bone in the human body?",
    "Which country is known as the Land of the Rising Sun?",
    "What is the hardest known natural material?",
    "Who is the author of 'Harry Potter' series?",
    "What is the square root of 64?",
    "What is the main gas found in the air we breathe?",
    "Who developed the polio vaccine?",
    "What is the longest river in the world?",
    "What is the currency of Japan?",
    "What is the largest planet in our solar system?",
    "Who wrote 'Pride and Prejudice'?",
    "What is the smallest country in the world?",
    "Who painted the Mona Lisa?",
    "What is the speed of light?",
    "What is the tallest mountain in the world?",
    "Who discovered penicillin?",
    "What is the chemical symbol for water?",
    "Who was the first person to walk on the moon?",
    "What is the largest mammal in the world?",
    "Who wrote 'The Great Gatsby'?",
    "What is the capital of France?",
    "What is the largest desert in the world?",
    "Who invented the telephone?",
    "What is the boiling point of water?"
];

const choices = [
    ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    ["Earth", "Venus", "Mercury", "Mars"],
    ["Au", "Ag", "O", "Fe"],
    ["Aldous Huxley", "George Orwell", "J.K. Rowling", "Ernest Hemingway"],
    ["Atlantic", "Indian", "Arctic", "Pacific"],
    ["Vincent van Gogh", "Pablo Picasso", "Michelangelo", "Leonardo da Vinci"],
    ["Femur", "Stapes", "Tibia", "Radius"],
    ["China", "South Korea", "Japan", "Thailand"],
    ["Diamond", "Gold", "Iron", "Platinum"],
    ["J.R.R. Tolkien", "George R.R. Martin", "J.K. Rowling", "Stephen King"],
    ["6", "7", "8", "9"],
    ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    ["Alexander Fleming", "Louis Pasteur", "Jonas Salk", "Marie Curie"],
    ["Amazon", "Nile", "Yangtze", "Mississippi"],
    ["Yen", "Won", "Yuan", "Ringgit"],
    ["Jupiter", "Saturn", "Mars", "Earth"],
    ["Jane Austen", "Charlotte Bronte", "Emily Bronte", "Mary Shelley"],
    ["Vatican City", "Monaco", "San Marino", "Liechtenstein"],
    ["Leonardo da Vinci", "Vincent van Gogh", "Pablo Picasso", "Claude Monet"],
    ["300,000 km/s", "150,000 km/s", "299,792 km/s", "400,000 km/s"],
    ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
    ["Alexander Fleming", "Louis Pasteur", "Marie Curie", "Isaac Newton"],
    ["H2O", "O2", "CO2", "H2"],
    ["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"],
    ["Blue Whale", "Elephant", "Giraffe", "Hippopotamus"],
    ["F. Scott Fitzgerald", "Ernest Hemingway", "Mark Twain", "William Faulkner"],
    ["Paris", "Rome", "Berlin", "Madrid"],
    ["Sahara", "Arabian", "Gobi", "Kalahari"],
    ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Guglielmo Marconi"],
    ["100°C", "90°C", "110°C", "120°C"]
];

const correctAnswers = [2, 2, 0, 1, 3, 2, 1, 2, 0, 2, 2, 1, 2, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const scores = [1000, 2000, 3000, 5000, 10000, 20000, 40000, 800000, 160000, 320000, 640000, 1250000, 2500000, 5000000, 10000000];

let selectedQuestions = [];
let selectedChoices = [];
let selectedCorrectAnswers = [];
let currentQuestion = 0;
let totalScore = 0;
let timerInterval;
const TIMER_DURATION = 30;
let lifeline5050Used = false;
 
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function selectRandomQuestions() {
    const indices = Array.from(Array(questions.length).keys());
    shuffleArray(indices);
    selectedQuestions = indices.slice(0, 15).map(index => questions[index]);
    selectedChoices = indices.slice(0, 15).map(index => choices[index]);
    selectedCorrectAnswers = indices.slice(0, 15).map(index => correctAnswers[index]);
}

function startGame() {
    selectRandomQuestions();
    document.getElementById('welcome-page').classList.add('hidden');
    document.getElementById('game-page').classList.remove('hidden');
    showQuestion();
}


function showQuestion() {
    document.getElementById('question-number').children[1].textContent = `Question: ${currentQuestion + 1}`;
    document.getElementById('question').textContent = selectedQuestions[currentQuestion];
    const choiceButtons = document.getElementById('choices').getElementsByTagName('button');
    for (let i = 0; i < choiceButtons.length; i++) {
        choiceButtons[i].textContent = selectedChoices[currentQuestion][i];
        choiceButtons[i].classList.remove('wrong-answer', 'correct-answer');
        choiceButtons[i].style.display = 'inline-block'; 
        choiceButtons[i].disabled = false;
    }
    document.getElementById('wrong-answer-message').classList.add('hidden');
    resetTimer();
    startTimer();
    updatePrizeMoney();
}


function checkAnswer(selected) {
    const choiceButtons = document.getElementById('choices').getElementsByTagName('button');
    if (selected === selectedCorrectAnswers[currentQuestion]) {
        // Correct answer
        choiceButtons[selected].classList.add('correct-answer');
        totalScore = scores[currentQuestion];
        document.getElementById('total-score').textContent = totalScore;
        playAudio('correct');
    } else {
        // Wrong answer
        choiceButtons[selected].classList.add('wrong-answer');
        choiceButtons[selectedCorrectAnswers[currentQuestion]].classList.add('correct-answer');
        // document.getElementById("prize-amount").textContent=totalScore
        playAudio('incorrect');
        // window.open("end.html");
    }

    clearInterval(timerInterval);

    setTimeout(function() {
        if (selected === selectedCorrectAnswers[currentQuestion]) {
            currentQuestion++;
            if (currentQuestion < selectedQuestions.length) {
                showQuestion();
            } else {
                showPrizeAmount();
            }
        } else {
            showPrizeAmount();
        }
    }, 2000); 

    disableAllChoices();
}

function updatePrizeMoney() {
    const prizeList = document.getElementById('prizes').getElementsByTagName('li');
    for (let i = 0; i < prizeList.length; i++) {
        if (i ===15- currentQuestion-1) {
            prizeList[i].classList.add('active');
        } else {
            prizeList[i].classList.remove('active');
        }
    }
}

function resetGame() {
    currentQuestion = 0;
    totalScore = 0;
    lifeline5050Used = false;
    document.getElementById('total-score').textContent = totalScore;
    document.getElementById('welcome-page').classList.remove('hidden');
    document.getElementById('game-page').classList.add('hidden');
    document.getElementById('result-page').classList.add('hidden');
    clearInterval(timerInterval);
    updatePrizeMoney();
}

function startTimer() 

{
    let timeLeft = TIMER_DURATION;
   
    if(currentQuestion<5){
        timeLeft=20;
    }
    else if(currentQuestion>4 && currentQuestion<9){
        timeLeft=30;
    }
    else if(currentQuestion>9){
        document.getElementsByClassName('circle')[0].style.display='none'
    }
    document.getElementById('timer').textContent = timeLeft;
    timerInterval = setInterval(function() {
        timeLeft--;
        document.getElementById('timer').textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Game over. Your total score is " + totalScore);
            resetGame();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    document.getElementById('timer').textContent = TIMER_DURATION;
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('play-now').addEventListener('click', startGame);
    document.getElementById('instructions').addEventListener('click', showInstructions);
    document.getElementById('about').addEventListener('click', showAbout);
    const choiceButtons = document.getElementById('choices').getElementsByTagName('button');
    for (let i = 0; i < choiceButtons.length; i++) {
        choiceButtons[i].addEventListener('click', function() {
            checkAnswer(i);
        });
    }
    document.getElementById('lifeline-50-50').addEventListener('click', useLifeline5050); 
    updatePrizeMoney();
});



function useLifeline5050() {
    if (lifeline5050Used) return; 
    
    lifeline5050Used = true;
    // document.getElementById('lock').innerHTML="img src='lifelinekbc3-removebg-preview.png'"
    document.getElementById('lock').src = 'overlay.png';


    const correctIndex = selectedCorrectAnswers[currentQuestion]; 
    const choicesIndices = [0, 1, 2, 3].filter(index => index !== correctIndex); 
    shuffleArray(choicesIndices); 
    const hideIndices = choicesIndices.slice(0, 2); 

    const choiceButtons = document.getElementById('choices').getElementsByTagName('button');
    for (let i = 0; i < choiceButtons.length; i++) {
        if (i !== correctIndex && hideIndices.includes(i)) {
            choiceButtons[i].style.display = 'none'; 
        }
    }
}

// function handleWrongAnswer() {
//     if (currentQuestion >= 5 && currentQuestion < 10) {
//         totalScore = 100000;
//     } else if (currentQuestion >= 10) {
//         totalScore = 3200000;
//     } else {
//         totalScore = 0;
//     }
//     document.getElementById('total-score').textContent = formatScore(totalScore);
// }

function handleTimeOut() {
    document.getElementById('wrong-answer-message').classList.remove('hidden');
    handleWrongAnswer();
    setTimeout(function() {
        showPrizeAmount();
    }, 2000);
}

// function showPrizeAmount() {
//     document.getElementById('game-page').classList.add('hidden');
//     document.getElementById('result-page').classList.remove('hidden');
//     document.getElementById('prize-amount').textContent = `₹${totalScore}`;
// }









function showPrizeAmount() {
    const prizeAmount = totalScore;

    document.getElementById('prize-amount').textContent = `${prizeAmount}`;
    document.getElementById('game-page').classList.add('hidden');
    document.getElementById('result-page').classList.remove('hidden');

    if (prizeAmount >= 10000000) {

            document.getElementById('text').innerHTML='congratulations you won'
 }
}


function quitGame() {
    // if (currentQuestion >= 5 && currentQuestion < 10) {
    //     totalScore = 100000;
    // } else if (currentQuestion >= 10) {
    //     totalScore = 3200000;
    // } else {
    //     totalScore = 0;
    // }
    // document.getElementById('total-score').textContent = formatScore(totalScore);
    showPrizeAmount();
}


function formatScore(score) {
    return `₹${score.toLocaleString('en-IN')}`;
}

// Initialize the game
document.getElementById('play-now').addEventListener('click', startGame);
document.getElementById('quit-button').addEventListener('click', quitGame);



function disableAllChoices() {
    const choiceButtons = document.getElementById('choices').getElementsByTagName('button');
    for (let i = 0; i < choiceButtons.length; i++) {
        choiceButtons[i].disabled = true;
    }
}

function play()
{
    var d=document.getElementById("sound");
    d.play();
}

function playAudio(type) {
    const audioElement = type === 'correct' ? document.getElementById('correct-audio') : document.getElementById('incorrect-audio');
    audioElement.play();
}



