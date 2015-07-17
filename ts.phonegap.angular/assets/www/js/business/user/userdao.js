var userDaoModule = (function() {

	var userlist = [];

	var add = function(userdto) {
		userlist.push(userdto);
	};

	var find = function(firstname) {

		for ( var i = 0; i < userlist.length; i++) {

			console.log('find ' + userlist[i].firstname + ' ' + firstname);

			if (userlist[i].firstname === firstname) {
				return userlist[i];
			}
		}
	};

	var findById = function(id) {

		for ( var i = 0; i < userlist.length; i++) {

			if (userlist[i].id == id) {
				console.log('userDaoModule::findById' + userlist[i]);
				return userlist[i];
			}
		}
	};

	var remove = function(userdto) {

		userlist = _.without(userlist, userdto);
	};

	var all = function(firstname) {

		return userlist;
	};

	var clear = function() {
		userlist = [];
	}

	return {
		'add' : add,
		'find' : find,
		'findById' : findById,
		'all' : all,
		'remove' : remove,
		'clear' : clear
	};
})();