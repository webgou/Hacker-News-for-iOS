// refresh.js
// Handles the pull-to-refresh events

function refreshList(list) {
	if (list == "home") {
		loadTopNews(true);
	} else if (list == "new") {
		// New HN here
	} else if (list == "submitted") {
		// do submitted here
	}
}