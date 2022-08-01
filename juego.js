//Selectors

const pregunta = document.querySelector('#pregunta');
const elecciones = Array.from(document.querySelectorAll('.choice-text'));
const progressTexto = document.querySelector('#progress');
const puntosText = document.querySelector('#puntos');
const progressFull = document.querySelector('#progressBarFull');

//Counters 

let currentQuestion = {}
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

//Preguntas - Questions

let questions = [
    {
        pregunta: "Quien fue Juan Pablo Duarte?",
        eleccion1: "Padre de la patria de R.D",
        eleccion2: "Escritor Dominicano",
        eleccion3: "Escritor del Himno Nacional",
        eleccion4: "Un riquito deso",
        respuesta: 1,
    },

    {
        pregunta: "Cuantos kilometros tiene R.D?",
        eleccion3: "48,442 kilometros cuadrados",
        eleccion2: "100 kilomentros",
        eleccion4: "80,000 kilometros cuadrados",
        eleccion1: "48,400 kilometros cuadrados",
        respuesta: 4,
    },

    {
        pregunta: "Año en que llegaron los españoles a la isla de Santo Domingo.",
        eleccion1: "1488",
        eleccion2: "1942",
        eleccion4: "1492",
        eleccion3: "1493",
        respuesta: 3,
    },

    {
        pregunta: "Dia de la independencia de R.D",
        eleccion1: "25 de febrero",
        eleccion2: "9 de diciembre",
        eleccion4: "16 de agosto",
        eleccion3: "27 de febrero",
        respuesta: 4,
    }
];

const SOCRE_POINTS = 100;
const MAX_QUESTION = 4;

//Start the game
startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions]
    getNewQuestion();

}

getNewQuestion = () => {
    if(availableQuestions === 0 || questionCounter > MAX_QUESTION) {
        localStorage.setItem('mostRecentScore', score);

    
        return window.location.assign('/end.html'); 
    }

    questionCounter++
    progressTexto.innerText = `Pregunta ${questionCounter} de ${MAX_QUESTION}`
    progressFull.style.width = `${(questionCounter/MAX_QUESTION) * 100}%`

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    pregunta.innerHTML = currentQuestion.pregunta;

    elecciones.forEach(eleccion => {
        const number = eleccion.dataset['number']
        eleccion.innerHTML = currentQuestion['eleccion', + number]
    })
    
    availableQuestions.splice(questionIndex, 1);
    
    acceptingAnswers = true;
}

elecciones.forEach(eleccion => {
    eleccion.addEventListener('click', evento => {
        if(!acceptingAnswers) return
        
        acceptingAnswers = false
        const selectedChoice = evento.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        let classToApply = selectedAnswer == currentQuestion.respuesta ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SOCRE_POINTS)
        }

        selectedChoice.parentElement.classList.add("correct");

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score += num 
    puntosText.innerText = score;
}

startGame()