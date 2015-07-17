var userDtoModule = (function() {

	var userdto = {
		'id' : null,
		'firstname' : null,
		'lastname' : null
	};

	var makeUserDto = function(id, firstname, lastname) {
		var userTmp = Object.create(userdto);
		userTmp.id = id;
		userTmp.firstname = firstname;
		userTmp.lastname = lastname;
		return userTmp;
	};

	return {
		'makeUserDto' : makeUserDto
	};
})();