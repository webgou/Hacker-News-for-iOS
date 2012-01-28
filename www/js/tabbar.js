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
}