// misc.js
// Misc stuff

function randomString() {
	var chars = "abcdefghiklmnopqrstuvwxyz";
	var rlength = 5;
	var random = "";

	for (var i = 0; i < rlength; i++) {
		var rnum = Math.floor(Math.random() * chars.length);
		random += chars.substring(rnum, rnum + 1);
	}

	lastRandom = random;
	return random;
}