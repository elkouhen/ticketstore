var billetDtoModule = (function() {

	var next = 0; 
	
	var billetdto = {
		'id' : null,
		'user' : null,
		'trajet' : null
	};

	var makeBilletDto = function(aUser, aTrajet) {
		var billetTmp = Object.create(billetdto);
		billetTmp.id = next;
		billetTmp.user = aUser;
		billetTmp.trajet = aTrajet;
		
		next = next + 1; 
		return billetTmp;
	};

	return {
		'makeBilletDto' : makeBilletDto
	};
})();