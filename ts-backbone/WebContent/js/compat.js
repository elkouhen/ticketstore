var objectCreate = function(arg) {
	if (!arg) {
		return {};
	}
	function obj() {
	}
	;
	obj.prototype = arg;
	return new obj;
};

Object.create = Object.create || objectCreate;