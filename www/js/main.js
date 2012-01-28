// main.js
// Main functions

function loaded() {
	document.addEventListener("deviceready", onDeviceReady, false);
	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	scrollHome = new iScroll('Home', { vScrollbar: true, hideScrollbar: true, fadeScrollbar: true });
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
				$("#homeList").append("<li class='homeListItem' onClick='detailNews(\"" + item.id + "\")'><a href='#" + item.id + "' onClick='detailNews(\"" + item.id + "\")' id='firstRow'><span class='liName'>" + item.title + "</span><span class='liAuthor'>" + item.postedBy + "</span><span class='liVotes'>" + item.points + "<br /><span class='pRead'>vts/comm</span></span><span class='liComments'>" + item.commentCount + "</span></a></li>");
			});

			setTimeout(function () {
				hideLoading();
				scrollHome.refresh();
			}, 0);
		});
}

function detailNews(id) {
	var url = "http://api.ihackernews.com/post/" + id;
	fadeOut("#Home");
	showLoading();
	
	$.getJSON(url,
		{ format: "json" },
		function(data) {
			$("#detailedTitle").text(data.title);
			$("#detailedAuthor").text("posted by " + data.postedBy + " " + data.postedAgo);
			hideLoading();
			switchToSectionWithId('detailView');
		});
}