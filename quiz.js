// pos = position ds le quiz
var pos = 0,
test, titre_test, question, choice, choices, chA, chB, chC, correct = 0;

//TODO : gerer les reponses multiples ("AB", checkbox)
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


function renderQuestion() {
	test = _("test");
	if (pos >= questions.length) {
		test.innerHTML = "<h2>Votre score est de " + correct + " / " + questions.length + ".</h2>";
		_("titre_test").innerHTML = "Test terminé";
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
    	test.innerHTML += "<div class='radio'><label id='labelRep"
    	+ String.fromCharCode(65 - 1 + i)
    	+ "'><input type='radio' name='choices' value='"
    	+ String.fromCharCode(65 - 1 + i) + "'> "
    	+ questions[pos][i] +
    	"</label><br>";
    }
    // test.innerHTML += "<br><button onclick='checkAnswer()'>Vérifier réponse</button><br><br>";
    test.innerHTML += "<br><button id='button1' onclick='buttonPressed()' type='button' class='btn btn-primary'>Valider</button><br><br>";
    test.innerHTML += "<div id='messageErreur' class='alert alert-danger' style='display:none' role='alert'>Veuillez sélectionner une réponse.</div>"
}

function buttonPressed() {
	var elem = _("button1");
	if (getChoice() != 0) {
		_("messageErreur").style.display = 'none';
		if (elem.firstChild.data == "Valider") {
			elem.firstChild.data = "Question suivante >";
			return checkAnswer();
		}
		else {
			elem.firstChild.data = "Valider";
			return nextQuestion();
		}
	}
	else {
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

 function checkAnswer() {
 	choices = document.getElementsByName("choices");
 	choice = getChoice();
    // on recupere la case cochée
    for (var i = 0; i < choices.length; i++) {
    	if (choices[i].checked) {
    		choice = choices[i].value;
    	}
    }
    // si le choix correspond a la bonne reponse
    if (choice == questions[pos][questions[pos].length-1]) {
    	correct++;
    	_("labelRep"+choice).className += "rightAnswer";
    }
    else {
    	_("labelRep"+choice).className += "wrongAnswer";
    	_("labelRep"+questions[pos][questions[pos].length-1]).className += "rightAnswer";
    }
}




window.addEventListener("load", renderQuestion, false);