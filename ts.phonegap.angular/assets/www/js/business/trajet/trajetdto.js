var trajetDtoModule = (function() {

	var trajetdto = {
		'id' : null,
		'depart' : null,
		'arrivee' : null
	};

	var makeTrajetDto = function(id, aDepart, aArrivee) {
		var trajetTmp = Object.create(trajetdto);
		trajetTmp.id = id;
		trajetTmp.depart = aDepart;
		trajetTmp.arrivee = aArrivee;
		return trajetTmp;
	};

	return {
		'makeTrajetDto' : makeTrajetDto
	};
})();