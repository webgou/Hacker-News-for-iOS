// styling.js
// Javascript styling, animations and composition functions



function removeLabelSelection() {
	$("#lblMiles").removeClass("lblSelected");
	$("#lblKilometers").removeClass("lblSelected");
	$("#lblMeters").removeClass("lblSelected");
}

function fadeOut(element) {
	$(element).animate({ "opacity": "0" }, "slow", function() {
		$(element).addClass("hidden");
	});
}

function fadeIn(element) {
	$(element).removeClass("hidden");
	$(element).animate({ "opacity": "1" }, "slow");
}

function fadeInFromOpaque(element) {
	$(element).css("opacity", "0");
	$(element).removeClass("hidden");
	$(element).animate({ "opacity": "1" }, "slow");
}

function switchToSectionWithId(sectionId) {
	hideAllSections();
	showSectionWithId(sectionId);
}

function hideAllSections() {
	var sections = document.getElementsByTagName('section');
	for (var i = 0; i < sections.length; i++) {
		var section = sections[i];
		section.setAttribute('class', 'hidden');
	}
}

function showSectionWithId(sectionId) {
	//var section = document.getElementById(sectionId);
	//section.setAttribute('class', 'selected');
	fadeInFromOpaque("#" + sectionId);
	//fadeIn("#" + sectionId);
}

function clickedTimeout() {
	$("#btCalc").attr("src", "images/calc_bt.png");
	clearTimeout(btTimer);
	calcDist();
}

function btCalcClicked() {
	$("#btCalc").attr("src", "images/calc_bt_clicked.png"); // Clicked
	btTimer = setTimeout("clickedTimeout()", 100);
}