// tabbar.js
// Handles the iOS TabBar component (Phonegap)

function loadTabBar() {
	// Initializating TabBar
	nativeControls = window.plugins.nativeControls;
	nativeControls.createTabBar();
	
	// Home tab
	nativeControls.createTabBarItem(
		"home",
		"Home",
		"/www/tabs/home.png",
		{"onSelect": function() {
			fadeIn("#refreshButton");
			fadeOut("#backButton");
			switchToSectionWithId('Home');
			currentList("home");
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
			currentList = "new";

			fadeIn("#refreshButton");
			fadeOut("#backButton");

			if (newAlreadyLoaded == false) {
				switchToSectionWithId('New');
				showLoading();
				loadNewNews();
			} else {
				switchToSectionWithId('New');
				setTimeout(function () {
					scrollNew.refresh();
				}, 0);
			}
		}}
	);
	
	// Ask tab
	nativeControls.createTabBarItem(
		"ask",
		"Ask",
		"/www/tabs/group.png",
		{"onSelect": function() {
			fadeOut("#refreshButton");
			fadeOut("#backButton");
			switchToSectionWithId('Ask');
			setTimeout(function () {
				scrollAsk.refresh();
			}, 0);
		}}
	);
	
	// submitted tab
	nativeControls.createTabBarItem(
		"submitted",
		"Submitted",
		"/www/tabs/submitted.png",
		{"onSelect": function() {
			fadeIn("#refreshButton");
			fadeOut("#backButton");
			loadFinished();
			switchToSectionWithId('Submitted');
			setTimeout(function () {
				scrollStats.refresh();
			}, 0);
		}}
	);
	
	// Settings tab
	nativeControls.createTabBarItem(
		"settings",
		"Settings",
		"/www/tabs/gear.png",
		{"onSelect": function() {
			fadeOut("#refreshButton");
			fadeOut("#backButton");

			if (localStorage.getItem("user") == "null") {
				$("#loggedUser").html("<b>You're not logged in</b>");
				$("#saveChange").text("Save");
			} else {
				$("#loggedUser").html("<b>Logged in as " + localStorage.getItem("user") + "</b>");
				$("#saveChange").text("Change");
			}

			switchToSectionWithId('Settings');
			setTimeout(function () {
				scrollAbout.refresh();
			}, 0);
		}}
	);
	
	// Compile the TabBar
	nativeControls.showTabBar();
	nativeControls.showTabBarItems("home", "new", "ask", "submitted", "settings");
}