// main.js
// Main functions

function loaded() {
	document.addEventListener("deviceready", onDeviceReady, false);
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	scrollHome = new iScroll('Home', { vScrollbar: true, hideScrollbar: true, fadeScrollbar: true });
}

function onDeviceReady() {
	// Initializating TabBar
	nativeControls = window.plugins.nativeControls;
	nativeControls.createTabBar();
	
	// Home tab
	nativeControls.createTabBarItem(
		"home",
		"Home",
		"/www/tabs/home.png",
		{"onSelect": function() {
			switchToSectionWithId('Home');
			setTimeout(function () {
				scrollHome.refresh();
			}, 0);
		}}
	);
	
	// New tab
	nativeControls.createTabBarItem(
		"new",
		"New",
		"/www/tabs/info.png",
		{"onSelect": function() {
			loadFinished();
			switchToSectionWithId('New');
			setTimeout(function () {
				scrollStats.refresh();
			}, 0);
		}}
	);
	
	// submitted tab
	nativeControls.createTabBarItem(
		"submitted",
		"Submitted",
		"/www/tabs/submitted.png",
		{"onSelect": function() {
			loadFinished();
			switchToSectionWithId('Submitted');
			setTimeout(function () {
				scrollStats.refresh();
			}, 0);
		}}
	);
	
	// About tab
	nativeControls.createTabBarItem(
		"settings",
		"Settings",
		"/www/tabs/gear.png",
		{"onSelect": function() {
			switchToSectionWithId('Settings');
			setTimeout(function () {
				scrollAbout.refresh();
			}, 0);
		}}
	);
	
	// About tab
	nativeControls.createTabBarItem(
		"about",
		"About",
		"/www/tabs/suitcase.png",
		{"onSelect": function() {
			switchToSectionWithId('About');
			setTimeout(function () {
				scrollAbout.refresh();
			}, 0);
		}}
	);
	
	// Compile the TabBar
	nativeControls.showTabBar();
	nativeControls.showTabBarItems("home", "new", "submitted", "settings", "about");

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
				$("#homeList").append("<li id='" + item.id + "'><a href='#" + item.id + "' onClick='showDetails(\"" + item.id + "\")' id='firstRow'><span class='liName'>" + item.title + "</span><span class='liAuthor'>" + item.postedBy + "</span><span class='liVotes'>" + item.points + "<br /><span class='pRead'>vts/comm</span></span><span class='liComments'>" + item.commentCount + "</span></a></li>");
			});
			setTimeout(function () {
				hideLoading();
				scrollHome.refresh();
			}, 0);
		});
}