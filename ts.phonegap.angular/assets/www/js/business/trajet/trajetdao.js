var trajetDaoModule = (function() {
	var trajetList = [];

	var add = function(trajetdto) {
		trajetList.push(trajetdto);
	};

	var findById = function(id) {

		for (var i = 0; i < trajetList.length; i++) {

			if (trajetList[i].id == id) {
				console.log('trajetDaoModule::findById' + trajetList[i]);
				return trajetList[i];
			}
		}
	};

	var all = function(firstname) {

		return trajetList;
	};

	return {
		'add' : add,
		'findById': findById,
		'all' : all
	};
})();