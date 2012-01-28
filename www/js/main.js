// main.js
// Main functions

function loaded() {
	document.addEventListener("deviceready", onDeviceReady, false);
	
	loadBookmarks();
	
	scrollBooks = new iScroll('Home', { vScrollbar: true, hideScrollbar: true, fadeScrollbar: true });
	scrollStats = new iScroll('Stats', { vScrollbar: true, hideScrollbar: true, fadeScrollbar: true });
	scrollAbout = new iScroll('About', { vScrollbar: true, hideScrollbar: true, fadeScrollbar: true });
	
	bookmarks = $("#bookList > li").length + 1;
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
			loadBookmarks();
			switchToSectionWithId('Home');
			setTimeout(function () {
				scrollBooks.refresh();
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
		"/www/tabs/wrench.png",
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
		"/www/tabs/wrench.png",
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

	document.addEventListener('touchmove', function (e) { e.preventDefault(); }, false);
	switchToSectionWithId('Home');
	nativeControls.selectTabBarItem("books");
}

function genBookmark(i) {
	var appName = "Markers";
	return appName + i;
}

function addNewBook() {
	fadeIn("#backButton");
	fadeOut("#addBook");
	
	// Clearing the fields
	$("#inputTitle").val("");
	$("#inputAuthor").val("");
	$("#inputPages").val("");
	$("#inputRead").val("");
	
	bookEntryState = "create";
	
	$(".editNewCenter").remove();
	$("#addBookScroller").append("<center class='editNewCenter'><input type='submit' value='Save' name='save' id='btSave' onClick='newSaveClicked()' /></center>");
	switchToSectionWithId('addNewBook');
}

function goBack() {
	var json;
	var bTitle, bAuthor, bPages, bRead, bNotes;
	var newJSON, jsString;
	
	if (bookEntryState == "show") {
		json = $.parseJSON($.jStorage.get(currID));
		bTitle = json.title;
		bAuthor = json.author;
		bPages = json.pages;
		bRead = json.read;
		bNotes = $("#detailedNotes").val();

		newJSON = { "title": bTitle, "author": bAuthor, "pages": bPages, "read": bRead, "notes": bNotes };
		jsString = JSON.stringify(newJSON);
		
		$.jStorage.deleteKey(currID);
		$.jStorage.set(currID, jsString);
		
		loadBookmarks();
		fadeIn("#addBook");
		fadeOut("#backButton");
		fadeOut("#editBook");
		switchToSectionWithId('Home');
		setTimeout(function () {
			scrollBooks.refresh();
		}, 0);
	} else if (bookEntryState == "create") {
		fadeIn("#addBook");
		fadeOut("#backButton");
		loadBookmarks();
		switchToSectionWithId('Home');
		setTimeout(function () {
			scrollBooks.refresh();
		}, 0);
	} else if (bookEntryState == "showFinished") {
		fadeOut("#backButton");
		fadeOut("#editBook");
		loadFinished();
		switchToSectionWithId('Stats');
		setTimeout(function () {
			scrollStats.refresh();
		}, 0);
	} else {
		fadeIn("#editBook");
		bookEntryState = "show";
		switchToSectionWithId('detailView');
	}
}

function prepareNewJSON() {
	var json;
	var bTitle, bAuthor, bPages, bRead;
	
	bTitle = $("#inputTitle").val();
	bAuthor = $("#inputAuthor").val();
	bPages = $("#inputPages").val();
	bRead = $("#inputRead").val();

	if (bRead == "") {
		bRead = 0;
	}

	json = { "title": bTitle, "author": bAuthor, "pages": bPages, "read": bRead, "notes": "" };
	return json;
}

function newSaveClicked() {
	saveNewBook(genBookmark(bookmarks++));
}

function showDetails(id) {
	var bTitle, bAuthor, bPages, bRead, bNotes;
	var json = $.parseJSON($.jStorage.get(id));
	
	currID = id;
	
	bTitle = json.title;
	bAuthor = json.author;
	bPages = json.pages;
	bRead = json.read;
	bNotes = json.notes;
	
	$("#detailedBookName").text(bTitle);
	$("#detailedBookAuthor").text(bAuthor);
	$("#detailedPercentage").removeClass("hidden");
	if (bRead == bPages) {
		$("#percDisplay").css("-webkit-border-bottom-right-radius", "4px");
		$("#percDisplay").css("-webkit-border-top-right-radius", "4px");
		$("#percDisplay").css("width", Math.floor((100 * bRead) / bPages) + "%");
	} else {
		$("#percDisplay").css("width", Math.floor((100 * bRead) / bPages) + "%");
	}
	$("#percLabel").text(Math.floor((100 * bRead) / bPages) + "%");
	$("#detailedPagesRead").text("Read " + bRead + " of " + bPages);
	$("#detailedNotes").val(bNotes);
	
	fadeIn("#backButton");
	fadeOut("#addBook");
	fadeIn("#editBook");
	
	if (bRead == bPages) {
		bookEntryState = "showFinished";
	} else {
		bookEntryState = "show";
	}

	switchToSectionWithId('detailView');
}

function loadBookmarks() {
	var arr = $.jStorage.index();
	var listLength = $("#bookList > li").length;
	var json;
	var bTitle, bAuthor, bPages, bRead, bISBN;
	
	$("#bookList > li").remove();
	$.each(arr, function(key, value) {
		json = $.parseJSON($.jStorage.get(value));
		
		bTitle = json.title;
		bAuthor = json.author;
		bPages = json.pages;
		bRead = json.read;
		
		if (bPages != bRead) {
			$("#bookList").prepend("<li id='" + value + "'><a href='#" + value + "' onClick='showDetails(\"" + value + "\")' id='firstRow'><span class='liBookName'>" + bTitle + "</span><span class='liBookAuthor'>" + bAuthor + "</span><span class='liPagesRead'>" + bRead + "<br /><span class='pRead'>pages read</span></span><span class='liPercentage'>" + Math.floor((100 * bRead) / bPages) + "%</span></a></li>");
		} else {
			// Do nothing
		}
	});
}

function loadFinished() {
	var arr = $.jStorage.index();
	//var listLength = $("#finishedList > li").length;
	var json;
	var bTitle, bAuthor, bPages, bRead, bISBN;
	
	$("#finishedList > li").remove();
	$.each(arr, function(key, value) {
		json = $.parseJSON($.jStorage.get(value));
		
		bTitle = json.title;
		bAuthor = json.author;
		bPages = json.pages;
		bRead = json.read;
		
		if (bPages == bRead) {
			$("#finishedList").prepend("<li id='" + value + "'><a href='#" + value + "' onClick='showDetails(\"" + value + "\")' id='firstRow'><span class='liBookName'>" + bTitle + "</span><span class='liBookAuthor'>" + bAuthor + "</span><span class='liPagesRead'>" + bRead + "<br /><span class='pRead'>pages read</span></span><span class='liPercentage'>" + Math.floor((100 * bRead) / bPages) + "%</span></a></li>");
		} else {
			// Do nothing
		}
	});
}

function saveNewBook(id) {
	var bTitle, bAuthor, bPages, bRead, bISBN;
	var json = prepareNewJSON();
	var jsString = JSON.stringify(json);
	
	bTitle = $("#inputTitle").val();
	bAuthor = $("#inputAuthor").val();
	bPages = $("#inputPages").val();
	bRead = $("#inputRead").val();
	
	$.jStorage.set(id, jsString);
	$("#bookList").prepend("<li id='" + id + "'><a href='#" + id + "' onClick='showDetails(\"" + id + "\")' id='firstRow'><span class='liBookName'>" + bTitle + "</span><span class='liBookAuthor'>" + bAuthor + "</span><span class='liPagesRead'>" + bRead + "<br /><span class='pRead'>pages read</span></span><span class='liPercentage'>" + Math.floor((100 * bRead) / bPages) + "%</span></a></li>");
	
	//goBack();
	fadeIn("#addBook");
	fadeOut("#backButton");
	loadBookmarks();
	switchToSectionWithId('Home');
	setTimeout(function () {
		scrollBooks.refresh();
	}, 0);
}

function editNewBook() {
	fadeIn("#backButton");
	fadeOut("#editBook");
	
	var bTitle, bAuthor, bPages, bRead, bNotes;
	var json = $.parseJSON($.jStorage.get(currID));
	
	bTitle = json.title;
	bAuthor = json.author;
	bPages = json.pages;
	bRead = json.read;
	
	// Clearing the fields
	$("#inputTitle").val(bTitle);
	$("#inputAuthor").val(bAuthor);
	$("#inputPages").val(bPages);
	$("#inputRead").val(bRead);
	
	bookEntryState = "edit";
	
	$(".editNewCenter").remove();
	$("#addBookScroller").append("<center class='editNewCenter'><input type='submit' value='Save' name='save' id='btSave' onClick='editSaveClicked()' /></center>");
	switchToSectionWithId('addNewBook');
}

function editSaveClicked() {
	var json = $.parseJSON($.jStorage.get(currID));
	var bTitle, bAuthor, bPages, bRead, bNotes;
	var newJSON, jsString;
	
	bTitle = $("#inputTitle").val();
	bAuthor = $("#inputAuthor").val();
	bPages = $("#inputPages").val();
	bRead = $("#inputRead").val();
	bNotes = json.notes;
	
	newJSON = { "title": bTitle, "author": bAuthor, "pages": bPages, "read": bRead, "notes": bNotes };
	jsString = JSON.stringify(newJSON);
	
	$.jStorage.deleteKey(currID);
	$.jStorage.set(currID, jsString);
	
	showDetails(currID);
}

function onNoteBlur() {
	var json = $.parseJSON($.jStorage.get(currID));
	var bTitle, bAuthor, bPages, bRead, bNotes;
	var newJSON, jsString;

	bTitle = json.title;
	bAuthor = json.author;
	bPages = json.pages;
	bRead = json.read;
	bNotes = $("#detailedNotes").val();

	newJSON = { "title": bTitle, "author": bAuthor, "pages": bPages, "read": bRead, "notes": bNotes };
	jsString = JSON.stringify(newJSON);

	window.scrollTo(0, 0);
	$.jStorage.deleteKey(currID);
	$.jStorage.set(currID, jsString);
}