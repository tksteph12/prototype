//remplir le menu de selection du choix des challenges

function fillChallengeSelector() {

	var select = jQuery('.selectOptions');
	select.empty();
	for (index in samplesChallenges) {
		select.append('<li class="selectOption" data-value=' + samplesChallenges[index].produit + '>' + samplesChallenges[index].titre + '</li>');
	}
}


function enableChallengeSelectBoxes() {
	$('div.selectBox').each(function() {
		$(this).children('span.selected').html($(this).children('ul.selectOptions').children('li.selectOption:first').html());
		$('input.price_values').attr('value', $(this).children('ul.selectOptions').children('li.selectOption:first').attr('data-value'));

		$(this).children('span.selected,span.selectArrow').click(function() {

			$('span.selected').toggleClass("highlighted");
			if ($(this).parent().children('ul.selectOptions').css('display') == 'none') {
				$(this).parent().children('ul.selectOptions').css('display', 'block');
			} else {
				$(this).parent().children('ul.selectOptions').css('display', 'none');
			}
		});

		$(this).find('li.selectOption').click(function() {
			$('span.selected').toggleClass("highlighted");
			var challenge = $(this).html();
			var myClass = $(this).attr("class");
			$(this).parent().css('display', 'none');
			$('input.price_values').attr('value', $(this).attr('data-value'));
			$(this).parent().siblings('span.selected').html(challenge);
			challenge = getChallenge(challenge);
			redrawWith(challenge.histogramme);
			//var description = jQuery('.after-container').empty().html();
			jQuery('.challenge').empty().html(challenge.titre);
			jQuery('.produit').empty().html(challenge.produit);
			jQuery('.periode').empty().html("De "+challenge.debut+" à "+challenge.fin);
			jQuery('.agences').empty().html(challenge.agences);	

		});
	});
}


/*événements généraux sur la page*/
function loadEvents(){
	jQuery(".printer").on('click',function(){
		doPrint();		
	});

}

/*Dessine l'histogramme en utilisant le parametrage du challenge passé en paramètres*/

function redrawWith(challenge) {
	try {
		if (jQuery('#id-chart')) {
			jQuery('#id-chart').empty();
			drawGroupedBars(challenge, "id-chart");
		}
	} catch (e) {

		console.debug(e);
	}
}


//recuperer un challenge à partir de son titre
/**
	@param challenge: titre du challenge
	@return histogramme du challenge
*/
function getChallenge(challenge) {
	for (var i = 0; i < samplesChallenges.length; i++) {
		if (samplesChallenges[i].titre === challenge) {
			return samplesChallenges[i];
		}
	}
}

/**fonction d'impression*/
function doPrint() {
    pwin = window.open();
    pwin.document.write("<div> </div>");
    pwin.document.write(jQuery("#id-chart").html());
    
    pwin.focus();
    pwin.document.close();
    
    pwin.onload = function() {
        window.print();
    }
}



//***************************Variables Globales et exemple de paramétrage*******************************************

var challenge_1 = {
	titre: "Challenge Num1",
	debut: "Lundi 23/09/2013",
	fin: "Lundi 21/09/2013",
	produit: "Produit Alpha",
	agences: "AgenceX, AgenceY, AgenceZ",
	periode: "hebdomadaire",
	histogramme: {
		unite: "Nombre",
		valeurs: [{
				"periode": "Semaine1",
				"AgenceX": "25600",
				"AgenceY": "11500",
				"AgenceZ": "45000"
			}, {
				"periode": "Semaine2",
				"AgenceX": "15000",
				"AgenceY": "2000",
				"AgenceZ": "25600"
			}, {
				"periode": "Semaine3",
				"AgenceX": "30443",
				"AgenceY": "41041",
				"AgenceZ": "7400"
			}, {
				"periode": "Semaine4",
				"AgenceX": "20612",
				"AgenceY": "30858",
				"AgenceZ": "45000"
			}

		]
	}
},

	challenge_2 = {
		titre: "Challenge Num2",
		debut: "Janvier 213",
		fin: "Avril 2013",
		produit: "Produit Beta",
		agences: "AgenceX, AgenceY",
		periode: "Mensuel",
		histogramme: {
			unite: "Montant( € )",
			valeurs: [{
					"periode": "Janvier",
					"AgenceX": "2010",
					"AgenceY": "1012"
				}, {
					"periode": "Fevrier",
					"AgenceX": "1250",
					"AgenceY": "2000"
				}, {
					"periode": "Mars",
					"AgenceX": "3044",
					"AgenceY": "411"
				}, {
					"periode": "Avril",
					"AgenceX": "2202",
					"AgenceY": "3058"
				}
			]
		}
	};

var samplesChallenges = [challenge_1, challenge_2];