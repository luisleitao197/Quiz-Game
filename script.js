let jsonData = null;
let score = 0;  // To track the user's score

async function iniciarjogo() {
    var layoutinicial = document.getElementById("layoutinicial");
    layoutinicial.style.display = "none";

    var layoutperguntas = document.getElementById("layoutperguntas");
    layoutperguntas.style.display = "block";

    // Read Questions JSON file
    jsonData = await readJsonFile("questions.json");

    inserirPergunta();
}

var contador = -1;

function inserirPergunta() {
    contador++;

    // Check if there are more questions to show
    if (contador >= jsonData.length) {
        showFinalScore();  // If no more questions, show score
        return;
    }

    // Get element where the question will be displayed
    let pergunta = document.getElementById("pergunta");
    // Display the current question
    pergunta.innerHTML = jsonData[contador].pergunta;

    // Get elements where the options will be displayed
    let opcoes = document.getElementById("op1");
    opcoes.innerHTML = jsonData[contador].opcoes[0];
    opcoes = document.getElementById("op2");
    opcoes.innerHTML = jsonData[contador].opcoes[1];
    opcoes = document.getElementById("op3");
    opcoes.innerHTML = jsonData[contador].opcoes[2];
    opcoes = document.getElementById("op4");
    opcoes.innerHTML = jsonData[contador].opcoes[3];

    // Reset the background colors for the answer options
    resetAnswerColors();

    // Enable the answer options
    enableAnswerOptions();
}

// Add event listeners for all options
document.getElementById("op1").addEventListener("click", respostas);
document.getElementById("op2").addEventListener("click", respostas);
document.getElementById("op3").addEventListener("click", respostas);
document.getElementById("op4").addEventListener("click", respostas);

// Function to handle the answer selection and coloring
function respostas(element) {
    // Check if the selected answer is correct
    if (element.target.innerHTML == jsonData[contador].resposta_correta) {
        // Change color to green if correct
        element.target.style.backgroundColor = "#90EE90";
        score++;  // Increment score for correct answer
    } else {
        // Change color to red if incorrect
        element.target.style.backgroundColor = "#EE204D";
    }

    // Disable all options after an answer is chosen
    disableAnswerOptions();
}

// Function to reset the background colors of the answer buttons
function resetAnswerColors() {
    // Reset all the option buttons to their original color (light gray)
    document.getElementById("op1").style.backgroundColor = "lightgray";
    document.getElementById("op2").style.backgroundColor = "lightgray";
    document.getElementById("op3").style.backgroundColor = "lightgray";
    document.getElementById("op4").style.backgroundColor = "lightgray";
}

// Function to enable all answer buttons (reset state)
function enableAnswerOptions() {
    // Enable the answer options so the user can click on them
    document.getElementById("op1").disabled = false;
    document.getElementById("op2").disabled = false;
    document.getElementById("op3").disabled = false;
    document.getElementById("op4").disabled = false;
}

// Function to disable all answer buttons after one has been clicked
function disableAnswerOptions() {
    // Disable all the option buttons after an answer is selected
    document.getElementById("op1").disabled = true;
    document.getElementById("op2").disabled = true;
    document.getElementById("op3").disabled = true;
    document.getElementById("op4").disabled = true;
}

// Function to move to the next question
document.getElementById("nextButton").addEventListener("click", () => {
    if (contador < jsonData.length - 1) {
        inserirPergunta(); // Load the next question
    } else {
        showFinalScore();  // If last question, show score
    }
});

// Function to show the final score after the game is completed
function showFinalScore() {
    // Hide the question layout
    document.getElementById("layoutperguntas").style.display = "none";

    // Show the score layout
    var scoreLayout = document.getElementById("scoreLayout");
    scoreLayout.style.display = "block";

    // Display the user's score
    document.getElementById("score").innerHTML = `Your Score: ${score} / ${jsonData.length}`;
}

// Function to read the JSON file
async function readJsonFile(nameOfJsonFile) {
    try {
        const response = await fetch(nameOfJsonFile); // Path to your JSON file

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return await response.json(); // Parse and store the JSON data
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
