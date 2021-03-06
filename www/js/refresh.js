// refresh.js
// Handles the pull-to-refresh events

function refreshList(list) {
	if (list == "home") {
		$(".homeListItem").remove();
		showLoading();
		loadTopNews();
	} else if (list == "new") {
		$(".newListItem").remove();
		showLoading();
		loadNewNews();
	} else if (list == "ask") {
		$(".askListItem").remove();
		showLoading();
		loadAskNews();
	} else if (list == "submitted") {
		$(".submittedListItem").remove();
		showLoading();
		loadSubmitted();
	}
}