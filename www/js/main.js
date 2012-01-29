// main.js
// Main functions

function loaded() {
	document.addEventListener("deviceready", onDeviceReady, false);
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	
	// Load iScroll stuff
	scrollHome = new iScroll('Home', { vScrollbar: true, hideScrollbar: true, fadeScrollbar: true });
	scrollNew = new iScroll('New', { vScrollbar: true, hideScrollbar: true, fadeScrollbar: true });
	scrollAsk = new iScroll('Ask', { vScrollbar: true, hideScrollbar: true, fadeScrollbar: true });
	scrollDetail = new iScroll('detailView', { vScrollbar: true, hideScrollbar: true, fadeScrollbar: true });
}

function onDeviceReady() {
	loadTabBar();
	switchToSectionWithId('Home');
	nativeControls.selectTabBarItem("home");

	showLoading();
	loadTopNews();
}

function loadTopNews() {
	$.getJSON("http://api.ihackernews.com/page",
		{ format: "json" },
		function(data) {
			$.each(data.items, function(i, item) {
				$("#homeList").append("<li class='homeListItem'><a href='#" + item.id + "' onClick='detailNews(\"" + item.id + "\", \"#Home\", \"detail\")' id='firstRow'><span class='liName'>" + item.title + "</span><span class='liAuthor'>" + item.postedBy + "</span><span class='liVotes'>" + item.points + "<br /><span class='pRead'>vts/comm</span></span><span class='liComments'>" + item.commentCount + "</span></a></li>");
			});

			setTimeout(function () {
				hideLoading();
				scrollHome.refresh();
			}, 0);
		});
}

function loadNewNews() {
	$.getJSON("http://api.ihackernews.com/new",
		{ format: "json" },
		function(data) {
			$.each(data.items, function(i, item) {
				$("#newList").append("<li class='newListItem'><a href='#" + item.id + "' onClick='detailNews(\"" + item.id + "\", \"#New\", \"detail_new\")' id='firstRow'><span class='liName'>" + item.title + "</span><span class='liAuthor'>" + item.postedBy + "</span><span class='liVotes'>" + item.points + "<br /><span class='pRead'>vts/comm</span></span><span class='liComments'>" + item.commentCount + "</span></a></li>");
			});

			newAlreadyLoaded = true;
			currentList = "new";
			switchToSectionWithId('New');

			setTimeout(function () {
				hideLoading();
				scrollNew.refresh();
			}, 0);
		});
}

function loadAskNews() {
	$.getJSON("http://api.ihackernews.com/ask",
		{ format: "json" },
		function(data) {
			$.each(data.items, function(i, item) {
				$("#askList").append("<li class='askListItem'><a href='#" + item.id + "' onClick='detailNews(\"" + item.id + "\", \"#Ask\", \"ask\")' id='firstRow'><span class='liName'>" + item.title + "</span><span class='liAuthor'>" + item.postedBy + "</span><span class='liVotes'>" + item.points + "<br /><span class='pRead'>vts/comm</span></span><span class='liComments'>" + item.commentCount + "</span></a></li>");
			});

			askAlreadyLoaded = true;
			currentList = "ask";
			switchToSectionWithId('Ask');

			setTimeout(function () {
				hideLoading();
				scrollAsk.refresh();
			}, 0);
		});
}

function loadSubmitted() {
	$.getJSON("http://api.ihackernews.com/ask",
		{ format: "json" },
		function(data) {
			$.each(data.items, function(i, item) {
				$("#askList").append("<li class='askListItem'><a href='#" + item.id + "' onClick='detailNews(\"" + item.id + "\", \"#Ask\", \"ask\")' id='firstRow'><span class='liName'>" + item.title + "</span><span class='liAuthor'>" + item.postedBy + "</span><span class='liVotes'>" + item.points + "<br /><span class='pRead'>vts/comm</span></span><span class='liComments'>" + item.commentCount + "</span></a></li>");
			});

			askAlreadyLoaded = true;
			currentList = "ask";
			switchToSectionWithId('Ask');

			setTimeout(function () {
				hideLoading();
				scrollAsk.refresh();
			}, 0);
		});
}

function detailNews(id, view, stack) {
	stackState = stack;
	var url = "http://api.ihackernews.com/post/" + id;
	fadeOut(view);
	fadeIn("#backButton");
	fadeOut("#refreshButton");
	showLoading();
	
	$.getJSON(url,
		{ format: "json" },
		function(data) {
			$("#detailedTitle").text(data.title);
			$("#detailedAuthor").text("posted by " + data.postedBy + " " + data.postedAgo);
			$("#detailedVotes").html("<img src='images/heart.png' /> " + data.points);
			$("#detailedComments").html("<img src='images/chat.png' /> " + data.commentCount);
			
			if (data.text != "") {
				$("#detailedText").removeClass("hidden");
				$("#detailedText").html("<br />" + data.text);
				$("#detailedViewPage").addClass("hidden");
			} else {
				$("#detailedText").addClass("hidden");
				$("#detailedViewPage").removeClass("hidden");
			}

			setTimeout(function () {
				hideLoading();
				scrollDetail.refresh();
			}, 0);
			switchToSectionWithId('detailView');
		});
}

function goBack() {
	if (stackState == "detail") {
		fadeIn("#refreshButton");
		fadeOut("#backButton");
		switchToSectionWithId('Home');
		setTimeout(function () {
			scrollHome.refresh();
		}, 0);
	} else if (stackState == "detail_new") {
		fadeIn("#refreshButton");
		fadeOut("#backButton");
		switchToSectionWithId('New');
		setTimeout(function () {
			scrollNew.refresh();
		}, 0);
	} else if (stackState == "ask") {
		fadeIn("#refreshButton");
		fadeOut("#backButton");
		switchToSectionWithId('Ask');
		setTimeout(function () {
			scrollAsk.refresh();
		}, 0);
	} else if (stackState == "submitted") {
		fadeIn("#refreshButton");
		fadeOut("#backButton");
		switchToSectionWithId('Submitted');
		setTimeout(function () {
			scrollSubmitted.refresh();
		}, 0);
	} else if (stackState == "comments") {
		// Edit me please!!!!!!!!!!!!
		fadeIn("#backButton");
		switchToSectionWithId('Home');
		setTimeout(function () {
			scrollBooks.refresh();
		}, 0);
	} else {
		alert("Nothing to do here...");
		//fadeIn("#editBook");
		//bookEntryState = "show";
		//switchToSectionWithId('detailView');
	}
}

function saveAccount() {
	var user = prompt("Username");
	localStorage.setItem("user", user);
	/*window.plugins.Prompt.show(
		"Username",
		function (userText) {
			localStorage.setItem("user", userText);
		}, // Add callback
		function () { }, // Cancel callback 
		"Save",
		"Cancel"
	);*/
}