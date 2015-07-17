var billetDaoModule = (function() {
	var billetList = [];

	var add = function(billet) {
		billetList.push(billet);
	};

	var makeFromIds = function(userId, trajetId) {
		var user = userDaoModule.findById(userId);
		var trajet = trajetDaoModule.findById(trajetId);

		console.log('billetDaoModule::makeFromId ' + userId + ' ' + trajetId
				+ ' ' + user + ' ' + trajet);

		billetDaoModule.add(billetDtoModule.makeBilletDto(user, trajet));
	};

	var all = function() {
		return billetList;
	};

	var allForUser = function(userId) {
		var billetListTmp = [];

		for ( var i = 0; i < billetList.length; i++) {
			if (billetList[i].user.id === userId) {
				billetListTmp.push(billetList[i]);
			}
		}
		return billetListTmp;
	};

	return {
		'add' : add,
		'makeFromIds' : makeFromIds,
		'allForUser' : allForUser,
		'all' : all
	};
})();