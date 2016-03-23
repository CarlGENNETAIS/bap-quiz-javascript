// pos = position ds le quiz
var pos = 0,
    autoUpdateTimer = 0,
	startDate = 0,
    secs = 0,
    minutes = 0,
    quiz = 0,
    titre_quiz = 0,
    question = 0,
    choice = 0,
    choices = 0,
    correct = 0;

//TODO : mettre réponses dans base de données
var questions = [
    ["Quelle est la capitale de la France ?", "Lyon", "Paris", "Marseille", "B"],
    ["Que font 20 - 9?", "7", "13", "11", "42", "C"],
    ["Que font 7 x 3?", "21", "24", "25", "A"],
    ["Que font 8 / 2?", "10", "2", "4", "C"]
];

// fonction pour accéder à un élément par son ID
function _(x) {
    return document.getElementById(x);
}

function startPage() {
    $("#titre_quiz").html("Comment jouer");
    $("#quiz").hide();
    $(".progress").hide();
    $("#timer").hide();
    $(".panel-footer").append("<button id='startButton' onclick='startGame()' type='button' class='btn btn-primary'>Commencer le test</button>")
}

function startGame() {
    // stockage de l'heure de départ
    startDate = new Date();
    $("#timer").text("00:00");
    $("#timer").show();
    return renderQuestion();
}

function renderQuestion() {
    $("#instructions").hide();
    quiz = _("quiz");
    if (pos >= questions.length) {
        quiz.innerHTML = "<h2>Votre score est de " + correct + " / " + questions.length + ".</h2>";
        quiz.innerHTML += "<button onclick='window.location.reload()' type='button' class='btn btn-default'>Refaire le test</button>";
        _("titre_quiz").innerHTML = "Quiz terminé";
        displayProgress();
        pos = 0;
        correct = 0;
        clearInterval(autoUpdateTimer)
        return false;
    }
    // Affichage du titre
    $("#titre_quiz").text("Question " + (pos + 1) + " sur " + questions.length);
    // _("titre_quiz").innerHTML = "Question " + (pos + 1) + " sur " + questions.length;
    $("#quiz").fadeOut(400, function() {
            // Affichage de la question
            $(this).html("<h3>" + questions[pos][0] + "</h3>");
            // affichage des choix de réponses
            for (var i = 1; i <= questions[pos].length - 2; i++) {
                var letter = String.fromCharCode(65 - 1 + i);
                $(this).append("<div class='radio'><label id='labelRep" + letter + "'><input type='radio' onchange='checkAnswer()' name='choices' value='" + letter + "'> " + questions[pos][i] + "</label>");
            }
            // Bouton valider
            // $(this).append("<button id='button1' onclick='buttonPressed()' type='button' class='btn btn-success'>Valider</button>");
            // Message d'erreur si pas de reponse selectionne (cache par defaut)
            $(this).append("").fadeIn(400);
        })
        // Affichage barre de progression
    displayProgress();
    // detection case
    // $('input:radio').click(alert("test"));
}


function displayProgress() {
    var p = (pos / questions.length * 100);
    $(".progress").show();
    $("#startButton").hide();
    if (p != 100) {
        $(".progress").html("<div class='progress-bar progress-bar-striped' role='progressbar' aria-valuenow=" + p + " aria-valuemin='0' aria-valuemax='100' style='min-width:2.5em;width: " + p + "%;'> <span>" + p + "%</span> </div>");
    } else {
        $(".progress").html("<div class='progress-bar progress-bar-success progress-bar-striped' role='progressbar' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100' style='width: 100%'> <span> 100%</span> </div>");
    }
}

function buttonPressed() {
    var elem = _("button1");
    if (getChoice() != 0) {
        _("messageErreur").style.display = 'none';
        if (elem.firstChild.data == "Valider") {
            elem.className = "btn btn-primary";
            elem.firstChild.data = "Question suivante >";
            return checkAnswer();
        } else {
            elem.firstChild.data = "Valider";
            elem.className = "btn btn-success";
            return nextQuestion();
        }
    } else {
        return false;
    }
}

function nextQuestion() {
    pos++;
    renderQuestion();
}

function getChoice() {
    choices = document.getElementsByName("choices");
    choice = 0;
    for (var i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            choice = choices[i].value;
        }
    }
    // si pas de case choisie
    if (choice == 0) {
        _("messageErreur").style.display = 'inline-block';
    }
    return choice;
}

// l'appel se fait dans le <input onchange="">
function checkAnswer() {
    // desactive les inputs apres la reponse
    $("input").prop('disabled', true);
    choices = document.getElementsByName("choices");
    choice = getChoice();
    // on recupere la case cochée
    for (var i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            choice = choices[i].value;
        }
    }
    // si le choix correspond a la bonne reponse
    if (choice == questions[pos][questions[pos].length - 1]) {
        correct++;
        _("labelRep" + choice).className += "rightAnswer";
    } else {
        _("labelRep" + choice).className += "wrongAnswer";
        _("labelRep" + questions[pos][questions[pos].length - 1]).className += "rightAnswer";
    }
    // delai de 2s
    setTimeout(function() { nextQuestion(); }, 2000);
}

function updateTimer() {
    // calcul secondes ecoulees depuis debut du test
    secs = (new Date() - startDate) / 1000;
    minutes = secs / 60;
    secs = parseInt(secs % 60);
    minutes = parseInt(minutes % 60);

    // ajoute les zéros devant les chiffres
    minutes = (minutes < 10 ? "0" : "") + minutes;
    secs = (secs < 10 ? "0" : "") + secs;

    $("#timer").text(minutes + ":" + secs);
}



// Affiche les instructions au chargement de la page
window.addEventListener("load", startPage, false);
// Rafraichissement du timer toutes les secondes
autoUpdateTimer = window.setInterval(updateTimer, 1000);