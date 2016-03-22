// pos = position ds le quiz
var pos = 0,
    test, titre_test, question, choice, choices, chA, chB, chC, correct = 0;

//TODO : gerer les reponses multiples ("AB", checkbox)
//TODO : mettre réponses dans base de données
var questions = [
    ["What is 10 + 4?", "12", "14", "16", "B"],
    ["What is 20 - 9?", "7", "13", "11", "42", "C"],
    ["What is 7 x 3?", "21", "24", "25", "A"],
    ["What is 8 / 2?", "10", "2", "4", "C"]
];

// fonction pour accéder à un élément par son ID
function _(x) {
    return document.getElementById(x);
}

function renderQuestion() {
    test = _("test");
    if (pos >= questions.length) {
        test.innerHTML = "<h2>You got " + correct + " of " + questions.length + " questions correct</h2>";
        _("titre_test").innerHTML = "Test Completed";
        pos = 0;
        correct = 0;
        return false;
    }
    // Affichage du titre
    _("titre_test").innerHTML = "Question " + (pos + 1) + " sur " + questions.length;
    // Affichage de la question
    test.innerHTML = "<h3>" + questions[pos][0] + "</h3>";
    // test.innerHTML = "<p>Cette question a " + (questions[pos].length - 2) + " réponses possibles</p>";
    // affichage des choix de réponses
    for (var i = 1; i <= questions[pos].length - 2; i++) {
        test.innerHTML += "<div class='radio'><label><input type='radio' name='choices' value='"
        + String.fromCharCode(65 - 1 + i) + "'> "
        + questions[pos][i] +
        "</label><br>";
    }
    test.innerHTML += "<br><button onclick='checkAnswer()'>Submit Answer</button><br><br>";
    test.innerHTML += "<div id='messageErreur' class='alert alert-danger' style='display:none' role='alert'>Veuillez sélectionner une réponse.</div>"
}

function checkAnswer() {
    choices = document.getElementsByName("choices");
    choice = 0;
    // on recupere la case cochée
    for (var i = 0; i < choices.length; i++) {
        if (choices[i].checked) {
            choice = choices[i].value;
        }
    }
    // si pas de case choisie
    if (choice == 0) {
    	_("messageErreur").style.display = 'inline-block';
    	return false;
    }
    // si le choix correspond a la bonne reponse
    else if (choice == questions[pos][questions[pos].length-1]) {
        correct++;
    }
    pos++;
    renderQuestion();
}
window.addEventListener("load", renderQuestion, false);