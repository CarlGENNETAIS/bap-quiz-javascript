// pos = position ds le quiz
var pos = 0,
quiz, titre_quiz, question, choice, choices, chA, chB, chC, correct = 0;

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

function startPage() {
	$("#titre_quiz").html("Comment jouer");
	$("#quiz").hide();
	$(".progress").hide();
	$(".panel-footer").append("<button id='startButton' onclick='renderQuestion()' type='button' class='btn btn-primary'>Commencer le test</button>")
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
		return false;
	}
    // Affichage du titre
    _("titre_quiz").innerHTML = "Question " + (pos + 1) + " sur " + questions.length;
    $("#quiz").fadeOut(400, function() {
	    // Affichage de la question
	    $(this).html("<h3>" + questions[pos][0] + "</h3>");
	    // affichage des choix de réponses
	    for (var i = 1; i <= questions[pos].length - 2; i++) {
	    	var letter = String.fromCharCode(65 - 1 + i);
	    	$(this).append("<div class='radio'><label id='labelRep"+ letter
	    		+ "'><input type='radio' name='choices' value='"+ letter + "'> "
	    		+ questions[pos][i] + "</label>");
	    }
	    // Bouton valider
	    $(this).append("<button id='button1' onclick='buttonPressed()' type='button' class='btn btn-success'>Valider</button>");
	    // Message d'erreur si pas de reponse selectionne (cache par defaut)
	    $(this).append("<div id='messageErreur' class='alert alert-danger' style='display:none' role='alert'>Veuillez sélectionner une réponse.</div>").fadeIn(400);
	})
    // Affichage barre de progression
    displayProgress();
   
}

function displayProgress() {
 var p = (pos / questions.length * 100);
 $(".progress").show();
 $("#startButton").hide();
 if (p != 100) {
    $(".progress").html("<div class='progress-bar progress-bar-striped' role='progressbar' aria-valuenow="
    	+ p + " aria-valuemin='0' aria-valuemax='100' style='min-width:2em;width: "
    	+ p + "%;'>"
    	+ p + "%</span> </div>");	
    }
    else {
    $(".progress").html("<div class='progress-bar progress-bar-success progress-bar-striped' role='progressbar' aria-valuenow='100' aria-valuemin='0' aria-valuemax='100' style='width: 100%'> 100%</span> </div>");
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
		}
		else {
			elem.firstChild.data = "Valider";
			elem.className = "btn btn-success";
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


// Affiche les instructions au chargement de la page
window.addEventListener("load", startPage, false);
