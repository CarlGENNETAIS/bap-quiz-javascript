// PARAMETRES DU QUIZ
var delai = 1, // (en secondes) delai avant la prochaine question
    delaiMax = 10, // (en secondes) delai pour obtenir des points
    coefTemps = 20, // (en %) pourcentage du temps dans la note finale
    points = 10, // Points par question
    coef = 1,
    coefMax = 2,
    timer = 15; // en secondes

// initialisation des variables utilisées
var pos = 0,
    autoUpdateTimerID = 0,
    startDate = 0,
    secs = 0,
    mins = 0,
    choice = 0,
    trueAnswer = 0,
    score = 0;


// Affiche les instructions au chargement de la page
window.addEventListener("load", startPage, false);
// Rafraichissement du timer toutes les secondes
// autoUpdateTimerID = window.setInterval(updateTimer, 1000);


//TODO : mettre réponses dans base de données
var questions = [
    ["Quelle est la capitale de la France ?", "Lyon", "Paris", "Marseille", "Strasbourg", "B"],
    ["Que font 20 - 9?", "7", "13", "11", "42", "C"],
    ["Que font 7 x 3?", "21", "24", "25", "A"],
    ["Que font 8 / 2?", "10", "2", "4", "C"]
];

function startPage() {
    $("#titre_quiz").html("Comment jouer");
    $("#coef").text(coefTemps);
    $("#quiz, #timer, #restartButton, .progress").hide();
}

function startGame() {
    // stockage de l'heure de départ dans une variable globale
    startDate = new Date();
    $("#timer").text("00:15");
    $("#score").html(0);
    $("#timer").show();
    $("#instructions, #startButton").hide();
    return renderQuestion();
}

function finishGame() {
    // $("#quiz").append("<p>Vous avez obtenu " + score + " bonnes réponses sur " + questions.length + ".</p>");
    $("#restartButton").show();
    $("#titre_quiz").html("Quiz terminé !");
    $("#timer").removeClass("orange").addClass("grey");
    displayProgress();
    // clearInterval(autoUpdateTimerID);
}

function renderQuestion() {
    // si questionnaire fini
    if (pos >= questions.length) {
        return finishGame();
    }
    // Affichage du titre
    $("#questionNumber").html(pos + 1);
    // Affichage de la question
    $("#quiz").fadeOut(400, function() {
            $(this).html("<h3 class='text-center'>" + questions[pos][0] + "</h3><form><div class='row' id='row0'></div><div class='row' id='row1'></div></form>");
            // affichage des choix de réponses numérotées A,B,C,D...
            var row = 0;
            for (var i = 1; i <= questions[pos].length - 2; i++) {
                var letter = String.fromCharCode(65 - 1 + i);
                $("#row" + Math.floor((i - 1) / 2)).append("<div class='col-md-6 text-center'><label id='labelRep" + letter + "'><input type='radio' class='inputRadio' onchange='checkAnswer()' name='choices' value='" + letter + "'> " + questions[pos][i] + "</label>");
            }
            $(this).fadeIn(400); // delai animation
        })
        // Affichage barre de progression
    displayProgress();
    startTimer(timer, document.querySelector('#timer'));
}

function displayProgress() {
    // calcul de l'avancement en %
    var p = parseInt(pos / questions.length * 100);
    $(".progress").show();
    $("#startButton").hide();
    if (p != 100) {
        $(".progress").html("<div class='progress-bar progress-bar-striped' role='progressbar' aria-valuenow=" + p + " aria-valuemin='0' aria-valuemax='100' style='min-width:2.5em;width: " + p + "%;'> <span>" + p + "%</span> </div>");
    } else {
        $(".progress").html("<div class='progress-bar progress-bar-success progress-bar-striped' role='progressbar' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100' style='width: 100%'> <span> 100%</span> </div>");
    }
}

// l'appel se fait dans le <input onchange="">
function checkAnswer() {
    // desactive les inputs pendant la correction
    $("input").prop('disabled', true);
    // recupere la valeur de la case cochée (A,B,C ou D...)
    choice = $('form input[type=radio]:checked').val();
    // on recupere la correction dans le tableau
    trueAnswer = questions[pos][questions[pos].length - 1];
    // si le choix correspond a la bonne reponse
    if (choice == trueAnswer) {
        $('input[value="' + choice + '"]').parent().addClass("rightAnswer");
        score += points * coef;
        if (coef < coefMax) { coef += 0.2; }
        $("#score").html(score);
    } else {
        coef = 1;
        $('input[value="' + choice + '"]').parent().addClass("wrongAnswer");
        // on ne revele pas la bonne reponse
        // $('input[value="' + trueAnswer + '"]').parent().addClass("rightAnswer");
    }
    // delai puis lancement de la prochaine question en incrementant
    setTimeout(function() { renderQuestion(pos++); }, delai * 1000);
}

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}